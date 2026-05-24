import { NextRequest, NextResponse } from 'next/server';

function normalize(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
}

function slug(str: string) {
  return normalize(str).replace(/\s+/g, '-');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get('artist') || '';
  const song = searchParams.get('song') || '';
  const artistN = normalize(artist);
  const songN = normalize(song);
  const artistSimple = normalize(artist.split('feat')[0].split('&')[0].trim());
  const songSimple = normalize(song.split('(')[0].split('-')[0].trim());

  // 1. lyrics.ovh original
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artist) + '/' + encodeURIComponent(song), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics?.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 2. lyrics.ovh normalizado
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artistN) + '/' + encodeURIComponent(songN), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics?.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 3. lyrics.ovh simplificado
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artistSimple) + '/' + encodeURIComponent(songSimple), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics?.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 4. lrclib original
  try {
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artist) + '&track_name=' + encodeURIComponent(song), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics?.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 5. lrclib normalizado
  try {
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artistN) + '&track_name=' + encodeURIComponent(songN), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics?.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 6. lrclib simplificado
  try {
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artistSimple) + '&track_name=' + encodeURIComponent(songSimple), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics?.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 7. lrclib busca geral
  try {
    const r = await fetch('https://lrclib.net/api/search?q=' + encodeURIComponent(artistSimple + ' ' + songSimple), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics?.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 8. ChartLyrics original
  try {
    const url = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=' + encodeURIComponent(artist) + '&song=' + encodeURIComponent(song);
    const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const xml = await r.text();
    const match = xml.match(/<Lyric>([\s\S]*?)<\/Lyric>/);
    if (match?.[1]?.trim().length > 50) return NextResponse.json({ lyrics: match[1].trim() });
  } catch {}

  // 9. ChartLyrics normalizado
  try {
    const url = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=' + encodeURIComponent(artistSimple) + '&song=' + encodeURIComponent(songSimple);
    const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const xml = await r.text();
    const match = xml.match(/<Lyric>([\s\S]*?)<\/Lyric>/);
    if (match?.[1]?.trim().length > 50) return NextResponse.json({ lyrics: match[1].trim() });
  } catch {}

  // 10. Genius scrape via genius.com
  try {
    const geniusSlug = slug(artistSimple) + '-' + slug(songSimple) + '-lyrics';
    const r = await fetch('https://genius.com/' + geniusSlug, {
      signal: AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await r.text();
    const containers = html.match(/data-lyrics-container="true"[^>]*>([\s\S]*?)<\/div>/g);
    if (containers && containers.length > 0) {
      const raw = containers.map(c => c.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')).join('\n');
      const decoded = raw.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      if (decoded.trim().length > 50) return NextResponse.json({ lyrics: decoded.trim() });
    }
  } catch {}

  // 11. Genius com artista simplificado variação
  try {
    const artistVar = artistSimple.replace(/\s+e\s+/g, '-').replace(/\s+/g, '-');
    const songVar = songSimple.replace(/\s+/g, '-');
    const geniusSlug = artistVar + '-' + songVar + '-lyrics';
    const r = await fetch('https://genius.com/' + geniusSlug, {
      signal: AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await r.text();
    const containers = html.match(/data-lyrics-container="true"[^>]*>([\s\S]*?)<\/div>/g);
    if (containers && containers.length > 0) {
      const raw = containers.map(c => c.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')).join('\n');
      const decoded = raw.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      if (decoded.trim().length > 50) return NextResponse.json({ lyrics: decoded.trim() });
    }
  } catch {}

  return NextResponse.json({ lyrics: null }, { status: 404 });
}