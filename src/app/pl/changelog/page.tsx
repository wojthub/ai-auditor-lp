import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChangelogPage from '@/components/ChangelogPage';
import { getChangelog } from '@/lib/changelog';
import { socialMeta } from '@/lib/socialMeta';

export const metadata: Metadata = {
  title: 'Nowości w CitationOne - changelog audytu GEO',
  description:
    'Lista zmian w CitationOne od najnowszej: nowe funkcje audytu treści, ulepszenia narzędzi i poprawki. Każdy wpis opisuje, co się zmieniło i jak z tego skorzystać.',
  ...socialMeta({
    lang: 'pl',
    path: '/pl/changelog',
    title: 'Nowości w CitationOne - changelog',
    description: 'Nowe funkcje audytu GEO, ulepszenia narzędzi i poprawki - od najnowszej zmiany.',
  }),
  alternates: alternatesFor('/pl/changelog'),
};

export default async function ChangelogPagePl() {
  const entries = await getChangelog();
  return (
    <main className="min-h-screen">
      <Navbar />
      <ChangelogPage entries={entries} lang="pl" />
      <Footer />
    </main>
  );
}
