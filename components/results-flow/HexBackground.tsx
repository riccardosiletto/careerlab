'use client';

export default function HexBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main hex pattern - scattered hexagons */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10L90 30V70L60 90L30 70V30L60 10Z' fill='none' stroke='%239FA9FF' stroke-width='0.8' opacity='0.25'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
        backgroundPosition: 'center',
      }} />
      
      {/* Secondary pattern layer with offset */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8L60 22V50L40 64L20 50V22L40 8Z' fill='none' stroke='%236D7BFC' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
        backgroundPosition: '40px 40px',
      }} />
      
      {/* Decorative stars/sparkles scattered */}
      <svg className="absolute top-[15%] left-[10%] w-8 h-8 opacity-40" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L18 14L30 16L18 18L16 30L14 18L2 16L14 14L16 2Z" fill="#F3F4FF"/>
      </svg>
      <svg className="absolute top-[25%] right-[15%] w-6 h-6 opacity-30" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L18 14L30 16L18 18L16 30L14 18L2 16L14 14L16 2Z" fill="#F3F4FF"/>
      </svg>
      <svg className="absolute bottom-[30%] left-[8%] w-5 h-5 opacity-35" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L18 14L30 16L18 18L16 30L14 18L2 16L14 14L16 2Z" fill="#F3F4FF"/>
      </svg>
      <svg className="absolute bottom-[20%] right-[12%] w-7 h-7 opacity-25" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L18 14L30 16L18 18L16 30L14 18L2 16L14 14L16 2Z" fill="#F3F4FF"/>
      </svg>
      <svg className="absolute top-[50%] right-[5%] w-4 h-4 opacity-40" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L18 14L30 16L18 18L16 30L14 18L2 16L14 14L16 2Z" fill="#F3F4FF"/>
      </svg>
    </div>
  );
}




