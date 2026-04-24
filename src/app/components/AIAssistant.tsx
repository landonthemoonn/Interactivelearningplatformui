import { Sparkles, MessageSquare, Wand2, FileCode, Shield, Lightbulb, Send, Search, GitCompare, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface AIAssistantProps {
  theme: 'light' | 'dark';
}

export function AIAssistant({ theme }: AIAssistantProps) {
  const isDark = theme === 'dark';
  const [activeAssistant, setActiveAssistant] = useState<'claude' | 'gemini'>('claude');
  const [message, setMessage] = useState('');

  const promptTemplates = [
    {
      category: 'explain',
      title: 'Explain Line by Line',
      prompt: 'Explain this script line by line, focusing on what each command does and why it matters for Mac admin workflows.',
      icon: MessageSquare,
      color: '#7DD3FC',
    },
    {
      category: 'review',
      title: 'Safety Review',
      prompt: 'Review this script for Mac admin best practices. Flag any risks, security issues, or bad practices for MDM deployment.',
      icon: Shield,
      color: '#86EFAC',
    },
    {
      category: 'improve',
      title: 'Make Safer',
      prompt: 'Rewrite this script to be safer and more robust. Add error handling, logging, and validation.',
      icon: Wand2,
      color: '#FFB5A0',
    },
    {
      category: 'document',
      title: 'Add Comments',
      prompt: 'Add clear, educational comments to this script explaining what each section does and why.',
      icon: FileCode,
      color: '#C4B5FD',
    },
    {
      category: 'compare',
      title: 'Compare Versions',
      prompt: 'Compare these two script approaches and explain which is better for Mac admin use and why.',
      icon: GitCompare,
      color: '#FFA6C9',
    },
    {
      category: 'debug',
      title: 'Find Issues',
      prompt: 'Debug this script. Identify what would break in an MDM environment and suggest fixes.',
      icon: Search,
      color: '#A78BFA',
    },
    {
      category: 'convert',
      title: 'Convert to Function',
      prompt: 'Convert this into a reusable function with proper parameter handling and return values.',
      icon: Lightbulb,
      color: '#FF8B7B',
    },
    {
      category: 'mdm',
      title: 'Make MDM-Safe',
      prompt: 'Adapt this script for Jamf/MDM deployment. Ensure it works in root context and handles logged-in user targeting.',
      icon: AlertTriangle,
      color: '#FFB5A0',
    },
  ];

  const thinkingPatterns = [
    { q: 'What is this script trying to do?', a: 'Understand the goal first' },
    { q: 'What are the inputs?', a: 'Know what data it expects' },
    { q: 'What could fail?', a: 'Think about error cases' },
    { q: 'Does it require root?', a: 'Check privilege requirements' },
    { q: 'Does it touch user data?', a: 'Flag potential data risks' },
    { q: 'Is there a safer alternative?', a: 'Look for better approaches' },
  ];

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2 tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#F5F5F0' : '#0A0A0B',
            }}>
          AI Coach
        </h1>
        <p className="opacity-80"
           style={{
             fontFamily: 'var(--font-body)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
          Get instant help from Claude and Gemini for script review, debugging, and learning
        </p>
      </div>

      {/* AI Selection */}
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => setActiveAssistant('claude')}
          className="p-8 rounded-[2rem] transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: activeAssistant === 'claude'
              ? 'linear-gradient(135deg, rgba(255, 139, 123, 0.15), rgba(255, 166, 201, 0.15))'
              : (isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)'),
            border: activeAssistant === 'claude'
              ? '1px solid rgba(255, 139, 123, 0.3)'
              : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)'),
            backdropFilter: 'blur(60px)',
          }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF8B7B] to-[#FFA6C9] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#0A0A0B]" />
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
          <h3 className="text-2xl mb-2"
              style={{
                fontFamily: 'var(--font-heading)',
                color: isDark ? '#F5F5F0' : '#0A0A0B',
              }}>
            Claude
          </h3>
          <p className="text-sm opacity-80"
             style={{
               fontFamily: 'var(--font-body)',
               color: isDark ? '#F5F5F0' : '#0A0A0B',
             }}>
            Best for explanations, safety reviews, refactoring, and code analysis
          </p>
        </button>

        <button
          onClick={() => setActiveAssistant('gemini')}
          className="p-8 rounded-[2rem] transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: activeAssistant === 'gemini'
              ? 'linear-gradient(135deg, rgba(125, 211, 252, 0.15), rgba(196, 181, 253, 0.15))'
              : (isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)'),
            border: activeAssistant === 'gemini'
              ? '1px solid rgba(125, 211, 252, 0.3)'
              : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)'),
            backdropFilter: 'blur(60px)',
          }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7DD3FC] to-[#C4B5FD] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#0A0A0B]" />
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
          <h3 className="text-2xl mb-2"
              style={{
                fontFamily: 'var(--font-heading)',
                color: isDark ? '#F5F5F0' : '#0A0A0B',
              }}>
            Gemini
          </h3>
          <p className="text-sm opacity-80"
             style={{
               fontFamily: 'var(--font-body)',
               color: isDark ? '#F5F5F0' : '#0A0A0B',
             }}>
            Best for drafting, fast iteration, transformation, and optimization
          </p>
        </button>
      </div>

      {/* Prompt Templates */}
      <div>
        <h3 className="text-2xl mb-4 tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#F5F5F0' : '#0A0A0B',
            }}>
          Prompt Templates
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {promptTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <button
                key={index}
                className="flex flex-col items-start gap-3 p-5 rounded-2xl transition-all hover:scale-[1.02]"
                style={{
                  background: isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(40px)',
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{
                       background: `${template.color}20`,
                       border: `1px solid ${template.color}30`,
                     }}>
                  <Icon className="w-5 h-5"
                        style={{ color: template.color }} />
                </div>
                <div className="flex-1 text-left w-full">
                  <div className="text-sm mb-2"
                       style={{
                         fontFamily: 'var(--font-body)',
                         fontWeight: 500,
                         color: isDark ? '#F5F5F0' : '#0A0A0B',
                       }}>
                    {template.title}
                  </div>
                  <div className="text-xs opacity-60 line-clamp-2"
                       style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                    {template.prompt}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thinking Patterns Guide */}
      <div className="rounded-[2rem] p-8"
           style={{
             background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(196, 181, 253, 0.1))',
             border: '1px solid rgba(196, 181, 253, 0.2)',
             backdropFilter: 'blur(40px)',
           }}>
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-[#C4B5FD]" />
          <h3 className="text-xl"
              style={{
                fontFamily: 'var(--font-heading)',
                color: isDark ? '#F5F5F0' : '#0A0A0B',
              }}>
            Learn to Think Like a Reviewer
          </h3>
        </div>

        <p className="text-sm opacity-80 mb-6"
           style={{
             fontFamily: 'var(--font-body)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
          AI Coach teaches thinking patterns, not just answers. Ask these questions before running any script:
        </p>

        <div className="grid grid-cols-2 gap-4">
          {thinkingPatterns.map((pattern, index) => (
            <div key={index}
                 className="p-4 rounded-xl"
                 style={{
                   background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                 }}>
              <div className="text-sm mb-2"
                   style={{
                     fontFamily: 'var(--font-body)',
                     fontWeight: 500,
                     color: '#C4B5FD',
                   }}>
                {pattern.q}
              </div>
              <div className="text-xs opacity-70"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                {pattern.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
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
            Conversation with {activeAssistant === 'claude' ? 'Claude' : 'Gemini'}
          </h3>
        </div>

        {/* Messages */}
        <div className="p-6 space-y-6 h-96 overflow-y-auto">
          {/* AI Welcome */}
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
              <div className="text-sm opacity-60 mb-2"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                {activeAssistant === 'claude' ? 'Claude' : 'Gemini'}
              </div>
              <div className="p-4 rounded-2xl"
                   style={{
                     background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                     border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                   }}>
                <p className="text-sm leading-relaxed"
                   style={{
                     fontFamily: 'var(--font-body)',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                  I can help you understand, review, and improve your Mac admin scripts.
                  Paste code or use a prompt template to get started.
                </p>
              </div>
            </div>
          </div>

          {/* Example Conversation */}
          <div className="flex gap-4 justify-end">
            <div className="flex-1 max-w-2xl">
              <div className="text-sm opacity-60 mb-2 text-right"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                You
              </div>
              <div className="p-4 rounded-2xl"
                   style={{
                     background: activeAssistant === 'claude'
                       ? 'rgba(255, 139, 123, 0.15)'
                       : 'rgba(125, 211, 252, 0.15)',
                     border: activeAssistant === 'claude'
                       ? '1px solid rgba(255, 139, 123, 0.3)'
                       : '1px solid rgba(125, 211, 252, 0.3)',
                   }}>
                <p className="text-sm leading-relaxed"
                   style={{
                     fontFamily: 'var(--font-body)',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                  Review this script for Mac admin best practices and flag any risks for MDM deployment
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C4B5FD] to-[#7DD3FC] flex items-center justify-center flex-shrink-0">
              <span className="text-sm">👤</span>
            </div>
          </div>

          {/* AI Response with Safety Analysis */}
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
              <div className="text-sm opacity-60 mb-2"
                   style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }}>
                {activeAssistant === 'claude' ? 'Claude' : 'Gemini'}
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl"
                     style={{
                       background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                       border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                     }}>
                  <p className="text-sm leading-relaxed mb-3"
                     style={{
                       fontFamily: 'var(--font-body)',
                       color: isDark ? '#F5F5F0' : '#0A0A0B',
                     }}>
                    I've reviewed this script. Here are the key findings:
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#FFA6C9] mt-0.5" />
                      <div className="text-sm"
                           style={{
                             fontFamily: 'var(--font-body)',
                             color: isDark ? '#F5F5F0' : '#0A0A0B',
                           }}>
                        <strong>Risk:</strong> Hardcoded UID will cause conflicts in multi-user environments
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#86EFAC] mt-0.5" />
                      <div className="text-sm"
                           style={{
                             fontFamily: 'var(--font-body)',
                             color: isDark ? '#F5F5F0' : '#0A0A0B',
                           }}>
                        <strong>Good:</strong> Validates username input before proceeding
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#FFA6C9] mt-0.5" />
                      <div className="text-sm"
                           style={{
                             fontFamily: 'var(--font-body)',
                             color: isDark ? '#F5F5F0' : '#0A0A0B',
                           }}>
                        <strong>Missing:</strong> No error handling for dscl command failures
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t"
             style={{
               borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
             }}>
          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question or paste your script..."
              className="flex-1 px-6 py-4 rounded-2xl bg-transparent outline-none"
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: 'var(--font-body)',
                color: isDark ? '#F5F5F0' : '#0A0A0B',
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
