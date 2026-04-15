import { Play, AlertTriangle, CheckCircle2, Sparkles, Wand2, Shield, FileText } from 'lucide-react';
import { useState } from 'react';

export function ScriptPlayground() {
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

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Script Playground
          </h1>
          <p className="opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
            Paste your script and get instant analysis, improvements, and safety checks
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #7DD3FC, #86EFAC)',
                    color: '#0A0A0B',
                  }}>
            <Play className="w-4 h-4" />
            <span style={{ fontFamily: 'var(--font-body)' }}>Analyze Script</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Script Input */}
        <div className="rounded-[2rem] overflow-hidden"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <div className="p-6 border-b"
               style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Your Script
            </h3>
          </div>
          <div className="p-6">
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full h-96 bg-transparent resize-none outline-none"
              style={{
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                lineHeight: '1.6',
              }}
              placeholder="Paste your shell script or AppleScript here..."
            />
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-6">
          {/* Detected Risks */}
          <div className="rounded-[2rem] p-6"
               style={{
                 background: 'linear-gradient(135deg, rgba(255, 166, 201, 0.1), rgba(255, 139, 123, 0.1))',
                 border: '1px solid rgba(255, 166, 201, 0.2)',
                 backdropFilter: 'blur(20px)',
               }}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#FFA6C9]" />
              <h3 className="text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                Detected Risks
              </h3>
            </div>

            <div className="space-y-3 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              <div className="flex items-start gap-3">
                <span className="text-[#FFA6C9] mt-0.5">⚠</span>
                <div>
                  <div className="opacity-90 mb-1">Unquoted variable expansion</div>
                  <div className="text-xs opacity-60">Line 8: $username should be "$username"</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FFA6C9] mt-0.5">⚠</span>
                <div>
                  <div className="opacity-90 mb-1">Hardcoded UID may conflict</div>
                  <div className="text-xs opacity-60">Line 12: UniqueID "1001" should be dynamic</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FFA6C9] mt-0.5">⚠</span>
                <div>
                  <div className="opacity-90 mb-1">No success verification</div>
                  <div className="text-xs opacity-60">Check if dscl commands succeeded</div>
                </div>
              </div>
            </div>
          </div>

          {/* Improvements */}
          <div className="rounded-[2rem] p-6"
               style={{
                 background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.1), rgba(125, 211, 252, 0.1))',
                 border: '1px solid rgba(134, 239, 172, 0.2)',
                 backdropFilter: 'blur(20px)',
               }}>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
              <h3 className="text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                Suggested Improvements
              </h3>
            </div>

            <div className="space-y-3 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
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
                  <div className="opacity-90 mb-1">Generate unique UID automatically</div>
                  <div className="text-xs opacity-60">Use dscl to find next available UID</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#86EFAC] mt-0.5">✓</span>
                <div>
                  <div className="opacity-90 mb-1">Add logging for troubleshooting</div>
                  <div className="text-xs opacity-60">Log to /var/log or syslog</div>
                </div>
              </div>
            </div>
          </div>

          {/* Production Readiness */}
          <div className="rounded-[2rem] p-6"
               style={{
                 background: 'rgba(28, 28, 30, 0.6)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 backdropFilter: 'blur(20px)',
               }}>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#7DD3FC]" />
              <h3 className="text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                Production Readiness
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">Error Handling</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full overflow-hidden"
                       style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="h-full rounded-full"
                         style={{
                           width: '40%',
                           background: '#FFA6C9',
                         }} />
                  </div>
                  <span className="text-xs opacity-60">40%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">Security</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full overflow-hidden"
                       style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="h-full rounded-full"
                         style={{
                           width: '60%',
                           background: '#FFB5A0',
                         }} />
                  </div>
                  <span className="text-xs opacity-60">60%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">Logging</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full overflow-hidden"
                       style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="h-full rounded-full"
                         style={{
                           width: '20%',
                           background: '#FFA6C9',
                         }} />
                  </div>
                  <span className="text-xs opacity-60">20%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">Idempotency</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full overflow-hidden"
                       style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="h-full rounded-full"
                         style={{
                           width: '30%',
                           background: '#FFA6C9',
                         }} />
                  </div>
                  <span className="text-xs opacity-60">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        <button className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'rgba(28, 28, 30, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}>
          <Sparkles className="w-5 h-5 text-[#C4B5FD]" />
          <div className="text-left">
            <div className="text-sm mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>Explain Line-by-Line</div>
            <div className="text-xs opacity-60">AI breakdown</div>
          </div>
        </button>

        <button className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'rgba(28, 28, 30, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}>
          <Wand2 className="w-5 h-5 text-[#86EFAC]" />
          <div className="text-left">
            <div className="text-sm mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>Rewrite Safely</div>
            <div className="text-xs opacity-60">Auto-improve</div>
          </div>
        </button>

        <button className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'rgba(28, 28, 30, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}>
          <Shield className="w-5 h-5 text-[#7DD3FC]" />
          <div className="text-left">
            <div className="text-sm mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>Add Logging</div>
            <div className="text-xs opacity-60">Production-ready</div>
          </div>
        </button>

        <button className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'rgba(28, 28, 30, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}>
          <FileText className="w-5 h-5 text-[#FFA6C9]" />
          <div className="text-left">
            <div className="text-sm mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>Make Jamf-Friendly</div>
            <div className="text-xs opacity-60">MDM compatible</div>
          </div>
        </button>
      </div>
    </div>
  );
}
