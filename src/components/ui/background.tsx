"use client"

export function Background() {
  const starsSvg = `data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='25' r='0.5' fill='white' opacity='0.5'/%3E%3Ccircle cx='75' cy='15' r='1' fill='white' opacity='0.8'/%3E%3Ccircle cx='45' cy='75' r='0.5' fill='white' opacity='0.4'/%3E%3Ccircle cx='85' cy='85' r='1.5' fill='white' opacity='0.6'/%3E%3Ccircle cx='10' cy='90' r='0.8' fill='white' opacity='0.7'/%3E%3Ccircle cx='100' cy='45' r='0.6' fill='white' opacity='0.5'/%3E%3C/svg%3E`

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
      {/* Layer 5 - Atmospheric Glow */}
      <div className="absolute top-[-25%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-accent/[0.04] blur-[120px]" />
      <div className="absolute bottom-[-25%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-accent/[0.06] blur-[150px]" />

      {/* Layer 2 - Star Field */}
      <div 
        className="absolute inset-0 z-0 animate-twinkle opacity-30" 
        style={{ backgroundImage: `url("${starsSvg}")`, backgroundSize: '120px 120px' }}
      />
      <div 
        className="absolute inset-0 z-0 animate-twinkle-slow opacity-20" 
        style={{ backgroundImage: `url("${starsSvg}")`, backgroundSize: '250px 250px', backgroundPosition: '50px 50px' }}
      />

      {/* Layer 4 - Deep Space Streaks */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-streaks opacity-[0.03]"
             style={{ 
               backgroundImage: 'linear-gradient(45deg, transparent 49.8%, var(--color-foreground) 49.9%, transparent 50%)',
               backgroundSize: '300px 300px'
             }} 
        />
        <div className="absolute inset-0 animate-streaks-slow opacity-[0.02]"
             style={{ 
               backgroundImage: 'linear-gradient(45deg, transparent 49.9%, var(--color-foreground) 50%, transparent 50.1%)',
               backgroundSize: '500px 500px',
               backgroundPosition: '100px 100px'
             }} 
        />
      </div>
    </div>
  )
}
