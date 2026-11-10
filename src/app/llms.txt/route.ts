import { llmsTxt } from '@/lib/knowledge';

// Static export: plik powstaje przy buildzie jako out/llms.txt. Treść - patrz src/lib/knowledge.ts.
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
