# IMPLEMENTATION_PLAN.md – Sofia's Sailor Stellara Universe

## Goal

Build the PRD as a polished static website that can run locally in the browser.

Prioritize a beautiful birthday-ready MVP over technical complexity.
Language should only be in German.

---

# 1. Project Structure

Create:

```text
sailor-stellara-universe/
  index.html
  css/
    styles.css
  js/
    app.js
    data.js
  assets/
    README.md
  content/
    characters.json
    seasons.json
    japanese.json
    songs.json
  README.md
```

---

# 2. Build Rules

Use only:

* HTML
* CSS
* vanilla JavaScript
* localStorage

Do not use:

* backend
* database
* login
* API keys
* copyrighted images
* full copyrighted lyrics

---

# 3. Main Sections

Build these sections in this order:

1. Magical birthday homepage
2. Sailor Stellara reveal
3. Character encyclopedia
4. Story adventure up to SuperS
5. Music room
6. Japanese learning cards
7. Pegasus dream generator
8. Art gallery
9. Moon diary
10. Achievements
11. Birthday letter

---

# 4. Content Files

## characters.json

Include child-friendly entries for:

* Sailor Moon
* Sailor Mercury
* Sailor Mars
* Sailor Jupiter
* Sailor Venus
* Tuxedo Mask
* Chibiusa
* Luna
* Artemis
* Pegasus

Each character:

```json
{
  "name": "",
  "role": "",
  "personality": "",
  "strengths": [],
  "funFact": "",
  "lesson": ""
}
```

---

## seasons.json

Include:

* Season 1
* Sailor Moon R
* Sailor Moon S
* Sailor Moon SuperS

No Sailor Stars spoilers.

Each season:

```json
{
  "title": "",
  "shortSummary": "",
  "newFriends": [],
  "mainChallenge": "",
  "lesson": ""
}
```

---

## songs.json

Include placeholders for songs.

For each song:

```json
{
  "title": "",
  "season": "",
  "type": "Opening or Ending",
  "youtubeSearchHint": "",
  "officialLinkPlaceholder": "",
  "safeExcerpt": {
    "japanese": "",
    "romaji": "",
    "german": "",
    "pronunciationHint": ""
  }
}
```

Important: do not include full lyrics.

---

## japanese.json

Include simple learning cards:

```json
{
  "japanese": "",
  "romaji": "",
  "german": "",
  "pronunciationHint": "",
  "category": ""
}
```

Categories:

* Begrüßung
* Mond
* Freundschaft
* Mut
* Musik
* Magie

---

# 5. Visual Design

Use:

* animated stars
* moon gradient
* sparkle effects
* card layout
* soft rounded corners
* pastel colors
* large readable font
* mobile-friendly layout

Avoid:

* clutter
* dark scary effects
* tiny text

---

# 6. Interactions

## Sailor Stellara Generator

Randomly combine:

* magical powers
* missions
* companion animals
* crystals
* transformation phrases

Example output:

"Du bist Sailor Stellara, Hüterin des Sternenlichts. Deine Mission ist es, Träume zu beschützen."

---

## Art Gallery

Allow local image upload.

Store images in localStorage if feasible.

If storage is too large, show uploaded image for session only.

---

## Moon Diary

Save entries to localStorage.

Allow:

* add entry
* view previous entries
* delete entry

---

## Achievements

Unlock achievements when:

* first visit homepage
* open character section
* generate Stellara profile
* open Japanese section
* create diary entry

Store achievement state in localStorage.

---

# 7. Copyright Safety

Add visible footer:

"Dies ist eine private, nicht-kommerzielle Fan-Geburtstagsseite. Sie nutzt keine offiziellen Bilder oder vollständigen Liedtexte."

Implementation rules:

* no full lyrics
* no screenshots
* no copied artwork
* no embedded videos unless links only
* no claim of official affiliation

---

# 8. README

Include:

* how to open locally
* how to run with VS Code Live Server
* how to edit content JSON files
* how to add YouTube links manually
* copyright safety notes

---

# 9. Acceptance Criteria

The site should:

* open via index.html
* work without internet except external links
* look good on laptop and tablet
* include all main sections
* persist diary and achievements locally
* avoid copyright risks
* feel magical and personal for Sofia

---

# 10. Execution Instruction for Claude Code

After reading this file and the PRD:

1. Create the full folder structure.
2. Implement the complete static website.
3. Populate JSON files with safe starter content.
4. Do not ask follow-up questions unless blocked.
5. Make reasonable assumptions.
6. Prioritize birthday-ready completeness.
7. After implementation, provide:

   * summary of created files
   * how to run locally
   * what still needs manual polishing
