'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

const GENRES = ['Todos', 'Gospel', 'Sertanejo', 'Eletrônica', 'Pop', 'Rock', 'Forró', 'Pagode', 'Rap', 'Reggaeton'];

function ArtistCard({ item, index, onClick, isMobile }: { item: any, index: number, onClick: () => void, isMobile: boolean }) {
  const [imgSrc, setImgSrc] = useState('');
  useEffect(() => {
    fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(item.artist + ' ' + item.song) + '&entity=song&limit=1')
      .then(r => r.json())
      .then(data => {
        if (data.results?.[0]?.artworkUrl100) setImgSrc(data.results[0].artworkUrl100.replace('100x100bb', '300x300bb'));
      }).catch(() => {});
  }, [item.artist, item.song]);

  const isTop3 = index < 3;
  return (
    <div onClick={onClick} style={{ background: '#1a1a1a', borderRadius: '12px', padding: isMobile ? '10px' : '12px', cursor: 'pointer', border: isTop3 ? '1px solid #FFD700' : '1px solid #333', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ minWidth: '24px', fontSize: '0.95rem', fontWeight: 'bold', color: isTop3 ? '#FFD700' : '#888', textAlign: 'center' }}>{index + 1}</span>
      <div style={{ width: isMobile ? '44px' : '56px', height: isMobile ? '44px' : '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {imgSrc ? <img src={imgSrc} alt={item.artist} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>♪</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: '600', fontSize: isMobile ? '0.82rem' : '0.88rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.song}</p>
        <p style={{ color: '#888', fontSize: isMobile ? '0.72rem' : '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.artist}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
          {item.views && <p style={{ color: '#FFD700', fontSize: '0.68rem', margin: 0 }}>{item.views}</p>}
          {item.genre && <span style={{ fontSize: '0.6rem', background: 'rgba(184,134,11,0.2)', color: '#b8860b', padding: '1px 5px', borderRadius: '999px' }}>{item.genre}</span>}
        </div>
      </div>
    </div>
  );
}

function AdBanner({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{ width: '100%', height: isMobile ? '60px' : '90px', background: '#111', border: '1px dashed #333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0 32px' }}>
      <p style={{ color: '#444', fontSize: '0.7rem', letterSpacing: '0.1em' }}>PUBLICIDADE</p>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeGenre, setActiveGenre] = useState('Todos');
  const [isMobile, setIsMobile] = useState(false);
  const [featured, setFeatured] = useState<any>(null);
  const [lists, setLists] = useState<Record<string, any[]>>({});
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [featuredImg, setFeaturedImg] = useState('');
  const [totalLetras, setTotalLetras] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    supabase.from('letras').select('id', { count: 'exact', head: true }).then(({ count }) => {
  setTotalLetras(count || 0);
});
    supabase.from('destaques').select('*').eq('ativo', true).order('ordem').then(({ data }) => {
      if (!data) return;
      const feat = data.find(d => d.tipo === 'featured');
      if (feat) setFeatured(feat);
      const tipos = ['br', 'global', 'gospel', 'rock', 'sertanejo', 'eletronico', 'forro', 'pagode', 'rap', 'reggaeton'];
      const newLists: Record<string, any[]> = {};
      tipos.forEach(t => { newLists[t] = data.filter(d => d.tipo === t); });
      setLists(newLists);
      setAllSongs(data.filter(d => d.tipo !== 'featured'));
    });
  }, []);

  useEffect(() => {
    if (!featured) return;
    fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(featured.artist + ' ' + featured.song) + '&entity=song&limit=1')
      .then(r => r.json())
      .then(data => {
        if (data.results?.[0]?.artworkUrl100) setFeaturedImg(data.results[0].artworkUrl100.replace('100x100bb', '600x600bb'));
      }).catch(() => {});
  }, [featured]);

  const handleSearchChange = async (value: string) => {
    setSearch(value);
    if (value.length < 2) { setSuggestions([]); return; }
    const lower = value.toLowerCase();

    // Sugestões locais (músicas em destaque)
    const localSuggestions = allSongs
      .filter(s => s.artist.toLowerCase().includes(lower) || s.song.toLowerCase().includes(lower))
      .slice(0, 3);

    // Sugestões do Supabase (letras cadastradas)
    try {
      const { data } = await supabase
        .from('letras')
        .select('artist, song')
        .or(`artist.ilike.%${value}%,song.ilike.%${value}%`)
        .limit(5);

      const supabaseSuggestions = (data || [])
        .filter(d => !localSuggestions.some(l => l.artist === d.artist && l.song === d.song))
        .map(d => ({ artist: d.artist, song: d.song, genre: '', views: '' }))
        .slice(0, 3);

      setSuggestions([...localSuggestions, ...supabaseSuggestions].slice(0, 6));
    } catch {
      setSuggestions(localSuggestions);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSuggestions([]);
    const parts = search.trim().split(' ');
    router.push('/letra/' + encodeURIComponent(parts[0]) + '/' + encodeURIComponent(parts.slice(1).join(' ') || parts[0]));
  };

  const goToLyric = (artist: string, song: string) => {
    setSuggestions([]);
    setSearch('');
    router.push('/letra/' + encodeURIComponent(artist) + '/' + encodeURIComponent(song));
  };

  const getFilteredLists = () => {
    if (activeGenre === 'Todos') return lists;
    const filtered: Record<string, any[]> = {};
    Object.keys(lists).forEach(k => {
      filtered[k] = lists[k].filter(s => s.genre === activeGenre);
    });
    return filtered;
  };

  const filteredLists = getFilteredLists();
  const gridCols = isMobile ? '1fr' : 'repeat(2, 1fr)';

  const Section = ({ title, tipo, flag }: { title: string, tipo: string, flag?: string }) => {
    const items = filteredLists[tipo] || [];
    if (items.length === 0) return null;
    return (
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          {flag && <span style={{ fontSize: '1.4rem' }}>{flag}</span>}
          <h2 style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: 'bold', color: 'white' }}>{title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '10px' }}>
          {items.map((item, i) => <ArtistCard key={i} item={item} index={i} onClick={() => goToLyric(item.artist, item.song)} isMobile={isMobile} />)}
        </div>
      </section>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '12px' : '20px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: isMobile ? '20px 0 16px' : '32px 0 24px' }}>
        <h1 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b,#FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>Hits de Ouro</h1>
        <p style={{ color: '#888', fontSize: isMobile ? '0.9rem' : '1.1rem', marginBottom: '16px' }}>Encontre letras das suas musicas favoritas</p>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={search} onChange={e => handleSearchChange(e.target.value)}
              placeholder={isMobile ? 'Ex: Anitta Funk Rave' : 'Ex: Anitta Funk Rave ou Taylor Swift Cruel Summer'}
              style={{ flex: 1, padding: isMobile ? '10px 12px' : '12px 16px', borderRadius: '12px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
            <button type="submit" style={{ padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: '12px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Buscar</button>
          </form>
          {suggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#1a1a1a', border: '1px solid #b8860b', borderRadius: '12px', marginTop: '4px', zIndex: 100, overflow: 'hidden' }}>
              {suggestions.map((s, i) => (
                <div key={i} onClick={() => goToLyric(s.artist, s.song)} style={{ padding: '10px 16px', cursor: 'pointer', borderBottom: '1px solid #2a2a2a', display: 'flex', gap: '8px', alignItems: 'center' }}>
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
        <p style={{ color: '#666', fontSize: '0.75rem', marginTop: '8px' }}>Digite o nome do artista seguido da musica</p>
{totalLetras > 0 && (
  <p style={{ color: '#b8860b', fontSize: '0.8rem', marginTop: '6px' }}>
    🎵 {totalLetras.toLocaleString('pt-BR')} letras disponíveis
  </p>
)}
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
        {GENRES.map(genre => (
          <button key={genre} onClick={() => setActiveGenre(genre)} style={{ padding: isMobile ? '6px 14px' : '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: isMobile ? '0.78rem' : '0.88rem', fontWeight: '600', background: activeGenre === genre ? 'linear-gradient(135deg,#FFD700,#b8860b)' : '#1a1a1a', color: activeGenre === genre ? 'black' : '#aaa', outline: activeGenre === genre ? 'none' : '1px solid #333' }}>
            {genre}
          </button>
        ))}
      </div>

      {/* Banner destaque */}
      {featured && (
        <div onClick={() => goToLyric(featured.artist, featured.song)} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', height: isMobile ? '200px' : '300px', background: '#1a1a1a', border: '1px solid #b8860b', marginBottom: '0' }}>
          {featuredImg && <img src={featuredImg} alt={featured.song} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right,rgba(0,0,0,0.95) 40%,transparent)', display: 'flex', alignItems: 'center', padding: isMobile ? '20px' : '40px' }}>
            <div>
              <span style={{ background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', padding: '3px 10px', borderRadius: '999px', fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: 'bold', marginBottom: '8px', display: 'inline-block' }}>DESTAQUE DA SEMANA</span>
              <h2 style={{ fontSize: isMobile ? '1.6rem' : '2.5rem', fontWeight: 'bold', color: 'white', margin: '6px 0 4px' }}>{featured.song}</h2>
              <p style={{ color: '#FFD700', fontSize: isMobile ? '0.9rem' : '1.1rem', marginBottom: '6px' }}>{featured.artist}</p>
              {!isMobile && featured.description && <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>{featured.description}</p>}
              <button style={{ padding: isMobile ? '8px 20px' : '12px 28px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: isMobile ? '0.85rem' : '1rem', marginTop: isMobile ? '8px' : '0' }}>Ver letra</button>
            </div>
          </div>
        </div>
      )}

      <AdBanner isMobile={isMobile} />
      <Section title="🇧🇷 Top Musicas Brasileiras" tipo="br" />
      <AdBanner isMobile={isMobile} />
      <Section title="🌍 Top Classicos Globais" tipo="global" />
      <Section title="✝️ Top Gospel" tipo="gospel" />
      <Section title="🎸 Top Rock" tipo="rock" />
      <Section title="🤠 Top Sertanejo" tipo="sertanejo" />
      <Section title="🎧 Top Eletrônica" tipo="eletronico" />
      <Section title="🪗 Top Forro" tipo="forro" />
      <Section title="🥁 Top Pagode" tipo="pagode" />
      <Section title="🎤 Top Rap" tipo="rap" />
      <Section title="💃 Top Reggaeton" tipo="reggaeton" />
    </div>
  );
}