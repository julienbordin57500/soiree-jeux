window.__err=[];addEventListener("error",e=>__err.push((window.__scr||"")+": "+e.message+" @"+(e.lineno||"")));window.prompt=()=>null;
const st=window.setTimeout;window.setTimeout=(f,d,...a)=>st(f,(d||0)/2,...a);
Object.values(GAMES).forEach(g=>{if(g.solo){g.run=s=>st(()=>s.end(Math.round(Math.random()*20)+1,(Math.random()*20|0)+" pts"),300)}else{g.start=c=>st(()=>{c.finish(rankBy(c.P.map(()=>Math.random())))},500)}});
window.__seen={};window.__shot="";window.__cur="";
const tap=e=>{["pointerdown","pointerup","click"].forEach(t=>e.dispatchEvent(new PointerEvent(t,{bubbles:true,cancelable:true})))};
const scr=()=>{const q=s=>document.querySelector(s);if(q("#trb"))return"road";if(q("#dk"))return"gage";if(q("[data-act=suite]"))return"podium";if(q("[data-act=bsgo]"))return"bonus";if(q("[data-act=evgo]")||q("[data-act^=pk_]"))return"event";if(q("[data-act=next]"))return"result";if(q(".zready"))return"intro";if(q(".zsay .cd"))return"countdown";if(q("#rc.land"))return"roulette";if(q(".vs"))return"select";return""};
let hold=0;window.__iv=setInterval(()=>{const s=scr();window.__scr=s;if(s&&!__seen[s]){__seen[s]=1;__shot=s+"_"+G.n;hold=Date.now()+1300;return}if(Date.now()<hold)return;__shot="";const q=x=>document.querySelector(x);let b;
 if(q("#trb")&&q("#trb").style.visibility==="visible"){clearInterval(__iv);__cur="FINI";return}
 if(q("#dk")&&!q("#gc.flip"))return tap(q("#dk"));if(b=q("#gok"))return tap(b);if(b=q("#ch"))return tap(b);if(b=q("#nxch"))return tap(b);
 const rdy=[...document.querySelectorAll(".rdy")].filter(x=>!x.closest(".zone.ok"));if(rdy.length){rdy.forEach(tap);return}
 const zs=[...document.querySelectorAll(".zone")].filter(z=>z.querySelector(".zready")&&!z.classList.contains("ok"));if(zs.length){zs.forEach(tap);return}
 for(const s of ["[data-act^=pk_]","#gogo",".tend .btn","#nx","#sx","#rk","#ok","#vote","[data-w]","#res","[data-act]"]){if(b=q(s))return tap(b)}},300);
