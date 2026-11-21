window.__err=[];addEventListener("error",e=>__err.push(e.message+" @"+e.lineno));const W=ms=>new Promise(r=>setTimeout(r,ms));window.__clips={};window.__shot="";
window.__run=async(tag)=>{await W(900);splash();await W(1400);__shot=tag+"_splash";await W(500);__shot="";splashOut();await W(700);home();await W(1600);__shot=tag+"_home";await W(500);__shot="";
 __clips[tag+"_home"]=typeof __clip==="function"?__clip():[];
 const b=document.querySelector("#play");const r=b.getBoundingClientRect();b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true,clientX:r.left+30,clientY:r.top+20}));await W(120);__shot=tag+"_pop";await W(400);__shot="";__cur="FINI"};
