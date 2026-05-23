import type { Metadata } from 'next';

type Props = {
  params: { artist: string; song: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = decodeURIComponent(params.artist);
  const song = decodeURIComponent(params.song);

  return {
    title: `${song} - ${artist} | Letra | Hits de Ouro`,
    description: `Letra de ${song} de ${artist}. Confira a letra completa com traducao no Hits de Ouro.`,
    keywords: `letra ${song}, ${artist}, musica, letra completa, hits de ouro`,
    openGraph: {
      title: `${song} - ${artist} | Letra`,
      description: `Letra completa de ${song} - ${artist}`,
      type: 'website',
      siteName: 'Hits de Ouro',
    },
    twitter: {
      card: 'summary',
      title: `${song} - ${artist} | Letra`,
      description: `Letra completa de ${song} - ${artist}`,
    },
  };
}

export default function LetraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}