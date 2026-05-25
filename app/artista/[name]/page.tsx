'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function ArtistaPage() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string);
  const [letras, setLetras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [artistImg, setArtistImg] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.from('letras').select('artist, song').ilike('artist', '%' + name + '%').order('song')
      .then(({ data }) => { setLetras(data || []); setLoading(false); });

    fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(name) + '&entity=musicArtist&limit=1')
      .then(r => r.json()).then(data => {
        if (data.results?.[0]?.artworkUrl100) setArtistImg(data.results[0].artworkUrl100.replace('100x100bb', '300x300bb'));
      }).catch(() => {});
  }, [name]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>

      {/* Header do artista */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
        {artistImg ? (
          <img src={artistImg} alt={name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #b8860b' }} />
        ) : (
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#FFD700,#b8860b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'black', flexShrink: 0 }}>
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {name}
          </h1>
          {!loading && <p style={{ color: '#666', marginTop: '4px' }}>{letras.length} letra{letras.length !== 1 ? 's' : ''} disponível{letras.length !== 1 ? 'is' : ''}</p>}
        </div>
      </div>

      {loading && <p style={{ color: '#888', textAlign: 'center', paddingTop: '60px' }}>Carregando...</p>}

      {!loading && letras.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🎵</p>
          <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '24px' }}>Nenhuma letra encontrada para {name}.</p>
          <a href="/" style={{ padding: '12px 28px', borderRadius: '12px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>Voltar ao início</a>
        </div>
      )}

      {!loading && letras.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {letras.map((l, i) => (
            <div
              key={i}
              onClick={() => router.push('/letra/' + encodeURIComponent(l.artist) + '/' + encodeURIComponent(l.song))}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#111', borderRadius: '12px', padding: '14px 16px', border: '1px solid #222', cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#b8860b')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#222')}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1.2rem' }}>🎵</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.song}</p>
                <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>{l.artist}</p>
              </div>
              <span style={{ color: '#b8860b', fontSize: '1.2rem' }}>→</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}