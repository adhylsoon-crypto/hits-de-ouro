export default function Privacidade() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '24px' }}>
        Politica de Privacidade
      </h1>
      <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '32px', border: '1px solid #b8860b', color: '#aaa', lineHeight: '1.9', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>1. Dados Coletados</h2>
          <p>O Hits de Ouro nao coleta dados pessoais dos usuarios. As unicas informacoes registradas sao estatisticas anonimas de acesso, como quais musicas foram mais buscadas.</p>
        </div>
        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>2. Cookies</h2>
          <p>Podemos utilizar cookies para melhorar a experiencia de navegacao. Voce pode desativar os cookies nas configuracoes do seu navegador.</p>
        </div>
        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>3. Servicos de Terceiros</h2>
          <p>Utilizamos servicos de terceiros como YouTube, iTunes e APIs de letras publicas. Esses servicos possuem suas proprias politicas de privacidade.</p>
        </div>
        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>4. Contato</h2>
          <p>Para duvidas sobre privacidade, entre em contato pelo e-mail adhilson1987@yahoo.com</p>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#666' }}>Ultima atualizacao: Janeiro de 2025</p>
      </div>
    </div>
  );
}