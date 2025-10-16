interface HorrorEffectsProps {
  skulls: { id: number; x: number; y: number; size: number; rotation: number }[];
  bloodDrops: { id: number; x: number; y: number; delay: number }[];
  spiders: { id: number; x: number; y: number; speed: number }[];
}

const HorrorEffects = ({ skulls, bloodDrops, spiders }: HorrorEffectsProps) => {
  return (
    <>
      {skulls.map(skull => (
        <div
          key={skull.id}
          className="absolute text-4xl opacity-50 animate-float pointer-events-none z-[100]"
          style={{
            left: `${skull.x}%`,
            top: `${skull.y}%`,
            fontSize: `${skull.size}px`,
            transform: `rotate(${skull.rotation}deg)`,
            animation: 'float-down 8s linear forwards, spin 4s linear infinite',
            textShadow: '0 0 20px rgba(255,0,0,0.8)'
          }}
        >
          💀
        </div>
      ))}
      {bloodDrops.map(drop => (
        <div
          key={drop.id}
          className="absolute text-2xl opacity-60 pointer-events-none z-[100]"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            animation: `drip 5s linear forwards ${drop.delay}s`,
            textShadow: '0 0 10px rgba(139,0,0,0.9)'
          }}
        >
          🩸
        </div>
      ))}
      {spiders.map(spider => (
        <div
          key={spider.id}
          className="absolute text-3xl opacity-40 pointer-events-none z-[100]"
          style={{
            left: `${spider.x}%`,
            top: `${spider.y}%`,
            animation: `spider-crawl ${spider.speed}s linear forwards`,
            textShadow: '0 0 15px rgba(128,0,128,0.7)'
          }}
        >
          🕷️
        </div>
      ))}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-[99]"></div>
      <div className="absolute inset-0 pointer-events-none z-[98]" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
        animation: 'flicker 0.15s infinite'
      }}></div>
    </>
  );
};

export default HorrorEffects;
