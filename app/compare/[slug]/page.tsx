import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {comparisons} from '../../../data/comparisons';
import {tools} from '../../../data/tools';
import {editorialReviews} from '../../../data/editorial';
type Props={params:Promise<{slug:string}>};
const slugify=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function generateStaticParams(){return comparisons.map(c=>({slug:c.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const c=comparisons.find(x=>x.slug===slug);if(!c)return {title:'Comparison not found | AIAtlasHub',robots:{index:false}};return {title:`${c.first} vs ${c.second} — AI Tool Comparison | AIAtlasHub`,description:c.intro,alternates:{canonical:`/compare/${slug}`}};}
export default async function ComparisonPage({params}:Props){
 const {slug}=await params;const c=comparisons.find(x=>x.slug===slug);if(!c)notFound();
 const entries=[c.first,c.second].map(name=>({name,tool:tools.find(t=>t.name===name),review:editorialReviews[name]}));
 return <main className="compare-page"><div className="container"><Link href="/compare" className="learning-back">← All comparisons</Link><span className="section-label">{c.focus}</span><h1>{c.first} vs {c.second}</h1><p className="compare-lead">{c.intro}</p><div className="compare-side-by-side">{entries.map(e=><article key={e.name}><h2>{e.name}</h2><p>{e.tool?.description||'Review the official product website for current capabilities.'}</p><p><strong>Pricing:</strong> {e.tool?.pricing||'Check vendor'} (indicative)</p><h3>Best suited to</h3><p>{e.review?.bestFor||'Evaluate against your intended workflow.'}</p><h3>Potential strengths</h3><ul>{(e.review?.strengths||[]).map(x=><li key={x}>{x}</li>)}</ul><h3>Limitations and trade-offs</h3><ul>{(e.review?.tradeoffs||[]).map(x=><li key={x}>{x}</li>)}</ul><h3>What to verify</h3><p>{e.review?.checkBeforeBuying||'Pricing, access, privacy and output quality.'}</p>{e.tool&&<Link href={`/tools/${slugify(e.name)}`}>Read full assessment →</Link>}</article>)}</div><section className="compare-criteria"><h2>How to make the decision</h2><p>Try both products on the same representative, non-sensitive task. Record your evidence for these decision criteria:</p><ol>{c.criteria.map(x=><li key={x}>{x}</li>)}</ol><p>Neither tool is universally better. Match your choice to workflow fit, security requirements and total cost.</p></section><p className="compare-disclaimer">Independent editorial guidance, not a laboratory benchmark, sponsored ranking or verification of current vendor features. Confirm prices and product terms with vendors.</p><Link href="/compare" className="learning-back">← Browse more comparisons</Link></div></main>;
}
