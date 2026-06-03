/* ============================================================
   Sailor Stellara Universe – Application Logic
   ============================================================ */

// ─── State ──────────────────────────────────────────────────
const STATE = {
  currentSection: 'stellara',
  achievements: {},
  diary: [],
  gallery: [],
  profiles: [],
  currentProfile: null,
  quizState: null,
  currentJapaneseCategory: 'Begrüßung'
};

// ─── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  STATE.achievements = loadAchievements();
  STATE.diary        = loadDiary();
  STATE.gallery      = loadGallery();
  STATE.profiles     = loadProfiles();

  // Auto-backup system
  initIndexedDB();
  scheduleAutoBackup();

  createStarField();
  runWelcomeAnimation();
});

// ─── Star Field ──────────────────────────────────────────────
function createStarField() {
  const field = document.getElementById('starField');
  const count = Math.min(160, Math.floor(window.innerWidth * window.innerHeight / 6000));
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `top:${Math.random() * 100}%`,
      `left:${Math.random() * 100}%`,
      `--dur:${(Math.random() * 4 + 2).toFixed(1)}s`,
      `--delay:${(Math.random() * 4).toFixed(1)}s`
    ].join(';');
    field.appendChild(s);
  }
}

// ─── Welcome Animation ───────────────────────────────────────
const WELCOME_MESSAGES = [
  'Hallo Sofia. 🌙',
  'Der Mond hat dich gerufen.',
  'Eine neue Sailor-Kriegerin wurde auserwählt.',
  'Willkommen, Sailor Stellara. ✨'
];

function runWelcomeAnimation() {
  const moon       = document.getElementById('moon');
  const catMsg     = document.getElementById('catMessenger');
  const bubble     = document.getElementById('speechBubble');
  const btn        = document.getElementById('btnMission');
  let msgIndex     = 0;

  // Moon rises via CSS animation; after 2.5s make it pulse
  setTimeout(() => { moon.classList.add('risen'); }, 2500);

  // Cat appears at 2.6s
  setTimeout(() => { catMsg.classList.add('visible'); }, 2600);

  // Show messages in sequence
  function showNextMessage() {
    if (msgIndex >= WELCOME_MESSAGES.length) {
      // Show mission button
      setTimeout(() => {
        btn.classList.add('show');
        btn.style.display = 'inline-flex';
        btn.addEventListener('click', startMainApp, { once: true });
      }, 600);
      return;
    }
    bubble.style.opacity = '0';
    bubble.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      bubble.textContent = WELCOME_MESSAGES[msgIndex];
      bubble.style.opacity = '1';
      msgIndex++;
      setTimeout(showNextMessage, 1600);
    }, 400);
  }

  setTimeout(showNextMessage, 3000);
}

function startMainApp() {
  const welcome = document.getElementById('welcomeScreen');
  const app     = document.getElementById('mainApp');

  welcome.classList.add('fade-out');
  setTimeout(() => {
    welcome.style.display = 'none';
    app.style.display     = 'flex';
    app.classList.add('visible');
    document.getElementById('siteFooter').style.display = 'block';

    initNavigation();
    renderSection('stellara');
    unlockAchievement('first_visit');
  }, 800);
}

// ─── Navigation ──────────────────────────────────────────────
function initNavigation() {
  // Desktop nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.dataset.section;
      if (section) {
        showSection(section);
        closeSidebar();
      }
    });
  });

  // Mobile toggle
  const toggle  = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileBtn = document.getElementById('mobileMnuBtn');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  }

  if (toggle)    toggle.addEventListener('click', openSidebar);
  if (mobileBtn) mobileBtn.addEventListener('click', openSidebar);
  if (overlay)   overlay.addEventListener('click', closeSidebar);
}

function closeSidebar() {
  document.querySelector('.sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

function showSection(sectionId) {
  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === sectionId);
  });

  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  // Show target
  const target = document.getElementById('section-' + sectionId);
  if (target) {
    target.classList.add('active');
    STATE.currentSection = sectionId;
    renderSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function renderSection(id) {
  switch (id) {
    case 'stellara':    renderStellara();    break;
    case 'characters':  renderCharacters();  unlockAchievement('character_explorer'); break;
    case 'planets':     renderPlanets();     break;
    case 'story':       renderStory();       break;
    case 'music':       renderMusic();       break;
    case 'japanese':    renderJapanese();    unlockAchievement('japanese_learner'); break;
    case 'pegasus':     renderPegasus();     break;
    case 'gallery':     renderGallery();     break;
    case 'diary':       renderDiary();       break;
    case 'achievements': renderAchievements(); break;
    case 'birthday':    renderBirthday();    break;
  }
}

// ─── Section: Sailor Stellara ────────────────────────────────
function renderStellara() {
  const el = document.getElementById('section-stellara');
  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">⭐ Sailor Stellara</h1>
      <p class="section-subtitle">Das bist du, Sofia – auserwählt von den Sternen.</p>
    </div>

    <div class="stellara-hero">
      <div class="stellara-badge">✨ Offizielle Sailor-Kriegerin ✨</div>
      <div class="stellara-name">Sailor Stellara</div>
      <div class="stellara-real-name">Echter Name: Sofia</div>
      <p style="color:var(--text-soft);font-size:0.95rem;line-height:1.7;max-width:560px;margin:0 auto;">
        Du wurdest nicht zufällig auserwählt. Die Sterne haben dein Herz gesehen –
        deine Kreativität, deinen Mut und deine Freundlichkeit – und gewusst:
        <strong style="color:var(--moonlight)">Diese Person gehört zu den Sailor-Kriegerinnen.</strong>
      </p>
      <div class="stellara-stats">
        <div class="stellara-stat">
          <div class="stat-label">🌟 Wächter-Stern</div>
          <div class="stat-value">Stella Nova</div>
        </div>
        <div class="stellara-stat">
          <div class="stat-label">✨ Element</div>
          <div class="stat-value">Sternenlicht &amp; Träume</div>
        </div>
        <div class="stellara-stat">
          <div class="stat-label">💜 Kraft</div>
          <div class="stat-value">Sternenlicht-Magie</div>
        </div>
        <div class="stellara-stat">
          <div class="stat-label">🎯 Mission</div>
          <div class="stat-value">Mut &amp; Freundlichkeit verbreiten</div>
        </div>
        <div class="stellara-stat">
          <div class="stat-label">💎 Waffe</div>
          <div class="stat-value">Stella-Kristall-Stab</div>
        </div>
        <div class="stellara-stat">
          <div class="stat-label">⚔️ Angriff</div>
          <div class="stat-value">Stellara Sternenlicht Sturm!</div>
        </div>
      </div>
      <div class="transformation-box" style="margin-top:24px;">
        <div class="transformation-label">Verwandlungsruf</div>
        <div class="transformation-text">"Stellara Crystal Power!"</div>
      </div>
    </div>

    <div class="generator-section">
      <div class="generator-title">💫 Dein magisches Profil-Generator</div>
      <p class="generator-desc">
        Klicke auf den Button und erhalte eine neue magische Prophezeiung über deine Kräfte!
        Du kannst es so oft versuchen, wie du möchtest. ✨
      </p>
      <button class="btn btn-gold" id="generateBtn" onclick="generateStellara()">
        ✨ Neues Profil generieren ✨
      </button>
      <div id="generatedProfile"></div>
    </div>

    <div class="profiles-section">
      <div class="profiles-title" id="profilesTitle">📁 Meine gespeicherten Profile (0)</div>
      <div id="savedProfilesList" class="saved-profiles-list"></div>
    </div>
  `;
  renderSavedProfiles();
}

function generateStellara() {
  unlockAchievement('stellara_created');
  const power     = randomItem(STELLARA_POWERS);
  const mission   = randomItem(STELLARA_MISSIONS);
  const companion = randomItem(STELLARA_COMPANIONS);
  const crystal   = randomItem(STELLARA_CRYSTALS);
  const phrase    = randomItem(STELLARA_PHRASES);
  const attack    = randomItem(STELLARA_ATTACKS);

  STATE.currentProfile = {
    power,
    mission,
    companion: { name: companion.name, description: companion.description },
    crystal: { name: crystal.name, power: crystal.power },
    attack,
    phrase
  };

  const container = document.getElementById('generatedProfile');
  container.classList.remove('show');

  container.innerHTML = `
    <div class="generated-card">
      <div class="gen-header">
        <span class="gen-sparkle">🌟</span>
        <div class="gen-title">Sailor Stellara – Dein heutiges Profil</div>
      </div>
      <div class="gen-grid">
        <div class="gen-item">
          <div class="gen-label">⚡ Kraft</div>
          <div class="gen-value">${power}</div>
        </div>
        <div class="gen-item">
          <div class="gen-label">🎯 Mission</div>
          <div class="gen-value">${mission}</div>
        </div>
        <div class="gen-item">
          <div class="gen-label">🐾 Begleiter</div>
          <div class="gen-value"><strong>${companion.name}</strong> – ${companion.description}</div>
        </div>
        <div class="gen-item">
          <div class="gen-label">💎 Kristall</div>
          <div class="gen-value"><strong>${crystal.name}</strong><br><span style="color:var(--text-soft);font-size:0.82rem">${crystal.power}</span></div>
        </div>
        <div class="gen-item full-width">
          <div class="gen-label">⚔️ Angriff</div>
          <div class="gen-value" style="font-style:italic;color:var(--pink-light)">"${attack}"</div>
        </div>
      </div>
      <div class="transformation-box">
        <div class="transformation-label">Verwandlungsruf</div>
        <div class="transformation-text">"${phrase}"</div>
      </div>
      <div class="profile-save-panel">
        <label for="profileNameInput">💾 Diesem Profil einen Namen geben</label>
        <div class="profile-save-row">
          <input id="profileNameInput" type="text" maxlength="40" placeholder="z. B. Mond-Kämpferin">
          <button class="btn btn-primary" onclick="saveCurrentProfile()">💾 Profil speichern</button>
        </div>
        <div id="profileSaveMessage" class="profile-save-message"></div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => { container.classList.add('show'); });
  });
}

function saveCurrentProfile() {
  const input = document.getElementById('profileNameInput');
  const msg = document.getElementById('profileSaveMessage');
  const name = input?.value.trim();

  if (!STATE.currentProfile) return;

  if (!name) {
    if (msg) {
      msg.textContent = 'Bitte gib deinem Profil zuerst einen Namen! 🌙';
      msg.className = 'profile-save-message error';
    }
    return;
  }

  const profile = {
    id: Date.now().toString(),
    name,
    date: formatGermanDate(new Date()),
    ...STATE.currentProfile
  };

  STATE.profiles.push(profile);
  if (!saveProfilesToStorage()) {
    STATE.profiles = STATE.profiles.filter(p => p.id !== profile.id);
    return;
  }

  if (input) input.value = '';
  if (msg) {
    msg.textContent = 'Profil gespeichert! ✨';
    msg.className = 'profile-save-message success';
  }
  unlockAchievement('profile_saved');
  renderSavedProfiles();
}

function renderSavedProfiles() {
  const list = document.getElementById('savedProfilesList');
  const title = document.getElementById('profilesTitle');
  if (!list) return;

  if (title) title.textContent = `📁 Meine gespeicherten Profile (${STATE.profiles.length})`;

  if (STATE.profiles.length === 0) {
    list.innerHTML = `
      <div class="profiles-empty">
        Noch keine Profile gespeichert. Generiere eins und gib ihm einen Namen! ✨
      </div>
    `;
    return;
  }

  list.innerHTML = [...STATE.profiles].reverse().map(profile => savedProfileCard(profile)).join('');
}

function savedProfileCard(profile) {
  return `
    <div class="saved-profile-card">
      <div class="saved-profile-header">
        <div>
          <div class="saved-profile-name">${escapeHtml(profile.name)}</div>
          <div class="saved-profile-date">📅 ${escapeHtml(profile.date)}</div>
        </div>
        <button class="btn btn-danger" onclick="deleteProfile('${escapeAttr(profile.id)}')">🗑️ Löschen</button>
      </div>
      <div class="gen-grid">
        <div class="gen-item">
          <div class="gen-label">⚡ Kraft</div>
          <div class="gen-value">${escapeHtml(profile.power)}</div>
        </div>
        <div class="gen-item">
          <div class="gen-label">🎯 Mission</div>
          <div class="gen-value">${escapeHtml(profile.mission)}</div>
        </div>
        <div class="gen-item">
          <div class="gen-label">🐾 Begleiter</div>
          <div class="gen-value"><strong>${escapeHtml(profile.companion?.name)}</strong> – ${escapeHtml(profile.companion?.description)}</div>
        </div>
        <div class="gen-item">
          <div class="gen-label">💎 Kristall</div>
          <div class="gen-value"><strong>${escapeHtml(profile.crystal?.name)}</strong><br><span style="color:var(--text-soft);font-size:0.82rem">${escapeHtml(profile.crystal?.power)}</span></div>
        </div>
        <div class="gen-item full-width">
          <div class="gen-label">⚔️ Angriff</div>
          <div class="gen-value" style="font-style:italic;color:var(--pink-light)">"${escapeHtml(profile.attack)}"</div>
        </div>
        <div class="gen-item full-width">
          <div class="gen-label">Verwandlungsruf</div>
          <div class="gen-value">"${escapeHtml(profile.phrase)}"</div>
        </div>
      </div>
    </div>
  `;
}

function deleteProfile(id) {
  STATE.profiles = STATE.profiles.filter(p => p.id !== id);
  saveProfilesToStorage();
  renderSavedProfiles();
}

// ─── Section: Characters ─────────────────────────────────────
function renderCharacters() {
  const el = document.getElementById('section-characters');
  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">💫 Charakterlexikon</h1>
      <p class="section-subtitle">Lerne die Sailor-Kriegerinnen und ihre Gefährtinnen kennen.</p>
    </div>
    <div class="characters-grid">
      ${CHARACTERS_DATA.map(c => characterCard(c)).join('')}
    </div>
  `;
}

function characterCard(c) {
  const bg      = hexToRgba(c.color, 0.15);
  const border  = hexToRgba(c.color, 0.4);
  const accent  = hexToRgba(c.colorAccent, 0.12);

  return `
    <div class="character-card" style="border-color:${border}">
      <div class="char-header" style="background:${bg}">
        <div class="char-emoji-wrap" style="background:${accent};border:2px solid ${border}">
          ${c.emoji}
        </div>
        <div class="char-names">
          <div class="char-name">${c.name}</div>
          <div class="char-real-name">${c.realName}</div>
        </div>
      </div>
      <div class="char-body">
        <div class="char-element" style="background:${bg};color:${c.color};border:1px solid ${border}">
          ${c.element}
        </div>
        <p class="char-personality">${c.personality}</p>
        <div class="char-strengths">
          ${c.strengths.map(s => `<span class="strength-tag">${s}</span>`).join('')}
        </div>
        <div class="char-fun-fact">${c.funFact}</div>
        <div class="char-lesson">${c.lesson}</div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06)">
          <div style="font-size:0.72rem;font-weight:700;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px">Lieblinge</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px">
            ${c.favThings.map(t => `<span style="font-size:0.78rem;color:var(--text-soft)">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── Section: Planets of the Universe ───────────────────────
function renderPlanets() {
  const el = document.getElementById('section-planets');
  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">🪐 Planeten des Universums</h1>
      <p class="section-subtitle">Entdecke die Planeten, Sailor-Kriegerinnen und Sternzeichen.</p>
    </div>
    <div class="planets-grid">
      ${PLANETS_DATA.map(planet => planetCard(planet)).join('')}
    </div>
  `;
}

function planetCard(p) {
  const color = p.color || '#b39ddb';
  const bg = hexToRgba(color, 0.12);
  const border = hexToRgba(color, 0.35);
  const subCards = (p.subCards || []).map(sub => `
    <div class="planet-sub-card">
      <div class="planet-sub-title">${escapeHtml(sub.name)} · ${escapeHtml(sub.label)}</div>
      <div class="planet-sub-real">${escapeHtml(sub.realName)}</div>
      <p>${escapeHtml(sub.text)}</p>
    </div>
  `).join('');

  return `
    <article class="planet-card" style="border-color:${border}">
      <div class="planet-image-wrap" style="background:${bg}">
        <img src="${p.image}" alt="${escapeAttr(p.alt)}" class="planet-img"
          loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div class="planet-img-fallback" style="display:none;color:${color}">${p.emoji}</div>
      </div>
      <div class="planet-body">
        <div class="planet-title-row">
          <div>
            <div class="planet-name" style="color:${color}">${escapeHtml(p.name)}</div>
            <div class="planet-sailor">${escapeHtml(p.sailor)} · ${escapeHtml(p.realName)}</div>
          </div>
          <div class="planet-emoji">${p.emoji}</div>
        </div>
        <div class="planet-zodiac" style="background:${bg};border-color:${border}">
          Sternzeichen: ${escapeHtml(p.zodiac)}
        </div>
        <p class="planet-desc">${escapeHtml(p.description)}</p>
        ${subCards}
      </div>
    </article>
  `;
}

// ─── Section: Story Adventure ────────────────────────────────
function renderStory() {
  const el = document.getElementById('section-story');
  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">📖 Abenteuerpfad</h1>
      <p class="section-subtitle">Die Geschichte von Sailor Moon – von Staffel 1 bis SuperS.</p>
    </div>
    <div class="seasons-container">
      ${SEASONS_DATA.map((s, i) => seasonCard(s, i + 1)).join('')}
    </div>
  `;
}

function seasonCard(s, num) {
  const bg     = hexToRgba(s.color, 0.12);
  const border = hexToRgba(s.color, 0.35);
  const light  = hexToRgba(s.colorLight, 0.3);

  return `
    <div class="season-card" style="border-color:${border}">
      <div class="season-header" style="background:${bg};border-bottom:1px solid ${border}">
        <div class="season-number" style="color:${s.colorLight}">Staffel ${num} ${s.emoji}</div>
        <div class="season-title">${s.title}</div>
        <div class="season-subtitle" style="color:${s.colorLight}">${s.subtitle}</div>
      </div>
      <div class="season-body">
        <p class="season-summary">${s.shortSummary}</p>

        <div class="season-section-title" style="color:${s.colorLight}">✨ Neue Freundinnen</div>
        <ul class="friends-list">
          ${s.newFriends.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div class="season-section-title" style="color:${s.colorLight}">⚔️ Die große Herausforderung</div>
        <div class="season-challenge" style="border-left-color:${s.colorLight}">${s.mainChallenge}</div>

        <div class="season-lesson">✨ ${s.lesson}</div>

        <div class="season-magic-moment">🌟 ${s.magicalMoment}</div>
      </div>
    </div>
  `;
}

// ─── Section: Music Room ─────────────────────────────────────
function renderMusic() {
  const el = document.getElementById('section-music');
  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">🎵 Musikzimmer</h1>
      <p class="section-subtitle">Entdecke die wunderschönen Lieder aus Sailor Moon.</p>
    </div>
    <div class="music-intro">
      🎵 Hier findest du die bekanntesten Lieder aus Sailor Moon!
      Klicke auf den YouTube-Button, um das Lied zu suchen.
      Die kurzen Beispiele zeigen dir, wie die japanischen Wörter klingen.
      <br><br>
      <strong style="color:var(--gold)">Hinweis:</strong>
      Alle Links öffnen eine YouTube-Suche – bitte frage eine erwachsene Person, wenn du Hilfe brauchst!
    </div>
    <div class="songs-grid">
      ${SONGS_DATA.map(song => songCard(song)).join('')}
    </div>
  `;
}

function songCard(s) {
  const badgeClass = s.type === 'Titelmelodie' ? 'badge-opening' : 'badge-ending';
  const ytSearch   = encodeURIComponent(s.youtubeSearchHint);
  return `
    <div class="song-card">
      <span class="song-type-badge ${badgeClass}">${s.type}</span>
      <div class="song-title">${s.title}</div>
      <div class="song-title-jp">${s.titleJapanese}</div>
      <div class="song-meta">🎤 ${s.singer} &nbsp;·&nbsp; ${s.season}</div>
      <p class="song-desc">${s.description}</p>
      <div class="song-excerpt">
        <div style="font-size:0.7rem;font-weight:700;color:var(--gold);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">🌸 Japanisches Beispiel</div>
        <div class="excerpt-japanese">${s.safeExcerpt.japanese}</div>
        <div class="excerpt-romaji">Aussprache: ${s.safeExcerpt.romaji}</div>
        <div class="excerpt-german">🇩🇪 ${s.safeExcerpt.german}</div>
        <div class="excerpt-pronunciation">🔊 <em>${s.safeExcerpt.pronunciationHint}</em></div>
      </div>
      <div class="song-actions">
        <a href="https://www.youtube.com/results?search_query=${ytSearch}"
           target="_blank" rel="noopener noreferrer" class="btn-youtube">
          ▶ YouTube suchen
        </a>
      </div>
    </div>
  `;
}

// ─── Section: Japanese Learning ──────────────────────────────
function renderJapanese() {
  const el         = document.getElementById('section-japanese');
  const categories = [...new Set(JAPANESE_DATA.map(w => w.category))];
  const cat        = STATE.currentJapaneseCategory;
  const words      = JAPANESE_DATA.filter(w => w.category === cat);

  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">🌸 Japanisch lernen</h1>
      <p class="section-subtitle">Lerne Wörter auf Japanisch – wie eine echte Sailor-Kriegerin!</p>
    </div>
    <div class="category-tabs">
      ${categories.map(c => `
        <button class="category-tab ${c === cat ? 'active' : ''}"
          onclick="selectJapaneseCategory('${c}')">
          ${categoryEmoji(c)} ${c}
        </button>
      `).join('')}
    </div>
    <div class="vocab-grid">
      ${words.map(w => vocabCard(w)).join('')}
    </div>

    <div class="quiz-section">
      <div class="quiz-header">
        <div class="quiz-title">🌟 Quiz-Zeit!</div>
        <p style="color:var(--text-soft);font-size:0.9rem">
          Teste dein Wissen! Schaffst du alle Fragen?
        </p>
      </div>
      <div id="quizArea">
        <div class="text-center">
          <button class="btn btn-primary" onclick="startQuiz()">🌸 Quiz starten</button>
        </div>
      </div>
    </div>
  `;
}

function categoryEmoji(cat) {
  const map = { 'Begrüßung': '👋', 'Mond': '🌙', 'Freundschaft': '💖',
                'Mut': '💪', 'Magie': '🔮', 'Musik': '🎵' };
  return map[cat] || '✨';
}

function selectJapaneseCategory(cat) {
  STATE.currentJapaneseCategory = cat;
  renderJapanese();
}

function vocabCard(w) {
  return `
    <div class="vocab-card">
      <div class="vocab-emoji">${w.emoji}</div>
      <div class="vocab-japanese">${w.japanese}</div>
      <div class="vocab-romaji">${w.romaji}</div>
      <div class="vocab-german">${w.german}</div>
      <div class="vocab-pronunciation">🔊 ${w.pronunciationHint}</div>
    </div>
  `;
}

// ─── Quiz Logic ──────────────────────────────────────────────
function startQuiz() {
  const pool    = shuffle([...JAPANESE_DATA]);
  const qCards  = pool.slice(0, 8);
  STATE.quizState = { questions: qCards, index: 0, score: 0 };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qs  = STATE.quizState;
  const area = document.getElementById('quizArea');
  if (!area) return;

  if (qs.index >= qs.questions.length) {
    showQuizResult();
    return;
  }

  const card    = qs.questions[qs.index];
  const wrong   = shuffle(JAPANESE_DATA.filter(w => w.id !== card.id)).slice(0, 3);
  const options = shuffle([card, ...wrong]);

  area.innerHTML = `
    <div class="quiz-progress">${qs.index + 1} / ${qs.questions.length}</div>
    <div class="quiz-question">
      <div class="quiz-word-jp">${card.japanese}</div>
      <div class="quiz-word-romaji">${card.romaji}</div>
      <div class="quiz-prompt">Was bedeutet dieses Wort auf Deutsch?</div>
    </div>
    <div class="quiz-options">
      ${options.map(o => `
        <button class="quiz-option" onclick="checkAnswer(this, '${escapeAttr(o.german)}', '${escapeAttr(card.german)}')">
          ${o.german}
        </button>
      `).join('')}
    </div>
  `;
}

function checkAnswer(btn, selected, correct) {
  const area    = document.getElementById('quizArea');
  const buttons = area.querySelectorAll('.quiz-option');
  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent.trim() === correct) b.classList.add('correct');
  });

  if (selected === correct) {
    btn.classList.add('correct');
    STATE.quizState.score++;
  } else {
    btn.classList.add('wrong');
  }

  STATE.quizState.index++;
  setTimeout(renderQuizQuestion, 1200);
}

function showQuizResult() {
  const { score, questions } = STATE.quizState;
  const pct   = Math.round((score / questions.length) * 100);
  let emoji, title, msg;

  if (pct >= 88) {
    emoji = '🌟'; title = 'Ausgezeichnet, Sailor Stellara!';
    msg = `Du hast ${score} von ${questions.length} Fragen richtig beantwortet! Du lernst Japanisch wie eine echte Kriegerin!`;
  } else if (pct >= 60) {
    emoji = '💫'; title = 'Sehr gut gemacht!';
    msg = `Du hast ${score} von ${questions.length} richtig! Übe noch ein bisschen und du wirst zur Japanisch-Meisterin!`;
  } else {
    emoji = '🌙'; title = 'Gut versucht!';
    msg = `Du hast ${score} von ${questions.length} richtig. Schau dir die Karten nochmal an und versuche es dann wieder!`;
  }

  const area = document.getElementById('quizArea');
  area.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-emoji">${emoji}</div>
      <div class="quiz-result-title">${title}</div>
      <p class="quiz-result-text">${msg}</p>
      <button class="btn btn-primary" onclick="startQuiz()">🔄 Nochmal spielen</button>
    </div>
  `;
}

// ─── Section: Pegasus Dream World ────────────────────────────
function renderPegasus() {
  const el = document.getElementById('section-pegasus');
  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">🦄 Pegasus Traumwelt</h1>
      <p class="section-subtitle">Entdecke, was die Traumwelt für dich bereithält.</p>
    </div>
    <div class="pegasus-intro">
      <span class="pegasus-emoji">🦄</span>
      <p class="pegasus-intro-text">
        Ich bin Pegasus, der Hüter aller Träume. Ich lebe in der magischen Welt Elyon,
        wo alle Träume wahr werden können. Klicke auf den Button und ich werde dir
        eine persönliche Prophezeiung enthüllen.
      </p>
    </div>
    <div class="pegasus-generator">
      <div class="generator-title" style="margin-bottom:8px">🌟 Meine Prophezeiung empfangen</div>
      <p style="color:var(--text-soft);font-size:0.92rem;margin-bottom:20px">
        Was haben die Sterne für dich vorgesehen? Klicke und entdecke es!
      </p>
      <button class="btn btn-gold" onclick="generatePegasus()">
        ✨ Prophezeiung enthüllen ✨
      </button>
      <div id="pegasusResult"></div>
    </div>
  `;
}

function generatePegasus() {
  const power   = randomItem(PEGASUS_POWERS);
  const team    = randomItem(PEGASUS_TEAMS);
  const crystal = randomItem(PEGASUS_CRYSTALS);
  const kingdom = randomItem(PEGASUS_KINGDOMS);

  const container = document.getElementById('pegasusResult');
  container.classList.remove('show');
  container.innerHTML = `
    <div class="prophecy-scroll" style="margin-top:24px">
      <div class="prophecy-title">✨ Deine persönliche Prophezeiung ✨</div>
      <div class="prophecy-item">
        <div class="prophecy-label">⚡ Deine magische Kraft</div>
        <div class="prophecy-text">Du besitzt ${power}</div>
      </div>
      <div class="prophecy-item">
        <div class="prophecy-label">👥 Dein Sailor-Team</div>
        <div class="prophecy-text">${team}</div>
      </div>
      <div class="prophecy-item">
        <div class="prophecy-label">💎 Dein Kristall</div>
        <div class="prophecy-text">
          <span class="crystal-name">${crystal.name}</span>
          <br><span class="crystal-meaning">${crystal.meaning}.</span>
        </div>
      </div>
      <div class="prophecy-item">
        <div class="prophecy-label">🏰 Dein Königreich</div>
        <div class="prophecy-text">Du beschützt ${kingdom}.</div>
      </div>
      <div style="text-align:center;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,215,0,0.2)">
        <p style="color:var(--gold-light);font-style:italic;font-size:0.9rem">
          – Pegasus, Hüter der Träume 🦄
        </p>
      </div>
    </div>
  `;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { container.classList.add('show'); });
  });
}

// ─── Section: Art Gallery ────────────────────────────────────
function renderGallery() {
  const el = document.getElementById('section-gallery');
  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">🎨 Kunstgalerie</h1>
      <p class="section-subtitle">Deine eigenen Zeichnungen und Kreationen.</p>
    </div>
    <div class="gallery-intro">
      🎨 Das ist deine persönliche Galerie! Lade deine Zeichnungen, Fan-Art und
      Kreationen hoch und bewundere sie hier. Die Bilder werden sicher in deinem
      Browser gespeichert und bleiben auch nach dem Schließen erhalten.
    </div>
    <div class="gallery-upload-area" onclick="document.getElementById('galleryFileInput').click()">
      <div class="upload-icon">🖼️</div>
      <div class="upload-text">Bild hochladen</div>
      <div class="upload-hint">Klicke hier, um ein Bild auszuwählen (PNG, JPG, GIF)</div>
    </div>
    <input type="file" id="galleryFileInput" accept="image/*" onchange="handleGalleryUpload(this)">
    <div id="galleryGrid" class="gallery-grid"></div>
  `;
  renderGalleryGrid();
}

function renderGalleryGrid() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  if (STATE.gallery.length === 0) {
    grid.innerHTML = `
      <div class="gallery-empty" style="grid-column:1/-1">
        <span class="gallery-empty-icon">🎨</span>
        <p>Noch keine Bilder hochgeladen.<br>Füge deine erste Zeichnung hinzu!</p>
      </div>
    `;
    return;
  }
  grid.innerHTML = STATE.gallery.map(item => `
    <div class="gallery-item">
      <img class="gallery-img" src="${escapeAttr(item.data)}" alt="${escapeAttr(item.name)}" loading="lazy">
      <div class="gallery-item-footer">
        <span class="gallery-item-name">${escapeHtml(item.name)}</span>
        <button class="btn btn-danger" onclick="deleteGalleryItem('${escapeAttr(item.id)}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

function handleGalleryUpload(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const item = {
      id:   Date.now().toString(),
      name: file.name.replace(/\.[^.]+$/, ''),
      data: e.target.result
    };
    // Rough size check: base64 is ~33% larger than binary
    const storageTest = JSON.stringify([...STATE.gallery, item]);
    if (storageTest.length > 4_500_000) {
      alert('Die Galerie ist fast voll! Lösche einige Bilder, um neue hochzuladen.');
      return;
    }
    STATE.gallery.push(item);
    if (!saveGalleryToStorage()) {
      STATE.gallery = STATE.gallery.filter(g => g.id !== item.id);
      return;
    }
    renderGalleryGrid();
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function deleteGalleryItem(id) {
  STATE.gallery = STATE.gallery.filter(g => g.id !== id);
  saveGalleryToStorage();
  renderGalleryGrid();
}

// ─── Section: Moon Diary ─────────────────────────────────────
function renderDiary() {
  const el = document.getElementById('section-diary');
  const today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">📔 Mondtagebuch</h1>
      <p class="section-subtitle">Schreibe auf, was du erlebt und gelernt hast.</p>
    </div>
    <div class="diary-form">
      <div class="diary-form-title">✏️ Neuer Eintrag</div>
      <div class="diary-date">📅 ${today}</div>
      <div class="diary-field">
        <label>🌟 Heute habe ich gelernt:</label>
        <textarea id="dLearn" placeholder="Welche Wörter, Fakten oder Dinge habe ich heute entdeckt?"></textarea>
      </div>
      <div class="diary-field">
        <label>📺 Heute habe ich geschaut:</label>
        <input id="dWatch" type="text" placeholder="Welche Folge oder welchen Film habe ich gesehen?">
      </div>
      <div class="diary-field">
        <label>💜 Heute habe ich gefühlt:</label>
        <select id="dFeel">
          <option value="">– Wähle ein Gefühl –</option>
          <option>🌟 Glücklich und aufgeregt</option>
          <option>💫 Träumerisch und verträumt</option>
          <option>💪 Mutig und stark</option>
          <option>🌸 Liebevoll und fürsorglich</option>
          <option>🔮 Neugierig und nachdenklich</option>
          <option>🌙 Ruhig und zufrieden</option>
          <option>✨ Magisch und besonders</option>
        </select>
      </div>
      <div class="diary-field">
        <label>⭐ Mein Lieblingscharakter heute:</label>
        <select id="dChar">
          <option value="">– Wähle einen Charakter –</option>
          ${CHARACTERS_DATA.map(c => `<option>${c.emoji} ${c.name}</option>`).join('')}
          <option>✨ Sailor Stellara (ich selbst!)</option>
        </select>
      </div>
      <div class="diary-field">
        <label>💬 Noch etwas sagen:</label>
        <textarea id="dExtra" placeholder="Irgendwelche besonderen Gedanken oder Wünsche?" rows="2"></textarea>
      </div>
      <button class="btn btn-primary" onclick="saveDiaryEntry()">🌙 Eintrag speichern</button>
    </div>

    ${backupPanel()}

    <div>
      <div class="diary-entries-title">📖 Meine Einträge (${STATE.diary.length})</div>
      <div class="diary-entries" id="diaryEntriesList"></div>
    </div>
  `;
  renderDiaryEntries();
}

function backupPanel() {
  return `
    <div class="backup-panel">
      <div class="backup-actions">
        <button class="btn btn-gold" onclick="exportData()">⬇️ Manuell Sichern</button>
        <button class="btn btn-silver" onclick="triggerImportData()">⬆️ Backup Laden</button>
        <button class="btn btn-info" onclick="recoverFromAutoBackup()">🔄 Auto-Backup Wiederherstellen</button>
      </div>
      <input type="file" id="backupFileInput" accept="application/json" onchange="importData(this.files[0])">
    </div>
  `;
}

function renderDiaryEntries() {
  const list = document.getElementById('diaryEntriesList');
  if (!list) return;
  if (STATE.diary.length === 0) {
    list.innerHTML = `<div class="diary-empty">Noch keine Einträge. Schreibe deinen ersten! 🌙</div>`;
    return;
  }
  list.innerHTML = [...STATE.diary].reverse().map(entry => `
    <div class="diary-entry">
      <div class="diary-entry-header">
        <span class="diary-entry-date">📅 ${escapeHtml(entry.date)}</span>
        <button class="btn btn-danger" onclick="deleteDiaryEntry('${escapeAttr(entry.id)}')">🗑️ Löschen</button>
      </div>
      <div class="diary-entry-body">
        ${entry.learn    ? `<div class="diary-entry-field"><strong>🌟 Gelernt:</strong>${escapeHtml(entry.learn)}</div>` : ''}
        ${entry.watch    ? `<div class="diary-entry-field"><strong>📺 Geschaut:</strong>${escapeHtml(entry.watch)}</div>` : ''}
        ${entry.feel     ? `<div class="diary-entry-field"><strong>💜 Gefühl:</strong>${escapeHtml(entry.feel)}</div>` : ''}
        ${entry.char     ? `<div class="diary-entry-field"><strong>⭐ Lieblingscharakter:</strong>${escapeHtml(entry.char)}</div>` : ''}
        ${entry.extra    ? `<div class="diary-entry-field"><strong>💬 Gedanken:</strong>${escapeHtml(entry.extra)}</div>` : ''}
      </div>
    </div>
  `).join('');
}

function saveDiaryEntry() {
  const learn = document.getElementById('dLearn')?.value.trim();
  const watch = document.getElementById('dWatch')?.value.trim();
  const feel  = document.getElementById('dFeel')?.value;
  const char  = document.getElementById('dChar')?.value;
  const extra = document.getElementById('dExtra')?.value.trim();

  if (!learn && !watch && !feel && !char && !extra) {
    alert('Bitte fülle mindestens ein Feld aus!');
    return;
  }

  const entry = {
    id:    Date.now().toString(),
    date:  new Date().toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    learn, watch, feel, char, extra
  };

  STATE.diary.push(entry);
  if (!saveDiaryToStorage()) {
    STATE.diary = STATE.diary.filter(e => e.id !== entry.id);
    return;
  }
  unlockAchievement('diary_written');
  renderDiaryEntries();

  // Clear form
  ['dLearn', 'dWatch', 'dFeel', 'dChar', 'dExtra'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function deleteDiaryEntry(id) {
  STATE.diary = STATE.diary.filter(e => e.id !== id);
  saveDiaryToStorage();
  renderDiaryEntries();
  // Update count in title
  const title = document.querySelector('.diary-entries-title');
  if (title) title.textContent = `📖 Meine Einträge (${STATE.diary.length})`;
}

// ─── Export / Import ────────────────────────────────────────
function exportData() {
  const today = new Date().toISOString().slice(0, 10);
  const bundle = {
    app: 'sailor-stellara',
    version: 1,
    exportedAt: new Date().toISOString(),
    profiles: STATE.profiles,
    diary: STATE.diary,
    gallery: STATE.gallery
  };
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sailor-stellara-backup-${today}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function triggerImportData() {
  const input = document.getElementById('backupFileInput');
  if (input) input.click();
}

function importData(file) {
  if (!file) return;
  const input = document.getElementById('backupFileInput');
  const ok = confirm('Diese Datei wird mit den vorhandenen Daten zusammengeführt. Doppelte IDs werden übersprungen. Fortfahren?');
  if (!ok) {
    if (input) input.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const bundle = JSON.parse(e.target.result);
      const importBundle = normalizeImportBundle(bundle);
      const { profiles, diary, gallery } = importBundle;

      const oldProfiles = STATE.profiles;
      const oldDiary = STATE.diary;
      const oldGallery = STATE.gallery;

      const mergedProfiles = mergeById(STATE.profiles, profiles);
      const mergedDiary = mergeById(STATE.diary, diary);
      const mergedGallery = mergeById(STATE.gallery, gallery);

      STATE.profiles = mergedProfiles.items;
      STATE.diary = mergedDiary.items;
      STATE.gallery = mergedGallery.items;

      if (!saveProfilesToStorage() || !saveDiaryToStorage() || !saveGalleryToStorage()) {
        STATE.profiles = oldProfiles;
        STATE.diary = oldDiary;
        STATE.gallery = oldGallery;
        saveProfilesToStorage();
        saveDiaryToStorage();
        saveGalleryToStorage();
        return;
      }

      renderSection(STATE.currentSection);
      const label = importBundle.type === 'diary-only' ? 'Tagebuch-Datei importiert' : 'Backup wiederhergestellt';
      alert(`${label}! Neu hinzugefügt: ${mergedProfiles.added} Profile, ${mergedDiary.added} Tagebucheinträge, ${mergedGallery.added} Galerie-Bilder. Doppelte IDs wurden übersprungen.`);
    } catch (err) {
      alert('Diese Datei konnte nicht gelesen werden. Es wurde nichts verändert. 🌙');
    } finally {
      if (input) input.value = '';
    }
  };
  reader.onerror = () => {
    alert('Die Datei konnte nicht geöffnet werden. Es wurde nichts verändert.');
    if (input) input.value = '';
  };
  reader.readAsText(file);
}

function normalizeImportBundle(data) {
  if (data?.app === 'sailor-stellara' && data?.version === 1) {
    return {
      type: 'full-backup',
      profiles: Array.isArray(data.profiles) ? data.profiles : [],
      diary: Array.isArray(data.diary) ? data.diary : [],
      gallery: Array.isArray(data.gallery) ? data.gallery : []
    };
  }

  if (data?.app !== undefined || data?.version !== undefined) {
    throw new Error('invalid bundle');
  }

  if (Array.isArray(data)) {
    return {
      type: 'diary-only',
      profiles: [],
      diary: data.filter(isDiaryEntry),
      gallery: []
    };
  }

  if (Array.isArray(data?.diary)) {
    return {
      type: 'diary-only',
      profiles: [],
      diary: data.diary.filter(isDiaryEntry),
      gallery: []
    };
  }

  if (isDiaryEntry(data)) {
    return {
      type: 'diary-only',
      profiles: [],
      diary: [data],
      gallery: []
    };
  }

  throw new Error('invalid import data');
}

function isDiaryEntry(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
  if (item.id === undefined || item.id === null) return false;
  const diaryFields = ['date', 'learn', 'watch', 'feel', 'char', 'extra', 'savedAt'];
  return diaryFields.some(field => typeof item[field] === 'string' && item[field].trim() !== '');
}

function mergeById(target, incoming) {
  const items = [...target];
  const existing = new Set(target.map(item => String(item?.id)));
  let added = 0;
  incoming.forEach(item => {
    if (!item || item.id === undefined || item.id === null) return;
    const id = String(item.id);
    if (existing.has(id)) return;
    items.push({ ...item, id });
    existing.add(id);
    added++;
  });
  return { items, added };
}

function recoverFromAutoBackup() {
  const dbRequest = indexedDB.open('stellara-backup', 1);
  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    const tx = db.transaction('backups', 'readonly');
    const store = tx.objectStore('backups');
    const request = store.get('diary');
    
    request.onsuccess = () => {
      const result = request.result;
      if (!result || !result.data) {
        alert('Keine Auto-Sicherung gefunden. 🌙');
        return;
      }
      
      const ok = confirm('Die Auto-Sicherung von ' + new Date(result.timestamp).toLocaleString('de-DE') + ' wiederherstellen?');
      if (!ok) return;
      
      STATE.diary = Array.isArray(result.data) ? result.data : [];
      saveDiaryToStorage();
      renderDiaryEntries();
      alert('Einträge aus Auto-Sicherung wiederhergestellt! 🌙');
    };
  };
}

// ─── Section: Achievements ───────────────────────────────────
function renderAchievements() {
  const el         = document.getElementById('section-achievements');
  const unlockedCount = Object.keys(STATE.achievements).length;

  el.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">🏆 Auszeichnungen</h1>
      <p class="section-subtitle">Du hast ${unlockedCount} von ${ACHIEVEMENTS_DEF.length} Auszeichnungen freigeschaltet.</p>
    </div>
    <div class="achievements-intro">
      🌟 Jedes Mal, wenn du etwas Neues in der Sailor-Stellara-Welt entdeckst,
      schaltest du eine besondere Auszeichnung frei! Erkundige die gesamte Seite
      und sammle alle Medaillen.
    </div>
    <div class="achievements-grid">
      ${ACHIEVEMENTS_DEF.map(a => achievementCard(a)).join('')}
    </div>
    ${unlockedCount >= 3 && !STATE.achievements['birthday_unlocked'] ? birthdayUnlockBanner() : ''}
  `;
}

function achievementCard(a) {
  const unlocked = !!STATE.achievements[a.id];
  return `
    <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.description}</div>
      ${unlocked
        ? `<span class="achievement-status status-unlocked">✓ Freigeschaltet</span>`
        : `<span class="achievement-status status-locked">🔒 ${a.hint}</span>`}
    </div>
  `;
}

function birthdayUnlockBanner() {
  return `
    <div style="grid-column:1/-1;margin-top:8px;background:linear-gradient(135deg,rgba(255,215,0,0.1),rgba(255,133,161,0.08));border:1.5px solid rgba(255,215,0,0.4);border-radius:20px;padding:28px;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:10px">🎂</div>
      <div style="font-size:1.2rem;font-weight:800;color:var(--gold);font-family:var(--font-head);margin-bottom:8px">Geheimnis entdeckt!</div>
      <p style="color:var(--text-soft);font-size:0.9rem;margin-bottom:16px">Du hast 3 Auszeichnungen freigeschaltet! Etwas Besonderes wartet auf dich...</p>
      <button class="btn btn-gold" onclick="revealBirthday()">🎂 Geburtstags-Überraschung öffnen ✨</button>
    </div>
  `;
}

// ─── Section: Birthday Surprise ──────────────────────────────
function revealBirthday() {
  STATE.achievements['birthday_unlocked'] = true;
  saveAchievements();

  // Show birthday nav link
  const link = document.getElementById('birthdayNavLink');
  if (link) link.style.display = 'block';

  showSection('birthday');
}

function renderBirthday() {
  const el = document.getElementById('section-birthday');
  el.innerHTML = `
    <div class="birthday-container">
      <span class="birthday-fireworks">🎉✨🎂✨🎉</span>

      <div class="birthday-card">
        <div class="birthday-greeting">Ein Brief von Pegasus an</div>
        <div class="birthday-name">Sofia – Sailor Stellara</div>

        <div class="birthday-letter">
          <p>Liebe Sofia,</p>
          <p>
            Ich bin Pegasus, der Hüter aller Träume – und ich habe dich von Anfang an beobachtet.
          </p>
          <p>
            Du hast die Sterne erkundet, die Sailor-Kriegerinnen kennengelernt, sogar ein bisschen
            Japanisch gelernt und dein eigenes magisches Profil erstellt. Das beeindruckt mich sehr.
          </p>
          <p>
            Aber weißt du, was mich am allermeisten beeindruckt hat?
          </p>
          <p>
            Dass du dir die Zeit genommen hast, diese magische Welt mit einem offenen und
            neugierigen Herzen zu erkunden. Genau das macht eine echte Sailor-Kriegerin aus.
          </p>
          <p>
            <strong style="color:var(--moonlight)">Sailor Stellara – das bist du, Sofia.</strong>
            Du wurdest nicht einfach ausgewählt, weil du Sailor Moon liebst.
            Du wurdest auserwählt, weil du...
          </p>

          <div class="birthday-highlight">
            <li>💫 kreativ bist und neue Welten erschaffst, wenn du zeichnest</li>
            <li>💫 mutig bist, auch wenn etwas schwierig ist</li>
            <li>💫 ein großes, liebendes Herz hast</li>
            <li>💫 neugierig bist und immer mehr lernen möchtest</li>
            <li>💫 anderen Menschen Freude und Wärme bringst</li>
          </div>

          <p>
            An deinem <strong style="color:var(--gold)">9. Geburtstag</strong> möchte ich dir etwas sagen,
            das das ganze Universum schon lange weiß:
          </p>
          <p>
            Deine Kreativität ist echte Magie.<br>
            Deine Freundlichkeit ist eine Superkraft.<br>
            Deine Träume sind wichtig und wertvoll.<br>
          </p>
          <p>
            Und eines Tages – wenn du groß bist – wird die Welt sehen,
            was die Sterne schon immer gewusst haben:
          </p>
          <p style="color:var(--moonlight);font-weight:700">
            Dass Sailor Stellara eine der liebenswertesten und mutigsten Kriegerinnen ist,
            die je die Sterne erblickt haben.
          </p>
        </div>

        <div class="birthday-closing">
          🌙 Die Welt braucht eine Sailor Stellara wie dich. 🌙
        </div>

        <div class="birthday-signature">
          Alles Liebe und tausend Sternenwünsche,<br>
          <strong>Pegasus</strong> ✨<br>
          <span style="font-size:0.82rem;color:var(--text-muted)">
            P.S. Luna und Artemis schicken dir auch ganz herzliche Geburtstagswünsche! 🐱🤍
          </span>
        </div>
      </div>

      <div style="text-align:center;margin-top:32px">
        <button class="btn btn-silver" onclick="showSection('achievements')">
          ← Zurück zu den Auszeichnungen
        </button>
      </div>
    </div>
  `;
}

// ─── Achievements ────────────────────────────────────────────
function loadAchievements() {
  try {
    return JSON.parse(localStorage.getItem('stellara_achievements') || '{}');
  } catch { return {}; }
}

function saveAchievements() {
  localStorage.setItem('stellara_achievements', JSON.stringify(STATE.achievements));
}

function unlockAchievement(id) {
  if (STATE.achievements[id]) return;
  const def = ACHIEVEMENTS_DEF.find(a => a.id === id);
  if (!def) return;

  STATE.achievements[id] = { unlockedAt: Date.now() };
  saveAchievements();
  showAchievementToast(def);
  checkBirthdaySurprise();
}

function showAchievementToast(def) {
  const toast = document.getElementById('achievementToast');
  toast.innerHTML = `
    <div class="toast-icon">${def.icon}</div>
    <div class="toast-content">
      <div class="toast-label">✨ Auszeichnung freigeschaltet!</div>
      <div class="toast-name">${def.name}</div>
      <div class="toast-desc">${def.description}</div>
    </div>
  `;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

function checkBirthdaySurprise() {
  const count = Object.keys(STATE.achievements).filter(k => k !== 'birthday_unlocked').length;
  if (count >= 3 && !STATE.achievements['birthday_unlocked']) {
    const link = document.getElementById('birthdayNavLink');
    if (link) link.style.display = 'block';
  }
}

// ─── Persistence ─────────────────────────────────────────────
function loadDiary() {
  try {
    const diary = JSON.parse(localStorage.getItem('stellara_diary') || '[]');
    return Array.isArray(diary) ? diary : [];
  } catch { return []; }
}

function saveDiaryToStorage() {
  try {
    localStorage.setItem('stellara_diary', JSON.stringify(STATE.diary));
    // Also save to IndexedDB for extra persistence
    saveToIndexedDB('diary', STATE.diary);
    // Trigger auto-backup
    createAutoBackup();
    return true;
  } catch (e) {
    alert('Der Tagebucheintrag konnte nicht gespeichert werden – der Speicher ist voll.');
    return false;
  }
}

function loadGallery() {
  try {
    const gallery = JSON.parse(localStorage.getItem('stellara_gallery') || '[]');
    return Array.isArray(gallery) ? gallery : [];
  } catch { return []; }
}

function saveGalleryToStorage() {
  try {
    localStorage.setItem('stellara_gallery', JSON.stringify(STATE.gallery));
    return true;
  } catch (e) {
    alert('Bild konnte nicht gespeichert werden – der Speicher ist voll. Bitte lösche alte Bilder.');
    return false;
  }
}

function loadProfiles() {
  try {
    const profiles = JSON.parse(localStorage.getItem('stellara_profiles') || '[]');
    return Array.isArray(profiles) ? profiles : [];
  } catch { return []; }
}

function saveProfilesToStorage() {
  try {
    localStorage.setItem('stellara_profiles', JSON.stringify(STATE.profiles));
    return true;
  } catch (e) {
    alert('Das Profil konnte nicht gespeichert werden – der Speicher ist voll.');
    return false;
  }
}

// ─── IndexedDB for Extra Persistence ───────────────────────
function initIndexedDB() {
  const dbRequest = indexedDB.open('stellara-backup', 1);
  dbRequest.onerror = () => console.warn('IndexedDB init failed');
  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    if (!db.objectStoreNames.contains('backups')) {
      try {
        db.createObjectStore('backups', { keyPath: 'id' });
      } catch (e) {
        console.warn('Could not create IndexedDB store:', e);
      }
    }
  };
  dbRequest.onupgradeneeded = (e) => {
    const db = e.target.result;
    if (!db.objectStoreNames.contains('backups')) {
      db.createObjectStore('backups', { keyPath: 'id' });
    }
  };
}

function saveToIndexedDB(key, data) {
  try {
    const dbRequest = indexedDB.open('stellara-backup', 1);
    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const tx = db.transaction('backups', 'readwrite');
      const store = tx.objectStore('backups');
      store.put({ id: key, data, timestamp: Date.now() });
    };
  } catch (e) {
    console.warn('IndexedDB save failed:', e);
  }
}

function createAutoBackup() {
  const today = new Date().toISOString().slice(0, 10);
  const lastBackupDate = localStorage.getItem('stellara_lastBackupDate') || '';
  
  // Only backup once per day
  if (lastBackupDate === today) return;
  
  const bundle = {
    app: 'sailor-stellara',
    version: 1,
    exportedAt: new Date().toISOString(),
    profiles: STATE.profiles,
    diary: STATE.diary,
    gallery: STATE.gallery
  };
  
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sailor-stellara-autosave-${today}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  
  localStorage.setItem('stellara_lastBackupDate', today);
}

function scheduleAutoBackup() {
  // Check for backup on load
  const today = new Date().toISOString().slice(0, 10);
  const lastBackupDate = localStorage.getItem('stellara_lastBackupDate') || '';
  if (lastBackupDate !== today) {
    createAutoBackup();
  }
}

// ─── Utilities ───────────────────────────────────────────────
function formatGermanDate(date) {
  return date.toLocaleDateString('de-DE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function escapeAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
