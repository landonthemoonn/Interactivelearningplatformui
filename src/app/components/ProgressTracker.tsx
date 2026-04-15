import { TrendingUp, Award, Target, Flame, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export function ProgressTracker() {
  const skillData = [
    { skill: 'Error Handling', level: 85, color: '#86EFAC' },
    { skill: 'Variables & Arrays', level: 90, color: '#7DD3FC' },
    { skill: 'Conditionals', level: 95, color: '#C4B5FD' },
    { skill: 'Functions', level: 70, color: '#FFB5A0' },
    { skill: 'AppleScript Basics', level: 45, color: '#FFA6C9' },
    { skill: 'Jamf Integration', level: 60, color: '#FF8B7B' },
  ];

  const recentLessons = [
    { title: 'Error Handling & Exit Codes', date: 'Today', status: 'in-progress' },
    { title: 'Working with Arrays', date: 'Yesterday', status: 'completed' },
    { title: 'String Manipulation', date: '2 days ago', status: 'completed' },
    { title: 'File Operations', date: '3 days ago', status: 'completed' },
  ];

  const weakSpots = [
    { topic: 'Regular Expressions', attempts: 3, avgScore: 65 },
    { topic: 'Process Management', attempts: 2, avgScore: 70 },
    { topic: 'Network Commands', attempts: 4, avgScore: 60 },
  ];

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Your Progress
        </h1>
        <p className="opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
          Track your learning journey and identify areas for improvement
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-[2rem] p-6"
             style={{
               background: 'linear-gradient(135deg, rgba(255, 139, 123, 0.15), rgba(255, 181, 160, 0.15))',
               border: '1px solid rgba(255, 139, 123, 0.3)',
               backdropFilter: 'blur(20px)',
             }}>
          <Flame className="w-8 h-8 text-[#FF8B7B] mb-4" />
          <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>12</div>
          <div className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>Day Streak</div>
        </div>

        <div className="rounded-[2rem] p-6"
             style={{
               background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.15), rgba(134, 239, 172, 0.15))',
               border: '1px solid rgba(125, 211, 252, 0.3)',
               backdropFilter: 'blur(20px)',
             }}>
          <CheckCircle2 className="w-8 h-8 text-[#7DD3FC] mb-4" />
          <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>38</div>
          <div className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>Lessons Done</div>
        </div>

        <div className="rounded-[2rem] p-6"
             style={{
               background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.15), rgba(167, 139, 250, 0.15))',
               border: '1px solid rgba(196, 181, 253, 0.3)',
               backdropFilter: 'blur(20px)',
             }}>
          <Award className="w-8 h-8 text-[#C4B5FD] mb-4" />
          <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>15</div>
          <div className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>Labs Completed</div>
        </div>

        <div className="rounded-[2rem] p-6"
             style={{
               background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.15), rgba(125, 211, 252, 0.15))',
               border: '1px solid rgba(134, 239, 172, 0.3)',
               backdropFilter: 'blur(20px)',
             }}>
          <Clock className="w-8 h-8 text-[#86EFAC] mb-4" />
          <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>24h</div>
          <div className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>Study Time</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Scripting Confidence by Topic */}
        <div className="rounded-[2rem] p-8"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#7DD3FC]" />
            <h3 className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Skill Mastery
            </h3>
          </div>

          <div className="space-y-6">
            {skillData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90" style={{ fontFamily: 'var(--font-body)' }}>
                    {item.skill}
                  </span>
                  <span className="text-sm opacity-60">{item.level}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden"
                     style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.level}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-[2rem] p-8"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-[#86EFAC]" />
            <h3 className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Recent Lessons
            </h3>
          </div>

          <div className="space-y-4">
            {recentLessons.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{
                       background: lesson.status === 'completed'
                         ? 'rgba(134, 239, 172, 0.2)'
                         : 'rgba(125, 211, 252, 0.2)',
                     }}>
                  {lesson.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
                  ) : (
                    <Clock className="w-5 h-5 text-[#7DD3FC]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    {lesson.title}
                  </div>
                  <div className="text-xs opacity-60">{lesson.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weak Spots */}
      <div className="rounded-[2rem] p-8"
           style={{
             background: 'linear-gradient(135deg, rgba(255, 166, 201, 0.1), rgba(255, 139, 123, 0.1))',
             border: '1px solid rgba(255, 166, 201, 0.2)',
             backdropFilter: 'blur(20px)',
           }}>
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-[#FFA6C9]" />
          <h3 className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Areas to Improve
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {weakSpots.map((spot, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(28, 28, 30, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="text-xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {spot.topic}
              </div>
              <div className="flex items-center justify-between text-sm opacity-80 mb-2">
                <span>Attempts</span>
                <span>{spot.attempts}</span>
              </div>
              <div className="flex items-center justify-between text-sm opacity-80 mb-3">
                <span>Avg Score</span>
                <span>{spot.avgScore}%</span>
              </div>
              <button className="w-full px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
                      style={{
                        background: 'rgba(255, 166, 201, 0.2)',
                        border: '1px solid rgba(255, 166, 201, 0.3)',
                        color: '#FFA6C9',
                      }}>
                Practice Again
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path Progress */}
      <div className="rounded-[2rem] p-8"
           style={{
             background: 'rgba(28, 28, 30, 0.6)',
             border: '1px solid rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(20px)',
           }}>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-[#C4B5FD]" />
          <h3 className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Learning Path Progress
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
                 style={{
                   background: 'conic-gradient(#86EFAC 0% 70%, rgba(255, 255, 255, 0.1) 70% 100%)',
                 }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center"
                   style={{ background: '#0A0A0B' }}>
                <div>
                  <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-heading)' }}>70%</div>
                  <div className="text-xs opacity-60">Shell</div>
                </div>
              </div>
            </div>
            <div className="text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              Shell Scripting
            </div>
            <div className="text-sm opacity-60">18 of 25 lessons</div>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
                 style={{
                   background: 'conic-gradient(#C4B5FD 0% 45%, rgba(255, 255, 255, 0.1) 45% 100%)',
                 }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center"
                   style={{ background: '#0A0A0B' }}>
                <div>
                  <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-heading)' }}>45%</div>
                  <div className="text-xs opacity-60">Apple</div>
                </div>
              </div>
            </div>
            <div className="text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              AppleScript
            </div>
            <div className="text-sm opacity-60">9 of 20 lessons</div>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
                 style={{
                   background: 'conic-gradient(#7DD3FC 0% 30%, rgba(255, 255, 255, 0.1) 30% 100%)',
                 }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center"
                   style={{ background: '#0A0A0B' }}>
                <div>
                  <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-heading)' }}>30%</div>
                  <div className="text-xs opacity-60">AI</div>
                </div>
              </div>
            </div>
            <div className="text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              AI-Assisted
            </div>
            <div className="text-sm opacity-60">3 of 10 lessons</div>
          </div>
        </div>
      </div>
    </div>
  );
}
