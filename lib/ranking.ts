import type {Product} from './products';
export type Answers={size:string;feel:string;material:string;priority:string};
export const initialAnswers:Answers={size:'egal',feel:'egal',material:'egal',priority:'ausgewogen'};
export function normalizeAnswers(value:unknown):Answers{
 const input=value&&typeof value==='object'?value as Record<string,unknown>:{};
 const allowed:Record<keyof Answers,string[]>={size:['egal','90 × 200','140 × 200'],feel:['egal','H2','H3'],material:['egal','Kaltschaum','Taschenfederkern'],priority:['ausgewogen','hoehe','pflege']};
 const answers={...initialAnswers};
 for(const key of Object.keys(allowed) as (keyof Answers)[]){if(typeof input[key]==='string'&&allowed[key].includes(input[key] as string))answers[key]=input[key] as string;}
 return answers;
}
export const matchesSize=(product:Product,size:string)=>size==='egal'||product.size.replace(/\s/g,'')===`${size.replace(/\s/g,'')}cm`;
export type Ranked={product:Product;score:number|null;reasons:string[];unknowns:string[];mismatches:string[]};
export function rankProducts(products:Product[],a:Answers):Ranked[]{
 return products.filter(p=>p.category==='matratze').map(product=>{
  let earned=0,possible=0;const reasons:string[]=[],unknowns:string[]=[],mismatches:string[]=[];
  if(a.size!=='egal'){possible+=35;if(matchesSize(product,a.size)){earned+=35;reasons.push('Die recherchierte Größe passt.')}else mismatches.push('Die recherchierte Größe weicht von deiner Auswahl ab.')}
  if(a.feel!=='egal'){possible+=30;if(product.firmness?.includes(a.feel)){earned+=30;reasons.push(`Härtegrad ${a.feel} ist angegeben.`)}else if(!product.firmness)unknowns.push('Härtegrad nicht belegt.');else mismatches.push(`Angegeben ist ${product.firmness.join(' / ')}, gewünscht ist ${a.feel}.`)}
  if(a.material!=='egal'){possible+=25;if(product.material===a.material){earned+=25;reasons.push(`${a.material} entspricht deiner Materialwahl.`)}else if(!product.material)unknowns.push('Material nicht belegt.');else mismatches.push(`Angegeben ist ${product.material}, gewünscht ist ${a.material}.`)}
  if(a.priority==='hoehe'){possible+=10;if(product.height&&product.height>=18){earned+=10;reasons.push(`${product.height} cm Höhe sind angegeben.`)}else if(product.height)mismatches.push(`${product.height} cm liegen unter deinen gewünschten 18 cm.`);else unknowns.push('Höhe nicht belegt.')}
  if(a.priority==='pflege'){possible+=10;if(product.features.some(x=>/waschbar|abnehmbar/i.test(x))){earned+=10;reasons.push('Der Bezug ist als abnehmbar oder waschbar beschrieben.')}else unknowns.push('Abnehmbarer oder waschbarer Bezug nicht belegt.')}
  return {product,score:possible?Math.round(earned/possible*100):null,reasons,unknowns,mismatches};
 }).sort((x,y)=>(y.score??0)-(x.score??0)||x.product.brand.localeCompare(y.product.brand));
}
