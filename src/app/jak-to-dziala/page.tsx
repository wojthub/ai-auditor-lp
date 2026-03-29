import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageContent from './PageContent';

export default function JakToDzialaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageContent />
      <Footer />
    </main>
  );
}
