import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { CookieConsent } from "@/components/providers/CookieConsent";
import { RevealProvider } from "@/components/providers/RevealProvider";
import { JsonLd } from "@/components/jsonld/JsonLd";
import { autoRepairSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Constatare Daune RCA/CASCO București | VP Service Auto",
    template: "%s | VP Service Auto",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: SITE.name,
    images: [
      {
        url: IMAGES.ogImage.src,
        width: IMAGES.ogImage.width,
        height: IMAGES.ogImage.height,
        alt: IMAGES.ogImage.alt,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#e30613",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* FOUC-safe: reveal-urile se ascund doar dacă JS rulează */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={autoRepairSchema()} />
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        <Header />
        <RevealProvider>
          <main id="continut" className="flex-1">
            {children}
          </main>
        </RevealProvider>
        <Footer />
        <StickyCallBar />
        <CookieConsent />
      </body>
    </html>
  );
}
