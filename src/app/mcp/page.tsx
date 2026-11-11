import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import McpContent from '@/components/McpContent';
import { socialMeta } from '@/lib/socialMeta';

export const metadata: Metadata = {
  title: 'CitationOne MCP server - GEO audits in Claude and Cursor',
  description:
    'Run GEO audits and read the results in a conversation with an AI assistant. The CitationOne MCP server works with Claude Code, Claude Desktop and Cursor on your API key.',
  ...socialMeta({
    lang: 'en',
    path: '/mcp',
    title: 'CitationOne MCP server',
    description: 'GEO audits in Claude, Cursor and other MCP clients. The same API key and credits as in the dashboard.',
  }),
  alternates: alternatesFor('/mcp'),
};

export default function McpPageEn() {
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <McpContent lang="en" />
      <FooterEN />
    </main>
  );
}
