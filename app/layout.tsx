import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'AIAtlasHub | Smarter Tools. Better Decisions.',description:'Discover AI tools by profession and workflow. Explore 50 editorial assessments, compare alternatives and find practical guides for students, developers, architects and teams.',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aiatlashub.rajat-ray.workers.dev'),alternates:{canonical:'/'},openGraph:{title:'AIAtlasHub — Smarter Tools. Better Decisions.',description:'Find the right AI tool for your workflow.',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
