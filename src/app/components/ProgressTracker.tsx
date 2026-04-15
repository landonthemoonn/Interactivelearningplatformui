import { TrendingUp } from 'lucide-react';

interface ProgressTrackerProps {
  theme: 'light' | 'dark';
}

export function ProgressTracker({ theme }: ProgressTrackerProps) {
  const isDark = theme === 'dark';

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      <div className="text-center py-20"
           style={{
             fontFamily: 'var(--font-heading)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
        <h1 className="text-4xl mb-4">Your Progress</h1>
        <p className="opacity-60 max-w-xl mx-auto"
           style={{ fontFamily: 'var(--font-body)' }}>
          Track your learning journey and identify areas for improvement
        </p>
      </div>
    </div>
  );
}
