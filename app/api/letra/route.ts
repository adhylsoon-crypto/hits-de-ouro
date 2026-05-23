import { NextRequest, NextResponse } from 'next/server';

function normalize(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get('artist') || '';
  const song = searchParams.get('song') || '';
  const artistN = normalize(artist);
  const songN = normalize(song);

  // 1. lyrics.ovh (original)
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artist) + '/' + encodeURIComponent(song), { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    if (d?.lyrics && d.lyrics.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 2. lyrics.ovh (normalizado sem acentos)
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artistN) + '/' + encodeURIComponent(songN), { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    if (d?.lyrics && d.lyrics.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 3. ChartLyrics
  try {
    const url = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=' + encodeURIComponent(artist) + '&song=' + encodeURIComponent(song);
    const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const xml = await r.text();
    const match = xml.match(/<Lyric>([\s\S]*?)<\/Lyric>/);
    if (match?.[1] && match[1].trim().length > 50) return NextResponse.json({ lyrics: match[1].trim() });
  } catch {}

  // 4. ChartLyrics (normalizado)
  try {
    const url = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=' + encodeURIComponent(artistN) + '&song=' + encodeURIComponent(songN);
    const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const xml = await r.text();
    const match = xml.match(/<Lyric>([\s\S]*?)<\/Lyric>/);
    if (match?.[1] && match[1].trim().length > 50) return NextResponse.json({ lyrics: match[1].trim() });
  } catch {}

  // 5. lrclib (original)
  try {
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artist) + '&track_name=' + encodeURIComponent(song), { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics && d[0].plainLyrics.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 6. lrclib (normalizado)
  try {
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artistN) + '&track_name=' + encodeURIComponent(songN), { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics && d[0].plainLyrics.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  // 7. musixmatch scrape (fallback)
  try {
    const query = encodeURIComponent(artistN + ' ' + songN);
    const r = await fetch('https://api.musixmatch.com/ws/1.1/track.search?q=' + query + '&apikey=invalid&format=json', { signal: AbortSignal.timeout(4000) });
    const d = await r.json();
    if (d?.message?.body?.track_list?.[0]) {
      const track = d.message.body.track_list[0].track;
      const r2 = await fetch('https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + track.track_id + '&apikey=invalid', { signal: AbortSignal.timeout(4000) });
      const d2 = await r2.json();
      const lyr = d2?.message?.body?.lyrics?.lyrics_body;
      if (lyr && lyr.length > 50) return NextResponse.json({ lyrics: lyr.trim() });
    }
  } catch {}

  // 8. Nome simplificado (sem parenteses)
  try {
    const songSimple = normalize(song.split('(')[0].trim());
    const artistSimple = normalize(artist.split('feat')[0].trim());
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artistSimple) + '/' + encodeURIComponent(songSimple), { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    if (d?.lyrics && d.lyrics.trim().length > 50) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 9. lrclib simplificado
  try {
    const songSimple = normalize(song.split('(')[0].trim());
    const artistSimple = normalize(artist.split('feat')[0].trim());
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artistSimple) + '&track_name=' + encodeURIComponent(songSimple), { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics && d[0].plainLyrics.trim().length > 50) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  return NextResponse.json({ lyrics: null }, { status: 404 });
}