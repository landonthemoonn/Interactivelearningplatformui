import { Play, AlertTriangle, CheckCircle2, Sparkles, Wand2, Shield, FileText, Search, Apple, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface ScriptPlaygroundProps {
  theme: 'light' | 'dark';
}

export function ScriptPlayground({ theme }: ScriptPlaygroundProps) {
  const isDark = theme === 'dark';
  const [activeMode, setActiveMode] = useState('explain');
  const [script, setScript] = useState(`#!/bin/bash

# User account creation script
username="$1"

if [ -z "$username" ]; then
    echo "Error: No username provided"
    exit 1
fi

dscl . -create /Users/$username
dscl . -create /Users/$username UserShell /bin/bash
dscl . -create /Users/$username RealName "$username"
dscl . -create /Users/$username UniqueID "1001"
dscl . -create /Users/$username PrimaryGroupID 80

echo "User created successfully"`);

  const modes = [
    { id: 'explain', label: 'Explain', icon: MessageSquare, desc: 'Line-by-line breakdown', color: '#7DD3FC' },
    { id: 'review', label: 'Review', icon: Search, desc: 'Find risks & bad practices', color: '#FFA6C9' },
    { id: 'harden', label: 'Harden', icon: Shield, desc: 'Make safer & more robust', color: '#86EFAC' },
    { id: 'annotate', label: 'Annotate', icon: FileText, desc: 'Add learning comments', color: '#FFB5A0' },
    { id: 'macos', label: 'macOS Check', icon: Apple, desc: 'Verify Mac compatibility', color: '#C4B5FD' },
  ];

  const currentMode = modes.find(m => m.id === activeMode);

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl mb-2 tracking-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                color: isDark ? '#F5F5F0' : '#0A0A0B',
              }}>
            Script Playground
          </h1>
          <p className="opacity-80"
             style={{
               fontFamily: 'var(--font-body)',
               color: isDark ? '#F5F5F0' : '#0A0A0B',
             }}>
            Paste your script and get instant AI-powered analysis
          </p>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${currentMode?.color}, ${currentMode?.color}CC)`,
                  color: '#0A0A0B',
                  boxShadow: `0 4px 16px ${currentMode?.color}40`,
                }}>
          <Play className="w-4 h-4" />
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
            Analyze Script
          </span>
        </button>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-5 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className="p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${mode.color}20, ${mode.color}10)`
                  : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'),
                border: isActive
                  ? `1px solid ${mode.color}40`
                  : (isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)'),
                backdropFilter: 'blur(20px)',
              }}
            >
              <Icon className="w-6 h-6 mb-3"
                    style={{
                      color: isActive ? mode.color : (isDark ? '#A1A1AA' : '#71717A'),
                    }} />
              <div className="text-[14px] mb-1"
                   style={{
                     fontFamily: 'var(--font-body)',
                     fontWeight: isActive ? 600 : 400,
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                {mode.label}
              </div>
              <div className="text-[11px] opacity-60"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                {mode.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-2 gap-6">
        {/* Script Input */}
        <div className="rounded-[2rem] overflow-hidden"
             style={{
               background: isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
               border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
               backdropFilter: 'blur(40px)',
             }}>
          <div className="p-6 border-b"
               style={{
                 borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
               }}>
            <h3 className="text-xl"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: isDark ? '#F5F5F0' : '#0A0A0B',
                }}>
              Your Script
            </h3>
          </div>
          <div className="p-6">
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full h-[500px] bg-transparent resize-none outline-none"
              style={{
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: isDark ? '#F5F5F0' : '#0A0A0B',
              }}
              placeholder="Paste your shell script or AppleScript here..."
            />
          </div>
        </div>

        {/* Analysis Output */}
        <div className="space-y-6">
          {/* Mode-specific content */}
          {activeMode === 'explain' && (
            <>
              <div className="rounded-[2rem] p-6"
                   style={{
                     background: `linear-gradient(135deg, ${currentMode?.color}15, ${currentMode?.color}08)`,
                     border: `1px solid ${currentMode?.color}25`,
                     backdropFilter: 'blur(40px)',
                   }}>
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-5 h-5"
                                 style={{ color: currentMode?.color }} />
                  <h3 className="text-lg"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: isDark ? '#F5F5F0' : '#0A0A0B',
                      }}>
                    Line-by-Line Explanation
                  </h3>
                </div>

                <div className="space-y-3 text-sm"
                     style={{
                       fontFamily: 'var(--font-body)',
                       color: isDark ? '#F5F5F0' : '#0A0A0B',
                     }}>
                  <div className="flex items-start gap-3">
                    <span className="text-[#7DD3FC] font-mono text-xs mt-0.5">1</span>
                    <div>
                      <div className="opacity-90 mb-1">Shebang line specifies bash interpreter</div>
                      <div className="text-xs opacity-60">Tells the system to run this with bash</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#7DD3FC] font-mono text-xs mt-0.5">4</span>
                    <div>
                      <div className="opacity-90 mb-1">Captures first argument as username</div>
                      <div className="text-xs opacity-60">$1 refers to the first command-line parameter</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#7DD3FC] font-mono text-xs mt-0.5">6-9</span>
                    <div>
                      <div className="opacity-90 mb-1">Validates username is not empty</div>
                      <div className="text-xs opacity-60">[ -z ] checks if string length is zero</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMode === 'review' && (
            <>
              <div className="rounded-[2rem] p-6"
                   style={{
                     background: `linear-gradient(135deg, ${currentMode?.color}15, ${currentMode?.color}08)`,
                     border: `1px solid ${currentMode?.color}25`,
                     backdropFilter: 'blur(40px)',
                   }}>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5"
                                 style={{ color: currentMode?.color }} />
                  <h3 className="text-lg"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: isDark ? '#F5F5F0' : '#0A0A0B',
                      }}>
                    Detected Risks
                  </h3>
                </div>

                <div className="space-y-3 text-sm"
                     style={{
                       fontFamily: 'var(--font-body)',
                       color: isDark ? '#F5F5F0' : '#0A0A0B',
                     }}>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FFA6C9] mt-0.5">⚠</span>
                    <div>
                      <div className="opacity-90 mb-1">Hardcoded UID will cause conflicts</div>
                      <div className="text-xs opacity-60">Line 12: UniqueID "1001" should be dynamic</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FFA6C9] mt-0.5">⚠</span>
                    <div>
                      <div className="opacity-90 mb-1">No verification of command success</div>
                      <div className="text-xs opacity-60">dscl commands can fail silently</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#FFA6C9] mt-0.5">⚠</span>
                    <div>
                      <div className="opacity-90 mb-1">Missing root permission check</div>
                      <div className="text-xs opacity-60">This script requires admin privileges</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] p-6"
                   style={{
                     background: isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                     border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
                     backdropFilter: 'blur(40px)',
                   }}>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
                  <h3 className="text-lg"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: isDark ? '#F5F5F0' : '#0A0A0B',
                      }}>
                    Suggested Improvements
                  </h3>
                </div>

                <div className="space-y-3 text-sm"
                     style={{
                       fontFamily: 'var(--font-body)',
                       color: isDark ? '#F5F5F0' : '#0A0A0B',
                     }}>
                  <div className="flex items-start gap-3">
                    <span className="text-[#86EFAC] mt-0.5">✓</span>
                    <div>
                      <div className="opacity-90 mb-1">Generate unique UID automatically</div>
                      <div className="text-xs opacity-60">Use dscl to find next available UID</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#86EFAC] mt-0.5">✓</span>
                    <div>
                      <div className="opacity-90 mb-1">Add error handling with exit codes</div>
                      <div className="text-xs opacity-60">Check $? after each dscl command</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#86EFAC] mt-0.5">✓</span>
                    <div>
                      <div className="opacity-90 mb-1">Add logging for troubleshooting</div>
                      <div className="text-xs opacity-60">Log actions to /var/log for remote debugging</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMode === 'harden' && (
            <div className="rounded-[2rem] p-6"
                 style={{
                   background: `linear-gradient(135deg, ${currentMode?.color}15, ${currentMode?.color}08)`,
                   border: `1px solid ${currentMode?.color}25`,
                   backdropFilter: 'blur(40px)',
                 }}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5"
                        style={{ color: currentMode?.color }} />
                <h3 className="text-lg"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: isDark ? '#F5F5F0' : '#0A0A0B',
                    }}>
                  Hardened Version
                </h3>
              </div>

              <div className="p-4 rounded-xl text-xs leading-relaxed"
                   style={{
                     background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
                     border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
                     fontFamily: 'monospace',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                <div className="text-[#A78BFA]"># Safe user creation with validation</div>
                <div className="text-[#F5F5F0]">username="$1"</div>
                <div className="mt-2 text-[#A78BFA]"># Check if running as root</div>
                <div className="text-[#F5F5F0]">if [[ $EUID -ne 0 ]]; then</div>
                <div className="ml-4 text-[#FFA6C9]">echo "Must run as root"</div>
                <div className="ml-4 text-[#FFA6C9]">exit 1</div>
                <div className="text-[#F5F5F0]">fi</div>
                <div className="mt-2 text-[#A78BFA]"># Validate username</div>
                <div className="text-[#F5F5F0]">if [[ -z "$username" ]]; then</div>
                <div className="ml-4 text-[#FFA6C9]">echo "Error: No username"</div>
                <div className="ml-4 text-[#FFA6C9]">exit 1</div>
                <div className="text-[#F5F5F0]">fi</div>
                <div className="mt-2 text-[#A78BFA]"># Get next available UID</div>
                <div className="text-[#F5F5F0]">nextUID=$(dscl . -list /Users UniqueID | awk '{`{print $2}`}' | sort -n | tail -1)</div>
                <div className="text-[#F5F5F0]">nextUID=$((nextUID + 1))</div>
              </div>
            </div>
          )}

          {activeMode === 'annotate' && (
            <div className="rounded-[2rem] p-6"
                 style={{
                   background: `linear-gradient(135deg, ${currentMode?.color}15, ${currentMode?.color}08)`,
                   border: `1px solid ${currentMode?.color}25`,
                   backdropFilter: 'blur(40px)',
                 }}>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5"
                          style={{ color: currentMode?.color }} />
                <h3 className="text-lg"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: isDark ? '#F5F5F0' : '#0A0A0B',
                    }}>
                  Annotated for Learning
                </h3>
              </div>

              <p className="text-sm mb-4 opacity-80"
                 style={{
                   fontFamily: 'var(--font-body)',
                   color: isDark ? '#F5F5F0' : '#0A0A0B',
                 }}>
                Comments added to explain each section
              </p>

              <div className="p-4 rounded-xl text-xs leading-relaxed"
                   style={{
                     background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
                     border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
                     fontFamily: 'monospace',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                <div className="text-[#A78BFA]"># Capture the first command-line argument</div>
                <div className="text-[#A78BFA]"># $1 = first parameter passed to script</div>
                <div className="text-[#F5F5F0]">username="$1"</div>
                <div className="mt-2 text-[#A78BFA]"># Check if username variable is empty</div>
                <div className="text-[#A78BFA]"># -z tests for zero-length string</div>
                <div className="text-[#F5F5F0]">if [ -z "$username" ]; then</div>
                <div className="ml-4 text-[#A78BFA]"># Print error to stderr</div>
                <div className="ml-4 text-[#FFA6C9]">echo "Error: No username"</div>
                <div className="ml-4 text-[#A78BFA]"># Exit with status 1 (failure)</div>
                <div className="ml-4 text-[#FFA6C9]">exit 1</div>
                <div className="text-[#F5F5F0]">fi</div>
              </div>
            </div>
          )}

          {activeMode === 'macos' && (
            <>
              <div className="rounded-[2rem] p-6"
                   style={{
                     background: `linear-gradient(135deg, ${currentMode?.color}15, ${currentMode?.color}08)`,
                     border: `1px solid ${currentMode?.color}25`,
                     backdropFilter: 'blur(40px)',
                   }}>
                <div className="flex items-center gap-3 mb-4">
                  <Apple className="w-5 h-5"
                         style={{ color: currentMode?.color }} />
                  <h3 className="text-lg"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: isDark ? '#F5F5F0' : '#0A0A0B',
                      }}>
                    macOS Compatibility Check
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
                    <div className="text-sm"
                         style={{
                           fontFamily: 'var(--font-body)',
                           color: isDark ? '#F5F5F0' : '#0A0A0B',
                         }}>
                      Uses macOS-native dscl command
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
                    <div className="text-sm"
                         style={{
                           fontFamily: 'var(--font-body)',
                           color: isDark ? '#F5F5F0' : '#0A0A0B',
                         }}>
                      Compatible with bash on macOS
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#FFA6C9]" />
                    <div className="text-sm"
                         style={{
                           fontFamily: 'var(--font-body)',
                           color: isDark ? '#F5F5F0' : '#0A0A0B',
                         }}>
                      Requires Full Disk Access in TCC
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#FFA6C9]" />
                    <div className="text-sm"
                         style={{
                           fontFamily: 'var(--font-body)',
                           color: isDark ? '#F5F5F0' : '#0A0A0B',
                         }}>
                      Must run in root context for MDM
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] p-6"
                   style={{
                     background: isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                     border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
                     backdropFilter: 'blur(40px)',
                   }}>
                <h4 className="text-sm mb-3"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: isDark ? '#F5F5F0' : '#0A0A0B',
                    }}>
                  Environment Compatibility
                </h4>

                <div className="space-y-2 text-sm"
                     style={{
                       fontFamily: 'var(--font-body)',
                       color: isDark ? '#F5F5F0' : '#0A0A0B',
                     }}>
                  <div className="flex items-center justify-between">
                    <span className="opacity-80">Jamf Pro</span>
                    <span className="text-[#FFA6C9]">Needs hardening</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="opacity-80">Kandji</span>
                    <span className="text-[#FFA6C9]">Needs hardening</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="opacity-80">Local Terminal</span>
                    <span className="text-[#86EFAC]">Compatible</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="opacity-80">Remote SSH</span>
                    <span className="text-[#86EFAC]">Compatible</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
