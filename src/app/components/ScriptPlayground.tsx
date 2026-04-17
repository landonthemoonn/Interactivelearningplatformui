import { useState } from 'react';
import { Play, CheckCircle2, AlertTriangle, Lightbulb, Shield, FileText, Wand2, ChevronDown } from 'lucide-react';

interface ScriptPlaygroundProps {
  theme: 'light' | 'dark';
}

interface AnalysisItem {
  type: 'success' | 'warning' | 'error' | 'tip';
  title: string;
  detail: string;
  line?: number;
}

const EXAMPLES: Record<string, { label: string; code: string }> = {
  userCreate: {
    label: 'User Account Creation',
    code: `#!/bin/bash
set -euo pipefail

username="$1"
fullname="$2"

if [ -z "$username" ]; then
    echo "Error: No username provided"
    exit 1
fi

dscl . -create /Users/$username
dscl . -create /Users/$username UserShell /bin/bash
dscl . -create /Users/$username RealName "$fullname"
dscl . -create /Users/$username UniqueID 1001
dscl . -create /Users/$username PrimaryGroupID 20
createhomedir -c -u "$username"
echo "User $username created successfully"`,
  },
  backup: {
    label: 'Backup Script',
    code: `#!/bin/bash
set -euo pipefail

SOURCE="/Users/$USER/Documents"
DEST="/Volumes/Backup/Documents-$(date +%Y%m%d)"
LOGFILE="/tmp/backup.log"

trap 'echo "Backup failed at $(date)" >> "$LOGFILE"' ERR

echo "Starting backup: $(date)" | tee -a "$LOGFILE"

if [[ ! -d "$SOURCE" ]]; then
  echo "Source not found: $SOURCE"
  exit 1
fi

rsync -av --delete "$SOURCE/" "$DEST/" | tee -a "$LOGFILE"
echo "Backup complete: $(date)" | tee -a "$LOGFILE"`,
  },
  cleanup: {
    label: 'Temp File Cleanup',
    code: `#!/bin/bash
# Cleanup old temp files

TMPDIR="/private/tmp"
MAX_AGE=7  # days

echo "Cleaning files older than $MAX_AGE days in $TMPDIR"

find $TMPDIR -type f -mtime +$MAX_AGE -exec rm {} \;

echo "Done. Cleaned up old temp files."`,
  },
};

function analyzeScript(code: string): AnalysisItem[] {
  const results: AnalysisItem[] = [];
  const lines = code.split('\n');

  const hasShebang = lines[0]?.startsWith('#!');
  const hasSetE = code.includes('set -e') || code.includes('set -euo');
  const hasQuotedVars = /"\$[a-zA-Z_]/.test(code);
  const hasUnquotedVars = /[^"]\$[a-zA-Z_][a-zA-Z0-9_]*[^"]/.test(code);
  const hasRmRf = /rm\s+-rf\s+\$/.test(code);
  const hasTrap = code.includes('trap ');
  const hasSudo = code.includes('sudo ');

  if (hasShebang) {
    results.push({ type: 'success', title: 'Shebang present', detail: 'Script correctly declares its interpreter on line 1.' });
  } else {
    results.push({ type: 'error', title: 'Missing shebang', detail: 'Add #!/bin/bash or #!/usr/bin/env bash as the first line.', line: 1 });
  }

  if (hasSetE) {
    results.push({ type: 'success', title: 'Error handling enabled', detail: 'set -e / set -euo pipefail will exit on unexpected errors.' });
  } else {
    results.push({ type: 'warning', title: 'No error mode set', detail: 'Add "set -euo pipefail" near the top so the script exits on failures instead of silently continuing.' });
  }

  if (hasRmRf) {
    results.push({ type: 'error', title: 'Dangerous: rm -rf $variable', detail: 'Never pass unvalidated variables to rm -rf. If the variable is empty, this could delete system directories.' });
  }

  if (hasTrap) {
    results.push({ type: 'success', title: 'Cleanup trap found', detail: 'Great — trap will ensure cleanup code runs even if the script exits unexpectedly.' });
  } else if (code.includes('mktemp') || code.includes('TMPFILE')) {
    results.push({ type: 'tip', title: 'Consider using trap for temp files', detail: 'You create temp files but have no trap EXIT handler. Add: trap \'rm -f "$TMPFILE"\' EXIT' });
  }

  if (hasSudo) {
    results.push({ type: 'warning', title: 'sudo usage detected', detail: 'Avoid hardcoding sudo in scripts. Prefer running the whole script as root or using doas with explicit privilege separation.' });
  }

  if (hasUnquotedVars && !hasQuotedVars) {
    results.push({ type: 'warning', title: 'Unquoted variables', detail: 'Wrap variable references in double quotes: "$variable". Unquoted variables break when values contain spaces or special characters.' });
  }

  const longLines = lines.filter(l => l.length > 100);
  if (longLines.length > 0) {
    results.push({ type: 'tip', title: `${longLines.length} long line(s)`, detail: 'Lines over 100 chars reduce readability. Use line continuation (\\) or extract into variables.' });
  }

  if (code.includes('echo') && !code.includes('>&2') && hasSetE) {
    results.push({ type: 'tip', title: 'Route error messages to stderr', detail: 'Error messages should go to stderr: echo "Error: ..." >&2. This separates diagnostic output from program output.' });
  }

  results.push({ type: 'success', title: 'Script parsed successfully', detail: `${lines.filter(l => l.trim() && !l.trim().startsWith('#')).length} executable lines detected.` });

  return results;
}

const typeStyles: Record<AnalysisItem['type'], { icon: React.FC<{ className?: string }>, color: string, bg: string }> = {
  success: { icon: CheckCircle2, color: '#86EFAC', bg: 'rgba(134,239,172,0.12)' },
  warning: { icon: AlertTriangle, color: '#FFA6C9', bg: 'rgba(255,166,201,0.12)' },
  error: { icon: AlertTriangle, color: '#FF8B7B', bg: 'rgba(255,139,123,0.12)' },
  tip: { icon: Lightbulb, color: '#C4B5FD', bg: 'rgba(196,181,253,0.12)' },
};

export function ScriptPlayground({ theme }: ScriptPlaygroundProps) {
  const isDark = theme === 'dark';
  const [script, setScript] = useState(EXAMPLES.userCreate.code);
  const [analysis, setAnalysis] = useState<AnalysisItem[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const textColor = isDark ? '#F5F5F0' : '#0A0A0B';

  function runAnalysis() {
    setIsAnalyzing(true);
    setAnalysis(null);
    setTimeout(() => {
      setAnalysis(analyzeScript(script));
      setIsAnalyzing(false);
    }, 900);
  }

  const glassStyle = {
    background: isDark ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.6)',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.5)',
    backdropFilter: 'blur(40px) saturate(180%)',
    boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)',
  } as React.CSSProperties;

  const counts = analysis ? {
    errors: analysis.filter(a => a.type === 'error').length,
    warnings: analysis.filter(a => a.type === 'warning').length,
    tips: analysis.filter(a => a.type === 'tip').length,
    passed: analysis.filter(a => a.type === 'success').length,
  } : null;

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div className="rounded-[2rem] p-8" style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(134,239,172,0.08), rgba(125,211,252,0.06))'
          : 'linear-gradient(135deg, rgba(134,239,172,0.12), rgba(125,211,252,0.1))',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.5)',
        backdropFilter: 'blur(60px)',
      }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.03em', color: textColor }}>
              Script Playground
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', opacity: 0.6, color: textColor }}>
              Paste your shell script and get instant static analysis, security checks, and improvement tips.
            </p>
          </div>
          {/* Examples dropdown */}
          <div className="relative ml-6 shrink-0">
            <button onClick={() => setShowExamples(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[1rem] text-sm transition-all"
              style={{ ...glassStyle, color: textColor, fontFamily: 'var(--font-body)' }}>
              <FileText className="w-4 h-4" />
              Examples
              <ChevronDown className="w-3.5 h-3.5 opacity-50" />
            </button>
            {showExamples && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-[1rem] overflow-hidden z-20" style={glassStyle}>
                {Object.entries(EXAMPLES).map(([key, ex]) => (
                  <button key={key} onClick={() => { setScript(ex.code); setShowExamples(false); setAnalysis(null); }}
                    className="w-full px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors"
                    style={{ fontFamily: 'var(--font-body)', color: textColor }}>
                    {ex.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider opacity-40" style={{ fontFamily: 'var(--font-body)', color: textColor }}>
              Editor
            </span>
            <button onClick={runAnalysis} disabled={isAnalyzing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[1rem] text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #86EFAC, #7DD3FC)', color: '#0A0A0B', fontFamily: 'var(--font-body)', boxShadow: '0 4px 16px rgba(134,239,172,0.3)' }}>
              {isAnalyzing ? (
                <><Wand2 className="w-4 h-4 animate-spin" /> Analyzing…</>
              ) : (
                <><Play className="w-4 h-4" /> Analyze Script</>
              )}
            </button>
          </div>

          <div className="rounded-[1.5rem] overflow-hidden" style={{ ...glassStyle, border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }}>
            {/* Editor toolbar */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
              <span className="ml-2 text-xs opacity-30" style={{ fontFamily: 'var(--font-body)', color: textColor }}>script.sh</span>
            </div>
            <textarea
              value={script}
              onChange={e => setScript(e.target.value)}
              className="w-full resize-none outline-none bg-transparent"
              style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: '13px',
                lineHeight: '1.7',
                color: isDark ? '#86EFAC' : '#166534',
                padding: '20px',
                minHeight: '420px',
              }}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-wider opacity-40" style={{ fontFamily: 'var(--font-body)', color: textColor }}>
            Analysis
          </span>

          {!analysis && !isAnalyzing && (
            <div className="rounded-[1.5rem] p-10 flex flex-col items-center justify-center text-center" style={{ ...glassStyle, minHeight: '480px' }}>
              <Shield className="w-12 h-12 mb-4" style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
              <p className="text-sm opacity-40" style={{ fontFamily: 'var(--font-body)', color: textColor }}>
                Click "Analyze Script" to run<br />static analysis and security checks
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="rounded-[1.5rem] p-10 flex flex-col items-center justify-center text-center" style={{ ...glassStyle, minHeight: '480px' }}>
              <Wand2 className="w-10 h-10 mb-4 animate-spin" style={{ color: '#86EFAC' }} />
              <p className="text-sm opacity-60" style={{ fontFamily: 'var(--font-body)', color: textColor }}>Analyzing your script…</p>
            </div>
          )}

          {analysis && counts && (
            <div className="space-y-3">
              {/* Summary */}
              <div className="rounded-[1.5rem] p-5 grid grid-cols-4 gap-3" style={glassStyle}>
                {[
                  { label: 'Passed', val: counts.passed, color: '#86EFAC' },
                  { label: 'Errors', val: counts.errors, color: '#FF8B7B' },
                  { label: 'Warnings', val: counts.warnings, color: '#FFA6C9' },
                  { label: 'Tips', val: counts.tips, color: '#C4B5FD' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: s.color }}>{s.val}</div>
                    <div className="text-xs opacity-50" style={{ fontFamily: 'var(--font-body)', color: textColor }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Items */}
              <div className="space-y-2" style={{ maxHeight: '380px', overflowY: 'auto' }}>
                {analysis.map((item, i) => {
                  const { icon: Icon, color, bg } = typeStyles[item.type];
                  return (
                    <div key={i} className="rounded-[1rem] p-4 flex gap-3" style={{ background: bg, border: `1px solid ${color}20` }}>
                      <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} />
                      <div>
                        <div className="text-sm font-semibold mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: textColor }}>
                          {item.title}
                          {item.line && <span className="ml-2 text-xs opacity-40">line {item.line}</span>}
                        </div>
                        <div className="text-xs leading-relaxed opacity-70" style={{ fontFamily: 'var(--font-body)', color: textColor }}>
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
