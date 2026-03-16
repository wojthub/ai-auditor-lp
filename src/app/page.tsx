import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechLogos from '@/components/TechLogos';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
// import SocialProof from '@/components/SocialProof';   // UKRYTA - liczby + testimoniale
// import Pricing from '@/components/Pricing';           // UKRYTA - cennik
// import FAQ from '@/components/FAQ';                   // UKRYTA - FAQ
// import ReportExample from '@/components/ReportExample'; // UKRYTA - przykład raportu
import ForWho from '@/components/ForWho';
import ClosingCta from '@/components/ClosingCta';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TechLogos />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      {/* <SocialProof /> */}
      {/* <ReportExample /> */}
      <ForWho />
      {/* <Pricing /> */}
      {/* <FAQ /> */}
      <ClosingCta />
      <Footer />
    </main>
  );
}
