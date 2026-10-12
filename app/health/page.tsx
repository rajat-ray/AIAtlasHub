import type {Metadata} from 'next';
import Link from 'next/link';
import {tools} from '../../data/tools';
import {toolVerifications} from '../../data/catalog-updates';
import LinkHealthReport from './LinkHealthReport';
import EditorialQueue from './EditorialQueue';

export const metadata:Metadata={title:'Catalog Health & Verification | AIAtlasHub',description:'Transparent catalog health: documented source checks, outstanding verification work, and an optional viewer for real URL scan reports.',alternates:{canonical:'/health'}};
export default function HealthPage(){
 const verified=tools.filter(t=>!!toolVerifications[t.name]);
 const unverified=tools.filter(t=>!toolVerifications[t.name]);
 const pricingChecked=verified.filter(t=>toolVerifications[t.name].scope.includes('pricing')).length;
 return <main className="health-page"><div className="container">
 <Link href="/" className="learning-back">← AIAtlasHub directory</Link><span className="section-label">EDITORIAL TRANSPARENCY</span><h1>Catalog health.</h1><p className="health-intro">Understand what has actually been checked, what still needs editorial review, and how to inspect genuine vendor-link scan results. No fabricated freshness or trust scores.</p>
 <div className="health-summary"><div><strong>{tools.length}</strong><span>Active listings</span></div><div><strong>{verified.length}</strong><span>Listings with documented source checks</span></div><div><strong>{unverified.length}</strong><span>Without dated source checks</span></div><div><strong>{pricingChecked}</strong><span>Pricing structures source-checked</span></div></div>
 <p className="health-method">Coverage means at least one recorded check against a cited vendor source. It does not certify a product or mean all listed information is current.</p>
 <EditorialQueue items={tools.map(t=>({name:t.name,category:t.category,pricing:t.pricing,featured:!!t.featured,checkedOn:toolVerifications[t.name]?.checkedOn||null,scope:toolVerifications[t.name]?.scope?[...toolVerifications[t.name].scope]:[]}))}/>
 <LinkHealthReport/>
 <p className="health-method">The scheduled scanner produces downloadable artifacts rather than writing unreviewed data into the live site. <a href="https://github.com/rajat-ray/AIAtlasHub/actions/workflows/vendor-link-health.yml" target="_blank" rel="noopener noreferrer">Open GitHub Actions scan history ↗</a></p>
 </div></main>;
}
