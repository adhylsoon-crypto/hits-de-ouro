import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function normalize(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get('artist') || '';
  const song = searchParams.get('song') || '';
  const artistN = normalize(artist);
  const songN = normalize(song);
  const artistS = normalize(artist.split('feat')[0].split('&')[0].trim());
  const songS = normalize(song.split('(')[0].split('-')[0].trim());
  const token = process.env.GENIUS_ACCESS_TOKEN || '';

// 1. Busca no Supabase (letras cadastradas manualmente)
  try {
    const { data: rows } = await supabase
      .from('letras')
      .select('artist, song, lyrics, compositor, enviado_por_nome');

    if (rows && rows.length > 0) {
      // Extrai palavras significativas (mais de 2 letras) para comparação
      const songWords = songN.split(/\s+/).filter((w: string) => w.length > 2);
      const artistWords = artistN.split(/\s+/).filter((w: string) => w.length > 2);

      const found = rows.find((r: any) => {
        const rArtist = normalize(r.artist);
        const rSong = normalize(r.song);

        // Match exato normalizado
        const exactMatch =
          (rArtist.includes(artistS) || artistS.includes(rArtist) || rArtist.includes(artistN) || artistN.includes(rArtist)) &&
          (rSong.includes(songS) || songS.includes(rSong) || rSong.includes(songN) || songN.includes(rSong));

        if (exactMatch) return true;

        // Match por palavras-chave — útil para hinos com "- Hino 49" no nome
        const artistMatch = artistWords.length > 0 && artistWords.every((w: string) => rArtist.includes(w));
        const songMatch = songWords.length > 0 && songWords.filter((w: string) => rSong.includes(w)).length >= Math.min(2, songWords.length);

        return artistMatch && songMatch;
      });

      if (found?.lyrics && found.lyrics.trim().length > 50) {
        return NextResponse.json({
          lyrics: found.lyrics.trim(),
          compositor: found.compositor || '',
          enviado_por_nome: found.enviado_por_nome || '',
        });
      }
    }
  } catch {}
  // 2. Genius API
  if (token) {
    try {
      const queries = [artistS + ' ' + songS, artist + ' ' + song];
      let pageUrl = '';
      for (const q of queries) {
        const sr = await fetch('https://api.genius.com/search?q=' + encodeURIComponent(q), {
          headers: { Authorization: 'Bearer ' + token },
          signal: AbortSignal.timeout(6000)
        });
        const sd = await sr.json();
        const hits = sd?.response?.hits || [];
        for (const hit of hits) {
          const hitArtist = normalize(hit?.result?.primary_artist?.name || '');
          const hitTitle = normalize(hit?.result?.title || '');
          const artistWords = artistS.split(' ').filter((w: string) => w.length > 2);
          const songWords = songS.split(' ').filter((w: string) => w.length > 2);
          const artistMatch = artistWords.some((w: string) => hitArtist.includes(w));
          const songMatch = songWords.some((w: string) => hitTitle.includes(w));
          if (artistMatch && songMatch) { pageUrl = hit.result.url; break; }
        }
        if (pageUrl) break;
      }
      if (pageUrl) {
        const pr = await fetch(pageUrl, {
          signal: AbortSignal.timeout(8000),
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const html = await pr.text();
        const containerRegex = /data-lyrics-container="true"[^>]*>([\s\S]*?)<\/div>/g;
        const lyricParts: string[] = [];
        let match;
        while ((match = containerRegex.exec(html)) !== null) {
          const part = match[1]
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            .trim();
          if (part.length > 0) lyricParts.push(part);
        }
        if (lyricParts.length > 0) {
          const lyrics = lyricParts.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
          if (lyrics.length > 50) return NextResponse.json({ lyrics });
        }
      }
    } catch {}
  }

  // 3. lyrics.ovh original
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artist) + '/' + encodeURIComponent(song), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics?.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 4. lyrics.ovh normalizado
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artistN) + '/' + encodeURIComponent(songN), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics?.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 5. lyrics.ovh simplificado
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artistS) + '/' + encodeURIComponent(songS), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics?.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 6. lrclib original
  try {
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artist) + '&track_name=' + encodeURIComponent(song), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics?.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 7. lrclib normalizado
  try {
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artistN) + '&track_name=' + encodeURIComponent(songN), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics?.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 8. lrclib busca geral
  try {
    const r = await fetch('https://lrclib.net/api/search?q=' + encodeURIComponent(artistS + ' ' + songS), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics?.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 9. ChartLyrics
  try {
    const url = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=' + encodeURIComponent(artistS) + '&song=' + encodeURIComponent(songS);
    const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const xml = await r.text();
    const match = xml.match(/<Lyric>([\s\S]*?)<\/Lyric>/);
    if (match?.[1] && match[1].trim().length > 50) return NextResponse.json({ lyrics: match[1].trim() });
  } catch {}

  return NextResponse.json({ lyrics: null }, { status: 404 });
}