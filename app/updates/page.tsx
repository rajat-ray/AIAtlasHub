import type {Metadata} from 'next';
import Link from 'next/link';
import {catalogUpdates} from '../../data/catalog-updates';
import {tools} from '../../data/tools';
const slugify=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const metadata:Metadata={
 title:'Directory Updates & Editorial Change Log | AIAtlasHub',
 description:'Dated AIAtlasHub catalog and editorial updates, with a clear distinction between site changes and vendor verification.',
 alternates:{canonical:'/updates'}
};
export default function UpdatesPage(){
 return <main className="updates-page"><div className="container">
 <Link href="/" className="learning-back">← AIAtlasHub directory</Link>
 <span className="section-label">EDITORIAL TRANSPARENCY</span>
 <h1>Directory updates.</h1>
 <p className="updates-lead">A dated record of changes made to AIAtlasHub. These dates describe our own editorial and site updates, not product launch dates. A listing is not considered independently re-verified unless an update explicitly documents that verification.</p>
 <div className="updates-timeline">{catalogUpdates.map((item,i)=><article key={item.date+'-'+i}>
 <time dateTime={item.date}>{new Date(item.date+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}</time>
 <span className="updates-kind">{item.kind==='site'?'Site improvement':item.kind==='editorial'?'Editorial revision':'Catalog change'}</span>
 <h2>{item.title}</h2><p>{item.summary}</p>
 {item.toolNames.length>0&&<div className="updates-tools">{item.toolNames.map(name=>tools.some(t=>t.name===name)?<Link key={name} href={`/tools/${slugify(name)}`}>{name} →</Link>:<span key={name}>{name}</span>)}</div>}
 </article>)}</div>
 <section className="updates-explainer"><h2>What our dates mean</h2><p><strong>Directory updated:</strong> AIAtlasHub changed a listing or feature on the date shown. <strong>Vendor verified:</strong> only when a dated update explicitly says the relevant official source was checked. <strong>Vendor launched:</strong> not implied by either label.</p><p>Suggest a correction with a public authoritative source using our <a href="https://github.com/rajat-ray/AIAtlasHub/issues/new?template=correct-listing.yml" target="_blank" rel="noopener noreferrer">listing correction form</a>.</p></section>
 </div></main>;
}
