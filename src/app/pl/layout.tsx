import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import { socialMeta } from '@/lib/socialMeta';
import HtmlLang from '@/components/HtmlLang';

export const metadata: Metadata = {
  title: {
    default: 'Narzędzie do optymalizacji treści pod GEO - CitationOne',
    // Marka TYLKO na stronie glownej (w `default`) - patrz nota w src/app/layout.tsx.
    template: '%s',
  },
  description:
    'Sprawdź, czy ChatGPT, Claude i Google AI Overview zacytują Twoją treść. 11 wymiarów, benchmark SERP, gotowe poprawki Przed i Po. Raport w 5 minut.',
  ...socialMeta({
    lang: 'pl',
    path: 'https://citationone.com/pl',
    title: 'CitationOne - Optymalizacja treści pod GEO',
    description: 'Sprawdź, czy AI zacytuje Twoją treść. 11 wymiarów, benchmark SERP, rekomendacje Przed i Po. Raport w 5 minut.',
  }),
  alternates: alternatesFor('/pl'),
};

export default function PlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="pl">
      {/* <html lang="pl"> w gotowym HTML ustawia scripts/set-html-lang.mjs po buildzie; to dla przejść bez przeładowania. */}
      <HtmlLang lang="pl" />
      {children}
    </div>
  );
}
