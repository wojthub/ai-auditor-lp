import FAQItem from './FAQItem';
import { revealStyle } from '@/lib/reveal';

const faqs = [
  {
    question: 'Czy CitationOne zastępuje tradycyjne narzędzia SEO?',
    answer:
      'Nie. Tradycyjne narzędzia SEO służą do badania pozycji w klasycznym Google. CitationOne sprawdza, czy Twoje treści są zauważane i cytowane przez algorytmy ChatGPT, Perplexity czy Google AI Overview.',
  },
  {
    question: 'Jak szybko otrzymam wynik audytu?',
    answer:
      'Pełna analiza pojedynczej treści trwa poniżej 5 minut.',
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
            Masz pytania? Poznaj konkrety
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
