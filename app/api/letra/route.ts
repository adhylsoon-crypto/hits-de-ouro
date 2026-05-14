import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get('artist') || '';
  const song = searchParams.get('song') || '';

  const clean = (s: string) => s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '').trim()
    .replace(/\s+/g, '-');

  // 1. Letras.mus.br (melhor cobertura BR)
  try {
    const url = `https://www.letras.mus.br/${clean(artist)}/${clean(song)}/`;
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(6000) });
    const html = await r.text();
    const match = html.match(/class="cnt-letra[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    if (match) {
      const lyrics = match[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      if (lyrics.length > 50) return NextResponse.json({ lyrics });
    }
  } catch {}

  // 2. lyrics.ovh
  try {
    const r = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`, { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.lyrics) return NextResponse.json({ lyrics: d.lyrics.trim() });
  } catch {}

  // 3. lrclib
  try {
    const r = await fetch(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(song)}`, { signal: AbortSignal.timeout(5000) });
    const d = await r.json();
    if (d?.[0]?.plainLyrics) return NextResponse.json({ lyrics: d[0].plainLyrics.trim() });
  } catch {}

  return NextResponse.json({ lyrics: null }, { status: 404 });
}