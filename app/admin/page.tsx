'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

const ADMIN_EMAIL = 'adhylsoon@gmail.com';

export default function AdminPage() {
  const [pendentes, setPendentes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user || data.session.user.email !== ADMIN_EMAIL) {
        router.push('/');
        return;
      }
      setUser(data.session.user);
      carregarPendentes();
    });
  }, []);

  const carregarPendentes = async () => {
    const { data } = await supabase
      .from('letras_pendentes')
      .select('*')
      .eq('status', 'pendente')
      .order('created_at', { ascending: false });
    setPendentes(data || []);
    setLoading(false);
  };

  const aprovar = async (item: any) => {
    await supabase.from('letras').insert({
      artist: item.artist,
      song: item.song,
      lyrics: item.lyrics,
    }).then(() => {
      supabase.from('letras_pendentes').update({ status: 'aprovado' }).eq('id', item.id).then(() => {
        setPendentes(prev => prev.filter(p => p.id !== item.id));
      });
    });
  };

  const rejeitar = async (id: string) => {
    await supabase.from('letras_pendentes').update({ status: 'rejeitado' }).eq('id', id);
    setPendentes(prev => prev.filter(p => p.id !== id));
  };

  if (loading) return <div style={{ textAlign: 'center', paddingTop: '120px', color: '#888' }}>Carregando...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🛡️ Painel Admin
        </h1>
        <p style={{ color: '#666', marginTop: '8px' }}>Letras pendentes de aprovação</p>
      </div>

      {pendentes.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</p>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Nenhuma letra pendente!</p>
        </div>
      )}

      {pendentes.map(item => (
        <div key={item.id} style={{ background: '#111', borderRadius: '14px', padding: '20px', border: '1px solid #333', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>{item.song}</p>
              <p style={{ margin: 0, color: '#888', fontSize: '0.9rem', marginTop: '4px' }}>{item.artist}</p>
              <p style={{ margin: 0, color: '#555', fontSize: '0.75rem', marginTop: '4px' }}>
                Enviado por: {item.email_enviado} • {new Date(item.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => aprovar(item)}
                style={{ padding: '8px 20px', borderRadius: '8px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                ✅ Aprovar
              </button>
              <button
                onClick={() => rejeitar(item.id)}
                style={{ padding: '8px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>
                ❌ Rejeitar
              </button>
            </div>
          </div>
          <div style={{ background: '#1a1a1a', borderRadius: '10px', padding: '16px', maxHeight: '200px', overflowY: 'auto' }}>
            <pre style={{ margin: 0, color: '#ccc', fontSize: '0.85rem', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{item.lyrics}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}