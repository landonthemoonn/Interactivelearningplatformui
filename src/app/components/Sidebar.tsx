import { Home, BookOpen, Code, Sparkles, TrendingUp, Settings, Save } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'playground', label: 'Playground', icon: Code },
    { id: 'ai-coach', label: 'AI Coach', icon: Sparkles },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'saved', label: 'Saved Work', icon: Save },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 p-6 flex flex-col gap-8"
         style={{
           background: 'rgba(28, 28, 30, 0.4)',
           backdropFilter: 'blur(20px)',
           borderRight: '1px solid rgba(255, 255, 255, 0.06)'
         }}>
      {/* Logo */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8B7B] to-[#FFA6C9] flex items-center justify-center">
            <Code className="w-5 h-5 text-[#0A0A0B]" />
          </div>
          <div>
            <h1 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Apple Admin
            </h1>
            <p className="text-xs opacity-60">Scripting Lab</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300"
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(255, 139, 123, 0.2), rgba(255, 166, 201, 0.2))'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(255, 139, 123, 0.3)'
                  : '1px solid transparent',
                color: isActive ? '#FF8B7B' : '#A1A1AA',
                fontFamily: 'var(--font-body)',
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="flex items-center gap-3 p-4 rounded-2xl"
           style={{
             background: 'rgba(255, 255, 255, 0.03)',
             border: '1px solid rgba(255, 255, 255, 0.06)'
           }}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C4B5FD] to-[#7DD3FC]" />
        <div className="flex-1">
          <p className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>Creative Pro</p>
          <p className="text-xs opacity-60">Level 12</p>
        </div>
      </div>
    </div>
  );
}
