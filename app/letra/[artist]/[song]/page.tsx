'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import { useLocale } from '../../../LocaleProvider';
import { useRouter } from 'next/navigation';

export default function LetraPage() {
  const params = useParams();
  const { t } = useLocale();
  const artist = decodeURIComponent(params.artist as string);
  const song = decodeURIComponent(params.song as string);
  const [lyrics, setLyrics] = useState('');
  const [lyricsLines, setLyricsLines] = useState<string[]>([]);
  const [translatedLines, setTranslatedLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [copied, setCopied] = useState(false);
  const [albumImg, setAlbumImg] = useState('');
  const [isPt, setIsPt] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [favLoading, setFavLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [letraEnviada, setLetraEnviada] = useState('');
  const [compositor, setCompositor] = useState('');
  const [formArtist, setFormArtist] = useState('');
  const [formSong, setFormSong] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formMsg, setFormMsg] = useState('');
  const [enviador, setEnviador] = useState('');
  const [compositorLetra, setCompositorLetra] = useState('');
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [comentarioLoading, setComentarioLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase.from('favoritos').select('id').eq('user_id', user.id).eq('artist', artist).eq('song', song).maybeSingle()
      .then(({ data }) => setIsFavorited(!!data));
  }, [user, artist, song]);

  useEffect(() => {
    carregarComentarios();
  }, [artist, song]);

  const carregarComentarios = async () => {
    const { data } = await supabase.from('comentarios').select('*').eq('artist', artist).eq('song', song).order('created_at', { ascending: false });
    setComentarios(data || []);
  };

  const toggleFavorito = async () => {
    if (!user) { window.location.href = '/login'; return; }
    setFavLoading(true);
    if (isFavorited) {
      await supabase.from('favoritos').delete().eq('user_id', user.id).eq('artist', artist).eq('song', song);
      setIsFavorited(false);
    } else {
      await supabase.from('favoritos').insert({ user_id: user.id, artist, song, album_img: albumImg });
      setIsFavorited(true);
    }
    setFavLoading(false);
  };

  const abrirForm = () => {
    setFormArtist(artist);
    setFormSong(song);
    setShowForm(true);
  };

  const enviarLetra = async () => {
    if (!letraEnviada.trim() || letraEnviada.trim().length < 50) { setFormMsg(t('minChars')); return; }
    if (!formArtist.trim() || !formSong.trim()) { setFormMsg('Preencha o artista e o nome da música.'); return; }
    setFormLoading(true);
    setFormMsg('');
    const { error } = await supabase.from('letras_pendentes').insert({
      artist: formArtist.trim(),
      song: formSong.trim(),
      lyrics: letraEnviada.trim(),
      compositor: compositor.trim(),
      enviado_por: user.id,
      email_enviado: user.email,
    });
    if (error) { setFormMsg(t('errorSend')); }
    else {
      setFormMsg(t('successSend'));
      setLetraEnviada('');
      setCompositor('');
    }
    setFormLoading(false);
  };

  const enviarComentario = async () => {
    if (!novoComentario.trim()) return;
    if (!user) { window.location.href = '/login'; return; }
    setComentarioLoading(true);
    const { data: profile } = await supabase.from('profiles').select('name').eq('id', user.id).single();
    const nome = profile?.name || user.email?.split('@')[0] || 'Usuário';
    await supabase.from('comentarios').insert({ artist, song, user_id: user.id, user_nome: nome, comentario: novoComentario.trim() });
    setNovoComentario('');
    carregarComentarios();
    setComentarioLoading(false);
  };

  const deletarComentario = async (id: string) => {
    await supabase.from('comentarios').delete().eq('id', id);
    setComentarios(prev => prev.filter(c => c.id !== id));
  };

  useEffect(() => {
    setLoading(true); setNotFound(false); setLyrics(''); setTranslatedLines([]); setShowTranslation(false);
    fetch('/api/letra?artist=' + encodeURIComponent(artist) + '&song=' + encodeURIComponent(song))
      .then(r => r.json())
      .then(data => {
        if (data?.lyrics) {
          setLyrics(data.lyrics);
          setLyricsLines(data.lyrics.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n'));
          setEnviador(data.enviado_por_nome || '');
          setCompositorLetra(data.compositor || '');
          const ptWords = ['de', 'que', 'eu', 'nao', 'voce', 'com', 'uma', 'para', 'por', 'mas', 'ela', 'ele', 'meu', 'minha'];
          const lower = data.lyrics.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const ptCount = ptWords.filter((w: string) => lower.includes(' ' + w + ' ')).length;
          const isBr = ptCount >= 3;
          setIsPt(isBr);
          if (!isBr) {
            setTranslating(true); setShowTranslation(true);
            fetch('/api/traduzir?text=' + encodeURIComponent(data.lyrics) + '&from=en&lang=pt')
              .then(r => r.json()).then(td => { if (td?.translated) setTranslatedLines(td.translated.split('\n')); setTranslating(false); })
              .catch(() => setTranslating(false));
          }
        } else { setNotFound(true); }
        setLoading(false);
      }).catch(() => { setNotFound(true); setLoading(false); });
  }, [artist, song]);

  useEffect(() => {
    fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(artist + ' ' + song) + '&entity=song&limit=1')
      .then(r => r.json()).then(data => {
        if (data.results?.[0]?.artworkUrl100) setAlbumImg(data.results[0].artworkUrl100.replace('100x100bb', '600x600bb'));
      }).catch(() => {});
  }, [artist, song]);

  const youtubeUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(artist + ' ' + song + ' oficial');

  const handleSearchLyric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const parts = searchQuery.trim().split(' ');
    router.push('/letra/' + encodeURIComponent(parts[0]) + '/' + encodeURIComponent(parts.slice(1).join(' ') || parts[0]));
    setSearchQuery('');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '12px' : '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {albumImg && <img src={albumImg} alt={song} style={{ width: isMobile ? '60px' : '90px', height: isMobile ? '60px' : '90px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #b8860b' }} />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: isMobile ? '1.3rem' : '1.8rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song}</h1>
          <a href={'/artista/' + encodeURIComponent(artist)} style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '2px', textDecoration: 'none', display: 'block' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFD700')}
            onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}>
            {artist}
          </a>
          <a href="/" style={{ color: '#b8860b', fontSize: '0.8rem', textDecoration: 'none' }}>{t('back')}</a>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={toggleFavorito} disabled={favLoading} style={{ padding: isMobile ? '8px 14px' : '10px 20px', borderRadius: '10px', background: isFavorited ? 'linear-gradient(135deg,#FFD700,#b8860b)' : '#1a1a1a', border: '1px solid #b8860b', color: isFavorited ? 'black' : '#FFD700', fontWeight: 'bold', fontSize: isMobile ? '0.8rem' : '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {isFavorited ? t('favorited') : t('favorite')}
          </button>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ padding: isMobile ? '8px 14px' : '10px 20px', borderRadius: '10px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: isMobile ? '0.8rem' : '0.9rem', whiteSpace: 'nowrap' }}>▶ {t('viewClip')}</a>
        </div>
      </div>

      {isMobile && !notFound && (
        <div style={{ width: '100%', height: '80px', background: '#111', border: '1px dashed #333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <p style={{ color: '#444', fontSize: '0.7rem' }}>PUBLICIDADE</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '24px', flexDirection: isMobile ? 'column' : 'row' }}>

        {/* Coluna principal */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => setFontSize(f => Math.max(12, f - 2))} style={{ padding: '6px 12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>A-</button>
            <button onClick={() => setFontSize(f => Math.min(28, f + 2))} style={{ padding: '6px 12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>A+</button>
            <button onClick={() => { navigator.clipboard.writeText(lyrics); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ padding: '6px 12px', borderRadius: '8px', background: copied ? '#166534' : '#1a1a1a', border: '1px solid #b8860b', color: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
              {copied ? t('copied') : t('copyLyrics')}
            </button>
            {!isPt && translatedLines.length > 0 && (
              <button onClick={() => setShowTranslation(v => !v)} style={{ padding: '6px 12px', borderRadius: '8px', background: showTranslation ? '#1e3a5f' : '#1a1a1a', border: '1px solid #3b82f6', color: 'white', cursor: 'pointer', fontSize: '0.85rem', marginLeft: 'auto' }}>
                {showTranslation ? t('hidePT') : t('showPT')}
              </button>
            )}
          </div>

          {loading && (
            <div style={{ textAlign: 'center', paddingTop: '80px' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>♪</p>
              <p style={{ color: '#888' }}>{t('loadingLyric')}</p>
            </div>
          )}

          {notFound && !loading && (
            <div style={{ textAlign: 'center', paddingTop: '60px' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>:(</p>
              <p style={{ color: '#888', marginBottom: '24px' }}>{t('lyricsNotFound')}</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 24px', borderRadius: '10px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>▶ {t('searchYoutube')}</a>
                <button onClick={abrirForm} style={{ padding: '10px 24px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{t('sendLyric')}</button>
              </div>

              {showForm && (
                <div style={{ marginTop: '32px', background: '#1a1a1a', borderRadius: '16px', padding: '24px', border: '1px solid #b8860b', textAlign: 'left', maxWidth: '600px', margin: '32px auto 0' }}>
                  <h3 style={{ color: '#FFD700', marginBottom: '16px', fontSize: '1.1rem' }}>{t('sendLyricTitle')} {song}</h3>
                  {!user ? (
                    <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{t('loginToSend')} <a href="/login" style={{ color: '#FFD700' }}>{t('loginToSend2')}</a> {t('loginToSend3')}</p>
                  ) : (
                    <>
                      <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>🎤 Artista</label>
                      <input value={formArtist} onChange={e => setFormArtist(e.target.value)} placeholder="Ex: Luan Santana"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: '#111', border: '1px solid #b8860b', color: 'white', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }} />
                      <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>🎵 Nome da Música</label>
                      <input value={formSong} onChange={e => setFormSong(e.target.value)} placeholder="Ex: Água Com Açúcar"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: '#111', border: '1px solid #b8860b', color: 'white', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }} />
                      <div style={{ background: 'rgba(184,134,11,0.1)', border: '1px solid #b8860b33', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px', fontSize: '0.8rem', color: '#b8860b' }}>
                        ⚠️ Verifique se o <strong>artista</strong> e o <strong>nome da música</strong> estão corretos antes de enviar.
                      </div>
                      <label style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>📝 Letra</label>
                      <textarea value={letraEnviada} onChange={e => setLetraEnviada(e.target.value)} placeholder={t('pasteLyric') + ' (' + song + ')'} rows={10}
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: 'white', fontSize: '0.9rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }} />
                      <input value={compositor} onChange={e => setCompositor(e.target.value)} placeholder={t('composerPlaceholder')}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: 'white', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }} />
                      {formMsg && <p style={{ color: formMsg.includes('sucesso') ? '#4ade80' : '#f87171', fontSize: '0.85rem', marginBottom: '8px' }}>{formMsg}</p>}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={enviarLetra} disabled={formLoading} style={{ padding: '10px 24px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold', opacity: formLoading ? 0.7 : 1 }}>
                          {formLoading ? t('sending') : t('send')}
                        </button>
                        <button onClick={() => { setShowForm(false); setLetraEnviada(''); setCompositor(''); setFormMsg(''); }} style={{ padding: '10px 24px', borderRadius: '10px', background: 'transparent', border: '1px solid #333', color: '#888', cursor: 'pointer' }}>{t('cancel')}</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {!loading && !notFound && (
            <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: isMobile ? '16px' : '28px', border: '1px solid #b8860b' }}>
              {translating && <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>{t('loadingTranslation')}</p>}
              {lyricsLines.map((line, i) => (
                <div key={i} style={{ marginBottom: line === '' ? '20px' : '0px' }}>
                  {line !== '' && (
                    <>
                      <p style={{ margin: 0, fontSize: fontSize + 'px', color: 'var(--text-primary)', lineHeight: '1.8' }}>{line}</p>
                      {showTranslation && translatedLines[i] && translatedLines[i].trim() !== '' && (
                        <p style={{ margin: 0, fontSize: (fontSize - 2) + 'px', color: '#FFD700', lineHeight: '1.5', fontStyle: 'italic', marginBottom: '4px' }}>{translatedLines[i]}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
              <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #333' }}>
                {compositorLetra && <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '4px' }}>{t('composition')} {compositorLetra}</p>}
                {enviador && <p style={{ color: '#666', fontSize: '0.8rem' }}>{t('sentBy')} {enviador}</p>}
              </div>
            </div>
          )}

          {/* Comentários */}
          {!loading && !notFound && (
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '16px' }}>{t('comments')}</h3>
              {user ? (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'flex-start' }}>
                  <textarea value={novoComentario} onChange={e => setNovoComentario(e.target.value)} placeholder={t('writeComment')} rows={3}
                    style={{ flex: 1, padding: '12px', borderRadius: '10px', background: '#1a1a1a', border: '1px solid #333', color: 'white', fontSize: '0.9rem', resize: 'none', outline: 'none' }} />
                  <button onClick={enviarComentario} disabled={comentarioLoading} style={{ padding: '10px 16px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    {comentarioLoading ? '...' : t('comment')}
                  </button>
                </div>
              ) : (
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>
                  <a href="/login" style={{ color: '#FFD700' }}>{t('enter')}</a> {t('loginToComment')}
                </p>
              )}
              {comentarios.length === 0 && <p style={{ color: '#555', fontSize: '0.85rem' }}>{t('noComments')}</p>}
              {comentarios.map(c => (
                <div key={c.id} style={{ background: '#1a1a1a', borderRadius: '12px', padding: '14px 16px', border: '1px solid #222', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#FFD700,#b8860b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black', fontSize: '0.85rem' }}>
                        {c.user_nome?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ margin: 0, color: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>{c.user_nome}</p>
                        <p style={{ margin: 0, color: '#555', fontSize: '0.75rem' }}>{new Date(c.created_at).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    {user && user.id === c.user_id && (
                      <button onClick={() => deletarComentario(c.id)} style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
                    )}
                  </div>
                  <p style={{ margin: 0, color: '#ccc', fontSize: '0.9rem', lineHeight: '1.5' }}>{c.comentario}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar desktop */}
        {!isMobile && !notFound && (
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
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '10px', borderRadius: '8px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'center' }}>▶ {t('viewClip')} YouTube</a>
              </div>
              <div style={{ width: '100%', height: '250px', background: '#1a1a1a', border: '1px dashed #333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                <p style={{ color: '#444', fontSize: '0.75rem' }}>PUBLICIDADE</p>
                <p style={{ color: '#333', fontSize: '0.7rem' }}>300 x 250</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isMobile && !notFound && (
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '14px', borderRadius: '12px', background: '#cc0000', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>▶ {t('viewClip')} YouTube</a>
          <div style={{ width: '100%', height: '80px', background: '#111', border: '1px dashed #333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#444', fontSize: '0.7rem' }}>PUBLICIDADE</p>
          </div>
        </div>
      )}

      {/* Barra de busca flutuante */}
      <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 99, width: isMobile ? 'calc(100% - 32px)' : '600px' }}>
        <form onSubmit={handleSearchLyric} style={{ display: 'flex', gap: '8px', background: 'var(--bg-card)', borderRadius: '16px', padding: '8px', border: '1px solid #b8860b', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }} />
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
            {t('searchBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}
