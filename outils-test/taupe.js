window.__err=[];const W=ms=>new Promise(r=>setTimeout(r,ms));window.__clips={};window.__shot="";
window.__run=async(tag)=>{G.mode="table";G.n=2;prepPlayers();startMatch();play("taupe");await W(7000);__shot=tag+"_t2";await W(500);__shot="";G.n=4;prepPlayers();startMatch();play("taupe");await W(9000);__shot=tag+"_t4";await W(500);__shot="";__cur="FINI"};
