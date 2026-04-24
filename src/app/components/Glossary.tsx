import { BookOpen, Search } from 'lucide-react';
import { useState } from 'react';

interface GlossaryProps {
  theme: 'light' | 'dark';
}

export function Glossary({ theme }: GlossaryProps) {
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  const glossaryTerms = [
    {
      term: 'shebang',
      definition: 'The #! at the top of a script that tells the system which interpreter to use.',
      example: '#!/bin/bash or #!/bin/zsh',
      category: 'Basics',
    },
    {
      term: 'plist',
      definition: 'Property List file format used by macOS to store settings and preferences.',
      example: 'com.apple.dock.plist',
      category: 'macOS',
    },
    {
      term: 'console user',
      definition: 'The user currently logged into the Mac GUI (not SSH or remote).',
      example: 'stat -f%Su /dev/console',
      category: 'macOS',
    },
    {
      term: 'root',
      definition: 'Superuser account with full system access. Scripts run by MDM often run as root.',
      example: 'sudo runs commands as root',
      category: 'Permissions',
    },
    {
      term: 'exit code',
      definition: 'Number returned when a script finishes. 0 = success, non-zero = failure.',
      example: 'exit 0 or exit 1',
      category: 'Basics',
    },
    {
      term: 'TCC',
      definition: 'Transparency, Consent, and Control - macOS privacy permission system.',
      example: 'Full Disk Access, Screen Recording permissions',
      category: 'Security',
    },
    {
      term: 'launchd',
      definition: 'macOS system that manages background services and scheduled tasks.',
      example: 'LaunchAgents and LaunchDaemons',
      category: 'macOS',
    },
    {
      term: 'profile',
      definition: 'Configuration profile that enforces settings on macOS devices.',
      example: 'profiles -P lists installed profiles',
      category: 'MDM',
    },
    {
      term: 'domain',
      definition: 'Preference domain identifier, usually reverse-DNS style.',
      example: 'com.apple.screensaver',
      category: 'macOS',
    },
    {
      term: 'defaults',
      definition: 'Command-line tool to read and write macOS preference files.',
      example: 'defaults read com.apple.dock',
      category: 'macOS',
    },
    {
      term: 'stderr',
      definition: 'Standard error - where programs send error messages.',
      example: '2>/dev/null redirects errors to nowhere',
      category: 'Basics',
    },
    {
      term: 'stdout',
      definition: 'Standard output - where programs send normal output.',
      example: 'echo sends to stdout',
      category: 'Basics',
    },
    {
      term: 'variable',
      definition: 'Named container that stores a value you can reuse.',
      example: 'user="admin"',
      category: 'Basics',
    },
    {
      term: 'path',
      definition: 'Location of a file or folder in the filesystem.',
      example: '/Users/admin/Desktop',
      category: 'Basics',
    },
    {
      term: 'pipe',
      definition: 'Sends output from one command as input to another using |',
      example: 'ls | grep ".txt"',
      category: 'Basics',
    },
    {
      term: 'conditional',
      definition: 'if/then logic that runs code only when a condition is true.',
      example: 'if [ -f file.txt ]; then',
      category: 'Basics',
    },
    {
      term: 'loop',
      definition: 'Repeats commands for each item in a list or until a condition is met.',
      example: 'for user in $users; do',
      category: 'Basics',
    },
    {
      term: 'CFBundleIdentifier',
      definition: 'Unique identifier for a Mac app, found in Info.plist.',
      example: 'com.google.Chrome',
      category: 'macOS',
    },
    {
      term: 'system_profiler',
      definition: 'Command that reports detailed hardware and software info.',
      example: 'system_profiler SPHardwareDataType',
      category: 'macOS',
    },
    {
      term: 'chown',
      definition: 'Changes file ownership (important when running scripts as root).',
      example: 'chown username file.txt',
      category: 'Permissions',
    },
    {
      term: 'chmod',
      definition: 'Changes file permissions (read, write, execute).',
      example: 'chmod +x script.sh makes it executable',
      category: 'Permissions',
    },
    {
      term: 'Full Disk Access',
      definition: 'TCC permission allowing apps to read protected files and folders.',
      example: 'Required for scripts reading ~/Library in modern macOS',
      category: 'Security',
    },
    {
      term: 'MDM',
      definition: 'Mobile Device Management - system to remotely manage and configure Macs.',
      example: 'Jamf Pro, Kandji, Mosyle',
      category: 'MDM',
    },
    {
      term: 'enrollment',
      definition: 'Process of adding a Mac to MDM management.',
      example: 'DEP/ADE for zero-touch enrollment',
      category: 'MDM',
    },
    {
      term: 'extension attribute',
      definition: 'Custom inventory data collected by MDM from a script.',
      example: 'Jamf extension attributes run scripts and report results',
      category: 'MDM',
    },
    {
      term: 'policy',
      definition: 'MDM workflow that runs scripts, installs apps, or applies settings.',
      example: 'Jamf policies can be triggered on check-in, login, or self-service',
      category: 'MDM',
    },
    {
      term: 'scoping',
      definition: 'Targeting which devices or users receive an MDM policy or profile.',
      example: 'Scope to "Marketing Department" smart group',
      category: 'MDM',
    },
  ];

  const categories = ['All', 'Basics', 'macOS', 'Permissions', 'Security', 'MDM'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTerms = glossaryTerms
    .filter(term => {
      const matchesSearch = searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2 tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#F5F5F0' : '#0A0A0B',
            }}>
          Admin Glossary
        </h1>
        <p className="opacity-80"
           style={{
             fontFamily: 'var(--font-body)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
          Essential terms for Apple scripting and Mac administration
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
                  style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }} />
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl outline-none transition-all"
            style={{
              background: isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(40px)',
              fontFamily: 'var(--font-body)',
              color: isDark ? '#F5F5F0' : '#0A0A0B',
            }}
          />
        </div>

        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-3 rounded-xl text-sm transition-all hover:scale-105"
              style={{
                background: selectedCategory === cat
                  ? (isDark ? 'rgba(125, 211, 252, 0.2)' : 'rgba(125, 211, 252, 0.3)')
                  : (isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)'),
                border: selectedCategory === cat
                  ? '1px solid rgba(125, 211, 252, 0.4)'
                  : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)'),
                backdropFilter: 'blur(40px)',
                fontFamily: 'var(--font-body)',
                fontWeight: selectedCategory === cat ? 600 : 400,
                color: selectedCategory === cat ? '#7DD3FC' : (isDark ? '#F5F5F0' : '#0A0A0B'),
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm opacity-60"
           style={{
             fontFamily: 'var(--font-body)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
        {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
      </div>

      {/* Glossary Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredTerms.map((item, index) => (
          <div key={index}
               className="p-6 rounded-2xl transition-all hover:scale-[1.01]"
               style={{
                 background: isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                 border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
                 backdropFilter: 'blur(40px)',
               }}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    color: isDark ? '#F5F5F0' : '#0A0A0B',
                  }}>
                {item.term}
              </h3>
              <span className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: item.category === 'Basics' ? 'rgba(125, 211, 252, 0.2)' :
                                  item.category === 'macOS' ? 'rgba(196, 181, 253, 0.2)' :
                                  item.category === 'Permissions' ? 'rgba(255, 181, 160, 0.2)' :
                                  item.category === 'Security' ? 'rgba(255, 166, 201, 0.2)' :
                                  'rgba(134, 239, 172, 0.2)',
                      border: item.category === 'Basics' ? '1px solid rgba(125, 211, 252, 0.3)' :
                              item.category === 'macOS' ? '1px solid rgba(196, 181, 253, 0.3)' :
                              item.category === 'Permissions' ? '1px solid rgba(255, 181, 160, 0.3)' :
                              item.category === 'Security' ? '1px solid rgba(255, 166, 201, 0.3)' :
                              '1px solid rgba(134, 239, 172, 0.3)',
                      color: item.category === 'Basics' ? '#7DD3FC' :
                             item.category === 'macOS' ? '#C4B5FD' :
                             item.category === 'Permissions' ? '#FFB5A0' :
                             item.category === 'Security' ? '#FFA6C9' :
                             '#86EFAC',
                    }}>
                {item.category}
              </span>
            </div>

            <p className="text-sm mb-4 leading-relaxed"
               style={{
                 fontFamily: 'var(--font-body)',
                 color: isDark ? '#F5F5F0' : '#0A0A0B',
                 opacity: 0.8,
               }}>
              {item.definition}
            </p>

            <div className="rounded-lg p-3"
                 style={{
                   background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                   fontFamily: 'monospace',
                   fontSize: '13px',
                   color: isDark ? '#86EFAC' : '#16A34A',
                 }}>
              {item.example}
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40"
                    style={{ color: isDark ? '#F5F5F0' : '#0A0A0B' }} />
          <p className="text-sm opacity-60"
             style={{
               fontFamily: 'var(--font-body)',
               color: isDark ? '#F5F5F0' : '#0A0A0B',
             }}>
            No terms found matching your search
          </p>
        </div>
      )}
    </div>
  );
}
