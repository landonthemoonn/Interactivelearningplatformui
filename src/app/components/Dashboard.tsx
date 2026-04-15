import { ArrowRight, Terminal, Sparkles, Target, Clock, TrendingUp, CheckCircle2, Flame, BookMarked, AlertTriangle } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="w-full p-8 pb-16 space-y-8 animate-[fadeIn_0.6s_ease-out]">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2rem] p-12"
           style={{
             background: 'linear-gradient(135deg, rgba(255, 139, 123, 0.15), rgba(196, 181, 253, 0.15))',
             border: '1px solid rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(20px)',
           }}>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{
                 background: 'rgba(255, 139, 123, 0.2)',
                 border: '1px solid rgba(255, 139, 123, 0.3)',
               }}>
            <Sparkles className="w-4 h-4 text-[#FF8B7B]" />
            <span className="text-sm text-[#FF8B7B]" style={{ fontFamily: 'var(--font-body)' }}>
              AI-Powered Learning
            </span>
          </div>

          <h1 className="text-6xl mb-6 tracking-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, #F5F5F0, #FF8B7B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
            Learn scripting for the Apple environment
          </h1>

          <p className="text-xl opacity-80 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Master shell, AppleScript, and AI-assisted automation through real-world lessons,
            guided labs, and script reviews.
          </p>

          <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #FF8B7B, #FFA6C9)',
                    boxShadow: '0 8px 24px rgba(255, 139, 123, 0.4)',
                  }}>
            <span className="text-[#0A0A0B]" style={{ fontFamily: 'var(--font-body)' }}>
              Continue Learning
            </span>
            <ArrowRight className="w-5 h-5 text-[#0A0A0B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative gradient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl"
             style={{ background: 'radial-gradient(circle, #FF8B7B, transparent)' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl"
             style={{ background: 'radial-gradient(circle, #C4B5FD, transparent)' }} />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Continue Learning - Large */}
        <div className="col-span-8 row-span-2 rounded-[2rem] p-8 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-sm opacity-60 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                Shell Scripting Fundamentals
              </div>
              <h3 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Lesson 12: Error Handling
              </h3>
              <p className="opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
                Learn to catch and handle errors gracefully in your scripts
              </p>
            </div>
            <div className="px-4 py-2 rounded-full text-sm"
                 style={{
                   background: 'rgba(125, 211, 252, 0.2)',
                   color: '#7DD3FC',
                 }}>
              65% Complete
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="h-2 rounded-full overflow-hidden"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="h-full rounded-full transition-all duration-500"
                   style={{
                     width: '65%',
                     background: 'linear-gradient(90deg, #7DD3FC, #C4B5FD)',
                   }} />
            </div>
            <div className="flex items-center gap-4 text-sm opacity-60">
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

          <button className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
            <span style={{ fontFamily: 'var(--font-body)' }}>Resume Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Current Streak */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
             style={{
               background: 'linear-gradient(135deg, rgba(255, 139, 123, 0.15), rgba(255, 181, 160, 0.15))',
               border: '1px solid rgba(255, 139, 123, 0.3)',
               backdropFilter: 'blur(20px)',
             }}>
          <Flame className="w-8 h-8 text-[#FF8B7B] mb-4" />
          <div className="text-5xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            12
          </div>
          <div className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
            Day Streak
          </div>
          <div className="mt-4 text-xs opacity-60">
            Keep it going! 🔥
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
             style={{
               background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.15), rgba(134, 239, 172, 0.15))',
               border: '1px solid rgba(125, 211, 252, 0.3)',
               backdropFilter: 'blur(20px)',
             }}>
          <CheckCircle2 className="w-8 h-8 text-[#7DD3FC] mb-4" />
          <div className="text-5xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            38
          </div>
          <div className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
            Lessons Completed
          </div>
          <div className="mt-4 text-xs opacity-60">
            +3 this week
          </div>
        </div>

        {/* Shell Scripting Path */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <Terminal className="w-8 h-8 text-[#86EFAC] mb-4" />
          <h4 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Shell Scripting
          </h4>
          <p className="text-sm opacity-80 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            Master bash fundamentals
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="h-full rounded-full"
                   style={{
                     width: '70%',
                     background: '#86EFAC',
                   }} />
            </div>
            <span className="text-xs opacity-60">70%</span>
          </div>
        </div>

        {/* AppleScript Basics */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <BookMarked className="w-8 h-8 text-[#C4B5FD] mb-4" />
          <h4 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            AppleScript
          </h4>
          <p className="text-sm opacity-80 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            Automate macOS workflows
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="h-full rounded-full"
                   style={{
                     width: '45%',
                     background: '#C4B5FD',
                   }} />
            </div>
            <span className="text-xs opacity-60">45%</span>
          </div>
        </div>

        {/* AI Assistance */}
        <div className="col-span-4 rounded-[2rem] p-6 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
             style={{
               background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.15), rgba(167, 139, 250, 0.15))',
               border: '1px solid rgba(196, 181, 253, 0.3)',
               backdrop: 'blur(20px)',
             }}>
          <Sparkles className="w-8 h-8 text-[#C4B5FD] mb-4" />
          <h4 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            AI Coach
          </h4>
          <p className="text-sm opacity-80 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            Claude & Gemini assist
          </p>
          <div className="text-xs opacity-60">
            Available 24/7
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="col-span-6 rounded-[2rem] p-6 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <AlertTriangle className="w-8 h-8 text-[#FFA6C9] mb-4" />
          <h4 className="text-xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Common Mistakes to Avoid
          </h4>
          <ul className="space-y-2 text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
            <li className="flex items-start gap-2">
              <span className="text-[#FFA6C9] mt-1">•</span>
              <span>Forgetting to quote variables with spaces</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFA6C9] mt-1">•</span>
              <span>Not checking command exit codes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFA6C9] mt-1">•</span>
              <span>Hardcoding paths instead of using variables</span>
            </li>
          </ul>
        </div>

        {/* Progress Insights */}
        <div className="col-span-6 rounded-[2rem] p-6 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <TrendingUp className="w-8 h-8 text-[#7DD3FC] mb-4" />
          <h4 className="text-xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            This Week's Progress
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl mb-1" style={{ fontFamily: 'var(--font-heading)' }}>5</div>
              <div className="text-xs opacity-60">Lessons</div>
            </div>
            <div>
              <div className="text-2xl mb-1" style={{ fontFamily: 'var(--font-heading)' }}>12</div>
              <div className="text-xs opacity-60">Scripts</div>
            </div>
            <div>
              <div className="text-2xl mb-1" style={{ fontFamily: 'var(--font-heading)' }}>3h</div>
              <div className="text-xs opacity-60">Study Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
