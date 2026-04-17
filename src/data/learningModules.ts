export interface ContentSection {
  type: 'concept' | 'code' | 'exercise' | 'tip' | 'warning';
  title: string;
  content: string;
  code?: string;
  language?: string;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  inProgress?: boolean;
  locked: boolean;
  sections: ContentSection[];
}

export interface Module {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  glowColor: string;
  lessons: Lesson[];
}

export const learningModules: Module[] = [
  {
    id: 'shell',
    title: 'Shell Scripting Fundamentals',
    shortTitle: 'Shell',
    description: 'Master bash scripting for macOS system administration and automation.',
    color: '#86EFAC',
    glowColor: 'rgba(134, 239, 172, 0.4)',
    lessons: [
      {
        id: 'shell-1',
        number: 1,
        title: 'Introduction to Shell Scripting',
        description: 'Learn what shell scripts are and how to write your first script.',
        duration: 10,
        difficulty: 'Beginner',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'What is a Shell Script?',
            content: 'A shell script is a plain text file containing a sequence of commands that the shell (bash, zsh, etc.) executes line by line. On macOS, the default shell is zsh, but bash scripts remain widely used in system administration.',
          },
          {
            type: 'code',
            title: 'Your First Script',
            content: 'Create a file called hello.sh with the shebang line at the top, then make it executable with chmod.',
            code: `#!/bin/bash
# My first shell script
echo "Hello, Apple Admin!"
echo "Today is: $(date)"
echo "You are logged in as: $USER"`,
            language: 'bash',
          },
          {
            type: 'concept',
            title: 'Making Scripts Executable',
            content: 'Before running a script, you must give it execute permissions using chmod. The +x flag adds execute permission for the file owner.',
            code: `chmod +x hello.sh
./hello.sh`,
            language: 'bash',
          },
          {
            type: 'tip',
            title: 'Shebang Line',
            content: 'Always start scripts with #!/bin/bash or #!/usr/bin/env bash. The shebang tells the OS which interpreter to use. Using /usr/bin/env bash is more portable across different systems.',
          },
        ],
      },
      {
        id: 'shell-2',
        number: 2,
        title: 'Variables & Data Types',
        description: 'Store and manipulate data using variables in bash.',
        duration: 12,
        difficulty: 'Beginner',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Declaring Variables',
            content: 'Variables in bash are assigned without spaces around the = sign. Reference them with a $ prefix. Variable names are case-sensitive.',
            code: `name="Alice"
age=30
macOS_version=$(sw_vers -productVersion)

echo "Name: $name"
echo "Age: $age"
echo "macOS: $macOS_version"`,
            language: 'bash',
          },
          {
            type: 'concept',
            title: 'Special Variables',
            content: 'Bash provides built-in special variables for common values like script arguments, process IDs, and exit codes.',
            code: `echo "Script name: $0"
echo "First argument: $1"
echo "All arguments: $@"
echo "Argument count: $#"
echo "Last exit code: $?"
echo "Process ID: $$"`,
            language: 'bash',
          },
          {
            type: 'warning',
            title: 'Always Quote Your Variables',
            content: 'Unquoted variables break when values contain spaces. Always wrap variable references in double quotes: "$variable" instead of $variable.',
            code: `# BAD - breaks with spaces
file=$1
rm $file

# GOOD - handles spaces correctly
file="$1"
rm "$file"`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-3',
        number: 3,
        title: 'Control Flow — if/else',
        description: 'Make decisions in your scripts using conditional statements.',
        duration: 15,
        difficulty: 'Beginner',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Basic if/else',
            content: 'The if statement evaluates a condition (exit code 0 = true). Use [[ ]] for string and file tests — it is safer than the older [ ].',
            code: `#!/bin/bash
username="$1"

if [[ -z "$username" ]]; then
  echo "Error: No username provided"
  exit 1
elif [[ "$username" == "root" ]]; then
  echo "Warning: Operating as root"
else
  echo "Processing user: $username"
fi`,
            language: 'bash',
          },
          {
            type: 'concept',
            title: 'File & Directory Tests',
            content: 'Bash has built-in operators for testing files and directories. These are essential for safe system administration scripts.',
            code: `log_file="/var/log/app.log"

if [[ -f "$log_file" ]]; then
  echo "Log file exists"
elif [[ -d "/var/log" ]]; then
  echo "Directory exists, creating log file"
  touch "$log_file"
else
  echo "Log directory not found"
  exit 1
fi`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-4',
        number: 4,
        title: 'Loops — for & while',
        description: 'Repeat operations with for and while loops.',
        duration: 15,
        difficulty: 'Beginner',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'for Loop',
            content: 'Use for loops to iterate over lists, arrays, or command output. The most common pattern in admin scripts is iterating over files or lines of output.',
            code: `# Iterate over files
for file in /Users/*/Desktop/*.txt; do
  echo "Processing: $file"
done

# Iterate over command output
for user in $(dscl . -list /Users | grep -v "^_"); do
  echo "User: $user"
done`,
            language: 'bash',
          },
          {
            type: 'concept',
            title: 'while Loop',
            content: 'while loops run as long as a condition is true. Useful for monitoring, waiting, or reading files line by line.',
            code: `# Read a file line by line
while IFS= read -r line; do
  echo "Processing: $line"
done < /etc/hosts

# Wait for a process
while pgrep -x "Installer" > /dev/null; do
  echo "Waiting for installer..."
  sleep 5
done
echo "Installer finished"`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-5',
        number: 5,
        title: 'Functions',
        description: 'Organize reusable code blocks into functions.',
        duration: 18,
        difficulty: 'Intermediate',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Defining Functions',
            content: 'Functions group reusable logic. In bash, functions must be defined before they are called. They receive arguments as $1, $2, etc.',
            code: `#!/bin/bash

log() {
  local level="$1"
  local message="$2"
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $message"
}

create_user() {
  local username="$1"
  local fullname="$2"

  log "INFO" "Creating user: $username"
  dscl . -create "/Users/$username"
  dscl . -create "/Users/$username" RealName "$fullname"
  log "INFO" "User $username created successfully"
}

create_user "jdoe" "John Doe"`,
            language: 'bash',
          },
          {
            type: 'tip',
            title: 'Use local for Variables',
            content: 'Declare variables inside functions with local to prevent them from polluting the global scope. This avoids hard-to-debug naming conflicts in larger scripts.',
          },
        ],
      },
      {
        id: 'shell-6',
        number: 6,
        title: 'String Manipulation',
        description: 'Process and transform strings using bash built-ins.',
        duration: 20,
        difficulty: 'Intermediate',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Parameter Expansion',
            content: 'Bash parameter expansion lets you manipulate strings without external tools. This is faster and more portable than calling sed or awk.',
            code: `filename="report_2024-01-15.txt"

# Remove extension
name="${filename%.*}"        # report_2024-01-15

# Get extension only
ext="${filename##*.}"        # txt

# Replace substring
new="${filename/2024/2025}"  # report_2025-01-15

# Uppercase
upper="${filename^^}"        # REPORT_2024-01-15.TXT

# String length
len="${#filename}"           # 22

echo "$name | $ext | $new | $upper | $len"`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-7',
        number: 7,
        title: 'Arrays',
        description: 'Store and iterate over collections of values.',
        duration: 15,
        difficulty: 'Intermediate',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Indexed Arrays',
            content: 'Bash arrays store ordered lists of values. Use parentheses to declare, and ${array[@]} to expand all elements.',
            code: `# Declare array
users=("alice" "bob" "charlie" "diana")

# Access element
echo "${users[0]}"        # alice

# All elements
echo "${users[@]}"        # alice bob charlie diana

# Array length
echo "${#users[@]}"       # 4

# Iterate
for user in "${users[@]}"; do
  echo "Checking user: $user"
  id "$user" &>/dev/null && echo "  exists" || echo "  missing"
done`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-8',
        number: 8,
        title: 'File Operations',
        description: 'Read, write, and manage files from your scripts.',
        duration: 20,
        difficulty: 'Intermediate',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Reading & Writing Files',
            content: 'Scripts commonly read configuration files, write logs, and process data files. Use redirection operators to work with file content.',
            code: `# Write to file (overwrite)
echo "Script started at $(date)" > /tmp/run.log

# Append to file
echo "Step 1 complete" >> /tmp/run.log

# Read entire file
content=$(cat /tmp/run.log)
echo "Log contents: $content"

# Read line by line
while IFS= read -r line; do
  [[ "$line" == \#* ]] && continue  # skip comments
  echo "Config: $line"
done < /etc/paths`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-9',
        number: 9,
        title: 'Regular Expressions',
        description: 'Match and extract text patterns using grep and sed.',
        duration: 22,
        difficulty: 'Intermediate',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'grep Patterns',
            content: 'grep searches files or command output for patterns. Use -E for extended regex, -i for case-insensitive, and -o to print only the match.',
            code: `# Find all admin users
dscl . -list /Users | grep -E "^admin"

# Extract IP addresses from log
grep -oE '[0-9]{1,3}(\.[0-9]{1,3}){3}' /var/log/system.log

# Find lines NOT matching
grep -v "^#" /etc/hosts  # exclude comments

# Case-insensitive search
grep -i "error" /var/log/install.log | tail -20`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-10',
        number: 10,
        title: 'Process Management',
        description: 'Monitor, start, and stop processes from scripts.',
        duration: 18,
        difficulty: 'Intermediate',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Working with Processes',
            content: 'Admin scripts frequently need to check if services are running, kill stuck processes, or wait for operations to complete.',
            code: `# Check if process is running
if pgrep -x "Finder" > /dev/null; then
  echo "Finder is running"
fi

# Get PID
pid=$(pgrep -x "Dock")
echo "Dock PID: $pid"

# Kill a process gracefully, then force
kill "$pid"
sleep 2
kill -9 "$pid" 2>/dev/null

# Run in background
/usr/local/bin/backup.sh &
bg_pid=$!
echo "Backup running as PID $bg_pid"`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-11',
        number: 11,
        title: 'Input & Output',
        description: 'Handle stdin, stdout, stderr, and pipes effectively.',
        duration: 15,
        difficulty: 'Intermediate',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Redirection & Pipes',
            content: 'Every process has three standard streams: stdin (0), stdout (1), stderr (2). Redirect and pipe them to control data flow between commands.',
            code: `# Redirect stderr to stdout
command 2>&1

# Discard all output
command > /dev/null 2>&1

# Pipe stdout to next command
ps aux | grep "[S]afari" | awk '{print $2}'

# Split output: save and display
command | tee /tmp/output.log

# Read from here-string
grep "error" <<< "$log_output"`,
            language: 'bash',
          },
        ],
      },
      {
        id: 'shell-12',
        number: 12,
        title: 'Error Handling & Exit Codes',
        description: 'Write robust scripts that handle failures gracefully.',
        duration: 20,
        difficulty: 'Intermediate',
        completed: false,
        inProgress: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Exit Codes',
            content: 'Every command returns an exit code: 0 means success, anything else means failure. The special variable $? holds the last exit code. Checking exit codes is the foundation of robust error handling.',
            code: `#!/bin/bash
cp /important/file /backup/

if [[ $? -ne 0 ]]; then
  echo "ERROR: Backup failed!"
  exit 1
fi
echo "Backup succeeded"`,
            language: 'bash',
          },
          {
            type: 'concept',
            title: 'set -e and set -u',
            content: 'Use set -euo pipefail at the top of scripts. -e exits on any error, -u treats unset variables as errors, and -o pipefail catches errors in pipes.',
            code: `#!/bin/bash
set -euo pipefail

# Script will now exit immediately on any error
# instead of silently continuing

backup_dir="/Volumes/Backup"
user="$1"  # Will error if $1 is unset

mkdir -p "$backup_dir/$user"
rsync -av "/Users/$user/" "$backup_dir/$user/"
echo "Backup complete for $user"`,
            language: 'bash',
          },
          {
            type: 'concept',
            title: 'trap for Cleanup',
            content: 'trap lets you run cleanup code when a script exits or receives a signal. This ensures temporary files are removed even if the script fails.',
            code: `#!/bin/bash
set -euo pipefail

TMPFILE=$(mktemp)
trap 'rm -f "$TMPFILE"' EXIT

# Work with temp file safely
dscl . -list /Users > "$TMPFILE"
user_count=$(wc -l < "$TMPFILE")
echo "Total users: $user_count"
# TMPFILE is automatically cleaned up on exit`,
            language: 'bash',
          },
          {
            type: 'exercise',
            title: 'Practice: Safe User Creation',
            content: 'Write a script that creates a new macOS user account. It should validate all inputs, use set -euo pipefail, trap for cleanup, and exit with a descriptive error message if any step fails.',
          },
        ],
      },
    ],
  },
  {
    id: 'applescript',
    title: 'AppleScript Mastery',
    shortTitle: 'AppleScript',
    description: 'Automate macOS applications and workflows with AppleScript.',
    color: '#C4B5FD',
    glowColor: 'rgba(196, 181, 253, 0.4)',
    lessons: [
      {
        id: 'as-1',
        number: 1,
        title: 'Introduction to AppleScript',
        description: 'Understand AppleScript syntax and run your first automation.',
        duration: 12,
        difficulty: 'Beginner',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'What is AppleScript?',
            content: 'AppleScript is a scripting language built into macOS that lets you control applications and system features using English-like syntax. It communicates with apps via the Apple Events protocol.',
          },
          {
            type: 'code',
            title: 'Your First AppleScript',
            content: 'Run AppleScripts in Script Editor.app or via osascript from the terminal.',
            code: `-- Display a greeting dialog
display dialog "Hello from AppleScript!" with title "My First Script"

-- Get the result
set theAnswer to button returned of ¬
  (display dialog "Are you ready?" buttons {"No", "Yes"} default button "Yes")

if theAnswer is "Yes" then
  say "Let's get started!"
end if`,
            language: 'applescript',
          },
          {
            type: 'tip',
            title: 'Running from Terminal',
            content: 'Use osascript to run AppleScripts from bash: osascript -e \'display dialog "Hello"\' or osascript myscript.applescript',
          },
        ],
      },
      {
        id: 'as-2',
        number: 2,
        title: 'Tell Blocks & Target Applications',
        description: 'Control specific applications using tell blocks.',
        duration: 15,
        difficulty: 'Beginner',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'The tell Statement',
            content: 'The tell block directs commands to a specific application. Everything inside the block is sent to that app via Apple Events.',
            code: `-- Tell Finder to open the Applications folder
tell application "Finder"
  open folder "Applications" of startup disk
  activate
end tell

-- Tell Safari to open a URL
tell application "Safari"
  make new document
  set URL of current tab of front window to "https://apple.com"
  activate
end tell`,
            language: 'applescript',
          },
        ],
      },
      {
        id: 'as-3',
        number: 3,
        title: 'Variables & Properties',
        description: 'Store data and access application properties.',
        duration: 15,
        difficulty: 'Beginner',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Variables in AppleScript',
            content: 'Use set to assign variables. AppleScript is loosely typed — variables can hold strings, numbers, lists, and records.',
            code: `-- Basic variable assignment
set userName to "Alice"
set userAge to 30
set isAdmin to true

-- List (like an array)
set adminUsers to {"alice", "bob", "charlie"}

-- Record (like a dictionary)
set userInfo to {name:"Alice", role:"Admin", level:5}

-- Access record properties
set role to role of userInfo
display dialog "Role: " & role`,
            language: 'applescript',
          },
        ],
      },
      {
        id: 'as-4',
        number: 4,
        title: 'Handlers & Subroutines',
        description: 'Create reusable code blocks with handlers.',
        duration: 18,
        difficulty: 'Intermediate',
        completed: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Defining Handlers',
            content: 'Handlers are AppleScript\'s version of functions. Define them with "on handlerName()" and call them by name.',
            code: `on createUserFolder(userName)
  set folderPath to "/Users/Shared/" & userName
  do shell script "mkdir -p " & quoted form of folderPath
  return folderPath
end createUserFolder

on logMessage(level, msg)
  set timestamp to do shell script "date '+%H:%M:%S'"
  log "[" & timestamp & "] [" & level & "] " & msg
end logMessage

-- Call handlers
set newPath to createUserFolder("jdoe")
logMessage("INFO", "Created folder: " & newPath)`,
            language: 'applescript',
          },
        ],
      },
      {
        id: 'as-5',
        number: 5,
        title: 'File System Operations',
        description: 'Read, write, and manage files using AppleScript.',
        duration: 20,
        difficulty: 'Intermediate',
        completed: false,
        inProgress: true,
        locked: false,
        sections: [
          {
            type: 'concept',
            title: 'Working with Files',
            content: 'AppleScript can read and write files directly, and can also call shell commands for more complex file operations using do shell script.',
            code: `-- Write text to a file
set filePath to "/tmp/report.txt"
set fileRef to open for access POSIX file filePath with write permission
set eof of fileRef to 0
write "Admin Report - " & (current date) & return to fileRef
write "Generated by AppleScript" & return to fileRef
close access fileRef

-- Read a file
set fileRef to open for access POSIX file filePath
set fileContents to read fileRef
close access fileRef
display dialog fileContents`,
            language: 'applescript',
          },
          {
            type: 'concept',
            title: 'Shell Integration',
            content: 'do shell script runs bash commands and returns their output. This is the bridge between AppleScript and shell scripting.',
            code: `-- Get disk usage
set diskInfo to do shell script "df -h / | tail -1 | awk '{print $5}'"
display dialog "Disk usage: " & diskInfo

-- List admin users (with admin privileges)
set admins to do shell script ¬
  "dscl . -read /Groups/admin GroupMembership" ¬
  with administrator privileges`,
            language: 'applescript',
          },
        ],
      },
      {
        id: 'as-6',
        number: 6,
        title: 'System Events & UI Scripting',
        description: 'Automate any app UI by scripting System Events.',
        duration: 25,
        difficulty: 'Intermediate',
        completed: false,
        locked: true,
        sections: [
          {
            type: 'concept',
            title: 'UI Scripting',
            content: 'System Events lets you interact with any app\'s UI elements — menus, buttons, text fields — even if the app has no AppleScript dictionary.',
            code: `tell application "System Events"
  tell process "System Preferences"
    click menu item "Network" of menu "View" of menu bar 1
  end tell
end tell`,
            language: 'applescript',
          },
        ],
      },
      {
        id: 'as-7',
        number: 7,
        title: 'Mail & Calendar Automation',
        description: 'Automate emails, events, and reminders.',
        duration: 22,
        difficulty: 'Advanced',
        completed: false,
        locked: true,
        sections: [
          {
            type: 'concept',
            title: 'Sending Email via Mail.app',
            content: 'AppleScript can create and send emails through Mail.app.',
            code: `tell application "Mail"
  set newMessage to make new outgoing message with properties ¬
    {subject:"Admin Report", content:"See attached report.", visible:true}
  tell newMessage
    make new to recipient with properties {address:"admin@company.com"}
  end tell
  send newMessage
end tell`,
            language: 'applescript',
          },
        ],
      },
      {
        id: 'as-8',
        number: 8,
        title: 'Advanced Automation Patterns',
        description: 'Build complex multi-app automation workflows.',
        duration: 30,
        difficulty: 'Advanced',
        completed: false,
        locked: true,
        sections: [
          {
            type: 'concept',
            title: 'Chaining Applications',
            content: 'Real-world automation scripts often orchestrate multiple applications — gathering data from one, processing it, and writing results to another.',
          },
        ],
      },
    ],
  },
  {
    id: 'automator',
    title: 'Automator & Shortcuts',
    shortTitle: 'Automator',
    description: 'Create no-code and low-code workflows for macOS automation.',
    color: '#7DD3FC',
    glowColor: 'rgba(125, 211, 252, 0.4)',
    lessons: [
      {
        id: 'auto-1',
        number: 1,
        title: 'Getting Started with Automator',
        description: 'Build your first visual workflow in Automator.app.',
        duration: 10,
        difficulty: 'Beginner',
        completed: false,
        locked: true,
        sections: [
          {
            type: 'concept',
            title: 'What is Automator?',
            content: 'Automator is a visual programming environment built into macOS. You chain together pre-built actions to create workflows without writing code.',
          },
        ],
      },
      {
        id: 'auto-2',
        number: 2,
        title: 'Folder Actions',
        description: 'Trigger workflows automatically when files are added to a folder.',
        duration: 15,
        difficulty: 'Beginner',
        completed: false,
        locked: true,
        sections: [],
      },
      {
        id: 'auto-3',
        number: 3,
        title: 'Creating macOS Shortcuts',
        description: 'Build Shortcuts that integrate with system and third-party apps.',
        duration: 20,
        difficulty: 'Beginner',
        completed: false,
        locked: true,
        sections: [],
      },
      {
        id: 'auto-4',
        number: 4,
        title: 'Combining Shell Scripts with Automator',
        description: 'Add shell script actions to Automator for advanced processing.',
        duration: 20,
        difficulty: 'Intermediate',
        completed: false,
        locked: true,
        sections: [],
      },
      {
        id: 'auto-5',
        number: 5,
        title: 'Calendar & Alert Automations',
        description: 'Schedule scripts to run via Calendar alarms.',
        duration: 15,
        difficulty: 'Intermediate',
        completed: false,
        locked: true,
        sections: [],
      },
      {
        id: 'auto-6',
        number: 6,
        title: 'Advanced Workflow Patterns',
        description: 'Chain Automator, Shortcuts, and scripts into powerful workflows.',
        duration: 30,
        difficulty: 'Advanced',
        completed: false,
        locked: true,
        sections: [],
      },
    ],
  },
];

export function getModuleProgress(module: Module): number {
  const completed = module.lessons.filter(l => l.completed).length;
  return Math.round((completed / module.lessons.length) * 100);
}

export function getCurrentLesson(module: Module): Lesson | undefined {
  return module.lessons.find(l => l.inProgress) || module.lessons.find(l => !l.completed && !l.locked);
}
