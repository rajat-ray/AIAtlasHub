import type { MetadataRoute } from 'next';
const base=(process.env.NEXT_PUBLIC_SITE_URL || 'https://51c23db8-aiatlashub.rajat-ray.workers.dev').replace(/\/$/,'');
export default function robots():MetadataRoute.Robots{
 return {rules:[{userAgent:'*',allow:'/'}],sitemap:`${base}/sitemap.xml`};
}
