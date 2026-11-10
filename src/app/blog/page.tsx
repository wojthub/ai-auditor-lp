import type { Metadata } from 'next';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import BlogIndex from '@/components/BlogIndex';
import { blogIndexMetadata, blogListItems, blogIndexJsonLd, jsonLdHtml } from '@/lib/blogSeo';

export const metadata: Metadata = blogIndexMetadata('en');

export default async function BlogIndexEn() {
  const posts = await blogListItems('en');
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(blogIndexJsonLd('en', posts)) }} />
      <NavbarEN />
      <BlogIndex posts={posts} lang="en" />
      <FooterEN />
    </main>
  );
}
