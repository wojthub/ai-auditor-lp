/**
 * Tool subpage content (EN) — mirror of tools-pl.ts.
 *
 * Source of facts: ../ai-auditor/spec/tools.md. Caps (URL and keyword limits) are deliberately
 * NOT published — they are marked TEMPORARY in the spec, so any number here goes stale fast and
 * is not a pre-purchase argument anyway. Credits STAY: 1 per run, refunded on job error.
 */

import type { ToolData } from './tool-types';

export const TOOLS_EN: Record<string, ToolData> = {
  'keyword-clustering': {
    slug: 'keyword-clustering',
    name: 'Keyword Clustering',
    heading: 'What is keyword clustering?',
    title: 'What is keyword clustering?',
    description:
      'Grouping keywords by overlapping search results. How clustering works in CitationOne: similarity threshold, cluster intent and a pillar page suggestion.',
    lead:
      'Clustering groups keywords by whether Google returns the same pages for them. If two queries share results in the SERP, one page can serve both - and that is the only reliable criterion, because it comes from the search engine rather than from word similarity.',
    chips: ['1 credit per run', 'Input: a keyword list or CSV', 'Output: clusters + CSV'],
    whyHeading: 'Why cluster keywords?',
    why: [
      'Without clustering you get the most expensive mistake in content: several separate texts targeting phrases that mean the same thing to a search engine. The pages start competing with each other, none accumulates full strength, and the editorial budget goes into duplicating the same material.',
      'Word similarity does not settle this - "car insurance" and "auto policy" share no word, yet their search results largely coincide. Conversely, two phrases differing by a single word can have disjoint SERPs, because the intent behind them differs.',
      'So we group by overlapping URLs in the results: a cluster is a set of phrases one page can genuinely serve.',
    ],
    stepsHeading: 'How does clustering work?',
    steps: [
      { title: 'Fetching search results', desc: 'For every phrase on the list we pull the search results - those are the input data, not the phrases themselves.' },
      { title: 'Phrase × URL matrix', desc: 'We build a matrix of URL presence in the results and compute the similarity of every phrase pair.' },
      { title: 'Grouping into clusters', desc: 'Phrases linked by similarity above the threshold land in shared groups.' },
      { title: 'Describing the cluster', desc: 'The model labels the cluster, identifies its intent and proposes a pillar page topic.' },
      { title: 'Search volumes', desc: 'We attach monthly search volumes and sort clusters by their combined volume.' },
    ],
    configTable: {
      caption: 'What you set before the run',
      head: ['Parameter', 'Range and default'],
      rows: [
        ['Similarity threshold', '0.5-1.0 (default 0.95) - the higher, the tighter the clusters'],
        ['Minimum cluster size', '1-20 - phrases below it land in the "unclustered" bucket'],
        ['SERP results considered', '1-10 - how many positions we compare'],
      ],
    },
    outputHeading: 'What you get',
    output: [
      'Cluster cards with a label, intent and combined volume, each holding a table of phrases - a ready basis for a content plan.',
      'A pillar page suggestion per cluster: the topic that would serve the whole group of queries.',
      'Separate buckets for phrases that formed no cluster, have no search results, or whose results failed to load. Nothing disappears quietly - you know what stayed out of the analysis and why.',
      'Cluster expansion on demand: 10-15 related phrases with a type (long-tail, question, variant, subtopic) and a ready article title. That is a separate action costing 1 credit.',
      'CSV export with columns: keyword, cluster, volume, intent, pillar page.',
    ],
    limitsHeading: 'What does it cost?',
    limits: [
      '1 credit per clustering run - the same as a page audit.',
      'Expanding a cluster costs a separate credit and can be done once per cluster.',
      'If a job ends in an error, the credit is returned automatically.',
    ],
    faq: [
      {
        q: 'How is this different from clustering by word similarity?',
        a: 'The criterion differs: what counts is overlapping search results, not textual similarity. That is why "car insurance" and "auto policy" can land in one cluster despite sharing no word - Google returns the same pages for both.',
      },
      {
        q: 'Which similarity threshold should I pick?',
        a: 'The default 0.95 produces tight, confident clusters - good when you plan separate pages. Lowering it merges broader topical groups, useful when building a site section. You can run the same list twice with different thresholds and compare.',
      },
      {
        q: 'What happens to phrases that joined no cluster?',
        a: 'They go into a separate bucket and stay in the result. We distinguish three cases: the phrase had results but did not join others; the phrase has no results at all; fetching its results failed and is worth retrying.',
      },
    ],
    related: [
      { slug: 'content-pruning', name: 'Content Pruning', desc: 'Which existing pages cannibalise each other.' },
      { slug: 'internal-linking', name: 'Internal Linking', desc: 'How to connect pages within a cluster.' },
      { slug: 'schema-gaps', name: 'Schema Gaps', desc: 'What is missing from your structured data.' },
    ],
    appPath: '/klasteryzacja',
  },

  'content-pruning': {
    slug: 'content-pruning',
    name: 'Content Pruning',
    heading: 'What are content pruning and keyword cannibalisation?',
    title: 'What are content pruning and keyword cannibalisation?',
    description:
      'Finding pages that drift off-topic and content competing with itself. How CitationOne analyses a whole sitemap and what it proposes for every page it flags.',
    lead:
      'Pruning answers two questions about an existing site: which pages drift far enough from the main topic to blur its profile, and which are so similar to each other that they compete for the same query.',
    chips: ['1 credit per run', 'Input: sitemap', 'Output: 3 tabs + CSV'],
    whyHeading: 'Why prune content?',
    why: [
      'Sites grow in layers: old blog posts, seasonal campaigns, texts targeting phrases nobody searches for any more. Every such page blurs the picture of what the domain is about - and that picture is what search engines and models use to decide where you are a credible source.',
      'The second problem is worse because it is invisible: two of your own pages aiming at the same query. Instead of one strong position you hold two weaker ones, and in a generative answer the model will pick a single source anyway - possibly somebody else.',
      'Neither can be judged by eye across a few hundred URLs. Every page has to be compared with every other.',
    ],
    stepsHeading: 'How does the analysis work?',
    steps: [
      { title: 'Reading the sitemap', desc: 'We expand the sitemap along with nested ones, filter out media files and verify the address is reachable before the run starts.' },
      { title: 'Fetching pages', desc: 'From each URL we take the title, H1 and meta description - enough for topical comparison and fast to collect.' },
      { title: 'Semantic representation', desc: 'Every page gets a vector describing its content, so we compare meaning rather than word overlap.' },
      { title: 'The site main topic', desc: 'We group the pages and derive the main topic plus side topics from characteristic two-word phrases.' },
      { title: 'Pruning candidates', desc: 'We measure how far each page sits from the centre of the main topic and cut off the chosen percentile.' },
      { title: 'Cannibalisation groups', desc: 'We compare pages pairwise and group those whose similarity crosses the threshold.' },
      { title: 'Recommendations', desc: 'The model describes what was found and proposes an action for each case.' },
    ],
    configTable: {
      caption: 'What you set before the run',
      head: ['Parameter', 'Range and default'],
      rows: [
        ['Deviation percentile', '50-99 (default 90) - above it a page becomes a candidate'],
        ['Cannibalisation threshold', '0.7-1.0 (default 0.9) - the similarity at which pages count as competing'],
      ],
    },
    outputHeading: 'What you get',
    output: [
      'A table of pruning candidates with guidance on what to do: remove, redirect or rebuild.',
      'Cannibalisation groups with a similarity score and a suggestion: keep the strongest page and redirect, merge the content, or differentiate the pages so they target different queries.',
      'A topical summary of the site: the main topic and side topics derived from actual content rather than from what you assume it covers.',
      'CSV export, plus a clear message when the analysis found nothing to fix.',
    ],
    limitsHeading: 'What does it cost?',
    limits: [
      '1 credit per analysis, regardless of how many pages the sitemap holds.',
      'Pages that could not be fetched are excluded from the deviation ranking - a network error should not look like off-topic content.',
      'A job that ends in an error returns the credit automatically.',
    ],
    faq: [
      {
        q: 'Will the tool delete my pages?',
        a: 'No. The analysis is advisory only - you get a list of candidates and a proposed action, while the decision and the execution stay with you. We do not connect to your CMS.',
      },
      {
        q: 'Large site - one sitemap or several?',
        a: 'For an extensive site it is better to submit section sitemaps separately: blog, categories, products. The results are sharper, because the main topic is then computed within one section instead of being averaged across the whole domain - and it is that topic which decides which pages count as drifting.',
      },
      {
        q: 'How is cannibalisation different from ordinary topical overlap?',
        a: 'By threshold and consequence. Two pages on a related topic are normal; cannibalisation starts where they are similar enough that the search engine has no reason to prefer one. You set that threshold yourself before the run.',
      },
    ],
    related: [
      { slug: 'keyword-clustering', name: 'Keyword Clustering', desc: 'Which phrases deserve separate pages in the first place.' },
      { slug: 'internal-linking', name: 'Internal Linking', desc: 'How to strengthen the pages that stay.' },
      { slug: 'schema-gaps', name: 'Schema Gaps', desc: 'A sitemap-wide structured data audit.' },
    ],
    appPath: '/pruning',
  },

  'schema-gaps': {
    slug: 'schema-gaps',
    name: 'Schema Gaps',
    heading: 'What are structured data gaps (schema.org)?',
    title: 'What are structured data gaps (schema.org)?',
    description:
      'A schema.org audit across a whole sitemap: what you have, what is missing and which types each page should carry. No AI calls, 1 credit per run.',
    lead:
      'The schema.org analysis walks your entire sitemap and checks what structured data each page carries - and above all, what it lacks relative to what that page actually is.',
    chips: ['1 credit per run', 'Input: sitemap', 'Zero AI model calls'],
    whyHeading: 'Why does structured data matter for AI Search?',
    why: [
      'Structured data is the only place where you tell a search engine outright what a page is: a product, a recipe, an article with a date and an author, a job posting. Everything else is inference from the text.',
      'In GEO it carries extra weight around credibility signals - authorship and author profile links are read precisely from structured data. A page without it forces the model to guess who stands behind it.',
      'The catch is that implementation usually happens once, at launch, and nobody checks later whether new page types got it too. This analysis shows that across the whole site at once.',
    ],
    stepsHeading: 'How does the analysis work?',
    steps: [
      { title: 'Reading the sitemap', desc: 'The same path as pruning: nested sitemaps, media filtered out, the address validated before the run.' },
      { title: 'Fetching page code', desc: 'We fetch the HTML of every URL - unsimplified, because structured data lives in markup that content simplification strips away.' },
      { title: 'Extracting markup', desc: 'We read both JSON-LD (including the bundled form popular plugins emit) and microdata embedded in the HTML. Every finding shows its source.' },
      { title: 'Identifying the page type', desc: 'We score the page against 19 profiles - from homepage and article to job posting and contact page. When the signals are too weak it stays "unknown" instead of guessing.' },
      { title: 'Comparing with the catalogue', desc: 'For the identified profile we check which of the 30-plus schema types are missing and which are unnecessary.' },
      { title: 'Filtering false positives', desc: 'A recipe recommendation without an ingredient list, or a job posting without the matching phrasing, is discarded - better to skip than to push wrong markup into your code.' },
    ],
    outputHeading: 'What you get',
    output: [
      'A site-wide summary: page count, issue count, the most frequently missing schema types and the distribution of page types.',
      'A table of every URL with its identified profile, detected and missing markup, and a filter that shows only pages with issues.',
      'CSV export, and a clear warning when fetch success was low - so you do not draw conclusions from half the data.',
    ],
    limitsHeading: 'What does it cost?',
    limits: [
      '1 credit for analysing the whole sitemap.',
      'The tool uses no AI models and no external SERP data - it works on your page code, which makes it the fastest of the set.',
      'A job that ends in an error returns the credit automatically.',
    ],
    faq: [
      {
        q: 'Will the tool implement the markup for me?',
        a: 'No, it produces a diagnosis: what is there, what is missing and for which page type. Implementation stays with you - in your CMS or your SEO plugin.',
      },
      {
        q: 'I use an SEO plugin that adds schema. Will the analysis see it?',
        a: 'Yes. We also read the bundled JSON-LD form in which popular plugins pack all their markup at once, along with microdata embedded directly in the HTML.',
      },
      {
        q: 'Why do some pages come back as "unknown"?',
        a: 'Because the signals were too weak to assign a type with reasonable confidence. That is deliberate: a wrong identification would lead to recommending markup that hurts the page.',
      },
    ],
    related: [
      { slug: 'content-pruning', name: 'Content Pruning', desc: 'Which pages in that sitemap are worth keeping at all.' },
      { slug: 'internal-linking', name: 'Internal Linking', desc: 'Link suggestions across the same site.' },
      { slug: 'keyword-clustering', name: 'Keyword Clustering', desc: 'Planning content before implementation.' },
    ],
    appPath: '/schema',
  },

  'internal-linking': {
    slug: 'internal-linking',
    name: 'Internal Linking',
    heading: 'How do you find internal links to add automatically?',
    title: 'How do you find internal links to add automatically?',
    description:
      'Internal link suggestions across a whole sitemap: semantic matching of a paragraph to a target page, a ready anchor text and detection of orphaned pages.',
    lead:
      'The tool reads the content of every page in your sitemap and points to the specific places where an internal link belongs - together with the anchor text to use and the target URL.',
    chips: ['1 credit per run', 'Input: sitemap', 'Output: suggestions + CSV'],
    whyHeading: 'Why does internal linking matter in AI Search?',
    why: [
      'Internal links spread the signal that a topic is covered on your site by more than one page. To a search engine that is information about the structure of your knowledge, not merely navigation.',
      'The practical problem is different: manual linking stops at a few obvious spots, and pages added six months ago end up with no incoming link at all. Those orphans stay invisible until somebody counts them.',
      'An automated pass works the opposite way to a human: it reviews every paragraph of every page and checks whether a page exists that the paragraph substantively points to.',
    ],
    stepsHeading: 'How does the analysis work?',
    steps: [
      { title: 'Fetching content', desc: 'We pull the full content of the pages in the sitemap - not just titles, because matching happens at paragraph level.' },
      { title: 'Splitting into fragments', desc: 'Content is split into paragraphs of a usable length, skipping headings - a link inside a heading is bad practice, so we never propose one there.' },
      { title: 'Semantic matching', desc: 'We compare each fragment with the subject matter of the other pages and keep the pairs that cross the similarity threshold.' },
      { title: 'Choosing the anchor text', desc: 'From the fragment we pick a natural phrase for the anchor, accounting for inflection and stop words.' },
      { title: 'Filtering', desc: 'We drop self-links, exceeded per-page and per-target limits, URLs already linked, and anchors already used on that page.' },
      { title: 'Optional verification', desc: 'On request the model additionally checks whether the link makes editorial sense; rejected suggestions remain visible separately.' },
    ],
    configTable: {
      caption: 'What you set before the run',
      head: ['Parameter', 'Range and default'],
      rows: [
        ['Similarity threshold', '0.5-1.0 (default 0.75)'],
        ['Max links per page', '1-30 (default 5)'],
        ['Max links to one target', '1-50 (default 10)'],
        ['Anchor length', 'from 1-10 to 1-15 words (default 2-6)'],
        ['Model verification', 'off by default'],
      ],
    },
    outputHeading: 'What you get',
    output: [
      'A table of suggestions: source page, proposed anchor text, target page and the match score.',
      'Site statistics: pages collecting the most incoming links, and orphaned pages with no internal link pointing at them at all.',
      'CSV export to hand over to whoever will make the changes in the CMS.',
    ],
    limitsHeading: 'What does it cost?',
    limits: [
      '1 credit per analysis.',
      'We never propose links that already exist, or anchors already used on the page in question.',
      'A job that ends in an error returns the credit automatically.',
    ],
    faq: [
      {
        q: 'Will the tool insert the links on my site?',
        a: 'No. You get a list of suggestions with a ready anchor and target URL; you implement them in your CMS. We do not connect to your site and change nothing on it.',
      },
      {
        q: 'Will you suggest a link I already have?',
        a: 'No. Before matching we extract the existing internal links from the content and discard both URLs that are already linked and anchors that already act as a link on that page.',
      },
      {
        q: 'What are orphaned pages and why do they matter?',
        a: 'They are pages with no link pointing at them from inside the site. To a search engine they look less important, and a visitor can only reach them from outside. They are usually the fastest thing in the whole report to fix.',
      },
    ],
    related: [
      { slug: 'content-pruning', name: 'Content Pruning', desc: 'Before you start linking - check what is worth keeping.' },
      { slug: 'keyword-clustering', name: 'Keyword Clustering', desc: 'Which pages belong to the same topic.' },
      { slug: 'schema-gaps', name: 'Schema Gaps', desc: 'Structured data for the same set of URLs.' },
    ],
    appPath: '/interlinking',
  },
};

export function toolSlugsEn(): string[] {
  return Object.keys(TOOLS_EN);
}
