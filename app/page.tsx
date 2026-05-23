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
  { artist: 'Thalles Roberto', song: 'Nao Existe Lugar', views: '4.1M', genre: 'Gospel' },
  { artist: 'Isadora Pompeo', song: 'Me Refaz', views: '6.8M', genre: 'Gospel' },
  { artist: 'Moises Fabiano', song: 'Lugar Secreto', views: '9.2M', genre: 'Gospel' },
  { artist: 'Casting Crowns', song: 'Who Am I', views: '14M', genre: 'Gospel' },
  { artist: 'Lauren Daigle', song: 'You Say', views: '31M', genre: 'Gospel' },
  { artist: 'Tauren Wells', song: 'Hills and Valleys', views: '8.5M', genre: 'Gospel' },
];

const ROCK_HITS = [
  { artist: 'Coldplay', song: 'Yellow', views: '39M', genre: 'Rock' },
  { artist: 'Linkin Park', song: 'In The End', views: '52M', genre: 'Rock' },
  { artist: 'Imagine Dragons', song: 'Believer', views: '44M', genre: 'Rock' },
  { artist: 'Foo Fighters', song: 'Best of You', views: '28M', genre: 'Rock' },
  { artist: 'Red Hot Chili Peppers', song: 'Under The Bridge', views: '31M', genre: 'Rock' },
  { artist: 'Nirvana', song: 'Smells Like Teen Spirit', views: '61M', genre: 'Rock' },
  { artist: 'Green Day', song: 'Boulevard of Broken Dreams', views: '48M', genre: 'Rock' },
  { artist: 'U2', song: 'With or Without You', views: '29M', genre: 'Rock' },
  { artist: 'Guns N Roses', song: 'November Rain', views: '55M', genre: 'Rock' },
  { artist: 'Pearl Jam', song: 'Black', views: '22M', genre: 'Rock' },
  { artist: 'Metallica', song: 'Nothing Else Matters', views: '67M', genre: 'Rock' },
  { artist: 'Queen', song: 'Bohemian Rhapsody', views: '89M', genre: 'Rock' },
];

const SERTANEJO_HITS = [
  { artist: 'Gusttavo Lima', song: 'Bloqueado e Deletado', views: '6.2M', genre: 'Sertanejo' },
  { artist: 'Simone Mendes', song: 'Cintia', views: '3.9M', genre: 'Sertanejo' },
  { artist: 'Marilia Mendonca', song: 'Ausencia', views: '9.3M', genre: 'Sertanejo' },
  { artist: 'Jorge e Mateus', song: 'Com Voce', views: '7.1M', genre: 'Sertanejo' },
  { artist: 'Henrique e Juliano', song: 'Cuida Bem Dela', views: '5.4M', genre: 'Sertanejo' },
  { artist: 'Bruno e Marrone', song: 'Dormi na Praca', views: '4.8M', genre: 'Sertanejo' },
  { artist: 'Zeze Di Camargo', song: '� por Amor', views: '6.9M', genre: 'Sertanejo' },
  { artist: 'Leonardo', song: 'Talismã', views: '3.7M', genre: 'Sertanejo' },
  { artist: 'Chitaozinho e Xororo', song: 'Evidencias', views: '8.2M', genre: 'Sertanejo' },
  { artist: 'Victor e Leo', song: 'Borboletas', views: '5.1M', genre: 'Sertanejo' },
  { artist: 'Luan Santana', song: 'Tudo Que Voce Quiser', views: '7.8M', genre: 'Sertanejo' },
  { artist: 'Michel Telo', song: 'Ai Se Eu Te Pego', views: '12.1M', genre: 'Sertanejo' },
];

const FUNK_HITS = [
  { artist: 'MC Daniel', song: 'Minha Vida e Uma Festa', views: '8.1M', genre: 'Funk' },
  { artist: 'Anitta', song: 'Funk Rave', views: '12.4M', genre: 'Funk' },
  { artist: 'MC Kevinho', song: 'Olha a Explosao', views: '9.7M', genre: 'Funk' },
  { artist: 'Ludmilla', song: 'Verdinha', views: '6.3M', genre: 'Funk' },
  { artist: 'MC Lan', song: 'Bum Bum Tam Tam', views: '11.2M', genre: 'Funk' },
  { artist: 'MC Fioti', song: 'Bum Bum', views: '8.9M', genre: 'Funk' },
  { artist: 'MC Hariel', song: 'Livre', views: '5.4M', genre: 'Funk' },
  { artist: 'Xamã', song: 'Combina', views: '4.7M', genre: 'Funk' },
  { artist: 'MC Cabelinho', song: 'Gotinha', views: '7.2M', genre: 'Funk' },
  { artist: 'Matuê', song: 'Máquina do Tempo', views: '9.1M', genre: 'Funk' },
  { artist: 'WIU', song: 'Apaga o Quadro', views: '6.8M', genre: 'Funk' },
  { artist: 'Filipe Ret', song: 'Sonho de Verão', views: '5.3M', genre: 'Funk' },
];

const FORRO_HITS = [
  { artist: 'Ze Vaqueiro', song: 'Ainda Tem', views: '4.8M', genre: 'Forro' },
  { artist: 'Wesley Safadao', song: 'Camarote', views: '2.1M', genre: 'Forro' },
  { artist: 'Xand Aviao', song: 'Meua Culpa', views: '3.9M', genre: 'Forro' },
  { artist: 'Forró dos Plays', song: 'Tô Solto', views: '2.8M', genre: 'Forro' },
  { artist: 'Adelmario Coelho', song: 'Filho de Deus', views: '1.9M', genre: 'Forro' },
  { artist: 'Calcinha Preta', song: 'Me Libera', views: '3.2M', genre: 'Forro' },
  { artist: 'Banda Calypso', song: 'Rebuliço', views: '2.7M', genre: 'Forro' },
  { artist: 'Falamansa', song: 'Xote dos Milagres', views: '4.1M', genre: 'Forro' },
  { artist: 'Luiz Gonzaga', song: 'Asa Branca', views: '7.3M', genre: 'Forro' },
  { artist: 'Dominguinhos', song: 'Lamento Sertanejo', views: '3.5M', genre: 'Forro' },
];

const PAGODE_HITS = [
  { artist: 'Thiaguinho', song: 'So Pra Te Ver', views: '3.2M', genre: 'Pagode' },
  { artist: 'Dilsinho', song: 'Calma', views: '2.8M', genre: 'Pagode' },
  { artist: 'Sorriso Maroto', song: 'Ainda Bem', views: '4.1M', genre: 'Pagode' },
  { artist: 'Grupo Menos e Mais', song: 'Deixa Eu Te Amar', views: '3.7M', genre: 'Pagode' },
  { artist: 'Exaltasamba', song: 'So Voce', views: '5.2M', genre: 'Pagode' },
  { artist: 'Grupo Revelacao', song: 'Sublime Momento', views: '4.8M', genre: 'Pagode' },
  { artist: 'Ferrugem', song: 'Nao Precisa', views: '3.9M', genre: 'Pagode' },
  { artist: 'Turma do Pagode', song: 'Acaro', views: '2.6M', genre: 'Pagode' },
  { artist: 'Naldo Benny', song: 'Morena', views: '3.3M', genre: 'Pagode' },
  { artist: 'Belo', song: 'Perfume do Amor', views: '4.4M', genre: 'Pagode' },
];

const RAP_HITS = [
  { artist: 'Drake', song: 'Rich Baby Daddy', views: '18M', genre: 'Rap' },
  { artist: 'Kendrick Lamar', song: 'HUMBLE', views: '42M', genre: 'Rap' },
  { artist: 'Eminem', song: 'Lose Yourself', views: '78M', genre: 'Rap' },
  { artist: 'Jay Z', song: '99 Problems', views: '31M', genre: 'Rap' },
  { artist: 'Kanye West', song: 'Stronger', views: '44M', genre: 'Rap' },
  { artist: 'Cardi B', song: 'WAP', views: '39M', genre: 'Rap' },
  { artist: 'Nicki Minaj', song: 'Super Bass', views: '35M', genre: 'Rap' },
  { artist: 'Criolo', song: 'Nao Existe Amor em SP', views: '8.2M', genre: 'Rap' },
  { artist: 'Emicida', song: 'AmarElo', views: '11.4M', genre: 'Rap' },
  { artist: 'Projota', song: 'Tropa', views: '6.7M', genre: 'Rap' },
  { artist: 'Rashid', song: 'Quero Mais', views: '5.1M', genre: 'Rap' },
  { artist: 'BK', song: 'Dois Lados', views: '4.8M', genre: 'Rap' },
];

const REGGAETON_HITS = [
  { artist: 'Bad Bunny', song: 'Titi Me Pregunto', views: '29M', genre: 'Reggaeton' },
  { artist: 'J Balvin', song: 'Mi Gente', views: '38M', genre: 'Reggaeton' },
  { artist: 'Daddy Yankee', song: 'Gasolina', views: '44M', genre: 'Reggaeton' },
  { artist: 'Maluma', song: 'Hawai', views: '31M', genre: 'Reggaeton' },
  { artist: 'Ozuna', song: 'Taki Taki', views: '28M', genre: 'Reggaeton' },
  { artist: 'Anuel AA', song: 'China', views: '35M', genre: 'Reggaeton' },
  { artist: 'Karol G', song: 'Bichota', views: '27M', genre: 'Reggaeton' },
  { artist: 'Rauw Alejandro', song: 'Todo De Ti', views: '22M', genre: 'Reggaeton' },
  { artist: 'Myke Towers', song: 'La Playa', views: '19M', genre: 'Reggaeton' },
  { artist: 'Lunay', song: 'Soltera', views: '16M', genre: 'Reggaeton' },
];

const GENRES = ['Todos', 'Gospel', 'Sertanejo', 'Funk', 'Pop', 'Rock', 'Forro', 'Pagode', 'Rap', 'Reggaeton'];
const ORDINALS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

function ArtistCard({ item, index, onClick, isMobile }: { item: { artist: string; song: string; views: string; genre: string }, index: number, onClick: () => void, isMobile: boolean }) {
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
      background: '#1a1a1a', borderRadius: '12px', padding: isMobile ? '10px' : '12px',
      cursor: 'pointer', border: isTop3 ? '1px solid #FFD700' : '1px solid #333',
      transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: '10px',
    }}>
      <span style={{ minWidth: '24px', fontSize: '0.95rem', fontWeight: 'bold', color: isTop3 ? '#FFD700' : '#888', textAlign: 'center' }}>
        {ORDINALS[index] || String(index + 1)}
      </span>
      <div style={{ width: isMobile ? '44px' : '56px', height: isMobile ? '44px' : '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {imgSrc ? <img src={imgSrc} alt={item.artist} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '♪'}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: '600', fontSize: isMobile ? '0.82rem' : '0.88rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.song}</p>
        <p style={{ color: '#888', fontSize: isMobile ? '0.72rem' : '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.artist}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
          <p style={{ color: '#FFD700', fontSize: '0.68rem' }}>{item.views}</p>
          <span style={{ fontSize: '0.6rem', background: 'rgba(184,134,11,0.2)', color: '#b8860b', padding: '1px 5px', borderRadius: '999px' }}>{item.genre}</span>
        </div>
      </div>
    </div>
  );
}

function FeaturedBanner({ router, isMobile }: { router: any, isMobile: boolean }) {
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
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        cursor: 'pointer', marginBottom: '0px', height: isMobile ? '200px' : '300px',
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
        display: 'flex', alignItems: 'center', padding: isMobile ? '20px' : '40px',
      }}>
        <div>
          <span style={{
            background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black',
            padding: '3px 10px', borderRadius: '999px', fontSize: isMobile ? '0.65rem' : '0.75rem',
            fontWeight: 'bold', marginBottom: '8px', display: 'inline-block'
          }}>DESTAQUE DA SEMANA</span>
          <h2 style={{ fontSize: isMobile ? '1.6rem' : '2.5rem', fontWeight: 'bold', color: 'white', margin: '6px 0 4px' }}>
            {FEATURED.song}
          </h2>
          <p style={{ color: '#FFD700', fontSize: isMobile ? '0.9rem' : '1.1rem', marginBottom: '6px' }}>{FEATURED.artist}</p>
          {!isMobile && <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>{FEATURED.description}</p>}
          <button style={{
            padding: isMobile ? '8px 20px' : '12px 28px', borderRadius: '10px',
            background: 'linear-gradient(135deg,#FFD700,#b8860b)',
            color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer',
            fontSize: isMobile ? '0.85rem' : '1rem', marginTop: isMobile ? '8px' : '0'
          }}>Ver letra</button>
        </div>
      </div>
    </div>
  );
}

function AdBanner({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{
      width: '100%', height: isMobile ? '60px' : '90px', background: '#111',
      border: '1px dashed #333', borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '12px 0 32px',
    }}>
      <p style={{ color: '#444', fontSize: '0.7rem', letterSpacing: '0.1em' }}>PUBLICIDADE</p>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<{ artist: string, song: string, genre: string }[]>([]);
  const [activeGenre, setActiveGenre] = useState('Todos');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const allSongs = [...BR_HITS, ...GLOBAL_HITS, ...GOSPEL_HITS, ...ROCK_HITS, ...SERTANEJO_HITS, ...FUNK_HITS, ...FORRO_HITS, ...PAGODE_HITS, ...RAP_HITS, ...REGGAETON_HITS];

  // Listas filtradas por genero
  const getGenreSongs = () => {
    if (activeGenre === 'Todos') return { br: BR_HITS, global: GLOBAL_HITS, gospel: GOSPEL_HITS, rock: ROCK_HITS, sertanejo: [], funk: [], forro: [], pagode: [], rap: [], reggaeton: [] };
    if (activeGenre === 'Gospel') return { br: [], global: [], gospel: GOSPEL_HITS, rock: [], sertanejo: [], funk: [], forro: [], pagode: [], rap: [], reggaeton: [] };
    if (activeGenre === 'Sertanejo') return { br: [], global: [], gospel: [], rock: [], sertanejo: SERTANEJO_HITS, funk: [], forro: [], pagode: [], rap: [], reggaeton: [] };
    if (activeGenre === 'Funk') return { br: [], global: [], gospel: [], rock: [], sertanejo: [], funk: FUNK_HITS, forro: [], pagode: [], rap: [], reggaeton: [] };
    if (activeGenre === 'Pop') return { br: [], global: GLOBAL_HITS.filter(s => s.genre === 'Pop'), gospel: [], rock: [], sertanejo: [], funk: [], forro: [], pagode: [], rap: [], reggaeton: [] };
    if (activeGenre === 'Rock') return { br: [], global: [], gospel: [], rock: ROCK_HITS, sertanejo: [], funk: [], forro: [], pagode: [], rap: [], reggaeton: [] };
    if (activeGenre === 'Forro') return { br: [], global: [], gospel: [], rock: [], sertanejo: [], funk: [], forro: FORRO_HITS, pagode: [], rap: [], reggaeton: [] };
    if (activeGenre === 'Pagode') return { br: [], global: [], gospel: [], rock: [], sertanejo: [], funk: [], forro: [], pagode: PAGODE_HITS, rap: [], reggaeton: [] };
    if (activeGenre === 'Rap') return { br: [], global: [], gospel: [], rock: [], sertanejo: [], funk: [], forro: [], pagode: [], rap: RAP_HITS, reggaeton: [] };
    if (activeGenre === 'Reggaeton') return { br: [], global: [], gospel: [], rock: [], sertanejo: [], funk: [], forro: [], pagode: [], rap: [], reggaeton: REGGAETON_HITS };
    return { br: BR_HITS, global: GLOBAL_HITS, gospel: GOSPEL_HITS, rock: ROCK_HITS, sertanejo: [], funk: [], forro: [], pagode: [], rap: [], reggaeton: [] };
  };

  const lists = getGenreSongs();

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

  const gridCols = isMobile ? '1fr' : 'repeat(2, 1fr)';

  const Section = ({ title, items, flag }: { title: string, items: any[], flag?: string }) => {
    if (items.length === 0) return null;
    return (
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          {flag && <img src={flag} alt="" style={{ height: '24px', borderRadius: '4px' }} />}
          <h2 style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: 'bold', color: 'white' }}>{title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '10px' }}>
          {items.map((item, i) => (
            <ArtistCard key={i} item={item} index={i} onClick={() => goToLyric(item.artist, item.song)} isMobile={isMobile} />
          ))}
        </div>
      </section>
    );
  };

  const isEmpty = Object.values(lists).every(l => l.length === 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '12px' : '20px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: isMobile ? '20px 0 16px' : '32px 0 24px' }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '3rem', fontWeight: 'bold',
          background: 'linear-gradient(135deg, #FFD700, #b8860b, #FFD700)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px'
        }}>Hits de Ouro</h1>
        <p style={{ color: '#888', fontSize: isMobile ? '0.9rem' : '1.1rem', marginBottom: '16px' }}>
          Encontre letras das suas musicas favoritas
        </p>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text" value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={isMobile ? "Ex: Anitta Funk Rave" : "Ex: Anitta Funk Rave ou Taylor Swift Cruel Summer"}
              style={{
                flex: 1, padding: isMobile ? '10px 12px' : '12px 16px', borderRadius: '12px',
                background: '#1a1a1a', border: '1px solid #b8860b',
                color: 'white', fontSize: '0.9rem', outline: 'none'
              }}
            />
            <button type="submit" style={{
              padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #FFD700, #b8860b)',
              color: 'black', fontWeight: 'bold', border: 'none',
              cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap'
            }}>Buscar</button>
          </form>
          {suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: '#1a1a1a', border: '1px solid #b8860b',
              borderRadius: '12px', marginTop: '4px', zIndex: 100, overflow: 'hidden'
            }}>
              {suggestions.map((s, i) => (
                <div key={i} onClick={() => goToLyric(s.artist, s.song)} style={{
                  padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #2a2a2a',
                  display: 'flex', gap: '8px', alignItems: 'center'
                }}>
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
        <p style={{ color: '#666', fontSize: '0.75rem', marginTop: '8px' }}>
          Digite o nome do artista seguido da musica
        </p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
        {GENRES.map(genre => (
          <button key={genre} onClick={() => setActiveGenre(genre)} style={{
            padding: isMobile ? '6px 14px' : '8px 20px', borderRadius: '999px', border: 'none',
            cursor: 'pointer', fontSize: isMobile ? '0.78rem' : '0.88rem', fontWeight: '600',
            background: activeGenre === genre ? 'linear-gradient(135deg, #FFD700, #b8860b)' : '#1a1a1a',
            color: activeGenre === genre ? 'black' : '#aaa',
            outline: activeGenre === genre ? 'none' : '1px solid #333',
          }}>
            {genre}
          </button>
        ))}
      </div>

      <FeaturedBanner router={router} isMobile={isMobile} />
      <AdBanner isMobile={isMobile} />

      <Section title="Top Musicas Brasileiras" items={lists.br} flag="https://flagcdn.com/w40/br.png" />
      <Section title="Top Classicos Globais" items={lists.global} />
      <Section title="Top Gospel" items={lists.gospel} />
      <Section title="Top Rock" items={lists.rock} />
      <Section title="Top Sertanejo" items={lists.sertanejo} />
      <Section title="Top Funk" items={lists.funk} />
      <Section title="Top Forro" items={lists.forro} />
      <Section title="Top Pagode" items={lists.pagode} />
      <Section title="Top Rap" items={lists.rap} />
      <Section title="Top Reggaeton" items={lists.reggaeton} />

      {isEmpty && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
          <p style={{ fontSize: '2rem' }}>♪</p>
          <p>Nenhuma musica encontrada para o genero <strong style={{ color: '#FFD700' }}>{activeGenre}</strong></p>
        </div>
      )}

    </div>
  );
}