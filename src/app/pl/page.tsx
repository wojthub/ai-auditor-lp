import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechLogos from '@/components/TechLogos';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import ForWho from '@/components/ForWho';
import ClosingCta from '@/components/ClosingCta';
import Footer from '@/components/Footer';

export default function PlLandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TechLogos />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <ForWho />
      <ClosingCta />
      <Footer />
    </main>
  );
}
