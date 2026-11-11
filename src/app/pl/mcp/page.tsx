import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import McpContent from '@/components/McpContent';
import { socialMeta } from '@/lib/socialMeta';

export const metadata: Metadata = {
  title: 'Serwer MCP CitationOne - audyty GEO w Claude i Cursorze',
  description:
    'Zlecaj audyty GEO i czytaj wyniki w rozmowie z asystentem AI. Serwer MCP CitationOne działa z Claude Code, Claude Desktop i Cursorem na Twoim kluczu API.',
  ...socialMeta({
    lang: 'pl',
    path: '/pl/mcp',
    title: 'Serwer MCP CitationOne',
    description: 'Audyty GEO w Claude, Cursorze i innych klientach MCP. Ten sam klucz API i kredyty co w panelu.',
  }),
  alternates: alternatesFor('/pl/mcp'),
};

export default function McpPagePl() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <McpContent lang="pl" />
      <Footer />
    </main>
  );
}
