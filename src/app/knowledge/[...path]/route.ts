import { knowledgeFiles } from '@/lib/knowledge';

// Paczka wiedzy w Open Knowledge Format pod /knowledge/*.md - kazdy plik powstaje przy buildzie
// (static export), tresc w src/lib/knowledge.ts.
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(await knowledgeFiles()).map((p) => ({ path: p.split('/') }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const body = (await knowledgeFiles())[path.join('/')];
  if (body === undefined) return new Response('Not found', { status: 404 });
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
