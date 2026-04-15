import { Clock, Target, CheckCircle2, ArrowRight, BookOpen, AlertCircle, Lightbulb, Code2 } from 'lucide-react';

export function LessonView() {
  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Lesson Header */}
      <div className="rounded-[2rem] p-8"
           style={{
             background: 'linear-gradient(135deg, rgba(255, 139, 123, 0.15), rgba(125, 211, 252, 0.15))',
             border: '1px solid rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(20px)',
           }}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 rounded-full text-xs"
                   style={{
                     background: 'rgba(125, 211, 252, 0.2)',
                     color: '#7DD3FC',
                   }}>
                Shell Scripting Fundamentals
              </div>
              <div className="px-3 py-1 rounded-full text-xs"
                   style={{
                     background: 'rgba(134, 239, 172, 0.2)',
                     color: '#86EFAC',
                   }}>
                Lesson 12
              </div>
            </div>

            <h1 className="text-5xl mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Error Handling & Exit Codes
            </h1>

            <div className="flex items-center gap-6 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Chapter 3 of 5</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>65%</div>
            <div className="text-sm opacity-60">Complete</div>
          </div>
        </div>

        <div className="h-2 rounded-full overflow-hidden"
             style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="h-full rounded-full transition-all duration-500"
               style={{
                 width: '65%',
                 background: 'linear-gradient(90deg, #7DD3FC, #86EFAC)',
               }} />
        </div>
      </div>

      {/* Concept Overview */}
      <div className="rounded-[2rem] p-8"
           style={{
             background: 'rgba(28, 28, 30, 0.6)',
             border: '1px solid rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(20px)',
           }}>
        <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Concept Overview
        </h2>
        <p className="opacity-80 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
          Every command in Unix/Linux returns an exit code when it finishes. Exit code 0 means success,
          while non-zero codes indicate various types of errors. Learning to check and handle these
          codes is essential for writing robust, production-ready scripts that can gracefully handle
          failures and provide meaningful feedback.
        </p>
        <p className="opacity-80 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          In the Apple admin environment, this becomes especially important when automating deployments
          through Jamf, managing user accounts, or performing system configurations that must succeed
          or be safely rolled back.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Syntax Breakdown */}
        <div className="rounded-[2rem] p-8"
             style={{
               background: 'rgba(28, 28, 30, 0.6)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
             }}>
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-6 h-6 text-[#86EFAC]" />
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Syntax Breakdown
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl"
                 style={{
                   background: 'rgba(0, 0, 0, 0.4)',
                   border: '1px solid rgba(255, 255, 255, 0.05)',
                   fontFamily: 'monospace',
                   fontSize: '0.9rem',
                 }}>
              <div className="text-[#7DD3FC]">if</div>
              <div className="ml-4 text-[#86EFAC]">command</div>
              <div className="text-[#7DD3FC]">then</div>
              <div className="ml-4 opacity-60"># success handler</div>
              <div className="text-[#7DD3FC]">else</div>
              <div className="ml-4 opacity-60"># error handler</div>
              <div className="text-[#7DD3FC]">fi</div>
            </div>

            <div className="space-y-2 text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
              <p><span className="text-[#7DD3FC]">$?</span> - Exit code of last command</p>
              <p><span className="text-[#86EFAC]">||</span> - Execute if previous fails</p>
              <p><span className="text-[#FFA6C9]">&&</span> - Execute if previous succeeds</p>
            </div>
          </div>
        </div>

        {/* Real-World Use Case */}
        <div className="rounded-[2rem] p-8"
             style={{
               background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.1), rgba(125, 211, 252, 0.1))',
               border: '1px solid rgba(134, 239, 172, 0.2)',
               backdropFilter: 'blur(20px)',
             }}>
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-[#86EFAC]" />
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Real-World Use Case
            </h3>
          </div>

          <p className="text-sm opacity-90 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            <strong>Scenario:</strong> Deploying software via Jamf
          </p>

          <div className="p-4 rounded-xl text-xs leading-relaxed"
               style={{
                 background: 'rgba(0, 0, 0, 0.3)',
                 border: '1px solid rgba(255, 255, 255, 0.05)',
                 fontFamily: 'monospace',
               }}>
            <div className="text-[#A78BFA]"># Download installer</div>
            <div className="text-[#F5F5F0]">curl -O "$PKG_URL" || {`{`}</div>
            <div className="ml-4 text-[#FFA6C9]">echo "Download failed"</div>
            <div className="ml-4 text-[#FFA6C9]">exit 1</div>
            <div className="text-[#F5F5F0]">{`}`}</div>
            <div className="mt-2 text-[#A78BFA]"># Install package</div>
            <div className="text-[#F5F5F0]">installer -pkg *.pkg && {`{`}</div>
            <div className="ml-4 text-[#86EFAC]">echo "Success"</div>
            <div className="text-[#F5F5F0]">{`}`}</div>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="rounded-[2rem] p-8"
           style={{
             background: 'linear-gradient(135deg, rgba(255, 166, 201, 0.1), rgba(255, 139, 123, 0.1))',
             border: '1px solid rgba(255, 166, 201, 0.2)',
             backdropFilter: 'blur(20px)',
           }}>
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-[#FFA6C9]" />
          <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Common Mistakes
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          <div className="flex items-start gap-3">
            <span className="text-[#FFA6C9] text-xl">✗</span>
            <div>
              <div className="opacity-90 mb-1">Not checking $? immediately</div>
              <div className="text-xs opacity-60">The value changes with every command</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#FFA6C9] text-xl">✗</span>
            <div>
              <div className="opacity-90 mb-1">Ignoring non-zero exit codes</div>
              <div className="text-xs opacity-60">Silent failures are debugging nightmares</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#FFA6C9] text-xl">✗</span>
            <div>
              <div className="opacity-90 mb-1">Using exit without cleanup</div>
              <div className="text-xs opacity-60">Always clean temp files first</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#FFA6C9] text-xl">✗</span>
            <div>
              <div className="opacity-90 mb-1">Vague error messages</div>
              <div className="text-xs opacity-60">Be specific about what failed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Challenge */}
      <div className="rounded-[2rem] p-8"
           style={{
             background: 'rgba(28, 28, 30, 0.6)',
             border: '1px solid rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(20px)',
           }}>
        <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Mini Challenge
        </h3>
        <p className="opacity-80 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
          Write a script that checks if a directory exists. If it does, list its contents.
          If it doesn't, create it and print a success message. Handle errors at each step.
        </p>

        <div className="flex gap-4">
          <button className="flex-1 px-6 py-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #7DD3FC, #86EFAC)',
                    color: '#0A0A0B',
                  }}>
            <span style={{ fontFamily: 'var(--font-body)' }}>Start Challenge</span>
          </button>
          <button className="px-6 py-4 rounded-xl transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>
            <span style={{ fontFamily: 'var(--font-body)' }}>Show Hint</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button className="px-6 py-3 rounded-xl transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
          <span style={{ fontFamily: 'var(--font-body)' }}>← Previous Lesson</span>
        </button>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#86EFAC]" />
          <span className="text-sm opacity-60">Mark as Complete</span>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FF8B7B, #FFA6C9)',
                  color: '#0A0A0B',
                }}>
          <span style={{ fontFamily: 'var(--font-body)' }}>Next Lesson</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
