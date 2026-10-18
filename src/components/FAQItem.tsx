'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Pojedyncze pytanie FAQ z rozwijana odpowiedzia (PL i EN). Wydzielone z `FAQ`/`FAQEN`, zeby
 * sama sekcja byla komponentem serwerowym - hydratuja sie tylko akordeony (od 2026-10-18).
 */
export default function FAQItem({ question, answer }: { question: string; answer: string }) {
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

      {/* Odpowiedz jest w HTML-u zawsze (takze zwinieta): czytaja ja roboty bez JS, a <noscript> w layoucie ja rozwija. */}
      <motion.div
        className="faq-answer"
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#36394a', lineHeight: 1.7 }}>
          {answer}
        </div>
      </motion.div>
    </div>
  );
}
