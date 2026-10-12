import type { MetadataRoute } from 'next';
import { tools, categories } from '../data/tools';
import { categorySlug } from '../data/category-content';

const base=(process.env.NEXT_PUBLIC_SITE_URL || 'https://aiatlashub.rajat-ray.workers.dev').replace(/\/$/,'');
const slugify=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

// Submit this sitemap to search engines only after deployment and live
// verification of /tools/[slug] routes (see scripts/check-public-routes.py).
export default function sitemap():MetadataRoute.Sitemap {
  return [
    {url:base,changeFrequency:'weekly',priority:1},
    {url:`${base}/learn`,changeFrequency:'monthly',priority:0.8},
    ...categories.filter(c=>c!=='All tools').map(c=>({url:`${base}/categories/${categorySlug(c)}`,changeFrequency:'monthly' as const,priority:0.8})),
    ...tools.map(t=>({url:`${base}/tools/${slugify(t.name)}`,changeFrequency:'monthly' as const,priority:0.7}))
  ];
}
