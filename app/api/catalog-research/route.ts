import {timingSafeEqual} from 'node:crypto';
import {NextRequest, NextResponse} from 'next/server';
export const dynamic='force-dynamic';
export const maxDuration=60;
export async function POST(req:NextRequest){
 const secret=process.env.CATALOG_RESEARCH_SECRET;
 const expected=Buffer.from(`Bearer ${secret||''}`),actual=Buffer.from(req.headers.get('authorization')||'');
 if(!secret||actual.length!==expected.length||!timingSafeEqual(actual,expected))return NextResponse.json({error:'not_found'},{status:404});
 let input;try{input=await req.json()}catch{return NextResponse.json({error:'invalid_request'},{status:400})}
 const operation=input.operation;
 if(!['searchItems','getItems','getVariations'].includes(operation))return NextResponse.json({error:'invalid_operation'},{status:400});
 const resources=['itemInfo.title','itemInfo.byLineInfo','itemInfo.features','itemInfo.productInfo','parentASIN'];
 let request:Record<string,unknown>={resources};
 if(operation==='searchItems'){
  if(typeof input.keywords!=='string'||input.keywords.length<3||input.keywords.length>100||!Number.isInteger(input.page)||input.page<1||input.page>10)return NextResponse.json({error:'invalid_search'},{status:400});
  request={...request,keywords:input.keywords,itemCount:10,itemPage:input.page};
 }else if(operation==='getItems'){
  if(!Array.isArray(input.ids)||!input.ids.length||input.ids.length>10||!input.ids.every((id:unknown)=>typeof id==='string'&&/^[A-Z0-9]{10}$/.test(id)))return NextResponse.json({error:'invalid_items'},{status:400});
  request={...request,itemIds:input.ids};
 }else{
  if(typeof input.asin!=='string'||!/^[A-Z0-9]{10}$/.test(input.asin))return NextResponse.json({error:'invalid_asin'},{status:400});
  request={...request,asin:input.asin,variationCount:10,variationPage:1};
 }
 const response=await fetch(process.env.AMAZON_GATEWAY_URL||'https://boxershorts-finder.de/api/matratzen-gateway',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.AMAZON_GATEWAY_SECRET}`},body:JSON.stringify({operation,request}),signal:AbortSignal.timeout(45000),cache:'no-store'});
 const data=await response.json();
 return NextResponse.json(data,{status:response.status,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
}
