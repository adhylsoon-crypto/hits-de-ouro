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
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [copied, setCopied] = useState(false);
  const [albumImg, setAlbumImg] = useState('');
  const [translated, setTranslated] = useState('');
  const [translating, setTranslating] = useState(false);
  const [selectedLang, setSelectedLang] = useState('pt-BR');
  const [showTranslation, setShowTranslation] = useState(false);
  const [detectedLang, setDetectedLang] = useState('');

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setLyrics('');
    setTranslated('');
    setShowTranslation(false);

    fetch('/api/letra?artist=' + encodeURIComponent(artist) + '&song=' + encodeURIComponent(song))
      .then(r => r.json())
      .then(data => {
        if (data?.lyrics) {
          setLyrics(data.lyrics);
          const ptWords = ['de', 'que', 'eu', 'nao', 'voce', 'com', 'uma', 'para', 'por', 'mas', 'ela', 'ele', 'meu', 'minha'];
          const enWords = ['the', 'and', 'you', 'your', 'that', 'this', 'with', 'have', 'for', 'not'];
          const esWords = ['que', 'con', 'una', 'para', 'por', 'pero', 'ella', 'como', 'todo', 'cuando'];
          const lower = data.lyrics.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const ptCount = ptWords.filter(w => lower.includes(' ' + w + ' ')).length;
          const enCount = enWords.filter(w => lower.includes(' ' + w + ' ')).length;
          const esCount = esWords.filter(w => lower.includes(' ' + w + ' ')).length;
          if (ptCount >= 3) { setDetectedLang('pt'); setSelectedLang('en'); }
          else if (esCount >= 3) { setDetectedLang('es'); setSelectedLang('pt-BR'); }
          else { setDetectedLang('en'); setSelectedLang('pt-BR'); }
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

  const handleTranslate = (lang: string) => {
    setSelectedLang(lang);
    setShowTranslation(true);
    setTranslated('');
    setTranslating(true);
    fetch('/api/traduzir?text=' + encodeURIComponent(lyrics) + '&lang=' + lang)
      .then(r => r.json())
      .then(td => {
        if (td?.translated) setTranslated(td.translated);
        setTranslating(false);
      })
      .catch(() => setTranslating(false));
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
          ▶ Ver clipe no YouTube
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
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>Traduzir para:</span>
              <select
                value={selectedLang}
                onChange={e => handleTranslate(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {LANGUAGES.filter(l => l.code !== (detectedLang === 'pt' ? 'pt-BR' : detectedLang === 'es' ? 'es' : 'en')).map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
              <button onClick={() => handleTranslate(selectedLang)} style={{ padding: '6px 16px', borderRadius: '8px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', border: 'none', color: 'black', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
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

          {/* Letra original */}
          {!loading && !notFound && (
            <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '28px', border: '1px solid #b8860b', marginBottom: '16px' }}>
              <p style={{ color: '#b8860b', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '1px' }}>🎵 LETRA ORIGINAL</p>
              <div style={{ lineHeight: '2', fontSize: fontSize + 'px', color: '#e5e5e5', whiteSpace: 'pre-wrap' }}>
                {lyrics}
              </div>
            </div>
          )}

          {/* Tradução embaixo */}
          {showTranslation && !loading && !notFound && (
            <div style={{ background: '#111', borderRadius: '16px', padding: '28px', border: '1px solid #3b82f6', marginBottom: '16px' }}>
              <p style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '1px' }}>
                🌍 TRADUÇÃO — {LANGUAGES.find(l => l.code === selectedLang)?.label}
              </p>
              <div style={{ lineHeight: '2', fontSize: fontSize + 'px', color: '#e5e5e5', whiteSpace: 'pre-wrap' }}>
                {translating ? <p style={{ color: '#888', textAlign: 'center', padding: '40px' }}>Traduzindo...</p> : translated || <p style={{ color: '#888' }}>Traducao nao disponivel.</p>}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar para anúncios */}
        <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'sticky', top: '80px' }}>

            {/* Espaço anúncio 1 */}
            <div style={{ width: '100%', height: '250px', background: '#1a1a1a', border: '1px dashed #333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: '#444', fontSize: '0.75rem' }}>PUBLICIDADE</p>
              <p style={{ color: '#333', fontSize: '0.7rem' }}>300 x 250</p>
            </div>

            {/* Info da música */}
            <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '16px', border: '1px solid #b8860b33' }}>
              {albumImg && <img src={albumImg} alt={song} style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }} />}
              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>{song}</p>
              <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '4px' }}>{artist}</p>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '12px', padding: '10px', borderRadius: '8px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'center' }}>
                ▶ Ver clipe
              </a>
            </div>

            {/* Espaço anúncio 2 */}
            <div style={{ width: '100%', height: '250px', background: '#1a1a1a', border: '1px dashed #333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: '#444', fontSize: '0.75rem' }}>PUBLICIDADE</p>
              <p style={{ color: '#333', fontSize: '0.7rem' }}>300 x 250</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}