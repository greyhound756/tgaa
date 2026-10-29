import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { site } from "@/lib/content";
import "./globals.css";

const archivo = localFont({
  src: "./fonts/archivo.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const plexMono = localFont({
  src: [
    { path: "./fonts/plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL to the production domain before launch.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Chicago, Illinois`,
    template: `%s | ${site.short} Engineering & Construction`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/brand/vechtel-logo-640.png", width: 640, height: 640, alt: "VECHTEL logo" }],
  },
  twitter: { card: "summary", title: site.name, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#151719",
  width: "device-width",
  initialScale: 1,
};

const bootScript = `(function(){
var d=document.documentElement;d.classList.add('js');
try{
  var p=location.pathname, q=location.search;
  var home=p==='/'||p==='/index.html';
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var force=/[?&]intro\\b/.test(q);
  var seen=sessionStorage.getItem('vechtel-intro');
  if(home&&(force||(!rm&&!seen))){d.classList.add('intro-on','intro-hold');d.style.setProperty('--intro-k',String(Math.min(innerWidth*0.8,innerHeight*0.62,540)/500));}
}catch(e){}
window.addEventListener('error',function(e){
  var t=e.target;if(!t||t.tagName!=='IMG')return;
  var list=(t.getAttribute('data-fb')||'').split('|').filter(Boolean);
  if(list.length){t.removeAttribute('srcset');t.setAttribute('data-fb',list.slice(1).join('|'));t.src=list[0];}
  else{t.style.opacity='0';}
},true);
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: enables JS-only animations, decides on the logo intro,
            and swaps in fallback photos if an image fails to load. */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
