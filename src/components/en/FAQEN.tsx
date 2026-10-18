import FAQItem from '../FAQItem';
import { revealStyle } from '@/lib/reveal';

const faqs = [
  {
    question: 'Does CitationOne replace traditional SEO tools?',
    answer:
      'No. Traditional SEO tools measure your rankings in classic Google search. CitationOne checks whether your content is noticed and cited by the algorithms behind ChatGPT, Perplexity and Google AI Overview.',
  },
  {
    question: 'How quickly do I get the audit result?',
    answer:
      'A full analysis of a single piece of content takes under 5 minutes.',
  },
  {
    question: 'Do I need to integrate the tool with my site?',
    answer:
      'No. CitationOne runs in the cloud. Just provide a URL, sitemap or paste the text. No plugins or code changes required.',
  },
  {
    question: 'How does the credit system and bulk audit work?',
    answer:
      'We use a simple model: 1 credit = 1 full URL audit. Bulk intent analysis and keyword mapping for a sitemap of up to 200 URLs costs just 1 credit. You decide which pages to generate full reports for.',
  },
  {
    question: 'Do my credits have an expiration date?',
    answer:
      'No. CitationOne has no subscription. You buy credits Pay-as-you-go and they never expire. You only spend them when you actually audit content.',
  },
  {
    question: 'How do I use the 3 free starter credits?',
    answer:
      'Just sign up with Google or email. You instantly get 3 credits to run 3 full audits or analyze an entire sitemap. No card required.',
  },
];

export default function FAQEN() {
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
        <div className="reveal"
          style={{ ...revealStyle({ y: 20, duration: 0.6 }), textAlign: 'center', marginBottom: 44 }}
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
            Got questions? Here are the details
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {faqs.map((faq, i) => (
            <div className="reveal"
              key={faq.question} style={revealStyle({ y: 16, duration: 0.4, delay: i * 0.07 })}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
