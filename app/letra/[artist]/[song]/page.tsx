'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function LetraPage() {
  const params = useParams();
  const artist = decodeURIComponent(params.artist as string);
  const song = decodeURIComponent(params.song as string);
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [copied, setCopied] = useState(false);
  const [albumImg, setAlbumImg] = useState('');
  const [translated, setTranslated] = useState('');
  const [translating, setTranslating] = useState(false);
  const [isPortuguese, setIsPortuguese] = useState(true);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setLyrics('');
    setTranslated('');

    fetch('/api/letra?artist=' + encodeURIComponent(artist) + '&song=' + encodeURIComponent(song))
      .then(r => r.json())
      .then(data => {
        if (data?.lyrics) {
          setLyrics(data.lyrics);
          const ptWords = ['de', 'que', 'eu', 'nao', 'voce', 'com', 'uma', 'para', 'por', 'mas', 'ela', 'ele', 'meu', 'minha'];
          const lower = data.lyrics.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const ptCount = ptWords.filter(w => lower.includes(' ' + w + ' ')).length;
          const isPt = ptCount >= 3;
          setIsPortuguese(isPt);
          if (!isPt) {
            setTranslating(true);
            fetch('/api/traduzir?text=' + encodeURIComponent(data.lyrics))
              .then(r => r.json())
              .then(td => {
                if (td?.translated) setTranslated(td.translated);
                setTranslating(false);
              })
              .catch(() => setTranslating(false));
          }
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [artist, song]);

  useEffect(() => {
    fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(artist + ' ' + song) + '&entity=song&limit=1')
      .then(r => r.json())
      .then(data => {
        if (data.results?.[0]?.artworkUrl100) {
          setAlbumImg(data.results[0].artworkUrl100.replace('100x100bb', '600x600bb'));
        }
      }).catch(() => {});
  }, [artist, song]);

  const youtubeUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(artist + ' ' + song + ' oficial');

  const boxStyle: React.CSSProperties = {
    background: '#1a1a1a',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #b8860b',
    lineHeight: '2',
    fontSize: fontSize + 'px',
    color: '#e5e5e5',
    whiteSpace: 'pre-wrap',
    minHeight: '500px',
    flex: 1,
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {albumImg && <img src={albumImg} alt={song} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #b8860b' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{song}</h1>
          <p style={{ color: '#aaa', fontSize: '1rem', marginTop: '4px' }}>{artist}</p>
          <a href="/" style={{ color: '#b8860b', fontSize: '0.85rem', textDecoration: 'none' }}>← Voltar ao inicio</a>
        </div>
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', borderRadius: '10px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>
          ▶ Ver clipe no YouTube
        </a>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button onClick={() => setFontSize(f => Math.max(12, f - 2))} style={{ padding: '6px 14px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer' }}>A-</button>
        <button onClick={() => setFontSize(f => Math.min(28, f + 2))} style={{ padding: '6px 14px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer' }}>A+</button>
        <button onClick={() => { navigator.clipboard.writeText(lyrics); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ padding: '6px 14px', borderRadius: '8px', background: copied ? '#166534' : '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer' }}>
          {copied ? '✅ Copiado!' : '📋 Copiar letra'}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎵</div>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Buscando letra...</p>
        </div>
      )}

      {notFound && !loading && (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😔</div>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Letra nao encontrada.</p>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '8px' }}>Tente buscar com nome diferente</p>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 24px', borderRadius: '10px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            ▶ Buscar no YouTube
          </a>
        </div>
      )}

      {!loading && !notFound && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={boxStyle}>
            <p style={{ color: '#b8860b', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '1px' }}>🎵 LETRA ORIGINAL</p>
            {lyrics}
          </div>
          {!isPortuguese && (
            <div style={{ ...boxStyle, border: '1px solid #3b82f6' }}>
              <p style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '1px' }}>🇧🇷 TRADUCAO EM PORTUGUES</p>
              {translating
                ? <div style={{ textAlign: 'center', paddingTop: '60px', color: '#888' }}>Traduzindo...</div>
                : translated || <div style={{ color: '#888' }}>Traducao nao disponivel.</div>
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}