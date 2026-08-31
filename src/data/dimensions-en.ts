/**
 * Dimension subpage content (EN) — mirror of dimensions-pl.ts.
 *
 * Source of facts: ../ai-auditor/spec/dimensions.md (criteria, formulas) + `lib/glossary.ts`
 * and `lib/i18n/translations.ts` in the app (dimension names MUST match what the user sees in
 * the report after purchase). CQS weights are deliberately NOT published: the content-type
 * profile overrides them, so any number here would be false for a share of audits.
 *
 * EN slugs are English; the PL page uses its own Polish slugs. Pairs live in
 * dimension-types.ts (DIMENSION_SLUG_PAIRS) and drive hreflang on both sides.
 */

import type { DimensionData } from './dimension-types';

export const DIMENSIONS_EN: Record<string, DimensionData> = {
  'csi-alignment': {
    slug: 'csi-alignment',
    name: 'CSI Alignment',
    heading: 'What is Central Search Intent (CSI)?',
    title: 'What is Central Search Intent (CSI)?',
    description:
      'What Central Search Intent is and how CitationOne measures alignment: predicate, reader knowledge level, attribute coverage and gaps against the Top 10 SERP.',
    lead:
      'Does your content answer what users are really looking for? AI does not cite pages that miss the query intent - even if they contain the keyword. Alignment with Central Search Intent (CSI) measures how precisely your article matches the expected answer type: definition, comparison, instruction, or recommendation.',
    chips: ['Score 0-10', 'Assessed by a language model', 'Input: content + CSI + Top 10 SERP benchmark'],
    whyHeading: 'Why does CSI alignment matter to AI models?',
    why: [
      'Central Search Intent is the query taken apart: the central entity the query is about, its context, the specific thing the user wants to learn, and the predicate - the type of action behind it: informational, commercial, transactional, operational, navigational or local.',
      'AI models do not cite pages that miss the intent, even when those pages contain the keyword and are written flawlessly. The classic mismatch: the query is commercial (“X or Y - which to choose”) while the page is a review of X alone. The second common error is a level mismatch - the intent belongs to a beginner, and the text assumes expert knowledge from the first paragraph.',
      'This dimension is also the foundation of the audit technically: CSI is passed into every other dimension as the reference point. A misread intent shifts the entire result.',
    ],
    howHeading: 'How do we measure CSI alignment?',
    how: {
      intro: [
        'The model receives your content, the resolved CSI and - in benchmark mode - data about the Top 10 competitors. It examines four areas:',
      ],
      tables: [
        {
          head: ['Area', 'What is checked'],
          rows: [
            ['Predicate delivery', 'Whether the content does what the intent expects: compares, instructs, sells, defines. Catches mismatches such as “commercial intent, informational content”.'],
            ['Knowledge assumption', 'Whether the topical depth of the text matches the reader behind the intent - an expert text under a beginner query is a real loss.'],
            ['Attribute coverage', 'How many aspects of the topic that the intent expects, and competitors cover, you actually discuss.'],
            ['Attribute placement', 'Your differentiator belongs in the H1 or lead, a baseline attribute in a dedicated H2, a niche attribute in an H3 or FAQ.'],
          ],
        },
        {
          caption: 'In benchmark mode every missing attribute is prioritized by how common it is among competitors',
          head: ['Status', 'What it means'],
          rows: [
            ['Covered', 'The attribute is present both on your page and among competitors'],
            ['Critical gap', 'A baseline attribute present on 7 of 10 competitor pages, missing on yours'],
            ['High gap', 'A baseline attribute on 5-6 competitor pages, additionally confirmed by SERP questions'],
            ['Medium and low gap', 'A rare attribute - present in SERP questions or on individual competitor pages'],
            ['Unique to you', 'Something you have and nobody else does - a candidate for your differentiator'],
          ],
        },
      ],
    },
    raises: [
      'Content delivers the intent predicate rather than the neighbouring one (“comparison” means a side-by-side, not a review of one option)',
      'Depth matched to the reader behind the query',
      'Baseline attributes of the category get their own H2 sections',
      'Your differentiator visible in the H1 or lead, not in the last paragraph',
      'Coverage of attributes the Top 10 treats as mandatory',
    ],
    lowers: [
      'Predicate mismatch - commercial intent, purely informational content',
      'Assuming expert knowledge on a beginner query',
      'Missing an attribute that 7 of 10 competitors have',
      'Differentiator buried at the end of the page',
      'Answering the adjacent question instead of the one that was asked',
    ],
    report: [
      'You get an alignment verdict with reasoning: which predicate we detected, whether the content delivers it and where the knowledge level diverges.',
      'Plus a full attribute map in three groups: covered, missing, and surplus ones that only you have. Missing attributes are ordered by how many competitors describe them, so the list starts with the ones whose absence costs you most.',
      'Format gaps are shown separately: if 8 competitors explain the topic with a table or an FAQ and you use plain running text, you will see it as a concrete recommendation.',
    ],
    faq: [
      {
        q: 'How is CSI different from a keyword?',
        a: 'A keyword is a phrase; CSI is the query taken apart. Beyond the phrase it holds the central entity, its context, the specific user need and the predicate - the type of action: informational, commercial, transactional, operational, navigational or local. Two pages on the same keyword can serve entirely different intents.',
      },
      {
        q: 'How do you know the intent behind my phrase?',
        a: 'From the consensus of the search results. We analyse the Top 10 for your phrase together with SERP features - including the presence of a local pack - and propose the intent from that. You can correct it before starting the audit, because every other dimension is scored against it.',
      },
      {
        q: 'Can one page serve several intents?',
        a: 'It can, but the score is computed against one primary intent. When content splits across two intents it usually delivers neither in full - and that shows in the result. Splitting it into two pages works better than closing both in one text.',
      },
    ],
    recommendations: [
      {
        problem: 'The “polling rate” attribute appears at 4 of 10 competitors, and with a transactional intent it is the parameter that decides which model a buyer picks.',
        before: 'Key technical parameters: resolution from 800 up to 26,000 DPI, acceleration up to 50G, 1 ms response time.',
        after: 'Add the polling rate (1000 Hz or 8000 Hz) as a parameter that affects cursor smoothness.',
      },
      {
        problem: 'The purchase terms (0% instalments, 24 h shipping, in-store pickup) are described only on product cards, while a transactional intent expects them in the lead.',
        before: 'Gaming mice are precision pointing devices designed for fast, responsive gameplay.',
        after: 'Add the purchase terms to the lead: “211 models from €19.99, 0% instalments, shipping in 24 h or in-store pickup”.',
      },
    ],
    related: [
      { slug: 'knowledge-graph-eav', name: 'Knowledge Graph', desc: 'What the attributes measured here are built from.' },
      { slug: 'query-fan-out', name: 'Fan-Out & AIO Coverage', desc: 'How many sub-questions around the intent your page answers.' },
      { slug: 'bluf', name: 'BLUF', desc: 'Whether the answer to the intent comes first or after a warm-up.' },
    ],
  },

  'information-density': {
    slug: 'information-density',
    name: 'Information Density',
    heading: 'What is information density in content?',
    title: 'What is information density in content?',
    description:
      'The ratio of fact-bearing sentences to filler. How CitationOne computes information density, which signals raise and lower it, and how to swap generalities for data.',
    lead:
      'Information density says how many facts, data points and concrete statements a single paragraph contains. Low-density content is filler - AI skips it. The dimension rewards every sentence that adds something new and lowers the score of text that repeats the same idea in different words.',
    chips: ['Score 0-10', 'Computed algorithmically + examples from the model', 'Input: content'],
    whyHeading: 'Why does information density matter to AI models?',
    why: [
      'A model answering a user has limited room for a quotation. It picks the passage that packs the most checkable substance per sentence - a number, a date, a unit, a proper name. A paragraph built from “many companies”, “modern solutions” and “broad experience” cannot be quoted, because it contains no claim anyone could confirm or refute.',
      'This reverses an old SEO instinct. Volume used to help - longer text ranked better, so stretching paragraphs paid off. In GEO the opposite ratio counts: diluting facts lowers the odds of being cited, even when the facts are there. The same material written half as long performs better.',
    ],
    howHeading: 'How do we measure information density?',
    how: {
      intro: [
        'The basis is algorithmic: we split the text into sentences and use patterns to detect which ones carry a fact - a number, date, unit, amount, proper name or a concrete claim. The result is the share of such sentences, rescaled to a ten-point score.',
      ],
      tables: [
        {
          caption: 'Signals that adjust the result',
          head: ['Signal in a sentence', 'Effect'],
          rows: [
            ['A concrete number, amount or date', 'up'],
            ['A value attached to a property (“21.3% efficiency”)', 'up'],
            ['A single, checkable claim', 'up'],
            ['A proper name, brand, standard or institution', 'slightly up'],
            ['Filler phrase (“it is worth knowing”, “in today’s world”)', 'strongly down'],
            ['Hedging word (“may”, “usually”, “rather”)', 'down'],
            ['Unsupported evaluative adjective (“best”, “effective”)', 'down'],
            ['Rhetorical question', 'down'],
          ],
        },
      ],
    },
    raises: [
      'Numbers, amounts, dates and units instead of approximations',
      'One claim per sentence instead of a sentence built from three caveats',
      'Proper names: brands, standards, institutions, models',
      'Values tied to specific properties rather than general praise of the product',
      'Shortening the text without removing facts - changing the ratio alone raises the score',
    ],
    lowers: [
      'Introductory paragraphs without a single checkable statement',
      'Filler phrases: “it is worth knowing”, “in today’s world”, “as we all know”',
      'Hedging: “may”, “usually”, “rather”, “in a sense”',
      'Evaluative adjectives with no data behind them',
      'Rhetorical questions instead of answers',
    ],
    swapTable: {
      caption: 'The fastest fix is trading generalities for data - same sentence, different density',
      head: ['Instead of', 'Write'],
      rows: [
        ['“many people”', '“67% of respondents”'],
        ['“expensive to run”', '“from $300 a month”'],
        ['“modern technology”', 'the name of the technology and the year it shipped'],
        ['“significantly more efficient”', '“18% more efficient than model X”'],
      ],
    },
    swapNote:
      'When hard data is missing, ranges, proportions and comparisons still work - “3-5 days”, “1 in 4 tickets”, “twice the average”.',
    report: [
      'You get the share of fact-bearing sentences with a score, plus two lists pulled from your own text: sentences counted as facts and sentences counted as filler. Both lists are built from your own content, so you can see exactly which paragraphs drag the result down.',
      'Recommendations come in a Before / After format with a concrete edit proposed.',
    ],
    faq: [
      {
        q: 'Is shorter text always better?',
        a: 'No - the ratio counts, not the length. A long text with a high share of facts beats a short one built from generalities. Cutting helps only when you remove empty sentences rather than the facts themselves.',
      },
      {
        q: 'What if I do not have hard data?',
        a: 'Use ranges, proportions and comparisons. “3-5 business days”, “1 in 4 tickets”, “twice the average” all count as concrete, because they can be verified. Only statements nobody can check are worthless.',
      },
      {
        q: 'Does the score depend on what the model decides?',
        a: 'No. The share of fact-bearing sentences is computed by an algorithm over patterns - number, date, unit, amount, proper name. The language model only adds examples from your text so you can see which paragraphs are meant.',
      },
    ],
    recommendations: [
      {
        problem: 'The paragraph opens with a rhetorical question - there is no claim in it that could be confirmed or refuted.',
        before: 'Want to know more? Use our recommendations and browse products in specific categories.',
        after: 'Replace the question with a fact: “This category holds 12 buying guides and related categories”.',
      },
      {
        problem: 'The sentence is built entirely from generalities: “varied”, “perfectly”, “maximum precision” - no verifiable data.',
        before: 'Thanks to varied sensors, shapes and functions you will match the mouse perfectly to your needs and reach maximum precision in every game.',
        after: 'Give the criterion: “A 26,000 DPI optical sensor and a claw-grip profile cut cursor tracking errors in FPS games”.',
      },
    ],
    related: [
      { slug: 'knowledge-graph-eav', name: 'Knowledge Graph', desc: 'Whether the facts form complete Entity-Attribute-Value triples.' },
      { slug: 'bluf', name: 'BLUF', desc: 'Whether the fact comes at the start of a section or after an intro.' },
      { slug: 'tf-idf', name: 'TF-IDF', desc: 'Whether you use the terminology the topic expects.' },
    ],
  },

  'knowledge-graph-eav': {
    slug: 'knowledge-graph-eav',
    name: 'Knowledge Graph',
    heading: 'What is a knowledge graph (EAV) in content?',
    title: 'What is a knowledge graph (EAV) in content?',
    description:
      'Entity-Attribute-Value triples, or how AI models read facts off a page. How CitationOne builds the graph and compares coverage with the Top 10 SERP.',
    lead:
      'Content builds a network of related concepts: entities, their attributes and values. The denser and more coherent the graph, the easier it is for AI to recognize the content as a credible source in the field. Knowledge Graph checks whether your texts build knowledge or merely mention concepts.',
    chips: ['Score 0-10', 'Language model + algorithmic signals', 'Input: content + Top 10 SERP benchmark'],
    whyHeading: 'Why does the knowledge graph matter to AI models?',
    why: [
      'Search engines have worked with entities and facts about them for years now - and the Entity-Attribute-Value triple is the basic structure of every knowledge graph. “Mortgage” is the entity, “interest rate” is its attribute, “7.2%” is the value. Only the complete set forms a fact that can be stored, cross-checked against another source and quoted.',
      'In GEO this translates directly: the model builds its answer from facts, not from paragraphs. A page that names entities but never gives their attributes and values is, to the model, a text without content - summarisable, but with nothing to quote. Conversely, a dense and consistent graph makes the model recognize the page as a source of knowledge in its field.',
    ],
    howHeading: 'How do we measure the knowledge graph?',
    how: {
      intro: [
        'The model extracts EAV triples from your content, and before scoring we strip template noise - entities such as Menu, Newsletter, Cookies or the footer are not knowledge about the topic and must not inflate the result. Every entity also receives a type (topic, problem, brand, product or service, tool, concept, person, organisation, location), so the graph shows what the page is genuinely about.',
      ],
      tables: [
        {
          caption: 'What one fact is made of',
          head: ['Element', 'The question it answers'],
          rows: [
            ['Entity', 'What are you talking about? - “mortgage”, “solar panel”'],
            ['Attribute', 'Which property are you describing? - “interest rate”, “efficiency”'],
            ['Value', 'What exactly do you say about it? - “7.2%”, “21.3%”'],
          ],
        },
        {
          caption: 'In benchmark mode every attribute is classified by how often it appears among competitors',
          head: ['Attribute class', 'What it means and where it belongs'],
          rows: [
            ['Baseline', 'Most competitors have it - a mandatory element of the topic, deserves its own H2'],
            ['Rare', 'Present at individual competitors - material for an H3 or the FAQ'],
            ['Differentiator', 'Only you have it - should be visible in the H1 or lead, not at the end of the page'],
          ],
        },
      ],
    },
    raises: [
      'Every attribute carries a value, not just a name',
      'Values are concrete: a number, unit, range or date',
      'Coverage of attributes the Top 10 treats as mandatory',
      'A differentiator - an attribute nobody else has - placed high on the page',
      'Facts spread across topical sections rather than crammed into one table',
    ],
    lowers: [
      'Entities named without attributes (“we offer mortgages” and nothing more)',
      'Attributes without values (“competitive interest rate” instead of “7.2%”)',
      'Missing an attribute that is standard among competitors',
      'Internally contradictory facts - two different prices for the same thing',
      'A graph built from template elements instead of substantive content',
    ],
    report: [
      'You get a fact matrix: every attribute with your value next to the number of Top 10 competitors that describe it. Gaps are flagged and ordered by how common they are among competitors, and your differentiators are highlighted separately.',
      'Plus you get an entity graph with their types and the relations between them. Relations are additionally verified algorithmically - we check whether two entities genuinely co-occur in sentences of your text, whether they appear together in SERP questions, and how many competitors connect the same pair. The relation graph itself does not affect the dimension score; it exists to show where knowledge is coherent and where it thins out into single mentions.',
      'Separately, as a warning with no effect on the score, we surface contradictions: the same entity and attribute described with different values. For a model, one contradictory number can disqualify the whole page as a source.',
    ],
    faq: [
      {
        q: 'Do I need structured data for a dense graph?',
        a: 'No. The graph is built from the content itself, not from schema markup. Structured data is useful for other reasons and a separate tool checks it, but it does not affect this dimension.',
      },
      {
        q: 'What about an attribute my offer does not have?',
        a: 'State it explicitly rather than skipping it. A missing feature described in one sentence is still a quotable fact, while silence leaves a gap against competitors. If the attribute does not apply to your product at all, its absence costs far less than omitting one that is standard for the category.',
      },
      {
        q: 'Do contradictory values lower the score?',
        a: 'No, we show them as a warning with no effect on the result. They are still worth fixing: generative systems compute a contradiction risk per document and skip the page as a source once it crosses a threshold.',
      },
    ],
    recommendations: [
      {
        problem: 'The “weight” attribute is stated without a value, and for esports players it is one of the parameters that settles the purchase.',
        before: 'Some mice also let you adjust the weight with removable weights.',
        after: 'Give the ranges: “from 58 g in ultralight models up to 120 g with the full set of weights”.',
      },
      {
        problem: 'The product card describes the box contents instead of the entity - without the full model name the facts have no point of reference.',
        before: 'Product type: mouse. Signal transmission: wired. In the box: mouse, quick start guide.',
        after: 'Open the card with the full commercial model name and hang the parameters off it as attributes with values.',
      },
    ],
    related: [
      { slug: 'csi-alignment', name: 'CSI Alignment', desc: 'Whether the covered attributes match the query intent.' },
      { slug: 'information-density', name: 'Information Density', desc: 'How many of your sentences carry a fact at all.' },
      { slug: 'tf-idf', name: 'TF-IDF', desc: 'Which terminology is missing against competitors.' },
    ],
  },

  'bluf': {
    slug: 'bluf',
    name: 'BLUF',
    heading: 'What is BLUF in SEO and GEO?',
    title: 'What is BLUF in SEO and GEO?',
    description:
      'What BLUF is and how CitationOne measures it: the answer within the first 50 words of a section, and separate rules for FAQ, listing and encyclopedia pages.',
    lead:
      'AI models prefer content that delivers the answer at the start of a section. BLUF measures how quickly your content gets to the point - and whether it does so in every section, not only the first.',
    chips: ['Score 0-10', 'Assessed by a language model', 'Input: content + CSI + content-type profile'],
    whyHeading: 'Why does BLUF matter to AI models?',
    why: [
      'BLUF stands for Bottom Line Up Front: the most important information goes first. The RAG systems behind ChatGPT, Perplexity and AI Overview read a page in fragments. They cut it into chunks of roughly 200-500 words and score each one separately, without the context of the rest of the article. If a section opens with “In today’s world, more and more companies...”, the model sees a fragment that answers nothing - and reaches for the competitor who put the answer in the first sentence.',
      'In classic SEO the same rule powered featured snippets - the box went to the paragraph that answered immediately. In GEO the stakes are higher, because a generative engine quotes a fragment of the page instead of linking to it: a chunk without an answer up front looks to the model like a chunk with no answer at all.',
    ],
    howHeading: 'How do we measure BLUF?',
    how: {
      intro: [
        'The model receives the content split into H2 sections, the page Central Search Intent and the content-type profile from the SERP consensus. For each section it isolates the first 50 words and decides whether they contain a direct answer to that section question. The dimension score is the share of sections with a correct BLUF, adjusted for the presence of concrete numbers.',
        'The rule depends on the page type:',
      ],
      tables: [
        {
          head: ['Content type', 'What a correct BLUF looks like'],
          rows: [
            ['Article', 'An answer with a number within the first 50 words of the section'],
            ['FAQ', 'The first sentence after the question is the answer (“From $99 a month”), not “It depends on...”'],
            ['Listing / catalogue', '1-2 summary sentences above the list, with a specific such as “12 entries, top rated: X”'],
            ['Encyclopedia / definition', 'A defining first sentence under the H2, the way a Wikipedia entry opens'],
            ['Tool / calculator', 'The “what it computes” section - a formula or result range in one sentence'],
          ],
        },
      ],
    },
    raises: [
      'A direct answer in the first sentence',
      'At least one number or statistic',
      'Concrete terms instead of generalities',
      'Evidence or a source right after the answer',
      'For a complex question, an answer laid out in 2-3 sentences with steps rather than one general sentence',
    ],
    lowers: [
      'Tension-building openers (“In today’s world”, “We live in an era”)',
      'Announcements (“In this article we will present”, “Before we move on to”)',
      'Empty adjectives (“best”, “comprehensive”, “innovative”)',
      'Sales-copy generalities (“years of experience”, “individual approach”)',
      'Hedges (“essentially”, “one could say that”)',
      'Meta-commentary (“it is worth noting”, “it should be stressed”)',
    ],
    swapTable: {
      caption: 'Generalities used where a number would fit are a separate, measurable loss of points',
      head: ['Instead of', 'Write'],
      rows: [
        ['“many”', 'a specific number or range (“5-10”)'],
        ['“often”', '“in 40% of cases”, “every 3 days on average”'],
        ['“quickly”', '“within 24 hours”'],
        ['“significantly”', '“by 30%”, “twofold”'],
        ['“most”', '“7 in 10”, “over 70%”'],
        ['“cheap”', 'a specific amount or bracket'],
      ],
    },
    swapNote:
      'When hard data is missing, ranges (“3-5 days”), proportions (“1 in 3”) and comparisons (“2x the average”) still work.',
    report: [
      'For every H2 heading we show its first 50 words together with the verdict on whether the answer actually appears in them.',
      'For sections without a BLUF you get a ready first sentence - and for sections missing entirely against the Top 10, a short expansion as well. Everything comes in a Before / After format, so you see exactly what to swap.',
    ],
    faq: [
      {
        q: 'Does BLUF work on sales pages?',
        a: 'Yes, in a different form than in an article. On a landing page or listing, BLUF means one or two sentences of substance above the section, not an academic thesis. The rule adapts to the page type, so a landing page is not scored by blog criteria.',
      },
      {
        q: 'Does BLUF apply only to the top of the page?',
        a: 'No, to every section separately. An AI engine retrieves individual sections without the rest of the article, so each one has to open with an answer. A great lead will not help a section halfway down the page.',
      },
      {
        q: 'How many sentences should a BLUF be?',
        a: 'One for a simple question, two or three for a complex one. The limit is the first 50 words of the section - that is where the answer belongs, not an announcement of what the section will cover.',
      },
    ],
    recommendations: [
      {
        problem: 'There is no category summary above the product list - the first thing the model gets is a heading and a counter.',
        before: '# Gaming mice (211)',
        after: 'Add two sentences under the H1: “211 gaming mice from €19.99 to €169, wired and wireless”.',
      },
      {
        problem: 'The section opens with a generic definition - not a single concrete detail appears in the first 50 words.',
        before: 'The core element of every gaming mouse is an optical or laser sensor, which affects tracking accuracy.',
        after: 'Open with the fact: “Optical sensors deliver 800–26,000 DPI, 650 IPS tracking speed and a 1 ms response time”.',
      },
    ],
    related: [
      { slug: 'chunk-optimization', name: 'Chunk Optimization', desc: 'Whether the section stands on its own without the rest.' },
      { slug: 'information-density', name: 'Information Density', desc: 'How many facts each paragraph carries.' },
      { slug: 'cost-of-retrieval', name: 'Cost of Retrieval', desc: 'Whether the page structure makes the answer easy to extract.' },
    ],
  },

  'chunk-optimization': {
    slug: 'chunk-optimization',
    name: 'Chunk Optimization',
    heading: 'What are content chunks in RAG systems?',
    title: 'What are content chunks in RAG systems?',
    description:
      'AI engines cut a page into fragments and score each separately. How CitationOne measures section autonomy, chunk length per content type and passage citability.',
    lead:
      'AI retrieves self-contained fragments - sections that can be understood without the full article context. Chunk Optimization measures how many citation-ready units your page contains and whether they run to the length that suits this content type.',
    chips: ['Score 0-10', 'Language model + algorithmic signals', 'Input: content + CSI + content-type profile'],
    whyHeading: 'Why does chunk optimization matter to AI models?',
    why: [
      'A generative engine does not load the whole page into its answer. It indexes the page in fragments - most often single H2 or H3 sections - and, when a question arrives, retrieves the ones that look most relevant. Your fragment reaches the model without the article title, without the previous section and without the introduction.',
      'That is why “as mentioned above, this parameter is crucial” is a loss in GEO - out of context it means nothing and cannot be quoted. The same goes for a section that never repeats the topic it discusses, relying on a pronoun pointing at a heading two screens up.',
      'The reverse also holds: a section written as a standalone answer can be cited even when the rest of the page is average. In AI Search the chunk is the unit of competition - not the page.',
    ],
    howHeading: 'How do we measure chunk optimization?',
    how: {
      intro: [
        'The model examines each section separately against four criteria: whether it opens with an answer, whether it repeats the main topic at least twice, whether it avoids pointing at other fragments (“above”, “as we wrote earlier”), and whether its length suits the content type.',
        'That last criterion depends on the content type: an FAQ answer should be short, an encyclopedia entry may be long:',
      ],
      tables: [
        {
          caption: 'Optimal section length depends on the page type',
          head: ['Content type', 'Section length'],
          rows: [
            ['Article', '200-500 words'],
            ['Encyclopedia entry', '400-1500 words'],
            ['Comparison', '150-400 words'],
            ['Landing, listing, product', '80-300 words'],
            ['Tool, calculator', '50-200 words'],
            ['FAQ', '30-150 words'],
          ],
        },
      ],
    },
    raises: [
      'A section opening with a declarative sentence that is itself an answer',
      'The main topic named explicitly rather than replaced by a pronoun',
      'Length matched to the page type, not to the article norm',
      'A heading that reads like a user question, not like a slogan',
      'Facts and numbers inside the section, not in a separate summary at the end of the page',
    ],
    lowers: [
      'References such as “above”, “as we already mentioned”, “in the previous part”',
      'A section opening with a rhetorical question or a connective (“However”, “That said”)',
      'Opening with a pronoun that points at nothing (“This means that...”)',
      'A wall of text with no section breaks',
      'Thirty-word sections in an article, or 900-word answers in an FAQ',
    ],
    report: [
      'You get a section-by-section autonomy assessment, flagging the ones that stop making sense without the whole page.',
      'Plus two complementary metrics, computed algorithmically and shown next to the score but excluded from it: the citability of individual sections - the odds that this particular one gets picked as a source, built from heading-to-intent similarity, the self-containment of the first sentence, the share of declarative sentences, position on the page and heading depth - and the density of citable fragments across the text, meaning what percentage of words sit in passages fit to be quoted.',
      'Separately we list headings that recur among the Top 10 competitors, marking the ones you do not have - a ready list of sections to add.',
    ],
    faq: [
      {
        q: 'Do I have to split the text into short sections?',
        a: 'No, the length has to match the content type. An encyclopedia entry can run 1500-word sections, an FAQ answer 50. Artificially cutting an article into 100-word pieces lowers the score just like a wall of text does.',
      },
      {
        q: 'Do phrases like “as mentioned above” really hurt?',
        a: 'Yes, and significantly so. The section reaches the model without its neighbours, so the reference points at something that is not there. Such a fragment stops being quotable even when it is the strongest material on the page.',
      },
      {
        q: 'Does passage citability affect the dimension score?',
        a: 'No, it is a complementary metric shown alongside the score. It tells you which sections have the best odds of being selected as a source, but it does not enter the final result.',
      },
    ],
    recommendations: [
      {
        problem: 'The section and its H3 headings have zero citable density - empty fragments go into the index.',
        before: '### Check related categories ### Looking for a specific brand? ### Want to know more?',
        after: 'Add 30-50 words under each heading with category names, brands and guide titles.',
      },
      {
        problem: 'The product card carries no model name, so once cut out of the listing it stops meaning anything.',
        before: 'Product type: mouse. Scroll wheel: yes. Transmission: wired. €34.90.',
        after: 'Put the full commercial name at the top of the card - the fragment has to remain understandable without the rest of the page.',
      },
    ],
    related: [
      { slug: 'bluf', name: 'BLUF', desc: 'Whether the section opens with the answer.' },
      { slug: 'query-fan-out', name: 'Fan-Out & AIO Coverage', desc: 'Which sub-questions your sections answer.' },
      { slug: 'cost-of-retrieval', name: 'Cost of Retrieval', desc: 'Whether the page structure makes sections easy to find.' },
    ],
  },

  'cost-of-retrieval': {
    slug: 'cost-of-retrieval',
    name: 'Cost of Retrieval',
    heading: 'What is Cost of Retrieval in content?',
    title: 'What is Cost of Retrieval in content?',
    description:
      'How much effort it takes to extract an answer from your page. A points-based structure checklist: heading hierarchy, tables, lists, emphasis and a summary.',
    lead:
      'Cost of Retrieval measures how much effort it takes to pull a concrete answer off the page. Heading hierarchy, tables, lists and emphasis lower that cost; a wall of text raises it. With comparable content, the model picks the source that is cheaper to handle.',
    chips: ['Score 0-10', 'Points-based structure checklist', 'Input: content + HTML structure'],
    whyHeading: 'Why does cost of retrieval matter to AI models?',
    why: [
      'A model building an answer processes many sources at once. A page where the answer has to be dug out of ten paragraphs of running text is more expensive to handle than a competitor who put the same information in a table. With comparable content, the cheaper one wins.',
      'The same mechanism works on the human side - structure that helps a reader scan the page helps a model find a fragment to quote. This is one of the few dimensions where optimizing for AI and optimizing for people is exactly the same work.',
    ],
    howHeading: 'How do we measure cost of retrieval?',
    how: {
      intro: [
        'This is a points checklist, not a judgement call. We check for the presence of structural elements and add up the points to a maximum of ten:',
      ],
      tables: [
        {
          caption: 'What the score is made of',
          head: ['Structural element', 'Points'],
          rows: [
            ['Correct H1 → H2 → H3 hierarchy', '2'],
            ['Tables with data', '2'],
            ['Bulleted or numbered lists', '1'],
            ['Key facts in bold', '1'],
            ['A summary or TL;DR section', '1'],
            ['No walls of text over 300 words without formatting', '1'],
            ['Internal links embedded in context', '1'],
            ['No vague introductions', '1'],
          ],
        },
      ],
    },
    raises: [
      'One H1, logical H2s beneath it, H3s only under those',
      'Numeric data presented as a table instead of listed in a sentence',
      'Lists wherever the content is an enumeration: steps, conditions, requirements',
      'Key facts in bold - but facts only, not whole sentences',
      'A short summary at the start or end of the page',
    ],
    lowers: [
      'An H3 with no parent H2, or several H1s on one page',
      'Paragraphs over 300 words with no subheading, list or emphasis',
      'Data scattered across sentences instead of collected in a table',
      'A vague introduction before the first concrete piece of information',
      'Bold applied indiscriminately across the whole text - it stops meaning anything',
    ],
    report: [
      'You get a checklist marking which structural elements are present and which are missing. Every unmet point is a ready fix - usually a matter of minutes, because it needs no new content, only reorganizing what is already there. Plus a list of detected heading hierarchy defects: a missing H1, several H1s, or H3 sections with no parent H2.',
    ],
    faq: [
      {
        q: 'How is this different from Effort Score?',
        a: 'Cost of Retrieval measures whether the structure can be scanned quickly; Effort Score measures whether the page is complete. The first looks at hierarchy, tables and emphasis; the second at length against competitors, visual material and the update date.',
      },
      {
        q: 'Does bold text help?',
        a: 'Yes, but only on facts. A bolded key parameter or number works as a signpost; whole sentences bolded in every paragraph stop highlighting anything.',
      },
      {
        q: 'Does every page need a table?',
        a: 'No - a table counts when you have data to line up. If you compare parameters, prices or variants, a table lowers the cost of reaching the answer more than any other change. A text with no comparative data gains nothing from one.',
      },
    ],
    recommendations: [
      {
        problem: 'Parameters are scattered across a list instead of being laid out in a table, so the model assembles the answer from four separate bullets.',
        before: 'Key technical parameters: 800–26,000 DPI resolution, acceleration up to 50G, 1 ms response time, new-generation optical sensors.',
        after: 'Add a table: Game genre | Recommended sensor / DPI | Connection type | Weight.',
      },
      {
        problem: 'Empty H3 headings in the footer raise the processing cost - the parser walks a structure that holds no content.',
        before: '### Customer service ### Shopping ### Current promotions ### Bestsellers ### Trending',
        after: 'Remove the headings from footer navigation or give each one a sentence of content; leave plain links as a normal list.',
      },
    ],
    related: [
      { slug: 'chunk-optimization', name: 'Chunk Optimization', desc: 'Whether sections stand on their own.' },
      { slug: 'effort-score', name: 'Effort Score', desc: 'The wider checklist of formats and page completeness.' },
      { slug: 'bluf', name: 'BLUF', desc: 'Whether the answer sits at the start of the section.' },
    ],
  },

  'tf-idf': {
    slug: 'tf-idf',
    name: 'TF-IDF',
    heading: 'What is TF-IDF in a content audit?',
    title: 'What is TF-IDF in a content audit?',
    description:
      'Comparing your page’s terminology against the vocabulary of the Top 10 SERP. How CitationOne finds missing specialist terms and suggests the context to use them in.',
    lead:
      'TF-IDF compares your page terminology with the vocabulary of the Top 10. A missing specialist term usually means a missing angle, so CitationOne shows which concepts you skip and in what context competitors use them.',
    chips: ['Score 0-10', 'Statistical analysis + language model', 'Input: content + Top 10 SERP vocabulary'],
    whyHeading: 'Why does TF-IDF matter to AI models?',
    why: [
      'Terminology is the cheapest competence signal to verify. A text about mortgages that never mentions “loan-to-value ratio”, “creditworthiness” or “bank margin” covers the topic superficially, and the model compares it with ten pages that do use those concepts.',
      'In GEO this carries extra weight, because a missing term usually means a missing angle. If nine competitors write about something absent from your page, you have a substantive gap the model will see when assembling its answer.',
    ],
    howHeading: 'How do we measure TF-IDF?',
    how: {
      intro: [
        'We build a reference set from competitor content and identify the terms with high informational value: specialist, industry-specific, often multi-word. Function words and generic nouns are discarded. The score is the ratio of terms present in your content to those expected, rescaled to ten.',
        'The formula: specialist terms present in the content divided by expected terms, times 10.',
      ],
      tables: [
        {
          caption: 'Which terms count',
          head: ['Type of term', 'Weight for the score'],
          rows: [
            ['Specialist, industry-specific, multi-word', 'High - this is what proves subject familiarity'],
            ['Generic noun, generic adjective', 'Irrelevant - appears in every text'],
            ['Function word', 'Ignored'],
          ],
        },
      ],
    },
    raises: [
      'Industry concepts used inside an explanation, not merely listed',
      'Multi-word phrases the industry actually uses, rather than colloquial substitutes',
      'Terms present at most of the Top 10 competitors',
      'A term used in the context competitors pair it with - “cortisol” next to “elevated”, not in isolation',
    ],
    lowers: [
      'Describing the topic in general language, skipping the names of the phenomena involved',
      'Missing concepts that are standard among competitors',
      'Terms dumped as a list at the end of the text, with no explanation',
      'Replacing a term with a description (“that indicator which shows...”) instead of naming it',
    ],
    report: [
      'You get a list of missing terms ordered by how many competitors use them and how strongly they bind to the page topic.',
      'Where a term consistently appears alongside another concept among competitors, we surface that context - the recommendation then reads “add term X in the context of Y, 6 of 10 competitors connect them”.',
    ],
    faq: [
      {
        q: 'Is this not keyword stuffing?',
        a: 'No - we measure concept coverage, not phrase frequency. A term counts when it appears inside an explanation; dumped at the end of the text it builds neither understanding nor score.',
      },
      {
        q: 'How many terms do I need to add?',
        a: 'As many real gaps as the report identifies, starting from the top. Terms are ordered by the number of competitors using them and the strength of their link to the page topic, so the first entries deliver the largest gain.',
      },
      {
        q: 'Where does the list of missing terms come from?',
        a: 'From the content of the Top 10 competitors for your phrase.',
      },
    ],
    recommendations: [
      {
        problem: 'The phrase “optical dpi” appears at 5 of 8 competitors when describing the sensor, and never once in your content.',
        before: 'The optical sensor affects tracking accuracy and response speed.',
        after: 'Use the term in an explanation: “an optical dpi resolution of 26,000 translates into tracking accuracy without interpolation”.',
      },
      {
        problem: 'The advisory phrase “best gaming mouse” appears at 4 of 8 competitors, usually next to selection criteria - you do not use it at all.',
        before: 'Thanks to varied sensors and shapes you will match the mouse to your needs.',
        after: 'Add an advisory section: “Best gaming mouse for FPS - the parameters that matter”.',
      },
    ],
    related: [
      { slug: 'knowledge-graph-eav', name: 'Knowledge Graph', desc: 'Whether the concepts form complete facts.' },
      { slug: 'information-gain', name: 'Information Gain', desc: 'Which of your terms are unique across the whole Top 10.' },
      { slug: 'csi-alignment', name: 'CSI Alignment', desc: 'Whether the covered concepts match the intent.' },
    ],
  },

  'semantic-roles': {
    slug: 'semantic-roles',
    name: 'Semantic Roles',
    heading: 'What are semantic roles (SRL) in content?',
    title: 'What are semantic roles (SRL) in content?',
    description:
      'Whether the main topic of the page performs actions or merely receives them. How CitationOne measures semantic roles and why the passive voice hurts in AI Search.',
    lead:
      'Semantic Roles check whether the main topic of the page performs the action in your sentences or merely receives it. The active voice gives the model the complete set of information “who - does what - to what”; the passive voice leaves a gap in that structure.',
    chips: ['Score 0-10', 'Assessed by a language model', 'Input: content + central entity from CSI'],
    whyHeading: 'Why do semantic roles matter to AI models?',
    why: [
      'A model extracts facts as “who - does what - to what”. A passive sentence with the actor dropped leaves a gap in that structure, which the model has to fill with a guess or skip the fact entirely. An active sentence delivers the complete set of information and can be quoted without modification.',
    ],
    howHeading: 'How do we measure semantic roles?',
    how: {
      intro: [
        'The reference point is the share of sentences in which the main topic acts as the agent. A well-written page reaches over 70% of the sentences where the topic appears at all. Below that threshold the content describes the topic from the outside instead of attributing actions to it, and the model loses the links between the entity and the facts.',
      ],
      tables: [
        {
          caption: 'How a role counts in a sentence',
          head: ['Role of the central entity', 'Value'],
          rows: [
            ['Actor (“The bank grants the loan”)', 'full'],
            ['Object (“The loan is granted by the bank”)', 'half'],
            ['Absent from the sentence', 'none'],
          ],
        },
      ],
    },
    raises: [
      'Active voice with an explicit actor',
      'The main topic named directly instead of replaced by a pronoun',
      'Concrete verbs (“lowers”, “shortens”) instead of constructions built on “is”',
      'A consistent perspective across the text - the same protagonist in the sentences',
    ],
    lowers: [
      'Passive voice with the actor dropped (“was implemented”, “is applied”)',
      'Subjectless constructions (“one should remember”, “it is worth considering”)',
      'Replacing the topic with a pronoun for whole paragraphs',
      'A shifting protagonist - product, then customer, then company, with no reason',
    ],
    swapTable: {
      caption: 'The most common fix is turning the passive voice active',
      head: ['Instead of', 'Write'],
      rows: [
        ['“The loan is granted for up to 30 years”', '“The bank grants the loan for up to 30 years”'],
        ['“The panel was installed”', '“The crew installs the panel in a single day”'],
        ['“Servicing should be remembered”', '“A heat pump needs servicing once a year”'],
      ],
    },
    report: [
      'You get the share of sentences where the main topic is the actor, plus a list of sentences that need editing - with a ready active-voice proposal.',
      'This is usually the fastest dimension to act on: the fixes are mechanical and require no new content.',
    ],
    faq: [
      {
        q: 'Is the passive voice always a mistake?',
        a: 'No - the problem starts when the actor is dropped. “The bank makes the decision” is fine; “a decision is made” leaves the model with no information about who makes it.',
      },
      {
        q: 'What if the topic is a service rather than a company?',
        a: 'Then the actor is often the service or product itself: “the policy covers treatment costs”, “the heat pump cuts the bill by 40%”. The point is an unambiguous role for the main topic, not inserting the company name everywhere.',
      },
      {
        q: 'How quickly can this be fixed?',
        a: 'It is usually the cheapest dimension to repair. The fixes are mechanical - reordering a sentence - and need no new content or new data.',
      },
    ],
    recommendations: [
      {
        problem: 'The main topic is the object of the reader’s action: the agent of the sentence is “you”, not the product being described.',
        before: 'In our store you will find a wide choice of wired and wireless models optimised for different game genres.',
        after: 'Wired and wireless gaming mice cover every game genre - from FPS, through strategy, to MMO.',
      },
      {
        problem: 'The sentence says what “you can do” instead of what the product does.',
        before: 'Thanks to varied sensors you can match the mouse to your needs.',
        after: 'Sensors with up to 26,000 DPI match the mouse sensitivity to your play style.',
      },
    ],
    related: [
      { slug: 'information-density', name: 'Information Density', desc: 'Whether the sentence carries a checkable fact at all.' },
      { slug: 'knowledge-graph-eav', name: 'Knowledge Graph', desc: 'How facts combine into entities, attributes and values.' },
      { slug: 'chunk-optimization', name: 'Chunk Optimization', desc: 'Whether the section stands without context.' },
    ],
  },

  'query-fan-out': {
    slug: 'query-fan-out',
    name: 'Fan-Out & AIO Coverage',
    heading: 'What is Query Fan-Out in AI Search?',
    title: 'What is Query Fan-Out in AI Search?',
    description:
      'How AI engines break one question into a dozen sub-queries, and how CitationOne measures the share your content covers - using AI Overview and real SERP questions.',
    lead:
      'A single user query decomposes into a dozen or so side questions that AI resolves in the background. Fan-Out & AIO Coverage analyses how many of those questions your content answers, because citations are won on the side questions.',
    chips: ['Score 0-10', 'Two model passes + SERP data', 'Input: CSI + SERP questions + AI Overview'],
    whyHeading: 'Why does Fan-Out coverage matter to AI models?',
    why: [
      'A user asks “how to choose a heat pump”, and the model does not search for that phrase. It breaks it into component questions: what capacity for what floor area, how much installation costs, what the efficiency is in freezing weather, whether a permit is needed. It retrieves each separately and composes all those answers into a single response.',
      'This is where SEO and GEO part ways. In classic search, winning one query was enough to earn the click. In AI Search you win as many times as you have ready answers to side questions - a page that exhausts the topic only in the main thread gets cited once, or not at all, despite an excellent SERP position.',
      'It works the other way too: side questions are cheaper to win than the head phrase. Competitors fight over the headline, while the gap is usually in a question nobody has covered.',
    ],
    howHeading: 'How do we measure Fan-Out coverage?',
    how: {
      intro: [
        'Starting from the page’s intent, the model decomposes the query into a dozen or so sub-queries. It does so in two independent passes with different degrees of latitude, and we merge the results because a single pass is too sensitive to model randomness. To that set we add genuine questions from the SERP: the “People also ask” box and related searches. Finally we verify which of them your content actually answers.',
        'The set is cleaned of homonyms. If the phrase has a second meaning, questions from that other domain are discarded so that the recommendations concern your topic alone.',
        'The score goes up for fully covering the verification questions, and down for every uncovered question whose existence the SERP confirms.',
      ],
      tables: [
        {
          caption: 'Three types of side questions the intent decomposes into',
          head: ['Type', 'What it covers'],
          rows: [
            ['Semantic', 'Properties and relations of the topic - what it consists of, how it differs, what it relates to'],
            ['Intent-based', 'The real need behind the query - what the user wants to do or decide'],
            ['Verification', 'Facts the model must confirm before stating them in an answer'],
          ],
        },
        {
          caption: 'Not every question weighs the same - what counts is whether search data confirms it exists',
          head: ['Question status', 'What it means'],
          rows: [
            ['Confirmed by the SERP', 'Google places it in the “People also ask” box, which confirms that users ask it'],
            ['Present in AI Overview', 'The thread appears in the AI summary for this phrase'],
            ['Predicted by the model', 'Follows from the intent, but has no confirmation in SERP data'],
            ['Confirmed gap', 'The question is in the SERP and your content does not address it - this lowers the score'],
          ],
        },
      ],
    },
    raises: [
      'H2 sections answering specific side questions rather than variants of the head phrase',
      'Answers to questions from the “People also ask” box',
      'Answers to verification questions - numbers, dates, conditions a model must confirm',
      'An FAQ built from real questions rather than search phrases',
      'Exhausting side threads competitors have omitted',
    ],
    lowers: [
      'All content circling the main query',
      'Uncovered questions that Google itself surfaces in the SERP',
      'Threads touched in a single sentence, with no quotable answer',
      'An elaborate introduction and summary instead of sections answering separate questions',
    ],
    report: [
      'You get a list of side questions marked by whether your content covers them, along with where each question came from: confirmed by the SERP or predicted by the model.',
      'Uncovered questions confirmed by the search engine go to the top of the recommendations, because closing such a gap costs the least: SERP data confirms it exists, and the absence of an answer in the content is unambiguous.',
    ],
    faq: [
      {
        q: 'How are side questions different from long-tail phrases?',
        a: 'Long tail means variants of the same query; side questions are separate threads the model must resolve to build an answer. “Cheap heat pump” is long tail; “does a heat pump work at minus 20 degrees” is a side question.',
      },
      {
        q: 'Do I have to answer all of them?',
        a: 'No - priority goes to the ones confirmed by the search engine. A question Google shows under “People also ask” is a certain gap; a question predicted by the model is a hypothesis and weighs less.',
      },
      {
        q: 'Is an FAQ section enough?',
        a: 'Partly. An FAQ closes short, factual questions well, but a thread that needs development works better as a full H2 section with an answer, data and context.',
      },
    ],
    recommendations: [
      {
        problem: 'Google shows “What are the best gaming mice?” in People Also Ask, and no section of the page answers it.',
        before: 'No ranking or shortlist of recommended models anywhere in the content.',
        after: 'Add an H2 section “Gaming mouse ranking - recommended models” with five entries and the reason behind each pick.',
      },
      {
        problem: 'The budget question is confirmed in the SERP, and the page does not address it.',
        before: 'No section on price segmentation: budget models versus tournament ones.',
        after: 'Describe which parameters matter under €40, between €40 and €90, and above €90.',
      },
    ],
    related: [
      { slug: 'csi-alignment', name: 'CSI Alignment', desc: 'The intent the side questions are derived from.' },
      { slug: 'chunk-optimization', name: 'Chunk Optimization', desc: 'Whether the answering section stands on its own.' },
      { slug: 'bluf', name: 'BLUF', desc: 'Whether the answer to a side question comes first.' },
    ],
  },

  'effort-score': {
    slug: 'effort-score',
    name: 'Effort Score',
    heading: 'What is Effort Score in a content audit?',
    title: 'What is Effort Score in a content audit?',
    description:
      'An algorithmic completeness checklist: length against competitors, images, video, tables, lists, heading hierarchy, table of contents and a visible update date.',
    lead:
      'Effort Score is an algorithmic checklist of page completeness: length against competitors, visual material, tables, lists, heading hierarchy, table of contents and a visible update date.',
    chips: ['Score 0-10', '100% algorithmic - zero model calls', 'Input: content + HTML structure + Top 10 average'],
    whyHeading: 'Why does Effort Score matter to AI models?',
    why: [
      'Completeness signals are the oldest quality proxy search engines rely on: a page with a table, visual material and a current date more often results from thorough work on the topic than a page made of five paragraphs. Search engines treat it as a strong hint of quality.',
    ],
    howHeading: 'How do we measure Effort Score?',
    how: {
      intro: [
        'The checklist covers up to eleven criteria and an algorithm alone computes it, with no language model involved. Some are absolute, some are relative to competitors - the length threshold is the Top 10 average for your phrase, not a fixed word count.',
        'The criteria adapt to the page type: a table of contents is only checked for articles and encyclopedia entries, and a visible date is skipped on landing pages.',
      ],
      tables: [
        {
          caption: 'What the checklist covers',
          head: ['Criterion', 'What it covers'],
          rows: [
            ['Absolute length', 'Content over 700 words'],
            ['Length against competitors', 'Content above the Top 10 average for this phrase'],
            ['Visual material', 'At least four images'],
            ['Video', 'An embedded video'],
            ['Lists', 'Bulleted or numbered enumerations'],
            ['Tables', 'Data presented in a table'],
            ['Heading hierarchy', 'Correct H1, H2, H3 structure'],
            ['Emphasis', 'Key terms in bold'],
            ['Table of contents or summary', 'Articles and encyclopedia entries only'],
            ['No walls of text', 'Paragraphs broken up and formatted'],
            ['Freshness', 'A visible publication or update date'],
          ],
        },
      ],
    },
    raises: [
      'Content longer than the Top 10 average for the phrase',
      'Four or more pieces of visual material',
      'Data presented as tables and processes as lists',
      'A visible publication and update date in the page code',
      'A table of contents on longer articles',
    ],
    lowers: [
      'Content clearly shorter than the Top 10 competitors',
      'No visual material at all',
      'Running text with no lists, tables or emphasis',
      'No date - or a date visible only on screen, with no marker in the code',
      'An incorrect heading hierarchy',
    ],
    report: [
      'In the report you will find a checklist of met and missing items, with a hint next to each gap about exactly what to add. Beside it sits a format comparison with competitors: if six of them have a table and you do not, you see it directly.',
      'We report freshness separately: the publication date, the update date and the age of the content in months.',
      'One limitation applies here: images, video and dates are read from the page code, so an audit of content pasted from an editor rather than fetched from a URL does not cover those criteria.',
    ],
    faq: [
      {
        q: 'Does longer text always raise the score?',
        a: 'No - the threshold is the Top 10 average for your phrase, not a fixed word count. On phrases where competitors write concisely, expanding the text does not raise the score and lowers it on the other dimensions.',
      },
      {
        q: 'Why does the audit not see my images and video?',
        a: 'Because those signals are read from the page code. An audit of content pasted from an editor instead of a URL has no access to information about images, video or a publication date.',
      },
      {
        q: 'Does a missing table of contents always lower the score?',
        a: 'No. We only check it on articles and encyclopedia entries. On a listing, product page or landing page the criterion is skipped.',
      },
    ],
    recommendations: [
      {
        problem: 'The content is clearly shorter than the Top 10 average for this query (1,460 words) - competitors cover the topic more widely.',
        before: 'Four short descriptive sections under the product list.',
        after: 'Add the missing threads - a wired versus wireless comparison and a model ranking - until the length of the content reaches the competitor average.',
      },
      {
        problem: 'The page shows neither a publication nor an update date, the simplest freshness signal there is.',
        before: 'Copyright © 2025. No datePublished or dateModified in the markup.',
        after: 'Add a visible update date plus datePublished and dateModified in JSON-LD, and refresh it whenever the offer changes.',
      },
    ],
    related: [
      { slug: 'cost-of-retrieval', name: 'Cost of Retrieval', desc: 'Whether the structure makes answers easy to extract.' },
      { slug: 'e-e-a-t', name: 'E-E-A-T', desc: 'Whether the page shows an author, sources and updates.' },
      { slug: 'chunk-optimization', name: 'Chunk Optimization', desc: 'Whether sections have the right length.' },
    ],
  },

  'e-e-a-t': {
    slug: 'e-e-a-t',
    name: 'E-E-A-T',
    heading: 'What is E-E-A-T and how is it measured?',
    title: 'What is E-E-A-T and how is it measured?',
    description:
      'Experience, expertise, authoritativeness and trust: which signals CitationOne detects and why each one needs a quotation from your text.',
    lead:
      'E-E-A-T covers experience, expertise, authoritativeness and trust - four separately scored components, computed from signals present in the content and in the page code.',
    chips: ['Four scores 0-10', 'Algorithmic detection + model verification', 'Input: content + page code + external links'],
    whyHeading: 'Why does E-E-A-T matter to AI models?',
    why: [
      'A generative engine answers for content the user will no longer verify by clicking a link. So when choosing a source it favours pages that state the author, the basis of their claims and the date of the last verification. Anonymous text without sources constitutes a risk the model avoids.',
      'This is the one dimension where improving does not require rewriting sentences. An author bio with credentials, a citation to a study, an update date and contact details are elements either present on the page or absent - the score depends on supplying them, not on editing the text.',
    ],
    howHeading: 'How do we measure E-E-A-T?',
    how: {
      intro: [
        'First we detect signals algorithmically in the content and the page code, and only then does the model verify them and judge their strength. The rule is simple: every accepted signal must be anchored in a specific fragment of the text. A signal without a quotation is rejected, so the audit does not credit the page with expertise it never claims.',
      ],
      tables: [
        {
          caption: 'The four components and the signals behind them',
          head: ['Component', 'What raises it'],
          rows: [
            ['Experience', 'A first-hand account, a case study, photos and screenshots from use, a description of testing you ran yourself'],
            ['Expertise', 'Citations to research, data with a stated source, industry terminology, an explanation of mechanisms, a bibliography'],
            ['Authoritativeness', 'An author bio with credentials, institutional affiliation, publications, external citations, awards'],
            ['Trustworthiness', 'Disclaimers, an update date, author contact, an editorial policy, a secure connection'],
          ],
        },
        {
          caption: 'We also verify sourcing - signals read from the page code, not from the text alone',
          head: ['Signal', 'What is checked'],
          rows: [
            ['Source verifiability', 'External links, citation markers, references to known institutions and publications'],
            ['Source diversity', 'The number of distinct domains - leaning on a single source weighs less'],
            ['Author identity', 'Author profile links in structured data: Wikipedia, ORCID, Google Scholar, LinkedIn'],
            ['Claim corroboration', 'Whether high-risk claims such as statistics, dates and research findings have a stated source in the same paragraph'],
          ],
        },
      ],
    },
    raises: [
      'A bylined author with concrete credentials, not “the editorial team”',
      'Citations to research and data with the source stated',
      'Links to a range of institutions instead of repeated links to one site',
      'A visible update date and a contact',
      'A description of your own test, deployment or client case',
    ],
    lowers: [
      'Text with no author and no date',
      'Statistics given with no source',
      'Claims of competence with nothing behind them (“years of experience”)',
      'No external links whatsoever',
      'Referring exclusively to your own material',
    ],
    report: [
      'You get four separate scores together with a list of detected signals - each with the quotation from your content that supports it.',
    ],
    faq: [
      {
        q: 'Is E-E-A-T a ranking factor?',
        a: 'Not as a single parameter. It is a set of quality criteria Google uses to describe good content, and generative models apply the same reasoning when choosing a source.',
      },
      {
        q: 'Is adding “author: the editorial team” enough?',
        a: 'No. A signal counts only when it is anchored in the content - a byline with no credentials, affiliation or trace of experience changes nothing.',
      },
      {
        q: 'Which sources count for the most?',
        a: 'Recognised institutions and industry publications, while maintaining variety. Five links to five credible domains weigh more than five links to the same site.',
      },
    ],
    recommendations: [
      {
        problem: 'Parameters and comparisons are given with no reference to a source, so none of those claims can be verified.',
        before: 'New-generation optical sensors reach a tracking accuracy of 99.8%.',
        after: 'Add a citation for the measurement: “tracking accuracy of 99.8% according to the manufacturer’s technical documentation, 2026”.',
      },
      {
        problem: 'The transactional page does not state the trust signals this content type requires: return terms, warranty and payment security.',
        before: 'All products come from official distribution and carry full technical support.',
        after: 'Put the specifics up front: “30-day free returns, 24-month manufacturer warranty, SSL-encrypted payments”.',
      },
    ],
    related: [
      { slug: 'effort-score', name: 'Effort Score', desc: 'Whether the page has a date, material and a complete structure.' },
      { slug: 'information-density', name: 'Information Density', desc: 'Whether the claims are checkable.' },
      { slug: 'information-gain', name: 'Information Gain', desc: 'How much you add beyond what is already in the SERP.' },
    ],
  },

  'information-gain': {
    slug: 'information-gain',
    name: 'Information Gain',
    heading: 'What is Information Gain in content?',
    title: 'What is Information Gain in content?',
    description:
      'How much your content adds over the Top 10 SERP. Four uniqueness signals: original claims, unique facts, terms absent from competitors and rare formats.',
    lead:
      'Information Gain measures how much your content adds over the Top 10. It is a strategic metric: it shows where to build an advantage and does not affect the final score.',
    chips: ['Score 0-100', 'Does not affect the final score', 'Input: content + Top 10 SERP content'],
    whyHeading: 'Why does information gain matter to AI models?',
    why: [
      'A generative engine does not need ten sources saying the same thing. It builds an answer from a few, and picks the ones that add something the others lack. Content that is correct but entirely overlapping with competitors is interchangeable to it - any other source serves the same function.',
    ],
    howHeading: 'How do we measure information gain?',
    how: {
      intro: [
        'We compare your content against the body of competitor content from the Top 10 and compute four independent signals that make up the result on a 0-100 scale:',
      ],
      tables: [
        {
          caption: 'Four uniqueness signals',
          head: ['Signal', 'What it means'],
          rows: [
            ['Unique claims', 'Concrete factual claims from your text that no competitor makes'],
            ['Unique facts', 'Entity-Attribute-Value triples present at fewer than 30% of competitors'],
            ['Unique terms', 'Concepts you use and competitors do not'],
            ['Rare formats', 'Presentation formats rarely used in this SERP - a table, a video, a bibliography'],
          ],
        },
      ],
    },
    raises: [
      'Your own data: test results, statistics from your database, calculations',
      'A case study with concrete numbers',
      'A comparison nobody else has made',
      'Expert conclusions that go beyond describing the state of things',
      'A format competitors have not reached for',
    ],
    lowers: [
      'Content that summarises the first ten results',
      'Facts copied from the same sources competitors used',
      'No observation or data of your own',
    ],
    report: [
      'You get the score broken down into four signals plus a list of your unique claims - what genuinely sets the page apart from the rest of the results.',
      'Along with suggestions on which type of material would raise the result fastest for this particular topic: your own data, a case study, a comparison, an expert comment or a small piece of original research.',
      'Information gain deliberately does not affect the final score. It is a strategic metric - it shows where to build an advantage, not what to fix in the text.',
    ],
    faq: [
      {
        q: 'Why does this metric not affect the score?',
        a: 'Because it measures strategy, not execution. Content can be flawless and at the same time have low information gain - that is a signal to supplement it with your own material, rather than to revise the writing.',
      },
      {
        q: 'What raises it fastest?',
        a: 'Your own data. A test result, a statistic from your database, a case study with numbers or a comparison nobody has made - each of those is by definition absent from competitors.',
      },
      {
        q: 'Does low information gain mean poor topic coverage?',
        a: 'No, those are two distinct measures. Topic coverage is assessed by the TF-IDF and Fan-Out & AIO Coverage dimensions, while information gain measures only the share of your content that does not repeat across the remaining results.',
      },
    ],
    recommendations: [
      {
        problem: 'The content repeats what is already in the Top 10 - not one claim on the page is missing from the competition.',
        before: 'Parameter descriptions copied from the manufacturers’ spec sheets.',
        after: 'Add your own data: switch durability test results or return rates broken down by grip type.',
      },
      {
        problem: 'Format advantage 17/100 - competitors use formats the page never reaches for.',
        before: 'Text and a bulleted list in every section.',
        after: 'Add a model comparison table and a short test video - both formats are rare in this SERP.',
      },
    ],
    related: [
      { slug: 'tf-idf', name: 'TF-IDF', desc: 'The terminology missing against competitors.' },
      { slug: 'knowledge-graph-eav', name: 'Knowledge Graph', desc: 'Which of your facts are differentiators.' },
      { slug: 'e-e-a-t', name: 'E-E-A-T', desc: 'Whether your own data is backed by authorship and sources.' },
    ],
  },
};

export function dimensionSlugsEn(): string[] {
  return Object.keys(DIMENSIONS_EN);
}
