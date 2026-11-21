window.__err=[];addEventListener("error",e=>__err.push((window.__cur||"")+": "+e.message+" @"+(e.lineno||"")));
const W=ms=>new Promise(r=>setTimeout(r,ms));window.__clips={};window.__shot="";window.__cur="";
const snap=async name=>{__shot=name;await W(450);__shot=""};
const pd=(el,x,y,type="pointerdown",id=1)=>{const r=el.getBoundingClientRect();const o={bubbles:true,cancelable:true,clientX:x??r.left+r.width/2,clientY:y??r.top+r.height/2,pointerId:id};el.dispatchEvent(new PointerEvent(type,o))};
const table=(key,n)=>{G.mode="table";G.n=n;prepPlayers();startMatch();play(key)};
const solo=key=>{G.mode="tour";G.n=3;prepPlayers();startMatch();newRun();const g=GAMES[key];theme(g.th||"arena");const s=soloCtx(key,0,(v,l)=>{window.__solo=l});g.run(s);return s};
window.__run=async(tag)=>{
 __cur="bonneteau";table("bonneteau",4);await W(3600);await snap(tag+"_bo_show");await W(2200);await snap(tag+"_bo_mix");
 await W(4000);await snap(tag+"_bo_ask");document.querySelectorAll(".zone").forEach((z,k)=>{const b=z.querySelectorAll(".bpick button")[k%3];if(b)pd(b)});await W(900);await snap(tag+"_bo_rev");
 __cur="unique";table("unique",4);await W(3500);await snap(tag+"_un_ask");[1,1,2,4].forEach((v,k)=>{const b=document.querySelectorAll(".zone")[k].querySelector(`[data-v="${v}"]`);if(b)pd(b)});await W(2000);await snap(tag+"_un_res");
 __cur="taupe";table("taupe",4);await W(8000);await snap(tag+"_ta_raw");for(let k=0;k<6;k++){document.querySelectorAll(".zone").forEach(z=>{const b=z.querySelector(".thole.up");if(b&&Math.random()<.7)pd(b)});await W(300)}await snap(tag+"_ta_mid");
 __cur="funambule";solo("funambule");await W(1500);await snap(tag+"_fu_start");
 const cv=document.querySelector(".solo canvas");let hold=0;for(let k=0;k<40;k++){const r=cv.getBoundingClientRect();pd(cv,r.left+(k%2?r.width*.8:r.width*.2),r.top+r.height/2,"pointerdown",5);await W(120);pd(cv,0,0,"pointerup",5)}await snap(tag+"_fu_play");await W(6000);await snap(tag+"_fu_end");
 __cur="fruits";solo("fruits");await W(3500);{const c=document.querySelector(".solo canvas"),r=c.getBoundingClientRect();for(let q=0;q<4;q++){pd(c,r.left+10,r.top+r.height*(.25+q*.12),"pointerdown",7);for(let k=1;k<=12;k++){pd(c,r.left+k*r.width/12,r.top+r.height*(.25+q*.12)+k*4,"pointermove",7);await W(16)}pd(c,0,0,"pointerup",7);await snap(tag+"_fr_"+q);await W(500)}}
 __cur="FINI"};
