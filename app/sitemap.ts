import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.hitsdeouroletras.com.br';

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/harpa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacidade`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/termos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Letras cadastradas no Supabase
  const { data: letras } = await supabase
    .from('letras')
    .select('artist, song');

  const letraPages: MetadataRoute.Sitemap = (letras || []).map(l => ({
    url: `${baseUrl}/letra/${encodeURIComponent(l.artist)}/${encodeURIComponent(l.song)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Artistas únicos
  const artistas = [...new Set((letras || []).map(l => l.artist))];
  const artistaPages: MetadataRoute.Sitemap = artistas.map(a => ({
    url: `${baseUrl}/artista/${encodeURIComponent(a)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...letraPages, ...artistaPages];
}