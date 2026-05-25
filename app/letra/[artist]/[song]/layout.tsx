import { Metadata } from 'next';

type Props = {
  params: Promise<{ artist: string; song: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artist: rawArtist, song: rawSong } = await params;
  const artist = decodeURIComponent(rawArtist);
  const song = decodeURIComponent(rawSong);

  return {
    title: `${song} - ${artist} | Hits de Ouro`,
    description: `Letra de ${song} de ${artist}. Confira a letra completa no Hits de Ouro.`,
    openGraph: {
      title: `${song} - ${artist} | Hits de Ouro`,
      description: `Letra de ${song} de ${artist}. Confira a letra completa no Hits de Ouro.`,
    },
  };
}

export default function LetraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}