'use client';

interface CareerFlowDiagramProps {
  data: {
    sameCompanySameRole: number;
    sameCompanyDiffRole: number;
    newCompanySameRole: number;
    newCompanyDiffRole: number;
  };
  promotionLocation: {
    sameCompany: number;
    newCompany: number;
  };
  promotionType: {
    sameRole: number;
    differentRole: number;
  };
  differentRoles?: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
}

export default function CareerFlowDiagram({
  data,
  promotionLocation,
  promotionType,
  differentRoles
}: CareerFlowDiagramProps) {

  const total =
    data.sameCompanySameRole +
    data.sameCompanyDiffRole +
    data.newCompanySameRole +
    data.newCompanyDiffRole;

  // Location percentages
  const sameCompanyPercent = Math.round((promotionLocation.sameCompany / (promotionLocation.sameCompany + promotionLocation.newCompany)) * 100);
  const newCompanyPercent = 100 - sameCompanyPercent;

  // Matrix percentages
  const matrix = {
    sameCompanySameRole: Math.round((data.sameCompanySameRole / total) * 100),
    sameCompanyDiffRole: Math.round((data.sameCompanyDiffRole / total) * 100),
    newCompanySameRole: Math.round((data.newCompanySameRole / total) * 100),
    newCompanyDiffRole: Math.round((data.newCompanyDiffRole / total) * 100),
  };

  // Prepara i top ruoli per la visualizzazione (massimo 3)
  const topRoles = (differentRoles || []).slice(0, 3);

  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-visible relative">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          Dove e come crescono professionalmente?
        </h3>
      </div>

      <div className="p-8">
        {/* Flow Diagram */}
        <div className="relative" style={{ height: '420px' }}>
          <svg
            viewBox="0 0 1120 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* START NODE - Promozione */}
            <g transform="translate(30, 150)">
              <rect x="0" y="0" width="100" height="100" rx="0" fill="#212746" />
              <text x="50" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                PROMOZIONE
              </text>
              <text x="50" y="65" textAnchor="middle" fill="white" fontSize="28" fontWeight="800">
                {total}
              </text>
              <text x="50" y="85" textAnchor="middle" fill="white" fontSize="10" opacity="0.7">
                profili
              </text>
            </g>

            {/* MIDDLE NODES - Location */}
            {/* Stessa Azienda */}
            <g transform="translate(280, 60)">
              <rect x="0" y="0" width="140" height="120" rx="0" fill="#F3F4FF" stroke="#6D7BFC" strokeWidth="2" />
              <text x="70" y="30" textAnchor="middle" fill="#212746" fontSize="13" fontWeight="600">
                Stessa azienda
              </text>
              <text x="70" y="70" textAnchor="middle" fill="#6D7BFC" fontSize="36" fontWeight="800">
                {sameCompanyPercent}%
              </text>
              <text x="70" y="95" textAnchor="middle" fill="#5A607F" fontSize="11">
                {promotionLocation.sameCompany} profili
              </text>
            </g>

            {/* Nuova Azienda */}
            <g transform="translate(280, 220)">
              <rect x="0" y="0" width="140" height="120" rx="0" fill="#F1FDD1" stroke="#B6DC00" strokeWidth="2" />
              <text x="70" y="30" textAnchor="middle" fill="#212746" fontSize="13" fontWeight="600">
                Nuova azienda
              </text>
              <text x="70" y="70" textAnchor="middle" fill="#B6DC00" fontSize="36" fontWeight="800">
                {newCompanyPercent}%
              </text>
              <text x="70" y="95" textAnchor="middle" fill="#5A607F" fontSize="11">
                {promotionLocation.newCompany} profili
              </text>
            </g>

            {/* END NODES - 4 boxes organized by company */}
            {/* Stessa Azienda - Stesso Ruolo (blu chiaro) */}
            <g transform="translate(600, 10)">
              <rect x="0" y="0" width="160" height="85" rx="0" fill="#F3F4FF" stroke="#6D7BFC" strokeWidth="2" />
              <text x="80" y="24" textAnchor="middle" fill="#212746" fontSize="11" fontWeight="600">
                Stesso ruolo
              </text>
              <text x="80" y="55" textAnchor="middle" fill="#6D7BFC" fontSize="28" fontWeight="800">
                {matrix.sameCompanySameRole}%
              </text>
              <text x="80" y="75" textAnchor="middle" fill="#5A607F" fontSize="10">
                {data.sameCompanySameRole} profili
              </text>
            </g>

            {/* Stessa Azienda - Ruolo Diverso */}
            <g transform="translate(600, 105)">
              <rect x="0" y="0" width="160" height="85" rx="0" fill="#F3F4FF" stroke="#9FA9FF" strokeWidth="2" />
              <text x="80" y="24" textAnchor="middle" fill="#212746" fontSize="11" fontWeight="600">
                Ruolo diverso
              </text>
              <text x="80" y="55" textAnchor="middle" fill="#9FA9FF" fontSize="28" fontWeight="800">
                {matrix.sameCompanyDiffRole}%
              </text>
              <text x="80" y="75" textAnchor="middle" fill="#5A607F" fontSize="10">
                {data.sameCompanyDiffRole} profili
              </text>
            </g>

            {/* Nuova Azienda - Stesso Ruolo (verde) */}
            <g transform="translate(600, 210)">
              <rect x="0" y="0" width="160" height="85" rx="0" fill="#F1FDD1" stroke="#B6DC00" strokeWidth="2" />
              <text x="80" y="24" textAnchor="middle" fill="#212746" fontSize="11" fontWeight="600">
                Stesso ruolo
              </text>
              <text x="80" y="55" textAnchor="middle" fill="#B6DC00" fontSize="28" fontWeight="800">
                {matrix.newCompanySameRole}%
              </text>
              <text x="80" y="75" textAnchor="middle" fill="#5A607F" fontSize="10">
                {data.newCompanySameRole} profili
              </text>
            </g>

            {/* Nuova Azienda - Ruolo Diverso */}
            <g transform="translate(600, 305)">
              <rect x="0" y="0" width="160" height="85" rx="0" fill="#F1FDD1" stroke="#D0E957" strokeWidth="2" />
              <text x="80" y="24" textAnchor="middle" fill="#212746" fontSize="11" fontWeight="600">
                Ruolo diverso
              </text>
              <text x="80" y="55" textAnchor="middle" fill="#95B800" fontSize="28" fontWeight="800">
                {matrix.newCompanyDiffRole}%
              </text>
              <text x="80" y="75" textAnchor="middle" fill="#5A607F" fontSize="10">
                {data.newCompanyDiffRole} profili
              </text>
            </g>

            {/* FLOW PATHS - Start to Location */}
            {/* To Stessa Azienda */}
            <path
              d={`M 130 180
                  C 180 180, 220 120, 280 120`}
              fill="none"
              stroke="#6D7BFC"
              strokeWidth={Math.max(4, sameCompanyPercent * 0.5)}
              strokeOpacity="0.5"
            />
            {/* To Nuova Azienda */}
            <path
              d={`M 130 220
                  C 180 220, 220 280, 280 280`}
              fill="none"
              stroke="#B6DC00"
              strokeWidth={Math.max(4, newCompanyPercent * 0.5)}
              strokeOpacity="0.5"
            />

            {/* FLOW PATHS - Location to End Boxes */}
            {/* Stessa Azienda -> Stesso Ruolo */}
            <path
              d={`M 420 100
                  C 480 100, 540 52, 600 52`}
              fill="none"
              stroke="#6D7BFC"
              strokeWidth={Math.max(2, matrix.sameCompanySameRole * 0.35)}
              strokeOpacity="0.5"
            />
            {/* Stessa Azienda -> Ruolo Diverso */}
            <path
              d={`M 420 140
                  C 480 140, 540 147, 600 147`}
              fill="none"
              stroke="#9FA9FF"
              strokeWidth={Math.max(2, matrix.sameCompanyDiffRole * 0.35)}
              strokeOpacity="0.5"
            />
            {/* Nuova Azienda -> Stesso Ruolo */}
            <path
              d={`M 420 260
                  C 480 260, 540 252, 600 252`}
              fill="none"
              stroke="#B6DC00"
              strokeWidth={Math.max(2, matrix.newCompanySameRole * 0.35)}
              strokeOpacity="0.5"
            />
            {/* Nuova Azienda -> Ruolo Diverso */}
            <path
              d={`M 420 300
                  C 480 300, 540 347, 600 347`}
              fill="none"
              stroke="#D0E957"
              strokeWidth={Math.max(2, matrix.newCompanyDiffRole * 0.35)}
              strokeOpacity="0.5"
            />

            {/* TOP RUOLI - Visualizzazione sempre visibile a destra dei box "Ruolo diverso" */}
            {topRoles.length > 0 && (
              <>
                {/* Flow paths da Ruolo diverso (stessa azienda) ai top ruoli */}
                {topRoles.map((role, index) => {
                  const yOffset = 105 + 42.5; // Centro del box "Ruolo diverso" stessa azienda
                  const targetY = 55 + (index * 120); // Posizione Y del box ruolo target
                  return (
                    <path
                      key={`path-same-${index}`}
                      d={`M 760 ${yOffset} C 800 ${yOffset}, 830 ${targetY + 35}, 850 ${targetY + 35}`}
                      fill="none"
                      stroke="#9FA9FF"
                      strokeWidth={Math.max(2, (role.percentage / 100) * 8)}
                      strokeOpacity="0.4"
                    />
                  );
                })}

                {/* Flow paths da Ruolo diverso (nuova azienda) ai top ruoli */}
                {topRoles.map((role, index) => {
                  const yOffset = 305 + 42.5; // Centro del box "Ruolo diverso" nuova azienda
                  const targetY = 55 + (index * 120); // Posizione Y del box ruolo target
                  return (
                    <path
                      key={`path-new-${index}`}
                      d={`M 760 ${yOffset} C 800 ${yOffset}, 830 ${targetY + 35}, 850 ${targetY + 35}`}
                      fill="none"
                      stroke="#D0E957"
                      strokeWidth={Math.max(2, (role.percentage / 100) * 8)}
                      strokeOpacity="0.4"
                    />
                  );
                })}

                {/* Box dei top ruoli - Design migliorato */}
                {topRoles.map((role, index) => {
                  const yPos = 55 + (index * 120);
                  // Colori in scala per i 3 ruoli
                  const colors = [
                    { bg: '#F3E8FF', border: '#9D52FF', text: '#9D52FF' }, // Viola - primo
                    { bg: '#F3F4FF', border: '#6D7BFC', text: '#6D7BFC' }, // Blu - secondo
                    { bg: '#F6F8FF', border: '#9FA9FF', text: '#9FA9FF' }, // Blu chiaro - terzo
                  ];
                  const color = colors[index] || colors[2];

                  return (
                    <g key={`role-${index}`} transform={`translate(850, ${yPos})`}>
                      {/* Box principale con sfondo colorato */}
                      <rect
                        x="0"
                        y="0"
                        width="220"
                        height="85"
                        rx="0"
                        fill={color.bg}
                        stroke={color.border}
                        strokeWidth="2"
                      />

                      {/* Nome del ruolo */}
                      <text
                        x="110"
                        y="38"
                        textAnchor="middle"
                        fill="#212746"
                        fontSize="12"
                        fontWeight="600"
                      >
                        {role.name.length > 20 ? role.name.substring(0, 20) + '...' : role.name}
                      </text>

                      {/* Percentuale grande */}
                      <text
                        x="110"
                        y="65"
                        textAnchor="middle"
                        fill={color.text}
                        fontSize="24"
                        fontWeight="800"
                      >
                        {role.percentage}%
                      </text>

                      {/* Count profili */}
                      <text
                        x="110"
                        y="80"
                        textAnchor="middle"
                        fill="#5A607F"
                        fontSize="10"
                      >
                        {role.count} profili
                      </text>
                    </g>
                  );
                })}
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
