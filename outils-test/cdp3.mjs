import fs from "node:fs";
const [port,out,sizes]=process.argv.slice(2);const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let t;for(let i=0;i<40&&!t;i++){try{t=(await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(x=>x.type==="page")}catch(e){}if(!t)await sleep(250)}
const ws=new WebSocket(t.webSocketDebuggerUrl);let id=0;const pend=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id)}};
await new Promise(r=>ws.onopen=r);const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});
const ev=async e=>{const r=await send("Runtime.evaluate",{expression:e,awaitPromise:true,returnByValue:true});return r.result?.result?.value};
await send("Page.enable");const all={};
for(const sz of sizes.split(",")){const [w,h]=sz.split("x").map(Number);
 await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:1,mobile:true});await send("Emulation.setTouchEmulationEnabled",{enabled:true});
 await send("Page.navigate",{url:"http://localhost:8791/?qa="+Date.now()});await sleep(2500);
 await ev(fs.readFileSync(new URL(process.env.SCR||"./screens.js",import.meta.url),"utf8")+";firstGesture();'ok'");ev(`__run("${w}")`);
 const T0=Date.now();let last="";while(Date.now()-T0<8*60000){await sleep(200);const s=await ev("window.__shot");if(s&&s!==last){last=s;const r=await send("Page.captureScreenshot",{format:"jpeg",quality:60});fs.writeFileSync(`${out}/${s}.jpg`,Buffer.from(r.result.data,"base64"))}if(await ev("window.__cur")==="FINI")break}
 Object.assign(all,await ev("window.__clips"));all["_err_"+w]=await ev("[...new Set(__err)]")}
console.log(JSON.stringify(all,null,1));process.exit(0);
