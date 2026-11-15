import fs from "node:fs";
const [port,out,harness,startExpr,maxMin]=process.argv.slice(2);const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let t;for(let i=0;i<40&&!t;i++){try{t=(await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(x=>x.type==="page")}catch(e){}if(!t)await sleep(250)}
const ws=new WebSocket(t.webSocketDebuggerUrl);let id=0;const pend=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id)}};
await new Promise(r=>ws.onopen=r);const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});
const ev=async e=>{const r=await send("Runtime.evaluate",{expression:e,awaitPromise:true,returnByValue:true});return r.result?.result?.value};
await send("Emulation.setDeviceMetricsOverride",{width:375,height:812,deviceScaleFactor:1,mobile:true});await send("Emulation.setTouchEmulationEnabled",{enabled:true});
await send("Page.enable");await send("Page.navigate",{url:"http://localhost:8791/?qa="+Date.now()});await sleep(3000);
await ev(fs.readFileSync(harness,"utf8")+";firstGesture();'ok'");await ev(startExpr+";1");
const T0=Date.now();let last="";
while(Date.now()-T0<(+maxMin||10)*60000){await sleep(250);const s=await ev("window.__shot");if(s&&s!==last){last=s;await sleep(900);const r=await send("Page.captureScreenshot",{format:"jpeg",quality:70});fs.writeFileSync(`${out}/${s}.jpg`,Buffer.from(r.result.data,"base64"))}
  if(await ev("window.__cur")==="FINI")break}
console.log(await ev("JSON.stringify({res:window.__res||[],seen:window.__seen||{},err:[...new Set(__err)]})"));process.exit(0);
