'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const LANGUAGES = [
  { code: 'pt-BR', label: '🇧🇷 Português' },
  { code: 'en', label: '🇺🇸 English' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'it', label: '🇮🇹 Italiano' },
  { code: 'de', label: '🇩🇪 Deutsch' },
];

export default function LetraPage() {
  const params = useParams();
  const artist = decodeURIComponent(params.artist as string);
  const song = decodeURIComponent(params.song as string);
  const [lyrics, setLyrics] = useState('');
  const [lyricsLines, setLyricsLines] = useState<string[]>([]);
  const [translatedLines, setTranslatedLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [copied, setCopied] = useState(false);
  const [albumImg, setAlbumImg] = useState('');
  const [translating, setTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedLang, setSelectedLang] = useState('pt-BR');

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setLyrics('');
    setTranslatedLines([]);
    setShowTranslation(false);

    fetch('/api/letra?artist=' + encodeURIComponent(artist) + '&song=' + encodeURIComponent(song))
      .then(r => r.json())
      .then(data => {
        if (data?.lyrics) {
          setLyrics(data.lyrics);
          setLyricsLines(data.lyrics.split('\n'));
          const ptWords = ['de', 'que', 'eu', 'nao', 'voce', 'com', 'uma', 'para', 'por', 'mas', 'ela', 'ele'];
          const lower = data.lyrics.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const ptCount = ptWords.filter(w => lower.includes(' ' + w + ' ')).length;
          if (ptCount < 3) {
            setSelectedLang('pt-BR');
            translateLyrics(data.lyrics, 'pt-BR');
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

  const translateLyrics = (text: string, lang: string) => {
    setTranslating(true);
    setShowTranslation(true);
    setTranslatedLines([]);
    fetch('/api/traduzir?text=' + encodeURIComponent(text) + '&lang=' + lang)
      .then(r => r.json())
      .then(td => {
        if (td?.translated) {
          setTranslatedLines(td.translated.split('\n'));
        }
        setTranslating(false);
      })
      .catch(() => setTranslating(false));
  };

  const handleTranslate = () => {
    translateLyrics(lyrics, selectedLang);
  };

  const youtubeUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(artist + ' ' + song + ' oficial');

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>

      {/* Cabeçalho */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {albumImg && <img src={albumImg} alt={song} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #b8860b' }} />}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{song}</h1>
          <p style={{ color: '#aaa', fontSize: '1rem', marginTop: '4px' }}>{artist}</p>
          <a href="/" style={{ color: '#b8860b', fontSize: '0.85rem', textDecoration: 'none' }}>← Voltar ao inicio</a>
        </div>
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', borderRadius: '10px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>
          ▶ Ver clipe
        </a>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>

        {/* Coluna principal */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Controles */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => setFontSize(f => Math.max(12, f - 2))} style={{ padding: '6px 14px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer' }}>A-</button>
            <button onClick={() => setFontSize(f => Math.min(28, f + 2))} style={{ padding: '6px 14px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer' }}>A+</button>
            <button onClick={() => { navigator.clipboard.writeText(lyrics); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ padding: '6px 14px', borderRadius: '8px', background: copied ? '#166534' : '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer' }}>
              {copied ? '✅ Copiado!' : '📋 Copiar'}
            </button>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <select
                value={selectedLang}
                onChange={e => setSelectedLang(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
              <button onClick={handleTranslate} style={{ padding: '6px 16px', borderRadius: '8px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', border: 'none', color: 'black', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
                Traduzir
              </button>
              {showTranslation && (
                <button onClick={() => setShowTranslation(false)} style={{ padding: '6px 12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #555', color: '#888', cursor: 'pointer', fontSize: '0.85rem' }}>
                  Ocultar
                </button>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', paddingTop: '100px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎵</div>
              <p style={{ color: '#888' }}>Buscando letra...</p>
            </div>
          )}

          {/* Não encontrado */}
          {notFound && !loading && (
            <div style={{ textAlign: 'center', paddingTop: '80px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😔</div>
              <p style={{ color: '#888' }}>Letra nao encontrada.</p>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 24px', borderRadius: '10px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                ▶ Buscar no YouTube
              </a>
            </div>
          )}

          {/* Letra linha por linha com tradução */}
          {!loading && !notFound && (
            <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '28px', border: '1px solid #b8860b' }}>
              {translating && (
                <p style={{ color: '#888', textAlign: 'center', marginBottom: '16px', fontSize: '0.85rem' }}>
                  🔄 Traduzindo...
                </p>
              )}
              {lyricsLines.map((line, i) => (
                <div key={i} style={{ marginBottom: line === '' ? '16px' : '4px' }}>
                  {line !== '' && (
                    <>
                      <p style={{ margin: 0, fontSize: fontSize + 'px', color: '#e5e5e5', lineHeight: '1.6' }}>
                        {line}
                      </p>
                      {showTranslation && translatedLines[i] && translatedLines[i] !== '' && (
                        <p style={{ margin: 0, fontSize: (fontSize - 2) + 'px', color: '#FFD700', lineHeight: '1.4', fontStyle: 'italic', marginBottom: '4px' }}>
                          {translatedLines[i]}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar anúncios */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ width: '100%', height: '250px', background: '#1a1a1a', border: '1px dashed #333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: '#444', fontSize: '0.75rem' }}>PUBLICIDADE</p>
              <p style={{ color: '#333', fontSize: '0.7rem' }}>300 x 250</p>
            </div>

            <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '16px', border: '1px solid #b8860b33' }}>
              {albumImg && <img src={albumImg} alt={song} style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }} />}
              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>{song}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '4px', marginBottom: '12px' }}>{artist}</p>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '10px', borderRadius: '8px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'center' }}>
                ▶ Ver clipe no YouTube
              </a>
            </div>

            <div style={{ width: '100%', height: '250px', background: '#1a1a1a', border: '1px dashed #333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: '#444', fontSize: '0.75rem' }}>PUBLICIDADE</p>
              <p style={{ color: '#333', fontSize: '0.7rem' }}>300 x 250</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}