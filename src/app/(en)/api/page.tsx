// UWAGA: ta strona LEZY w grupie routingu `(en)`, a nie wprost w `src/app/api/`.
// Grupa nie zmienia URL-a (nadal `/api`), ale wyjmuje plik ze sciezki `app/api/…`,
// ktora Next traktuje jak API routes Pages Routera: przy `output: 'export'` build
// przerywal sie na `PageNotFoundError: Cannot find module for page: /_document`
// juz na etapie „Collecting page data". Nie przenos tego katalogu z powrotem.
import type { Metadata } from 'next';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import ApiContentEN from './ApiContentEN';

export const metadata: Metadata = {
  title: 'API',
  description:
    'Run CitationOne audits programmatically and pull the result as JSON. API keys, asynchronous jobs, bulk requests up to 50 URLs. Documentation also available as Markdown for AI agents.',
  openGraph: {
    title: 'CitationOne API - AI Search audits over REST',
    description:
      'REST + JSON, API key auth, bulk requests, public report links. 1 audit = 1 credit. Docs also served as Markdown for agents.',
  },
};

export default function ApiPage() {
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <ApiContentEN />
      <FooterEN />
    </main>
  );
}
