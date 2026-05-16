import type { Metadata } from 'next';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import PricingContentEN from './PricingContentEN';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple rules. You only pay for what you use. 3 free audits to start, EUR 2 per single audit, flexible packages with no expiry date.',
  openGraph: {
    title: 'CitationOne Pricing - Pay-as-you-go with no commitment',
    description: '3 free audits to start, EUR 2 / audit, flexible packages. No subscription.',
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <PricingContentEN />
      <FooterEN />
    </main>
  );
}
