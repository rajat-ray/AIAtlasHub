'use client';
import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import {tools} from '../../data/tools';
import {editorialReviews} from '../../data/editorial';

const slugify=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export default function CompareBuilder(){
 const [first,setFirst]=useState('ChatGPT');
 const [second,setSecond]=useState('Claude');
 const [shareStatus,setShareStatus]=useState('');
 const [query,setQuery]=useState('');
 function readSelection(){
  const params=new URLSearchParams(window.location.search);
  const one=tools.find(t=>slugify(t.name)===params.get('first'));
  const two=tools.find(t=>slugify(t.name)===params.get('second'));
  setFirst(one?.name||'ChatGPT');setSecond(two?.name||'Claude');
 }
 useEffect(()=>{readSelection();window.addEventListener('popstate',readSelection);return()=>window.removeEventListener('popstate',readSelection)},[]);
 function updateSelection(one:string,two:string){
  setFirst(one);setSecond(two);setShareStatus('');
  const url=new URL(window.location.href);
  url.searchParams.set('first',slugify(one));url.searchParams.set('second',slugify(two));
  window.history.replaceState(window.history.state,'',url.pathname+url.search+url.hash);
 }
 async function shareComparison(){
  if(!valid)return;
  const url=new URL(window.location.href);
  url.searchParams.set('first',slugify(first));url.searchParams.set('second',slugify(second));
  try{
   await navigator.clipboard.writeText(url.toString());
   setShareStatus('Comparison link copied.');
  }catch{setShareStatus('Copy the URL from your browser address bar to share this comparison.')}
 }
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
 <div className="compare-builder-controls"><label>First tool<select value={first} onChange={e=>updateSelection(e.target.value,second)}>{tools.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}</select></label><label>Second tool<select value={second} onChange={e=>updateSelection(first,e.target.value)}>{tools.map(t=><option key={t.name} value={t.name}>{t.name}</option>)}</select></label><button type="button" onClick={()=>updateSelection(second,first)}>Swap tools ↔</button><button type="button" disabled={!valid} onClick={shareComparison}>Copy share link ↗</button></div><p role="status" aria-live="polite" className="compare-share-status">{shareStatus}</p>
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
 <details className="compare-builder-browser"><summary>Browse tools before choosing</summary><div className="compare-builder-browser-controls"><input aria-label="Search tools" placeholder="Search tool names" value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Filter tools by category" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div><div className="compare-builder-choices">{choices.map(t=><div key={t.name}><span>{t.name} <small>{t.category}</small></span><button type="button" onClick={()=>updateSelection(t.name,second)}>Set first</button><button type="button" onClick={()=>updateSelection(first,t.name)}>Set second</button></div>)}</div></details>
 </section>;
}
