'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// =============================================================================
// TYPES
// =============================================================================

interface University {
  id: number;
  name: string;
  type: 'traditional' | 'online';
  region: string;
  size: 'small' | 'medium' | 'large';
  scores: {
    placement: number;
    salary: number;
    engagement: number;
  };
  ranking: number;
  isOwn?: boolean;
}

type MetricType = 'overall' | 'placement' | 'salary' | 'engagement';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockBenchmarkUniversities: University[] = [
  {
    id: 1,
    name: 'Politecnico di Milano',
    type: 'traditional',
    region: 'Lombardia',
    size: 'large',
    scores: { placement: 91, salary: 88, engagement: 82 },
    ranking: 1,
  },
  {
    id: 2,
    name: 'LUISS',
    type: 'traditional',
    region: 'Lazio',
    size: 'medium',
    scores: { placement: 88, salary: 90, engagement: 75 },
    ranking: 2,
  },
  {
    id: 3,
    name: 'Universita Bocconi',
    type: 'traditional',
    region: 'Lombardia',
    size: 'medium',
    scores: { placement: 89, salary: 92, engagement: 78 },
    ranking: 3,
    isOwn: true,
  },
  {
    id: 4,
    name: 'Universita Cattolica',
    type: 'traditional',
    region: 'Lombardia',
    size: 'large',
    scores: { placement: 84, salary: 82, engagement: 80 },
    ranking: 4,
  },
  {
    id: 5,
    name: 'UniPD',
    type: 'traditional',
    region: 'Veneto',
    size: 'large',
    scores: { placement: 82, salary: 78, engagement: 85 },
    ranking: 5,
  },
  {
    id: 6,
    name: 'Alma Mater - Bologna',
    type: 'traditional',
    region: 'Emilia-Romagna',
    size: 'large',
    scores: { placement: 80, salary: 76, engagement: 81 },
    ranking: 6,
  },
  {
    id: 7,
    name: 'Politecnico di Torino',
    type: 'traditional',
    region: 'Piemonte',
    size: 'large',
    scores: { placement: 85, salary: 83, engagement: 77 },
    ranking: 7,
  },
  {
    id: 8,
    name: 'Universita di Pisa',
    type: 'traditional',
    region: 'Toscana',
    size: 'medium',
    scores: { placement: 78, salary: 74, engagement: 79 },
    ranking: 8,
  },
  {
    id: 9,
    name: 'Universita di Firenze',
    type: 'traditional',
    region: 'Toscana',
    size: 'large',
    scores: { placement: 76, salary: 72, engagement: 76 },
    ranking: 9,
  },
  {
    id: 10,
    name: 'Ca Foscari - Venezia',
    type: 'traditional',
    region: 'Veneto',
    size: 'medium',
    scores: { placement: 75, salary: 71, engagement: 74 },
    ranking: 10,
  },
  {
    id: 11,
    name: 'Sapienza - Roma',
    type: 'traditional',
    region: 'Lazio',
    size: 'large',
    scores: { placement: 74, salary: 70, engagement: 72 },
    ranking: 11,
  },
  {
    id: 12,
    name: 'Universita di Napoli Federico II',
    type: 'traditional',
    region: 'Campania',
    size: 'large',
    scores: { placement: 71, salary: 67, engagement: 70 },
    ranking: 12,
  },
  {
    id: 13,
    name: 'Universita di Genova',
    type: 'traditional',
    region: 'Liguria',
    size: 'medium',
    scores: { placement: 70, salary: 68, engagement: 69 },
    ranking: 13,
  },
  {
    id: 14,
    name: 'Universita di Trieste',
    type: 'traditional',
    region: 'Friuli-Venezia Giulia',
    size: 'small',
    scores: { placement: 69, salary: 66, engagement: 71 },
    ranking: 14,
  },
  {
    id: 15,
    name: 'Universita Telematica e-Campus',
    type: 'online',
    region: 'Lombardia',
    size: 'medium',
    scores: { placement: 62, salary: 58, engagement: 65 },
    ranking: 15,
  },
  {
    id: 16,
    name: 'Universita di Parma',
    type: 'traditional',
    region: 'Emilia-Romagna',
    size: 'medium',
    scores: { placement: 67, salary: 64, engagement: 68 },
    ranking: 16,
  },
  {
    id: 17,
    name: 'Universita di Verona',
    type: 'traditional',
    region: 'Veneto',
    size: 'medium',
    scores: { placement: 66, salary: 63, engagement: 67 },
    ranking: 17,
  },
  {
    id: 18,
    name: 'Universita Telematica Pegaso',
    type: 'online',
    region: 'Campania',
    size: 'large',
    scores: { placement: 58, salary: 55, engagement: 62 },
    ranking: 18,
  },
  {
    id: 19,
    name: 'Universita di Siena',
    type: 'traditional',
    region: 'Toscana',
    size: 'small',
    scores: { placement: 64, salary: 61, engagement: 66 },
    ranking: 19,
  },
  {
    id: 20,
    name: 'Universita di Bari',
    type: 'traditional',
    region: 'Puglia',
    size: 'large',
    scores: { placement: 63, salary: 59, engagement: 64 },
    ranking: 20,
  },
];

const regions = [
  'Tutte le regioni',
  'Lombardia',
  'Lazio',
  'Veneto',
  'Emilia-Romagna',
  'Piemonte',
  'Toscana',
  'Campania',
  'Liguria',
  'Friuli-Venezia Giulia',
  'Puglia',
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 184, b: 0 };
};

const generateColorFades = (baseColor: string, count: number) => {
  const rgb = hexToRgb(baseColor);
  const styles = [];
  for (let i = 0; i < count; i++) {
    const opacity = Math.max(0.3, 1.0 - (i * 0.05));
    const bgOpacity = Math.max(0.08, opacity * 0.12);
    styles.push({
      bg: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`,
      accent: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    });
  }
  return styles;
};

const getMetricLabel = (metric: MetricType) => {
  switch (metric) {
    case 'overall': return 'Classifica Generale';
    case 'placement': return 'Placement Rate';
    case 'salary': return 'Score Salariale';
    case 'engagement': return 'Engagement';
  }
};

const getMetricColor = (metric: MetricType) => {
  switch (metric) {
    case 'overall': return '#FFB800';
    case 'placement': return '#6D7BFC';
    case 'salary': return '#9D52FF';
    case 'engagement': return '#22C55E';
  }
};

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function RankingsPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('overall');
  const [selectedType, setSelectedType] = useState<'all' | 'traditional' | 'online'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('Tutte le regioni');
  const [selectedSize, setSelectedSize] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  // Filter and sort universities
  const filteredUniversities = useMemo(() => {
    let result = [...mockBenchmarkUniversities];

    // Filter by type
    if (selectedType !== 'all') {
      result = result.filter(u => u.type === selectedType);
    }

    // Filter by region
    if (selectedRegion !== 'Tutte le regioni') {
      result = result.filter(u => u.region === selectedRegion);
    }

    // Filter by size
    if (selectedSize !== 'all') {
      result = result.filter(u => u.size === selectedSize);
    }

    // Sort by selected metric
    result.sort((a, b) => {
      if (selectedMetric === 'overall') {
        return a.ranking - b.ranking;
      }
      return b.scores[selectedMetric] - a.scores[selectedMetric];
    });

    return result;
  }, [selectedMetric, selectedType, selectedRegion, selectedSize]);

  // Find own university position in filtered list
  const ownUniPosition = filteredUniversities.findIndex(u => u.isOwn) + 1;
  const ownUni = filteredUniversities.find(u => u.isOwn);

  // Generate colors based on metric
  const colorStyles = generateColorFades(getMetricColor(selectedMetric), filteredUniversities.length);

  // Get max score for bar width calculation
  const maxScore = useMemo(() => {
    if (selectedMetric === 'overall') {
      return Math.max(...filteredUniversities.map(u =>
        (u.scores.placement + u.scores.salary + u.scores.engagement) / 3
      ));
    }
    return Math.max(...filteredUniversities.map(u => u.scores[selectedMetric]));
  }, [filteredUniversities, selectedMetric]);

  const getScore = (uni: University) => {
    if (selectedMetric === 'overall') {
      return Math.round((uni.scores.placement + uni.scores.salary + uni.scores.engagement) / 3);
    }
    return uni.scores[selectedMetric];
  };

  return (
    <div className="min-h-screen bg-[#F0F3FF]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8EAF8]">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/university/benchmarking"
                className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-[#5A607F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-[#212746]">Classifiche Universita</h1>
                <p className="text-sm text-[#5A607F] mt-1">
                  Esplora il ranking delle universita italiane per diverse metriche
                </p>
              </div>
            </div>

            <Link
              href="/university/benchmarking/compare"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFB800] text-[#212746] text-sm font-medium rounded-lg hover:bg-[#E5A600] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Confronta Selezionati
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-8 py-6">

        {/* Own University Position Highlight */}
        {ownUni && (
          <div className="bg-[#FFB800]/15 border border-[#FFB800]/30 rounded-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-[#FFB800] flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#212746]">#{ownUniPosition}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-[#212746]">{ownUni.name}</span>
                    <span className="bg-[#FFB800] text-[#212746] text-xs font-bold px-2 py-0.5 rounded">TU</span>
                  </div>
                  <p className="text-sm text-[#5A607F]">
                    La tua posizione in {getMetricLabel(selectedMetric)}
                    {selectedType !== 'all' && ` (${selectedType === 'traditional' ? 'Tradizionali' : 'Online'})`}
                    {selectedRegion !== 'Tutte le regioni' && ` - ${selectedRegion}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm text-[#8D96AC]">Score</p>
                  <p className="text-2xl font-bold text-[#FFB800]">{getScore(ownUni)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#8D96AC]">Su</p>
                  <p className="text-2xl font-bold text-[#212746]">{filteredUniversities.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

          {/* Left: Filters */}
          <div className="space-y-6">

            {/* Metric Selector */}
            <div className="bg-white border border-[#E8EAF8] rounded-lg p-5">
              <h3 className="font-semibold text-[#212746] mb-4">Classifica per</h3>
              <div className="space-y-2">
                {(['overall', 'placement', 'salary', 'engagement'] as MetricType[]).map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                      selectedMetric === metric
                        ? 'border-[#FFB800] bg-[#FFB800]/10'
                        : 'border-[#E8EAF8] hover:border-[#FFB800]'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getMetricColor(metric) }}
                    />
                    <span className={`font-medium ${selectedMetric === metric ? 'text-[#212746]' : 'text-[#5A607F]'}`}>
                      {getMetricLabel(metric)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="bg-white border border-[#E8EAF8] rounded-lg p-5">
              <h3 className="font-semibold text-[#212746] mb-4">Tipo Universita</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'Tutte' },
                  { value: 'traditional', label: 'Tradizionali' },
                  { value: 'online', label: 'Online' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedType(option.value as typeof selectedType)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                      selectedType === option.value
                        ? 'border-[#6D7BFC] bg-[#6D7BFC]/10'
                        : 'border-[#E8EAF8] hover:border-[#6D7BFC]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedType === option.value ? 'border-[#6D7BFC]' : 'border-[#E8EAF8]'
                    }`}>
                      {selectedType === option.value && (
                        <div className="w-2 h-2 rounded-full bg-[#6D7BFC]" />
                      )}
                    </div>
                    <span className={`font-medium ${selectedType === option.value ? 'text-[#212746]' : 'text-[#5A607F]'}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div className="bg-white border border-[#E8EAF8] rounded-lg p-5">
              <h3 className="font-semibold text-[#212746] mb-4">Regione</h3>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-3 border border-[#E8EAF8] rounded-lg text-[#212746] focus:outline-none focus:border-[#FFB800] transition-colors"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div className="bg-white border border-[#E8EAF8] rounded-lg p-5">
              <h3 className="font-semibold text-[#212746] mb-4">Dimensione</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'Tutte' },
                  { value: 'small', label: 'Piccole (<10k studenti)' },
                  { value: 'medium', label: 'Medie (10k-30k)' },
                  { value: 'large', label: 'Grandi (>30k studenti)' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedSize(option.value as typeof selectedSize)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                      selectedSize === option.value
                        ? 'border-[#9D52FF] bg-[#9D52FF]/10'
                        : 'border-[#E8EAF8] hover:border-[#9D52FF]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedSize === option.value ? 'border-[#9D52FF]' : 'border-[#E8EAF8]'
                    }`}>
                      {selectedSize === option.value && (
                        <div className="w-2 h-2 rounded-full bg-[#9D52FF]" />
                      )}
                    </div>
                    <span className={`font-medium ${selectedSize === option.value ? 'text-[#212746]' : 'text-[#5A607F]'}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Rankings List */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            {/* Header */}
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                {getMetricLabel(selectedMetric)}
              </h3>
              <span className="text-sm text-[#8D96AC]">
                {filteredUniversities.length} universita
              </span>
            </div>

            {/* Rankings list */}
            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
              {filteredUniversities.length === 0 ? (
                <div className="w-full py-12 text-center">
                  <svg className="mx-auto w-12 h-12 text-[#8D96AC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-3 text-[#5A607F]">Nessuna universita trovata con i filtri selezionati</p>
                </div>
              ) : (
                filteredUniversities.map((uni, index) => {
                  const style = colorStyles[index];
                  const score = getScore(uni);

                  return (
                    <div
                      key={uni.id}
                      className={`relative flex items-center gap-3 p-3 border w-full overflow-hidden rounded-lg transition-all ${
                        uni.isOwn
                          ? 'border-2 border-[#FFB800] bg-[#FFB800]/5'
                          : 'border-[#E8EAF8] hover:border-[#FFB800]'
                      }`}
                    >
                      {uni.isOwn && (
                        <span className="absolute -top-2 -right-2 bg-[#FFB800] text-[#212746] text-xs font-bold px-2 py-0.5 rounded-full z-20">
                          TU
                        </span>
                      )}

                      {/* Background bar proportional to score */}
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: uni.isOwn ? 'rgba(255, 184, 0, 0.1)' : style.bg,
                          width: `${(score / maxScore) * 100}%`,
                        }}
                      />

                      {/* Content on top of background */}
                      <div className="relative z-10 flex items-center gap-3 w-full">
                        {/* Rank number */}
                        <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center font-bold text-lg ${
                          index === 0 ? 'bg-[#FFB800] text-[#212746]' :
                          index === 1 ? 'bg-[#C0C0C0] text-[#212746]' :
                          index === 2 ? 'bg-[#CD7F32] text-white' :
                          'bg-[#F5F7FA] text-[#212746]'
                        }`}>
                          {index + 1}
                        </div>

                        {/* Vertical accent bar */}
                        <div
                          className="w-1 h-10 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: uni.isOwn ? '#FFB800' : style.accent }}
                        />

                        {/* Content */}
                        <div className="flex-1 flex items-center justify-between">
                          {/* University info */}
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-base text-[#212746]">
                              {uni.name}
                            </p>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {uni.type === 'online' ? 'Online' : uni.region} - {
                                uni.size === 'small' ? 'Piccola' :
                                uni.size === 'medium' ? 'Media' : 'Grande'
                              }
                            </p>
                          </div>

                          {/* Score */}
                          <div className="flex items-center gap-4">
                            {/* Individual metrics (small) */}
                            <div className="hidden md:flex items-center gap-3">
                              <div className="text-center">
                                <p className="text-[10px] text-[#8D96AC] uppercase">Placement</p>
                                <p className="text-sm font-semibold text-[#6D7BFC]">{uni.scores.placement}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-[10px] text-[#8D96AC] uppercase">Salari</p>
                                <p className="text-sm font-semibold text-[#9D52FF]">{uni.scores.salary}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-[10px] text-[#8D96AC] uppercase">Engagement</p>
                                <p className="text-sm font-semibold text-[#22C55E]">{uni.scores.engagement}%</p>
                              </div>
                            </div>

                            {/* Main score */}
                            <div className="flex items-center gap-2 min-w-[80px] justify-end">
                              <span className={`font-bold text-2xl ${
                                uni.isOwn ? 'text-[#FFB800]' : 'text-[#212746]'
                              }`}>
                                {score}
                              </span>
                              <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                                Score
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
