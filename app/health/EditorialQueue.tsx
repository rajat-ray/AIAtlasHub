'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';

type Item={name:string;category:string;pricing:string;featured:boolean;checkedOn:string|null;scope:string[]};
const slugify=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export default function EditorialQueue({items}:{items:Item[]}){
 const [category,setCategory]=useState('All categories');
 const [status,setStatus]=useState('Unverified');
 const [query,setQuery]=useState('');
 const [order,setOrder]=useState('Featured first');
 const categories=['All categories',...Array.from(new Set(items.map(t=>t.category))).sort()];
 const filtered=useMemo(()=>{
  const matches=items.filter(t=>(category==='All categories'||t.category===category)&&(status==='All'||(status==='Unverified'?!t.checkedOn:!!t.checkedOn))&&t.name.toLowerCase().includes(query.trim().toLowerCase()));
  return matches.sort((a,b)=>order==='Alphabetical'?a.name.localeCompare(b.name):order==='Category'?a.category.localeCompare(b.category)||a.name.localeCompare(b.name):Number(b.featured)-Number(a.featured)||a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
 },[items,category,status,query,order]);
 return <section className="health-review" id="editorial-queue"><h2>Editorial review queue</h2><p>Filter the catalog to identify which listings still need documented vendor-source checks. Featured listings are prioritised for visibility, not automatically considered riskier.</p>
 <div className="queue-filters"><label>Search<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tool name"/></label><label>Category<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label><label>Verification<select value={status} onChange={e=>setStatus(e.target.value)}><option>Unverified</option><option>Verified</option><option>All</option></select></label><label>Sort<select value={order} onChange={e=>setOrder(e.target.value)}><option>Featured first</option><option>Category</option><option>Alphabetical</option></select></label></div>
 <p className="queue-count" aria-live="polite">{filtered.length} listing{filtered.length===1?'':'s'} match</p>
 <div className="queue-list">{filtered.map(t=><article key={t.name}><div><strong><Link href={`/tools/${slugify(t.name)}`}>{t.name}</Link></strong><p>{t.category} · {t.pricing}{t.featured?' · Featured':''}</p><small>{t.checkedOn?`Source check: ${t.checkedOn} · ${t.scope.join(', ')}`:'No dated vendor-source verification recorded'}</small></div><a className="queue-action" href={`https://github.com/rajat-ray/AIAtlasHub/issues/new?template=verify-listing.yml&title=${encodeURIComponent("[Verification] "+t.name)}`} target="_blank" rel="noopener noreferrer">Request review ↗</a></article>)}</div>
 {filtered.length===0&&<p>No listings match these filters.</p>}
 <div className="queue-guidance"><h3>Review requirements</h3><ol><li>Confirm the product identity and canonical official URL.</li><li>Check current pricing structure and plan limitations against official sources.</li><li>Verify advertised capabilities and flag product retirement or rebranding.</li><li>Record the date, exact sources and scope in <code>toolVerifications</code>.</li><li>Record actual listing edits separately in <code>catalogUpdates</code>; run the catalog audit and build before publishing.</li></ol><p>Review requests create public GitHub issues. A maintainer must evaluate sources, approve a pull request and merge changes before any public verification status changes.</p></div>
 </section>;
}
