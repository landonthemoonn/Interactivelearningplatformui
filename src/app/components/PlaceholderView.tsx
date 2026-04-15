import { Settings, Save } from 'lucide-react';

interface PlaceholderViewProps {
  type: 'settings' | 'saved';
  theme: 'light' | 'dark';
}

export function PlaceholderView({ type, theme }: PlaceholderViewProps) {
  const isDark = theme === 'dark';
  const config = {
    settings: {
      icon: Settings,
      title: 'Settings',
      desc: 'Configure your learning preferences, notifications, and account settings',
    },
    saved: {
      icon: Save,
      title: 'Saved Work',
      desc: 'Access your saved scripts, bookmarked lessons, and code snippets',
    },
  };

  const { icon: Icon, title, desc } = config[type];

  return (
    <div className="w-full p-8 flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#C4B5FD] to-[#7DD3FC] flex items-center justify-center">
          <Icon className="w-10 h-10 text-[#0A0A0B]" />
        </div>
        <h2 className="text-3xl mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#F5F5F0' : '#0A0A0B',
            }}>
          {title}
        </h2>
        <p className="opacity-80"
           style={{
             fontFamily: 'var(--font-body)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
          {desc}
        </p>
      </div>
    </div>
  );
}
