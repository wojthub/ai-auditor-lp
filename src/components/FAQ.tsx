'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Czym różni się audyt AI Search od klasycznego audytu SEO?',
    answer:
      'Klasyczny audyt SEO sprawdza techniczne aspekty strony, linki i słowa kluczowe. Audyt AI Search analizuje, czy treść jest cytowalny przez modele językowe (ChatGPT, Perplexity, Google AI Overview) - to zupełnie inne kryteria: gęstość informacji, struktura odpowiedzi, graf wiedzy, BLUF. Nasze narzędzie specjalizuje się właśnie w tym wymiarze.',
  },
  {
    question: 'Ile trwa jeden audyt?',
    answer:
      'Cały proces - od wklejenia URL do gotowego raportu - zajmuje zazwyczaj 10–15 minut. Narzędzie samo pobiera treść strony, dane SERP i analizuje AI Overview. Nie musisz nic robić w tym czasie.',
  },
  {
    question: 'Czy raport nadaje się do bezpośredniego wysłania klientowi?',
    answer:
      'Tak. Raport PDF jest zaprojektowany tak, żeby można go wysłać klientowi bez edycji. Zawiera Content Quality Score, wykres radarowy 10 wymiarów, tabelę priorytetów z rekomendacjami Przed i Po i benchmark SERP - wszystko w czytelnym, profesjonalnym formacie.',
  },
  {
    question: 'Co to jest Content Quality Score i jak jest liczony?',
    answer:
      'Content Quality Score (CQS) to wynik 0-100 obliczany jako ważona suma 10 wymiarów: zgodność z intencją (13%), pokrycie AI Overview (13%), graf wiedzy (13%), gęstość informacji (11%), BLUF (11%), role semantyczne (9%), autonomiczność sekcji (7%), koszt ekstrakcji (6%), TF-IDF (6%), wysiłek redakcyjny (6%) oraz E-E-A-T (5%). Dodatkowo narzędzie wylicza AI Citability Score (0-10), który koncentruje się wyłącznie na czynnikach cytowania przez modele językowe.',
  },
  {
    question: 'Czy narzędzie działa z każdym rodzajem treści?',
    answer:
      'Narzędzie analizuje każdą publicznie dostępną stronę - artykuły blogowe, poradniki, strony eksperckie, landing page z treścią. Wymaga tylko publicznego URL i słowa kluczowego, pod kątem którego ma być oceniany content.',
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
  return (
    <section id="faq" style={{ background: '#f8fafb', padding: '58px 0' }}>
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
            Najczęstsze pytania
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
