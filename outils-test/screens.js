window.__err=[];addEventListener("error",e=>__err.push((window.__cur||"")+": "+e.message+" @"+(e.lineno||"")));window.prompt=()=>null;
const sel=e=>e.tagName.toLowerCase()+(typeof e.className==="string"&&e.className.trim()?"."+e.className.trim().split(/\s+/).slice(0,2).join("."):"")+(e.id?"#"+e.id:"");
window.__clip=()=>{const out=[];for(const e of document.querySelectorAll("#stage *, .ov *, .tend *")){const cs=getComputedStyle(e);if(cs.display==="none"||cs.visibility==="hidden"||+cs.opacity===0)continue;
  if(e.closest(".ft,.coinfx,.banner,canvas,svg *,.wsec,.zsay"))continue;const r=e.getBoundingClientRect();if(r.width<3||r.height<3)continue;
  const txt=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||e.tagName==="BUTTON";if(!txt)continue;
  let a=e.parentElement,scroll=false;while(a&&a!==document.body){const s=getComputedStyle(a);if(s.overflowY==="auto"||s.overflowY==="scroll"){scroll=true;break}
    if(s.overflow!=="visible"){const R=a.getBoundingClientRect();if(r.left<R.left-2||r.right>R.right+2||r.top<R.top-2||r.bottom>R.bottom+2)out.push(sel(e)+" coupé par "+sel(a));break}a=a.parentElement}
  if(!scroll&&(r.right>innerWidth+2||r.left<-2||r.bottom>innerHeight+2||r.top<-2))out.push(sel(e)+" hors écran");
  if(cs.textOverflow==="ellipsis"&&e.scrollWidth>e.clientWidth+1)out.push(sel(e)+" …")}
 return[...new Set(out)]};
const W=ms=>new Promise(r=>setTimeout(r,ms));
window.__clips={};window.__shot="";window.__cur="";
const snap=async name=>{await W(1500);__clips[name]=__clip();__shot=name;await W(700);__shot=""};
const rnd5=k=>()=>(k+.5)/5;
window.__run=async(tag)=>{
 for(const n of [2,3,4]){G.mode="table";G.n=n;prepPlayers();startMatch();G.scores=G.P.map((_,i)=>[5,3,8,1][i]);G.round=3;G.st.forEach((s,i)=>{s.w=i;s.cat={vite:i,tete:1};s.best=i;s.last=3-i});
  __cur="select"+n;selectScreen();await snap(tag+"_t"+n+"_select");
  newRun();__cur="intro";intro("estime");await snap(tag+"_t"+n+"_intro");
  newRun();intro("dessin");await snap(tag+"_t"+n+"_intro2");
  __cur="result";result("quiz",G.P.map((_,i)=>i),G.P.map((_,i)=>n-1-i),G.P.map(()=>"12 points"));await snap(tag+"_t"+n+"_result");
  for(const k of [0,4]){__cur="event"+k;const R=Math.random;Math.random=rnd5(k);eventScreen(()=>{});Math.random=R;await W(2500);await snap(tag+"_t"+n+"_event"+k)}
  __cur="bonus";bonusStars(()=>{});await W(4000);await snap(tag+"_t"+n+"_bonus");
  __cur="podium";podium();await snap(tag+"_t"+n+"_podium");
  __cur="roulette";roulette();await W(3000);await snap(tag+"_t"+n+"_roulette")}
 for(const n of [3,8]){G.mode="tour";G.n=n;prepPlayers();startMatch();G.scores=G.P.map((_,i)=>(i*7)%11);G.round=3;
  __cur="list"+n;selectList();await snap(tag+"_o"+n+"_list");
  passScreen("helico",0,false,()=>{});await snap(tag+"_o"+n+"_pass");
  newRun();intro("anagramme");await snap(tag+"_o"+n+"_intro");
  resultList("helico",G.P.map((_,i)=>i),G.P.map((_,i)=>Math.max(0,n-1-i)),G.P.map(()=>"123 m"));await snap(tag+"_o"+n+"_result");
  const R=Math.random;Math.random=rnd5(4);eventScreen(()=>{});Math.random=R;await W(2500);await snap(tag+"_o"+n+"_event4");
  podiumList();await snap(tag+"_o"+n+"_podium")}
 G.mode="table";G.n=4;prepPlayers();startMatch();G.scores=[12,7,9,3];G.round=8;G.st.forEach((s,i)=>{s.w=i+1;s.best=i+1;s.worst=3;s.cat={vite:i,tete:2,show:1};s.last=i});G.hist=[{key:"quiz",places:[0,1,2,3],pts:[3,2,1,0]},{key:"golf",places:[1,0,2,3],pts:[4,6,2,0]}];
 recapScreen();await W(2500);await snap(tag+"_recap");
 gamesScreen();await snap(tag+"_games");
 G.mode="table";G.n=3;prepPlayers();startMatch();G.practice="quiz";result("quiz",[0,1,2],[2,1,0]);await snap(tag+"_practice");G.practice=null;
 G.target=15;G.mode="table";G.n=4;prepPlayers();startMatch();G.fin="p15";applyFin();G.scores=[13,7,9,3];result("cible",[0,1,2,3],[3,2,1,0]);await snap(tag+"_target");
 home();await snap(tag+"_home");modeScreen();await snap(tag+"_mode");countScreen();await snap(tag+"_count");G.mode="tour";countScreen();await snap(tag+"_count8");
 heroesScreen();await snap(tag+"_heroes");recordsScreen();await snap(tag+"_records");
 home();$("#how").onclick();await snap(tag+"_rules");document.querySelector(".ov").remove();
 G.mode="table";G.n=4;prepPlayers();startMatch();selectScreen();editName(0,()=>{});await snap(tag+"_name");document.querySelector(".ov").remove();
 pauseMenu();await snap(tag+"_pause");document.querySelector(".ov").remove();
 gageScreen(1,()=>{});await W(300);document.querySelector("#dk").click();await snap(tag+"_gage");
 trophyRoad(0,()=>{});await snap(tag+"_road");
 __cur="FINI"};
