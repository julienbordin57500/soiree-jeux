# Soirée Arena

## Pour reprendre (à lire en premier)
- Jeu en ligne : https://julienbordin57500.github.io/soiree-jeux/ (GitHub Pages, branche `main`).
- Copie d'essai privée sur claude.ai (le blind test n'y marche pas) : https://claude.ai/artifact/2sAsUzr3AzaeXk3i2BoXjs
- Pour modifier : cloner le dépôt dans le dossier temporaire de la session, **modifier directement `index.html`**,
  tester, pousser sur `main`, effacer la copie. Les anciens fichiers de fabrication (modules séparés) n'existent
  plus : `index.html` est la seule source. Les blocs du script sont repérables par leurs titres en commentaire
  (`/* ===== … ===== */`).
- Outils de test dans `outils-test/` (Chrome sans fenêtre piloté par Node, voir « Technique » en bas) :
  servir le dossier en local sur le port 8791, lancer Chrome avec `--headless=new --remote-debugging-port=9333`, puis
  `node outils-test/cdp.mjs 9333 dossier_sortie 4` (tous les jeux), `SCR=./screens8.js node outils-test/cdp3.mjs 9333
  dossier_sortie "375x667,390x844,430x932"` (écrans + éléments coupés), `node outils-test/cdp2.mjs 9333 sortie outils-test/flow.js "startExpr" 10` (partie complète, `startExpr` = code qui lance la partie).
  Pour simuler l'encoche d'iPhone : injecter `#stage{top:47px!important;bottom:34px!important}`.
- Julien teste surtout sur iPhone, souvent loin de l'ordinateur : mettre en ligne quand il le demande
  (« Oui, en ligne »), et toujours mettre à jour ce fichier en même temps.

## Ce que Julien a demandé et aimé (historique)
- Un vrai jeu, pas une maquette : style cartoon en relief, musique électro-funk libre de droits, effets qui « claquent »,
  personnages dessinés expressifs, inspiré des grands jeux mobiles, coloré et rigolo.
- Très sensible aux **cases et boutons coupés** et au **texte brouillon** : vérifier chaque écran sur petit iPhone.
- Veut **beaucoup de mini-jeux**, variés, innovants ; **pas trop de jeux « taper le plus vite »**.
- Retirés à sa demande : Feu rouge (doublon de course), Parcours de golf (doublon), Chrono parfait (incompris), voix de synthèse.
- Aime jouer à deux avec sa femme : les jeux à 2 en même temps comptent (mini-golf, ping-pong).
- Quiz : il veut de la diversité, pas de questions qui reviennent vite ; en ajouter régulièrement.
- Idée possible plus tard : retirer aussi « Stop à 10 secondes » (`pile10`), proche de Chrono parfait (proposé, pas tranché).

Jeu de soirée sur un seul téléphone, à une suite de mini-jeux tirés au hasard (esprit Mario Party),
style **cartoon en relief** façon jeux mobiles (Brawl Stars) : gros boutons qui s'enfoncent, textes contourés,
couleurs franches. Trois façons de jouer, choisies sur l'écran « Comment on joue ? » :
- 📱 **Au milieu de la table** (`table`, 2-4 joueurs) : tout le monde joue **en même temps**, chacun dans son coin de l'écran.
- 🔄 **Chacun son tour** (`tour`, 2-8 joueurs) : on se passe le téléphone, chacun fait son score, puis classement.
- 🎲 **Le grand mix** (`mix`, 2-4 joueurs) : les deux types de jeux mélangés.

## Déroulé d'une partie
Accueil (trophées, héros, records, règles) → mode → joueurs, manches (6/10/15) et **gages** (sans / à la fin / à chaque manche)
→ choix des héros (seulement ceux débloqués) → pour chaque manche :
  parfois un **événement surprise** (`eventScreen`) → roulette → règle → jeu
  (table : chacun touche « prêt » → 3-2-1-GO ; à se passer : « Passe le téléphone à … » → score → joueur suivant)
→ résultats : des étoiles volent jusqu'aux scores (`addStars`), puis le classement se réordonne (`flipMove`)
→ gage du dernier de la manche si l'option est choisie.
Dernière manche (si ≥ 6 manches) = **manche finale à points doubles**.
Fin : **étoiles bonus** (`bonusStars`, 2 catégories tirées au sort) → podium avec un titre par joueur (`titleOf`)
→ gage du dernier (option « à la fin ») → **route des trophées** (`trophyRoad`) avec coffre si un héros se débloque.
Points par manche : 1er = n-1, 2e = n-2… ; égalité totale = personne ne marque.

## Les 43 mini-jeux
**27 jeux de table** (objet `GAMES`) : degaine, course, sumo, bombe, cible, couleur, quiz, vf, compte,
blind (extraits iTunes), etoiles, corde, hockey, dessin, ballon (gonfler sans éclater), roue (stopper l'aiguille),
golf (mini-golf, 1 trou chacun, lance-pierre), burger (mémoriser puis reconstruire), flechettes, estime (le plus proche
d'un nombre, règle à glisser), plusmoins (cartes plus haut / plus bas), pfc (pierre-feuille-ciseaux), paires (memory), serpents (traînées lumineuses, ↺ ↻),
peinture (couvrir l'écran de sa couleur, `full`), pong (2 joueurs seulement, `need`, `full`), atterro (parachute).
« Feu rouge, feu vert » a été retiré (trop proche de Course folle) : Julien trouve qu'il y a déjà assez de jeux
« taper vite jusqu'à une ligne d'arrivée », en ajouter d'autres genres.
**Dessin éclair** : le dessinateur prend le téléphone, voit son mot en gardant le doigt appuyé, 60 s ;
« Trouvé » → il choisit qui a trouvé ; temps écoulé → personne ne marque.
**16 jeux à se passer** (`solo:true`) : tour, memoire, tiles, devine, cercle (40 s max), bulles, reflexe, pile10, quizx,
helico (doigt appuyé pour monter), intrus (trouver l'image différente), calcul (calcul mental 30 s),
basket (lancer franc), anagramme (mot mélangé), lampe (lampe torche), espion (jeu de groupe 3+ joueurs :
mot secret, discussion, vote ; déroulé spécial via `custom(key)` au lieu de `run`).
« Parcours de golf » retiré : Julien préfère le mini-golf où l'on joue en même temps.
Chaque jeu a une règle courte `tip` (objet `TIPS`) affichée dans les petits coins et dans l'écran « Les jeux ».
Icônes : dessins SVG maison (bloc « ICÔNES DESSINÉES » du script) ; `g.emoji` garde l'ancien émoji.
Les jeux ajoutés sont à la fin du script, blocs « NOUVEAUX MINI-JEUX (v5) » et « MINI-JEUX v6 ». Le moteur de mini-golf
(`golfField`, trous `GOLF`) sert aux deux versions. `zpos` donne la position du doigt dans un coin retourné.
`hi:false` = le score le plus bas gagne. `avail()` filtre les jeux selon le mode. `CAT` range chaque jeu dans une
famille (vite, tête, visée, force, ambiance) pour les titres et les étoiles bonus.

## Réglages et modes
- Fin de partie : 6/10/15 manches ou « premier à 15/25 ⭐ » (`G.fin`, `applyFin`, `matchOver`), « balle de match » annoncée.
- Équipes Rouges contre Bleus (4, 6 ou 8 joueurs) : table = les 2 du bas contre les 2 du haut, sinon un sur deux.
  Les couleurs des joueurs deviennent celles de l'équipe (`setTeams`, `PCOL_BASE`), score d'équipe = somme (`teamTot`).
- Thèmes de soirée (`G.fete`, clé `sa_fete`) : classique, Noël, anniversaire, soirée foot ; décor, particules,
  confettis et accessoire sur les héros (`feteHat`). Bouton « Thème » sur l'accueil.
- Écran « 🎮 Jeux » (`gamesScreen`) : essayer un jeu seul (`practice`, boutons Rejouer / Jeux) et retirer
  des jeux de la roulette (clé `sa_off`, au moins 3 gardés).
- Victoire de manche : rayons + trophée qui tombe dans le coin du gagnant (`winFx`), écran plein en mode tour (`winShow`).
- Après le podium : « Les moments forts » (`recapScreen`) puis gage et trophées.

## Progression (gardée sur le téléphone, clé `sa_prof`)
- `PROF.tro` : trophées de la bande. Chaque partie rapporte la somme des points + 2 par manche + 10.
- 16 héros à débloquer (`lock` dans `HEROES`) : 8 nouveaux (40 → 900 trophées) puis 8 tenues dorées (1100 → 3000).
- `PROF.rec` : records des jeux à se passer ; `PROF.pl` : palmarès par prénom (parties jouées / gagnées).
- `GAGES` : 48 gages tout public, un joker par joueur et par partie.

## Image et son
- **Décors animés** par univers (`theme(t)`, `#bg[data-th]`) : arena (ciel bleu + confettis), western, dojo, space,
  studio, ice, synth, candy. Particules sur le canvas `#fxc`. Effets dans le bloc « EFFETS DE JEU » :
  `coinFly`, `addStars`, `punch`, `impact` (léger zoom, pas de tremblement), `banner`, `confetti` (canons des coins), `sparks`.
- **Sons enregistrés** dans `sons/`, tous en **licence CC0** (libres, sans attribution obligatoire) :
  - `bruitages.mp3` et `jingles.mp3` : planches de sons (positions dans `SPR` / `JSPR`). Bruitages Kenney.nl
    (Interface Sounds, Casino Audio, UI SFX, Music Jingles) ; grand jingle de victoire « Funky Victory Loop » (Archonic).
  - Musiques (`SND.tracks`) : `menu.mp3` = Make Funk (HoliznaCC0), `jeu1.mp3` = Funky House (Of Far Different Nature),
    `jeu2.mp3` = Funky Disco Beats (Fupi), `tension.mp3` = Midnight Cruiser (Zane Little). Julien a validé ces musiques.
  - Sans fichier (hors ligne), retour automatique à la musique synthétisée (`seqStart`/`seqMode`).
  - Volume de la musique réglable (pause ou bouton 🔊) : `setMusVol`, clé `sa_mvol`.
  - Pendant une partie la musique ne change pas d'écran en écran (`musicMode("match")`) et chaque morceau
    reprend là où il s'était arrêté (`SND.pos`). Les jingles baissent la musique (`duckFor`).
  - Musique et bruitages ont chacun leur sortie (`MOUT` / `OUT`). iPhone : `navigator.audioSession`, relance du son
    après interruption (`audioKick`), son silencieux en boucle pour les anciens iPhone en mode silencieux (`silentKick`).
  - L'interface pulse sur les basses de la musique (analyseur Web Audio → `beat()`).
- **Pas de voix** : la synthèse vocale a été retirée (trop robotique). Ne pas la remettre sans demande.

## Lisibilité
- Petits textes (règles, consignes, questions, `.rt`) posés sur une plaque sombre (`--plate`), contours épais (`--ol`, `--ol1`).
- En-tête des coins : plaque sombre, prénom sur 2 lignes au besoin, sans l'étiquette P1.
- Attention : la classe `.solo` sert au conteneur des jeux à se passer ; `.opts.solo` est neutralisé exprès.

## Technique
- `index.html` (HTML + CSS + JS) + dossier `sons/`. Ressources externes : Google Fonts (Lilita One, Baloo 2), iTunes (blind test).
- Publié avec GitHub Pages depuis `main` : https://julienbordin57500.github.io/soiree-jeux/
- Mode table : zones (`layout()` / `buildStage()`), celles du haut tournées à 180°, pointer events multi-doigts.
  **Toujours une bande centrale** (`area.band`) : les jeux à `edge` 0.5 sont ramenés à 0.4 (sauf `full:true`, ex. hockey).
  Les textes vont **dans chaque coin, à l'endroit** (règle, nom du jeu, résultats, événements via `evShow`) ;
  la bande ne contient qu'une icône, le classement et **un seul bouton**. Compte à rebours, « C'est parti » et « Fin »
  s'affichent dans chaque coin (`zoneSay`). Éviter le texte en double tête-bêche au milieu : jugé brouillon.
- Jeux de table : `setup` / `start` avec le contexte `c` ; jeux à se passer : `run(s)` puis `s.end(valeur, libellé)`.
- Minuteries par écran (`newRun` / `cleanup` / `T` / `IV` / `LOOP`). Boutons qui font avancer protégés par `once()`.
- Boutons des écrans en zones : attribut `data-act` + objet `ACT` (marche aussi pour les écrans en liste).
- Prénoms saisis dans une fenêtre du jeu (`editName`), plus de `prompt()`.
- Anti-débordement : un observateur réduit automatiquement (propriété `zoom` via `--fz`) le contenu d'un coin,
  de la bande ou d'un écran qui ne rentre pas (`fitBox`). Julien est très sensible aux cases coupées.
- Préférences dans le navigateur (localStorage, clés `sa_…`).
- « Chrono parfait » retiré (jugé incompréhensible). Quiz : 221 questions, Vrai ou Faux : 81 ; `freshFirst()` fait
  passer les questions jamais vues en premier (clés `sa_seen_q`, `sa_seen_vf`).
- Zones iPhone : `#stage` s'arrête à l'encoche et à la barre du bas (`env(safe-area-inset-*)`) ; les marges
  internes n'en tiennent plus compte. Les jeux sur toute la scène (peinture, pong) retirent la position du canevas.
- Pages qui défilent : leurs éléments ne rétrécissent pas (`flex-shrink:0`), sinon le gros bouton du bas est écrasé.
- Test automatique utilisé : Chrome sans fenêtre piloté par le protocole DevTools. (1) chaque jeu joué avec des touches
  au hasard : il doit se terminer sans erreur ; (2) chaque écran rendu à 2/3/4 joueurs (et 8 en tour) sur 375×667,
  390×844 et 430×932 avec un détecteur d'éléments coupés ou hors écran ; (3) parties complètes dans les 3 modes.

## Reste à faire / vérifier
- Test sur un vrai téléphone : son sur iPhone, plusieurs doigts en même temps, fluidité.
