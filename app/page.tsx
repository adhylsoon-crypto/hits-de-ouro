'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FEATURED = {
  artist: 'Anitta',
  song: 'Funk Rave',
  description: 'O hit mais tocado da semana no Brasil!',
  img: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b0/b4/b0/b0b4b0b4-b0b4-b0b4-b0b4-b0b4b0b4b0b4/cover.jpg/600x600bb.jpg',
};

const BR_HITS = [
  { artist: 'Zé Vaqueiro', song: 'Ainda Tem', views: '4.8M' },
  { artist: 'Gusttavo Lima', song: 'Bloqueado e Deletado', views: '6.2M' },
  { artist: 'Simone Mendes', song: 'Cintia', views: '3.9M' },
  { artist: 'MC Daniel', song: 'Minha Vida é Uma Festa', views: '8.1M' },
  { artist: 'Anitta', song: 'Funk Rave', views: '12.4M' },
  { artist: 'Luisa Sonza', song: 'Chico', views: '5.7M' },
  { artist: 'Thiaguinho', song: 'Só Pra Te Ver', views: '3.2M' },
  { artist: 'Dilsinho', song: 'Calma', views: '2.8M' },
  { artist: 'Wesley Safadão', song: 'Camarote', views: '2.1M' },
  { artist: 'Marília Mendonça', song: 'Ausência', views: '9.3M' },
];

const GLOBAL_HITS = [
  { artist: 'Taylor Swift', song: 'Cruel Summer', views: '45M' },
  { artist: 'The Weeknd', song: 'Blinding Lights', views: '38M' },
  { artist: 'Bad Bunny', song: 'Tití Me Preguntó', views: '29M' },
  { artist: 'Beyoncé', song: 'Texas Hold Em', views: '22M' },
  { artist: 'Drake', song: 'Rich Baby Daddy', views: '18M' },
  { artist: 'Billie Eilish', song: 'Bad Guy', views: '35M' },
  { artist: 'Ed Sheeran', song: 'Shape of You', views: '41M' },
  { artist: 'Sabrina Carpenter', song: 'Espresso', views: '27M' },
  { artist: 'Ariana Grande', song: 'thank u, next', views: '31M' },
  { artist: 'Harry Styles', song: 'As It Was', views: '44M' },
];

const ORDINALS = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º'];

function ArtistCard({ item, index, onClick }: { item: { artist: string; song: string; views: string }, index: number, onClick: () => void }) {
  const [imgSrc, setImgSrc] = useState('');
  useEffect(() => {
    fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(item.artist + ' ' + item.song) + '&entity=song&limit=1')
      .then(r => r.json())
      .then(data => {
        if (data.results?.[0]?.artworkUrl100) {
          setImgSrc(data.results[0].artworkUrl100.replace('100x100bb', '300x300bb'));
        }
      }).catch(() => {});
  }, [item.artist, item.song]);

  const isTop3 = index < 3;
  return (
    <div onClick={onClick} style={{
      background: '#1a1a1a', borderRadius: '12px', padding: '12px',
      cursor: 'pointer', border: isTop3 ? '1px solid #FFD700' : '1px solid #b8860b',
      transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: '12px',
    }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <span style={{ minWidth: '32px', fontSize: '1.1rem', fontWeight: 'bold', color: isTop3 ? '#FFD700' : '#888', textAlign: 'center' }}>
        {ORDINALS[index]}
      </span>
      <div style={{ width: '56px', height: '56px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
        {imgSrc ? <img src={imgSrc} alt={item.artist} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🎵'}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: '600', fontSize: '0.88rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.song}</p>
        <p style={{ color: '#888', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.artist}</p>
        <p style={{ color: '#FFD700', fontSize: '0.72rem', marginTop: '3px' }}>👁 {item.views}</p>
      </div>
    </div>
  );
}

function FeaturedBanner({ router }: { router: any }) {
  const [img, setImg] = useState('');

  useEffect(() => {
    fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(FEATURED.artist + ' ' + FEATURED.song) + '&entity=song&limit=1')
      .then(r => r.json())
      .then(data => {
        if (data.results?.[0]?.artworkUrl100) {
          setImg(data.results[0].artworkUrl100.replace('100x100bb', '600x600bb'));
        }
      }).catch(() => {});
  }, []);

  return (
    <div
      onClick={() => router.push('/letra/' + encodeURIComponent(FEATURED.artist) + '/' + encodeURIComponent(FEATURED.song))}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        marginBottom: '40px',
        height: '300px',
        background: '#1a1a1a',
        border: '1px solid #b8860b',
      }}
    >
      {img && (
        <img src={img} alt={FEATURED.song} style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.35,
        }} />
      )}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.95) 40%, transparent)',
        display: 'flex', alignItems: 'center', padding: '40px',
      }}>
        <div>
          <span style={{
            background: 'linear-gradient(135deg,#FFD700,#b8860b)',
            color: 'black', padding: '4px 12px', borderRadius: '999px',
            fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '12px',
            display: 'inline-block'
          }}>
            🔥 DESTAQUE DA SEMANA
          </span>
          <h2 style={{
            fontSize: '2.5rem', fontWeight: 'bold', color: 'white',
            margin: '8px 0 4px', textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>
            {FEATURED.song}
          </h2>
          <p style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>{FEATURED.artist}</p>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>{FEATURED.description}</p>
          <button style={{
            padding: '12px 28px', borderRadius: '12px',
            background: 'linear-gradient(135deg,#FFD700,#b8860b)',
            color: 'black', fontWeight: 'bold', border: 'none',
            cursor: 'pointer', fontSize: '1rem'
          }}>
            🎵 Ver letra
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<{ artist: string, song: string }[]>([]);
  const router = useRouter();
  const allSongs = [...BR_HITS, ...GLOBAL_HITS];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value.length < 2) { setSuggestions([]); return; }
    const lower = value.toLowerCase();
    const filtered = allSongs.filter(s =>
      s.artist.toLowerCase().includes(lower) || s.song.toLowerCase().includes(lower)
    ).slice(0, 5);
    setSuggestions(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSuggestions([]);
    const parts = search.trim().split(' ');
    const artist = parts[0];
    const song = parts.slice(1).join(' ') || parts[0];
    router.push('/letra/' + encodeURIComponent(artist) + '/' + encodeURIComponent(song));
  };

  const goToLyric = (artist: string, song: string) => {
    setSuggestions([]);
    setSearch('');
    router.push('/letra/' + encodeURIComponent(artist) + '/' + encodeURIComponent(song));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '32px 0 24px' }}>
        <h1 style={{
          fontSize: '3rem', fontWeight: 'bold',
          background: 'linear-gradient(135deg, #FFD700, #b8860b, #FFD700)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>Hits de Ouro</h1>
        <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '24px' }}>
          Encontre letras das suas músicas favoritas
        </p>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text" value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Ex: Anitta Funk Rave ou Taylor Swift Cruel Summer"
              style={{
                flex: 1, padding: '12px 16px', borderRadius: '12px',
                background: '#1a1a1a', border: '1px solid #b8860b',
                color: 'white', fontSize: '0.95rem', outline: 'none'
              }}
            />
            <button type="submit" style={{
              padding: '12px 24px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #FFD700, #b8860b)',
              color: 'black', fontWeight: 'bold', border: 'none',
              cursor: 'pointer', fontSize: '0.95rem'
            }}>Buscar</button>
          </form>
          {suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: '90px',
              background: '#1a1a1a', border: '1px solid #b8860b',
              borderRadius: '12px', marginTop: '4px', zIndex: 100, overflow: 'hidden'
            }}>
              {suggestions.map((s, i) => (
                <div key={i} onClick={() => goToLyric(s.artist, s.song)} style={{
                  padding: '10px 16px', cursor: 'pointer',
                  borderBottom: '1px solid #2a2a2a',
                  display: 'flex', gap: '8px', alignItems: 'center'
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span>🎵</span>
                  <div>
                    <p style={{ color: 'white', fontSize: '0.9rem', margin: 0 }}>{s.song}</p>
                    <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{s.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '10px' }}>
          Digite o nome do artista seguido da música
        </p>
      </div>

      {/* Banner Destaque */}
      <FeaturedBanner router={router} />

      {/* Top 10 Brasileiras */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <img src="https://flagcdn.com/w40/br.png" alt="Brasil" style={{ height: '28px', borderRadius: '4px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Top 10 Músicas Brasileiras em Alta</h2>
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', background: 'rgba(0,100,0,0.3)', color: '#4ade80', padding: '4px 12px', borderRadius: '999px' }}>
            🟢 {new Date().toLocaleString('pt-BR', { month: 'long' })}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {BR_HITS.map((item, i) => (
            <ArtistCard key={i} item={item} index={i} onClick={() => goToLyric(item.artist, item.song)} />
          ))}
        </div>
      </section>

      {/* Top 10 Globais */}
      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '1.8rem' }}>🌍</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Top 10 Clássicos Globais</h2>
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', background: 'rgba(0,0,100,0.3)', color: '#60a5fa', padding: '4px 12px', borderRadius: '999px' }}>
            🔵 {new Date().toLocaleString('pt-BR', { month: 'long' })}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {GLOBAL_HITS.map((item, i) => (
            <ArtistCard key={i} item={item} index={i} onClick={() => goToLyric(item.artist, item.song)} />
          ))}
        </div>
      </section>

    </div>
  );
}