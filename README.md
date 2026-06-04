# ✨ Sailor Stellaras magisches Universum

Eine magische, statische Fan-Geburtstagswebsite für Sofia – die auserwählte Sailor Stellara.

---

## 🚀 So öffnest du die Website

### Methode 1 – Direkt öffnen (einfachste Methode)

Doppelklicke auf `index.html`.  
Die Website öffnet sich in deinem Standard-Browser.

> **Hinweis:** Beim direkten Öffnen mit `file://` funktioniert alles ausgenommen YouTube-Links (die öffnen sich im Browser). Alle Inhalte, der Generator, das Tagebuch und die Galerie funktionieren vollständig offline.

### Methode 2 – VS Code Live Server (empfohlen für Entwicklung)

1. Öffne den Ordner `sailor-stellara-universe/` in VS Code.
2. Installiere die Erweiterung **Live Server** (Ritwick Dey).
3. Rechtsklick auf `index.html` → **Open with Live Server**.
4. Die Website öffnet sich automatisch im Browser.

### Methode 3 – Python Webserver

```bash
cd sailor-stellara-universe/
python3 -m http.server 8080
```
Dann `http://localhost:8080` im Browser öffnen.

---

## 📁 Projektstruktur

```
sailor-stellara-universe/
  index.html              ← Hauptseite – hier starten
  css/
    styles.css            ← Alle Stile, Animationen, Farben
  js/
    data.js               ← Alle Inhalte (Charaktere, Lieder, Vokabeln)
    app.js                ← Interaktionslogik
  content/
    characters.json       ← Charakterdaten (Referenz)
    seasons.json          ← Staffeldaten (Referenz)
    songs.json            ← Liederdaten (Referenz)
    japanese.json         ← Japanisch-Karten (Referenz)
  assets/
    planets/               ← Lokale NASA/Wikimedia-Planetenbilder
    README.md             ← Hinweise zu eigenen Bildern
  README.md               ← Diese Datei
```

---

## ✏️ Inhalte anpassen

### Charakter-Karten bearbeiten
Öffne `js/data.js` und suche nach `CHARACTERS_DATA`.  
Jeder Charakter hat diese Felder:
- `name` – Sailor-Name
- `realName` – Echter Name
- `personality` – Persönlichkeitsbeschreibung
- `funFact` – Interessanter Fakt
- `lesson` – Lebensmotto

### Japanisch-Vokabeln hinzufügen
Suche in `js/data.js` nach `JAPANESE_DATA` und füge neue Einträge hinzu:
```javascript
{ id: 31, japanese: "桜", romaji: "Sakura", german: "Kirschblüte",
  pronunciationHint: "Sa-ku-ra", category: "Natur", emoji: "🌸" }
```

### YouTube-Links hinzufügen
In `js/data.js` findest du `SONGS_DATA`. Ändere das Feld `youtubeSearchHint`
zu einem direkten YouTube-Link (z.B. `https://www.youtube.com/watch?v=...`).
Dann passe in `app.js` die Funktion `songCard()` entsprechend an.

---

## 💾 Lokale Speicherung & Backup

Das Mondtagebuch, die Kunstgalerie und gespeicherte Sailor-Stellara-Profile werden im Browser-`localStorage` gespeichert.

- **Kapazität:** Ca. 5 MB – ausreichend für Tagebucheinträge und einige Bilder.
- **Löschen:** Browsereinstellungen → Websitedaten löschen → `index.html`-Herkunft
- **Backup:** Im Mondtagebuch gibt es **Sichern (Export)** und **Wiederherstellen (Import)**. Der Export lädt eine JSON-Datei mit Profilen, Tagebuch und Galerie herunter. Beim Import werden vorhandene Daten zusammengeführt; doppelte IDs werden übersprungen.
- **Automatische Downloads:** Sobald ein Tagebucheintrag gespeichert wird, erzeugt das System automatisch eine Backup-Datei in deinem **Downloads**-Ordner.

### ⚠️ WICHTIG: Tagebuch-Backups gehören NICHT in dieses Repository

Dieses Projekt wird über **GitHub Pages öffentlich** veröffentlicht. Alles, was in diesem
Ordner liegt und committet wird, ist **für jeden im Internet sichtbar**.

Sofias Tagebucheinträge sind **privat**. Lege Backup-Dateien (`sailor-stellara-autosave-*.json`,
`sailor-stellara-backup-*.json`) deshalb **niemals** in diesem Projektordner ab und committe sie nicht.

- Eine `.gitignore` schützt den Ordner `diary_entries/` und alle Backup-Dateien zusätzlich automatisch.
- Bewahre Tagebuch-Backups an einem **privaten** Ort außerhalb des Repositorys auf, z. B.:
  `Sailor_Moon/sailor-stellara-private-diary-backup/`
- Die langfristige Lösung (private, geräteübergreifende Synchronisation) ist in
  `PRDs/PRD_Diary_Privacy_CrossDevice.md` beschrieben.

### Manuelles Backup-Verfahren (privat aufbewahren)

1. Schreibe und speichere den Eintrag im Mondtagebuch.
2. Der Browser lädt automatisch eine Datei mit Namen `sailor-stellara-autosave-YYYY-MM-DD.json` herunter.
3. Öffne deinen **Downloads**-Ordner.
4. Verschiebe die Datei in deinen **privaten** Backup-Ordner *außerhalb* dieses Repositorys
   (z. B. `Sailor_Moon/sailor-stellara-private-diary-backup/`) — **nicht** nach `diary_entries/`.

---

## 🔒 Copyright-Sicherheit

Diese Website:
- ✅ Verwendet keine offiziellen Anime-Bilder oder Screenshots
- ✅ Enthält keine vollständigen Liedtexte (nur kurze Titel-Beispiele)
- ✅ Verlinkt YouTube nur über Suchanfragen (keine eingebetteten Videos)
- ✅ Erhebt keinen Anspruch auf offizielle Zugehörigkeit
- ✅ Ist vollständig privat und nicht-kommerziell

---

## 🌙 Abschnitte der Website

| Abschnitt | Inhalt |
|-----------|--------|
| ⭐ Sailor Stellara | Sofias eigenes Sailor-Profil + zufälliger Generator |
| 💫 Charakterlexikon | Charakterkarten mit Bio, Stärken und Fakten |
| 🪐 Planeten des Universums | Planetenbilder, Sailor-Zuordnung und Sternzeichen |
| 📖 Abenteuerpfad | Staffel 1 bis SuperS – Kurzübersichten |
| 🎵 Musikzimmer | 6 ikonische Lieder mit Sprachbeispielen |
| 🌸 Japanisch lernen | 30 Vokabelkarten + interaktives Quiz |
| 🦄 Pegasus Traumwelt | Prophezeiungs-Generator |
| 🎨 Kunstgalerie | Bild-Upload (localStorage) |
| 📔 Mondtagebuch | Tagebuch mit Einträgen |
| 🏆 Auszeichnungen | 5 freischaltbare Abzeichen |
| 🎂 Geburtstagsüberraschung | Geheimer Brief von Pegasus (nach 3 Abzeichen) |
