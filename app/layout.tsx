import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hits de Ouro - Letras de Músicas",
  description: "Encontre letras de músicas brasileiras e internacionais no Hits de Ouro.",
  keywords: "letras de músicas, hits, músicas brasileiras, traduções",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ background: '#0a0a0a', color: 'white', margin: 0, padding: 0, fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(184,134,11,0.3)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="/" style={{ textDecoration: 'none' }}>
              <img src="/logo.png" alt="Hits de Ouro" style={{ height: '48px', width: 'auto' }} />
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>
                Início
              </a>
              <a href="/contato" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>
                Contato
              </a>
              <a href="/login" style={{
                padding: '8px 20px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #FFD700, #b8860b)',
                color: 'black', fontWeight: 'bold', fontSize: '0.9rem',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                👤 Entrar
              </a>
            </nav>
          </div>
        </header>

        <main style={{ flex: 1 }}>
          {children}
        </main>

        <footer style={{ borderTop: '1px solid rgba(184,134,11,0.3)', background: '#0a0a0a', marginTop: '60px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <img src="/logo.png" alt="Hits de Ouro" style={{ height: '40px', width: 'auto' }} />
              <p style={{ color: '#666', fontSize: '0.85rem' }}>© 2025 Hits de Ouro. Todos os direitos reservados.</p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
                <a href="/termos" style={{ color: '#888', textDecoration: 'none' }}>Termos de Uso</a>
                <a href="/privacidade" style={{ color: '#888', textDecoration: 'none' }}>Privacidade</a>
                <a href="/contato" style={{ color: '#888', textDecoration: 'none' }}>Contato</a>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}