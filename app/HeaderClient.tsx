'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useTheme } from './ThemeProvider';
import { useLocale } from './LocaleProvider';
import { Locale } from './i18n';

const flagSVG = {
  pt: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14" style={{borderRadius:'2px'}}><rect width="20" height="14" fill="#009c3b"/><polygon points="10,1 19,7 10,13 1,7" fill="#FFDF00"/><circle cx="10" cy="7" r="3" fill="#002776"/></svg>,
  en: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14" style={{borderRadius:'2px'}}><rect width="20" height="14" fill="#B22234"/><rect y="2" width="20" height="1.5" fill="white"/><rect y="5" width="20" height="1.5" fill="white"/><rect y="8" width="20" height="1.5" fill="white"/><rect y="11" width="20" height="1.5" fill="white"/><rect width="8" height="7.5" fill="#3C3B6E"/></svg>,
  es: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14" style={{borderRadius:'2px'}}><rect width="20" height="14" fill="#c60b1e"/><rect y="3.5" width="20" height="7" fill="#ffc400"/></svg>,
};

const localeOptions = [
  { value: 'pt' as Locale, flag: flagSVG.pt, label: 'Português' },
  { value: 'en' as Locale, flag: flagSVG.en, label: 'English' },
  { value: 'es' as Locale, flag: flagSVG.es, label: 'Español' },
];

export default function HeaderClient() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const router = useRouter();

  const localeIcon = flagSVG[locale];

  const themeIcon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '⚙️';
  const themeOptions = [
    { value: 'auto', label: t('themeAuto') },
    { value: 'dark', label: t('themeDark') },
    { value: 'light', label: t('themeLight') },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-secondary)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(184,134,11,0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <img src="/logo.png" alt="Hits de Ouro" style={{ height: '48px', width: 'auto' }} />
          </a>

          {/* Nav Desktop */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>{t('home')}</a>
            <a href="/contato" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>{t('contact')}</a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
              <a href="https://www.tiktok.com/@hits_de_ouro" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #333' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
              </a>
              <a href="https://www.youtube.com/@HITSDEOURO" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: '#cc0000' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
              </a>
              <a href="https://www.instagram.com/hits_de_ouro/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://br.pinterest.com/HITSDEOURO/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: '#e60023' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
            </div>

            {/* Seletor de tema */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setThemeOpen(!themeOpen); setLocaleOpen(false); }} style={{ padding: '7px 12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {themeIcon} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>▾</span>
              </button>
              {themeOpen && (
                <div style={{ position: 'absolute', top: '110%', right: 0, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden', minWidth: '150px', zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                  {themeOptions.map(opt => (
                    <button key={opt.value} onClick={() => { setTheme(opt.value as any); setThemeOpen(false); }}
                      style={{ display: 'block', width: '100%', padding: '10px 16px', background: theme === opt.value ? 'rgba(184,134,11,0.15)' : 'transparent', border: 'none', color: theme === opt.value ? '#FFD700' : 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left', fontWeight: theme === opt.value ? 'bold' : 'normal' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Seletor de idioma desktop */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setLocaleOpen(!localeOpen); setThemeOpen(false); }} style={{ padding: '7px 12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {localeIcon} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>▾</span>
              </button>
              {localeOpen && (
                <div style={{ position: 'absolute', top: '110%', right: 0, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden', minWidth: '160px', zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                  {localeOptions.map(opt => (
                    <button key={opt.value} onClick={() => { setLocale(opt.value); setLocaleOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 16px', background: locale === opt.value ? 'rgba(184,134,11,0.15)' : 'transparent', border: 'none', color: locale === opt.value ? '#FFD700' : 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left', fontWeight: locale === opt.value ? 'bold' : 'normal' }}>
                      {opt.flag}{opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a href="/favoritas" style={{ padding: '8px 16px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#FFD700', fontWeight: 'bold', fontSize: '0.85rem', textDecoration: 'none' }}>{t('favorites')}</a>
                <button onClick={handleLogout} style={{ padding: '8px 16px', borderRadius: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>{t('logout')}</button>
              </div>
            ) : (
              <a href="/login" style={{ padding: '8px 20px', borderRadius: '10px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', fontWeight: 'bold', fontSize: '0.9rem', textDecoration: 'none' }}>{t('enter')}</a>
            )}
          </nav>

          {/* Mobile: botões direita */}
          <div className="mobile-right" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
            {/* Tema mobile */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setThemeOpen(!themeOpen); setLocaleOpen(false); }} style={{ padding: '7px 10px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem' }}>
                {themeIcon}
              </button>
              {themeOpen && (
                <div style={{ position: 'fixed', top: '60px', right: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden', minWidth: '150px', zIndex: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  {themeOptions.map(opt => (
                    <button key={opt.value} onClick={() => { setTheme(opt.value as any); setThemeOpen(false); }}
                      style={{ display: 'block', width: '100%', padding: '10px 16px', background: theme === opt.value ? 'rgba(184,134,11,0.15)' : 'transparent', border: 'none', color: theme === opt.value ? '#FFD700' : 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left', fontWeight: theme === opt.value ? 'bold' : 'normal' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Idioma mobile */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setLocaleOpen(!localeOpen); setThemeOpen(false); }} style={{ padding: '7px 10px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {localeIcon}
              </button>
              {localeOpen && (
                <div style={{ position: 'fixed', top: '60px', right: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden', minWidth: '160px', zIndex: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                  {localeOptions.map(opt => (
                    <button key={opt.value} onClick={() => { setLocale(opt.value); setLocaleOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 16px', background: locale === opt.value ? 'rgba(184,134,11,0.15)' : 'transparent', border: 'none', color: locale === opt.value ? '#FFD700' : 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left', fontWeight: locale === opt.value ? 'bold' : 'normal' }}>
                      {opt.flag}{opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <a href="/favoritas" style={{ padding: '7px 12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#FFD700', fontWeight: 'bold', fontSize: '0.8rem', textDecoration: 'none' }}>⭐</a>
            ) : (
              <a href="/login" style={{ padding: '7px 14px', borderRadius: '8px', background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: 'black', fontWeight: 'bold', fontSize: '0.8rem', textDecoration: 'none' }}>{t('enter')}</a>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text-primary)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text-primary)', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }}></span>
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text-primary)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
            </button>
          </div>
        </div>

        {/* Faixa de redes sociais — só mobile */}
        <div className="mobile-social" style={{ display: 'none', justifyContent: 'center', gap: '10px', padding: '8px 20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
          <a href="https://www.tiktok.com/@hits_de_ouro" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #333' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
          </a>
          <a href="https://www.youtube.com/@HITSDEOURO" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '8px', background: '#cc0000' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
          </a>
          <a href="https://www.instagram.com/hits_de_ouro/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '8px', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
          <a href="https://br.pinterest.com/HITSDEOURO/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '8px', background: '#e60023' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
          </a>
        </div>

        {/* Menu hamburguer aberto */}
        {menuOpen && (
          <div className="mobile-menu" style={{ display: 'none', flexDirection: 'column', padding: '12px 20px 16px', borderTop: '1px solid var(--border-color)', gap: '4px', background: 'var(--bg-secondary)' }}>
            <a href="/" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1rem', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>{t('home')}</a>
            <a href="/contato" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1rem', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>{t('contact')}</a>
            {user && (
              <button onClick={handleLogout} style={{ padding: '10px 0', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'left' }}>{t('logout')}</button>
            )}
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-right { display: flex !important; }
            .mobile-social { display: flex !important; }
            .mobile-menu { display: flex !important; }
          }
        `}</style>
      </header>
    </>
  );
}