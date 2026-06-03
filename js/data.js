// ============================================================
// Sailor Stellara Universe – Data Module
// All data embedded here so the site works offline (file://)
// ============================================================

const CHARACTERS_DATA = [
  {
    id: "sailor-moon",
    name: "Sailor Moon",
    realName: "Usagi Tsukino",
    role: "Sailor-Kriegerin des Mondes & Mondprinzessin Serenity",
    element: "Mond & Liebe",
    color: "#ff85a1",
    colorAccent: "#ffd700",
    emoji: "🌙",
    personality: "Usagi ist fröhlich, einfühlsam und manchmal ein kleines bisschen tollpatschig – aber ihr Herz ist riesig! Sie liebt ihre Freundinnen über alles und kämpft mit aller Kraft für sie.",
    strengths: ["Unendliche Liebe", "Heilung", "Mondkristall-Kraft", "Freundschaft", "Tapferkeit des Herzens"],
    funFact: "Usagi liebt Eis und Manga-Comics am allermeisten. Sie schläft am liebsten bis mittags und kommt fast immer zu spät für die Schule!",
    lesson: "Wahre Stärke kommt nicht aus den Muskeln, sondern aus dem Herzen.",
    favThings: ["Eis essen 🍦", "Manga lesen 📚", "Mit Freundinnen lachen 😄", "Tuxedo Mask 🌹"]
  },
  {
    id: "sailor-mercury",
    name: "Sailor Mercury",
    realName: "Ami Mizuno",
    role: "Sailor-Kriegerin des Merkurs & Genie der Gruppe",
    element: "Wasser & Intelligenz",
    color: "#4fc3f7",
    colorAccent: "#b3e5fc",
    emoji: "💙",
    personality: "Ami ist ruhig, klug und sehr fleißig. Sie ist bescheiden – obwohl sie das größte Genie der Gruppe ist, gibt sie niemals an. Ihre Freundinnen bedeuten ihr die Welt.",
    strengths: ["Intelligenz", "Wasser-Magie", "Analyse", "Taktik", "Geduld"],
    funFact: "Ami hat einen Mini-Computer! Ihre Lieblingsfarbe ist Hellblau und in Mathe hat sie fast immer eine Eins.",
    lesson: "Wissen ist eine der mächtigsten Kräfte im Universum.",
    favThings: ["Bücher lesen 📖", "Schach spielen ♟️", "Im Wasser schwimmen 🏊", "Lernen 🌊"]
  },
  {
    id: "sailor-mars",
    name: "Sailor Mars",
    realName: "Rei Hino",
    role: "Sailor-Kriegerin des Mars & Miko im Schrein",
    element: "Feuer & Intuition",
    color: "#ef5350",
    colorAccent: "#ff8a65",
    emoji: "🔥",
    personality: "Rei ist stark, selbstbewusst und ernst. Sie sagt immer, was sie denkt – auch wenn Usagi das manchmal nervt! Aber im Herzen liebt sie ihre Freundinnen sehr.",
    strengths: ["Feuer-Magie", "Intuition", "Wahrsagen", "Entschlossenheit", "Mut"],
    funFact: "Rei wohnt in einem echten Shinto-Schrein und kann böse Geister und dunkle Energien spüren!",
    lesson: "Folge deiner inneren Stimme – sie weiß oft mehr als der Verstand.",
    favThings: ["Meditation 🧘", "Orakelpfeile lesen 🔮", "J-Pop singen 🎵", "Im Schrein helfen ⛩️"]
  },
  {
    id: "sailor-jupiter",
    name: "Sailor Jupiter",
    realName: "Makoto Kino",
    role: "Sailor-Kriegerin des Jupiter & stärkste Kämpferin",
    element: "Blitz & Natur",
    color: "#66bb6a",
    colorAccent: "#a5d6a7",
    emoji: "⚡",
    personality: "Makoto ist groß, stark und mutig – aber auch unglaublich sanft und fürsorglich. Sie kocht für alle und beschützt ihre Freundinnen wie eine große Schwester.",
    strengths: ["Körperliche Stärke", "Blitz-Magie", "Pflanzenwachstum", "Kochen", "Beschützen"],
    funFact: "Makoto backt die besten Kirschkuchen der ganzen Schule! Sie liebt Kochen und Gärtnern genauso wie Kämpfen.",
    lesson: "Wahre Stärke und Sanftheit können wunderbar zusammengehören.",
    favThings: ["Kochen und Backen 🍰", "Gärtnern 🌱", "Sport 🏋️", "Für andere da sein 💚"]
  },
  {
    id: "sailor-venus",
    name: "Sailor Venus",
    realName: "Minako Aino",
    role: "Sailor-Kriegerin der Venus & erste Kriegerin der Gruppe",
    element: "Liebe & Licht",
    color: "#ffa726",
    colorAccent: "#ffe082",
    emoji: "💛",
    personality: "Minako ist lebhaft, fröhlich und träumt davon, ein Popstar zu werden! Sie liebt Musik und Tanzen – und sie war die erste Sailor-Kriegerin, die aktiv wurde.",
    strengths: ["Liebe-Magie", "Goldene Kette", "Führerschaft", "Licht-Angriffe", "Entschlossenheit"],
    funFact: "Minako war schon vor allen anderen als Sailor V aktiv! Ihre weiße Katze Artemis beschützt sie schon sehr lange.",
    lesson: "Liebe ist die allerstärkste Kraft im ganzen Universum.",
    favThings: ["Musik 🎵", "Tanzen 💃", "Idol-Träume ⭐", "Volleyball 🏐", "Artemis 🤍"]
  },
  {
    id: "tuxedo-mask",
    name: "Tuxedo Mask",
    realName: "Mamoru Chiba",
    role: "Beschützer der Mondprinzessin & Prinz der Erde",
    element: "Erde & Schutz",
    color: "#546e7a",
    colorAccent: "#e53935",
    emoji: "🌹",
    personality: "Mamoru ist ruhig, nachdenklich und immer zur Stelle, wenn Gefahr droht. Er erscheint geheimnisvoll – aber sein Herz gehört ganz Usagi.",
    strengths: ["Rosen-Angriff", "Erdkraft", "Intuition", "Beschützen", "Treue"],
    funFact: "Er wirft immer eine rote Rose, bevor er erscheint! Und er taucht immer in der allerletzten Sekunde auf.",
    lesson: "Wahre Liebe bedeutet, füreinander da zu sein – auch in der dunkelsten Nacht.",
    favThings: ["Rosen 🌹", "Sternengucken 🔭", "Lesen 📚", "Usagi beschützen 💕"]
  },
  {
    id: "chibiusa",
    name: "Chibiusa",
    realName: "Chibi-Usa (Kleine Usagi)",
    role: "Kleine Mondprinzessin aus der Zukunft",
    element: "Rosa Mondkristall & Träume",
    color: "#f48fb1",
    colorAccent: "#f8bbd0",
    emoji: "🌸",
    personality: "Chibiusa ist manchmal trotzig und mutig – aber sie hat ein sehr liebevolles Herz. Sie reist durch die Zeit und hütet ein großes Geheimnis.",
    strengths: ["Rosa Mondkristall", "Pegasus-Verbindung", "Tapferkeit", "Freundschaft", "Zeitreise"],
    funFact: "Chibiusa reist durch die Zeit! Ihr allerliebster Freund ist Pegasus, der in ihren Träumen lebt.",
    lesson: "Auch die Kleinsten können die größten Helden sein.",
    favThings: ["Pegasus 🦄", "Süßigkeiten 🍭", "Zeichnen 🎨", "Mit Usagi spielen 🌸"]
  },
  {
    id: "sailor-uranus",
    name: "Sailor Uranus",
    realName: "Haruka Tenoh",
    role: "Äußere Sailor-Kriegerin des Himmels",
    element: "Wind & Himmel",
    color: "#f6d365",
    colorAccent: "#6ec6ff",
    emoji: "🌀",
    personality: "Haruka ist mutig, schnell und sehr unabhängig. Sie wirkt manchmal ernst, aber sie kämpft mit ganzem Herzen für die Menschen, die sie liebt.",
    strengths: ["Windkraft", "Schnelligkeit", "Mut", "Klare Entscheidungen", "Schutz der Erde"],
    funFact: "Haruka liebt schnelle Autos und Rennen. Wenn sie auftaucht, fühlt es sich oft an, als würde ein starker Wind durch die Szene wehen.",
    lesson: "Man darf seinen eigenen Weg gehen und trotzdem ein gutes Herz haben.",
    favThings: ["Rennen fahren 🏎️", "Wind spüren 🌬️", "Michiru beschützen 🌊", "Freiheit 🌀"]
  },
  {
    id: "sailor-neptune",
    name: "Sailor Neptune",
    realName: "Michiru Kaioh",
    role: "Äußere Sailor-Kriegerin des Meeres",
    element: "Meer & Musik",
    color: "#26c6da",
    colorAccent: "#80deea",
    emoji: "🌊",
    personality: "Michiru ist elegant, klug und sehr feinfühlig. Sie merkt oft, wenn etwas nicht stimmt, noch bevor andere es sehen.",
    strengths: ["Meeresmagie", "Intuition", "Musik", "Ruhe", "Weisheit"],
    funFact: "Michiru spielt wunderschön Geige. Ihre Magie glitzert oft wie das Licht auf dem Meer.",
    lesson: "Innere Ruhe kann genauso stark sein wie ein lauter Angriff.",
    favThings: ["Geige spielen 🎻", "Das Meer 🌊", "Kunst 🎨", "Haruka vertrauen 🌀"]
  },
  {
    id: "sailor-pluto",
    name: "Sailor Pluto",
    realName: "Setsuna Meioh",
    role: "Hüterin von Zeit und Raum",
    element: "Zeit & Geheimnisse",
    color: "#00695c",
    colorAccent: "#81c784",
    emoji: "🕰️",
    personality: "Setsuna ist ruhig, geheimnisvoll und sehr verantwortungsvoll. Sie wacht über die Zeit und beschützt ihre Freundinnen aus der Ferne.",
    strengths: ["Zeitmagie", "Geduld", "Wachsamkeit", "Geheimwissen", "Treue"],
    funFact: "Sailor Pluto bewacht das Tor der Zeit. Sie kennt viele Dinge, die andere noch nicht wissen.",
    lesson: "Geduld und Verantwortung sind echte Superkräfte.",
    favThings: ["Sterne beobachten ✨", "Zeit bewachen 🕰️", "Chibiusa helfen 🌸", "Geheimnisse hüten 🔮"]
  },
  {
    id: "sailor-saturn",
    name: "Sailor Saturn",
    realName: "Hotaru Tomoe",
    role: "Äußere Sailor-Kriegerin der Stille und Wiedergeburt",
    element: "Stille & Neubeginn",
    color: "#6a1b9a",
    colorAccent: "#ce93d8",
    emoji: "🪐",
    personality: "Hotaru ist sanft, leise und sehr stark. Obwohl sie zerbrechlich wirkt, trägt sie eine riesige Kraft in sich.",
    strengths: ["Stille", "Heilung", "Neubeginn", "Mut", "Tiefe Kraft"],
    funFact: "Sailor Saturns Kraft ist so groß, dass alle sie respektieren. Sie erinnert daran, dass nach schweren Zeiten etwas Neues beginnen kann.",
    lesson: "Auch leise Menschen können unglaublich mächtig sein.",
    favThings: ["Ruhige Orte 🌙", "Freundschaft 💜", "Heilen ✨", "Neuanfänge 🌱"]
  },
  {
    id: "luna",
    name: "Luna",
    realName: "Luna",
    role: "Weise Beraterin & Hüterin des Mondkristalls",
    element: "Mondwissen & Magie",
    color: "#7e57c2",
    colorAccent: "#ce93d8",
    emoji: "🐱",
    personality: "Luna ist weise, fürsorglich und manchmal ein bisschen streng. Aber alles, was sie tut, tut sie aus Liebe für Usagi und die Sailor-Kriegerinnen.",
    strengths: ["Altes Wissen", "Telepathie", "Magische Gegenstände erschaffen", "Führung", "Intuition"],
    funFact: "Auf Lunas Stirn leuchtet ein goldener Halbmond! Ohne sie hätte Usagi ihre Kräfte niemals entdeckt.",
    lesson: "Manchmal braucht man jemanden, der einem liebevoll die Wahrheit sagt.",
    favThings: ["Usagi beschützen 💜", "Mondstein polieren ✨", "Weisheit teilen 🌙"]
  },
  {
    id: "artemis",
    name: "Artemis",
    realName: "Artemis",
    role: "Berater-Katze für Sailor Venus & Lunas Gefährte",
    element: "Venuswissen & Freundschaft",
    color: "#bdbdbd",
    colorAccent: "#ffd700",
    emoji: "🤍",
    personality: "Artemis ist freundlich, optimistisch und sehr loyal. Er ist immer für Minako da und glaubt fest daran, dass alles gut wird.",
    strengths: ["Führung", "Unterstützung", "Verbindung zur Venus", "Optimismus", "Mut machen"],
    funFact: "Auch Artemis hat einen Halbmond auf der Stirn! Er und Luna sind das perfekte Berater-Team.",
    lesson: "Wahre Freundschaft bedeutet, immer füreinander da zu sein – auch wenn es schwierig wird.",
    favThings: ["Minako beraten 🤍", "Mit Luna diskutieren 💜", "Die Kriegerinnen anfeuern 💪"]
  },
  {
    id: "diana",
    name: "Diana",
    realName: "Diana",
    role: "Kleine Berater-Katze aus der Zukunft",
    element: "Mondwissen & Zukunft",
    color: "#d7ccc8",
    colorAccent: "#f8bbd0",
    emoji: "🐾",
    personality: "Diana ist höflich, neugierig und sehr lieb. Sie möchte so klug und hilfreich sein wie Luna und Artemis.",
    strengths: ["Zukunftswissen", "Freundlichkeit", "Mut machen", "Mondverbindung", "Lernen"],
    funFact: "Diana ist die Tochter von Luna und Artemis und kommt aus der Zukunft. Sie nennt Chibiusa ihre Prinzessin.",
    lesson: "Auch wenn man noch klein ist, kann man schon wichtig und hilfreich sein.",
    favThings: ["Chibiusa begleiten 🌸", "Von Luna lernen 💜", "Artemis stolz machen 🤍", "Mondabenteuer 🌙"]
  },
  {
    id: "pegasus",
    name: "Pegasus",
    realName: "Helios",
    role: "Hüter der Träume & Beschützer von Elyon",
    element: "Traumkraft & Reinheit",
    color: "#fff8e1",
    colorAccent: "#ffd700",
    emoji: "🦄",
    personality: "Pegasus ist sanft, weise und mystisch. Er erscheint in Träumen und vertraut sein größtes Geheimnis nur dem reinsten Herzen an.",
    strengths: ["Traumkraft", "Heilung", "Mondlicht", "Reinheit", "Magisches Horn"],
    funFact: "Pegasus wohnt in Chibiusas schönen Träumen! Er vertraut ihr sein Geheimnis an, weil ihr Herz das reinste von allen ist.",
    lesson: "Gib niemals deine Träume auf – sie sind magisch und kostbarer als Gold.",
    favThings: ["In Träumen reisen 💫", "Chibiusa beschützen 🌸", "Die Welt der Träume hüten 🦄"]
  }
];

const PLANETS_DATA = [
  {
    id: "mond",
    name: "Mond",
    sailor: "Sailor Moon",
    realName: "Usagi Tsukino",
    zodiac: "Krebs ♋",
    image: "assets/planets/mond.jpg",
    alt: "Echter Mond vor schwarzem Weltraum",
    emoji: "🌙",
    color: "#ffd54f",
    description: "Der Mond ist der helle Begleiter der Erde. Nachts sieht er aus, als würde er über alle Träume wachen. Zu Sailor Moon passt er besonders gut, weil ihre Kraft von Liebe, Hoffnung und Schutz kommt.",
    subCards: [
      {
        name: "Sailor Chibi Moon",
        realName: "Chibiusa",
        label: "Kleine Mondkriegerin",
        text: "Chibiusa gehört ebenfalls zur Mondfamilie. Ihre rosa Mondkraft ist klein, mutig und voller Träume."
      }
    ]
  },
  {
    id: "merkur",
    name: "Merkur",
    sailor: "Sailor Mercury",
    realName: "Ami Mizuno",
    zodiac: "Zwillinge ♊ / Jungfrau ♍",
    image: "assets/planets/merkur.jpg",
    alt: "Echter Planet Merkur in grauen Farben",
    emoji: "☿️",
    color: "#4fc3f7",
    description: "Merkur ist der kleinste Planet und sehr nah an der Sonne. Er bewegt sich schnell um die Sonne, fast wie ein kluger Gedanke. Das passt zu Ami, weil sie blitzschnell denkt und ihrem Team mit Wissen hilft."
  },
  {
    id: "venus",
    name: "Venus",
    sailor: "Sailor Venus",
    realName: "Minako Aino",
    zodiac: "Stier ♉ / Waage ♎",
    image: "assets/planets/venus.jpg",
    alt: "Echter Planet Venus in hellen gelblichen Farben",
    emoji: "♀️",
    color: "#ffa726",
    description: "Venus leuchtet am Himmel oft besonders hell. Sie wird manchmal Morgenstern oder Abendstern genannt, obwohl sie ein Planet ist. Zu Minako passt sie, weil Sailor Venus mit Liebe, Licht und Mut glänzt."
  },
  {
    id: "erde",
    name: "Erde",
    sailor: "Tuxedo Mask",
    realName: "Mamoru Chiba",
    zodiac: "Heimatplanet",
    image: "assets/planets/erde.jpg",
    alt: "Echte Erde als blaue Kugel im Weltraum",
    emoji: "🌍",
    color: "#66bb6a",
    description: "Die Erde ist unser Zuhause. Hier gibt es Wasser, Luft, Pflanzen, Tiere und Menschen. Mamoru beschützt die Erde und erinnert daran, wie kostbar unser Heimatplanet ist."
  },
  {
    id: "mars",
    name: "Mars",
    sailor: "Sailor Mars",
    realName: "Rei Hino",
    zodiac: "Widder ♈ / Skorpion ♏",
    image: "assets/planets/mars.jpg",
    alt: "Echter roter Planet Mars",
    emoji: "♂️",
    color: "#ef5350",
    description: "Mars ist rot und wirkt wie ein Feuerplanet. Dort gibt es riesige Vulkane und staubige Landschaften. Rei passt zu Mars, weil sie Feuerkraft, Mut und eine starke innere Stimme hat."
  },
  {
    id: "jupiter",
    name: "Jupiter",
    sailor: "Sailor Jupiter",
    realName: "Makoto Kino",
    zodiac: "Schütze ♐ / Fische ♓",
    image: "assets/planets/jupiter.jpg",
    alt: "Echter Planet Jupiter mit Wolkenbändern",
    emoji: "♃",
    color: "#8bc34a",
    description: "Jupiter ist der größte Planet in unserem Sonnensystem. Seine Wolken wirbeln in starken Stürmen, und sein berühmter roter Fleck ist ein riesiger Sturm. Makoto passt zu Jupiter, weil sie stark ist und ihre Freundinnen beschützt."
  },
  {
    id: "saturn",
    name: "Saturn",
    sailor: "Sailor Saturn",
    realName: "Hotaru Tomoe",
    zodiac: "Steinbock ♑ / Wassermann ♒",
    image: "assets/planets/saturn.jpg",
    alt: "Echter Planet Saturn mit Ringen",
    emoji: "♄",
    color: "#ce93d8",
    description: "Saturn ist berühmt für seine wunderschönen Ringe aus Eis und Staub. Er sieht ruhig und geheimnisvoll aus. Hotaru passt zu Saturn, weil ihre Kraft leise, tief und sehr besonders ist."
  },
  {
    id: "uranus",
    name: "Uranus",
    sailor: "Sailor Uranus",
    realName: "Haruka Tenoh",
    zodiac: "Wassermann ♒",
    image: "assets/planets/uranus.jpg",
    alt: "Echter Planet Uranus in blaugrüner Farbe",
    emoji: "♅",
    color: "#80deea",
    description: "Uranus ist ein eisiger Planet und dreht sich fast auf der Seite. Das macht ihn im Sonnensystem sehr ungewöhnlich. Haruka passt zu Uranus, weil sie frei, mutig und anders als erwartet ist."
  },
  {
    id: "neptun",
    name: "Neptun",
    sailor: "Sailor Neptune",
    realName: "Michiru Kaioh",
    zodiac: "Fische ♓",
    image: "assets/planets/neptun.jpg",
    alt: "Echter blauer Planet Neptun",
    emoji: "♆",
    color: "#26c6da",
    description: "Neptun ist ein tiefblauer Planet weit draußen im Sonnensystem. Dort wehen sehr schnelle Winde. Michiru passt zu Neptun, weil ihre Kraft wie das Meer ist: schön, ruhig und manchmal sehr mächtig."
  },
  {
    id: "pluto",
    name: "Pluto",
    sailor: "Sailor Pluto",
    realName: "Setsuna Meioh",
    zodiac: "Skorpion ♏",
    image: "assets/planets/pluto.jpg",
    alt: "Echter Zwergplanet Pluto mit heller herzförmiger Fläche",
    emoji: "♇",
    color: "#81c784",
    description: "Pluto ist heute ein Zwergplanet und sehr weit von der Sonne entfernt. Er wirkt wie ein stiller Wächter am Rand unserer Himmelsfamilie. Setsuna passt zu Pluto, weil sie geheimnisvoll ist und über Zeit und Raum wacht."
  }
];

const SEASONS_DATA = [
  {
    id: "season1",
    title: "Sailor Moon – Die erste Staffel",
    subtitle: "Der Beginn eines Abenteuers",
    emoji: "🌙",
    color: "#7e57c2",
    colorLight: "#b39ddb",
    shortSummary: "Alles beginnt, als das Mädchen Usagi Tsukino von der schwarzen Katze Luna aufgeweckt wird. Luna erklärt ihr, dass sie Sailor Moon ist – eine mächtige Kriegerin, die die Welt beschützen muss. Zusammen mit ihren Freundinnen kämpft sie gegen das Dunkle Königreich, das nach dem mächtigen Silberkristall sucht.",
    newFriends: ["Sailor Mercury – die kluge Ami 💙", "Sailor Mars – die feurige Rei 🔥", "Sailor Jupiter – die starke Makoto ⚡", "Sailor Venus – die lebhafte Minako 💛", "Tuxedo Mask – der geheimnisvolle Beschützer 🌹"],
    mainChallenge: "Das Dunkle Königreich unter der bösen Königin Beryl sucht den Silberkristall und will die Erde mit Dunkelheit erfüllen.",
    lesson: "Wahre Freundschaft gibt dir Mut – auch in den schwierigsten Momenten.",
    magicalMoment: "Usagi verwandelt sich zum ersten Mal in Sailor Moon und rettet ihren kleinen Bruder!"
  },
  {
    id: "seasonR",
    title: "Sailor Moon R – Die Rückkehr",
    subtitle: "Freunde aus der Zukunft",
    emoji: "🌸",
    color: "#e91e8c",
    colorLight: "#f48fb1",
    shortSummary: "Nach einer kurzen Pause kehren die Sailor-Kriegerinnen zurück! Ein kleines Mädchen mit pinkfarbenen Haaren fällt buchstäblich vom Himmel auf Usagi. Sie nennt sich Chibiusa – aber hält Usagi für ihre Mama! Feinde aus der Zukunft bedrohen die Erde und Chibiusa hütet ein riesiges Geheimnis.",
    newFriends: ["Chibiusa – das mutige kleine Mädchen aus der Zukunft 🌸", "Sailor Pluto – die geheimnisvolle Hüterin der Zeit 💚"],
    mainChallenge: "Die Schwarz-Mond-Familie aus der Zukunft sucht nach Chibiusa und dem Rosa Mondkristall.",
    lesson: "Die Zukunft ist nicht festgelegt – durch unsere Handlungen heute können wir sie verändern.",
    magicalMoment: "Chibiusa hält endlich ihr Rosa Mondkristall in den Händen und zeigt ihre wahre Stärke!"
  },
  {
    id: "seasonS",
    title: "Sailor Moon S – Das Herz der Erde",
    subtitle: "Neue Kriegerinnen, neue Geheimnisse",
    emoji: "💜",
    color: "#00838f",
    colorLight: "#80deea",
    shortSummary: "Neue Feinde suchen nach drei reinen Herzen. Und plötzlich tauchen neue Sailor-Kriegerinnen auf – aber sind sie Freundinnen oder Feindinnen? Sailor Uranus und Sailor Neptune kämpfen auf ihre eigene Art und stellen die Freundschaft auf eine große Probe.",
    newFriends: ["Sailor Uranus – die starke und unabhängige Haruka 🌀", "Sailor Neptune – die elegante und weise Michiru 🌊", "Sailor Chibi Moon – Chibiusa zeigt ihre eigenen Kräfte! 🌸"],
    mainChallenge: "Die Death Busters wollen drei reine Herzen stehlen, um eine dunkle Gottheit zu erwecken.",
    lesson: "Manchmal gibt es sehr schwierige Entscheidungen – aber das Herz weiß immer den richtigen Weg.",
    magicalMoment: "Chibiusa wird zur Sailor Chibi Moon und kämpft Seite an Seite mit Usagi!"
  },
  {
    id: "seasonSuperS",
    title: "Sailor Moon SuperS – Der Zirkus der Träume",
    subtitle: "Pegasus und der Zirkus der Finsternis",
    emoji: "🌟",
    color: "#f57c00",
    colorLight: "#ffcc80",
    shortSummary: "Ein weißes Pferd mit Flügeln und einem goldenen Horn erscheint in Chibiusas Träumen. Er heißt Pegasus und hütet das Traumreich Elyon. Doch der gefährliche Dead Moon Circus bedroht alle schönen Träume auf der Welt. Chibiusa und Usagi erleben ihre größten Abenteuer!",
    newFriends: ["Pegasus / Helios – der Hüter der Träume 🦄", "Die Amazoness-Quartet – vier Mädchen, die ihre wahren Herzen finden ✨"],
    mainChallenge: "Königin Neherenia und der Dead Moon Circus wollen alle Träume der Welt stehlen.",
    lesson: "Gib niemals deine Träume auf – sie machen dich zu dem, was du bist.",
    magicalMoment: "Pegasus gibt Sailor Moon und Sailor Chibi Moon neue Kräfte – zusammen sind sie unbesiegbar!"
  }
];

const SONGS_DATA = [
  {
    id: "moonlight-densetsu",
    title: "Moonlight Densetsu",
    titleJapanese: "ムーンライト伝説",
    singer: "DALI / Moon Lips",
    season: "Staffel 1 & R",
    type: "Titelmelodie",
    description: "Das bekannteste Lied aus Sailor Moon! Diese wunderschöne Melodie erklingt am Anfang jeder Folge und hat Millionen von Kindern auf der Welt begeistert.",
    youtubeSearchHint: "Moonlight Densetsu Sailor Moon opening",
    safeExcerpt: {
      japanese: "ムーンライト伝説",
      romaji: "Moonlight densetsu",
      german: "Mondlicht-Legende",
      pronunciationHint: "Muun-lai-to den-se-tsu"
    }
  },
  {
    id: "otome-no-policy",
    title: "Otome no Policy",
    titleJapanese: "乙女のポリシー",
    singer: "Yoko Ishida",
    season: "Staffel 1 & R",
    type: "Abspann",
    description: "Ein fröhliches und ermutigendes Abspannlied! Es singt davon, stark zu sein und sich selbst treu zu bleiben – genau wie eine echte Sailor-Kriegerin.",
    youtubeSearchHint: "Otome no Policy Sailor Moon ending",
    safeExcerpt: {
      japanese: "乙女のポリシー",
      romaji: "Otome no porishi",
      german: "Die Prinzipien eines Mädchens",
      pronunciationHint: "O-to-me no po-ri-shi"
    }
  },
  {
    id: "heart-moving",
    title: "Heart Moving",
    titleJapanese: "ハート・ムービング",
    singer: "Ushiroyubi Sasaregumi",
    season: "Staffel 1",
    type: "Abspann",
    description: "Das erste Abspannlied der Serie – verspielt und voller Energie! Es passt perfekt zu Usagis fröhlicher Persönlichkeit.",
    youtubeSearchHint: "Heart Moving Sailor Moon ending season 1",
    safeExcerpt: {
      japanese: "ハート・ムービング",
      romaji: "Haato muubingu",
      german: "Das Herz bewegen",
      pronunciationHint: "Ha-a-to mu-u-bin-gu"
    }
  },
  {
    id: "tuxedo-mirage",
    title: "Tuxedo Mirage",
    titleJapanese: "タキシード・ミラージュ",
    singer: "Peach Hips",
    season: "Sailor Moon S",
    type: "Abspann",
    description: "Ein magisches, träumerisches Lied – passend zu Sailor Moon S. Es klingt wie ein Mondlicht-Traum.",
    youtubeSearchHint: "Tuxedo Mirage Sailor Moon S ending",
    safeExcerpt: {
      japanese: "タキシード・ミラージュ",
      romaji: "Takushiido miraaju",
      german: "Smoking-Fata Morgana",
      pronunciationHint: "Ta-ku-shi-do mi-ra-ju"
    }
  },
  {
    id: "princess-moon",
    title: "Princess Moon",
    titleJapanese: "プリンセス・ムーン",
    singer: "Yoko Ishida",
    season: "Sailor Moon R",
    type: "Abspann",
    description: "Ein romantisches Abspannlied von Sailor Moon R – über die Mondprinzessin und ihre ewige Liebe.",
    youtubeSearchHint: "Princess Moon Sailor Moon R ending",
    safeExcerpt: {
      japanese: "プリンセス・ムーン",
      romaji: "Purinsesu Muun",
      german: "Mondprinzessin",
      pronunciationHint: "Pu-rin-se-su Mu-un"
    }
  },
  {
    id: "watashitachi",
    title: "Watashi-tachi ni Naritakute",
    titleJapanese: "私たちになりたくて",
    singer: "Peach Hips",
    season: "Sailor Moon SuperS",
    type: "Abspann",
    description: "Das Abspannlied von SuperS – voller Hoffnung und Träume! Es singt davon, das zu werden, was man im Herzen ist.",
    youtubeSearchHint: "Watashi tachi ni Naritakute Sailor Moon SuperS ending",
    safeExcerpt: {
      japanese: "私たちになりたくて",
      romaji: "Watashitachi ni naritakute",
      german: "Wir wollen so werden wie wir sind",
      pronunciationHint: "Wa-ta-shi-ta-chi ni na-ri-ta-ku-te"
    }
  }
];

const JAPANESE_DATA = [
  { id: 1, japanese: "こんにちは", romaji: "Konnichiwa", german: "Guten Tag / Hallo", pronunciationHint: "Kon-ni-chi-wa", category: "Begrüßung", emoji: "👋" },
  { id: 2, japanese: "おはよう", romaji: "Ohayou", german: "Guten Morgen", pronunciationHint: "O-ha-yo", category: "Begrüßung", emoji: "🌅" },
  { id: 3, japanese: "こんばんは", romaji: "Konbanwa", german: "Guten Abend", pronunciationHint: "Kon-ban-wa", category: "Begrüßung", emoji: "🌙" },
  { id: 4, japanese: "ありがとう", romaji: "Arigatou", german: "Danke", pronunciationHint: "A-ri-ga-to", category: "Begrüßung", emoji: "🙏" },
  { id: 5, japanese: "さようなら", romaji: "Sayounara", german: "Auf Wiedersehen", pronunciationHint: "Sa-yo-na-ra", category: "Begrüßung", emoji: "👋" },
  { id: 6, japanese: "月", romaji: "Tsuki", german: "Mond", pronunciationHint: "Tsu-ki", category: "Mond", emoji: "🌙" },
  { id: 7, japanese: "星", romaji: "Hoshi", german: "Stern", pronunciationHint: "Ho-shi", category: "Mond", emoji: "⭐" },
  { id: 8, japanese: "空", romaji: "Sora", german: "Himmel", pronunciationHint: "So-ra", category: "Mond", emoji: "🌌" },
  { id: 9, japanese: "夜", romaji: "Yoru", german: "Nacht", pronunciationHint: "Yo-ru", category: "Mond", emoji: "🌃" },
  { id: 10, japanese: "光", romaji: "Hikari", german: "Licht", pronunciationHint: "Hi-ka-ri", category: "Mond", emoji: "✨" },
  { id: 11, japanese: "友達", romaji: "Tomodachi", german: "Freundin", pronunciationHint: "To-mo-da-chi", category: "Freundschaft", emoji: "👫" },
  { id: 12, japanese: "愛", romaji: "Ai", german: "Liebe", pronunciationHint: "A-i", category: "Freundschaft", emoji: "💖" },
  { id: 13, japanese: "心", romaji: "Kokoro", german: "Herz / Seele", pronunciationHint: "Ko-ko-ro", category: "Freundschaft", emoji: "💜" },
  { id: 14, japanese: "仲間", romaji: "Nakama", german: "Gefährtin / Team", pronunciationHint: "Na-ka-ma", category: "Freundschaft", emoji: "🤝" },
  { id: 15, japanese: "笑顔", romaji: "Egao", german: "Lächeln", pronunciationHint: "E-ga-o", category: "Freundschaft", emoji: "😊" },
  { id: 16, japanese: "勇気", romaji: "Yuuki", german: "Mut", pronunciationHint: "Yu-u-ki", category: "Mut", emoji: "💪" },
  { id: 17, japanese: "力", romaji: "Chikara", german: "Kraft", pronunciationHint: "Chi-ka-ra", category: "Mut", emoji: "⚡" },
  { id: 18, japanese: "希望", romaji: "Kibou", german: "Hoffnung", pronunciationHint: "Ki-bo-u", category: "Mut", emoji: "🌟" },
  { id: 19, japanese: "夢", romaji: "Yume", german: "Traum", pronunciationHint: "Yu-me", category: "Mut", emoji: "💫" },
  { id: 20, japanese: "強い", romaji: "Tsuyoi", german: "Stark", pronunciationHint: "Tsu-yo-i", category: "Mut", emoji: "🦁" },
  { id: 21, japanese: "魔法", romaji: "Mahou", german: "Magie / Zauberei", pronunciationHint: "Ma-ho-u", category: "Magie", emoji: "🔮" },
  { id: 22, japanese: "変身", romaji: "Henshin", german: "Verwandlung", pronunciationHint: "Hen-shin", category: "Magie", emoji: "✨" },
  { id: 23, japanese: "水晶", romaji: "Suishou", german: "Kristall", pronunciationHint: "Su-i-sho-u", category: "Magie", emoji: "💎" },
  { id: 24, japanese: "妖精", romaji: "Yousei", german: "Fee / Elfe", pronunciationHint: "Yo-u-se-i", category: "Magie", emoji: "🧚" },
  { id: 25, japanese: "宝石", romaji: "Houseki", german: "Edelstein", pronunciationHint: "Ho-u-se-ki", category: "Magie", emoji: "💍" },
  { id: 26, japanese: "歌", romaji: "Uta", german: "Lied / Gesang", pronunciationHint: "U-ta", category: "Musik", emoji: "🎵" },
  { id: 27, japanese: "音楽", romaji: "Ongaku", german: "Musik", pronunciationHint: "On-ga-ku", category: "Musik", emoji: "🎶" },
  { id: 28, japanese: "歌う", romaji: "Utau", german: "Singen", pronunciationHint: "U-ta-u", category: "Musik", emoji: "🎤" },
  { id: 29, japanese: "踊る", romaji: "Odoru", german: "Tanzen", pronunciationHint: "O-do-ru", category: "Musik", emoji: "💃" },
  { id: 30, japanese: "メロディー", romaji: "Merodii", german: "Melodie", pronunciationHint: "Me-ro-di-i", category: "Musik", emoji: "🎼" }
];

// ─── Stellara Generator Pools ───────────────────────────────

const STELLARA_POWERS = [
  "Sternenlicht-Magie, die Träume zum Leben erweckt",
  "Mondkristall-Energie, die alle Dunkelheit vertreibt",
  "Sternenstaub-Schild, der alle Freunde beschützt",
  "Kosmische Wellen, die böse Zauber auflösen",
  "Kristallblüten-Sturm aus dem Herz des Universums",
  "Silberlicht-Schutz von tausend Sternen",
  "Aurora-Strahlen, die Hoffnung in alle Herzen bringen",
  "Galaxie-Wirbel, der die Finsternis verscheucht",
  "Traumlicht-Heilung für alle, die leiden",
  "Rosenlicht-Magie aus dem geheimen Sternengarten"
];

const STELLARA_MISSIONS = [
  "Träume beschützen und Hoffnung in die Welt bringen",
  "Die Freundschaft zwischen allen Welten stärken",
  "Mut und Tapferkeit in Kinderherzen erwecken",
  "Die Sterne bewachen und ihr ewiges Licht bewahren",
  "Kreativität und Fantasie überall verbreiten",
  "Die Nacht erleuchten und Albträume vertreiben",
  "Liebe und Mitgefühl in jedes Herz tragen",
  "Das Universum vor der Dunkelheit zu beschützen",
  "Kinderherzen stärken und Wünsche erfüllen",
  "Die verborgene Schönheit der Welt zu zeigen"
];

const STELLARA_COMPANIONS = [
  { name: "Lumina", description: "Ein silberner Fuchs mit einem leuchtenden Stern auf der Stirn" },
  { name: "Nova", description: "Eine goldene Eule, die durch Nacht und Sterne fliegt" },
  { name: "Celeste", description: "Ein blauer Schmetterling mit magisch leuchtenden Flügeln" },
  { name: "Mondini", description: "Ein weißes Kaninchen mit mondförmigen Ohren" },
  { name: "Amara", description: "Eine violette Katze mit Galaxie-Muster im Fell" },
  { name: "Stella", description: "Eine rosafarbene Drachendame voller Sternenkraft" },
  { name: "Kira", description: "Ein kleines Einhorn mit Regenbogenhorn und Sternenstaub-Mähne" }
];

const STELLARA_CRYSTALS = [
  { name: "Rosa Rosenquarz", power: "Kraft der bedingungslosen Liebe" },
  { name: "Silberner Mondstein", power: "Weisheit und inneres Licht" },
  { name: "Blauer Aquamarin", power: "Tiefe der Gefühle und Klarheit" },
  { name: "Goldener Bernstein", power: "Freude und unendliche Lebensenergie" },
  { name: "Violetter Amethyst", power: "Traumkraft und grenzenlose Fantasie" },
  { name: "Weißer Sternendiamant", power: "Reinheit und ewige Wahrheit" },
  { name: "Grüner Smaragd", power: "Wachstum und heilende Naturkraft" },
  { name: "Roter Rubin", power: "Mut und das Feuer des Herzens" }
];

const STELLARA_PHRASES = [
  "Stellara Crystal Power, verwandele mich!",
  "Im Namen der Sterne – erwache, Sailor Stellara!",
  "Sternenlicht und Mondkraft, vereint euch! Stellara Power!",
  "Stella Nova Crystal, leuchte auf! Verwandlung beginnt!",
  "Beim Licht der tausend Sterne – Stellara Crystal Power!",
  "Sternenstaub und Mondlicht, komm zu mir! Crystal Power!",
  "In der Nacht der Sterne erwache ich – Stellara Power!"
];

const STELLARA_ATTACKS = [
  "Sternenlicht-Explosion!",
  "Kristallblüten-Sturm!",
  "Mondstaub-Wirbel, vorwärts!",
  "Galaxie-Welle der Hoffnung!",
  "Traumlicht-Heilung!",
  "Silber-Stern-Schauer!",
  "Nova-Kristall-Blitz!",
  "Sternenfeuer-Regen!",
  "Mondstrahlen-Schild!",
  "Kosmische Welle der Liebe!"
];

// ─── Pegasus Dream World Pools ──────────────────────────────

const PEGASUS_POWERS = [
  "die Kraft der Sternenmagie – deine Kreativität erschafft Licht!",
  "die Gabe der Traumheilung – deine Freundlichkeit heilt andere!",
  "die Fähigkeit der Herzensverbindung – du spürst, was andere fühlen!",
  "die Macht des Sternenlichts – du erhellst die Nacht für andere!",
  "die Kunst der Klangmagie – deine Stimme hat heilende Wirkung!",
  "die Fähigkeit des Traumreisens – du erlebst Abenteuer in Träumen!",
  "die Gabe der Tiersprache – Tiere vertrauen dir ihr Herz an!",
  "die Kraft der Naturmagie – Blumen blühen, wenn du lächelst!"
];

const PEGASUS_TEAMS = [
  "Das Innere Sailor-Team – Mond, Merkur, Mars, Jupiter und Venus wählen dich!",
  "Das Äußere Sailor-Team – Uranus, Neptun und Pluto vertrauen dir!",
  "Das Träumer-Team – Chibiusa und Pegasus möchten dich dabei haben!",
  "Ein völlig neues Team, das du selbst gründest – als Anführerin!",
  "Das geheime Sternenteam – noch nicht enthüllt, aber sehr mächtig!",
  "Sailor Stellaras eigenes Team – du wählst die Kriegerinnen selbst!"
];

const PEGASUS_KINGDOMS = [
  "das Königreich der Mondblumen, wo jede Blüte ein Wunsch ist",
  "das Sternenreich Stella Nova, jenseits der Milchstraße",
  "das Traumkönigreich Elyon, wo alle Träume Realität werden",
  "das Kristallkönigreich der ewigen Freundschaft",
  "das Waldkönigreich Verdenia, wo Tiere sprechen und singen",
  "das Mondkönigreich Serenity, Wiege aller Sailor-Kriegerinnen",
  "das Himmelsreich über den Wolken, voll goldener Türme",
  "das Geheimnisvolle Nebelkönigreich, das nur du betreten kannst"
];

const PEGASUS_CRYSTALS = [
  { name: "Rosa Rosenquarz", meaning: "Dein Herz ist voller bedingungsloser Liebe" },
  { name: "Silberner Mondstein", meaning: "Weisheit und Intuition führen dich" },
  { name: "Blauer Aquamarin", meaning: "Deine Tiefe macht dich besonders" },
  { name: "Goldener Bernstein", meaning: "Freude und Licht fließen durch dich" },
  { name: "Violetter Amethyst", meaning: "Deine Fantasie ist grenzenlos" },
  { name: "Weißer Diamant", meaning: "Reinheit und Wahrheit sind deine Stärken" },
  { name: "Grüner Smaragd", meaning: "Du bringst Heilung und Wachstum überall hin" }
];

// ─── Achievement Definitions ────────────────────────────────

const ACHIEVEMENTS_DEF = [
  {
    id: "first_visit",
    name: "Bronze Mond",
    icon: "🌙",
    description: "Du hast dein magisches Abenteuer begonnen!",
    hint: "Einfach die Seite besuchen"
  },
  {
    id: "character_explorer",
    name: "Silberkristall",
    icon: "💎",
    description: "Du hast das Charakterlexikon entdeckt!",
    hint: "Charakterlexikon öffnen"
  },
  {
    id: "stellara_created",
    name: "Goldener Pegasus",
    icon: "🦄",
    description: "Du hast dein Sailor-Profil erstellt!",
    hint: "Den Stellara-Generator benutzen"
  },
  {
    id: "japanese_learner",
    name: "Hüterin der Träume",
    icon: "🌸",
    description: "Du lernst Japanisch wie eine echte Kriegerin!",
    hint: "Den Japanisch-Bereich öffnen"
  },
  {
    id: "diary_written",
    name: "Mondprinzessin",
    icon: "👑",
    description: "Du hast deinen ersten Tagebucheintrag geschrieben!",
    hint: "Einen Tagebucheintrag speichern"
  },
  {
    id: "profile_saved",
    name: "Profil-Sammlerin",
    icon: "📁",
    description: "Du hast dein erstes Sailor-Stellara-Profil gespeichert!",
    hint: "Ein generiertes Profil speichern"
  }
];

// Helper: random item from array
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
