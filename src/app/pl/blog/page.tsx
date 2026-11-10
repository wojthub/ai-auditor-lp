import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogIndex from '@/components/BlogIndex';
import { blogIndexMetadata, blogListItems, blogIndexJsonLd, jsonLdHtml } from '@/lib/blogSeo';

export const metadata: Metadata = blogIndexMetadata('pl');

export default async function BlogIndexPl() {
  const posts = await blogListItems('pl');
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(blogIndexJsonLd('pl', posts)) }} />
      <Navbar />
      <BlogIndex posts={posts} lang="pl" />
      <Footer />
    </main>
  );
}
