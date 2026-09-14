'use client';

import { motion } from 'framer-motion';
import HeroBackdrop from '@/components/HeroBackdrop';

const APP_URL = 'https://app.citationone.com';
const ACCENT = '#0b7983';

// Te liczby MUSZA zgadzac sie z ustawieniami programu w aplikacji (`AFFILIATE_COMMISSION_BPS`,
// okno atrybucji w middleware) ORAZ z polska wersja tej strony. Zmiana stawki w panelu admina
// NIE aktualizuje LP - po kazdej takiej zmianie popraw recznie OBA pliki AffiliateContent.
const COMMISSION_PCT = 10;
const COOKIE_DAYS = 30;

const STEPS = [
  {
    n: '01',
    title: 'Grab your link',
    body: 'Every CitationOne account carries its own referral link - you will find it in the app, in the referral section. It is live from your first sign-in, on every account.',
  },
  {
    n: '02',
    title: 'Share it',
    body: 'A blog post, a training session, a newsletter, a recommendation for an agency client. The link opens the sign-in page and your code is remembered on the visitor’s device.',
  },
  {
    n: '03',
    title: 'Earn on every payment',
    body: `Once the person you referred creates an account and buys credits, we credit you ${COMMISSION_PCT}% of the order value. That covers their later purchases too, not only the first one.`,
  },
];

const TERMS = [
  {
    title: `${COMMISSION_PCT}% on every order`,
    body: 'Calculated on the net order value - what remains after tax and after any discount the buyer applied. Commissions are settled in euro.',
  },
  {
    title: 'Commission on repeat orders',
    body: 'Your referral comes back for more credits? A commission is calculated on each of their orders within the accrual period attached to that referral, rather than on the first purchase alone.',
  },
  {
    title: `Click remembered for ${COOKIE_DAYS} days`,
    body: `From the moment someone clicks your link, you have ${COOKIE_DAYS} days for them to create an account. First touch wins: a later link from someone else will not replace your code.`,
  },
  {
    title: 'The attribution stays with you',
    body: 'Once they sign up, the person is attached to your account - later visits through someone else’s link leave that attribution untouched.',
  },
  {
    title: 'Cash out or take credits',
    body: 'Approved balance can be requested as a payout or exchanged for audit credits you spend yourself. The choice is yours at every settlement.',
  },
  {
    title: 'Transparent history',
    body: 'The app shows your referrals with their status, every commission accrued and the stage it is at. Referral email addresses stay masked.',
  },
];

const AUDIENCE = [
  {
    title: 'SEO and content agencies',
    body: 'The audit is part of your offer and the client buys credits on their own account anyway. The commission comes back to the agency on every top-up they make.',
  },
  {
    title: 'Consultants and freelancers',
    body: 'You recommend the tool alongside a project or a content strategy. The client pays for themselves, and you earn on a recommendation you would have made regardless.',
  },
  {
    title: 'Creators and trainers',
    body: 'An AI Search newsletter, a course, a webinar, a tool comparison post. The link in that material keeps working long after publication.',
  },
];

const FAQ = [
  {
    q: 'Who can join the program?',
    a: 'Anyone with a CitationOne account. Accounts are free and carry a referral link from day one - taking part in the program starts with creating the account.',
  },
  {
    q: 'What is the commission calculated on?',
    a: `The net value of your referral’s order - after tax and after any discount they used at checkout. The rate is ${COMMISSION_PCT}% and settlement runs in euro.`,
  },
  {
    q: 'Do I earn on repeat purchases?',
    a: 'Yes. A commission is calculated on your referral’s later orders, not only the first one - a single successful referral works across many purchases. The accrual period for each referral is limited, and the current terms sit in the app next to your balance.',
  },
  {
    q: 'What happens when an order is refunded?',
    a: 'A commission that has not been settled yet is reversed along with the refund. Amounts already paid out or exchanged for credits remain yours.',
  },
  {
    q: 'How do I get the money?',
    a: 'In the app you request a payout of your approved balance or exchange it for audit credits. Current settlement terms sit next to the balance, along with the full commission history.',
  },
  {
    q: 'Can I refer myself?',
    a: 'The program covers referrals of other people - your own account stays outside the settlement, and the system recognises such an attempt automatically.',
  },
];

export default function AffiliateContentEN() {
  return (
    <section style={{ background: '#ffffff', padding: '44px 0 96px', position: 'relative', overflow: 'hidden' }}>
      <HeroBackdrop />
      <div style={{ maxWidth: 840, margin: '0 auto', paddingLeft: 24, paddingRight: 24, position: 'relative' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#818898',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            display: 'block', marginBottom: 14,
          }}>
            Referral program
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 22,
            background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 55%, #0b9aa6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>
            Earn {COMMISSION_PCT}% on referrals
          </h1>
          <p style={{ fontSize: 17, color: '#36394a', lineHeight: 1.72, maxWidth: 580, margin: '0 auto' }}>
            Recommend CitationOne to clients and readers, and we credit you {COMMISSION_PCT}% of
            every order they place. Your referral link is waiting in the app - the program is live
            on every account from day one.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="aff-cta-row"
        >
          <motion.a
            href={`${APP_URL}/login?lang=en`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '15px 32px',
              minHeight: 44,
              borderRadius: 8,
              background: ACCENT,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
            }}
          >
            Get your referral link
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>

          <motion.a
            href="/pricing"
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '15px 32px',
              minHeight: 44,
              borderRadius: 8,
              background: '#ffffff',
              border: '1px solid #dfe1e7',
              color: '#0d0d12',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            See what referrals pay for
          </motion.a>
        </motion.div>

        {/* Three steps */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em',
            marginTop: 56, marginBottom: 4, textAlign: 'center',
          }}
        >
          How it works
        </motion.h2>
        <div className="aff-steps" style={{ marginTop: 24 }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '24px 20px',
                background: '#ffffff',
              }}
            >
              <span style={{
                fontSize: 12, fontWeight: 700, color: ACCENT,
                letterSpacing: '0.08em', display: 'block', marginBottom: 10,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              }}>
                {s.n}
              </span>
              <h3 style={{
                fontSize: 16, fontWeight: 700, color: '#0d0d12',
                letterSpacing: '-0.015em', marginBottom: 8,
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65, margin: 0 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Worked example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 48,
            border: '1px solid rgba(11,121,131,0.28)',
            borderRadius: 12,
            padding: '28px 26px',
            background: 'rgba(11,121,131,0.04)',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em', marginBottom: 14,
          }}>
            What it adds up to
          </h2>
          <p style={{ fontSize: 15, color: '#36394a', lineHeight: 1.7, marginBottom: 20 }}>
            An audit costs EUR 2, and larger packages go lower. The commission is calculated on
            the net amount, so typical orders look like this:
          </p>
          <div className="aff-calc">
            {[
              { label: 'Client buys 25 credits', order: 'EUR 50', gain: '≈ EUR 5' },
              { label: 'Client buys 100 credits', order: 'EUR 182', gain: '≈ EUR 18' },
              { label: 'Client buys 300 credits', order: 'EUR 462', gain: '≈ EUR 46' },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                  gap: 12, flexWrap: 'wrap',
                  padding: '13px 16px', borderRadius: 8,
                  background: '#ffffff', border: '1px solid #dfe1e7',
                }}
              >
                <span style={{ fontSize: 14, color: '#36394a' }}>
                  {row.label}
                  <span style={{ color: '#a4acb9', marginLeft: 8, fontSize: 13 }}>{row.order}</span>
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, color: ACCENT }}>{row.gain}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#818898', lineHeight: 1.6, marginTop: 16, marginBottom: 0 }}>
            Illustrative, rounded figures. The actual commission is calculated on the net value of
            each order and repeats on every further purchase by the same person.
          </p>
        </motion.div>

        {/* Terms */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em',
            marginTop: 56, marginBottom: 6, textAlign: 'center',
          }}
        >
          Program rules
        </motion.h2>
        <p style={{
          fontSize: 14.5, color: '#666d80', lineHeight: 1.65,
          textAlign: 'center', maxWidth: 520, margin: '0 auto',
        }}>
          Six things worth knowing before your first referral.
        </p>

        <div className="aff-grid">
          {TERMS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '22px 20px',
                background: '#ffffff',
              }}
            >
              <h3 style={{
                fontSize: 15.5, fontWeight: 700, color: '#0d0d12',
                letterSpacing: '-0.015em', marginBottom: 8,
              }}>
                {t.title}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65, margin: 0 }}>
                {t.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Who it fits */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em',
            marginTop: 56, marginBottom: 24, textAlign: 'center',
          }}
        >
          Who it fits
        </motion.h2>

        <div className="aff-steps">
          {AUDIENCE.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '22px 20px',
                background: '#f8fafb',
              }}
            >
              <h3 style={{
                fontSize: 15.5, fontWeight: 700, color: '#0d0d12',
                letterSpacing: '-0.015em', marginBottom: 8,
              }}>
                {a.title}
              </h3>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.65, margin: 0 }}>
                {a.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)', fontWeight: 700,
            color: '#0d0d12', letterSpacing: '-0.025em',
            marginTop: 56, marginBottom: 24, textAlign: 'center',
          }}
        >
          Common questions
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQ.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="aff-faq"
              style={{
                border: '1px solid #dfe1e7',
                borderRadius: 10,
                padding: '16px 20px',
                background: '#ffffff',
              }}
            >
              <summary style={{
                fontSize: 15, fontWeight: 600, color: '#0d0d12',
                cursor: 'pointer', listStyle: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              }}>
                {item.q}
                <span aria-hidden style={{ color: ACCENT, fontSize: 18, lineHeight: 1, flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ fontSize: 14, color: '#666d80', lineHeight: 1.7, margin: '12px 0 0' }}>
                {item.a}
              </p>
            </motion.details>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <p style={{ fontSize: 15, color: '#666d80', lineHeight: 1.7, marginBottom: 20 }}>
            Your referral link is in the app, in the referral section. Creating an account is free,
            and the first 3 audits come at no charge.
          </p>
          <motion.a
            href={`${APP_URL}/login?lang=en`}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '15px 36px',
              minHeight: 44,
              borderRadius: 8,
              background: ACCENT,
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(11,121,131,0.25)',
            }}
          >
            Start referring
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>

      </div>

      <style>{`
        .aff-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .aff-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .aff-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }
        .aff-calc {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .aff-faq summary::-webkit-details-marker { display: none; }
        .aff-faq[open] summary > span { transform: rotate(45deg); }
        .aff-faq summary > span { transition: transform 0.2s ease; }
        @media (max-width: 768px) {
          .aff-steps { grid-template-columns: 1fr; }
          .aff-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 580px) {
          .aff-cta-row > a { width: 100%; }
        }
      `}</style>
    </section>
  );
}
