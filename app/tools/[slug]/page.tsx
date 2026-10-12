import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools } from '../../../data/tools';
import { editorialReviews } from '../../../data/editorial';
import { categorySlug } from '../../../data/category-content';
import { toolHistory, toolVerifications } from '../../../data/catalog-updates';

const slugify=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return tools.map(t=>({slug:slugify(t.name)}));}
// Let Next.js handle unknown slugs through notFound() without an adapter fallback conflict.
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const t=tools.find(t=>slugify(t.name)===slug);
 if(!t)return {title:'Tool not found | AIAtlasHub'};
 return {title:`${t.name} — Overview, Strengths & Limitations | AIAtlasHub`,description:`Explore ${t.name}: ${t.description} Learn about use cases, limitations and important evaluation criteria.`,alternates:{canonical:`/tools/${slug}`}};
}
export default async function ToolPage({params}:Props){
 const {slug}=await params;const t=tools.find(t=>slugify(t.name)===slug);if(!t)notFound();
 const review=editorialReviews[t.name];
 const history=toolHistory(t.name);
 const verification=toolVerifications[t.name];
 return <main style={{maxWidth:960,margin:'0 auto',padding:'48px 24px 100px',lineHeight:1.75}}>
 <Link href="/#directory">← Browse all AI tools</Link>
 <p style={{marginTop:32,fontSize:13,letterSpacing:1,textTransform:'uppercase'}}><Link href={`/categories/${categorySlug(t.category)}`}>{t.category}</Link></p>
 <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)',lineHeight:1.15,margin:'12px 0'}}>{t.name}</h1>
 <p style={{fontSize:19}}>{t.description}</p>
 <p><strong>Pricing model:</strong> {t.pricing} (indicative; verify with vendor)</p>
 <p><strong>Relevant topics:</strong> {t.tags.join(', ')}</p>
 <a href={t.url} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',margin:'16px 0 28px'}}>Visit official website ↗</a>
 <section><h2>Editorial analysis</h2>
 {review?<><h3>Best for</h3><p>{review.bestFor}</p>
 <h3>Potential strengths</h3><ul>{review.strengths.map(x=><li key={x}>{x}</li>)}</ul>
 <h3>Limitations and trade-offs</h3><ul>{review.tradeoffs.map(x=><li key={x}>{x}</li>)}</ul>
 <h3>AIAtlasHub perspective</h3><p>{review.verdict}</p>
 <h3>What to verify before buying</h3><p>{review.checkBeforeBuying}</p></>
 :<><p>This product has not yet received a detailed editorial assessment. Use the questions below to evaluate its suitability.</p>
 <h3>Evaluation checklist</h3><ul><li>Does the product support your actual workflow and integrations?</li><li>What are the usage limits, total costs and cancellation terms?</li><li>How are data privacy, retention and access controls handled?</li><li>Can you validate output quality with representative tasks?</li></ul></>}
 </section>
 <section className="tool-freshness" aria-label="Listing freshness and sources"><h2>Listing freshness &amp; source checks</h2>
 {history.length>0?<><p><strong>Last documented AIAtlasHub listing update:</strong> <time dateTime={history[0].date}>{history[0].date}</time></p><ul>{history.map((entry,i)=><li key={entry.date+'-'+i}><strong>{entry.title}</strong> — {entry.summary}</li>)}</ul></>:<p><strong>Last documented listing update:</strong> Not yet recorded in the dated change log.</p>}
 {verification?<><p><strong>Vendor information checked:</strong> <time dateTime={verification.checkedOn}>{verification.checkedOn}</time> ({verification.scope.join(', ')})</p><p>{verification.note}</p><ul>{verification.sourceUrls.map(url=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>)}</ul></>:<p><strong>Vendor information independently re-verified:</strong> No dated, source-backed verification record is available for this listing.</p>}
 <p>Catalog edits are not vendor launch dates, and a listed website is not proof that prices, features, privacy or security terms remain current. <Link href="/updates">Read our editorial update log →</Link></p>
 </section>
 <section style={{marginTop:36,borderTop:'1px solid #777',paddingTop:20}}>
 <h2>About this assessment</h2><p>AIAtlasHub provides independent, qualitative discovery guidance. These notes are not hands-on benchmarks, verified customer reviews or endorsements. Product details may change. Confirm pricing, security and features with the vendor.</p>
 </section>
 <section className="tool-related"><h2>Explore related tools</h2><div>{tools.filter(other=>other.category===t.category&&other.name!==t.name).slice(0,4).map(other=><Link key={other.name} href={`/tools/${slugify(other.name)}`}><strong>{other.name}</strong><span>{other.pricing} · {other.category}</span></Link>)}</div><p><Link href={`/categories/${categorySlug(t.category)}`}>Browse all {t.category} tools →</Link></p></section>
 <Link href="/#directory">← Back to directory</Link>
 </main>;
}
