import gradientImg from '../../imports/43F555DC-8301-4D3A-B2FE-3ED74CA4234E_4_5005_c.jpeg';

export function BackgroundLayers() {
  return (
    <>
      {/* Layer 1: Intentional Gradient Bloom Zones */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top-right coral bloom - hero area */}
        <div className="absolute -top-96 -right-96 w-[1200px] h-[1200px] rounded-full opacity-[0.18] blur-[140px] animate-[pulse_18s_ease-in-out_infinite]"
             style={{
               background: 'radial-gradient(circle, #FF8B7B 0%, #FFB5A0 30%, transparent 70%)',
             }} />

        {/* Left sidebar lavender glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[800px] opacity-[0.12] blur-[100px]"
             style={{
               background: 'radial-gradient(ellipse at left, #C4B5FD 0%, #A78BFA 40%, transparent 70%)',
             }} />

        {/* Bottom-left aqua pool */}
        <div className="absolute -bottom-64 left-1/4 w-[900px] h-[900px] rounded-full opacity-[0.14] blur-[130px] animate-[pulse_22s_ease-in-out_infinite]"
             style={{
               background: 'radial-gradient(circle, #7DD3FC 0%, #86EFAC 35%, transparent 65%)',
             }} />

        {/* Center-right peach bloom */}
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full opacity-[0.1] blur-[110px] animate-[pulse_20s_ease-in-out_infinite]"
             style={{
               background: 'radial-gradient(circle, #FFB5A0 0%, #FFA6C9 40%, transparent 70%)',
             }} />

        {/* Mid-left violet accent */}
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px] animate-[pulse_24s_ease-in-out_infinite]"
             style={{
               background: 'radial-gradient(circle, #A78BFA 0%, #C4B5FD 30%, transparent 60%)',
             }} />

        {/* Gradient image bloom - upper third */}
        <div className="absolute top-[15%] right-[25%] w-[800px] h-[800px] opacity-[0.06] blur-[120px] animate-[pulse_26s_ease-in-out_infinite] mix-blend-screen">
          <img src={gradientImg} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Layer 2: Fine Film Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat',
           }} />

      {/* Additional subtle grain layer for richness */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.2' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat',
           }} />

      {/* Cinematic vignette with gradient falloff */}
      <div className="fixed inset-0 pointer-events-none"
           style={{
             background: 'radial-gradient(ellipse at center, transparent 20%, rgba(10, 10, 11, 0.3) 70%, rgba(10, 10, 11, 0.6) 100%)',
           }} />

      {/* Edge darkening for depth */}
      <div className="fixed inset-0 pointer-events-none"
           style={{
             background: 'linear-gradient(to right, rgba(10, 10, 11, 0.4) 0%, transparent 15%, transparent 85%, rgba(10, 10, 11, 0.4) 100%)',
           }} />
    </>
  );
}
