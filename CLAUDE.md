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

## Les 24 mini-jeux
**15 jeux de table** (objet `GAMES`) : degaine, course, sumo, bombe, chrono, cible, couleur, quiz, vf, compte,
blind (extraits iTunes), etoiles, corde, hockey, dessin.
**9 jeux à se passer** (`solo:true`) : tour, memoire, tiles, devine, cercle, bulles, reflexe, pile10, quizx.
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
    `jeu2.mp3` = Funky Disco Beats (Fupi), `tension.mp3` = Midnight Cruiser (Zane Little). Choix **provisoires** :
    Julien doit encore choisir ses morceaux et jingles préférés sur la page d'écoute.
  - Sans fichier (hors ligne), retour automatique à la musique synthétisée (`seqStart`/`seqMode`).
  - Volume de la musique réglable (pause ou bouton 🔊) : `setMusVol`, clé `sa_mvol`.
  - L'interface pulse sur les basses de la musique (analyseur Web Audio → `beat()`).
- **Pas de voix** : la synthèse vocale a été retirée (trop robotique). Ne pas la remettre sans demande.

## Technique
- `index.html` (HTML + CSS + JS) + dossier `sons/`. Ressources externes : Google Fonts (Lilita One, Baloo 2), iTunes (blind test).
- Publié avec GitHub Pages depuis `main` : https://julienbordin57500.github.io/soiree-jeux/
- Mode table : zones (`layout()` / `buildStage()`), celles du haut tournées à 180°, pointer events multi-doigts.
- Jeux de table : `setup` / `start` avec le contexte `c` ; jeux à se passer : `run(s)` puis `s.end(valeur, libellé)`.
- Minuteries par écran (`newRun` / `cleanup` / `T` / `IV` / `LOOP`). Boutons qui font avancer protégés par `once()`.
- Boutons des écrans en zones : attribut `data-act` + objet `ACT` (marche aussi pour les écrans en liste).
- Préférences dans le navigateur (localStorage, clés `sa_…`).

## Reste à faire / vérifier
- Remplacer les musiques et jingles provisoires par le choix de Julien.
- Test sur un vrai téléphone : son sur iPhone, plusieurs doigts en même temps, fluidité.
