'use client';

import { useEffect, useState } from 'react';
import { APP_URL } from '@/lib/appUrl';
import type { BlogLang } from '@/data/blog';
import { BLOG_COPY } from '@/components/BlogCopy';

// CTA podazajace za czytelnikiem wpisu:
// - od 1180 px karta przyklejona obok tresci (`position: sticky`, czysty CSS, widoczna od razu),
// - ponizej belka na dole ekranu. Wjezdza po przewinieciu naglowka wpisu i chowa sie, gdy na
//   ekran wchodzi koncowe CTA (#blog-end-cta) - nie dubluje go i nie zaslania stopki.
// Klikniecia liczy globalny RegisterClickTracker (link do /register); klasy blog-side-cta
// i blog-bar-cta odrozniaja te CTA w `link_classes` zdarzenia register_click.

const ACCENT = '#0b7983';

export function BlogSideCta({ lang }: { lang: BlogLang }) {
  const c = BLOG_COPY[lang];
  return (
    <aside className="blog-side" aria-label={c.ctaTitle}>
      <div className="blog-side-card">
        <p className="blog-side-title">{c.ctaTitle}</p>
        <p className="blog-side-text">{c.sideText}</p>
        <a href={`${APP_URL}/register?lang=${lang}`} className="blog-side-cta btn-pop">
          {c.cta} →
        </a>
      </div>
      <style>{`
        .blog-side { display: none; }
        @media (min-width: 1180px) {
          .blog-side { display: block; position: sticky; top: 96px; align-self: start; }
        }
        .blog-side-card { background: linear-gradient(160deg, #f0f8f9 0%, #ffffff 100%); border: 1px solid #d7ecee; border-radius: 16px; padding: 22px 20px; box-shadow: 0 8px 24px -16px rgba(11,121,131,0.35); }
        .blog-side-title { font-size: 17px; font-weight: 700; color: #0d0d12; line-height: 1.3; letter-spacing: -0.01em; margin: 0 0 8px; }
        .blog-side-text { font-size: 14px; color: #36394a; line-height: 1.6; margin: 0 0 16px; }
        .blog-side-cta { display: block; text-align: center; background: ${ACCENT}; color: #fff; font-weight: 600; font-size: 14.5px; padding: 11px 14px; border-radius: 8px; text-decoration: none; }
      `}</style>
    </aside>
  );
}

export function BlogBottomBar({ lang }: { lang: BlogLang }) {
  const c = BLOG_COPY[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const head = document.getElementById('blog-article-head');
    const end = document.getElementById('blog-end-cta');
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const pastHead = head ? head.getBoundingClientRect().bottom < 0 : window.scrollY > 400;
      const beforeEnd = end ? end.getBoundingClientRect().top > vh : true;
      setVisible(pastHead && beforeEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`blog-bar${visible ? ' is-on' : ''}`} aria-hidden={!visible}>
      <div className="blog-bar-inner">
        <div className="blog-bar-copy">
          <p className="blog-bar-title">{c.barTitle}</p>
          <p className="blog-bar-sub">{c.barSub}</p>
        </div>
        <a href={`${APP_URL}/register?lang=${lang}`} className="blog-bar-cta" tabIndex={visible ? 0 : -1}>
          {c.barCta}
        </a>
      </div>
      <style>{`
        .blog-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; background: rgba(255,255,255,0.97); border-top: 1px solid #dfe1e7; box-shadow: 0 -8px 24px -12px rgba(13,13,18,0.18); padding: 10px 16px calc(10px + env(safe-area-inset-bottom)); transform: translateY(110%); transition: transform 0.22s ease; backdrop-filter: saturate(1.4) blur(8px); -webkit-backdrop-filter: saturate(1.4) blur(8px); }
        .blog-bar.is-on { transform: translateY(0); }
        @media (min-width: 1180px) { .blog-bar { display: none; } }
        @media (prefers-reduced-motion: reduce) { .blog-bar { transition: none; } }
        .blog-bar-inner { max-width: 740px; margin: 0 auto; display: flex; align-items: center; gap: 12px; }
        .blog-bar-copy { flex: 1; min-width: 0; }
        .blog-bar-title { margin: 0; font-size: 14px; font-weight: 700; color: #0d0d12; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .blog-bar-sub { margin: 2px 0 0; font-size: 12.5px; color: #666d80; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        /* Belka ma zawsze dwie linie tekstu (tytul + podtytul) - zawijanie dawalo trzy i zaslanialo tresc. */
        .blog-bar-cta { flex-shrink: 0; display: inline-flex; align-items: center; min-height: 44px; background: ${ACCENT}; color: #fff; font-weight: 600; font-size: 14px; padding: 0 16px; border-radius: 8px; text-decoration: none; white-space: nowrap; }
      `}</style>
    </div>
  );
}
