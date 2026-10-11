import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'AI Tool Library | AIAtlasHub',description:'Explore, filter, compare and shortlist AI tools for coding, agents, automation, productivity and more.',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aiatlashub.rajat-ray.workers.dev'),alternates:{canonical:'/'},openGraph:{title:'AIAtlasHub — AI Tool Library',description:'Find the right AI tool for your workflow.',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
