import NavbarEN from '@/components/en/NavbarEN';
import HeroBand from '@/components/HeroBand';
import HeroEN from '@/components/en/HeroEN';
import ShowcaseEN from '@/components/en/ShowcaseEN';
import TechLogosEN from '@/components/en/TechLogosEN';
import StatsBand from '@/components/StatsBand';
import Testimonials from '@/components/Testimonials';
import { getTestimonialsAtBuild, testimonialsFor } from '@/lib/testimonials';
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

export default async function LandingPage() {
  // Opinie z panelu /admin/lp wypalone w HTML przy buildzie; komponent odświeża je w przeglądarce.
  const testimonials = testimonialsFor(await getTestimonialsAtBuild(), 'en');
  return (
    <main className="min-h-screen">
      <NavbarEN />
      <HeroBand>
        <HeroEN />
        <ShowcaseEN />
      </HeroBand>
      <Testimonials lang="en" initial={testimonials} />
      <StatsBand lang="en" />
      <ProblemEN />
      <HowItWorksEN />
      <BulkAuditEN />
      <TechLogosEN />
      <DimensionsTeaserEN />
      <ReportSectionEN />
      <ForWhoEN />
      <FAQEN />
      <AuthorSectionEN />
      <ClosingCtaEN />
      <FooterEN />
    </main>
  );
}
