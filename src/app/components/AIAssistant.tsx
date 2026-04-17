import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Code2, Lightbulb, BookOpen, Wand2, User } from 'lucide-react';

interface AIAssistantProps {
  theme: 'light' | 'dark';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  code?: string;
  language?: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm your AI scripting coach. I can help you understand shell scripting concepts, debug your scripts, explain AppleScript syntax, or review code for best practices. What are you working on today?",
  },
  {
    id: '2',
    role: 'user',
    content: "Can you explain the difference between $@ and $* in bash?",
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Great question! Both expand to all positional parameters, but they behave differently when quoted:\n\n• "$@" expands each argument as a separate quoted string — this is almost always what you want.\n• "$*" joins all arguments into a single string using the first character of IFS (usually a space).\n\nHere\'s a practical example to see the difference:',
    code: `#!/bin/bash
# Test with: ./test.sh "hello world" "foo bar"

print_args() {
  echo "--- Using \\$@ ---"
  for arg in "$@"; do
    echo "  arg: [$arg]"
  done

  echo "--- Using \\$* ---"
  for arg in "$*"; do
    echo "  arg: [$arg]"
  done
}

print_args "$@"

# Output with "$@":
#   arg: [hello world]
#   arg: [foo bar]

# Output with "$*":
#   arg: [hello world foo bar]  ← all joined!`,
    language: 'bash',
  },
  {
    id: '4',
    role: 'user',
    content: 'How should I handle errors in a script that creates user accounts?',
  },
  {
    id: '5',
    role: 'assistant',
    content: 'For a user creation script, I recommend a layered approach to error handling:\n\n1. Use set -euo pipefail at the top — this makes the script exit on any unhandled error and catches failures in pipes.\n2. Validate all inputs before doing anything.\n3. Use a trap for cleanup in case something fails midway.\n4. Check exit codes for critical commands like dscl explicitly.',
    code: `#!/bin/bash
set -euo pipefail

# --- Input validation ---
USERNAME="${1:-}"
[[ -z "$USERNAME" ]] && { echo "Usage: $0 <username>" >&2; exit 1; }
[[ "$USERNAME" =~ ^[a-z][a-z0-9_-]{1,30}$ ]] || {
  echo "Error: Invalid username format" >&2; exit 1
}

# --- Check for duplicates ---
if id "$USERNAME" &>/dev/null; then
  echo "Error: User '$USERNAME' already exists" >&2
  exit 1
fi

# --- Cleanup on failure ---
trap 'dscl . -delete "/Users/$USERNAME" 2>/dev/null; echo "Rolled back user creation"' ERR

# --- Create user ---
dscl . -create "/Users/$USERNAME"
dscl . -create "/Users/$USERNAME" UserShell /bin/zsh
dscl . -create "/Users/$USERNAME" RealName "$USERNAME"
createhomedir -c -u "$USERNAME"

trap - ERR  # clear trap on success
echo "✓ User '$USERNAME' created successfully"`,
    language: 'bash',
  },
];

const SUGGESTIONS = [
  { icon: Code2, label: 'Explain this script', prompt: 'Can you walk me through what this script does step by step?' },
  { icon: Wand2, label: 'Improve my code', prompt: 'Review my script for best practices and suggest improvements.' },
  { icon: BookOpen, label: 'Teach me about...', prompt: 'Explain how trap and EXIT signals work in bash.' },
  { icon: Lightbulb, label: 'Debug an issue', prompt: 'My script works locally but fails on a different Mac. What should I check?' },
];

const AI_RESPONSES: Record<string, Message> = {
  default: {
    id: '',
    role: 'assistant',
    content: "That's a great question about shell scripting! The key thing to understand here is how bash handles variable expansion and word splitting. In practice, always quote your variables and test edge cases like empty strings and paths with spaces. Would you like me to show a concrete example?",
  },
  trap: {
    id: '',
    role: 'assistant',
    content: "The trap command lets you register a command to run when your script receives a signal or exits. The most useful signals are:\n\n• EXIT — runs when the script exits for any reason\n• ERR — runs when any command fails (combine with set -e)\n• INT — runs on Ctrl+C\n• TERM — runs on kill\n\nThe EXIT trap is the most important — use it to clean up temp files, release locks, or log completion:",
    code: `#!/bin/bash
set -euo pipefail

TMPFILE=$(mktemp)
LOCKFILE="/tmp/myscript.lock"

# Always clean up, even on error or Ctrl+C
cleanup() {
  rm -f "$TMPFILE" "$LOCKFILE"
  echo "Cleanup complete" >&2
}
trap cleanup EXIT

# Acquire lock (prevent parallel runs)
if [[ -e "$LOCKFILE" ]]; then
  echo "Script is already running" >&2
  exit 1
fi
touch "$LOCKFILE"

# Do work...
dscl . -list /Users > "$TMPFILE"
echo "Found $(wc -l < "$TMPFILE") users"
# TMPFILE and LOCKFILE cleaned up automatically`,
    language: 'bash',
  },
};

export function AIAssistant({ theme }: AIAssistantProps) {
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textColor = isDark ? '#F5F5F0' : '#0A0A0B';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const key = text.toLowerCase().includes('trap') ? 'trap' : 'default';
      const aiMsg: Message = { ...AI_RESPONSES[key], id: (Date.now() + 1).toString() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400);
  }

  const glassStyle = {
    background: isDark ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.6)',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.5)',
    backdropFilter: 'blur(40px) saturate(180%)',
    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)',
  } as React.CSSProperties;

  return (
    <div className="w-full h-screen flex flex-col animate-[fadeIn_0.6s_ease-out]" style={{ maxHeight: 'calc(100vh - 0px)' }}>
      {/* Header */}
      <div className="p-8 pb-4 shrink-0">
        <div className="rounded-[2rem] p-8" style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(196,181,253,0.1), rgba(167,139,250,0.06))'
            : 'linear-gradient(135deg, rgba(196,181,253,0.15), rgba(167,139,250,0.1))',
          border: isDark ? '1px solid rgba(196,181,253,0.2)' : '1px solid rgba(196,181,253,0.3)',
          backdropFilter: 'blur(60px)',
        }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C4B5FD, #7DD3FC)', boxShadow: '0 4px 16px rgba(196,181,253,0.4)' }}>
              <Sparkles className="w-6 h-6 text-[#0A0A0B]" />
            </div>
            <div>
              <h1 className="text-3xl tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: textColor }}>AI Coach</h1>
              <p className="text-sm opacity-60" style={{ fontFamily: 'var(--font-body)', color: textColor }}>Powered by Claude · Available 24/7</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#86EFAC] animate-pulse" />
              <span className="text-xs opacity-50" style={{ fontFamily: 'var(--font-body)', color: textColor }}>Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 px-8 pb-8 min-h-0">
        {/* Suggestions sidebar */}
        <div className="w-52 shrink-0 space-y-3">
          <p className="text-xs uppercase tracking-wider opacity-40 mb-2" style={{ fontFamily: 'var(--font-body)', color: textColor }}>Quick prompts</p>
          {SUGGESTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button key={i} onClick={() => sendMessage(s.prompt)}
                className="w-full p-3.5 rounded-[1rem] text-left flex items-start gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={glassStyle}>
                <Icon className="w-4 h-4 mt-0.5 shrink-0 text-[#C4B5FD]" />
                <span className="text-xs leading-snug" style={{ fontFamily: 'var(--font-body)', color: textColor, opacity: 0.75 }}>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 rounded-[1.5rem] p-5 overflow-y-auto space-y-5" style={glassStyle}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center" style={{
                  background: msg.role === 'assistant'
                    ? 'linear-gradient(135deg, #C4B5FD, #7DD3FC)'
                    : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
                }}>
                  {msg.role === 'assistant'
                    ? <Sparkles className="w-3.5 h-3.5 text-[#0A0A0B]" />
                    : <User className="w-3.5 h-3.5" style={{ color: textColor }} />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[78%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="rounded-[1rem] px-4 py-3" style={{
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #C4B5FD, #7DD3FC)'
                      : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                    color: msg.role === 'user' ? '#0A0A0B' : textColor,
                  }}>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: 'var(--font-body)' }}>
                      {msg.content}
                    </p>
                  </div>
                  {msg.code && (
                    <div className="w-full rounded-[1rem] overflow-hidden" style={{
                      background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.06)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)',
                    }}>
                      <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>
                        {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />)}
                        <span className="text-xs opacity-30 ml-1" style={{ fontFamily: 'var(--font-body)', color: textColor }}>{msg.language || 'bash'}</span>
                      </div>
                      <pre className="px-4 py-4 text-xs overflow-x-auto" style={{
                        fontFamily: "'SF Mono','Fira Code',monospace",
                        color: isDark ? '#86EFAC' : '#166534',
                        lineHeight: 1.7,
                        margin: 0,
                      }}>
                        <code>{msg.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C4B5FD, #7DD3FC)' }}>
                  <Sparkles className="w-3.5 h-3.5 text-[#0A0A0B]" />
                </div>
                <div className="rounded-[1rem] px-4 py-3 flex items-center gap-1" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#C4B5FD]"
                      style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="mt-3 rounded-[1.5rem] p-3 flex items-end gap-3" style={glassStyle}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Ask about shell scripting, AppleScript, or get code reviewed…"
              rows={2}
              className="flex-1 bg-transparent outline-none resize-none text-sm"
              style={{
                fontFamily: 'var(--font-body)',
                color: textColor,
                lineHeight: '1.6',
              }}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #C4B5FD, #7DD3FC)', boxShadow: '0 4px 12px rgba(196,181,253,0.4)' }}>
              <Send className="w-4 h-4 text-[#0A0A0B]" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
