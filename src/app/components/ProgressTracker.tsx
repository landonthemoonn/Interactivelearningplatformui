import { TrendingUp, Flame, CheckCircle2, Clock, Target, BookOpen, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { learningModules, getModuleProgress } from '../../data/learningModules';

interface ProgressTrackerProps {
  theme: 'light' | 'dark';
}

const weeklyActivity = [
  { day: 'Mon', lessons: 2, minutes: 28 },
  { day: 'Tue', lessons: 1, minutes: 15 },
  { day: 'Wed', lessons: 3, minutes: 42 },
  { day: 'Thu', lessons: 0, minutes: 0 },
  { day: 'Fri', lessons: 2, minutes: 35 },
  { day: 'Sat', lessons: 4, minutes: 58 },
  { day: 'Sun', lessons: 1, minutes: 20 },
];

const skillData = [
  { skill: 'Variables', value: 90 },
  { skill: 'Control Flow', value: 85 },
  { skill: 'Functions', value: 75 },
  { skill: 'Error Handling', value: 60 },
  { skill: 'File I/O', value: 70 },
  { skill: 'AppleScript', value: 45 },
];

const recentActivity = [
  { lesson: 'Input & Output', module: 'Shell', time: '2h ago', completed: true },
  { lesson: 'Process Management', module: 'Shell', time: '1d ago', completed: true },
  { lesson: 'Regular Expressions', module: 'Shell', time: '1d ago', completed: true },
  { lesson: 'File System Operations', module: 'AppleScript', time: '2d ago', completed: false },
  { lesson: 'Handlers & Subroutines', module: 'AppleScript', time: '3d ago', completed: true },
];

export function ProgressTracker({ theme }: ProgressTrackerProps) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#F5F5F0' : '#0A0A0B';

  const glassStyle = {
    background: isDark ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.6)',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.5)',
    backdropFilter: 'blur(40px) saturate(180%)',
    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)',
  } as React.CSSProperties;

  const totalCompleted = learningModules.reduce((sum, m) => sum + m.lessons.filter(l => l.completed).length, 0);
  const totalLessons = learningModules.reduce((sum, m) => sum + m.lessons.length, 0);
  const overallPct = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="w-full p-8 pb-16 space-y-8 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="rounded-[2rem] p-8" style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(125,211,252,0.08), rgba(196,181,253,0.06))'
          : 'linear-gradient(135deg, rgba(125,211,252,0.12), rgba(196,181,253,0.1))',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.5)',
        backdropFilter: 'blur(60px)',
      }}>
        <h1 className="text-5xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.03em', color: textColor }}>
          Your Progress
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', opacity: 0.6, color: textColor }}>
          Track your learning journey across all modules and skill areas.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { icon: Flame, label: 'Day Streak', value: '12', sub: 'Personal best: 18', color: '#FF8B7B' },
          { icon: CheckCircle2, label: 'Lessons Done', value: String(totalCompleted), sub: `of ${totalLessons} total`, color: '#86EFAC' },
          { icon: Clock, label: 'Study Time', value: '14.2h', sub: 'This month', color: '#7DD3FC' },
          { icon: TrendingUp, label: 'Overall', value: `${overallPct}%`, sub: 'Course completion', color: '#C4B5FD' },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-[1.5rem] p-5" style={glassStyle}>
              <Icon className="w-6 h-6 mb-3" style={{ color: stat.color, filter: `drop-shadow(0 0 8px ${stat.color}80)` }} />
              <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>{stat.value}</div>
              <div className="text-sm font-medium mb-0.5" style={{ fontFamily: 'var(--font-body)', color: textColor }}>{stat.label}</div>
              <div className="text-xs opacity-45" style={{ fontFamily: 'var(--font-body)', color: textColor }}>{stat.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Weekly Activity Chart */}
        <div className="col-span-7 rounded-[1.5rem] p-6" style={glassStyle}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>Weekly Activity</h2>
            <div className="flex items-center gap-4 text-xs opacity-50" style={{ color: textColor, fontFamily: 'var(--font-body)' }}>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#7DD3FC' }} />Lessons</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#C4B5FD' }} />Minutes</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyActivity} barGap={4}>
              <XAxis dataKey="day" tick={{ fill: isDark ? '#71717A' : '#A1A1AA', fontSize: 12, fontFamily: 'var(--font-body)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: isDark ? 'rgba(20,20,22,0.9)' : 'rgba(255,255,255,0.9)',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  color: textColor,
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                }}
                cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}
              />
              <Bar dataKey="lessons" fill="#7DD3FC" radius={[6, 6, 0, 0]} maxBarSize={28} />
              <Bar dataKey="minutes" fill="#C4B5FD" radius={[6, 6, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar */}
        <div className="col-span-5 rounded-[1.5rem] p-6" style={glassStyle}>
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>Skill Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={skillData} outerRadius={75}>
              <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} />
              <PolarAngleAxis dataKey="skill" tick={{ fill: isDark ? '#71717A' : '#A1A1AA', fontSize: 10, fontFamily: 'var(--font-body)' }} />
              <Radar name="Skills" dataKey="value" stroke="#FF8B7B" fill="#FF8B7B" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Module Progress */}
        <div className="col-span-6 rounded-[1.5rem] p-6" style={glassStyle}>
          <h2 className="text-lg font-semibold mb-5" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>Module Progress</h2>
          <div className="space-y-5">
            {learningModules.map(m => {
              const pct = getModuleProgress(m);
              const done = m.lessons.filter(l => l.completed).length;
              return (
                <div key={m.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: textColor }}>{m.title}</span>
                      <span className="ml-2 text-xs opacity-40" style={{ color: textColor }}>{done}/{m.lessons.length} lessons</span>
                    </div>
                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)', color: m.color }}>{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: m.color, boxShadow: `0 0 12px ${m.glowColor}` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-6 rounded-[1.5rem] p-6" style={glassStyle}>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-[#7DD3FC]" />
            <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-2" style={{ borderBottom: i < recentActivity.length - 1 ? (isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)') : 'none' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{
                  background: item.completed ? 'rgba(134,239,172,0.15)' : 'rgba(255,166,201,0.15)',
                }}>
                  {item.completed
                    ? <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
                    : <Target className="w-4 h-4 text-[#FFA6C9]" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ fontFamily: 'var(--font-body)', color: textColor }}>{item.lesson}</div>
                  <div className="text-xs opacity-40" style={{ color: textColor }}>{item.module}</div>
                </div>
                <span className="text-xs opacity-40 shrink-0" style={{ fontFamily: 'var(--font-body)', color: textColor }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement */}
        <div className="col-span-12 rounded-[1.5rem] p-6" style={{
          ...glassStyle,
          background: isDark ? 'linear-gradient(135deg, rgba(255,139,123,0.08), rgba(196,181,253,0.06))' : 'linear-gradient(135deg, rgba(255,139,123,0.1), rgba(196,181,253,0.08))',
          border: '1px solid rgba(255,139,123,0.2)',
        }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF8B7B, #FFA6C9)', boxShadow: '0 4px 20px rgba(255,139,123,0.4)' }}>
              <Award className="w-7 h-7 text-[#0A0A0B]" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>Next Milestone: Shell Expert</h3>
              <p className="text-sm opacity-60" style={{ fontFamily: 'var(--font-body)', color: textColor }}>
                Complete Lesson 12 (Error Handling) to earn the Shell Scripting Fundamentals certificate — just 1 lesson away!
              </p>
            </div>
            <div className="ml-auto text-right shrink-0">
              <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: '#FF8B7B' }}>92%</div>
              <div className="text-xs opacity-50" style={{ color: textColor }}>to next badge</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
