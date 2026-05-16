import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechLogos from '@/components/TechLogos';
import Problem from '@/components/Problem';
import HowItWorks from '@/components/HowItWorks';
import DimensionsTeaser from '@/components/DimensionsTeaser';
import ReportSection from '@/components/ReportSection';
import ForWho from '@/components/ForWho';
import FAQ from '@/components/FAQ';
import ClosingCta from '@/components/ClosingCta';
import Footer from '@/components/Footer';

export default function PlLandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TechLogos />
      <Problem />
      <HowItWorks />
      <DimensionsTeaser />
      <ReportSection />
      <ForWho />
      <FAQ />
      <ClosingCta />
      <Footer />
    </main>
  );
}
