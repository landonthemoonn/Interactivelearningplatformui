import { Clock, Target, CheckCircle2, ArrowRight, BookOpen, AlertCircle, Lightbulb, Code2, Terminal, Shield, Zap, FileCode, Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface LessonViewProps {
  theme: 'light' | 'dark';
}

export function LessonView({ theme }: LessonViewProps) {
  const isDark = theme === 'dark';
  const [selectedTrack, setSelectedTrack] = useState('foundations');

  const learningTracks = [
    { id: 'foundations', name: 'Foundations', icon: Terminal, color: '#86EFAC', lessons: 12 },
    { id: 'macos', name: 'macOS Admin', icon: Shield, color: '#C4B5FD', lessons: 15 },
    { id: 'automation', name: 'Apple Automation', icon: Zap, color: '#FFB5A0', lessons: 10 },
    { id: 'realworld', name: 'Real-World Tasks', icon: Target, color: '#7DD3FC', lessons: 18 },
    { id: 'mdm', name: 'Jamf/MDM', icon: FileCode, color: '#FFA6C9', lessons: 12 },
    { id: 'ai', name: 'AI Assist', icon: Sparkles, color: '#A78BFA', lessons: 8 },
  ];

  const topLessons = [
    { title: 'Terminal Basics for Mac Admins', track: 'Foundations', time: '15 min', level: 'Beginner', complete: true },
    { title: 'Understanding Paths on macOS', track: 'Foundations', time: '12 min', level: 'Beginner', complete: true },
    { title: 'Variables and Dynamic Paths', track: 'Foundations', time: '18 min', level: 'Beginner', complete: true },
    { title: 'How to Find the Logged-in User', track: 'macOS Admin', time: '10 min', level: 'Intermediate', complete: true },
    { title: 'Checking if an App is Installed', track: 'macOS Admin', time: '14 min', level: 'Intermediate', complete: false },
    { title: 'Gathering Serial Number and OS Version', track: 'macOS Admin', time: '16 min', level: 'Intermediate', complete: false },
    { title: 'Reading Plist Files and Preferences', track: 'macOS Admin', time: '20 min', level: 'Intermediate', complete: false },
    { title: 'Using defaults Without Breaking Things', track: 'macOS Admin', time: '22 min', level: 'Advanced', complete: false },
    { title: 'Writing Safe File Copy Scripts', track: 'Real-World Tasks', time: '18 min', level: 'Intermediate', complete: false },
    { title: 'Logging Script Output for Troubleshooting', track: 'Real-World Tasks', time: '16 min', level: 'Intermediate', complete: false },
    { title: 'Root vs User in Admin Scripting', track: 'Jamf/MDM', time: '25 min', level: 'Advanced', complete: false },
    { title: 'Error Handling in Shell Scripts', track: 'Foundations', time: '20 min', level: 'Intermediate', complete: false },
    { title: 'Intro to AppleScript for IT Tasks', track: 'Apple Automation', time: '30 min', level: 'Beginner', complete: false },
    { title: 'Shell + AppleScript Together', track: 'Apple Automation', time: '28 min', level: 'Advanced', complete: false },
    { title: 'Reviewing Scripts with Claude/Gemini', track: 'AI Assist', time: '15 min', level: 'Beginner', complete: false },
  ];

  const currentTrack = learningTracks.find(t => t.id === selectedTrack);

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2 tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#F5F5F0' : '#0A0A0B',
            }}>
          Learning Tracks
        </h1>
        <p className="opacity-80"
           style={{
             fontFamily: 'var(--font-body)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
          Master Mac admin scripting through structured, practical lessons
        </p>
      </div>

      {/* Track Selector */}
      <div className="grid grid-cols-6 gap-4">
        {learningTracks.map((track) => {
          const Icon = track.icon;
          const isActive = selectedTrack === track.id;

          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className="p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${track.color}20, ${track.color}10)`
                  : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'),
                border: isActive
                  ? `1px solid ${track.color}40`
                  : (isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)'),
                backdropFilter: 'blur(20px)',
              }}
            >
              <Icon className="w-6 h-6 mb-2 mx-auto"
                    style={{
                      color: isActive ? track.color : (isDark ? '#A1A1AA' : '#71717A'),
                    }} />
              <div className="text-[13px] mb-1"
                   style={{
                     fontFamily: 'var(--font-body)',
                     fontWeight: isActive ? 600 : 400,
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                {track.name}
              </div>
              <div className="text-[11px] opacity-50"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                {track.lessons} lessons
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Track Overview */}
      {currentTrack && (
        <div className="rounded-[2rem] p-8"
             style={{
               background: isDark
                 ? `linear-gradient(135deg, ${currentTrack.color}15, ${currentTrack.color}08)`
                 : `linear-gradient(135deg, ${currentTrack.color}20, ${currentTrack.color}12)`,
               border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.4)',
               backdropFilter: 'blur(60px) saturate(180%)',
             }}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl mb-3 tracking-tight"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: isDark ? '#F5F5F0' : '#0A0A0B',
                  }}>
                {currentTrack.name}
              </h2>
              <p className="text-[15px] opacity-80 max-w-2xl"
                 style={{
                   fontFamily: 'var(--font-body)',
                   color: isDark ? '#F5F5F0' : '#0A0A0B',
                 }}>
                {currentTrack.id === 'foundations' && 'Learn the universal scripting fundamentals: commands, paths, variables, conditionals, loops, and error handling.'}
                {currentTrack.id === 'macos' && 'Master macOS-specific admin commands: users, apps, system settings, profiles, plists, and privacy permissions.'}
                {currentTrack.id === 'automation' && 'Control Mac apps with AppleScript, Script Editor, dialogs, Finder automation, and shell integration.'}
                {currentTrack.id === 'realworld' && 'Build practical IT workflows: app checks, file deployment, log collection, and support utilities.'}
                {currentTrack.id === 'mdm' && 'Write admin-safe scripts for Jamf and MDM: root context, logging, exit codes, and deployment validation.'}
                {currentTrack.id === 'ai' && 'Use Claude and Gemini to explain, review, refactor, and debug your scripts safely and effectively.'}
              </p>
            </div>
            <div className="px-5 py-2 rounded-full text-[13px]"
                 style={{
                   background: `${currentTrack.color}30`,
                   color: currentTrack.color,
                   border: `1px solid ${currentTrack.color}50`,
                 }}>
              {currentTrack.lessons} Lessons
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 rounded-xl"
                 style={{
                   background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                 }}>
              <div className="text-2xl mb-1"
                   style={{
                     fontFamily: 'var(--font-heading)',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                {currentTrack.id === 'foundations' ? '12' :
                 currentTrack.id === 'macos' ? '15' :
                 currentTrack.id === 'automation' ? '10' :
                 currentTrack.id === 'realworld' ? '18' :
                 currentTrack.id === 'mdm' ? '12' : '8'}
              </div>
              <div className="text-[12px] opacity-60"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                Total Lessons
              </div>
            </div>
            <div className="p-4 rounded-xl"
                 style={{
                   background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                 }}>
              <div className="text-2xl mb-1"
                   style={{
                     fontFamily: 'var(--font-heading)',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                4h
              </div>
              <div className="text-[12px] opacity-60"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                Est. Duration
              </div>
            </div>
            <div className="p-4 rounded-xl"
                 style={{
                   background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                 }}>
              <div className="text-2xl mb-1"
                   style={{
                     fontFamily: 'var(--font-heading)',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                3
              </div>
              <div className="text-[12px] opacity-60"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                Completed
              </div>
            </div>
            <div className="p-4 rounded-xl"
                 style={{
                   background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                 }}>
              <div className="text-2xl mb-1"
                   style={{
                     fontFamily: 'var(--font-heading)',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                45%
              </div>
              <div className="text-[12px] opacity-60"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                Progress
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top 15 Lessons */}
      <div>
        <h3 className="text-2xl mb-4 tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#F5F5F0' : '#0A0A0B',
            }}>
          High-Value Lessons
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {topLessons.map((lesson, index) => (
            <div key={index}
                 className="flex items-center justify-between p-6 rounded-2xl cursor-pointer transition-all hover:scale-[1.01]"
                 style={{
                   background: isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                   border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
                   backdropFilter: 'blur(40px)',
                 }}>
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{
                       background: lesson.complete
                         ? 'rgba(134, 239, 172, 0.2)'
                         : 'rgba(125, 211, 252, 0.2)',
                       border: lesson.complete
                         ? '1px solid rgba(134, 239, 172, 0.3)'
                         : '1px solid rgba(125, 211, 252, 0.3)',
                     }}>
                  {lesson.complete ? (
                    <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-[#7DD3FC]" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="text-[15px] mb-1"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        color: isDark ? '#F5F5F0' : '#0A0A0B',
                      }}>
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[12px] opacity-60"
                       style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                    <span>{lesson.track}</span>
                    <span>•</span>
                    <span>{lesson.time}</span>
                    <span>•</span>
                    <span>{lesson.level}</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-5 py-2 rounded-xl transition-all hover:scale-105"
                        style={{
                          background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                        }}>
                  <span className="text-[13px]"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: isDark ? '#F5F5F0' : '#0A0A0B',
                        }}>
                    {lesson.complete ? 'Review' : 'Start'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
