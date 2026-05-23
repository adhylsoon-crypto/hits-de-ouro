'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FEATURED = {
  artist: 'Anitta',
  song: 'Funk Rave',
  description: 'O hit mais tocado da semana no Brasil!',
};

const BR_HITS = [
  { artist: 'Ze Vaqueiro', song: 'Ainda Tem', views: '4.8M', genre: 'Forro' },
  { artist: 'Gusttavo Lima', song: 'Bloqueado e Deletado', views: '6.2M', genre: 'Sertanejo' },
  { artist: 'Simone Mendes', song: 'Cintia', views: '3.9M', genre: 'Sertanejo' },
  { artist: 'MC Daniel', song: 'Minha Vida e Uma Festa', views: '8.1M', genre: 'Funk' },
  { artist: 'Anitta', song: 'Funk Rave', views: '12.4M', genre: 'Funk' },
  { artist: 'Luisa Sonza', song: 'Chico', views: '5.7M', genre: 'Pop' },
  { artist: 'Thiaguinho', song: 'So Pra Te Ver', views: '3.2M', genre: 'Pagode' },
  { artist: 'Dilsinho', song: 'Calma', views: '2.8M', genre: 'Pagode' },
  { artist: 'Wesley Safadao', song: 'Camarote', views: '2.1M', genre: 'Forro' },
  { artist: 'Marilia Mendonca', song: 'Ausencia', views: '9.3M', genre: 'Sertanejo' },
];

const GLOBAL_HITS = [
  { artist: 'Taylor Swift', song: 'Cruel Summer', views: '45M', genre: 'Pop' },
  { artist: 'The Weeknd', song: 'Blinding Lights', views: '38M', genre: 'Pop' },
  { artist: 'Bad Bunny', song: 'Titi Me Pregunto', views: '29M', genre: 'Reggaeton' },
  { artist: 'Beyonce', song: 'Texas Hold Em', views: '22M', genre: 'Pop' },
  { artist: 'Drake', song: 'Rich Baby Daddy', views: '18M', genre: 'Rap' },
  { artist: 'Billie Eilish', song: 'Bad Guy', views: '35M', genre: 'Pop' },
  { artist: 'Ed Sheeran', song: 'Shape of You', views: '41M', genre: 'Pop' },
  { artist: 'Sabrina Carpenter', song: 'Espresso', views: '27M', genre: 'Pop' },
  { artist: 'Ariana Grande', song: 'thank u next', views: '31M', genre: 'Pop' },
  { artist: 'Harry Styles', song: 'As It Was', views: '44M', genre: 'Pop' },
];

const GOSPEL_HITS = [
  { artist: 'Fernanda Brum', song: 'Ele Vive em Mim', views: '8.2M', genre: 'Gospel' },
  { artist: 'Aline Barros', song: 'Ressuscita-me', views: '11.4M', genre: 'Gospel' },
  { artist: 'Hillsong', song: 'Oceans', views: '22M', genre: 'Gospel' },
  { artist: 'Elevation Worship', song: 'O Come to the Altar', views: '18M', genre: 'Gospel' },
  { artist: 'Gabriela Rocha', song: 'Nada Alem', views: '7.3M', genre: 'Gospel' },
  { artist: 'Preto no Branco', song: 'Creio', views: '5.9M', genre: 'Gospel' },
];

const ROCK_HITS = [
  { artist: 'Coldplay', song: 'Yellow', views: '39M', genre: 'Rock' },
  { artist: 'Linkin Park', song: 'In The End', views: '52M', genre: 'Rock' },
  { artist: 'Imagine Dragons', song: 'Believer', views: '44M', genre: 'Rock' },
  { artist: 'Foo Fighters', song: 'Best of You', views: '28M', genre: 'Rock' },
  { artist: 'Red Hot Chili Peppers', song: 'Under The Bridge', views: '31M', genre: 'Rock' },
  { artist: 'Nirvana', song: 'Smells Like Teen Spirit', views: '61M', genre: 'Rock' },
];

const GENRES = ['Todos', 'Gospel', 'Sertanejo', 'Funk', 'Pop', 'Rock', 'Forro', 'Pagode', 'Rap', 'Reggaeton'];

const ORDINALS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function ArtistCard({ item, index, onClick }: { item: { artist: string; song: string; views: string; genre: string }, index: number, onClick: () => void }) {
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
      cursor: 'pointer', border: isTop3 ? '1px solid #FFD700' : '1px solid #333',
      transition: 'transform 0.2s, border-color 0.2s', display: 'flex', alignItems: 'center', gap: '12px',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#FFD700'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isTop3 ? '#FFD700' : '#333'; }}
    >
      <span style={{ minWidth: '32px', fontSize: '1.1rem', fontWeight: 'bold', color: isTop3 ? '#FFD700' : '#888', textAlign: 'center' }}>
        {ORDINALS[index]}
      </span>
      <div style={{ width: '56px', height: '56px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
        {imgSrc ? <img src={imgSrc} alt={item.artist} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '♪'}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: '600', fontSize: '0.88rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.song}</p>
        <p style={{ color: '#888', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.artist}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
          <p style={{ color: '#FFD700', fontSize: '0.72rem' }}>{item.views} views</p>
          <span style={{ fontSize: '0.65rem', background: 'rgba(184,134,11,0.2)', color: '#b8860b', padding: '1px 6px', borderRadius: '999px' }}>{item.genre}</span>
        </div>
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
        position: 'relative', borderRadius: '20px', overflow: 'hidden',
        cursor: 'pointer', marginBottom: '0px', height: '300px',
        background: '#1a1a1a', border: '1px solid #b8860b',
      }}
    >
      {img && (
        <img src={img} alt={FEATURED.song} style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35,
        }} />
      )}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.95) 40%, transparent)',
        display: 'flex', alignItems: 'center', padding: '40px',
      }}>
        <div>
          <span style={{
            background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black',
            padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem',
            fontWeight: 'bold', marginBottom: '12px', display: 'inline-block'
          }}>DESTAQUE DA SEMANA</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', margin: '8px 0 4px' }}>
            {FEATURED.song}
          </h2>
          <p style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '8px' }}>{FEATURED.artist}</p>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>{FEATURED.description}</p>
          <button style={{
            padding: '12px 28px', borderRadius: '12px',
            background: 'linear-gradient(135deg,#FFD700,#b8860b)',
            color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1rem'
          }}>Ver letra</button>
        </div>
      </div>
    </div>
  );
}

function AdBanner() {
  return (
    <div style={{
      width: '100%', height: '90px', background: '#111',
      border: '1px dashed #333', borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '16px 0 40px',
    }}>
      <p style={{ color: '#444', fontSize: '0.75rem', letterSpacing: '0.1em' }}>PUBLICIDADE</p>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<{ artist: string, song: string, genre: string }[]>([]);
  const [activeGenre, setActiveGenre] = useState('Todos');
  const router = useRouter();

  const allSongs = [...BR_HITS, ...GLOBAL_HITS, ...GOSPEL_HITS, ...ROCK_HITS];

  const filteredBR = activeGenre === 'Todos' ? BR_HITS : BR_HITS.filter(s => s.genre === activeGenre);
  const filteredGlobal = activeGenre === 'Todos' ? GLOBAL_HITS : GLOBAL_HITS.filter(s => s.genre === activeGenre);
  const filteredGospel = activeGenre === 'Todos' || activeGenre === 'Gospel' ? GOSPEL_HITS : [];
  const filteredRock = activeGenre === 'Todos' || activeGenre === 'Rock' ? ROCK_HITS : [];

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

      <div style={{ textAlign: 'center', padding: '32px 0 24px' }}>
        <h1 style={{
          fontSize: '3rem', fontWeight: 'bold',
          background: 'linear-gradient(135deg, #FFD700, #b8860b, #FFD700)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px'
        }}>Hits de Ouro</h1>
        <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '24px' }}>
          Encontre letras das suas musicas favoritas
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
                  padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #2a2a2a',
                  display: 'flex', gap: '8px', alignItems: 'center'
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span>♪</span>
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
          Digite o nome do artista seguido da musica
        </p>
      </div>

      {/* Filtros de Genero */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px', justifyContent: 'center' }}>
        {GENRES.map(genre => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            style={{
              padding: '8px 20px', borderRadius: '999px', border: 'none',
              cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600',
              transition: 'all 0.2s',
              background: activeGenre === genre ? 'linear-gradient(135deg, #FFD700, #b8860b)' : '#1a1a1a',
              color: activeGenre === genre ? 'black' : '#aaa',
              outline: activeGenre === genre ? 'none' : '1px solid #333',
            }}
          >
            {genre}
          </button>
        ))}
      </div>

      <FeaturedBanner router={router} />
      <AdBanner />

      {filteredBR.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <img src="https://flagcdn.com/w40/br.png" alt="Brasil" style={{ height: '28px', borderRadius: '4px' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Top Musicas Brasileiras em Alta</h2>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', background: 'rgba(0,100,0,0.3)', color: '#4ade80', padding: '4px 12px', borderRadius: '999px' }}>
              {new Date().toLocaleString('pt-BR', { month: 'long' })}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {filteredBR.map((item, i) => (
              <ArtistCard key={i} item={item} index={i} onClick={() => goToLyric(item.artist, item.song)} />
            ))}
          </div>
        </section>
      )}

      {filteredGlobal.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.8rem' }}>*</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Top Classicos Globais</h2>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', background: 'rgba(0,0,100,0.3)', color: '#60a5fa', padding: '4px 12px', borderRadius: '999px' }}>
              {new Date().toLocaleString('pt-BR', { month: 'long' })}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {filteredGlobal.map((item, i) => (
              <ArtistCard key={i} item={item} index={i} onClick={() => goToLyric(item.artist, item.song)} />
            ))}
          </div>
        </section>
      )}

      {filteredGospel.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Top Gospel</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {filteredGospel.map((item, i) => (
              <ArtistCard key={i} item={item} index={i} onClick={() => goToLyric(item.artist, item.song)} />
            ))}
          </div>
        </section>
      )}

      {filteredRock.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Top Rock</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {filteredRock.map((item, i) => (
              <ArtistCard key={i} item={item} index={i} onClick={() => goToLyric(item.artist, item.song)} />
            ))}
          </div>
        </section>
      )}

      {filteredBR.length === 0 && filteredGlobal.length === 0 && filteredGospel.length === 0 && filteredRock.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
          <p style={{ fontSize: '2rem' }}>♪</p>
          <p>Nenhuma musica encontrada para o genero <strong style={{ color: '#FFD700' }}>{activeGenre}</strong></p>
        </div>
      )}

    </div>
  );
}