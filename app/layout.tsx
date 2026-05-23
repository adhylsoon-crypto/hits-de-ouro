import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hits de Ouro - Letras de Musicas",
  description: "Encontre letras das suas musicas favoritas no Hits de Ouro.",
  keywords: "letras de musicas, hits, musicas brasileiras, traducoes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const socials = [
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@hits_de_ouro',
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@HITSDEOURO',
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/hits_de_ouro/',
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
    },
    {
      name: 'Pinterest',
      url: 'https://br.pinterest.com/HITSDEOURO/',
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
    },
  ];

  return (
    <html lang="pt-BR">
      <body style={{ background: '#0a0a0a', color: 'white', margin: 0, padding: 0, fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(184,134,11,0.3)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="/" style={{ textDecoration: 'none' }}>
              <img src="/logo.png" alt="Hits de Ouro" style={{ height: '48px', width: 'auto' }} />
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>Inicio</a>
              <a href="/contato" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>Contato</a>
              {/* Ícones sociais */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid #333', paddingLeft: '16px' }}>
                {socials.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #333', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#FFD700')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#333')}
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
              <a href="/login" style={{
                padding: '8px 20px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #FFD700, #b8860b)',
                color: 'black', fontWeight: 'bold', fontSize: '0.9rem',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px'
              }}>Entrar</a>
            </nav>
          </div>
        </header>

        <main style={{ flex: 1 }}>
          {children}
        </main>

        <footer style={{ borderTop: '1px solid rgba(184,134,11,0.3)', background: '#0a0a0a', marginTop: '60px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
              <div>
                <img src="/logo.png" alt="Hits de Ouro" style={{ height: '40px', marginBottom: '16px' }} />
                <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.6' }}>O melhor site de letras de musicas brasileiras e internacionais.</p>
              </div>
              <div>
                <p style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '16px', fontSize: '0.9rem' }}>Explorar</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Musicas Brasileiras</a>
                  <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Classicos Globais</a>
                  <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Mais Buscadas</a>
                </div>
              </div>
              <div>
                <p style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '16px', fontSize: '0.9rem' }}>Institucional</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="/termos" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Termos de Uso</a>
                  <a href="/privacidade" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Privacidade</a>
                  <a href="/contato" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Contato</a>
                </div>
              </div>
              <div>
                <p style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '16px', fontSize: '0.9rem' }}>Siga o Hits de Ouro</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {socials.map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#FFD700')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '6px', background: '#1a1a1a', border: '1px solid #333' }}>
                        {s.svg}
                      </span>
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '24px', display: 'flex', justifyContent: 'center' }}>
              <p style={{ color: '#444', fontSize: '0.8rem' }}>© 2025 Hits de Ouro. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}