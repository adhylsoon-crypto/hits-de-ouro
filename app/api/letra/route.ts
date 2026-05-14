import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get('artist') || '';
  const song = searchParams.get('song') || '';

  // 1. ChartLyrics (boa cobertura BR e global)
  try {
    const url = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=' + encodeURIComponent(artist) + '&song=' + encodeURIComponent(song);
    const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const xml = await r.text();
    const match = xml.match(/<Lyric>([\s\S]*?)<\/Lyric>/);
    if (match && match[1] && match[1].trim().length > 50) {
      return NextResponse.json({ lyrics: match[1].trim() });
    }
  } catch {}

  // 2. lyrics.ovh
  try {
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artist) + '/' + encodeURIComponent(song), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics && d.lyrics.trim().length > 50) {
      return NextResponse.json({ lyrics: d.lyrics.trim() });
    }
  } catch {}

  // 3. lrclib
  try {
    const r = await fetch('https://lrclib.net/api/search?artist_name=' + encodeURIComponent(artist) + '&track_name=' + encodeURIComponent(song), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics && d[0].plainLyrics.trim().length > 50) {
      return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
    }
  } catch {}

  // 4. Tenta nome simplificado
  try {
    const songSimple = song.split('(')[0].trim();
    const r = await fetch('https://api.lyrics.ovh/v1/' + encodeURIComponent(artist) + '/' + encodeURIComponent(songSimple), { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics && d.lyrics.trim().length > 50) {
      return NextResponse.json({ lyrics: d.lyrics.trim() });
    }
  } catch {}

  return NextResponse.json({ lyrics: null }, { status: 404 });
}