**An SEO and GEO content audit checks whether the text on a page answers the search intent better than the top 10 results and whether AI systems can lift a ready passage from it to cite. In practice, you compare your text with Google's results, check what AI Overviews and ChatGPT cite for the keyword, score every section and list the fixes by priority.**

Key takeaways:

- **A content audit differs from an SEO audit**, because the SEO audit checks the technical side of the site, while the content audit checks the quality and completeness of the text itself.
- Across 4,540 Polish audits in CitationOne, **the median content quality score (CQS) was 56.7 out of 100**, and only **0.9% of pages** passed the 75-point threshold.
- The weakest areas are **chunk optimization, knowledge graph, cost of retrieval and BLUF**, the qualities that decide whether AI can lift a passage from the text.
- An audit for AI answers extends the classic content audit, because AI systems cite individual sections and not whole pages.
- The output of an audit is a list of specific fixes for sections, not a general score for the page.

A content audit is useful when a page is losing rankings, when you want to know why competitors get cited in AI answers, or before you update important pages. This guide is for SEO specialists, editors and site owners who want to conduct an audit themselves or evaluate one delivered by an agency. It applies to blog posts, guides, service pages, e-commerce category descriptions and documentation.

## What a content audit is and how it differs from an SEO audit

A content audit, an analysis of the content on a page, **evaluates the text itself**, with the goal of getting more organic traffic, citations in AI answers and conversions from the pages you already have. It asks whether the text answers the user's question and whether it is complete, credible and easy to read for both people and AI systems. An SEO audit evaluates the site as a whole, mostly from the technical side.

| Area | SEO audit | SEO and GEO content audit |
|---|---|---|
| What it checks | Indexing, speed, internal linking, redirects, structured data | Intent match, facts, section structure, follow-up questions, author |
| Unit of analysis | The whole site | A single page and its sections |
| Benchmark | Google's technical guidelines | Top 10 pages and the sources AI cites |
| Output | A list of technical errors | A list of fixes for specific paragraphs |

A content audit also differs from a content inventory. **A content inventory is a list of every URL** with its title, format and date, usually pulled with a crawler such as Screaming Frog or from your sitemap. The audit evaluates the pages on that list, and a thorough audit reveals content gaps that an inventory alone cannot show.

The two audits complement each other. **A page with excellent technical SEO and weak text will not make it into AI answers**, and good content on a page the crawler cannot fetch never enters the selection at all.

## What an SEO and GEO content audit checks

A content audit for Google and AI answers checks ten areas, from intent match to section structure and facts, to see whether AI can lift a self-contained, fact-dense passage from the page. You can assess each of them by hand.

| Audit question | How to check by hand | Audit dimension |
|---|---|---|
| Does the text answer the main intent of the keyword? | Compare with the type of pages in the top 10 | [CSI alignment](/dimensions/csi-alignment) |
| Does every section open with the answer? | Read the first 2 sentences of every section | [BLUF](/dimensions/bluf) |
| Does a section make sense when cut out of the text? | Cut out a random paragraph and read it on its own | [Chunk optimization](/dimensions/chunk-optimization) |
| How many sentences carry a verifiable fact? | Count sentences with a number, name or date | [Information density](/dimensions/information-density) |
| Do facts take the form entity, attribute, value? | Look for adjectives without values | [Knowledge graph](/dimensions/knowledge-graph-eav) |
| Is the answer easy to find? | Assess headings, lists and tables | [Cost of retrieval](/dimensions/cost-of-retrieval) |
| Does the text use the terms of the topic? | Compare the vocabulary with the top 10 | [TF-IDF](/dimensions/tf-idf) |
| Do sentences say clearly who does what? | Look for passive voice | [Semantic roles](/dimensions/semantic-roles) |
| Does the text cover follow-up questions? | Compare with the "People also ask" box | [Fan-out coverage](/dimensions/query-fan-out) |
| Is the page complete and credible? | Check the author, dates, sources and media | [Effort score](/dimensions/effort-score) and [E-E-A-T](/dimensions/e-e-a-t) |

Check **information gain** as a separate factor, meaning what unique data or perspective the text adds beyond the top 10 pages. Google's helpful content guidance asks directly whether content provides original information, reporting, research or analysis. The [information gain](/dimensions/information-gain) dimension covers this.

## The most common content weaknesses in our audits

We counted the most common problems across **4,540 audits of Polish pages in CitationOne**. Each dimension is scored on a 0-10 scale, and CQS (Content Quality Score) combines them into a 0-100 score. The median CQS was **56.7**, and 23.8% of pages scored below 50. CitationOne treats 75 points as the threshold for content ready to compete for citations, and 0.9% of pages passed it. The sample comes from the Polish market, but the weaknesses it shows are about structure, not language.

<figure><img src="/blog/en/content-audit-weak-dimensions.svg" alt="Bar chart of average dimension scores in 4,540 Polish audits, on a 0-10 scale. Chunk optimization 5.13, knowledge graph 5.18, cost of retrieval 5.40, BLUF 5.48, information density 5.82, fan-out coverage 5.83, effort score 5.92, TF-IDF 6.15, semantic roles 6.21, CSI alignment 6.47." width="640" height="524" loading="lazy" decoding="async"><figcaption>The weakest qualities are the ones that decide whether AI cites a passage. Source: 4,540 audits of Polish pages in CitationOne.</figcaption></figure>

The order is the interesting part. **Intent alignment scores best (6.47 on average)**, while chunk optimization (5.13) and knowledge graph (5.18) score worst. Most pages hit the topic but write about it in a way that makes it hard to lift a self-contained passage with a specific fact. Almost one page in three scores below 5 on these two dimensions.

In my view, this is the most important lesson for anyone auditing content for AI. Classic SEO taught us to match intent, but not to write sections that stand on their own. That is exactly the gap the data shows, and it is where your fixes should start.

> [!REMEMBER]
> Most pages match the intent but lose on section structure. In a content audit for AI, first check whether every section opens with the answer and makes sense when cut out.

The data comes from audits ordered by CitationOne users, so it reflects their industries and pages and not the whole web.

## How to do a content audit step by step

A content audit takes **seven steps**, from choosing the pages to measuring again after the fixes. Steps 1-2 set the scope, steps 3-5 compare the page with the top 10 and AI answers and score its sections, and steps 6-7 turn the findings into prioritized fixes and measure their effect.

### 1. Choose the pages to audit

Start with the pages that have the biggest impact on organic traffic and sales. In the Google Search Console performance report, pick **pages with many impressions, positions 4-15 or a drop in clicks** compared with the previous period. For a first audit, 5-10 pages are enough.

### 2. Define the keyword and intent

For each page, write down the primary keyword and the intent, meaning what the user is looking for. **The type of pages in the top 10 shows the intent most reliably**, whether guides, comparisons, online stores or service pages. If your page is a different type from most of the results, that is the first problem to solve.

### 3. Compare the text with the top 10

Review 5-10 of the leading pages and note which topics, questions and data they have that yours lacks. Pay attention to **tables, numbers and examples**, because these are what most often separate the page in 1st place from the page in 8th.

### 4. Check what AI cites

Search for the keyword in Google and note whether there is an AI Overview and which pages it cites. Ask the same question in ChatGPT with search turned on. **The pages AI cites show which passage the system judged to be the best answer**, so compare it with the matching section of your text.

### 5. Score every section

Score every section against the ten areas, and treat a section as passing when it opens with the answer, contains a fact with a source and makes sense without the rest of the text. For each section, note whether it opens with the answer, whether it contains a fact with a source and whether it makes sense without the rest of the text. **Scoring sections, and not the whole page, gives you fixes you can apply right away.**

### 6. List the fixes by priority

Rank the fixes in three priority tiers by their impact on visibility, from the most important:

- **Gaps in intent and follow-up questions**, because without them the text does not answer what the user is looking for.
- **Section structure**, meaning an answer at the start, self-contained paragraphs and clear headings.
- **Facts, terminology and details**, meaning numbers with sources, the vocabulary of the topic and active voice.

### 7. Measure the effect

After applying the fixes, request reindexing of the page in Search Console. **Plan the first measurement after 2-4 weeks** and compare the results with your notes from before the audit. Track five metrics:

- **Clicks and impressions** for the page in Search Console.
- **CTR**, which rises when the title and snippet answer the question better.
- **Average position** for the primary keyword and follow-up keywords.
- **Presence in the AI Overview and ChatGPT answers** for the primary keyword.
- **The score of a repeat audit**, which shows whether the fixes closed the gaps against the top 10.

> [!REMEMBER]
> A content audit ends with a list of fixes for specific sections. A general score without saying which paragraph to change does not translate into editorial work.

## Content audit spreadsheet template

A content audit spreadsheet keeps one row per page and one column per data point. These columns cover the seven steps:

| Column | What goes in it |
|---|---|
| URL | The address of the audited page |
| Primary keyword and intent | The main keyword and the type of pages in its top 10 |
| Clicks, impressions, position | 3-12 months of Search Console data |
| AI Overview and ChatGPT | Whether they cite the page, and which pages they cite |
| Score or CQS | The overall result and the weakest sections |
| Fixes | Specific changes with the paragraph they apply to |
| Priority and decision | Tier 1-3 and update, merge, remove or new piece |
| Metrics after | The same data 2-4 weeks after the fixes |

## Manual audit or a tool?

A manual audit process for one page following the seven steps usually takes **from one to several hours**, depending on the length of the text and the number of pages in the top 10. For 5-10 pages, that is still a reasonable effort. Three kinds of tools help with an audit:

- **Search Console** for choosing pages and measuring.
- **A crawler** for the list of URLs and headings across the site.
- **A content audit tool** that compares the text with the top 10 and checks AI answers.

With dozens of pages, you start running out of time to compare against competitors and check AI answers for every keyword.

"Doesn't a tool score text too mechanically?"

A tool speeds up data collection and the comparison with the top 10, but editorial decisions stay with you. A section-level audit shows which paragraph a fix applies to and why, and the editor decides how to work it into the text.

The [CitationOne audit](/how-it-works) runs steps 2-6 automatically. It detects the intent, compares the text with the top 10 for the keyword, checks AI answers and scores the page on [10 content quality dimensions plus E-E-A-T](/dimensions). The result is a CQS and a list of fixes for specific sections, ranked by impact.

## What to do with the audit results

Audit results lead to one of four decisions for each page:

- **Update the page** when the topic and intent are current but facts, structure or follow-up questions are missing. We describe this in [How to update old blog posts for SEO and AI](/blog/how-to-update-old-blog-posts).
- **Merge it with another page** when the audit shows that two pages answer the same question. More in [Keyword cannibalization - what it is and how to fix it](/blog/keyword-cannibalization).
- **Remove or redirect it** when the page has no traffic, no links and no chance of answering any intent. We describe this in [Content pruning - how to clean up your content](/blog/content-pruning).
- **Write a new piece** when the audit reveals questions your site does not answer at all.

When you rework sections, the rules from [How to write content for AI search](/blog/how-to-write-content-for-ai-search) will help.

> [!REMEMBER]
> Start your fixes with pages in positions 4-15. They already have visibility, so better content turns into higher rankings and AI citations fastest.

## Summary

An SEO and GEO content audit checks whether a text answers the intent better than the top 10 and whether its sections are fit to be cited by AI. **In our audits, section structure fails most often, while hitting the topic rarely does.** Start with 5-10 pages in positions 4-15, score section by section and finish the audit with a list of specific fixes.

[Audit your page with CitationOne](https://app.citationone.com/login) to get a CQS, a comparison with the top 10, a check of AI answers and a list of fixes for each section.

## Frequently asked questions

### How much does a content audit cost?

At CitationOne, an audit of one page costs 1 credit, and you can find credit prices on the [pricing page](/pricing). A manual audit of one page usually takes from one to several hours of a specialist's work, and agencies most often price a site-wide content audit by the number of pages.

### How often should you do a content audit?

Audit your most important pages every 6-12 months, and texts on fast-changing topics such as prices, regulations or AI tools every 3-6 months. Run an extra audit after a clear drop in clicks in Search Console or after a major Google algorithm update.

### How do you write a content audit report?

A content audit report includes, for each page, the primary keyword and intent, the result of the comparison with the top 10, the list of sources AI cites and a score for each section. The most important part is the list of fixes with priorities and the paragraph each one applies to. At the end, record the metrics from before the changes, so you have a baseline to compare the effect against.

### Can you do a content audit yourself?

You can do a content audit yourself by following the seven steps in this guide. You need Search Console, access to Google and ChatGPT results and from one to several hours per page. A tool shortens that time and adds a numeric comparison with the top 10, but decisions about changes stay with your editorial team.

### What is a good CQS score?

At CitationOne, a CQS of 75 or more means content ready to compete for citations, 50-74 means content that needs work, and below 50 means content that needs rebuilding. The median in our audits is 56.7, so a score above 65 already beats most pages. The comparison with the top 10 for your keyword matters more than the number itself.

## Sources

- Google Search Central, [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), accessed 2026-11-15.
- Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), accessed 2026-11-15.
- Search Console Help, [Performance report](https://support.google.com/webmasters/answer/7576553?hl=en), accessed 2026-11-15.
- CitationOne, analysis of 4,540 audits of Polish pages in CitationOne (CQS scores and dimension scores).
