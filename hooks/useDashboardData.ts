import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { DashboardData } from '@/types/dashboard';
import { parseDemographicsCSV, parseEducationCSV, parseSkillsCSV, parseCareerCSV } from '@/lib/csvParser';

export function useDashboardData(id: string) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        console.log('[useDashboardData] Starting data load for ID:', id);
        setLoading(true);
        setError(null);

        // Load metadata JSON
        console.log('[useDashboardData] Fetching metadata...');
        const metadataRes = await fetch(`/reports/${id}/metadata.json`);
        console.log('[useDashboardData] Metadata response status:', metadataRes.status);
        if (!metadataRes.ok) {
          throw new Error(`Dashboard with ID "${id}" not found`);
        }
        const metadata = await metadataRes.json();
        console.log('[useDashboardData] Metadata loaded:', metadata);

        // Load and parse CSVs in parallel
        console.log('[useDashboardData] Loading CSVs...');
        const [demographics, education, skills, career] = await Promise.all([
          loadAndParseCSV(`/reports/${id}/demographics.csv`, 'demographics'),
          loadAndParseCSV(`/reports/${id}/education.csv`, 'education'),
          loadAndParseCSV(`/reports/${id}/skills.csv`, 'skills').catch(() => null), // Skills is optional
          loadAndParseCSV(`/reports/${id}/career.csv`, 'career'),
        ]);

        console.log('[useDashboardData] All data loaded successfully');
        setData({ metadata, demographics, education, skills, career });
      } catch (err) {
        console.error('[useDashboardData] Error loading dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      console.log('[useDashboardData] Effect triggered for ID:', id);
      loadData();
    }
  }, [id]);

  return { data, loading, error };
}

async function loadAndParseCSV(url: string, type: 'demographics' | 'education' | 'skills' | 'career'): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${type} data`);
  }

  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          let parsed;
          switch (type) {
            case 'demographics':
              parsed = parseDemographicsCSV(results.data as any[]);
              break;
            case 'education':
              parsed = parseEducationCSV(results.data as any[]);
              break;
            case 'skills':
              parsed = parseSkillsCSV(results.data as any[]);
              break;
            case 'career':
              parsed = parseCareerCSV(results.data as any[]);
              break;
            default:
              throw new Error(`Unknown data type: ${type}`);
          }
          resolve(parsed);
        } catch (err) {
          reject(new Error(`Failed to parse ${type} CSV: ${err instanceof Error ? err.message : 'Unknown error'}`));
        }
      },
      error: (error: Error) => {
        reject(new Error(`CSV parsing error for ${type}: ${error.message}`));
      },
    });
  });
}
