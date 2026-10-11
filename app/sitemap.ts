import type { MetadataRoute } from 'next';

// Only list verified, publicly accessible pages. Individual /tools/[slug]
// routes are temporarily excluded until Cloudflare routing is repaired.
// The homepage currently provides tool reviews via ?tool=... modals;
// those query-based views are not standalone indexable pages.
const base=(process.env.NEXT_PUBLIC_SITE_URL || 'https://aiatlashub.rajat-ray.workers.dev').replace(/\/$/,'');
export default function sitemap():MetadataRoute.Sitemap {
  return [{url:base,changeFrequency:'weekly',priority:1}];
}
