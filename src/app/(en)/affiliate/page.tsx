// UWAGA: ta strona LEZY w grupie routingu `(en)`, tak samo jak `/api` — grupa nie zmienia URL-a
// (nadal `/affiliate`), a trzyma strony EN obok siebie zamiast wprost w `src/app/`.
import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/languageSwitch';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import AffiliateContentEN from './AffiliateContentEN';

export const metadata: Metadata = {
  title: 'CitationOne referral program - 10% on every order',
  description:
    'Refer CitationOne and earn 10% of every order your referrals place. A referral link on every account, clicks remembered for 30 days, payout in cash or audit credits.',
  openGraph: {
    title: 'CitationOne referral program - 10% on every order',
    description:
      'A 10% commission on the net order value, repeating on later purchases too. The link is already in your account, live from the first sign-in.',
  },
  alternates: alternatesFor('/affiliate'),
};

export default function AffiliatePage() {
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <AffiliateContentEN />
      <FooterEN />
    </main>
  );
}
