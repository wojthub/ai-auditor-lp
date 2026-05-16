'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Czy CitationOne zastępuje tradycyjne narzędzia SEO?',
    answer:
      'Nie. Tradycyjne narzędzia SEO służą do badania pozycji w klasycznym Google. CitationOne sprawdza, czy Twoje treści są zauważane i cytowane przez algorytmy ChatGPT, Perplexity czy Google AI Overview.',
  },
  {
    question: 'Jak szybko otrzymam wynik audytu?',
    answer:
      'Pełna analiza pojedynczej treści trwa poniżej 3 minut.',
  },
  {
    question: 'Czy muszę integrować narzędzie ze swoją stroną?',
    answer:
      'Nie. CitationOne działa w chmurze. Wystarczy podać adres URL, sitemapę lub wkleić tekst. Nie musisz instalować żadnych wtyczek ani modyfikować kodu witryny.',
  },
  {
    question: 'Jak działa system kredytowy i audyt masowy?',
    answer:
      'Stosujemy prosty model: 1 kredyt = 1 pełny audyt URL. W audycie masowym analiza intencji i dobór słów dla sitemapy do 200 URL-i kosztuje tylko 1 kredyt. Ty decydujesz, dla których stron chcesz wygenerować pełne raporty.',
  },
  {
    question: 'Czy moje kredyty mają datę ważności?',
    answer:
      'Nie. W CitationOne nie ma subskrypcji. Kupujesz kredyty w modelu Pay-as-you-go, a one nie przepadają. Korzystasz z nich tylko wtedy, gdy faktycznie audytujesz treść.',
  },
  {
    question: 'Jak wykorzystać 3 darmowe kredyty na start?',
    answer:
      'Wystarczy założyć konto przez Google lub e-mail. Od razu otrzymujesz 3 kredyty, które pozwalają na wykonanie 3 pełnych audytów lub analizę masową sitemapy. Bez podpinania karty.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: '1px solid',
        borderColor: open ? '#b2dfe3' : '#dfe1e7',
        borderRadius: 8,
        overflow: 'hidden',
        background: open ? '#f0f9fa' : '#ffffff',
        transition: 'border-color 0.18s, background 0.18s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px',
          minHeight: 44,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 14.5, fontWeight: 500, color: '#0d0d12', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
          {question}
        </span>
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 5,
            background: open ? '#0b7983' : '#f6f8fa',
            border: `1px solid ${open ? '#0b7983' : '#dfe1e7'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.18s, border-color 0.18s',
          }}
        >
          <svg
            width="12" height="12" fill="none" viewBox="0 0 24 24"
            stroke={open ? '#ffffff' : '#818898'} strokeWidth={2.5}
            style={{ transition: 'transform 0.22s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#36394a', lineHeight: 1.7 }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <section id="faq" style={{ background: '#f8fafb', padding: '58px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ maxWidth: 720, margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 44 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: '#818898', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            FAQ
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 600,
              color: '#0d0d12',
              letterSpacing: '-0.025em',
            }}
          >
            Masz pytania? Poznaj konkrety
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
