INK="#1b1440"
defs=f'''<defs>
<radialGradient id="sky" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="#ff7ac8"/><stop offset=".5" stop-color="#c12fd0"/><stop offset="1" stop-color="#3d0f78"/></radialGradient>
<linearGradient id="scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe866"/><stop offset="1" stop-color="#ff9a1f"/></linearGradient>
<linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff27a"/><stop offset="1" stop-color="#ffb703"/></linearGradient>
<linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5aa8"/><stop offset="1" stop-color="#c23ad6"/></linearGradient>
</defs>'''
def rays(cx,cy):
    import math
    out=[]
    for k in range(16):
        a=k*math.pi/8; b=a+math.pi/16; R=900
        out.append(f'<path d="M{cx},{cy} L{cx+R*math.cos(a):.0f},{cy+R*math.sin(a):.0f} L{cx+R*math.cos(b):.0f},{cy+R*math.sin(b):.0f}Z" fill="#fff" opacity=".07"/>')
    return "".join(out)
def star(x,y,r,c,rot=0):
    import math
    p=[]
    for k in range(10):
        a=-math.pi/2+k*math.pi/5+rot; rr=r if k%2==0 else r*.47
        p.append(f"{x+rr*math.cos(a):.1f},{y+rr*math.sin(a):.1f}")
    return f'<polygon points="{" ".join(p)}" fill="{c}" stroke="{INK}" stroke-width="9" stroke-linejoin="round"/>'
def conf(seed=3):
    import random; random.seed(seed); out=[]
    cols=["#ff3b5c","#2f8bff","#ffd23f","#33e07a","#b55cff","#ffffff"]
    for _ in range(26):
        x=random.randint(40,984);y=random.randint(40,700)
        if 300<x<724 and 140<y<760: continue
        out.append(f'<rect x="{x}" y="{y}" width="{random.randint(14,24)}" height="{random.randint(28,40)}" rx="5" fill="{random.choice(cols)}" transform="rotate({random.randint(0,180)} {x} {y})" opacity=".9"/>')
    return "".join(out)
# mascotte : Captain Néon en entier, poing levé, cape au vent
SK="#f2c9a0";SU="#12c9e8";AC="#ff2bd6";HA="#ffe14d"
O=f'stroke="{INK}" stroke-width="10" stroke-linejoin="round"'
mascot=f'''
<ellipse cx="512" cy="752" rx="180" ry="28" fill="{INK}" opacity=".35"/>
<!-- cape -->
<path d="M438 430 Q360 560 352 720 Q400 700 440 726 Q480 696 520 724 Q560 696 600 722 Q650 700 690 718 Q668 560 590 430Z" fill="{AC}" {O}/>
<path d="M452 470 Q400 580 392 690" stroke="#fff" stroke-width="10" fill="none" opacity=".35" stroke-linecap="round"/>
<!-- jambes -->
<path d="M462 600 L456 712 L502 712 L508 600Z" fill="{SU}" {O}/>
<path d="M516 600 L522 712 L568 712 L562 600Z" fill="{SU}" {O}/>
<path d="M444 700 h66 q6 34 -10 40 h-62 q-22 -6 -14 -28Z" fill="{AC}" {O}/>
<path d="M514 700 h66 q22 6 14 28 q-4 12 -18 12 h-56 q-12 -10 -6 -40Z" fill="{AC}" {O}/>
<!-- bras droit sur la hanche -->
<path d="M596 452 Q668 500 640 566" fill="none" stroke="{INK}" stroke-width="44" stroke-linecap="round"/>
<path d="M596 452 Q668 500 640 566" fill="none" stroke="{SU}" stroke-width="26" stroke-linecap="round"/>
<circle cx="628" cy="578" r="30" fill="{AC}" {O}/>
<!-- torse -->
<path d="M424 438 Q512 404 600 438 Q616 530 594 612 H430 Q408 530 424 438Z" fill="{SU}" {O}/>
<path d="M440 456 Q470 444 500 442" stroke="#fff" stroke-width="10" fill="none" opacity=".5" stroke-linecap="round"/>
<rect x="426" y="586" width="172" height="30" rx="10" fill="{HA}" {O}/>
<rect x="494" y="582" width="36" height="38" rx="8" fill="{AC}" {O}/>
<circle cx="512" cy="506" r="48" fill="#fff" {O}/>
<path d="M524 468 L490 512 H510 L498 548 L536 498 H514Z" fill="{AC}" stroke="{INK}" stroke-width="7" stroke-linejoin="round"/>
<!-- bras gauche, poing levé -->
<path d="M430 450 Q370 400 350 300" fill="none" stroke="{INK}" stroke-width="44" stroke-linecap="round"/>
<path d="M430 450 Q370 400 350 300" fill="none" stroke="{SU}" stroke-width="26" stroke-linecap="round"/>
<rect x="318" y="300" width="64" height="30" rx="10" fill="{HA}" {O}/>
<circle cx="350" cy="258" r="46" fill="{AC}" {O}/>
<path d="M318 240 q8 -14 22 -2 M340 236 q10 -14 22 0 M362 240 q10 -12 18 4" stroke="{INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M310 268 q14 12 34 4" stroke="{INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M332 228 q10 -6 20 -4" stroke="#fff" stroke-width="7" fill="none" opacity=".6" stroke-linecap="round"/>
<!-- tête -->
<circle cx="512" cy="318" r="104" fill="{SK}" {O}/>
<path d="M404 300 Q392 190 470 186 L480 150 L512 182 L540 140 L556 186 Q636 190 620 300 Q584 240 512 248 Q440 240 404 300Z" fill="{HA}" {O}/>
<path d="M462 196 Q490 186 520 192" stroke="#fff" stroke-width="9" fill="none" opacity=".6" stroke-linecap="round"/>
<path d="M398 282 Q392 262 412 266 H612 Q632 262 626 282 Q630 344 586 344 Q546 340 512 326 Q478 340 438 344 Q394 344 398 282Z" fill="{AC}" {O}/>
<ellipse cx="466" cy="304" rx="26" ry="30" fill="#fff" stroke="{INK}" stroke-width="7"/>
<ellipse cx="558" cy="304" rx="26" ry="30" fill="#fff" stroke="{INK}" stroke-width="7"/>
<circle cx="471" cy="309" r="14" fill="{INK}"/><circle cx="563" cy="309" r="14" fill="{INK}"/>
<circle cx="476" cy="303" r="5" fill="#fff"/><circle cx="568" cy="303" r="5" fill="#fff"/>
<ellipse cx="438" cy="372" rx="20" ry="12" fill="#ff6f91" opacity=".6"/><ellipse cx="586" cy="372" rx="20" ry="12" fill="#ff6f91" opacity=".6"/>
<path d="M466 364 Q512 372 558 364 Q550 424 512 426 Q474 424 466 364Z" fill="#7a1030" stroke="{INK}" stroke-width="8" stroke-linejoin="round"/>
<path d="M476 368 Q512 374 548 368 L545 382 Q512 386 479 382Z" fill="#fff"/>
<ellipse cx="512" cy="408" rx="22" ry="11" fill="#ff7a9a"/>
'''
around=star(150,520,58,"#ff3b5c",.2)+star(874,520,58,"#12c9e8",-.2)+star(190,120,44,"#33e07a",.1)+star(836,120,44,"#ffd23f",-.15)
def page(svg,size):
    return f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=block" rel="stylesheet">
<style>html,body{{margin:0;background:transparent}}svg{{display:block}}text{{font-family:"Lilita One",sans-serif}}</style></head><body>{svg}</body></html>'''
txt=lambda s,y,fs,fill,ls=4: f'''<text x="512" y="{y+12}" text-anchor="middle" font-size="{fs}" letter-spacing="{ls}" fill="{INK}" stroke="{INK}" stroke-width="{fs*.14:.0f}" stroke-linejoin="round">{s}</text>
<text x="512" y="{y}" text-anchor="middle" font-size="{fs}" letter-spacing="{ls}" fill="{fill}" stroke="{INK}" stroke-width="{fs*.12:.0f}" stroke-linejoin="round" paint-order="stroke">{s}</text>'''
# 1) logo complet (carré, mascotte + nom)
logo=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">{defs}
<rect width="1024" height="1024" rx="0" fill="url(#sky)"/>{rays(512,430)}{conf()}{around}
<g transform="translate(512 0) scale(.95) translate(-512 -40)">{mascot}</g>
<g transform="rotate(-4 512 860)">{txt("TOUS AU",808,104,"#fff")}{txt("MILIEU",958,178,"url(#gold)",6)}</g></svg>'''
# 2) icône iPhone (sans texte, mascotte en grand)
icon=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">{defs}
<rect width="1024" height="1024" fill="url(#sky)"/>{rays(512,470)}{conf(7)}{star(150,560,64,"#ff3b5c",.2)}{star(874,560,64,"#12c9e8",-.2)}{star(176,150,48,"#33e07a",.1)}{star(848,150,48,"#ffd23f",-.15)}
<g transform="translate(512 512) scale(1.12) translate(-512 -450)">{mascot}</g></svg>'''
open("logo.svg","w").write(logo); open("icone.svg","w").write(icon)
open("logo.html","w").write(page(logo,1024)); open("icone.html","w").write(page(icon,1024))
