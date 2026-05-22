import { NextRequest, NextResponse } from 'next/server';

async function translate(text: string, from: string, to: string): Promise<string> {
  if (!text.trim()) return '';
  
  const fromCode = from === 'pt' ? 'pt' : from === 'pt-BR' ? 'pt' : from;
  const toCode = to === 'pt-BR' ? 'pt' : to;
  
  if (fromCode === toCode) return '';

  const servers = [
    'https://libretranslate.com',
    'https://translate.argosopentech.com',
    'https://libretranslate.de',
  ];

  for (const server of servers) {
    try {
      const r = await fetch(server + '/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, source: fromCode, target: toCode, format: 'text' }),
        signal: AbortSignal.timeout(8000),
      });
      const d = await r.json();
      if (d?.translatedText && !d.translatedText.includes('error')) {
        return d.translatedText;
      }
    } catch {}
  }
  return '';
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '';
  const to = searchParams.get('lang') || 'en';
  const from = searchParams.get('from') || 'en';
  if (!text) return NextResponse.json({ translated: '' });

  try {
    const lines = text.split('\n');
    const chunks: string[] = [];
    let current = '';

    for (const line of lines) {
      if ((current + '\n' + line).length > 500) {
        if (current) chunks.push(current.trim());
        current = line;
      } else {
        current = current ? current + '\n' + line : line;
      }
    }
    if (current) chunks.push(current.trim());

    const results: string[] = [];
    for (const chunk of chunks) {
      const result = await translate(chunk, from, to);
      results.push(result);
    }

    return NextResponse.json({ translated: results.join('\n') });
  } catch {
    return NextResponse.json({ translated: '' });
  }
}