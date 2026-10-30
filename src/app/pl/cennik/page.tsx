import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingContent from './PricingContent';
import { socialMeta } from '@/lib/socialMeta';

export const metadata: Metadata = {
  title: 'Cennik - 3 darmowe audyty, potem 2 EUR za audyt',
  description:
    'Proste zasady. Płacisz tylko za to, z czego korzystasz. 3 darmowe audyty na start, 2 EUR za pojedynczy audyt, pakiety elastyczne bez daty ważności.',
  ...socialMeta({
    lang: 'pl',
    path: '/pl/cennik',
    title: 'Cennik CitationOne - Pay-as-you-go bez zobowiązań',
    description: '3 darmowe audyty na start, 2 EUR / audyt, pakiety elastyczne. Bez subskrypcji.',
  }),
  alternates: alternatesFor('/pl/cennik'),
};

export default function CennikPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PricingContent />
      <Footer />
    </main>
  );
}
