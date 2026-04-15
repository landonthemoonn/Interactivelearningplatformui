import { Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AIAssistantProps {
  theme: 'light' | 'dark';
}

export function AIAssistant({ theme }: AIAssistantProps) {
  const isDark = theme === 'dark';

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      <div className="text-center py-20"
           style={{
             fontFamily: 'var(--font-heading)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
        <h1 className="text-4xl mb-4">AI Coach</h1>
        <p className="opacity-60 max-w-xl mx-auto"
           style={{ fontFamily: 'var(--font-body)' }}>
          Get instant help from Claude and Gemini for explaining, refactoring, and improving your scripts
        </p>
      </div>
    </div>
  );
}
