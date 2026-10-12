import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title:'AIAtlasHub | Smarter Tools. Better Decisions.',
 description:'Explore 100 AI tools across 15 categories, read independent editorial assessments and find practical guides for your work.',
 metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aiatlashub.rajat-ray.workers.dev'),
 openGraph:{title:'AIAtlasHub — Smarter Tools. Better Decisions.',description:'Find the right AI tool for your workflow.',type:'website'}
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
