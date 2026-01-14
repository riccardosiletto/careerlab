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
  scores: {
    placement: number;
    salary: number;
    engagement: number;
    satisfaction?: number;
  };
  ranking: number;
  isOwn?: boolean;
}

// =============================================================================
// MOCK DATA
// =============================================================================

const mockBenchmarkUniversities: University[] = [
  {
    id: 1,
    name: 'Politecnico di Milano',
    type: 'traditional',
    region: 'Lombardia',
    scores: { placement: 91, salary: 88, engagement: 82, satisfaction: 87 },
    ranking: 1,
  },
  {
    id: 2,
    name: 'LUISS',
    type: 'traditional',
    region: 'Lazio',
    scores: { placement: 88, salary: 90, engagement: 75, satisfaction: 82 },
    ranking: 2,
  },
  {
    id: 3,
    name: 'Universita Bocconi',
    type: 'traditional',
    region: 'Lombardia',
    scores: { placement: 89, salary: 92, engagement: 78, satisfaction: 85 },
    ranking: 3,
    isOwn: true,
  },
  {
    id: 4,
    name: 'Universita Cattolica',
    type: 'traditional',
    region: 'Lombardia',
    scores: { placement: 84, salary: 82, engagement: 80, satisfaction: 79 },
    ranking: 4,
  },
  {
    id: 5,
    name: 'UniPD',
    type: 'traditional',
    region: 'Veneto',
    scores: { placement: 82, salary: 78, engagement: 85, satisfaction: 83 },
    ranking: 5,
  },
  {
    id: 6,
    name: 'Alma Mater - Bologna',
    type: 'traditional',
    region: 'Emilia-Romagna',
    scores: { placement: 80, salary: 76, engagement: 81, satisfaction: 84 },
    ranking: 6,
  },
  {
    id: 7,
    name: 'Politecnico di Torino',
    type: 'traditional',
    region: 'Piemonte',
    scores: { placement: 85, salary: 83, engagement: 77, satisfaction: 80 },
    ranking: 7,
  },
  {
    id: 8,
    name: 'Universita di Pisa',
    type: 'traditional',
    region: 'Toscana',
    scores: { placement: 78, salary: 74, engagement: 79, satisfaction: 81 },
    ranking: 8,
  },
  {
    id: 9,
    name: 'Universita di Firenze',
    type: 'traditional',
    region: 'Toscana',
    scores: { placement: 76, salary: 72, engagement: 76, satisfaction: 78 },
    ranking: 9,
  },
  {
    id: 10,
    name: 'Ca Foscari - Venezia',
    type: 'traditional',
    region: 'Veneto',
    scores: { placement: 75, salary: 71, engagement: 74, satisfaction: 77 },
    ranking: 10,
  },
  {
    id: 11,
    name: 'Universita Telematica e-Campus',
    type: 'online',
    region: 'Lombardia',
    scores: { placement: 62, salary: 58, engagement: 65, satisfaction: 70 },
    ranking: 15,
  },
  {
    id: 12,
    name: 'Universita Telematica Pegaso',
    type: 'online',
    region: 'Campania',
    scores: { placement: 58, salary: 55, engagement: 62, satisfaction: 68 },
    ranking: 18,
  },
];

const mockNationalAverage = {
  placement: 72,
  salary: 65,
  engagement: 58,
  satisfaction: 72,
};

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function UniversitySelector({
  universities,
  selectedIds,
  onToggle,
  maxSelection,
}: {
  universities: University[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  maxSelection: number;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUniversities = useMemo(() => {
    if (!searchTerm) return universities;
    return universities.filter(u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [universities, searchTerm]);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D96AC]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Cerca universita..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-[#E8EAF8] rounded-lg text-sm focus:outline-none focus:border-[#FFB800] transition-colors"
        />
      </div>

      {/* Selection info */}
      <div className="text-sm text-[#5A607F]">
        Selezionati: <span className="font-medium text-[#FFB800]">{selectedIds.length}</span> / {maxSelection}
      </div>

      {/* University list */}
      <div className="max-h-[300px] overflow-y-auto space-y-2">
        {filteredUniversities.map((uni) => {
          const isSelected = selectedIds.includes(uni.id);
          const isDisabled = !isSelected && selectedIds.length >= maxSelection;

          return (
            <button
              key={uni.id}
              onClick={() => !isDisabled && onToggle(uni.id)}
              disabled={isDisabled}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                isSelected
                  ? uni.isOwn
                    ? 'border-[#FFB800] bg-[#FFB800]/10'
                    : 'border-[#6D7BFC] bg-[#6D7BFC]/10'
                  : isDisabled
                  ? 'border-[#E8EAF8] bg-[#F5F7FA] opacity-50 cursor-not-allowed'
                  : 'border-[#E8EAF8] hover:border-[#FFB800] cursor-pointer'
              }`}
            >
              {/* Checkbox */}
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                isSelected
                  ? uni.isOwn ? 'bg-[#FFB800]' : 'bg-[#6D7BFC]'
                  : 'border-2 border-[#E8EAF8]'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* University info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-[#212746] truncate">{uni.name}</p>
                  {uni.isOwn && (
                    <span className="bg-[#FFB800] text-[#212746] text-[10px] font-bold px-1.5 py-0.5 rounded">TU</span>
                  )}
                </div>
                <p className="text-xs text-[#8D96AC]">
                  {uni.type === 'online' ? 'Online' : uni.region} - Ranking #{uni.ranking}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ComparisonTable({ universities }: { universities: University[] }) {
  const metrics = [
    { key: 'placement', label: 'Placement Rate', suffix: '%' },
    { key: 'salary', label: 'Score Salariale', suffix: '' },
    { key: 'engagement', label: 'Engagement', suffix: '%' },
    { key: 'satisfaction', label: 'Soddisfazione', suffix: '%' },
  ];

  const getBestValue = (key: keyof University['scores']) => {
    return Math.max(...universities.map(u => u.scores[key] || 0));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#212746]">
            <th className="text-left px-4 py-3 text-white font-medium text-sm">Metrica</th>
            {universities.map((uni) => (
              <th key={uni.id} className="text-center px-4 py-3 min-w-[140px]">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white font-medium text-sm truncate max-w-[120px]">
                    {uni.name}
                  </span>
                  {uni.isOwn && (
                    <span className="bg-[#FFB800] text-[#212746] text-[10px] font-bold px-1.5 py-0.5 rounded">TU</span>
                  )}
                </div>
              </th>
            ))}
            <th className="text-center px-4 py-3 min-w-[100px]">
              <span className="text-[#8D96AC] font-medium text-sm">Media IT</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => {
            const bestValue = getBestValue(metric.key as keyof University['scores']);
            const nationalValue = mockNationalAverage[metric.key as keyof typeof mockNationalAverage];

            return (
              <tr key={metric.key} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]'}>
                <td className="px-4 py-4 text-sm font-medium text-[#212746]">{metric.label}</td>
                {universities.map((uni) => {
                  const value = uni.scores[metric.key as keyof University['scores']] || 0;
                  const isBest = value === bestValue;
                  const isAboveAvg = value > nationalValue;

                  return (
                    <td key={uni.id} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-xl font-bold ${
                          uni.isOwn ? 'text-[#FFB800]' : isBest ? 'text-[#22C55E]' : 'text-[#212746]'
                        }`}>
                          {value}{metric.suffix}
                        </span>
                        {isBest && (
                          <span className="mt-1 flex items-center gap-1 text-[10px] text-[#22C55E] font-medium">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            TOP
                          </span>
                        )}
                        <span className={`mt-1 text-[10px] ${isAboveAvg ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                          {isAboveAvg ? '+' : ''}{value - nationalValue} vs media
                        </span>
                      </div>
                    </td>
                  );
                })}
                <td className="px-4 py-4 text-center">
                  <span className="text-lg font-medium text-[#8D96AC]">
                    {nationalValue}{metric.suffix}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonCards({ universities }: { universities: University[] }) {
  return (
    <div className={`grid gap-4 ${
      universities.length === 2 ? 'grid-cols-2' :
      universities.length === 3 ? 'grid-cols-3' :
      'grid-cols-4'
    }`}>
      {universities.map((uni) => (
        <div
          key={uni.id}
          className={`bg-white rounded-lg p-4 ${
            uni.isOwn ? 'border-2 border-[#FFB800] relative' : 'border border-[#E8EAF8]'
          }`}
        >
          {uni.isOwn && (
            <span className="absolute -top-2 -right-2 bg-[#FFB800] text-[#212746] text-xs font-bold px-2 py-0.5 rounded-full">
              TU
            </span>
          )}
          <h4 className="font-semibold text-[#212746] mb-1 truncate">{uni.name}</h4>
          <p className="text-xs text-[#8D96AC] mb-4">
            {uni.type === 'online' ? 'Online' : uni.region} - #{uni.ranking}
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#5A607F]">Placement</span>
              <span className="font-bold text-[#6D7BFC]">{uni.scores.placement}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#5A607F]">Salari</span>
              <span className="font-bold text-[#9D52FF]">{uni.scores.salary}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#5A607F]">Engagement</span>
              <span className="font-bold text-[#FFB800]">{uni.scores.engagement}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#5A607F]">Soddisfazione</span>
              <span className="font-bold text-[#22C55E]">{uni.scores.satisfaction}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StrengthsWeaknesses({ universities }: { universities: University[] }) {
  const ownUni = universities.find(u => u.isOwn);
  if (!ownUni) return null;

  const others = universities.filter(u => !u.isOwn);
  if (others.length === 0) return null;

  const metrics = [
    { key: 'placement', label: 'Placement Rate' },
    { key: 'salary', label: 'Score Salariale' },
    { key: 'engagement', label: 'Engagement' },
    { key: 'satisfaction', label: 'Soddisfazione' },
  ];

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  metrics.forEach(metric => {
    const ownValue = ownUni.scores[metric.key as keyof University['scores']] || 0;
    const avgOthers = others.reduce((sum, u) => sum + (u.scores[metric.key as keyof University['scores']] || 0), 0) / others.length;
    const diff = ownValue - avgOthers;

    if (diff >= 5) {
      strengths.push(`${metric.label}: +${diff.toFixed(0)} punti rispetto alla media dei competitor selezionati`);
    } else if (diff <= -5) {
      weaknesses.push(`${metric.label}: ${diff.toFixed(0)} punti rispetto alla media dei competitor selezionati`);
    }
  });

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Strengths */}
      <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <h4 className="font-semibold text-[#212746]">Punti di Forza</h4>
        </div>
        {strengths.length > 0 ? (
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#212746]">
                <svg className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#5A607F]">Nessun punto di forza significativo rispetto ai competitor selezionati</p>
        )}
      </div>

      {/* Weaknesses */}
      <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <h4 className="font-semibold text-[#212746]">Aree di Miglioramento</h4>
        </div>
        {weaknesses.length > 0 ? (
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#212746]">
                <svg className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#5A607F]">Nessuna area critica rispetto ai competitor selezionati</p>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function ComparePage() {
  // Start with own university selected
  const ownUni = mockBenchmarkUniversities.find(u => u.isOwn);
  const [selectedIds, setSelectedIds] = useState<number[]>(ownUni ? [ownUni.id] : []);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const selectedUniversities = useMemo(() => {
    return mockBenchmarkUniversities.filter(u => selectedIds.includes(u.id));
  }, [selectedIds]);

  const handleToggle = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const clearSelection = () => {
    const ownUni = mockBenchmarkUniversities.find(u => u.isOwn);
    setSelectedIds(ownUni ? [ownUni.id] : []);
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
                <h1 className="text-2xl font-semibold text-[#212746]">Confronta Atenei</h1>
                <p className="text-sm text-[#5A607F] mt-1">
                  Seleziona fino a 4 universita per un confronto dettagliato
                </p>
              </div>
            </div>

            {/* View mode toggle */}
            {selectedUniversities.length >= 2 && (
              <div className="flex items-center gap-2 bg-[#F5F7FA] p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white text-[#212746] shadow-sm'
                      : 'text-[#5A607F] hover:text-[#212746]'
                  }`}
                >
                  Tabella
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-white text-[#212746] shadow-sm'
                      : 'text-[#5A607F] hover:text-[#212746]'
                  }`}
                >
                  Cards
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

          {/* Left: University Selector */}
          <div className="bg-white border border-[#E8EAF8] rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#212746]">Seleziona Universita</h3>
              {selectedIds.length > 1 && (
                <button
                  onClick={clearSelection}
                  className="text-xs text-[#5A607F] hover:text-[#EF4444] transition-colors"
                >
                  Resetta
                </button>
              )}
            </div>
            <UniversitySelector
              universities={mockBenchmarkUniversities}
              selectedIds={selectedIds}
              onToggle={handleToggle}
              maxSelection={4}
            />
          </div>

          {/* Right: Comparison View */}
          <div className="space-y-6">

            {selectedUniversities.length < 2 ? (
              /* Empty state */
              <div className="bg-white border border-[#E8EAF8] rounded-lg p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFB800]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#FFB800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl text-[#212746] mb-2">Seleziona almeno 2 universita</h3>
                <p className="text-[#5A607F] max-w-md mx-auto">
                  Seleziona dalla lista a sinistra le universita che vuoi confrontare. Puoi selezionare fino a 4 atenei per un confronto completo.
                </p>
              </div>
            ) : (
              <>
                {/* Comparison view */}
                {viewMode === 'table' ? (
                  <div className="bg-white border border-[#E8EAF8] rounded-lg overflow-hidden">
                    <ComparisonTable universities={selectedUniversities} />
                  </div>
                ) : (
                  <ComparisonCards universities={selectedUniversities} />
                )}

                {/* Side-by-side charts placeholder */}
                <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
                  <div className="bg-[#212746] flex items-center px-5 py-4 w-full">
                    <h3 className="font-medium text-[19px] text-white">
                      Grafici Comparativi
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Placement chart placeholder */}
                      <div className="h-[200px] flex flex-col items-center justify-center bg-[#F5F7FA] rounded-lg border-2 border-dashed border-[#E8EAF8]">
                        <svg className="w-10 h-10 text-[#6D7BFC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 20V10M12 20V4M6 20V14" />
                        </svg>
                        <p className="mt-2 text-sm text-[#8D96AC]">Placement Rate</p>
                      </div>

                      {/* Salary chart placeholder */}
                      <div className="h-[200px] flex flex-col items-center justify-center bg-[#F5F7FA] rounded-lg border-2 border-dashed border-[#E8EAF8]">
                        <svg className="w-10 h-10 text-[#9D52FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 20V10M12 20V4M6 20V14" />
                        </svg>
                        <p className="mt-2 text-sm text-[#8D96AC]">Score Salariale</p>
                      </div>

                      {/* Engagement chart placeholder */}
                      <div className="h-[200px] flex flex-col items-center justify-center bg-[#F5F7FA] rounded-lg border-2 border-dashed border-[#E8EAF8]">
                        <svg className="w-10 h-10 text-[#FFB800]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 20V10M12 20V4M6 20V14" />
                        </svg>
                        <p className="mt-2 text-sm text-[#8D96AC]">Engagement</p>
                      </div>

                      {/* Satisfaction chart placeholder */}
                      <div className="h-[200px] flex flex-col items-center justify-center bg-[#F5F7FA] rounded-lg border-2 border-dashed border-[#E8EAF8]">
                        <svg className="w-10 h-10 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 20V10M12 20V4M6 20V14" />
                        </svg>
                        <p className="mt-2 text-sm text-[#8D96AC]">Soddisfazione</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths and Weaknesses */}
                <StrengthsWeaknesses universities={selectedUniversities} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
