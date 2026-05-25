import { Metadata } from 'next';

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name: rawName } = await params;
  const name = decodeURIComponent(rawName);
  return {
    title: `${name} - Letras de Músicas | Hits de Ouro`,
    description: `Todas as letras de ${name} no Hits de Ouro.`,
  };
}

export default function ArtistaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}