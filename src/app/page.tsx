import NavbarEN from '@/components/en/NavbarEN';
import HeroBand from '@/components/HeroBand';
import HeroEN from '@/components/en/HeroEN';
import ShowcaseEN from '@/components/en/ShowcaseEN';
import TechLogosEN from '@/components/en/TechLogosEN';
import ProblemEN from '@/components/en/ProblemEN';
import HowItWorksEN from '@/components/en/HowItWorksEN';
import DimensionsTeaserEN from '@/components/en/DimensionsTeaserEN';
import ReportSectionEN from '@/components/en/ReportSectionEN';
import BulkAuditEN from '@/components/en/BulkAuditEN';
import ForWhoEN from '@/components/en/ForWhoEN';
import FAQEN from '@/components/en/FAQEN';
import AuthorSectionEN from '@/components/en/AuthorSectionEN';
import ClosingCtaEN from '@/components/en/ClosingCtaEN';
import FooterEN from '@/components/en/FooterEN';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <HeroBand>
        <HeroEN />
        <ShowcaseEN />
      </HeroBand>
      <ProblemEN />
      <HowItWorksEN />
      <TechLogosEN />
      <DimensionsTeaserEN />
      <ReportSectionEN />
      <BulkAuditEN />
      <ForWhoEN />
      <FAQEN />
      <AuthorSectionEN />
      <ClosingCtaEN />
      <FooterEN />
    </main>
  );
}
