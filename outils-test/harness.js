window.__err=[];addEventListener("error",e=>__err.push((window.__cur||"")+": "+e.message+" @"+(e.lineno||"")));addEventListener("unhandledrejection",e=>__err.push((window.__cur||"")+" rej "+(e.reason&&e.reason.message||e.reason)));
window.prompt=()=>null;
const st=window.setTimeout,si=window.setInterval;window.setTimeout=(f,d,...a)=>st(f,(d||0)/3,...a);window.setInterval=(f,d,...a)=>si(f,Math.max(8,(d||0)/3),...a);
window.__fin=null;window.endGame=(key,places,pts)=>{__fin={key,places,pts}};
const fire=(el,x,y)=>{const o={bubbles:true,cancelable:true,clientX:x,clientY:y,pointerId:1+(Math.random()*5|0)};el.dispatchEvent(new PointerEvent("pointerdown",o));st(()=>{el.dispatchEvent(new PointerEvent("pointerup",o));el.dispatchEvent(new MouseEvent("click",o))},40+Math.random()*300)};
const randTap=()=>{const x=Math.random()*innerWidth,y=Math.random()*innerHeight,el=document.elementFromPoint(x,y);if(el&&!el.closest(".pz"))fire(el,x,y)};
const scan=()=>{const small=new Set(),cut=new Set();document.querySelectorAll("#stage *").forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return;const t=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!t)return;const cs=getComputedStyle(e);if(cs.visibility==="hidden"||+cs.opacity===0)return;const fs=parseFloat(cs.fontSize);const sel=e.tagName.toLowerCase()+(typeof e.className==="string"&&e.className.trim()?"."+e.className.trim().split(/\s+/).join("."):"");if(fs<14)small.add(sel+"("+fs+")");if((cs.overflow==="hidden"||cs.textOverflow==="ellipsis")&&e.scrollWidth>e.clientWidth+2)cut.add(sel)});return{small:[...small].slice(0,8),cut:[...cut].slice(0,8)}};
window.__res=[];window.__shot="";
window.__runAll=async(keys,n)=>{for(const key of keys){window.__cur=key;__fin=null;const g=GAMES[key];let sc=null,t0=performance.now();
  try{if(g.custom){G.mode="tour";G.n=n;prepPlayers();startMatch();window.showResult=(k,pl,pt,lb)=>{__fin={l:(lb||[]).join(",")}};g.custom(key)}else if(g.solo){G.mode="tour";G.n=n;prepPlayers();startMatch();newRun();musicMode(g.mus||"arena");theme(g.th||"arena");const s=soloCtx(key,0,(v,l)=>{__fin={v,l}});g.run(s)}else{G.mode="table";G.n=n;prepPlayers();startMatch();play(key)}}catch(e){__err.push(key+" start: "+e.message)}
  let k=0;while(!__fin&&performance.now()-t0<90000){await new Promise(r=>st(r,90));if(k===22){window.__shot=key+"_"+n;await new Promise(r=>st(r,900));window.__shot=""}randTap();if(Math.random()<.5)randTap();k++;if(k===30)sc=scan();
    const b=document.querySelector("[data-act]");if(b&&Math.random()<.1)ACT[b.dataset.act]&&ACT[b.dataset.act]()}
  __res.push({key,n,ok:!!__fin,s:Math.round((performance.now()-t0)/1000),fin:__fin&&(__fin.l||(__fin.places&&__fin.places.join(","))),...(sc||{})});cleanup()}
 window.__cur="FINI"};
