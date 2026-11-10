import HeroBackdrop from '@/components/HeroBackdrop';
import type { BlogLang, BlogPost, BlogPostLang } from '@/data/blog';
import { BLOG_COPY, formatDate } from '@/components/BlogCopy';

// Shared - lista wpisow bloga PL (/pl/blog) i EN (/blog). Komponent serwerowy, cala lista w HTML.

export type BlogListItem = BlogPost & { t: BlogPostLang; readingMinutes: number };

export default function BlogIndex({ posts, lang }: { posts: BlogListItem[]; lang: BlogLang }) {
  const c = BLOG_COPY[lang];
  return (
    <section style={{ background: '#ffffff', padding: '44px 0 96px', position: 'relative', overflow: 'hidden' }}>
      <HeroBackdrop />
      <div style={{ maxWidth: 820, margin: '0 auto', paddingLeft: 16, paddingRight: 16, position: 'relative' }}>
        <header style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#818898', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
            {c.label}
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 22,
              background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
          >
            {c.h1}
          </h1>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, maxWidth: 600, margin: '0 auto' }}>{c.lead}</p>
        </header>

        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: 16, color: '#666d80' }}>{c.empty}</p>
        ) : (
          <div style={{ display: 'grid', gap: 18 }}>
            {posts.map((p) => (
              <article
                key={p.id}
                className="card-lift"
                style={{ position: 'relative', background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 16, padding: '24px 26px' }}
              >
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 13, color: '#666d80', marginBottom: 10 }}>
                  <time dateTime={p.date}>{formatDate(p.date, lang)}</time>
                  <span aria-hidden>·</span>
                  <span>{c.minutes(p.readingMinutes)}</span>
                </div>
                <h2 style={{ fontSize: 21, fontWeight: 700, color: '#1a1d29', lineHeight: 1.3, margin: '0 0 10px', letterSpacing: '-0.015em' }}>
                  {/* Rozciagniety link: cala karta jest klikalna, a w HTML zostaje jeden link na wpis. */}
                  <a href={`${c.base}/${p.t.slug}`} className="blog-card-link" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {p.t.title}
                  </a>
                </h2>
                <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 14px' }}>{p.t.description}</p>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#0b7983' }}>{c.readMore} →</span>
              </article>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .blog-card-link::after { content: ''; position: absolute; inset: 0; border-radius: 16px; }
        .blog-card-link:focus-visible { outline: none; }
        .blog-card-link:focus-visible::after { outline: 2px solid #0b7983; outline-offset: 2px; }
      `}</style>
    </section>
  );
}
