import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Cennik',
  description:
    'Proste zasady. Płacisz tylko za to, z czego korzystasz. 3 darmowe audyty na start, 2 EUR za pojedynczy audyt, pakiety elastyczne bez daty ważności.',
  openGraph: {
    title: 'Cennik CitationOne - Pay-as-you-go bez zobowiązań',
    description: '3 darmowe audyty na start, 2 EUR / audyt, pakiety elastyczne. Bez subskrypcji.',
  },
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
