import {mkdir,writeFile} from 'node:fs/promises';
const id=process.env.AMAZON_CREDENTIAL_ID,secret=process.env.AMAZON_CREDENTIAL_SECRET;
if(!id||!secret){console.error('AMAZON_CREDENTIAL_ID and AMAZON_CREDENTIAL_SECRET are required');process.exit(2)}
const groups={
 matratze:['Kaltschaummatratze 90x200','Kaltschaummatratze 140x200','Taschenfederkernmatratze 90x200','Taschenfederkernmatratze 140x200','Latexmatratze 90x200','Viscoschaummatratze 140x200','Matratze H2 90x200','Matratze H3 90x200','Matratze H4 90x200','Matratze 180x200','Matratze 160x200','Matratze 100x200','Matratze 120x200','Matratze 80x200','Matratze 200x200','Wendematratze H2 H3','Matratze Federkern 7 Zonen','Matratze Kaltschaum 7 Zonen'],
 zubehoer:['Matratzentopper 90x200','Matratzentopper 140x200','Matratzenschoner wasserdicht','Matratzenbezug 90x200','Nackenstützkissen','Schlafkissen ergonomisch','Lattenrost 90x200','Matratzenauflage 140x200','Matratzen Pflege']
};
const auth=await fetch('https://api.amazon.co.uk/auth/o2/token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({grant_type:'client_credentials',client_id:id,client_secret:secret,scope:'creatorsapi::default'})});
if(!auth.ok)throw new Error('Amazon authentication failed: '+auth.status);
const bearer=(await auth.json()).access_token;
const candidates=new Map();let last=0;let calls=0;
for(const [category,queries] of Object.entries(groups))for(const keywords of queries)for(let itemPage=1;itemPage<=10;itemPage++){
 const delay=Math.max(0,1200-(Date.now()-last));if(delay)await new Promise(r=>setTimeout(r,delay));last=Date.now();
 const response=await fetch('https://creatorsapi.amazon/catalog/v1/searchItems',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+bearer,'x-marketplace':'www.amazon.de'},body:JSON.stringify({marketplace:'www.amazon.de',partnerTag:'onlinestarkei-21',keywords,itemCount:10,itemPage,resources:['itemInfo.title']})});calls++;
 if(response.status===429){console.error('Rate limit reached; stop and rerun later');break}
 if(!response.ok){console.error('Search failed',keywords,itemPage,response.status);break}
 const data=await response.json();const items=data.searchResult?.items||[];
 for(const item of items)if(/^[A-Z0-9]{10}$/.test(item.asin)&&!candidates.has(item.asin))candidates.set(item.asin,{asin:item.asin,category,query:keywords});
 if(items.length<10)break;
}
await mkdir('research',{recursive:true});
const payload={generatedAt:new Date().toISOString(),note:'Unreviewed ASIN candidates only. Do not publish without identity and model verification.',calls,candidates:[...candidates.values()]};
await writeFile('research/candidates.json',JSON.stringify(payload,null,2));
console.log('ASIN candidates:',payload.candidates.length,'API calls:',calls,'matresses:',payload.candidates.filter(x=>x.category==='matratze').length,'accessories:',payload.candidates.filter(x=>x.category==='zubehoer').length);
