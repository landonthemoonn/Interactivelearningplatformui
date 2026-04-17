import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { ScriptPlayground } from './components/ScriptPlayground';
import { AIAssistant } from './components/AIAssistant';
import { ProgressTracker } from './components/ProgressTracker';
import { PlaceholderView } from './components/PlaceholderView';
import { BackgroundLayers } from './components/BackgroundLayers';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard theme={theme} onNavigate={setActiveView} />;
      case 'lessons':
        return <LessonView theme={theme} />;
      case 'playground':
        return <ScriptPlayground theme={theme} />;
      case 'ai-coach':
        return <AIAssistant theme={theme} />;
      case 'progress':
        return <ProgressTracker theme={theme} />;
      case 'saved':
        return <PlaceholderView type="saved" theme={theme} />;
      case 'settings':
        return <PlaceholderView type="settings" theme={theme} />;
      default:
        return <Dashboard theme={theme} />;
    }
  };

  return (
    <div className={`size-full relative overflow-hidden ${theme}`}
         style={{
           fontFamily: 'var(--font-body)',
           background: theme === 'dark' ? '#0A0A0B' : '#F5F5F0',
         }}>
      {/* Multi-layer Background System */}
      <BackgroundLayers theme={theme} />

      {/* Layer 3: Glass Panels - UI Content */}
      <div className="relative z-10 flex size-full">
        <Sidebar activeView={activeView} onNavigate={setActiveView} theme={theme} onToggleTheme={toggleTheme} />

        <main className="flex-1 ml-64 overflow-y-auto scroll-smooth">
          {renderView()}
        </main>
      </div>
    </div>
  );
}