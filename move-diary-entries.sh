#!/bin/bash

# ══════════════════════════════════════════════════════════════
# Sailor Stellara - Auto Move Diary Entries
# ══════════════════════════════════════════════════════════════
# This script moves diary backup files from Downloads to diary_entries folder

DOWNLOADS="$HOME/Downloads"
DIARY_FOLDER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/diary_entries"
PATTERN="sailor-stellara-autosave-*.json"

# Create diary_entries folder if it doesn't exist
mkdir -p "$DIARY_FOLDER"

# Check if we can access Downloads folder
if [ ! -r "$DOWNLOADS" ]; then
  echo "⚠️  Cannot access Downloads folder. macOS Full Disk Access may be required."
  echo ""
  echo "To fix this:"
  echo "1. Open System Settings > Privacy & Security > Full Disk Access"
  echo "2. Add Terminal (or your automation tool)"
  echo "3. Try again"
  exit 1
fi

# Move files from Downloads to diary_entries
moved_count=0
for file in "$DOWNLOADS"/$PATTERN; do
  # Skip if pattern didn't match any files
  [ -e "$file" ] || break
  
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    if mv "$file" "$DIARY_FOLDER/$filename" 2>/dev/null; then
      echo "✅ Moved: $filename"
      ((moved_count++))
    else
      echo "❌ Failed to move: $filename"
    fi
  fi
done

if [ $moved_count -eq 0 ]; then
  echo "ℹ️  No new diary backups to move"
else
  echo "✨ Successfully moved $moved_count file(s) to diary_entries/"
fi

exit 0
