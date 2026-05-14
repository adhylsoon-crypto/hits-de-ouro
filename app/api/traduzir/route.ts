import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  if (!text) return NextResponse.json({ translated: '' });

  const lines = text.split('\n').slice(0, 30).join('\n').slice(0, 400);

  try {
    const r = await fetch(
      'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(lines) + '&langpair=en|pt-BR',
      { signal: AbortSignal.timeout(5000) }
    );
    const d = await r.json();
    if (d?.responseData?.translatedText && !d.responseData.translatedText.includes('QUERY LENGTH')) {
      return NextResponse.json({ translated: d.responseData.translatedText });
    }
  } catch {}

  return NextResponse.json({ translated: 'Traducao temporariamente indisponivel.' });
}