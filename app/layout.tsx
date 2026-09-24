import type {Metadata} from 'next';
import {Header,Footer} from '@/components/Brand';
import './globals.css';
const site=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
export const metadata:Metadata={metadataBase:new URL(site),title:{default:'Matratzen-Finder – passend schlafen beginnt mit Klarheit',template:'%s | Matratzen-Finder'},description:'Finde Matratzen nach Größe, Härtegrad und Material. Verständliche Kriterien, transparente Empfehlungen und klar gekennzeichnete Amazon-Partnerlinks.',openGraph:{type:'website',locale:'de_DE',siteName:'Matratzen-Finder'},robots:{index:false,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><body><a className="skip-link" href="#main">Zum Inhalt springen</a><Header/><main id="main">{children}</main><Footer/></body></html>}
