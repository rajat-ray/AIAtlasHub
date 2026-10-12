import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools, categories } from '../../../data/tools';
import { categoryIntros, categorySlug } from '../../../data/category-content';

type Props={params:Promise<{slug:string}>};
const base=(process.env.NEXT_PUBLIC_SITE_URL || 'https://aiatlashub.rajat-ray.workers.dev').replace(/\/$/,'');
const slugify=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const lookup=(slug:string)=>categories.find(c=>c!=='All tools'&&categorySlug(c)===slug);
export function generateStaticParams(){return categories.filter(c=>c!=='All tools').map(c=>({slug:categorySlug(c)}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const category=lookup(slug);
 if(!category)return {title:'Category not found | AIAtlasHub',robots:{index:false}};
 return {title:`${category} Tools — Directory & Buying Guide | AIAtlasHub`,description:`${categoryIntros[category]||`Explore ${category.toLowerCase()} products`} Browse independent summaries and evaluation considerations.`,alternates:{canonical:`${base}/categories/${slug}`}};
}
export default async function CategoryPage({params}:Props){
 const {slug}=await params;const category=lookup(slug);if(!category)notFound();
 const matches=tools.filter(t=>t.category===category);
 return <main className="category-page"><div className="container"><Link href="/#category-explorer" className="learning-back">← All AI categories</Link><span className="section-label">THE AIATLAS DIRECTORY / {matches.length} TOOLS</span><h1>{category} tools</h1><p className="category-page-lead">{categoryIntros[category]||`Explore ${category.toLowerCase()} tools and compare how they support your workflow.`}</p><div className="category-page-grid">{matches.map(t=><article key={t.name}><span className="section-label">{t.pricing} · Indicative</span><h2><Link href={`/tools/${slugify(t.name)}`}>{t.name}</Link></h2><p>{t.description}</p><div className="category-page-tags">{t.tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href={`/tools/${slugify(t.name)}`}>Read independent assessment →</Link></article>)}</div><section className="category-buying"><h2>How to choose</h2><p>Shortlist tools that support your actual task. Test accuracy and usability with representative, non-sensitive inputs. Compare pricing, limits, integrations, accessibility, security and data retention before committing.</p><p>Listings are editorial discovery guidance, not sponsored rankings or independently benchmarked scores. Confirm current capabilities and pricing with vendors.</p></section><Link href="/" className="learning-back">← Return to AIAtlasHub</Link></div></main>
}
