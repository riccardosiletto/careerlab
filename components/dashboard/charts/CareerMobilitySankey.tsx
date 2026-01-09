'use client';

interface CareerMobilitySankeyProps {
  data: {
    sameCompanySameRole: number;
    sameCompanyDiffRole: number;
    newCompanySameRole: number;
    newCompanyDiffRole: number;
  };
}

export default function CareerMobilitySankey({ data }: CareerMobilitySankeyProps) {
  const total =
    data.sameCompanySameRole +
    data.sameCompanyDiffRole +
    data.newCompanySameRole +
    data.newCompanyDiffRole;

  // Calculate breakdown data
  const breakdown = [
    {
      label: 'Stessa azienda, stesso ruolo',
      shortLabel: 'Stesso ruolo',
      value: data.sameCompanySameRole,
      percent: Math.round((data.sameCompanySameRole / total) * 100),
      color: '#6D7BFC',
      bgColor: '#F3F4FF',
      description: 'nella stessa azienda'
    },
    {
      label: 'Stessa azienda, ruolo diverso',
      shortLabel: 'Ruolo diverso',
      value: data.sameCompanyDiffRole,
      percent: Math.round((data.sameCompanyDiffRole / total) * 100),
      color: '#9FA9FF',
      bgColor: '#F3F4FF',
      description: 'nella stessa azienda'
    },
    {
      label: 'Nuova azienda, stesso ruolo',
      shortLabel: 'Stesso ruolo',
      value: data.newCompanySameRole,
      percent: Math.round((data.newCompanySameRole / total) * 100),
      color: '#B6DC00',
      bgColor: '#F1FDD1',
      description: 'in una nuova azienda'
    },
    {
      label: 'Nuova azienda, ruolo diverso',
      shortLabel: 'Ruolo diverso',
      value: data.newCompanyDiffRole,
      percent: Math.round((data.newCompanyDiffRole / total) * 100),
      color: '#D0E957',
      bgColor: '#F1FDD1',
      description: 'in una nuova azienda'
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          Come si muovono dopo una promozione?
        </h3>
      </div>
      <div className="p-8">
        {/* Simple Grid Layout */}
        <div className="grid grid-cols-2 gap-6">
        {breakdown.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl p-6 border-2 transition-all hover:shadow-lg"
            style={{
              borderColor: item.color,
              backgroundColor: item.bgColor
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <h4 className="font-semibold text-lg text-[#212746]">
                    {item.shortLabel}
                  </h4>
                </div>
                <p className="text-xs text-[#5A607F] ml-5">
                  {item.description}
                </p>
              </div>
              <div className="text-right">
                <div
                  className="font-black text-4xl"
                  style={{ color: item.color }}
                >
                  {item.percent}%
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#8D96AC]">Profili</span>
                <span className="font-bold text-2xl text-[#212746]">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

        {/* Summary Stats */}
        <div className="mt-8 pt-6 border-t border-[#E8EAF8] grid grid-cols-2 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#6D7BFC]/10 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#6D7BFC]" />
            </div>
            <div>
              <div className="font-bold text-2xl text-[#212746]">
                {Math.round(((data.sameCompanySameRole + data.sameCompanyDiffRole) / total) * 100)}%
              </div>
              <div className="text-sm text-[#5A607F]">Mobilità interna</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#B6DC00]/10 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#B6DC00]" />
            </div>
            <div>
              <div className="font-bold text-2xl text-[#212746]">
                {Math.round(((data.newCompanySameRole + data.newCompanyDiffRole) / total) * 100)}%
              </div>
              <div className="text-sm text-[#5A607F]">Mobilità esterna</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
