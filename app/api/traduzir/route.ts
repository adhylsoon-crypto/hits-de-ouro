import { NextRequest, NextResponse } from 'next/server';

async function translateChunk(text: string): Promise<string> {
  try {
    const r = await fetch(
      'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|pt-BR',
      { signal: AbortSignal.timeout(5000) }
    );
    const d = await r.json();
    const result = d?.responseData?.translatedText || '';
    if (
      result.includes('MYMEMORY WARNING') ||
      result.includes('QUERY LENGTH') ||
      result.includes('YOU USED ALL')
    ) {
      return text;
    }
    return result || text;
  } catch {
    return text;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  if (!text) return NextResponse.json({ translated: '' });

  try {
    const lines = text.split('\n');
    const chunks: string[] = [];
    let current = '';

    for (const line of lines) {
      if ((current + '\n' + line).length > 400) {
        if (current) chunks.push(current.trim());
        current = line;
      } else {
        current = current ? current + '\n' + line : line;
      }
    }
    if (current) chunks.push(current.trim());

    const results = await Promise.all(chunks.map(chunk => translateChunk(chunk)));
    const translated = results.join('\n');

    return NextResponse.json({ translated });
  } catch {
    return NextResponse.json({ translated: 'Traducao temporariamente indisponivel.' });
  }
}