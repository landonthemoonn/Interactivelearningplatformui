import { Sparkles, MessageSquare, Wand2, FileCode, Shield, Lightbulb, Send } from 'lucide-react';
import { useState } from 'react';

export function AIAssistant() {
  const [activeAssistant, setActiveAssistant] = useState<'claude' | 'gemini'>('claude');
  const [message, setMessage] = useState('');

  const quickActions = [
    { icon: MessageSquare, label: 'Explain this', desc: 'Line-by-line breakdown' },
    { icon: Wand2, label: 'Rewrite cleanly', desc: 'Improve structure' },
    { icon: Shield, label: 'Make safer', desc: 'Add error handling' },
    { icon: FileCode, label: 'Add logging', desc: 'Production logs' },
    { icon: Lightbulb, label: 'Convert to AppleScript', desc: 'Language change' },
    { icon: Sparkles, label: 'Make Jamf-friendly', desc: 'MDM compatible' },
  ];

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          AI Coach
        </h1>
        <p className="opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
          Get instant help from Claude and Gemini for explaining, refactoring, and improving your scripts
        </p>
      </div>

      {/* AI Selection */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveAssistant('claude')}
          className="flex-1 p-6 rounded-[2rem] transition-all duration-300"
          style={{
            background: activeAssistant === 'claude'
              ? 'linear-gradient(135deg, rgba(255, 139, 123, 0.2), rgba(255, 166, 201, 0.2))'
              : 'rgba(28, 28, 30, 0.6)',
            border: activeAssistant === 'claude'
              ? '1px solid rgba(255, 139, 123, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8B7B] to-[#FFA6C9] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#0A0A0B]" />
            </div>
            {activeAssistant === 'claude' && (
              <div className="px-3 py-1 rounded-full text-xs"
                   style={{
                     background: 'rgba(255, 139, 123, 0.3)',
                     color: '#FF8B7B',
                   }}>
                Active
              </div>
            )}
          </div>
          <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Claude
          </h3>
          <p className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
            Best for explanations, refactoring, documentation, and code reviews
          </p>
        </button>

        <button
          onClick={() => setActiveAssistant('gemini')}
          className="flex-1 p-6 rounded-[2rem] transition-all duration-300"
          style={{
            background: activeAssistant === 'gemini'
              ? 'linear-gradient(135deg, rgba(125, 211, 252, 0.2), rgba(196, 181, 253, 0.2))'
              : 'rgba(28, 28, 30, 0.6)',
            border: activeAssistant === 'gemini'
              ? '1px solid rgba(125, 211, 252, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7DD3FC] to-[#C4B5FD] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#0A0A0B]" />
            </div>
            {activeAssistant === 'gemini' && (
              <div className="px-3 py-1 rounded-full text-xs"
                   style={{
                     background: 'rgba(125, 211, 252, 0.3)',
                     color: '#7DD3FC',
                   }}>
                Active
              </div>
            )}
          </div>
          <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Gemini
          </h3>
          <p className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
            Best for drafting, transforming, iteration, and optimization
          </p>
        </button>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="flex items-start gap-4 p-5 rounded-2xl transition-all hover:scale-105"
                style={{
                  background: 'rgba(28, 28, 30, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{
                       background: activeAssistant === 'claude'
                         ? 'rgba(255, 139, 123, 0.2)'
                         : 'rgba(125, 211, 252, 0.2)',
                     }}>
                  <Icon className="w-5 h-5"
                        style={{
                          color: activeAssistant === 'claude' ? '#FF8B7B' : '#7DD3FC',
                        }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    {action.label}
                  </div>
                  <div className="text-xs opacity-60">{action.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="rounded-[2rem] overflow-hidden"
           style={{
             background: 'rgba(28, 28, 30, 0.6)',
             border: '1px solid rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(20px)',
           }}>
        <div className="p-6 border-b"
             style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Conversation with {activeAssistant === 'claude' ? 'Claude' : 'Gemini'}
          </h3>
        </div>

        {/* Messages */}
        <div className="p-6 space-y-6 h-96 overflow-y-auto">
          {/* Example AI Message */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0"
                 style={{
                   background: activeAssistant === 'claude'
                     ? 'linear-gradient(135deg, #FF8B7B, #FFA6C9)'
                     : 'linear-gradient(135deg, #7DD3FC, #C4B5FD)',
                 }}>
              <Sparkles className="w-5 h-5 text-[#0A0A0B]" />
            </div>
            <div className="flex-1">
              <div className="text-sm opacity-60 mb-2">
                {activeAssistant === 'claude' ? 'Claude' : 'Gemini'}
              </div>
              <div className="p-4 rounded-2xl"
                   style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     border: '1px solid rgba(255, 255, 255, 0.08)',
                   }}>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  Hi! I can help you understand, improve, and debug your Apple admin scripts.
                  Paste your code or ask me a question to get started.
                </p>
              </div>
            </div>
          </div>

          {/* Example User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex-1 max-w-2xl">
              <div className="text-sm opacity-60 mb-2 text-right">You</div>
              <div className="p-4 rounded-2xl"
                   style={{
                     background: activeAssistant === 'claude'
                       ? 'rgba(255, 139, 123, 0.15)'
                       : 'rgba(125, 211, 252, 0.15)',
                     border: activeAssistant === 'claude'
                       ? '1px solid rgba(255, 139, 123, 0.3)'
                       : '1px solid rgba(125, 211, 252, 0.3)',
                   }}>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  Can you explain how to properly check if a user exists before creating them in bash?
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C4B5FD] to-[#7DD3FC] flex items-center justify-center flex-shrink-0">
              <span className="text-sm">👤</span>
            </div>
          </div>

          {/* Example AI Response */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0"
                 style={{
                   background: activeAssistant === 'claude'
                     ? 'linear-gradient(135deg, #FF8B7B, #FFA6C9)'
                     : 'linear-gradient(135deg, #7DD3FC, #C4B5FD)',
                 }}>
              <Sparkles className="w-5 h-5 text-[#0A0A0B]" />
            </div>
            <div className="flex-1">
              <div className="text-sm opacity-60 mb-2">
                {activeAssistant === 'claude' ? 'Claude' : 'Gemini'}
              </div>
              <div className="p-4 rounded-2xl"
                   style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     border: '1px solid rgba(255, 255, 255, 0.08)',
                   }}>
                <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                  Great question! On macOS, you can use <code className="px-2 py-0.5 rounded text-xs"
                  style={{ background: 'rgba(0, 0, 0, 0.3)' }}>dscl</code> to check if a user exists:
                </p>
                <div className="p-4 rounded-xl text-xs leading-relaxed mb-3"
                     style={{
                       background: 'rgba(0, 0, 0, 0.4)',
                       border: '1px solid rgba(255, 255, 255, 0.05)',
                       fontFamily: 'monospace',
                     }}>
                  <div className="text-[#A78BFA]"># Check if user exists</div>
                  <div className="text-[#F5F5F0]">if dscl . -read /Users/"$username" &gt; /dev/null 2&gt;&1; then</div>
                  <div className="ml-4 text-[#86EFAC]">echo "User already exists"</div>
                  <div className="ml-4 text-[#FFA6C9]">exit 1</div>
                  <div className="text-[#F5F5F0]">fi</div>
                </div>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  This redirects both stdout and stderr to /dev/null, so you only check the exit code.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t"
             style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question or paste your script..."
              className="flex-1 px-6 py-4 rounded-2xl bg-transparent outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-body)',
              }}
            />
            <button className="px-8 py-4 rounded-2xl transition-all hover:scale-105"
                    style={{
                      background: activeAssistant === 'claude'
                        ? 'linear-gradient(135deg, #FF8B7B, #FFA6C9)'
                        : 'linear-gradient(135deg, #7DD3FC, #C4B5FD)',
                      color: '#0A0A0B',
                    }}>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
