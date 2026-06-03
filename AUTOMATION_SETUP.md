# 📁 Diary Entry Auto-Move Setup

This guide helps you automatically move diary backup files from Downloads to the `diary_entries/` folder.

## ⚠️ Important: macOS Full Disk Access Permission

Before setting up automation, you need to grant **Full Disk Access** to Terminal so it can access your Downloads folder.

### Grant Full Disk Access (One-Time Setup)

1. Open **System Settings** (or System Preferences)
2. Go to **Privacy & Security**
3. Scroll down and click **Full Disk Access**
4. Click the **+** button
5. Navigate to **Applications > Utilities > Terminal.app**
6. Click **Open**
7. ✅ Terminal is now added to Full Disk Access

If you use a different automation method, add that tool instead (e.g., Automator, cron, etc.).

---

## Quick Start

### Option 1: Manual Run (Test it first)

```bash
bash /Users/Carina/Documents/Sofias_Welt_Alles/Sailor_Moon/sailor-stellara-universe/move-diary-entries.sh
```

This runs once and moves all pending diary files.

---

## Option 2: Automatic Schedule (Recommended)

Run the script automatically every day using macOS's built-in scheduler.

### Step 1: Make script executable

```bash
chmod +x /Users/Carina/Documents/Sofias_Welt_Alles/Sailor_Moon/sailor-stellara-universe/move-diary-entries.sh
```

### Step 2: Set up Daily Automation

**Choice A: Using `cron` (runs in background)**

1. Open Terminal
2. Run: `crontab -e`
3. Add this line:
```
0 9 * * * /Users/Carina/Documents/Sofias_Welt_Alles/Sailor_Moon/sailor-stellara-universe/move-diary-entries.sh >> /tmp/diary-move.log 2>&1
```
4. Press `Ctrl+D` to save

This runs the script **every day at 9 AM** and logs output to `/tmp/diary-move.log`.

**Choice B: Using macOS Automation (GUI approach)**

1. Open Automator (Applications > Automator)
2. Create new: Quick Action
3. Search for "Run Shell Script"
4. Add the script path:
```
/Users/Carina/Documents/Sofias_Welt_Alles/Sailor_Moon/sailor-stellara-universe/move-diary-entries.sh
```
5. Save as "Move Diary Entries"
6. Open Calendar and set a recurring daily reminder to run this

---

## How It Works

1. Sofia saves diary entries in the Sailor Stellara app
2. Browser auto-downloads backup files to Downloads folder (named `sailor-stellara-autosave-YYYY-MM-DD.json`)
3. Automation script runs (daily or on demand)
4. Files are automatically moved to `diary_entries/` folder
5. ✨ All entries are permanently saved in your project!

---

## Verify It's Working

Check the `diary_entries/` folder:
```bash
ls /Users/Carina/Documents/Sofias_Welt_Alles/Sailor_Moon/sailor-stellara-universe/diary_entries/
```

You should see your diary files organized by date.

---

## Troubleshooting

**"Cannot access Downloads folder" error?**
- You need to grant Full Disk Access (see section above)
- Make sure Terminal is added to Privacy & Security > Full Disk Access
- Try again after granting permission

**Script not running?**
- Check permission: `ls -l move-diary-entries.sh` (should show `rwx`)
- If not, run: `chmod +x move-diary-entries.sh`

**Cron job not working?**
- Check logs: `log stream --predicate 'process == "cron"'`
- Verify path is absolute (use full `/Users/...` path)
- Make sure Terminal has Full Disk Access

**Files still in Downloads?**
- Run manually to test: `bash move-diary-entries.sh`
- Check for error messages and follow the troubleshooting steps above
