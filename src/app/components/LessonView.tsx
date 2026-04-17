import { useState } from 'react';
import { Clock, Target, BookOpen, ChevronRight, CheckCircle2, Lock, PlayCircle, ArrowLeft, ArrowRight, Lightbulb, AlertTriangle, Code2, FileText, Dumbbell } from 'lucide-react';
import { learningModules, getModuleProgress, type Module, type Lesson, type ContentSection } from '../../data/learningModules';

interface LessonViewProps {
  theme: 'light' | 'dark';
}

function glassCard(isDark: boolean, extra = '') {
  return {
    background: isDark ? 'rgba(20, 20, 22, 0.5)' : 'rgba(255, 255, 255, 0.6)',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(40px) saturate(180%)',
    boxShadow: isDark
      ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
      : '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
  } as React.CSSProperties;
}

const sectionIcons: Record<ContentSection['type'], React.FC<{ className?: string }>> = {
  concept: FileText,
  code: Code2,
  exercise: Dumbbell,
  tip: Lightbulb,
  warning: AlertTriangle,
};

const sectionColors: Record<ContentSection['type'], string> = {
  concept: '#7DD3FC',
  code: '#86EFAC',
  exercise: '#FF8B7B',
  tip: '#C4B5FD',
  warning: '#FFA6C9',
};

export function LessonView({ theme }: LessonViewProps) {
  const isDark = theme === 'dark';
  const [selectedModuleId, setSelectedModuleId] = useState('shell');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(() => {
    const shell = learningModules.find(m => m.id === 'shell')!;
    return shell.lessons.find(l => l.inProgress) || null;
  });

  const selectedModule = learningModules.find(m => m.id === selectedModuleId)!;

  const textColor = isDark ? '#F5F5F0' : '#0A0A0B';

  function openLesson(lesson: Lesson) {
    if (!lesson.locked) setSelectedLesson(lesson);
  }

  function goAdjacentLesson(dir: 1 | -1) {
    if (!selectedLesson) return;
    const lessons = selectedModule.lessons;
    const idx = lessons.findIndex(l => l.id === selectedLesson.id);
    const next = lessons[idx + dir];
    if (next && !next.locked) setSelectedLesson(next);
  }

  if (selectedLesson) {
    return (
      <LessonContent
        lesson={selectedLesson}
        module={selectedModule}
        isDark={isDark}
        textColor={textColor}
        onBack={() => setSelectedLesson(null)}
        onPrev={() => goAdjacentLesson(-1)}
        onNext={() => goAdjacentLesson(1)}
        hasPrev={selectedModule.lessons.findIndex(l => l.id === selectedLesson.id) > 0}
        hasNext={selectedModule.lessons.findIndex(l => l.id === selectedLesson.id) < selectedModule.lessons.length - 1}
      />
    );
  }

  return (
    <div className="w-full p-8 pb-16 space-y-8 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="rounded-[2rem] p-8" style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(125,211,252,0.1), rgba(134,239,172,0.08))'
          : 'linear-gradient(135deg, rgba(125,211,252,0.15), rgba(134,239,172,0.12))',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.5)',
        backdropFilter: 'blur(60px)',
        boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.08)',
      }}>
        <h1 className="text-5xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.03em', color: textColor }}>
          Learning Modules
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', opacity: 0.6, color: textColor }}>
          Select a course below to view lessons and track your progress.
        </p>
      </div>

      {/* Module Tabs */}
      <div className="flex gap-3">
        {learningModules.map(m => {
          const active = m.id === selectedModuleId;
          return (
            <button key={m.id} onClick={() => setSelectedModuleId(m.id)}
              className="px-5 py-3 rounded-[1rem] text-sm transition-all duration-300"
              style={{
                background: active ? `${m.color}20` : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                border: active ? `1px solid ${m.color}50` : '1px solid transparent',
                color: active ? m.color : (isDark ? '#A1A1AA' : '#71717A'),
                fontFamily: 'var(--font-body)',
                fontWeight: active ? 600 : 400,
                boxShadow: active ? `0 4px 16px ${m.glowColor}` : 'none',
              }}>
              {m.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Module Info */}
      <div className="rounded-[1.5rem] p-6 flex items-center justify-between" style={glassCard(isDark)}>
        <div>
          <h2 className="text-2xl mb-1 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: textColor }}>
            {selectedModule.title}
          </h2>
          <p className="text-sm" style={{ fontFamily: 'var(--font-body)', opacity: 0.6, color: textColor }}>
            {selectedModule.description}
          </p>
        </div>
        <div className="text-right ml-8 shrink-0">
          <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: selectedModule.color }}>
            {getModuleProgress(selectedModule)}%
          </div>
          <div className="text-xs opacity-50" style={{ color: textColor }}>
            {selectedModule.lessons.filter(l => l.completed).length} / {selectedModule.lessons.length} lessons
          </div>
          <div className="mt-2 h-2 w-32 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
            <div className="h-full rounded-full" style={{ width: `${getModuleProgress(selectedModule)}%`, background: selectedModule.color }} />
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-3">
        {selectedModule.lessons.map((lesson, idx) => {
          const isActive = lesson.inProgress;
          return (
            <button
              key={lesson.id}
              onClick={() => openLesson(lesson)}
              disabled={lesson.locked}
              className="w-full rounded-[1.5rem] p-5 flex items-center gap-5 transition-all duration-300 text-left"
              style={{
                ...glassCard(isDark),
                opacity: lesson.locked ? 0.45 : 1,
                cursor: lesson.locked ? 'not-allowed' : 'pointer',
                border: isActive
                  ? `1px solid ${selectedModule.color}50`
                  : (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.5)'),
                boxShadow: isActive
                  ? `0 4px 20px ${selectedModule.glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`
                  : (isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)'),
              }}
            >
              {/* Status Icon */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{
                background: lesson.completed
                  ? `${selectedModule.color}20`
                  : isActive ? `${selectedModule.color}15` : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
              }}>
                {lesson.locked ? (
                  <Lock className="w-4 h-4" style={{ color: isDark ? '#555' : '#999' }} />
                ) : lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5" style={{ color: selectedModule.color }} />
                ) : isActive ? (
                  <PlayCircle className="w-5 h-5" style={{ color: selectedModule.color }} />
                ) : (
                  <span className="text-sm font-semibold" style={{ color: isDark ? '#555' : '#999' }}>{lesson.number}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] uppercase tracking-wider opacity-40" style={{ color: textColor }}>
                    Lesson {lesson.number}
                  </span>
                  {isActive && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{
                      background: `${selectedModule.color}20`, color: selectedModule.color,
                    }}>In Progress</span>
                  )}
                </div>
                <div className="text-base font-semibold truncate" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>
                  {lesson.title}
                </div>
                <div className="text-sm mt-0.5 truncate" style={{ fontFamily: 'var(--font-body)', opacity: 0.55, color: textColor }}>
                  {lesson.description}
                </div>
              </div>

              {/* Meta */}
              <div className="shrink-0 flex flex-col items-end gap-2">
                <div className="flex items-center gap-3 text-xs opacity-50" style={{ color: textColor }}>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{lesson.duration}m</span>
                  <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" />{lesson.difficulty}</span>
                </div>
                {!lesson.locked && (
                  <ChevronRight className="w-4 h-4 opacity-30" style={{ color: textColor }} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface LessonContentProps {
  lesson: Lesson;
  module: Module;
  isDark: boolean;
  textColor: string;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

function LessonContent({ lesson, module, isDark, textColor, onBack, onPrev, onNext, hasPrev, hasNext }: LessonContentProps) {
  const completedCount = module.lessons.filter(l => l.completed).length;
  const progress = Math.round((completedCount / module.lessons.length) * 100);

  return (
    <div className="w-full p-8 pb-16 max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Back + breadcrumb */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: textColor, fontFamily: 'var(--font-body)' }}>
        <ArrowLeft className="w-4 h-4" />
        Back to {module.shortTitle}
      </button>

      {/* Lesson Header */}
      <div className="rounded-[2rem] p-8" style={{
        background: isDark
          ? `linear-gradient(135deg, ${module.color}12, rgba(255,255,255,0.04))`
          : `linear-gradient(135deg, ${module.color}18, rgba(255,255,255,0.6))`,
        border: `1px solid ${module.color}30`,
        backdropFilter: 'blur(60px)',
        boxShadow: `0 8px 32px ${module.glowColor.replace('0.4', '0.15')}`,
      }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${module.color}20`, color: module.color }}>
                {module.shortTitle}
              </span>
              <span className="px-3 py-1 rounded-full text-xs" style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: textColor, opacity: 0.7 }}>
                Lesson {lesson.number}
              </span>
            </div>
            <h1 className="text-4xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.025em', color: textColor }}>
              {lesson.title}
            </h1>
            <div className="flex items-center gap-5 text-sm" style={{ color: textColor, opacity: 0.6, fontFamily: 'var(--font-body)' }}>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{lesson.duration} min</span>
              <span className="flex items-center gap-1.5"><Target className="w-4 h-4" />{lesson.difficulty}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{lesson.sections.length} sections</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: module.color }}>{progress}%</div>
            <div className="text-xs opacity-50" style={{ color: textColor }}>course progress</div>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: module.color }} />
        </div>
      </div>

      {/* Sections */}
      {lesson.sections.map((section, i) => {
        const Icon = sectionIcons[section.type];
        const color = sectionColors[section.type];
        return (
          <div key={i} className="rounded-[1.5rem] p-6 space-y-4" style={glassCard(isDark)}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color, opacity: 0.8, fontFamily: 'var(--font-body)' }}>{section.type}</div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>{section.title}</h3>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: textColor, opacity: 0.75 }}>
              {section.content}
            </p>

            {section.code && (
              <div className="rounded-xl overflow-hidden" style={{
                background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)',
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)',
              }}>
                <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="text-xs uppercase tracking-wider opacity-40" style={{ fontFamily: 'var(--font-body)', color: textColor }}>
                    {section.language || 'bash'}
                  </span>
                  <div className="flex gap-1.5">
                    {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.6 }} />
                    ))}
                  </div>
                </div>
                <pre className="p-5 text-sm overflow-x-auto" style={{
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  color: isDark ? '#86EFAC' : '#166534',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  <code>{section.code}</code>
                </pre>
              </div>
            )}
          </div>
        );
      })}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button onClick={onPrev} disabled={!hasPrev}
          className="flex items-center gap-2 px-5 py-3 rounded-[1rem] text-sm transition-all disabled:opacity-30"
          style={{ ...glassCard(isDark), color: textColor, fontFamily: 'var(--font-body)' }}>
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        <button onClick={onNext} disabled={!hasNext}
          className="flex items-center gap-2 px-5 py-3 rounded-[1rem] text-sm transition-all disabled:opacity-30"
          style={{ background: module.color, color: '#0A0A0B', fontFamily: 'var(--font-body)', fontWeight: 600, boxShadow: `0 4px 16px ${module.glowColor}` }}>
          Next Lesson <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
