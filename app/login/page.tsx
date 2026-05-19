'use client';
import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isLogin ? 'Login em breve disponivel!' : 'Cadastro em breve disponivel!');
  };

  return (
    <div style={{ maxWidth: '420px', margin: '60px auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <img src="/logo.png" alt="Hits de Ouro" style={{ height: '60px', marginBottom: '16px' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {isLogin ? 'Entrar na sua conta' : 'Criar conta grátis'}
        </h1>
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '32px', border: '1px solid #b8860b' }}>

        <div style={{ display: 'flex', marginBottom: '24px', background: '#0a0a0a', borderRadius: '10px', padding: '4px' }}>
          <button onClick={() => setIsLogin(true)} style={{
            flex: 1, padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            background: isLogin ? 'linear-gradient(135deg,#FFD700,#b8860b)' : 'transparent',
            color: isLogin ? 'black' : '#888', fontWeight: 'bold', fontSize: '0.9rem'
          }}>Entrar</button>
          <button onClick={() => setIsLogin(false)} style={{
            flex: 1, padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            background: !isLogin ? 'linear-gradient(135deg,#FFD700,#b8860b)' : 'transparent',
            color: !isLogin ? 'black' : '#888', fontWeight: 'bold', fontSize: '0.9rem'
          }}>Cadastrar</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Nome</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Seu nome"
                style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#0a0a0a', border: '1px solid #b8860b', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          )}
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>E-mail</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#0a0a0a', border: '1px solid #b8860b', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Senha</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#0a0a0a', border: '1px solid #b8860b', color: 'white', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{
            padding: '14px', borderRadius: '10px',
            background: 'linear-gradient(135deg,#FFD700,#b8860b)',
            color: 'black', fontWeight: 'bold', border: 'none',
            cursor: 'pointer', fontSize: '1rem', marginTop: '8px'
          }}>
            {isLogin ? '👤 Entrar' : '🎵 Criar conta'}
          </button>
        </form>

        {isLogin && (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '0.85rem', marginTop: '16px' }}>
            Nao tem conta?{' '}
            <span onClick={() => setIsLogin(false)} style={{ color: '#b8860b', cursor: 'pointer' }}>
              Cadastre-se gratis
            </span>
          </p>
        )}
      </div>

      <p style={{ textAlign: 'center', color: '#555', fontSize: '0.8rem', marginTop: '20px' }}>
        Ao continuar voce concorda com nossos{' '}
        <a href="/termos" style={{ color: '#b8860b' }}>Termos de Uso</a>
      </p>
    </div>
  );
}