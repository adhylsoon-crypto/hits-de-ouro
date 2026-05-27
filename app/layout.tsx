import type { Metadata } from "next";
import "./globals.css";
import HeaderClient from "./HeaderClient";
import FooterClient from "./FooterClient";
import { ThemeProvider } from "./ThemeProvider";
import { LocaleProvider } from "./LocaleProvider";

export const metadata: Metadata = {
  title: {
    default: 'Hits de Ouro - Letras de Musicas',
    template: '%s | Hits de Ouro',
  },
  description: 'Encontre letras das suas musicas favoritas. Gospel, Sertanejo, Pop, Rock e muito mais no Hits de Ouro.',
  keywords: ['letras de musicas', 'hits de ouro', 'letras', 'musicas brasileiras', 'gospel', 'sertanejo'],
  authors: [{ name: 'Hits de Ouro' }],
  creator: 'Hits de Ouro',
  metadataBase: new URL('https://www.hitsdeouroletras.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.hitsdeouroletras.com.br',
    siteName: 'Hits de Ouro',
    title: 'Hits de Ouro - Letras de Musicas',
    description: 'Encontre letras das suas musicas favoritas. Gospel, Sertanejo, Pop, Rock e muito mais.',
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'Hits de Ouro' }],
  },
  twitter: {
    card: 'summary',
    title: 'Hits de Ouro - Letras de Musicas',
    description: 'Encontre letras das suas musicas favoritas.',
    images: ['/logo.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'XZkS3JBUmTj0eevJE0D3VQdGzrHvzRpX9zkQVUlUxR8' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6725732906232203" crossOrigin="anonymous"></script>
      </head>
      <body style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', margin: 0, padding: 0, fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <LocaleProvider>
  <ThemeProvider>
    <HeaderClient />
    <main style={{ flex: 1 }}>{children}</main>
    <FooterClient />
        </ThemeProvider>
      </LocaleProvider>
      </body>
    </html>
  );
}