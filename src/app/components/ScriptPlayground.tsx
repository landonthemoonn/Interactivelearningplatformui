import { Play, AlertTriangle, CheckCircle2, Sparkles, Wand2, Shield, FileText } from 'lucide-react';
import { useState } from 'react';

interface ScriptPlaygroundProps {
  theme: 'light' | 'dark';
}

export function ScriptPlayground({ theme }: ScriptPlaygroundProps) {
  const isDark = theme === 'dark';
  const [script] = useState(`#!/bin/bash

# User account creation script
username="$1"

if [ -z "$username" ]; then
    echo "Error: No username provided"
    exit 1
fi

dscl . -create /Users/$username
dscl . -create /Users/$username UserShell /bin/bash`);

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      <div className="text-center py-20"
           style={{
             fontFamily: 'var(--font-heading)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
        <h1 className="text-4xl mb-4">Script Playground</h1>
        <p className="opacity-60 max-w-xl mx-auto"
           style={{ fontFamily: 'var(--font-body)' }}>
          Paste your script and get instant analysis, improvements, and safety checks
        </p>
      </div>
    </div>
  );
}
