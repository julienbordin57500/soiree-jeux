window.__err=[];addEventListener("error",e=>__err.push(e.message+" @"+e.lineno));const W=ms=>new Promise(r=>setTimeout(r,ms));window.__clips={};window.__shot="";
const pd=(el,x,y,type,id)=>el.dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,clientX:x,clientY:y,pointerId:id}));
const solo=key=>{G.mode="tour";G.n=3;prepPlayers();startMatch();newRun();const g=GAMES[key];const s=soloCtx(key,0,(v,l)=>{window.__solo=l});g.run(s);return s};
window.__run=async()=>{
 /* funambule : joueur simulé avec un temps de réaction */
 for(const [nom,delay,k,dead] of [["moyen",300,.3,.1],["bon",220,.4,.07]]){__solo=null;const s=solo("funambule"),cv=s.el.querySelector("canvas"),r=cv.getBoundingClientRect();let side=0;const hist=[];
  while(!__solo){const st=s.el.__st();hist.push([performance.now(),st.th,st.om]);const old=hist.find(h=>h[0]>=performance.now()-delay)||hist[0];const p=old[1]+k*old[2],want=Math.abs(p)>dead?-Math.sign(p):0;
   if(want!==side){if(side)pd(cv,0,0,"pointerup",9);side=want;if(side)pd(cv,r.left+(side<0?r.width*.2:r.width*.8),r.top+r.height/2,"pointerdown",9)}await W(30)}
  __clips["funambule_"+nom]=__solo}
 /* coupe-fruits : joueur simulé qui tranche le fruit le plus haut */
 __solo=null;const s=solo("fruits"),cv=s.el.querySelector("canvas"),r=cv.getBoundingClientRect();let bombs=0;
 while(!__solo){const o=s.el.__obj().filter(o=>!o.bomb&&o.y<r.height*.8).sort((a,b)=>a.y-b.y)[0];if(o){const x=r.left+o.x,y=r.top+o.y;pd(cv,x-40,y-30,"pointerdown",8);pd(cv,x,y,"pointermove",8);pd(cv,x+40,y+30,"pointermove",8);pd(cv,0,0,"pointerup",8)}await W(260)}
 __clips.fruits=__solo;__cur="FINI"};
