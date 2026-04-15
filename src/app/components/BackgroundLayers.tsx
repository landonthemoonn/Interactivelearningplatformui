import gradientImg from '../../imports/43F555DC-8301-4D3A-B2FE-3ED74CA4234E_4_5005_c.jpeg';

export function BackgroundLayers() {
  return (
    <>
      {/* Layer 1: Background Atmosphere - Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top right warm coral blob */}
        <div className="absolute -top-40 -right-40 w-[900px] h-[900px] rounded-full opacity-20 blur-[120px] animate-[pulse_15s_ease-in-out_infinite]"
             style={{
               background: 'radial-gradient(circle, #FF8B7B, #FFB5A0, transparent)',
             }} />

        {/* Bottom left cool aqua blob */}
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] rounded-full opacity-15 blur-[120px] animate-[pulse_20s_ease-in-out_infinite]"
             style={{
               background: 'radial-gradient(circle, #7DD3FC, #C4B5FD, transparent)',
             }} />

        {/* Center accent lavender blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-12 blur-[140px] animate-[pulse_18s_ease-in-out_infinite]"
             style={{
               background: 'radial-gradient(circle, #FFA6C9, #C4B5FD, transparent)',
             }} />

        {/* Right side peach blob */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px] animate-[pulse_22s_ease-in-out_infinite]"
             style={{
               background: 'radial-gradient(circle, #FFB5A0, #FFA6C9, transparent)',
             }} />

        {/* Gradient Image as atmospheric element */}
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] opacity-5 blur-[100px] animate-[pulse_25s_ease-in-out_infinite]">
          <img src={gradientImg} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Layer 2: Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat',
           }} />

      {/* Subtle vignette */}
      <div className="fixed inset-0 pointer-events-none"
           style={{
             background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 11, 0.4) 100%)',
           }} />
    </>
  );
}
