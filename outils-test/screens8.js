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
 for(const f of ["noel","anniv","foot","classique"]){G.fete=f;applyFete();home();await W(800);await snap(tag+"_home_"+f)}
 G.fete="noel";applyFete();G.teamsOn=true;G.mode="table";G.n=4;prepPlayers();startMatch();G.scores=[6,3,5,8];G.round=4;G.st.forEach((s,i)=>{s.w=i;s.cat={vite:i}});
 selectScreen();await snap(tag+"_team_select");
 result("cible",[0,1,2,3],[3,2,1,0]);await snap(tag+"_team_result");
 podium();await snap(tag+"_team_podium");recapScreen();await W(2000);await snap(tag+"_team_recap");
 G.mode="tour";G.n=6;prepPlayers();startMatch();G.scores=[6,3,5,8,2,4];G.round=4;
 resultList("helico",[0,1,2,3,4,5],[5,4,3,2,1,0],["9 m","8 m","7 m","6 m","5 m","4 m"]);await W(2500);await snap(tag+"_team_rlist");podiumList();await snap(tag+"_team_plist");
 G.teamsOn=false;G.fete="classique";applyFete();G.mode="table";G.n=2;prepPlayers();startMatch();gamesScreen();await snap(tag+"_games");
 roulette();await W(3200);await snap(tag+"_roul");
 __cur="FINI"};