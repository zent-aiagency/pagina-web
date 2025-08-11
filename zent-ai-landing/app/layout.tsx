import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zent AI - Automatización Inteligente con n8n | Agencia de IA",
  description:
    "Transformamos procesos manuales en sistemas automatizados inteligentes. Especialistas en n8n, bots de WhatsApp, integraciones API y agentes de IA. Consultoría gratuita.",
  keywords: [
    "automatización",
    "n8n",
    "inteligencia artificial",
    "bots WhatsApp",
    "integración API",
    "automatización de procesos",
    "agentes IA",
    "consultoría automatización",
    "Buenos Aires",
    "Argentina",
  ],
  authors: [{ name: "Zent AI" }],
  creator: "Zent AI",
  publisher: "Zent AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://zentai.agency",
    siteName: "Zent AI",
    title: "Zent AI - Automatización Inteligente con n8n",
    description:
      "Transformamos procesos manuales en sistemas automatizados inteligentes. Especialistas en n8n, bots de WhatsApp e integraciones API.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zent AI - Automatización Inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zent AI - Automatización Inteligente con n8n",
    description: "Transformamos procesos manuales en sistemas automatizados inteligentes.",
    images: ["/og-image.jpg"],
    creator: "@zentai",
  },
  verification: {
    google: "tu-codigo-de-verificacion-google",
    // yandex: 'tu-codigo-yandex',
    // yahoo: 'tu-codigo-yahoo',
  },
  alternates: {
    canonical: "https://zentai.agency",
  },
  category: "technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zent AI",
              description:
                "Agencia especializada en automatización inteligente con n8n, bots de WhatsApp e integraciones API",
              url: "https://zentai.agency",
              logo: "https://zentai.agency/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+54-9-11-1234-5678",
                contactType: "customer service",
                availableLanguage: "Spanish",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Buenos Aires",
                addressCountry: "AR",
              },
              sameAs: [
                "https://linkedin.com/company/zentai",
                "https://twitter.com/zentai",
                "https://instagram.com/zentai",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}

        {/* Analytics Scripts */}
        {process.env.NODE_ENV === "production" && (
          <>
            {/* Google Analytics */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />

            {/* Meta Pixel */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
