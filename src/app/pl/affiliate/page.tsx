import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateContent from './AffiliateContent';

export const metadata: Metadata = {
  title: 'Program poleceń CitationOne - 10% prowizji od każdego zamówienia',
  description:
    'Polecaj CitationOne i zarabiaj 10% od każdego zamówienia poleconej osoby. Link polecający na każdym koncie, kliknięcie pamiętane 30 dni, wypłata przelewem albo zamiana na kredyty.',
  openGraph: {
    title: 'Program poleceń CitationOne - 10% od każdego zamówienia',
    description:
      'Prowizja 10% liczona od kwoty netto, także od kolejnych zakupów poleconej osoby. Link polecający czeka w panelu od pierwszego logowania.',
  },
  alternates: alternatesFor('/pl/affiliate'),
};

export default function AffiliatePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AffiliateContent />
      <Footer />
    </main>
  );
}
