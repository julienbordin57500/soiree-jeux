# Soirée Arena
Jeu de soirée sur un seul téléphone, à une suite de mini-jeux tirés au hasard (esprit Smash Bros / Mario Party).
Trois façons de jouer, choisies sur l'écran « Comment on joue ? » :
- 📱 **Au milieu de la table** (`table`, 2-4 joueurs) : tout le monde joue **en même temps**, chacun dans son coin de l'écran.
- 🔄 **Chacun son tour** (`tour`, 2-8 joueurs) : on se passe le téléphone, chacun fait son score, puis classement.
- 🎲 **Le grand mix** (`mix`, 2-4 joueurs) : les deux types de jeux mélangés.

## Déroulé d'une partie
Accueil → mode → nombre de joueurs et de manches (6/10/15) → choix des héros (◀ ▶, prénom, PRÊT ;
en mode tour : liste de joueurs) → pour chaque manche : roulette qui tire le jeu → règle affichée
→ jeu de table : chacun touche « prêt » → 3-2-1-GO ;
  jeu à se passer : écran « Passe le téléphone à … » → 3-2-1 → score → « AU SUIVANT ▶ » → joueur suivant
→ résultats et points (grille, ou liste quand > 4 joueurs) → podium final (REVANCHE / MENU).
Points par manche : 1er = n-1, 2e = n-2… ; égalité totale = personne ne marque.

## Les 24 mini-jeux
**15 jeux de table** (objet `GAMES`, tous en même temps) : degaine (Dégaine !), course (Course folle),
sumo (Sumo Arena, canvas), bombe (Patate chaude), chrono (Chrono parfait), cible (Cible !),
couleur (Bonne couleur), quiz (Quiz Buzz), vf (Vrai ou Faux), compte (Compte éclair),
blind (Blind Test Buzz, extraits iTunes), etoiles (Attrape-étoiles), corde (Tir à la corde, bas contre haut),
hockey (Air Hockey, canvas, 3 buts ou 80 s), dessin (Dessin éclair).

**9 jeux à se passer** (`solo:true`, définis dans le bloc ajouté juste avant `fxInit();home();`) :
tour (Tour infernale, canvas), memoire (Mémoire flash, type Simon), tiles (Touches folles, canvas),
devine (Fais deviner, 45 s), cercle (Cercle parfait, 2 essais), bulles (Dans l'ordre 1→16, le plus bas gagne),
reflexe (Réflexe éclair, moyenne de 4 essais en ms, le plus bas gagne), pile10 (Pile 10 secondes, le plus
proche gagne), quizx (Quiz express, 30 s, +1/−1). `hi:false` = le score le plus bas gagne.
`avail()` filtre les jeux selon le mode.

## Image et son
- **Décors animés** : un par univers, choisi par jeu via `TH` / `theme(t)` (`#bg[data-th]`) :
  arena (concert néon + foule), western, dojo, space, studio (plateau télé), ice, synth (rétro 80s), candy.
  Calques CSS en fondu + particules sur un canvas `#fxc` (~30 i/s). Les zones des joueurs sont translucides.
- **Son 100 % généré en Web Audio**, aucune ressource audio : sortie compressée, réverbération (convolver)
  et écho calé sur le tempo. 4 morceaux en séquenceur 16 pas (`SONGS`) : menu (groove), arena (électro),
  turbo (rapide), tension (battement de cœur) ; `musicMode()` choisit selon le jeu ; la musique baisse
  pendant les moments importants (`musicDuck`). Bruitages dans `sfx` (fanfare de cuivres, applaudissements…).
  L'interface et la foule pulsent sur la grosse caisse (`FX.beat`).
- **Pas de voix** : la synthèse vocale a été retirée (trop robotique). Ne pas la remettre sans demande.

## Technique
- Un seul fichier : `index.html` (HTML + CSS + JS). Seule ressource externe : polices Google Fonts (Bungee, Baloo 2).
- Publié avec GitHub Pages depuis `main` : https://julienbordin57500.github.io/soiree-jeux/
- Mode table : écran découpé en zones (`layout()` / `buildStage()`), les joueurs du haut ont leur zone tournée à 180°.
  Tout est en pointer events multi-doigts (`touch-action:none`, zoom et appui long bloqués).
- Jeux de table : `setup` / `start` avec le contexte `c` (`c.tap`, `c.score`, `c.finish`…), briques `buzz()` et `spot()`.
  Jeux à se passer : `run(s)` avec le contexte `s`, fin par `s.end(valeur, libellé)`.
- Minuteries par écran (`newRun` / `cleanup` / `T` / `IV` / `LOOP`) : tout s'arrête proprement en changeant d'écran.
- Boutons qui font avancer la partie protégés par `once()` (un double appui ne saute plus de joueur).
- 8 couleurs de joueurs (`PCOL`), écran gardé allumé (Wake Lock).
- Blind test : API iTunes Search appelée en **JSONP** (pas de CORS), ~22 titres préchargés.
- Préférences gardées dans le navigateur (localStorage, clés `sa_…`, dont `sa_mode`).

## Reste à vérifier
- Test sur un vrai téléphone : son sur iPhone, plusieurs doigts en même temps, fluidité des décors.
