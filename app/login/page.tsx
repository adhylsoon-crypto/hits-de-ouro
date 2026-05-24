'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Erro login:', error.message);
        setError('Email ou senha incorretos.');
      } else {
        router.push('/');
      }
    } else {
      if (!name.trim()) { setError('Digite seu nome.'); setLoading(false); return; }
      if (password.length < 6) { setError('Senha deve ter pelo menos 6 caracteres.'); setLoading(false); return; }

      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        console.error('Erro cadastro:', error.message);
        setError(`Erro: ${error.message}`);
      } else if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ id: data.user.id, email, name });

        if (profileError) {
          console.error('Erro ao salvar profile:', profileError.message);
        }

        setSuccess('✅ Conta criada com sucesso! Verifique seu email para confirmar.');
        setTimeout(() => router.push('/'), 3000);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#111', borderRadius: '20px', padding: '40px', border: '1px solid #b8860b33' }}>
        
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src="/logo.png" alt="Hits de Ouro" style={{ height: '56px', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {isLogin ? 'Entrar na sua conta' : 'Criar conta gratis'}
          </h1>
          <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '6px' }}>
            {isLogin ? 'Acesse suas musicas favoritas' : 'Salve suas musicas favoritas'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          <button onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }} style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600',
            background: isLogin ? 'linear-gradient(135deg,#FFD700,#b8860b)' : 'transparent',
            color: isLogin ? 'black' : '#888',
          }}>Entrar</button>
          <button onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }} style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600',
            background: !isLogin ? 'linear-gradient(135deg,#FFD700,#b8860b)' : 'transparent',
            color: !isLogin ? 'black' : '#888',
          }}>Cadastrar</button>
        </div>

        {/* Campos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {!isLogin && (
            <input
              type="text" placeholder="Seu nome" value={name}
              onChange={e => setName(e.target.value)}
              style={{ padding: '12px 16px', borderRadius: '12px', background: '#1a1a1a', border: '1px solid #333', color: 'white', fontSize: '0.95rem', outline: 'none' }}
            />
          )}
          <input
            type="email" placeholder="Seu email" value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: '12px', background: '#1a1a1a', border: '1px solid #333', color: 'white', fontSize: '0.95rem', outline: 'none' }}
          />
          <input
            type="password" placeholder="Sua senha" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{ padding: '12px 16px', borderRadius: '12px', background: '#1a1a1a', border: '1px solid #333', color: 'white', fontSize: '0.95rem', outline: 'none' }}
          />
        </div>

        {/* Erro / Sucesso */}
        {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: '#4ade80', fontSize: '0.9rem', marginTop: '12px', textAlign: 'center', fontWeight: '600' }}>{success}</p>}

        {/* Botão */}
        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '14px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', fontWeight: 'bold',
          fontSize: '1rem', marginTop: '20px', opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar conta'}
        </button>

        {/* Voltar */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/" style={{ color: '#666', fontSize: '0.85rem', textDecoration: 'none' }}>← Voltar ao inicio</a>
        </div>

      </div>
    </div>
  );
}