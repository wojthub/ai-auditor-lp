import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostView from '@/components/BlogPostView';
import { renderPost } from '@/lib/blog';
import { blogPostData, blogPostJsonLd, jsonLdHtml, blogPostMetadata, blogStaticParams, moreBlogPosts } from '@/lib/blogSeo';

// Static export: istnieja wylacznie slugi z rejestru src/data/blog.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogStaticParams('pl');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return blogPostMetadata('pl', slug);
}

export default async function BlogPostPl({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = blogPostData('pl', slug);
  if (!data) notFound();
  const rendered = await renderPost('pl', slug);
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(blogPostJsonLd('pl', data.post, data.t, rendered)) }} />
      <Navbar />
      <BlogPostView post={data.post} t={data.t} rendered={rendered} more={moreBlogPosts('pl', slug)} lang="pl" />
      <Footer />
    </main>
  );
}
