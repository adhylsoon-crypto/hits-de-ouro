'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

interface Favorito {
  id: string;
  artist: string;
  song: string;
  album_img: string;
}

export default function FavoritasPage() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) {
        router.push('/login');
        return;
      }
      setUser(data.session.user);
      carregarFavoritos(data.session.user.id);
    });
  }, []);

  const carregarFavoritos = async (userId: string) => {
    const { data } = await supabase
      .from('favoritos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setFavoritos(data || []);
    setLoading(false);
  };

  const removerFavorito = async (id: string) => {
    await supabase.from('favoritos').delete().eq('id', id);
    setFavoritos(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>

      {/* Título */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ⭐ Minhas Favoritas
        </h1>
        <p style={{ color: '#666', marginTop: '8px' }}>Suas músicas salvas em um só lugar</p>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>♪</p>
          <p style={{ color: '#888' }}>Carregando favoritas...</p>
        </div>
      )}

      {/* Lista vazia */}
      {!loading && favoritos.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>☆</p>
          <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '24px' }}>Você ainda não favoritou nenhuma música.</p>
          <a href="/" style={{ padding: '12px 28px', borderRadius: '12px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem' }}>
            Explorar músicas
          </a>
        </div>
      )}

      {/* Lista de favoritos */}
      {!loading && favoritos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {favoritos.map(fav => (
            <div key={fav.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#111', borderRadius: '14px', padding: '14px 16px', border: '1px solid #b8860b33' }}>
              {fav.album_img ? (
                <img src={fav.album_img} alt={fav.song} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #b8860b', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '56px', height: '56px', borderRadius: '10px', background: '#1a1a1a', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '1.5rem' }}>♪</span>
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'white', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fav.song}</p>
                <p style={{ margin: 0, color: '#888', fontSize: '0.85rem', marginTop: '2px' }}>{fav.artist}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                
                  href={`/letra/${encodeURIComponent(fav.artist)}/${encodeURIComponent(fav.song)}`}
                  style={{ padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  Ver letra
                </a>
                <button
                  onClick={() => removerFavorito(fav.id)}
                  style={{ padding: '8px 12px', borderRadius: '8px', background: 'transparent', border: '1px solid #333', color: '#888', cursor: 'pointer', fontSize: '0.85rem' }}>
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}