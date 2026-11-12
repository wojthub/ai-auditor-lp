import Navbar from '@/components/Navbar';
import HeroBand from '@/components/HeroBand';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import TechLogos from '@/components/TechLogos';
import StatsBand from '@/components/StatsBand';
import Testimonials from '@/components/Testimonials';
import { getTestimonialsAtBuild, testimonialsFor } from '@/lib/testimonials';
import Problem from '@/components/Problem';
import HowItWorks from '@/components/HowItWorks';
import DimensionsTeaser from '@/components/DimensionsTeaser';
import ReportSection from '@/components/ReportSection';
import BulkAudit from '@/components/BulkAudit';
import ForWho from '@/components/ForWho';
import FAQ from '@/components/FAQ';
import AuthorSection from '@/components/AuthorSection';
import ClosingCta from '@/components/ClosingCta';
import Footer from '@/components/Footer';

export default async function PlLandingPage() {
  // Opinie z panelu /admin/lp wypalone w HTML przy buildzie; komponent odświeża je w przeglądarce.
  const testimonials = testimonialsFor(await getTestimonialsAtBuild(), 'pl');
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroBand>
        <Hero />
        <Showcase />
      </HeroBand>
      <Testimonials lang="pl" initial={testimonials} />
      <StatsBand lang="pl" />
      <Problem />
      <HowItWorks />
      <BulkAudit />
      <TechLogos />
      <DimensionsTeaser />
      <ReportSection />
      <ForWho />
      <FAQ />
      <AuthorSection />
      <ClosingCta />
      <Footer />
    </main>
  );
}
