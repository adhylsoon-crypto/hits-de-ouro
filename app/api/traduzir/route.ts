import { NextRequest, NextResponse } from 'next/server';

async function translateChunk(text: string, from: string, to: string): Promise<string> {
  if (from === to) return '';
  try {
    const langpair = from + '|' + to;
    const r = await fetch(
      'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + langpair,
      { signal: AbortSignal.timeout(6000) }
    );
    const d = await r.json();
    const result = d?.responseData?.translatedText || '';
    if (
      result.toUpperCase().includes('MYMEMORY') ||
      result.toUpperCase().includes('INVALID') ||
      result.toUpperCase().includes('QUERY LENGTH') ||
      result.toUpperCase().includes('YOU USED ALL') ||
      result.toUpperCase().includes('PLEASE SELECT') ||
      result.toUpperCase().includes('DISTINCT')
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
  const to = searchParams.get('lang') || 'pt-BR';
  const from = searchParams.get('from') || 'en';

  if (!text) return NextResponse.json({ translated: '' });
  if (from === to || (from === 'pt' && to === 'pt-BR') || (from === 'pt-BR' && to === 'pt-BR')) {
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

    const results = await Promise.all(chunks.map(chunk => translateChunk(chunk, from, to)));
    return NextResponse.json({ translated: results.join('\n') });
  } catch {
    return NextResponse.json({ translated: '' });
  }
}