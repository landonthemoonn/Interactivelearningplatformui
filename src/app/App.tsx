import { useState } from 'react';
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

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'lessons':
        return <LessonView />;
      case 'playground':
        return <ScriptPlayground />;
      case 'ai-coach':
        return <AIAssistant />;
      case 'progress':
        return <ProgressTracker />;
      case 'saved':
        return <PlaceholderView type="saved" />;
      case 'settings':
        return <PlaceholderView type="settings" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="size-full relative overflow-hidden"
         style={{
           fontFamily: 'var(--font-body)',
           background: '#0A0A0B',
         }}>
      {/* Multi-layer Background System */}
      <BackgroundLayers />

      {/* Layer 3: Glass Panels - UI Content */}
      <div className="relative z-10 flex size-full">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />

        <main className="flex-1 ml-64 overflow-y-auto scroll-smooth">
          {renderView()}
        </main>
      </div>
    </div>
  );
}