import { NextRequest, NextResponse } from 'next/server';

async function translateChunk(text: string, from: string, to: string): Promise<string> {
  try {
    const r = await fetch(
      'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + from + '|' + to,
      { signal: AbortSignal.timeout(6000) }
    );
    const d = await r.json();
    const result = d?.responseData?.translatedText || '';
    const upper = result.toUpperCase();
    if (
      upper.includes('MYMEMORY') ||
      upper.includes('INVALID') ||
      upper.includes('QUERY LENGTH') ||
      upper.includes('YOU USED ALL') ||
      upper.includes('PLEASE SELECT') ||
      upper.includes('DISTINCT')
    ) {
      return '';
    }
    return result;
  } catch {
    return '';
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  const to = searchParams.get('lang') || 'en';
  const fromParam = searchParams.get('from') || 'en';

  if (!text) return NextResponse.json({ translated: '' });

  const fromCode = fromParam === 'pt' ? 'pt-BR' : fromParam;
  const toCode = to === 'pt' ? 'pt-BR' : to;

  if (fromCode === toCode) {
    return NextResponse.json({ translated: '' });
  }

  try {
    const lines = text.split('\n');
    const chunks: string[] = [];
    let current = '';

    for (const line of lines) {
      if ((current + '\n' + line).length > 350) {
        if (current) chunks.push(current.trim());
        current = line;
      } else {
        current = current ? current + '\n' + line : line;
      }
    }
    if (current) chunks.push(current.trim());

    const results = await Promise.all(
      chunks.map(chunk => translateChunk(chunk, fromCode, toCode))
    );
    return NextResponse.json({ translated: results.join('\n') });
  } catch {
    return NextResponse.json({ translated: '' });
  }
}