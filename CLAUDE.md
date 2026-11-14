# Soirée Arena
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

## Les 30 mini-jeux
**18 jeux de table** (objet `GAMES`) : degaine, course, sumo, bombe, chrono, cible, couleur, quiz, vf, compte,
blind (extraits iTunes), etoiles, corde, hockey, dessin, ballon (gonfler sans éclater), feu (feu rouge / feu vert),
roue (stopper l'aiguille dans la zone verte).
**Dessin éclair** : le dessinateur prend le téléphone, voit son mot en gardant le doigt appuyé, 60 s ;
« Trouvé » → il choisit qui a trouvé ; temps écoulé → personne ne marque.
**12 jeux à se passer** (`solo:true`) : tour, memoire, tiles, devine, cercle (40 s max), bulles, reflexe, pile10, quizx,
helico (doigt appuyé pour monter), intrus (trouver l'image différente), calcul (calcul mental 30 s).
Les 6 derniers jeux et la nouvelle version du dessin sont dans le bloc « NOUVEAUX MINI-JEUX (v5) », à la fin du script.
`hi:false` = le score le plus bas gagne. `avail()` filtre les jeux selon le mode. `CAT` range chaque jeu dans une
famille (vite, tête, visée, force, ambiance) pour les titres et les étoiles bonus.

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
- Jeux de table : `setup` / `start` avec le contexte `c` ; jeux à se passer : `run(s)` puis `s.end(valeur, libellé)`.
- Minuteries par écran (`newRun` / `cleanup` / `T` / `IV` / `LOOP`). Boutons qui font avancer protégés par `once()`.
- Boutons des écrans en zones : attribut `data-act` + objet `ACT` (marche aussi pour les écrans en liste).
- Prénoms saisis dans une fenêtre du jeu (`editName`), plus de `prompt()`.
- Préférences dans le navigateur (localStorage, clés `sa_…`).
- Test automatique utilisé : chaque jeu joué avec des touches au hasard (Chrome sans fenêtre), vérification qu'il se
  termine sans erreur et qu'aucun texte n'est coupé ou trop petit.

## Reste à faire / vérifier
- Test sur un vrai téléphone : son sur iPhone, plusieurs doigts en même temps, fluidité.
