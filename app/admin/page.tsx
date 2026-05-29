'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

const ADMIN_EMAIL = 'adhylsoon@gmail.com';

export default function AdminPage() {
  const [pendentes, setPendentes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [editando, setEditando] = useState<string | null>(null);
  const [editArtist, setEditArtist] = useState('');
  const [editSong, setEditSong] = useState('');
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
    const artistFinal = editando === item.id ? editArtist : item.artist;
    const songFinal = editando === item.id ? editSong : item.song;

    const { error } = await supabase.from('letras').upsert({
      artist: artistFinal.trim(),
      song: songFinal.trim(),
      lyrics: item.lyrics,
      compositor: item.compositor || '',
      enviado_por_nome: item.email_enviado?.split('@')[0] || '',
    }, { onConflict: 'artist,song' });

    if (!error) {
      await supabase.from('letras_pendentes').update({ status: 'aprovado' }).eq('id', item.id);
      setPendentes(prev => prev.filter(p => p.id !== item.id));
      setEditando(null);
    } else {
      alert('Erro ao aprovar: ' + error.message);
    }
  };

  const rejeitar = async (id: string) => {
    await supabase.from('letras_pendentes').update({ status: 'rejeitado' }).eq('id', id);
    setPendentes(prev => prev.filter(p => p.id !== id));
  };

  const iniciarEdicao = (item: any) => {
    setEditando(item.id);
    setEditArtist(item.artist);
    setEditSong(item.song);
  };

  if (loading) return <div style={{ textAlign: 'center', paddingTop: '120px', color: '#888' }}>Carregando...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🛡️ Painel Admin
        </h1>
        <p style={{ color: '#666', marginTop: '8px' }}>{pendentes.length} letra{pendentes.length !== 1 ? 's' : ''} pendente{pendentes.length !== 1 ? 's' : ''}</p>
      </div>

      {pendentes.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</p>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Nenhuma letra pendente!</p>
        </div>
      )}

      {pendentes.map(item => (
        <div key={item.id} style={{ background: '#111', borderRadius: '14px', padding: '20px', border: '1px solid #333', marginBottom: '16px' }}>
          
          {/* Campos editáveis de artista e música */}
          {editando === item.id ? (
            <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <label style={{ color: '#888', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>🎤 Artista</label>
                <input value={editArtist} onChange={e => setEditArtist(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ color: '#888', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>🎵 Música</label>
                <input value={editSong} onChange={e => setEditSong(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <p style={{ color: '#b8860b', fontSize: '0.75rem' }}>✏️ Editando — clique em Aprovar para salvar com as correções.</p>
            </div>
          ) : (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: 0, fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>{item.song}</p>
              <p style={{ margin: 0, color: '#888', fontSize: '0.9rem', marginTop: '4px' }}>{item.artist}</p>
              <p style={{ margin: 0, color: '#555', fontSize: '0.75rem', marginTop: '4px' }}>
                Enviado por: {item.email_enviado} • {new Date(item.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}

          {/* Botões */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button onClick={() => aprovar(item)}
              style={{ padding: '8px 20px', borderRadius: '8px', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              ✅ Aprovar
            </button>
            <button onClick={() => rejeitar(item.id)}
              style={{ padding: '8px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>
              ❌ Rejeitar
            </button>
            <button onClick={() => editando === item.id ? setEditando(null) : iniciarEdicao(item)}
              style={{ padding: '8px 20px', borderRadius: '8px', background: editando === item.id ? '#333' : 'transparent', border: '1px solid #b8860b', color: '#FFD700', cursor: 'pointer', fontWeight: 'bold' }}>
              {editando === item.id ? '✕ Cancelar edição' : '✏️ Corrigir campos'}
            </button>
          </div>

          {/* Preview da letra */}
          <div style={{ background: '#1a1a1a', borderRadius: '10px', padding: '16px', maxHeight: '200px', overflowY: 'auto' }}>
            <pre style={{ margin: 0, color: '#ccc', fontSize: '0.85rem', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{item.lyrics}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}