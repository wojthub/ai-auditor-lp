import { APP_URL } from '@/lib/appUrl';
import type { BlogLang, BlogPost, BlogPostLang } from '@/data/blog';
import type { RenderedPost } from '@/lib/blog';
import { BLOG_COPY, AUTHOR_URL, formatDate } from '@/components/BlogCopy';
import { BlogSideCta, BlogBottomBar } from '@/components/BlogStickyCta';

// Shared - pojedynczy wpis bloga PL (/pl/blog/[slug]) i EN (/blog/[slug]). Komponent serwerowy:
// HTML tresci powstaje z Markdowna w czasie builda (src/lib/blog.ts).

const ACCENT = '#0b7983';

export default function BlogPostView({
  post,
  t,
  rendered,
  more,
  lang,
}: {
  post: BlogPost;
  t: BlogPostLang;
  rendered: RenderedPost;
  more: { slug: string; title: string }[];
  lang: BlogLang;
}) {
  const c = BLOG_COPY[lang];
  const showToc = rendered.toc.length >= 3;

  return (
    <article style={{ background: '#ffffff', padding: '32px 0 88px' }}>
      {/* Od 1180 px dwie kolumny: tresc 740 px + przyklejona karta CTA; ponizej sama tresc + belka. */}
      <div className="blog-layout">
      <div className="blog-main">
        <nav aria-label={c.breadcrumbAria} style={{ fontSize: 13, color: '#818898', marginBottom: 22, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <a href={c.home} style={{ color: '#666d80', textDecoration: 'none' }}>CitationOne</a>
          <span aria-hidden>/</span>
          <a href={c.base} style={{ color: '#666d80', textDecoration: 'none' }}>{c.label}</a>
        </nav>

        <header id="blog-article-head" style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(1.9rem, 4.4vw, 2.7rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#0d0d12', margin: '0 0 18px' }}>
            {t.title}
          </h1>
          <p style={{ fontSize: 18, color: '#36394a', lineHeight: 1.65, margin: '0 0 22px' }}>{t.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', fontSize: 13.5, color: '#666d80', paddingBottom: 22, borderBottom: '1px solid #eceff3' }}>
            <img src="/author.jpg" alt="" width={36} height={36} style={{ borderRadius: '50%', objectFit: 'cover' }} />
            <span>
              <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer author" style={{ color: '#1a1d29', fontWeight: 600, textDecoration: 'none' }}>
                {c.author}
              </a>
              <span style={{ display: 'block', fontSize: 12.5 }}>{c.authorRole}</span>
            </span>
            <span aria-hidden className="blog-meta-sep" style={{ color: '#c4c9d4' }}>|</span>
            <span>
              {c.published} <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            </span>
            {post.updated && post.updated !== post.date && (
              <span>
                {c.updated} <time dateTime={post.updated}>{formatDate(post.updated, lang)}</time>
              </span>
            )}
            <span>{c.minutes(rendered.readingMinutes)}</span>
          </div>
        </header>

        {showToc && (
          // Zwiniety domyslnie (<details> bez JS): lead i ramka z najwazniejszymi informacjami zostaja
          // nad linia zgiecia, a spis rozwija ten, kto go szuka.
          <nav aria-label={c.toc} style={{ marginBottom: 36 }}>
            <details className="blog-toc">
              <summary>
                <span>{c.toc}</span>
                <span className="blog-toc-count">{rendered.toc.length}</span>
                <svg className="blog-toc-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <ol>
                {rendered.toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </details>
          </nav>
        )}

        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: rendered.html }} />

        <aside id="blog-end-cta" style={{ marginTop: 52, background: 'linear-gradient(135deg, #f0f8f9 0%, #f8fafb 100%)', border: '1px solid #d7ecee', borderRadius: 16, padding: '28px 28px 30px' }}>
          <p style={{ fontSize: 21, fontWeight: 700, color: '#0d0d12', margin: '0 0 10px', letterSpacing: '-0.015em' }}>{c.ctaTitle}</p>
          <p style={{ fontSize: 15.5, color: '#36394a', lineHeight: 1.7, margin: '0 0 18px' }}>{c.ctaText}</p>
          <a
            href={`${APP_URL}/register?lang=${lang}`}
            className="btn-pop"
            style={{ display: 'inline-block', background: ACCENT, color: '#ffffff', fontWeight: 600, fontSize: 15, padding: '12px 22px', borderRadius: 8, textDecoration: 'none' }}
          >
            {c.cta} →
          </a>
        </aside>

        {more.length > 0 && (
          <nav aria-label={c.more} style={{ marginTop: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#818898', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 14px' }}>{c.more}</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
              {more.map((m) => (
                <li key={m.slug}>
                  <a href={`${c.base}/${m.slug}`} style={{ fontSize: 16, fontWeight: 600, color: '#1a1d29', textDecoration: 'none' }}>{m.title} →</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <p style={{ marginTop: 36 }}>
          <a href={c.base} style={{ fontSize: 14.5, fontWeight: 600, color: ACCENT, textDecoration: 'none' }}>← {c.back}</a>
        </p>
      </div>
      <BlogSideCta lang={lang} />
      </div>
      <BlogBottomBar lang={lang} />

      <style>{`
        /* globals.css daje html/body overflow-x: hidden - to robi z body kontener przewijania i wylacza
           position: sticky karty CTA. clip tnie tak samo, ale bez kontenera; tylko na stronie wpisu.
           Przegladarka bez clip odrzuca deklaracje i zostaje przy hidden (karta wtedy nie podaza). */
        html, body { overflow-x: clip !important; }
        .blog-layout { padding: 0 16px; }
        .blog-main { max-width: 740px; margin: 0 auto; min-width: 0; }
        @media (min-width: 1180px) {
          .blog-layout { display: grid; grid-template-columns: minmax(0, 740px) 260px; gap: 56px; justify-content: center; }
          .blog-main { margin: 0; }
        }
        .blog-toc { background: #f8fafb; border: 1px solid #eceff3; border-radius: 12px; }
        .blog-toc summary { list-style: none; cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 14px 20px; font-size: 12px; font-weight: 700; color: #666d80; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 12px; }
        .blog-toc summary::-webkit-details-marker { display: none; }
        .blog-toc summary:hover { color: #0d0d12; }
        .blog-toc summary:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; }
        .blog-toc-count { font-size: 11.5px; font-weight: 600; letter-spacing: 0; color: ${ACCENT}; background: #e6f4f5; border-radius: 999px; padding: 1px 8px; }
        .blog-toc-chevron { margin-left: auto; transition: transform 0.16s ease; }
        .blog-toc[open] .blog-toc-chevron { transform: rotate(180deg); }
        .blog-toc ol { margin: 0; padding: 0 20px 16px 40px; display: grid; gap: 6px; list-style: decimal; }
        .blog-toc li { font-size: 15px; line-height: 1.5; }
        .blog-toc li::marker { color: #a4acb9; }
        .blog-toc a { color: ${ACCENT}; text-decoration: none; }
        .blog-toc a:hover { text-decoration: underline; }
        .blog-prose { font-size: 17px; line-height: 1.78; color: #2b2f3d; overflow-wrap: break-word; }
        .blog-prose > * + * { margin-top: 1.1em; }
        .blog-prose > :first-child { margin-top: 0; }
        .blog-prose p, .blog-prose li { overflow-wrap: anywhere; }
        .blog-prose td, .blog-prose th { overflow-wrap: break-word; }
        .blog-prose h2 { font-size: 1.6rem; font-weight: 700; color: #0d0d12; letter-spacing: -0.02em; line-height: 1.25; margin-top: 2.2em; scroll-margin-top: 88px; }
        .blog-prose h3 { font-size: 1.22rem; font-weight: 700; color: #0d0d12; letter-spacing: -0.01em; line-height: 1.35; margin-top: 1.8em; scroll-margin-top: 88px; }
        .blog-prose h4 { font-size: 1.05rem; font-weight: 700; color: #0d0d12; margin-top: 1.5em; }
        .blog-prose a { color: ${ACCENT}; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .blog-prose a:hover { text-decoration-thickness: 2px; }
        .blog-prose strong { color: #0d0d12; font-weight: 650; }
        .blog-prose ul, .blog-prose ol { padding-left: 1.4em; }
        .blog-prose ul { list-style: disc; }
        .blog-prose ol { list-style: decimal; }
        .blog-prose li + li { margin-top: 0.45em; }
        .blog-prose li > ul, .blog-prose li > ol { margin-top: 0.45em; }
        .blog-prose li > p + p { margin-top: 0.6em; }
        .blog-prose ul ul { list-style: circle; }
        .blog-prose ol ol { list-style: lower-alpha; }
        .blog-prose li:has(> input[type="checkbox"]) { list-style: none; margin-left: -1.4em; }
        .blog-prose input[type="checkbox"] { margin-right: 8px; accent-color: ${ACCENT}; }
        .blog-prose del { color: #818898; }
        .blog-prose mark { background: #fff3c4; padding: 0 0.15em; border-radius: 3px; }
        .blog-prose kbd { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.85em; border: 1px solid #d5d9e1; border-bottom-width: 2px; border-radius: 5px; padding: 0.05em 0.4em; background: #fff; }
        .blog-prose dl dt { font-weight: 650; color: #0d0d12; }
        .blog-prose dl dd { margin: 0.2em 0 0.8em 1.2em; }
        .blog-prose details { border: 1px solid #e7e9ef; border-radius: 10px; padding: 12px 16px; }
        .blog-prose summary { cursor: pointer; font-weight: 650; color: #0d0d12; }
        .blog-prose details[open] summary { margin-bottom: 0.6em; }
        .blog-prose blockquote > * + * { margin-top: 0.7em; }
        .blog-prose li::marker { color: ${ACCENT}; }
        .blog-prose blockquote { border-left: 3px solid ${ACCENT}; background: #f4f9fa; padding: 14px 20px; border-radius: 0 10px 10px 0; color: #2b2f3d; }
        .blog-prose .blog-key { border: 1.5px solid #9fd3d8; background: #f2fafb; border-radius: 14px; padding: 18px 22px 20px; margin-top: 1.6em; margin-bottom: 1.6em; }
        .blog-prose .blog-key + * { margin-top: 0; }
        .blog-prose .blog-key-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .blog-prose .blog-key-icon { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; flex-shrink: 0; border-radius: 50%; background: #fff6d6; color: #b7791f; border: 1px solid #f3e1a6; }
        .blog-prose .blog-key-title { margin: 0; font-size: 1.02rem; font-weight: 700; color: #0d0d12; line-height: 1.35; }
        .blog-prose .blog-key-body > * + * { margin-top: 0.7em; }
        .blog-prose .blog-key-body ul, .blog-prose .blog-key-body ol { margin: 0; }
        .blog-prose .blog-key-body li { line-height: 1.65; }
        .blog-prose code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.88em; background: #f1f3f6; padding: 0.12em 0.38em; border-radius: 5px; }
        .blog-prose pre { background: #0f1720; color: #e6edf3; padding: 16px 18px; border-radius: 10px; overflow-x: auto; font-size: 14px; line-height: 1.6; }
        .blog-prose pre code { background: none; padding: 0; color: inherit; font-size: inherit; }
        .blog-prose img { max-width: 100%; height: auto; border-radius: 12px; border: 1px solid #eceff3; }
        .blog-prose figure { margin-left: 0; margin-right: 0; }
        .blog-prose figcaption { font-size: 14px; color: #666d80; text-align: center; margin-top: 8px; line-height: 1.5; }
        /* Osadzenia wklejone jako HTML (YouTube, Loom, wideo) - zawsze pelna szerokosc kolumny, proporcja 16:9. */
        .blog-prose iframe, .blog-prose video { display: block; width: 100%; max-width: 100%; height: auto; aspect-ratio: 16 / 9; border: 0; border-radius: 12px; background: #0f1720; }
        .blog-prose svg { max-width: 100%; height: auto; }
        .blog-prose hr { border: 0; border-top: 1px solid #eceff3; margin: 2.4em 0; }
        .blog-prose .blog-table { overflow-x: auto; border: 1px solid #e7e9ef; border-radius: 10px; }
        .blog-prose table { width: 100%; border-collapse: collapse; font-size: 15px; line-height: 1.55; }
        .blog-prose .blog-table + * { margin-top: 1.1em; }
        .blog-prose th { background: #f8fafb; text-align: left; font-weight: 650; color: #0d0d12; }
        .blog-prose th, .blog-prose td { padding: 10px 14px; border-bottom: 1px solid #eceff3; vertical-align: top; }
        .blog-prose tr:last-child td { border-bottom: 0; }
        @media (max-width: 640px) {
          .blog-prose { font-size: 16px; }
          .blog-meta-sep { display: none; }
          .blog-prose h2 { font-size: 1.38rem; }
          .blog-prose h3 { font-size: 1.12rem; }
          .blog-prose .blog-key { padding: 16px 16px 18px; }
          .blog-prose table { font-size: 14px; }
          .blog-prose th, .blog-prose td { padding: 8px 10px; min-width: 120px; }
          .blog-prose pre { font-size: 13px; margin-left: -16px; margin-right: -16px; border-radius: 0; }
        }
      `}</style>
    </article>
  );
}
