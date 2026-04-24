import { Copy, User, HardDrive, Package, FolderOpen, FileSearch, Settings, CheckCircle2, Terminal } from 'lucide-react';
import { useState } from 'react';

interface RecipesProps {
  theme: 'light' | 'dark';
}

export function Recipes({ theme }: RecipesProps) {
  const isDark = theme === 'dark';
  const [selectedRecipe, setSelectedRecipe] = useState(0);

  const recipes = [
    {
      title: 'Get Current Logged-In User',
      useCase: 'Find who is currently logged into the console (essential for root scripts targeting user directories)',
      icon: User,
      color: '#7DD3FC',
      script: `#!/bin/bash

# Get the currently logged-in user (console user)
loggedInUser=$(stat -f%Su /dev/console)

echo "Logged in user: $loggedInUser"

# Use in paths
userDesktop="/Users/$loggedInUser/Desktop"
echo "Desktop path: $userDesktop"`,
      risk: 'Always verify user exists before using paths. Script fails if run at login window (no console user).',
      aiPrompt: 'Explain when to use stat vs scutil vs who for getting the logged-in user on macOS',
    },
    {
      title: 'Check if App is Installed',
      useCase: 'Verify whether an app is installed before attempting to configure or use it',
      icon: Package,
      color: '#86EFAC',
      script: `#!/bin/bash

# Check if app is installed
appName="Google Chrome"
appPath="/Applications/$appName.app"

if [ -d "$appPath" ]; then
    echo "$appName is installed"
    # Get app version
    version=$(defaults read "$appPath/Contents/Info" CFBundleShortVersionString)
    echo "Version: $version"
else
    echo "$appName is NOT installed"
    exit 1
fi`,
      risk: 'App could be installed in ~/Applications instead. Check both locations for completeness.',
      aiPrompt: 'Show me how to check for apps in both /Applications and ~/Applications',
    },
    {
      title: 'Get Serial Number & OS Version',
      useCase: 'Gather machine info for asset management or conditional deployment logic',
      icon: HardDrive,
      color: '#C4B5FD',
      script: `#!/bin/bash

# Get hardware serial number
serialNumber=$(system_profiler SPHardwareDataType | awk '/Serial Number/{print $4}')

# Get macOS version
osVersion=$(sw_vers -productVersion)

# Get macOS build
osBuild=$(sw_vers -buildVersion)

# Get model identifier
modelID=$(system_profiler SPHardwareDataType | awk '/Model Identifier/{print $3}')

echo "Serial: $serialNumber"
echo "macOS: $osVersion ($osBuild)"
echo "Model: $modelID"`,
      risk: 'system_profiler can be slow. Use sw_vers and ioreg for faster queries when possible.',
      aiPrompt: 'What is the fastest way to get Mac serial number without using system_profiler?',
    },
    {
      title: 'Copy File to User Desktop',
      useCase: 'Deploy files to logged-in user desktop from MDM or admin script',
      icon: FolderOpen,
      color: '#FFB5A0',
      script: `#!/bin/bash

# Get logged-in user
loggedInUser=$(stat -f%Su /dev/console)

# Source file (from script directory)
sourceFile="/path/to/your/file.pdf"

# Destination
destPath="/Users/$loggedInUser/Desktop"

# Verify user directory exists
if [ ! -d "$destPath" ]; then
    echo "Error: User desktop not found"
    exit 1
fi

# Copy file
cp "$sourceFile" "$destPath/"

# Fix ownership (important when running as root)
chown "$loggedInUser" "$destPath/$(basename "$sourceFile")"

echo "File copied to $destPath"`,
      risk: 'When running as root, files will be owned by root unless you fix ownership with chown.',
      aiPrompt: 'Why do files copied as root to user directories need chown, and what breaks if I skip it?',
    },
    {
      title: 'Read Preference Value',
      useCase: 'Check whether a setting or preference is enabled without breaking the plist',
      icon: Settings,
      color: '#FFA6C9',
      script: `#!/bin/bash

# Read a preference value safely
domain="com.apple.screensaver"
key="askForPassword"

# Read the value
value=$(defaults read "$domain" "$key" 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "Value of $key: $value"

    # Check if enabled
    if [ "$value" == "1" ]; then
        echo "Screen saver password is enabled"
    else
        echo "Screen saver password is disabled"
    fi
else
    echo "Key not found or plist doesn't exist"
fi`,
      risk: 'defaults read will fail if key doesn\'t exist. Always redirect stderr to /dev/null and check exit code.',
      aiPrompt: 'Show me safe patterns for reading plists when keys might not exist',
    },
    {
      title: 'Check if Config Profile Exists',
      useCase: 'Validate whether a configuration profile is installed on the Mac',
      icon: FileSearch,
      color: '#A78BFA',
      script: `#!/bin/bash

# Check for a specific configuration profile
profileID="com.company.security"

# List installed profiles
installedProfiles=$(profiles -P)

if echo "$installedProfiles" | grep -q "$profileID"; then
    echo "Profile $profileID is installed"
else
    echo "Profile $profileID is NOT installed"
    exit 1
fi`,
      risk: 'profiles command requires root or Full Disk Access in modern macOS. May fail in restricted environments.',
      aiPrompt: 'What TCC permissions does the profiles command need to run in scripts?',
    },
    {
      title: 'Create Dated Support Folder',
      useCase: 'Generate timestamped folders for log collection or troubleshooting bundles',
      icon: FolderOpen,
      color: '#FF8B7B',
      script: `#!/bin/bash

# Get current user
loggedInUser=$(stat -f%Su /dev/console)

# Create timestamp
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")

# Create folder on desktop
supportFolder="/Users/$loggedInUser/Desktop/Support_$timestamp"

mkdir -p "$supportFolder"

# Copy logs or info
system_profiler SPHardwareDataType > "$supportFolder/hardware.txt"
sw_vers > "$supportFolder/os_version.txt"

# Fix ownership
chown -R "$loggedInUser" "$supportFolder"

echo "Support folder created: $supportFolder"`,
      risk: 'Always use quotes around paths with timestamps or spaces. mkdir -p creates parent directories safely.',
      aiPrompt: 'What is the safest way to create folders with timestamps in their names?',
    },
    {
      title: 'Write to Log File',
      useCase: 'Create a log file for troubleshooting scripts run remotely via MDM',
      icon: Terminal,
      color: '#7DD3FC',
      script: `#!/bin/bash

# Log file path
logFile="/var/log/my_script.log"

# Function to log with timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$logFile"
}

# Use the function
log_message "Script started"
log_message "Checking for app installation..."

# Example check
if [ -d "/Applications/Slack.app" ]; then
    log_message "Slack is installed"
else
    log_message "Slack is NOT installed"
fi

log_message "Script completed"`,
      risk: 'Writing to /var/log requires root. Use /tmp/ or user directory for non-root scripts.',
      aiPrompt: 'Where should scripts log when running as user vs root? What are the best practices?',
    },
  ];

  const currentRecipe = recipes[selectedRecipe];
  const Icon = currentRecipe.icon;

  return (
    <div className="w-full p-8 pb-16 space-y-6 animate-[fadeIn_0.6s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2 tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              color: isDark ? '#F5F5F0' : '#0A0A0B',
            }}>
          Script Recipes
        </h1>
        <p className="opacity-80"
           style={{
             fontFamily: 'var(--font-body)',
             color: isDark ? '#F5F5F0' : '#0A0A0B',
           }}>
          Copy-paste patterns for common Mac admin tasks
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Recipe List */}
        <div className="col-span-4 space-y-3">
          {recipes.map((recipe, index) => {
            const RecipeIcon = recipe.icon;
            const isActive = selectedRecipe === index;

            return (
              <button
                key={index}
                onClick={() => setSelectedRecipe(index)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.02]"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${recipe.color}20, ${recipe.color}10)`
                    : (isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)'),
                  border: isActive
                    ? `1px solid ${recipe.color}40`
                    : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)'),
                  backdropFilter: 'blur(40px)',
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{
                       background: `${recipe.color}20`,
                       border: `1px solid ${recipe.color}30`,
                     }}>
                  <RecipeIcon className="w-5 h-5"
                              style={{ color: recipe.color }} />
                </div>
                <div className="text-left flex-1">
                  <div className="text-sm"
                       style={{
                         fontFamily: 'var(--font-body)',
                         fontWeight: isActive ? 600 : 400,
                         color: isDark ? '#F5F5F0' : '#0A0A0B',
                       }}>
                    {recipe.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recipe Detail */}
        <div className="col-span-8 space-y-6">
          {/* Header */}
          <div className="rounded-[2rem] p-8"
               style={{
                 background: `linear-gradient(135deg, ${currentRecipe.color}15, ${currentRecipe.color}08)`,
                 border: `1px solid ${currentRecipe.color}25`,
                 backdropFilter: 'blur(60px)',
               }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                     style={{
                       background: `${currentRecipe.color}30`,
                       border: `1px solid ${currentRecipe.color}50`,
                     }}>
                  <Icon className="w-7 h-7"
                        style={{ color: currentRecipe.color }} />
                </div>
                <div>
                  <h2 className="text-2xl mb-1 tracking-tight"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: isDark ? '#F5F5F0' : '#0A0A0B',
                      }}>
                    {currentRecipe.title}
                  </h2>
                  <p className="text-sm opacity-70"
                     style={{
                       fontFamily: 'var(--font-body)',
                       color: isDark ? '#F5F5F0' : '#0A0A0B',
                     }}>
                    {currentRecipe.useCase}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
                      style={{
                        background: `${currentRecipe.color}`,
                        color: '#0A0A0B',
                      }}>
                <Copy className="w-4 h-4" />
                <span className="text-sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  Copy
                </span>
              </button>
            </div>
          </div>

          {/* Script Code */}
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
              <h3 className="text-lg"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: isDark ? '#F5F5F0' : '#0A0A0B',
                  }}>
                Script
              </h3>
            </div>
            <div className="p-6">
              <pre className="text-sm leading-relaxed overflow-x-auto"
                   style={{
                     fontFamily: 'monospace',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                {currentRecipe.script}
              </pre>
            </div>
          </div>

          {/* Risk Notes */}
          <div className="rounded-[2rem] p-6"
               style={{
                 background: 'linear-gradient(135deg, rgba(255, 166, 201, 0.1), rgba(255, 139, 123, 0.1))',
                 border: '1px solid rgba(255, 166, 201, 0.2)',
                 backdropFilter: 'blur(40px)',
               }}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#FFA6C9] mt-0.5" />
              <div>
                <h4 className="text-sm mb-2"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      color: isDark ? '#F5F5F0' : '#0A0A0B',
                    }}>
                  Risk Notes
                </h4>
                <p className="text-sm opacity-80"
                   style={{
                     fontFamily: 'var(--font-body)',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                  {currentRecipe.risk}
                </p>
              </div>
            </div>
          </div>

          {/* AI Prompt Suggestion */}
          <div className="rounded-[2rem] p-6"
               style={{
                 background: isDark ? 'rgba(20, 20, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                 border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.5)',
                 backdropFilter: 'blur(40px)',
               }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C4B5FD] to-[#A78BFA] flex items-center justify-center flex-shrink-0">
                <Terminal className="w-5 h-5 text-[#0A0A0B]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm mb-2"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      color: isDark ? '#F5F5F0' : '#0A0A0B',
                    }}>
                  Customize with AI
                </h4>
                <p className="text-sm opacity-80 mb-3"
                   style={{
                     fontFamily: 'var(--font-body)',
                     color: isDark ? '#F5F5F0' : '#0A0A0B',
                   }}>
                  {currentRecipe.aiPrompt}
                </p>
                <button className="text-xs px-4 py-2 rounded-lg transition-all hover:scale-105"
                        style={{
                          background: 'rgba(196, 181, 253, 0.2)',
                          border: '1px solid rgba(196, 181, 253, 0.3)',
                          color: '#C4B5FD',
                        }}>
                  Ask AI Coach →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
