import { NextRequest, NextResponse } from 'next/server';

async function translateChunk(text: string, lang: string): Promise<string> {
  try {
    const r = await fetch(
      'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|' + lang,
      { signal: AbortSignal.timeout(5000) }
    );
    const d = await r.json();
    const result = d?.responseData?.translatedText || '';
    if (
      result.includes('MYMEMORY WARNING') ||
      result.includes('QUERY LENGTH') ||
      result.includes('YOU USED ALL') ||
      result.includes('INVALID SOURCE') ||
      result.includes('IS AN INVALID')
    ) {
      return '';
    }
    return result || '';
  } catch {
    return '';
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  const lang = searchParams.get('lang') || 'pt-BR';
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

    const results = await Promise.all(chunks.map(chunk => translateChunk(chunk, lang)));
    return NextResponse.json({ translated: results.join('\n') });
  } catch {
    return NextResponse.json({ translated: '' });
  }
}