export const metadata = {
  title: 'Contato',
  description: 'Entre em contato com o Hits de Ouro - Tire dúvidas, envie sugestões ou reporte problemas.',
};

export default function Contato() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '24px' }}>
        Fale Conosco
      </h1>

      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '32px', border: '1px solid #b8860b', marginBottom: '24px' }}>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          O <strong>Hits de Ouro</strong> valoriza muito o contato com nossos usuários! Sua opinião, sugestão ou crítica é fundamental para continuarmos melhorando nossa plataforma.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Estamos aqui para tirar suas dúvidas, receber sugestões de músicas, atender solicitações de direitos autorais ou simplesmente conversar sobre música.
        </p>
      </div>

      <h2 style={{ color: '#FFD700', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px' }}>📞 Canais de Atendimento</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '2rem' }}>📧</span>
          <div>
            <p style={{ color: '#b8860b', fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>E-mail Principal</p>
            <a href="mailto:adhilson1987@yahoo.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem' }}>adhilson1987@yahoo.com</a>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Para qualquer assunto relacionado ao site</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '2rem' }}>⏰</span>
          <div>
            <p style={{ color: '#b8860b', fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>Tempo de Resposta</p>
            <p style={{ color: 'var(--text-primary)', margin: 0 }}>Até 48 horas úteis</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Respondemos de segunda a sexta-feira</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '2rem' }}>🌐</span>
          <div>
            <p style={{ color: '#b8860b', fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>Localização</p>
            <p style={{ color: 'var(--text-primary)', margin: 0 }}>Brasil — São Paulo/SP</p>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#FFD700', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px' }}>🎵 Tipos de Solicitação</h2>

      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', border: '1px solid #b8860b', marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ color: '#FFD700', fontSize: '1rem', marginBottom: '4px' }}>🎤 Sugestão de Música</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>Quer ver uma música específica no site? Envie o nome do artista e da música. Você também pode enviar a letra diretamente pela página da música clicando em "Enviar letra".</p>
          </div>

          <div>
            <h3 style={{ color: '#FFD700', fontSize: '1rem', marginBottom: '4px' }}>⚖️ Direitos Autorais</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>Se você é detentor de direitos autorais e identificou conteúdo que viola seus direitos, entre em contato e removeremos o material em até 48 horas. Informe o nome do artista, música e a justificativa.</p>
          </div>

          <div>
            <h3 style={{ color: '#FFD700', fontSize: '1rem', marginBottom: '4px' }}>🐛 Reportar Erro</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>Encontrou uma letra com erro de digitação ou trecho faltando? Identifique a música, descreva o problema e nos envie. Vamos corrigir o quanto antes!</p>
          </div>

          <div>
            <h3 style={{ color: '#FFD700', fontSize: '1rem', marginBottom: '4px' }}>💡 Sugestões e Melhorias</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>Tem ideias para deixar o site ainda melhor? Adoramos receber sugestões da nossa comunidade. Sua opinião importa muito para nós!</p>
          </div>

          <div>
            <h3 style={{ color: '#FFD700', fontSize: '1rem', marginBottom: '4px' }}>🤝 Parcerias e Anúncios</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>Empresas, artistas e gravadoras interessadas em parcerias ou divulgação podem entrar em contato pelo nosso e-mail principal.</p>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#FFD700', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px' }}>📱 Redes Sociais</h2>

      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', border: '1px solid #b8860b' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>Acompanhe o Hits de Ouro nas redes sociais para novidades, curiosidades musicais e muito mais:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="https://www.tiktok.com/@hits_de_ouro" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '12px 16px', background: 'rgba(184,134,11,0.1)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: '#FFD700' }}>TikTok</strong> — @hits_de_ouro
          </a>
          <a href="https://www.youtube.com/@HITSDEOURO" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '12px 16px', background: 'rgba(184,134,11,0.1)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: '#FFD700' }}>YouTube</strong> — @HITSDEOURO
          </a>
          <a href="https://www.instagram.com/hits_de_ouro/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '12px 16px', background: 'rgba(184,134,11,0.1)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: '#FFD700' }}>Instagram</strong> — @hits_de_ouro
          </a>
          <a href="https://br.pinterest.com/HITSDEOURO/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '12px 16px', background: 'rgba(184,134,11,0.1)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <strong style={{ color: '#FFD700' }}>Pinterest</strong> — @HITSDEOURO
          </a>
        </div>
      </div>
    </div>
  );
}