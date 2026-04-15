import { Home, BookOpen, Code, Sparkles, TrendingUp, Settings } from 'lucide-react';

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
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 p-5 flex flex-col gap-8"
         style={{
           background: 'rgba(15, 15, 17, 0.5)',
           backdropFilter: 'blur(40px) saturate(150%)',
           borderRight: '1px solid rgba(255, 255, 255, 0.08)',
           boxShadow: 'inset -1px 0 0 rgba(255, 255, 255, 0.02)',
         }}>
      {/* Logo */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[1.1rem] flex items-center justify-center relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, #FF8B7B 0%, #FFA6C9 100%)',
                 boxShadow: '0 4px 16px rgba(255, 139, 123, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
               }}>
            <Code className="w-5 h-5 text-[#0A0A0B] relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
          <div>
            <div className="text-[15px] tracking-tight leading-tight mb-0.5"
                 style={{
                   fontFamily: 'var(--font-heading)',
                   fontWeight: 600,
                   letterSpacing: '-0.02em',
                 }}>
              Apple Admin
            </div>
            <div className="text-[11px] opacity-50 tracking-wide uppercase"
                 style={{ letterSpacing: '0.06em' }}>
              Scripting Lab
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group flex items-center gap-3 px-3.5 py-3 rounded-[1rem] transition-all duration-300 relative"
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(255, 139, 123, 0.15), rgba(255, 166, 201, 0.12))'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(255, 139, 123, 0.25)'
                  : '1px solid transparent',
                color: isActive ? '#FFB5A0' : '#A1A1AA',
                fontFamily: 'var(--font-body)',
                boxShadow: isActive
                  ? '0 2px 12px rgba(255, 139, 123, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  : 'none',
              }}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-[1rem] opacity-60"
                     style={{
                       background: 'radial-gradient(circle at 50% 0%, rgba(255, 139, 123, 0.1), transparent 70%)',
                     }} />
              )}
              <Icon className={`w-[18px] h-[18px] relative z-10 transition-transform duration-300 ${!isActive && 'group-hover:scale-110'}`}
                    style={{ strokeWidth: isActive ? 2.5 : 2 }} />
              <span className="text-[13px] relative z-10 tracking-wide"
                    style={{ fontWeight: isActive ? 500 : 400 }}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Settings at bottom of nav */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <button
            onClick={() => onNavigate('settings')}
            className="group flex items-center gap-3 px-3.5 py-3 rounded-[1rem] transition-all duration-300 w-full"
            style={{
              background: activeView === 'settings'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'transparent',
              color: activeView === 'settings' ? '#F5F5F0' : '#71717A',
            }}
          >
            <Settings className="w-[18px] h-[18px] group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-[13px] tracking-wide">Settings</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="flex items-center gap-3 p-3.5 rounded-[1rem] relative overflow-hidden"
           style={{
             background: 'rgba(255, 255, 255, 0.03)',
             border: '1px solid rgba(255, 255, 255, 0.06)',
             boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)',
           }}>
        <div className="w-10 h-10 rounded-full relative overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, #C4B5FD, #7DD3FC)',
               boxShadow: '0 2px 8px rgba(196, 181, 253, 0.3)',
             }}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] truncate tracking-wide mb-0.5"
             style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            Creative Pro
          </p>
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded-md text-[10px] tracking-wider uppercase"
                 style={{
                   background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.15), rgba(125, 211, 252, 0.15))',
                   color: '#86EFAC',
                   border: '1px solid rgba(134, 239, 172, 0.2)',
                 }}>
              Level 12
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
