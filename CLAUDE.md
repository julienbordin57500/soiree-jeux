# Soirée Arena
Jeu de soirée « téléphone au milieu de la table » : de 2 à 4 joueurs (ou équipes) jouent **en même temps**
sur le même écran, chacun dans son coin, à une suite de mini-jeux tirés au hasard (esprit Smash Bros / Mario Party).

## Déroulé d'une partie
Accueil → nombre de joueurs (2-4) et de manches (6/10/15) → choix des héros (◀ ▶, prénom, PRÊT)
→ pour chaque manche : roulette qui tire le jeu → règle affichée dans les deux sens et lue par la voix
→ chacun touche « prêt » → 3-2-1-GO → résultats et points → podium final (REVANCHE / MENU).
Points par manche : 1er = n-1, 2e = n-2… ; égalité totale = personne ne marque.

## Les 15 mini-jeux (objet `GAMES`)
degaine (Dégaine !), course (Course folle), sumo (Sumo Arena, canvas), bombe (Patate chaude),
chrono (Chrono parfait), cible (Cible !), couleur (Bonne couleur), quiz (Quiz Buzz), vf (Vrai ou Faux),
compte (Compte éclair), blind (Blind Test Buzz, extraits iTunes), etoiles (Attrape-étoiles),
corde (Tir à la corde, bas contre haut), hockey (Air Hockey, canvas, 3 buts ou 80 s), dessin (Dessin éclair).

## Technique
- Un seul fichier : `index.html` (HTML + CSS + JS). Seule ressource externe : polices Google Fonts (Bungee, Baloo 2).
- Publié avec GitHub Pages depuis `main` : https://julienbordin57500.github.io/soiree-jeux/
- Écran découpé en zones (`layout()` / `buildStage()`) : les joueurs du haut ont leur zone tournée à 180°.
  Tout est en pointer events multi-doigts (`touch-action:none`, zoom et appui long bloqués).
- Chaque jeu a `setup` / `start` et utilise le contexte `c` (`c.tap`, `c.score`, `c.finish`…).
  Briques réutilisables : `buzz()` (questions à choix) et `spot()` (toucher au bon moment).
- Minuteries par écran (`newRun` / `cleanup` / `T` / `IV` / `LOOP`) : tout s'arrête proprement en changeant d'écran.
- Sons et musique générés en Web Audio (la musique accélère pendant les jeux, l'interface pulse au rythme),
  voix de l'annonceur en synthèse vocale française, écran gardé allumé (Wake Lock).
- Blind test : API iTunes Search appelée en **JSONP** (pas de CORS), ~22 titres préchargés.
- Préférences gardées dans le navigateur (localStorage, clés `sa_…`).

## Reste à vérifier
- Test sur un vrai téléphone à plusieurs doigts (son, voix et multi-touch sur iPhone).
