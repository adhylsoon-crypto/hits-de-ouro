import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  const to = searchParams.get('lang') || 'pt';
  const from = searchParams.get('from') || 'en';
  if (!text) return NextResponse.json({ translated: '' });
  if (from === to || (from === 'pt' && to === 'pt')) return NextResponse.json({ translated: '' });

  try {
    const lines = text.split('\n');
    const translatedLines: string[] = [];

    for (const line of lines) {
      if (!line.trim()) { translatedLines.push(''); continue; }
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(line)}`;
        const r = await fetch(url, { signal: AbortSignal.timeout(4000) });
        const d = await r.json();
        const translated = d?.[0]?.map((x: any) => x?.[0]).filter(Boolean).join('') || '';
        translatedLines.push(translated);
      } catch {
        translatedLines.push('');
      }
    }

    return NextResponse.json({ translated: translatedLines.join('\n') });
  } catch {
    return NextResponse.json({ translated: '' });
  }
}