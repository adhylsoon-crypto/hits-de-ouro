import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hits de Ouro - Letras de Músicas",
  description: "Encontre letras de músicas brasileiras e internacionais no Hits de Ouro. As melhores letras com tradução e player de vídeo.",
  keywords: "letras de músicas, hits, músicas brasileiras, traduções, letras",
  openGraph: {
    title: "Hits de Ouro - Letras de Músicas",
    description: "Encontre letras de músicas brasileiras e internacionais",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#b8860b]/30">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Hits de Ouro"
                style={{ height: '48px', width: 'auto' }}
              />
            </a>
            <nav className="flex items-center gap-6 text-sm">
              <a href="/" className="hover:text-yellow-400 transition-colors">
                Início
              </a>
              <a href="/contato" className="hover:text-yellow-400 transition-colors">
                Contato
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-[#b8860b]/30 bg-[#0a0a0a] mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <img src="/logo.png" alt="Hits de Ouro" className="h-10 w-auto" />
              <p className="text-gray-400 text-sm">
                © 2025 Hits de Ouro. Todos os direitos reservados.
              </p>
              <div className="flex gap-4 text-sm text-gray-400">
                <a href="/termos" className="hover:text-yellow-400 transition-colors">
                  Termos de Uso
                </a>
                <a href="/privacidade" className="hover:text-yellow-400 transition-colors">
                  Privacidade
                </a>
                <a href="/contato" className="hover:text-yellow-400 transition-colors">
                  Contato
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}