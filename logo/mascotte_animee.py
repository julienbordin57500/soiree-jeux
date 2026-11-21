# Fabrique la mascotte animée (Captain Néon en calques séparés) pour l'accueil du jeu.
# Lance : python3 logo/mascotte_animee.py  -> écrit logo/mascotte-animee.svg (à coller dans index.html, const MASCOT)
import re,os
src=open(os.path.join(os.path.dirname(__file__),"gen.py"),encoding="utf-8").read()
ns={};exec(src[:src.index("around=")],ns);m=ns["mascot"]
parts=re.split(r"<!-- (.*?) -->",m)
shadow=parts[0];d={parts[i]:parts[i+1] for i in range(1,len(parts),2)}
head=d["tête"]
# yeux : les 2 blancs + pupilles + reflets -> calque qui cligne
eye_lines=[l for l in head.splitlines() if ('cy="304"' in l or 'cy="309"' in l or 'cy="303"' in l)]
for l in eye_lines: head=head.replace(l,"")
head=head.replace('<ellipse cx="438"',f'<g class="m-eyes">{"".join(eye_lines)}</g><ellipse cx="438"',1)
svg=(f'<svg class="mascot" viewBox="290 120 444 660" xmlns="http://www.w3.org/2000/svg">'
 f'<g class="m-shadow">{shadow}</g><g class="m-all">'
 f'<g class="m-cape">{d["cape"]}</g>{d["jambes"]}{d["bras droit sur la hanche"]}{d["torse"]}'
 f'<g class="m-arm">{d["bras gauche, poing levé"]}</g><g class="m-head">{head}</g></g></svg>')
svg=re.sub(r"\s*\n\s*","",svg)
open(os.path.join(os.path.dirname(__file__),"mascotte-animee.svg"),"w",encoding="utf-8").write(svg)
print(len(svg))
