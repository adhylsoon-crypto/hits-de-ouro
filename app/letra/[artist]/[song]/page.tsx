export default function Contato() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '24px' }}>
        Fale Conosco
      </h1>
      <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '32px', border: '1px solid #b8860b' }}>
        <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '24px' }}>
          Tem alguma duvida, sugestao ou quer reportar um problema? Entre em contato conosco!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#2a2a2a', borderRadius: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>📧</span>
            <div>
              <p style={{ color: '#b8860b', fontWeight: 'bold', fontSize: '0.85rem' }}>E-mail</p>
              <a href="mailto:adhilson1987@yahoo.com" style={{ color: 'white', textDecoration: 'none' }}>adhilson1987@yahoo.com</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#2a2a2a', borderRadius: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>⏰</span>
            <div>
              <p style={{ color: '#b8860b', fontWeight: 'bold', fontSize: '0.85rem' }}>Tempo de resposta</p>
              <p style={{ color: 'white' }}>Respondemos em ate 48 horas</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#2a2a2a', borderRadius: '12px' }}>
            <span style={{ fontSize: '1.5rem' }}>🎵</span>
            <div>
              <p style={{ color: '#b8860b', fontWeight: 'bold', fontSize: '0.85rem' }}>Sugestao de musica</p>
              <p style={{ color: 'white' }}>Envie o nome do artista e da musica que deseja ver no site</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}