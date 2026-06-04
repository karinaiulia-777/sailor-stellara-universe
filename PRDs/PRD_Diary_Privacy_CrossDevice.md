# 🌙 Sailor Stellara Universe — Diary Privacy & Cross-Device Architecture PRD

**Author:** Engineering analysis for Karina (parent/owner)
**Date:** 2026-06-04
**Status:** Proposal — Phase 0 (leak prevention) executed; Phases 1–4 not yet implemented
**Scope:** Make the Mondtagebuch (diary) private and reliably cross-device, while keeping the rest of the universe public on GitHub Pages and keeping it feeling like one magical world for Sofia.

---

## 1. Architecture Assessment (Current State)

### 1.1 What the project is
A fully **static** HTML/CSS/JS site — no build step, no server, no framework.

| Layer | Implementation |
|---|---|
| Markup | Single `index.html` — one page, 11 `<section>` shells filled by JS |
| Logic | `js/app.js` (1,587 lines) — renders every section, handles state |
| Static content | `js/data.js` (characters, songs, vocab) + reference copies in `content/` |
| Styling | `css/styles.css` (2,064 lines) |
| Images | `assets/planets/` (local files) |
| Deploy | GitHub Pages, repo `github.com/karinaiulia-777/sailor-stellara-universe` (public) |

The diary is **section #9** of the same single page — `<section id="section-diary">`, nav link `data-section="diary"`. It is structurally *inside* the universe, which is exactly the experience to preserve.

### 1.2 How the diary works today
- **Render/save:** `renderDiary()` → `saveDiaryEntry()` (`js/app.js:1019`). An entry is `{id, date, learn, watch, feel, char, extra}`.
- **Storage (primary):** `localStorage` key `stellara_diary` (`js/app.js:1419`, `:1426`).
- **Storage (mirror):** IndexedDB `stellara-backup` store, written on every save (`js/app.js:1496`) — same-device redundancy, not sync.
- **"Backup":** once per day, on save/load, the app **auto-downloads** `sailor-stellara-autosave-YYYY-MM-DD.json` to the device's Downloads (`js/app.js:1510`). `exportData()`/`importData()` provide manual export and merge-import (`js/app.js:1062`, `:1088`).
- **Re-ingestion into the repo:** `move-diary-entries.sh` + `AUTOMATION_SETUP.md` describe a macOS cron job that moves those downloaded JSON files into `diary_entries/`.

### 1.3 The two structural facts that drive everything

**Fact A — The diary files in the repo are *dead data*.** There is **no `fetch`, no XHR, nothing that loads `diary_entries/*.json`** back into the app. `loadDiary()` reads *only* `localStorage`. The JSON files in `diary_entries/` and `archive/diary_entries_archive/` are write-only archives the app never reads.

**Fact B — Cross-device sync does not exist today.** An entry created on the iPad lives in *that iPad's Safari localStorage* and will never appear on the Mac. The only "transfer" is: iPad downloads a JSON → manually move it → manually re-import on the Mac. For a 9-year-old this is effectively non-functional, and iOS Safari localStorage is routinely **evicted after ~7 days of non-use** (Apple ITP), so entries can silently vanish even on the same device.

### 1.4 Git / deployment reality (pre-Phase 0)
- Tracked files did **not** include real diary content — only `diary_entries/README.md` was committed.
- The actual entry file `diary_entries/2026-06-01_03_Eintrag.json` and `archive/diary_entries_archive/` were **untracked**.
- There was **no `.gitignore`**.
- That untracked file contains **real, personal child content** — feelings, what she watched, hopes about her birthday and family.

The leak had **not** happened, but the *documented workflow actively steered toward it*: the README and automation script instructed dropping these JSON files into a folder inside a public-Pages repo with no ignore rule. The next `git add .` would have published Sofia's diary to the public internet permanently.

---

## 2. Threat / Risk Assessment

| # | Risk | Likelihood | Impact | Notes |
|---|---|---|---|---|
| **R1** | Personal diary content committed & pushed to public repo | **High** (workflow led here; no `.gitignore`) | **Severe** | Public Git history is forever — a later delete still leaves it in history, forks, caches. #1 risk. |
| R2 | Any "password" in client JS is cosmetic | High if attempted | High | GH Pages serves raw source; `view-source` + raw file URL bypass any JS gate. Client-side auth cannot protect data in a public repo. |
| R3 | Data loss on iPad (ITP 7-day eviction, "Clear History", private mode) | High over time | High | Entries silently disappear; only recovery is a downloaded file the child can't manage. |
| R4 | No real cross-device path | Certain (by design) | High | Breaks the core desired experience. |
| R5 | Auto-download backup unusable on iPad | High | Medium | iOS Files is not child-navigable; cron move-script only runs on the Mac. |
| R6 | Search-engine indexing of leaked content | Medium (if R1) | Severe | Child's name + reflections become searchable. |
| R7 | Vendor lock-in / single account loss | Low | Medium | Mitigated by exportable, open backend + scheduled JSON export. |

**Core security truth:** *Privacy on GitHub Pages is impossible at the data layer.* GH Pages = world-readable static files, no server, no secrets, no auth. The only way to make the diary private is to keep diary data **off GitHub Pages entirely**, behind a backend that enforces access **server-side**. Everything else is theater.

---

## 3. Solution Options (compared)

Legend: ✅ good · ⚠️ partial/caveat · ❌ poor

| Option | Cross-device | Durability | Real privacy | Child UX | Offline | Maintenance | Cost | GH Pages compatible | Scalable |
|---|---|---|---|---|---|---|---|---|---|
| A. Local-only (current + IndexedDB) | ❌ | ⚠️ (ITP) | ⚠️ (private *if* never committed) | ✅ | ✅ | ✅ | Free | ✅ | ❌ |
| B. Client-side password on GH Pages | ❌ | ⚠️ | ❌ **fake** (R2) | ✅ | ✅ | ✅ | Free | ✅ | ❌ |
| C. Private GitHub repo as storage (API + token) | ⚠️ | ✅ | ❌ (token in public JS leaks) | ❌ | ⚠️ | ⚠️ | Free | ⚠️ | ❌ |
| D. Custom private backend (own server/DB) | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ (host/patch/monitor) | $ (VPS) | ✅ | ✅ |
| E1. Supabase (Postgres + Auth + RLS) | ✅ | ✅ | ✅ (server-side RLS) | ✅ | ✅ (cache) | ✅ (managed) | Free tier | ✅ | ✅ |
| E2. Firebase (Firestore + Auth) | ✅ | ✅ | ✅ (security rules) | ✅ | ✅ (built-in) | ✅ (managed) | Free tier | ✅ | ✅ |
| F. Cloud file storage (Drive/iCloud API) | ✅ | ✅ | ✅ | ❌ (OAuth hard for child) | ⚠️ | ⚠️ | Free | ⚠️ | ⚠️ |
| **G. Hybrid: public site on Pages + managed BaaS for diary + soft in-universe gate** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Free | ✅ | ✅ |

**Why the losers lose:**
- **A/B** never achieve cross-device or real privacy. B is dangerous because it *feels* secure but isn't.
- **C** needs a write-capable GitHub token; in a static public site that token is readable by anyone → instant compromise. You also can't serve a private repo via public Pages.
- **D** solves it but makes you a sysadmin (uptime, patching, backups, TLS) for a child's diary — wrong cost/benefit.
- **F** is private but the OAuth consent + file-picker UX is hostile to a 9-year-old and clunky for per-entry writes.

---

## 4. Recommendation

### Adopt **Option G (Hybrid)**, implemented with **Supabase** as the backend.

**The shape:**
1. **Public universe stays exactly where it is** — GitHub Pages, free, unchanged.
2. **The diary section stays *visually and navigationally* part of the universe** (same sidebar link, same magical styling) but its data lives in **Supabase**, never in the repo.
3. **A child-friendly "magic key" gate** (themed login — e.g. "Gib dein Sternenpasswort ein, Sailor Stellara ✨") authenticates the family to Supabase. Privacy is enforced by **Row Level Security on the server**, so reading all the public JS yields *nothing* without valid credentials. The gate is in-universe, not a jarring corporate login.
4. **Offline-friendly:** keep localStorage/IndexedDB as a read cache + offline draft buffer; sync to Supabase when online.
5. **Parent control preserved & improved:** the existing JSON export/import stays as manual backup/migration, plus a scheduled export to a location you own.

### Why Supabase (primary) vs Firebase (runner-up)

| | **Supabase (recommended)** | Firebase (alternative) |
|---|---|---|
| Privacy model | Postgres **Row Level Security** — clean "only family rows" rule | Security Rules (also solid) |
| Export / migration | **Trivial** — SQL/JSON/CSV; plain Postgres you own | Possible, more Google-shaped |
| Lock-in | Low — open-source, self-hostable later | Higher (proprietary) |
| Offline-first | Good (cache pattern) | **Excellent** (built-in) |
| Setup simplicity | Simple | Slightly simpler real-time |
| Cost at family scale | Free tier ample | Free tier ample |

Both are correct, free, and managed. **Supabase** is recommended because the requirement *"parent should be able to review, back up, export, or migrate"* is exactly where Supabase's plain-Postgres, open-source nature wins. Firebase is a fine substitute (Google lock-in, best-in-class offline) with no change to this architecture.

---

## 5. Implementation Roadmap

### 🔴 Phase 0 — Stop the leak (DONE 2026-06-04)
1. ✅ Add `.gitignore` excluding `diary_entries/*.json`, `archive/diary_entries_archive/`, `*autosave*.json`, `sailor-stellara-backup-*.json`, `.DS_Store`.
2. ✅ Verify no real diary content is tracked.
3. ✅ Confirm history is clean (only "Initial public" + 2 fixes — no diary content).
4. ✅ Move local archive JSON files out of the repo tree to an owner-controlled backup folder.
5. ✅ Update `README.md` and `AUTOMATION_SETUP.md` so they no longer instruct dropping diary JSON into the repo.

### 🟡 Phase 1 — Backend foundation (~half day)
1. Create a Supabase project (free).
2. Table `diary_entries(id, family_id, date, learn, watch, feel, char, extra, created_at, updated_at)`.
3. Enable Auth (email/password; one shared family account is acceptable and simplest).
4. Write RLS policy: a row is readable/writable only by authenticated members of its `family_id`; anonymous = zero access.
5. Test that unauthenticated reads return nothing.

### 🟢 Phase 2 — Wire the diary section to the backend (~1 day)
1. Add the Supabase JS client via CDN script (no build step — fits the static model).
2. Add the in-universe **"magic key" gate** in front of the diary section only; remember the session.
3. Replace `saveDiaryEntry()` / `loadDiary()` data calls with Supabase read/write, keeping localStorage/IndexedDB as an offline cache + draft buffer (write-through).
4. Keep rendering, achievements (`diary_written`), and styling untouched.

### 🟢 Phase 3 — Backup, recovery, parent tools (~half day)
1. Keep `exportData()` / `importData()` working against the live backend (one-click JSON you own).
2. Add a scheduled export (Supabase scheduled function *or* a tiny GitHub Action with a **secret** service key writing to a **private** location — never the public repo).
3. Document the restore path.

### 🔵 Phase 4 — Verify (~half day)
1. **Cross-device:** write on iPad → appears on Mac (and vice versa).
2. **Privacy:** logged-out + `view-source` + raw asset URLs → zero diary data reachable.
3. **Durability:** clear iPad Safari data → entries reload from backend after login.
4. **Offline:** airplane mode → write draft → reconnect → syncs.
5. **Child UX:** Sofia logs in with the "magic key" and writes an entry unaided.

---

## 6. Product Requirements (PRD proper)

### 6.1 Problem
The diary is part of a public GitHub Pages site, contains a child's personal reflections, is at imminent risk of being published to a public repo, fails to sync across the family's iPad and Mac, and is prone to silent local data loss.

### 6.2 Goals
- **G1** Diary content is private — unreachable by the public, enforced server-side.
- **G2** Entries persist and sync across iPad ↔ Mac and across sessions.
- **G3** Data is durable (survives browser-cache clears / ITP eviction).
- **G4** The diary still *feels* like part of the universe — same world, seamless navigation, magical theming; no "separate app" feeling.
- **G5** Public educational content stays free on GitHub Pages, unchanged.
- **G6** The parent can review, back up, export, and migrate all entries.
- **G7** Low operational complexity — no servers to run or patch.

### 6.3 Non-goals
- Multi-tenant / users beyond the family.
- Rich media (photos) in the diary in v1 — text fields only.
- Migrating the public sections to a backend.

### 6.4 Functional requirements
- **F1** Diary read/write goes through an authenticated backend (Supabase) with RLS.
- **F2** An in-universe, child-friendly auth gate protects *only* the diary section; the rest stays open.
- **F3** Local cache provides offline drafting; writes sync when online.
- **F4** Existing entry schema (`date, learn, watch, feel, char, extra`) preserved; `created_at/updated_at` added.
- **F5** Manual JSON export/import retained; plus a scheduled owner-controlled export.
- **F6** Achievements, styling, navigation, and animations unchanged.

### 6.5 Non-functional requirements
- **N1 Privacy:** logged-out users and source-readers obtain zero diary data.
- **N2 Cost:** $0 at family scale (free tiers).
- **N3 Maintenance:** managed backend only; no self-hosted server.
- **N4 Portability:** data exportable as plain JSON/SQL; no hard lock-in.
- **N5 Performance:** diary load/save feel instant on iPad (local cache + async sync).
- **N6 Child UX:** German, themed, single low-friction "magic key" login.

### 6.6 Success metrics
- Entry written on one device visible on the other within seconds (online).
- Zero diary bytes retrievable while logged out.
- Entries survive an iPad cache wipe.
- Parent can produce a full JSON export in one click anytime.

### 6.7 Key risks & mitigations
- **Imminent public commit (R1):** Phase 0 `.gitignore` + move archives out + doc fixes. *Done.*
- **Fake client-side security (R2):** mandate server-side RLS; client gate is UX only.
- **Vendor lock-in (R7):** Supabase (open, exportable) + scheduled JSON export you own.
- **Offline edge cases:** write-through local cache + sync-on-reconnect.

### 6.8 Open decisions
1. **Supabase (recommended) vs Firebase.**
2. **One shared family login** (simplest) **vs** separate logins for Sofia/parent.
3. Where the scheduled backup snapshot should land (private repo / cloud drive / local Mac).
