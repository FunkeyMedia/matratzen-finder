import type {Product} from './products';
export type Answers={size:string;feel:string;material:string;priority:string};
export const initialAnswers:Answers={size:'egal',feel:'egal',material:'egal',priority:'ausgewogen'};
export type Ranked={product:Product;score:number;reasons:string[];unknowns:string[]};
export function rankProducts(products:Product[],a:Answers):Ranked[]{
 return products.filter(p=>p.category==='matratze').map(product=>{
  let earned=0,possible=0;const reasons:string[]=[],unknowns:string[]=[];
  if(a.size!=='egal'){possible+=35;if(product.size.replace(/\s/g,'').startsWith(a.size.replace(/\s/g,''))){earned+=35;reasons.push('Die recherchierte Größe passt.')}else unknowns.push('Gewünschte Größe für diese Variante nicht belegt.')}
  if(a.feel!=='egal'){possible+=30;if(product.firmness?.includes(a.feel)){earned+=30;reasons.push(`Härtegrad ${a.feel} ist angegeben.`)}else if(!product.firmness)unknowns.push('Härtegrad nicht belegt.')}
  if(a.material!=='egal'){possible+=25;if(product.material===a.material){earned+=25;reasons.push(`${a.material} entspricht deiner Materialwahl.`)}else if(!product.material)unknowns.push('Material nicht belegt.')}
  possible+=10;if(a.priority==='hoehe'&&product.height&&product.height>=18){earned+=10;reasons.push(`${product.height} cm Höhe sind angegeben.`)}else if(a.priority==='pflege'&&product.features.some(x=>/waschbar|abnehmbar/i.test(x))){earned+=10;reasons.push('Der Bezug ist als abnehmbar oder waschbar beschrieben.')}else if(a.priority==='ausgewogen'){earned+=10;reasons.push('Grundlegende Produktmerkmale sind dokumentiert.')}
  return {product,score:Math.round(earned/possible*100),reasons,unknowns};
 }).sort((x,y)=>y.score-x.score||x.product.brand.localeCompare(y.product.brand));
}
