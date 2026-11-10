import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NavbarEN from '@/components/en/NavbarEN';
import FooterEN from '@/components/en/FooterEN';
import BlogPostView from '@/components/BlogPostView';
import { renderPost } from '@/lib/blog';
import { blogPostData, blogPostJsonLd, jsonLdHtml, blogPostMetadata, blogStaticParams, moreBlogPosts } from '@/lib/blogSeo';

// Static export: istnieja wylacznie slugi z rejestru src/data/blog.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogStaticParams('en');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return blogPostMetadata('en', slug);
}

export default async function BlogPostEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = blogPostData('en', slug);
  if (!data) notFound();
  const rendered = await renderPost('en', slug);
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(blogPostJsonLd('en', data.post, data.t, rendered)) }} />
      <NavbarEN />
      <BlogPostView post={data.post} t={data.t} rendered={rendered} more={moreBlogPosts('en', slug)} lang="en" />
      <FooterEN />
    </main>
  );
}
