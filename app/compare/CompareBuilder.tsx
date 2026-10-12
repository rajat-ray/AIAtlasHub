'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {tools} from '../../data/tools';
import {editorialReviews} from '../../data/editorial';

const slugify=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export default function CompareBuilder(){
 const [first,setFirst]=useState('ChatGPT');
 const [second,setSecond]=useState('Claude');
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('All tools');
 const choices=useMemo(()=>tools.filter(t=>(category==='All tools'||t.category===category)&&t.name.toLowerCase().includes(query.trim().toLowerCase())),[category,query]);
 const a=tools.find(t=>t.name===first);
 const b=tools.find(t=>t.name===second);
 const valid=!!a&&!!b&&a.name!==b.name;
 const selected=valid?[a!,b!]:[];
 const categories=['All tools',...Array.from(new Set(tools.map(t=>t.category)))];
 return <section className="compare-builder" id="compare-builder">
 <span className="section-label">BUILD YOUR OWN COMPARISON</span><h2>Choose any two tools.</h2>
 <p>Compare directory metadata and editorial assessments side by side. No generated scores or unsupported winner claims.</p>
 <div className="compare-builder-controls"><label>First tool<select value={first} onChange={e=>setFirst(e.target.value)}>{tools.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}</select></label><label>Second tool<select value={second} onChange={e=>setSecond(e.target.value)}>{tools.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}</select></label><button type="button" onClick={()=>{setFirst(second);setSecond(first)}}>Swap tools ↔</button></div>
 {!valid?<p role="alert" className="compare-builder-error">Choose two different tools to compare.</p>:<div className="compare-builder-results">
 <div className="compare-builder-heading"><span>Comparison criteria</span>{selected.map(t=><strong key={t.name}>{t.name}</strong>)}</div>
 <div className="compare-builder-row"><strong>Category</strong>{selected.map(t=><span key={t.name}>{t.category}</span>)}</div>
 <div className="compare-builder-row"><strong>Pricing model</strong>{selected.map(t=><span key={t.name}>{t.pricing} (indicative)</span>)}</div>
 <div className="compare-builder-row"><strong>Overview</strong>{selected.map(t=><span key={t.name}>{t.description}</span>)}</div>
 <div className="compare-builder-row"><strong>Best suited to</strong>{selected.map(t=><span key={t.name}>{editorialReviews[t.name]?.bestFor||'Evaluate for your intended workflow.'}</span>)}</div>
 <div className="compare-builder-row"><strong>Potential strengths</strong>{selected.map(t=><span key={t.name}>{editorialReviews[t.name]?.strengths.join('; ')||'Not assessed yet.'}</span>)}</div>
 <div className="compare-builder-row"><strong>Trade-offs</strong>{selected.map(t=><span key={t.name}>{editorialReviews[t.name]?.tradeoffs.join('; ')||'Not assessed yet.'}</span>)}</div>
 <div className="compare-builder-row"><strong>Before buying</strong>{selected.map(t=><span key={t.name}>{editorialReviews[t.name]?.checkBeforeBuying||'Verify current terms.'}</span>)}</div>
 <div className="compare-builder-row"><strong>Read more</strong>{selected.map(t=><Link key={t.name} href={`/tools/${slugify(t.name)}`}>Full {t.name} assessment →</Link>)}</div>
 </div>}
 <p className="compare-builder-note">Comparisons reflect qualitative editorial notes and indicative pricing. They are not hands-on benchmarks. Check vendor terms before purchasing.</p>
 <details className="compare-builder-browser"><summary>Browse tools before choosing</summary><div className="compare-builder-browser-controls"><input aria-label="Search tools" placeholder="Search tool names" value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Filter tools by category" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div><div className="compare-builder-choices">{choices.map(t=><div key={t.name}><span>{t.name} <small>{t.category}</small></span><button type="button" onClick={()=>setFirst(t.name)}>Set first</button><button type="button" onClick={()=>setSecond(t.name)}>Set second</button></div>)}</div></details>
 </section>;
}
