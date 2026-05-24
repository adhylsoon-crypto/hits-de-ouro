import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  const to = searchParams.get('lang') || 'pt';
  const from = searchParams.get('from') || 'en';

  if (!text) return NextResponse.json({ translated: '' });
  if (from === to || (from === 'pt' && to === 'pt')) return NextResponse.json({ translated: '' });

  try {
    // Traduz o texto inteiro de uma vez — muito mais rápido
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const d = await r.json();

    // Junta todos os fragmentos traduzidos
    const translated = d?.[0]?.map((x: any) => x?.[0]).filter(Boolean).join('') || '';

    return NextResponse.json({ translated });
  } catch {
    return NextResponse.json({ translated: '' });
  }
}