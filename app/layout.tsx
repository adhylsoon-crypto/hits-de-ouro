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
              <a href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>Início</a>
              <a href="/contato" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>Contato</a>
              <a href="/login" style={{
                padding: '8px 20px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #FFD700, #b8860b)',
                color: 'black', fontWeight: 'bold', fontSize: '0.9rem',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px'
              }}>👤 Entrar</a>
            </nav>
          </div>
        </header>

        <main style={{ flex: 1 }}>{children}</main>

        <footer style={{ borderTop: '1px solid rgba(184,134,11,0.3)', background: '#111', marginTop: '60px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px 24px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
              <div>
                <img src="/logo.png" alt="Hits de Ouro" style={{ height: '48px', marginBottom: '16px' }} />
                <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  O melhor site de letras de músicas brasileiras e internacionais.
                </p>
              </div>
              <div>
                <h4 style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '16px', fontSize: '0.95rem' }}>Explorar</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Músicas Brasileiras</a>
                  <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Clássicos Globais</a>
                  <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Mais Buscadas</a>
                </div>
              </div>
              <div>
                <h4 style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '16px', fontSize: '0.95rem' }}>Institucional</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="/termos" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Termos de Uso</a>
                  <a href="/privacidade" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Privacidade</a>
                  <a href="/contato" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Contato</a>
                </div>
              </div>
              <div>
                <h4 style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '16px', fontSize: '0.95rem' }}>Siga o Hits de Ouro</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="https://www.tiktok.com/@hits_de_ouro" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1rem' }}>🎵</span> TikTok
                  </a>
                  <a href="https://www.youtube.com/@HITSDEOURO" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1rem' }}>▶️</span> YouTube
                  </a>
                  <a href="https://www.instagram.com/hits_de_ouro" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1rem' }}>📸</span> Instagram
                  </a>
                  <a href="https://br.pinterest.com/HITSDEOURO" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1rem' }}>📌</span> Pinterest
                  </a>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(184,134,11,0.2)', paddingTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="https://www.tiktok.com/@hits_de_ouro" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid #b8860b', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1rem' }}>🎵</a>
                <a href="https://www.youtube.com/@HITSDEOURO" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid #b8860b', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1rem' }}>▶️</a>
                <a href="https://www.instagram.com/hits_de_ouro" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid #b8860b', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1rem' }}>📸</a>
                <a href="https://br.pinterest.com/HITSDEOURO" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid #b8860b', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1rem' }}>📌</a>
              </div>
              <p style={{ color: '#555', fontSize: '0.8rem' }}>© 2025 Hits de Ouro. Todos os direitos reservados.</p>
            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}