import { Clock, Target, CheckCircle2, ArrowRight, BookOpen, AlertCircle, Lightbulb, Code2 } from 'lucide-react';

interface LessonViewProps {
  theme: 'light' | 'dark';
}

export function LessonView({ theme }: LessonViewProps) {
  const isDark = theme === 'dark';

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Lesson Header */}
      <div className="rounded-[2rem] p-8"
           style={{
             background: isDark
               ? 'linear-gradient(135deg, rgba(255, 139, 123, 0.15), rgba(125, 211, 252, 0.15))'
               : 'linear-gradient(135deg, rgba(255, 139, 123, 0.2), rgba(125, 211, 252, 0.2))',
             border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.4)',
             backdropFilter: 'blur(60px) saturate(180%)',
             boxShadow: isDark
               ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
               : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
           }}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 rounded-full text-xs"
                   style={{
                     background: 'rgba(125, 211, 252, 0.2)',
                     color: '#7DD3FC',
                   }}>
                Shell Scripting Fundamentals
              </div>
              <div className="px-3 py-1 rounded-full text-xs"
                   style={{
                     background: 'rgba(134, 239, 172, 0.2)',
                     color: '#86EFAC',
                   }}>
                Lesson 12
              </div>
            </div>

            <h1 className="text-5xl mb-4 tracking-tight"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: isDark ? '#F5F5F0' : '#0A0A0B',
                }}>
              Error Handling & Exit Codes
            </h1>

            <div className="flex items-center gap-6 text-sm opacity-80"
                 style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Chapter 3 of 5</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl mb-2"
                 style={{
                   fontFamily: 'var(--font-heading)',
                   color: isDark ? '#F5F5F0' : '#0A0A0B',
                 }}>
              65%
            </div>
            <div className="text-sm opacity-60">Complete</div>
          </div>
        </div>

        <div className="h-2 rounded-full overflow-hidden"
             style={{
               background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
             }}>
          <div className="h-full rounded-full transition-all duration-500"
               style={{
                 width: '65%',
                 background: 'linear-gradient(90deg, #7DD3FC, #86EFAC)',
               }} />
        </div>
      </div>

      {/* Placeholder for remaining lesson content */}
      <div className="text-center py-12 opacity-50"
           style={{
             fontFamily: 'var(--font-body)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
        Additional lesson content...
      </div>
    </div>
  );
}
