// UWAGA: strona lezy w grupie routingu `(en)`, tak jak `/api` i `/affiliate` - grupa nie zmienia
// URL-a (nadal `/changelog`).
import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import ChangelogPage from '@/components/ChangelogPage';
import { getChangelog } from '@/lib/changelog';
import { socialMeta } from '@/lib/socialMeta';

export const metadata: Metadata = {
  title: 'CitationOne changelog - what is new in the GEO audit',
  description:
    'Every CitationOne change, newest first: new content audit features, tool improvements and fixes. Each entry explains what changed and how to use it.',
  ...socialMeta({
    lang: 'en',
    path: '/changelog',
    title: 'CitationOne changelog',
    description: 'New GEO audit features, tool improvements and fixes - newest change first.',
  }),
  alternates: alternatesFor('/changelog'),
};

export default async function ChangelogPageEn() {
  const entries = await getChangelog();
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <ChangelogPage entries={entries} lang="en" />
      <FooterEN />
    </main>
  );
}
