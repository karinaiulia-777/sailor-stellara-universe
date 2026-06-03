# PRD – Saved Profiles, Persistent Journal & "Planeten des Universums"

**Project:** Sailor Stellara Universe (static, offline `file://` website, Vanilla JS)
**Author:** Carina
**Date:** 2026-06-01
**Build environment:** Claude Code in VS Code
**Status:** Ready for implementation

---

## 1. Background & Goals

`sailor-stellara-universe/` is a static, fully offline (`file://`) birthday fan-site for Sofia. This PRD covers three pieces of work:

1. **Save Sailor Stellara profiles.** The "✨ Neues Profil generieren ✨" button currently generates a random profile (power, mission, companion, crystal, attack, transformation phrase) but never saves it. Sofia should be able to save favourite profiles **with an auto date and a name she chooses**, view them later, and **export/import** them.
2. **Persistent journal (Mondtagebuch).** Entries must be reliably saved and also **exportable/importable** so they survive browser-data clearing and can move between devices/browsers.
3. **New section "Planeten des Universums".** A planet gallery mapping each Sailor (all seasons) to her planet, with a real planet image, a kid-friendly description (9-year-old reading level), and the planet's corresponding zodiac sign.

### Important finding about the journal
The journal **already persists** to `localStorage` (`saveDiaryToStorage()` / `loadDiary()`, key `stellara_diary`). Entries survive browser restarts. If they ever appeared to vanish, the cause is almost certainly a different browser/profile, incognito mode, or cleared site data. The genuinely new requirement is therefore **export/import** (a portable backup), plus hardening — not a rewrite of journal storage.

---

## 2. Confirmed decisions

| Topic | Decision |
|-------|----------|
| Persistence model | `localStorage` **plus JSON export/import** for both profiles **and** journal (and gallery, if low-effort). |
| Profile naming | Auto date + Sofia-entered custom name. |
| Saved-profiles location | Listed directly below the generator in the Sailor Stellara section. |
| New section name | **"Planeten des Universums"** (German UI). |
| Planet content | Real planet image + kid-friendly description + corresponding zodiac sign. No weight calculator. |
| Planet scope | All Sailors from all seasons, including the outer Sailors (Uranus, Neptune, Pluto, Saturn). |
| Planet images | Bundle locally so it always works offline; download public-domain (NASA) images into `assets/`. |

---

## 3. Scope

### In scope
- Save / list / view / delete generated profiles (auto date + custom name), persisted in `localStorage`.
- Export and import of profiles and journal entries as a downloadable / uploadable JSON file (offline-capable).
- Verify and harden journal persistence.
- New "Planeten des Universums" navigation section with images, descriptions, zodiac signs, Sailor mapping.
- Bundle public-domain planet images into `assets/`.

### Out of scope
- Backend, accounts, cloud sync, automatic device-to-device sync.
- Editing existing entries/profiles (create, view, delete only).
- A weight-on-planets calculator.
- Changes to unrelated sections (quiz, music, etc.).

---

## 4. Functional Requirements

### 4.1 Save profiles (Sailor Stellara)

**F1 — Save controls appear after generation.** After `generateStellara()`, render a name input + "💾 Save this profile" button below the generated card. Nothing shown before a profile is generated.

**F2 — Name entry.** Required text field, placeholder e.g. "z. B. Mond-Kämpferin", max ~40 chars. Saving with an empty name shows a friendly German message ("Bitte gib deinem Profil zuerst einen Namen! 🌙") and does not save.

**F3 — Automatic date.** On save, set the current date using the same format as the journal: `toLocaleDateString('de-DE', { weekday:'long', year:'numeric', month:'long', day:'numeric' })`.

**F4 — Profile data model.** Save exactly the generated values (no re-rolling on save). Hold the current generated values in `STATE.currentProfile`:
```js
{ id: Date.now().toString(), name, date,
  power, mission,
  companion: { name, description },
  crystal:   { name, power },
  attack, phrase }
```

**F5 — Persistence.** Store profiles in `localStorage` key `stellara_profiles` (JSON array); load into `STATE.profiles` in `init()` via `loadProfiles()` (mirror `loadDiary`/`saveDiaryToStorage`).

**F6 — Saved-profiles list.** Below the generator, render "📁 Meine gespeicherten Profile (N)", newest first, each card showing name, date, and all profile values. Empty state: "Noch keine Profile gespeichert. Generiere eins und gib ihm einen Namen! ✨". The list shows on every entry to the section (from `STATE.profiles`), not only right after generating.

**F7 — Delete profile.** "🗑️ Löschen" per card removes it from `STATE.profiles` and `localStorage` and refreshes the list and count.

**F8 — Save feedback.** On success: confirmation (reuse existing toast system if present, else inline message), clear the name field, refresh the list.

**F9 — Achievement (optional).** Optionally unlock "Erstes Profil gespeichert" via the existing `unlockAchievement()`, only if trivially added.

### 4.2 Export / Import (profiles + journal)

**F10 — Export.** A "⬇️ Sichern (Export)" button generates a JSON file and triggers a download using a Blob + object URL (works offline; no server). The file contains a versioned bundle:
```js
{ app: "sailor-stellara", version: 1, exportedAt: "<ISO date>",
  profiles: [...], diary: [...], gallery: [...] }
```
Suggested filename: `sailor-stellara-backup-YYYY-MM-DD.json`.

**F11 — Import.** A "⬆️ Wiederherstellen (Import)" button opens a hidden `<input type="file" accept="application/json">`. On file selection, read via `FileReader`, `JSON.parse`, validate the `app`/`version` fields, then **merge** into existing data, de-duplicating by `id` (imported items with new ids are added; matching ids are skipped or overwrite — pick "skip duplicates" for safety). Save to `localStorage` and re-render affected sections.

**F12 — Import safety.** Invalid/corrupt files show a friendly German error and change nothing. Confirm before import with a short note that it merges with existing data.

**F13 — Placement.** Export/import controls live in a small "💾 Sichern & Wiederherstellen" panel. Place it where it's discoverable for a parent — recommended in the journal section and/or a small footer area. One shared panel can back up everything (profiles + diary + gallery).

### 4.3 Journal persistence (verify + harden)

**F14 — Verify.** Confirm create → reload → entry still present (code already does this).
**F15 — Harden.** Wrap `loadDiary`, `loadGallery`, `loadProfiles` in `try/catch` (fallback to empty array); catch `QuotaExceededError` on save with a friendly German message.
**F16 — No regression.** Existing journal create/view/delete and the `diary_written` achievement keep working.

### 4.4 New section "Planeten des Universums"

**F17 — Navigation.** Add a sidebar entry (e.g. "🪐 Planeten des Universums") and a corresponding `section-planets` container, following the existing section-rendering pattern (`render…()` switch in the router around the existing `case 'diary'` etc.).

**F18 — Content.** One card per planet, each showing: real planet image (local), German name, the Sailor it belongs to, a 2–4 sentence kid-friendly German description (9-year-old level), and the corresponding zodiac sign (with its symbol/emoji). Data stored in a new `PLANETS_DATA` array in `js/data.js` (consistent with `CHARACTERS_DATA` etc.).

**F19 — Planet ↔ Sailor ↔ zodiac mapping** (build the descriptions kid-friendly; zodiac per traditional rulership):

| Planet (DE) | Sailor | Real name | Zodiac sign (DE) |
|-------------|--------|-----------|------------------|
| Mond | Sailor Moon | Usagi Tsukino | Krebs ♋ |
| Merkur | Sailor Mercury | Ami Mizuno | Zwillinge ♊ / Jungfrau ♍ |
| Venus | Sailor Venus | Minako Aino | Stier ♉ / Waage ♎ |
| Erde | Tuxedo Mask | Mamoru Chiba | — (Heimatplanet) |
| Mars | Sailor Mars | Rei Hino | Widder ♈ / Skorpion ♏ |
| Jupiter | Sailor Jupiter | Makoto Kino | Schütze ♐ / Fische ♓ |
| Saturn | Sailor Saturn | Hotaru Tomoe | Steinbock ♑ / Wassermann ♒ |
| Uranus | Sailor Uranus | Haruka Tenoh | Wassermann ♒ |
| Neptun | Sailor Neptune | Michiru Kaioh | Fische ♓ |
| Pluto | Sailor Pluto | Setsuna Meioh | Skorpion ♏ |

(Optional: include Chibiusa/Sailor Chibi Moon under Mond as "kleine Mondkriegerin".)

**F20 — Images (offline-safe).** Download public-domain NASA imagery into `assets/planets/` (e.g. `merkur.jpg`, `venus.jpg`, …) and reference by relative path so they load under `file://`. Each image must have an `alt` text in German. If a build step cannot fetch an image, fall back to a CSS/emoji placeholder so the card still renders. Recommended public-domain sources: NASA/JPL planetary photojournal and Wikimedia Commons public-domain NASA images. Keep file sizes reasonable (resize to ~600px wide).

**F21 — Style.** Reuse existing card grid styling (like `characters-grid` / character cards) for a consistent look; add minimal new CSS only if needed.

---

## 5. Non-functional requirements

- **Offline:** Must still run by double-clicking `index.html` (`file://`). No `fetch()` at runtime, no new runtime dependencies. Export/import uses Blob/FileReader (offline-safe). All planet images bundled locally.
- **Language:** Entire UI in German.
- **Style/consistency:** Reuse existing classes (`.btn`, `.btn-gold`, `.btn-primary`, `.btn-danger`, card grids) and the pink/gold/violet rounded-card look. Vanilla JS, same load/save/render/delete pattern as `diary`/`gallery`.
- **Responsive & kid-friendly:** Works on desktop, tablet, mobile; large buttons, clear labels, friendly emojis.
- **Copyright-safe:** Only public-domain planet images (NASA); no anime screenshots; consistent with the project's existing copyright stance.

---

## 6. Technical implementation notes

**Files affected:** `js/app.js` (logic, router, new section render + save/export/import), `js/data.js` (`PLANETS_DATA`), `css/styles.css` (only if new styles needed), `index.html` (sidebar nav entry + `section-planets`), `assets/planets/` (new images), `README.md` (document export/import + new section).

**app.js changes:**
1. `STATE`: add `profiles: []`, `currentProfile: null`.
2. `init()`: `STATE.profiles = loadProfiles();`.
3. `generateStellara()`: store values in `STATE.currentProfile`; render save block + profiles list; call `renderSavedProfiles()`.
4. New functions (mirror diary pattern): `saveCurrentProfile()`, `renderSavedProfiles()`, `deleteProfile(id)`, `loadProfiles()`, `saveProfilesToStorage()`.
5. Export/import: `exportData()` (Blob + temporary `<a download>`), `importData(file)` (FileReader + JSON.parse + validation + merge by id). Expose handlers globally per existing convention.
6. Router: add `case 'planets': renderPlanets(); break;` and `renderPlanets()` reading `PLANETS_DATA`.
7. Robustness: `try/catch` in all `load*` functions; handle `QuotaExceededError` in `save*`.

**Image sourcing (build step in Claude Code):** download public-domain NASA planet images, resize to ~600px, save to `assets/planets/` with predictable filenames matching `PLANETS_DATA`. Provide alt text. Fall back to emoji/CSS gradient placeholder per planet if a download fails.

---

## 7. Acceptance criteria

1. After "Neues Profil generieren", a name field + Save button appear; saving without a name warns and does not save.
2. Saving with a name adds the profile (correct name + auto date) to "Meine gespeicherten Profile" immediately.
3. Reloading the page (including via `file://` double-click) keeps saved profiles and journal entries.
4. Switching sections and back keeps saved profiles visible.
5. Delete removes a profile/entry permanently and updates counts.
6. Export downloads a JSON backup containing profiles + diary (+ gallery); Import reads that file, merges without duplicates, and re-renders.
7. Import of an invalid file shows a friendly error and changes nothing.
8. Journal: create → reload → entry persists (verified).
9. "Planeten des Universums" appears in the nav and shows a card per planet with a local image, German kid-friendly description, Sailor mapping, and zodiac sign — all loading offline.
10. Everything works offline, fully in German, in the existing design; corrupt `localStorage` does not crash the app.

---

## 8. Test plan

- **Profiles:** generate → name → save → reload → verify; delete → verify; many profiles; section switch.
- **Export/Import:** export, clear `localStorage` (DevTools), import the file, confirm data restored; import garbage file → friendly error; import duplicates → no doubling.
- **Journal:** create/delete/reload regression.
- **Planets:** open offline (no network) → all images load from `assets/`; check alt text, descriptions, zodiac signs, mobile layout.
- **Robustness:** inject invalid JSON into `localStorage` → app still starts.
- **Browsers:** Chrome + Safari, desktop + mobile view.

---

## 9. Open points

- Cap on number of saved profiles? (Recommendation: none.)
- Optional "profile saved" achievement (F9) — include or not.
- Include Chibiusa/Sailor Chibi Moon as a sub-card under Mond? (Recommendation: yes, optional.)
- Import behaviour on id collision: skip duplicates (recommended) vs overwrite.
