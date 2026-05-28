'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { useLocale } from '../LocaleProvider';

export default function HarpaPage() {
  const [hinos, setHinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { t } = useLocale();

  useEffect(() => {
    supabase.from('destaques').select('*').eq('tipo', 'harpa').eq('ativo', true).order('ordem')
      .then(({ data }) => { setHinos(data || []); setLoading(false); });
  }, []);

  const filtered = hinos.filter(h =>
    h.song.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <a href="/" style={{ color: '#b8860b', fontSize: '0.85rem', textDecoration: 'none' }}>← Voltar ao início</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <span style={{ fontSize: '2.5rem' }}>🎼</span>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg,#FFD700,#b8860b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Harpa Cristã
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              {hinos.length} hinos disponíveis
            </p>
          </div>
        </div>
      </div>

      {/* Busca */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar hino por nome ou número..."
          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid #b8860b', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {loading && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🎵</p>
          <p style={{ color: 'var(--text-muted)' }}>Carregando hinos...</p>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ color: 'var(--text-muted)' }}>Nenhum hino encontrado.</p>
        </div>
      )}

      {/* Lista de hinos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map((hino, i) => (
          <div key={i} onClick={() => router.push('/letra/' + encodeURIComponent(hino.artist) + '/' + encodeURIComponent(hino.song))}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-card)', borderRadius: '12px', padding: '14px 16px', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#b8860b')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}>
            <span style={{ minWidth: '32px', fontSize: '0.85rem', fontWeight: 'bold', color: i < 3 ? '#FFD700' : 'var(--text-muted)', textAlign: 'center' }}>{hino.ordem}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{hino.song}</p>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>{hino.artist}</p>
            </div>
            <span style={{ color: '#b8860b', fontSize: '1.2rem' }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}