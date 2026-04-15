import { ArrowRight, Terminal, Sparkles, Target, Clock, TrendingUp, CheckCircle2, Flame, BookMarked, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="w-full p-8 pb-16 space-y-8 animate-[fadeIn_0.6s_ease-out]">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2rem] p-12"
           style={{
             background: 'linear-gradient(135deg, rgba(255, 139, 123, 0.08), rgba(196, 181, 253, 0.08))',
             border: '1px solid rgba(255, 255, 255, 0.12)',
             backdropFilter: 'blur(60px) saturate(180%)',
             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
           }}>
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-[2rem] opacity-40"
             style={{
               background: 'radial-gradient(circle at 30% 20%, rgba(255, 139, 123, 0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(196, 181, 253, 0.12), transparent 50%)',
             }} />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{
                 background: 'rgba(255, 139, 123, 0.15)',
                 border: '1px solid rgba(255, 139, 123, 0.3)',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 4px 16px rgba(255, 139, 123, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
               }}>
            <Sparkles className="w-4 h-4 text-[#FF8B7B]" />
            <span className="text-[13px] text-[#FFB5A0] tracking-wide" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              AI-Powered Learning
            </span>
          </div>

          <h1 className="text-6xl mb-6 tracking-tight leading-[1.1]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #F5F5F0 0%, #FFB5A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.03em',
              }}>
            Learn scripting for the Apple environment
          </h1>

          <p className="text-xl opacity-70 mb-8 leading-relaxed max-w-2xl"
             style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}>
            Master shell, AppleScript, and AI-assisted automation through real-world lessons,
            guided labs, and script reviews.
          </p>

          <button className="group flex items-center gap-3 px-8 py-4 rounded-[1.1rem] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #FF8B7B, #FFA6C9)',
                    boxShadow: '0 8px 24px rgba(255, 139, 123, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  }}>
            <span className="text-[#0A0A0B] tracking-wide" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              Continue Learning
            </span>
            <ArrowRight className="w-5 h-5 text-[#0A0A0B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative gradient bloom */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none"
             style={{ background: 'radial-gradient(circle, #FF8B7B, transparent)' }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full opacity-15 blur-[100px] pointer-events-none"
             style={{ background: 'radial-gradient(circle, #C4B5FD, transparent)' }} />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Continue Learning - Large */}
        <div className="col-span-8 row-span-2 rounded-[2rem] p-8 group cursor-pointer transition-all duration-500 hover:scale-[1.01] relative overflow-hidden"
             style={{
               background: 'rgba(20, 20, 22, 0.4)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(60px) saturate(180%)',
               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
             }}>
          {/* Localized glow */}
          <div className="absolute inset-0 opacity-30 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at 80% 20%, rgba(125, 211, 252, 0.15), transparent 60%)',
               }} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-[13px] opacity-50 mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-body)' }}>
                  Shell Scripting Fundamentals
                </div>
                <h3 className="text-3xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  Lesson 12: Error Handling
                </h3>
                <p className="opacity-70 text-[15px] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  Learn to catch and handle errors gracefully in your scripts
                </p>
              </div>
              <div className="px-4 py-2 rounded-full text-[13px] tracking-wide"
                   style={{
                     background: 'rgba(125, 211, 252, 0.15)',
                     color: '#7DD3FC',
                     border: '1px solid rgba(125, 211, 252, 0.25)',
                     backdropFilter: 'blur(20px)',
                     boxShadow: '0 4px 12px rgba(125, 211, 252, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                     fontWeight: 500,
                   }}>
                65% Complete
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="h-2.5 rounded-full overflow-hidden relative"
                   style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     border: '1px solid rgba(255, 255, 255, 0.08)',
                   }}>
                <div className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
                     style={{
                       width: '65%',
                       background: 'linear-gradient(90deg, #7DD3FC, #C4B5FD)',
                       boxShadow: '0 0 20px rgba(125, 211, 252, 0.5)',
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
              <div className="flex items-center gap-4 text-[13px] opacity-50">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>15 min left</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Intermediate</span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 rounded-[1rem] transition-all hover:scale-[1.02]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px' }}>Resume Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Streak */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, rgba(255, 139, 123, 0.08), rgba(255, 181, 160, 0.08))',
               border: '1px solid rgba(255, 139, 123, 0.25)',
               backdropFilter: 'blur(60px) saturate(180%)',
               boxShadow: '0 8px 24px rgba(255, 139, 123, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
             }}>
          <div className="absolute inset-0 opacity-40 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at 50% 30%, rgba(255, 139, 123, 0.2), transparent 70%)',
               }} />
          <div className="relative z-10">
            <Flame className="w-8 h-8 text-[#FF8B7B] mb-4 drop-shadow-[0_0_12px_rgba(255,139,123,0.6)]" />
            <div className="text-5xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.03em' }}>
              12
            </div>
            <div className="text-[13px] opacity-70 tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
              Day Streak
            </div>
            <div className="mt-4 text-[12px] opacity-50">
              Keep it going! 🔥
            </div>
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.08), rgba(134, 239, 172, 0.08))',
               border: '1px solid rgba(125, 211, 252, 0.25)',
               backdropFilter: 'blur(60px) saturate(180%)',
               boxShadow: '0 8px 24px rgba(125, 211, 252, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
             }}>
          <div className="absolute inset-0 opacity-40 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at 50% 30%, rgba(125, 211, 252, 0.2), transparent 70%)',
               }} />
          <div className="relative z-10">
            <CheckCircle2 className="w-8 h-8 text-[#7DD3FC] mb-4 drop-shadow-[0_0_12px_rgba(125,211,252,0.6)]" />
            <div className="text-5xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.03em' }}>
              38
            </div>
            <div className="text-[13px] opacity-70 tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
              Lessons Completed
            </div>
            <div className="mt-4 text-[12px] opacity-50">
              +3 this week
            </div>
          </div>
        </div>

        {/* Shell Scripting Path */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
             style={{
               background: 'rgba(20, 20, 22, 0.4)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(60px) saturate(180%)',
               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
             }}>
          <div className="absolute inset-0 opacity-25 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at 70% 30%, rgba(134, 239, 172, 0.15), transparent 70%)',
               }} />
          <div className="relative z-10">
            <Terminal className="w-8 h-8 text-[#86EFAC] mb-4 drop-shadow-[0_0_12px_rgba(134,239,172,0.5)]" />
            <h4 className="text-xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              Shell Scripting
            </h4>
            <p className="text-[13px] opacity-60 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              Master bash fundamentals
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden relative"
                   style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     border: '1px solid rgba(255, 255, 255, 0.08)',
                   }}>
                <div className="h-full rounded-full relative overflow-hidden"
                     style={{
                       width: '70%',
                       background: '#86EFAC',
                       boxShadow: '0 0 16px rgba(134, 239, 172, 0.6)',
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
              <span className="text-[12px] opacity-50 font-medium">70%</span>
            </div>
          </div>
        </div>

        {/* AppleScript Basics */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
             style={{
               background: 'rgba(20, 20, 22, 0.4)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(60px) saturate(180%)',
               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
             }}>
          <div className="absolute inset-0 opacity-25 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at 70% 30%, rgba(196, 181, 253, 0.15), transparent 70%)',
               }} />
          <div className="relative z-10">
            <BookMarked className="w-8 h-8 text-[#C4B5FD] mb-4 drop-shadow-[0_0_12px_rgba(196,181,253,0.5)]" />
            <h4 className="text-xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              AppleScript
            </h4>
            <p className="text-[13px] opacity-60 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              Automate macOS workflows
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden relative"
                   style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     border: '1px solid rgba(255, 255, 255, 0.08)',
                   }}>
                <div className="h-full rounded-full relative overflow-hidden"
                     style={{
                       width: '45%',
                       background: '#C4B5FD',
                       boxShadow: '0 0 16px rgba(196, 181, 253, 0.6)',
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
              <span className="text-[12px] opacity-50 font-medium">45%</span>
            </div>
          </div>
        </div>

        {/* AI Assistance */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.08), rgba(167, 139, 250, 0.08))',
               border: '1px solid rgba(196, 181, 253, 0.25)',
               backdropFilter: 'blur(60px) saturate(180%)',
               boxShadow: '0 8px 24px rgba(196, 181, 253, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
             }}>
          <div className="absolute inset-0 opacity-40 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at 50% 30%, rgba(196, 181, 253, 0.2), transparent 70%)',
               }} />
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-[#C4B5FD] mb-4 drop-shadow-[0_0_12px_rgba(196,181,253,0.6)]" />
            <h4 className="text-xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              AI Coach
            </h4>
            <p className="text-[13px] opacity-60 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              Claude & Gemini assist
            </p>
            <div className="text-[12px] opacity-50">
              Available 24/7
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="col-span-6 rounded-[2rem] p-6 group cursor-pointer transition-all duration-500 hover:scale-[1.01] relative overflow-hidden"
             style={{
               background: 'rgba(20, 20, 22, 0.4)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(60px) saturate(180%)',
               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
             }}>
          <div className="absolute inset-0 opacity-20 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at 80% 20%, rgba(255, 166, 201, 0.12), transparent 70%)',
               }} />
          <div className="relative z-10">
            <AlertTriangle className="w-8 h-8 text-[#FFA6C9] mb-4 drop-shadow-[0_0_12px_rgba(255,166,201,0.5)]" />
            <h4 className="text-xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              Common Mistakes to Avoid
            </h4>
            <ul className="space-y-2 text-[13px] opacity-70" style={{ fontFamily: 'var(--font-body)' }}>
              <li className="flex items-start gap-2">
                <span className="text-[#FFA6C9] mt-0.5">•</span>
                <span>Forgetting to quote variables with spaces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFA6C9] mt-0.5">•</span>
                <span>Not checking command exit codes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFA6C9] mt-0.5">•</span>
                <span>Hardcoding paths instead of using variables</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Progress Insights */}
        <div className="col-span-6 rounded-[2rem] p-6 group cursor-pointer transition-all duration-500 hover:scale-[1.01] relative overflow-hidden"
             style={{
               background: 'rgba(20, 20, 22, 0.4)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(60px) saturate(180%)',
               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
             }}>
          <div className="absolute inset-0 opacity-20 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at 20% 20%, rgba(125, 211, 252, 0.12), transparent 70%)',
               }} />
          <div className="relative z-10">
            <TrendingUp className="w-8 h-8 text-[#7DD3FC] mb-4 drop-shadow-[0_0_12px_rgba(125,211,252,0.5)]" />
            <h4 className="text-xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              This Week's Progress
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl mb-1 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>5</div>
                <div className="text-[12px] opacity-50">Lessons</div>
              </div>
              <div>
                <div className="text-2xl mb-1 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>12</div>
                <div className="text-[12px] opacity-50">Scripts</div>
              </div>
              <div>
                <div className="text-2xl mb-1 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>3h</div>
                <div className="text-[12px] opacity-50">Study Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
