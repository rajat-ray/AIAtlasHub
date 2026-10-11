import type { MetadataRoute } from 'next';
import { tools } from '../data/tools';
const base=(process.env.NEXT_PUBLIC_SITE_URL || 'https://51c23db8-aiatlashub.rajat-ray.workers.dev').replace(/\/$/,'');
const slug=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export default function sitemap():MetadataRoute.Sitemap{
 return [{url:base,changeFrequency:'weekly',priority:1},...tools.map(t=>({url:`${base}/tools/${slug(t.name)}`,changeFrequency:'monthly' as const,priority:0.7}))];
}
