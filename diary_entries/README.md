# 📔 Mondtagebuch — Hinweis zur Privatsphäre

> ## ⚠️ Dieser Ordner darf KEINE echten Tagebucheinträge enthalten
>
> Dieses Projekt wird über **GitHub Pages öffentlich** veröffentlicht. Alles, was
> hier liegt und committet wird, ist **für jeden im Internet sichtbar**.
>
> Sofias Tagebucheinträge sind **privat** und gehören **nicht** in dieses Repository.
> Eine `.gitignore` ignoriert deshalb alle `*.json`-Dateien in diesem Ordner.

## Wo werden Einträge gespeichert?

- **Heute:** Im Browser (`localStorage`) auf dem jeweiligen Gerät. Backups werden als
  JSON heruntergeladen und sollten in einem **privaten Ordner außerhalb des Repos**
  aufbewahrt werden, z. B. `Sailor_Moon/sailor-stellara-private-diary-backup/`.
- **Geplant:** Eine private, geräteübergreifende Lösung (iPad ↔ Mac) mit echtem
  Backend-Schutz. Details: `PRDs/PRD_Diary_Privacy_CrossDevice.md`.

## Format eines Eintrags (Referenz)

```json
{
  "id": "entry_YYYY_MM_DD",
  "date": "Wochentag, Datum",
  "learn": "Was ich gelernt habe",
  "watch": "Was ich geschaut habe",
  "feel": "Wie ich mich fühle",
  "char": "Lieblingscharakter",
  "extra": "Weitere Gedanken",
  "savedAt": "Zeitstempel"
}
```

## Wiederherstellung

Backup-Dateien aus dem **privaten** Backup-Ordner können über **Backup Laden / Import**
im Mondtagebuch wieder eingespielt werden. Einträge **nicht** in diesen Repo-Ordner kopieren.
