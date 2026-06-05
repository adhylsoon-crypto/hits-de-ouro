export const metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade do Hits de Ouro - Saiba como tratamos seus dados.',
};

export default function Privacidade() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '24px' }}>
        Política de Privacidade
      </h1>
      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '32px', border: '1px solid #b8860b', color: 'var(--text-secondary)', lineHeight: '1.9', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p>A sua privacidade é importante para o <strong>Hits de Ouro</strong>. Esta política descreve como coletamos, usamos e protegemos suas informações ao utilizar nosso site (hitsdeouroletras.com.br).</p>
        
        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>1. Informações que Coletamos</h2>
          <p>Coletamos os seguintes tipos de informação:</p>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li><strong>Dados de cadastro:</strong> Nome e e-mail quando você cria uma conta.</li>
            <li><strong>Letras enviadas:</strong> Letras de músicas e informações associadas que você nos envia voluntariamente.</li>
            <li><strong>Dados de navegação:</strong> Estatísticas anônimas como páginas visitadas, tempo de permanência e tipo de dispositivo.</li>
            <li><strong>Cookies:</strong> Pequenos arquivos para melhorar sua experiência (idioma, tema escolhido).</li>
          </ul>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>2. Como Usamos as Informações</h2>
          <p>As informações coletadas são usadas para:</p>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Permitir o acesso à sua conta e suas letras favoritas;</li>
            <li>Melhorar o conteúdo e a experiência do site;</li>
            <li>Exibir anúncios relevantes através do Google AdSense;</li>
            <li>Responder solicitações e comunicações.</li>
          </ul>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>3. Cookies e Tecnologias Similares</h2>
          <p>Utilizamos cookies próprios e de terceiros (Google AdSense, Google Analytics) para personalizar conteúdo e anúncios, oferecer recursos de mídia social e analisar nosso tráfego. Você pode desativar os cookies nas configurações do seu navegador, mas algumas funcionalidades podem ser afetadas.</p>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>4. Publicidade — Google AdSense</h2>
          <p>O Hits de Ouro utiliza o Google AdSense para exibir anúncios. O Google e seus parceiros podem usar cookies para veicular anúncios com base nas visitas anteriores ao nosso site ou a outros sites na internet. Você pode desativar a publicidade personalizada acessando as <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>Configurações de Anúncios do Google</a>.</p>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>5. Compartilhamento de Dados</h2>
          <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei ou para o funcionamento dos serviços (ex: provedor de hospedagem, banco de dados Supabase).</p>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>6. Serviços de Terceiros</h2>
          <p>Utilizamos os seguintes serviços que possuem suas próprias políticas de privacidade:</p>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li><strong>Supabase:</strong> Autenticação e armazenamento de dados.</li>
            <li><strong>Vercel:</strong> Hospedagem do site.</li>
            <li><strong>Google AdSense:</strong> Exibição de anúncios.</li>
            <li><strong>YouTube e iTunes:</strong> Conteúdo audiovisual e imagens de álbuns.</li>
          </ul>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>7. Direitos do Usuário (LGPD)</h2>
          <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Acessar seus dados pessoais;</li>
            <li>Corrigir dados incompletos ou desatualizados;</li>
            <li>Solicitar a exclusão de sua conta;</li>
            <li>Revogar consentimento.</li>
          </ul>
          <p style={{ marginTop: '8px' }}>Para exercer esses direitos, envie um e-mail para <strong>adhilson1987@yahoo.com</strong>.</p>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>8. Segurança</h2>
          <p>Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, perda ou alteração. No entanto, nenhuma transmissão pela internet é 100% segura.</p>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>9. Alterações nesta Política</h2>
          <p>Esta política pode ser atualizada periodicamente. Recomendamos que você revise este documento regularmente.</p>
        </div>

        <div>
          <h2 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>10. Contato</h2>
          <p>Para dúvidas, sugestões ou solicitações relacionadas a esta política, entre em contato pelo e-mail <strong>adhilson1987@yahoo.com</strong>.</p>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '16px', borderTop: '1px solid #333', paddingTop: '16px' }}>Última atualização: Junho de 2026</p>
      </div>
    </div>
  );
}