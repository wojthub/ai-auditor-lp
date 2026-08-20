'use client';

import { motion } from 'framer-motion';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';

/**
 * Masowy audyt (Bulk Audit) — sekcja HP.
 * Fakty wg ../ai-auditor/spec/bulk-audit.md: max 50 URL-i, auto-keyword + CSI,
 * darmowy crawl/podglad, 1 kredyt za potwierdzony URL, kolejka w tle, wynik = folder
 * pojedynczych audytow. Raport ZBIORCZY jest odlozony (Faza 3) — nie obiecujemy go tutaj.
 */

const cards = [
  {
    title: 'Lista URL-i albo sitemapa',
    desc: 'Wklejasz adresy w jednym zleceniu lub podajesz sitemapę - system sam pobierze z niej strony.',
  },
  {
    title: 'Słowa kluczowe bez ręcznej pracy',
    desc: 'Frazę dla każdego adresu wykrywamy automatycznie i wnioskujemy intencję wyszukiwania. Możesz też podać własne frazy i poprawić je w podglądzie.',
  },
  {
    title: 'Płacisz dopiero po potwierdzeniu',
    desc: 'Pobranie treści i podgląd są darmowe. Widzisz listę stron, odznaczasz te do pominięcia i dopiero wtedy schodzi 1 kredyt za każdy audytowany adres.',
  },
  {
    title: 'Kolejka działa w tle',
    desc: 'Audyty wykonują się po Twojej stronie panelu, nawet gdy zamkniesz kartę. Wracasz do folderu z pełnym raportem dla każdej strony osobno.',
  },
];

export default function BulkAudit() {
  return (
    <section id="masowy-audyt" style={{ background: '#f8fafb', padding: '90px 0' }}>
      <div style={{ maxWidth: 1124, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>

        {/* Section label + h2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Masowy audyt</span>
            <div style={{ width: 20, height: 2, background: '#0b7983', borderRadius: 1 }} />
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            color: '#0d0d12',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}>
            Sprawdź cały serwis, nie jedną stronę
          </h2>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>
            Masowy audyt bierze całą listę adresów w jednym zleceniu i przepuszcza każdy z nich przez
            <strong style={{ color: '#0d0d12', fontWeight: 600 }}> ten sam algorytm co audyt pojedynczy</strong> - z benchmarkiem Top 10 SERP i pełnym raportem.
            Dostajesz obraz całej sekcji serwisu zamiast pojedynczego artykułu.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="bulk-cards-grid">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                background: '#ffffff',
                border: '1px solid #dfe1e7',
                borderRadius: 14,
                padding: '22px 24px 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: 'rgba(11,121,131,0.1)', color: '#0b7983',
                  fontSize: 12, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', lineHeight: 1.25, margin: 0 }}>
                  {card.title}
                </h3>
              </div>
              <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: 0 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA + nota o API */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18 }}
        >
          <motion.a
            href={`${APP_URL}/bulk-audit?new=1`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
              borderRadius: 8,
              background: '#0b7983',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              minHeight: 44,
            }}
          >
            Uruchom masowy audyt
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Dwie drogi skalowania — panel dla ludzi, API dla systemow. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: 44, paddingTop: 36, borderTop: '1px solid #dfe1e7' }}
        >
          <h3 style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 700, color: '#0d0d12',
            letterSpacing: '-0.025em', lineHeight: 1.25, margin: '0 0 12px',
          }}>
            Dwie drogi, gdy audytów jest więcej niż kilka
          </h3>
          <p style={{ fontSize: 16, color: '#36394a', lineHeight: 1.72, margin: '0 0 24px', maxWidth: 720 }}>
            Jeden artykuł audytuje się z panelu. Przy setkach adresów - migracji serwisu, przeglądzie
            całego bloga, obsłudze kilku klientów naraz - potrzebny jest tryb, w którym audyt przestaje
            być czynnością, a staje się procesem.
          </p>

          <div className="bulk-scale-grid">
            <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 14, padding: '24px 26px' }}>
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: ACCENT, textTransform: 'uppercase',
                letterSpacing: '0.08em', display: 'block', marginBottom: 10,
              }}>
                Z panelu
              </span>
              <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                Masowy audyt
              </h4>
              <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 14px' }}>
                Wklejasz listę adresów albo sitemapę i zamykasz kartę. Kolejka mieli w tle, a Ty wracasz
                do folderu z osobnym raportem dla każdej strony. Bez integracji i bez pisania kodu.
              </p>
              <span style={{ fontSize: 13.5, color: '#666d80', lineHeight: 1.6 }}>
                Dla zespołów redakcyjnych i agencji.
              </span>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #dfe1e7', borderRadius: 14, padding: '24px 26px' }}>
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: ACCENT, textTransform: 'uppercase',
                letterSpacing: '0.08em', display: 'block', marginBottom: 10,
              }}>
                Przez API
              </span>
              <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0d0d12', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                Audyt jako element Twojego procesu
              </h4>
              <p style={{ fontSize: 14.5, color: '#36394a', lineHeight: 1.65, margin: '0 0 14px' }}>
                Zlecasz audyt z własnego systemu i odbierasz wynik jako JSON - webhookiem, bez odpytywania.
                Treść możesz sprawdzić jeszcze przed publikacją, prosto z CMS-a albo z pipeline&apos;u.
              </p>
              <a href="/pl/api" style={{ fontSize: 13.5, fontWeight: 600, color: ACCENT, textDecoration: 'none' }}>
                Zobacz dokumentację API →
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        .bulk-scale-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bulk-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 860px) {
          .bulk-cards-grid { grid-template-columns: 1fr; }
          .bulk-scale-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
