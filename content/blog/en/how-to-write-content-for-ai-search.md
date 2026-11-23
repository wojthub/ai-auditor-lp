**To write content for AI search, make every passage answer one question directly, back it with verifiable facts and a source, and keep it understandable when cut out of the rest of the text. AI systems quote passages from pages, so the text that wins is the one in which every section can serve as an answer on its own.**

Key takeaways:

- Generative engine optimization research from Princeton University ("GEO - Generative Engine Optimization") shows that **adding quotations, statistics and source citations** raises visibility in AI answers by up to about 40%, with quotations scoring highest at 27.8 points against 19.5 for unchanged text.
- Keyword stuffing **lowered visibility** in the same study, and on Perplexity.ai it performed about 10% worse than unchanged text.
- Google says that its AI search features do not require you to break content into tiny chunks and that there is no ideal page length.
- According to Google, content created with the help of AI does not violate its guidelines, as long as its main purpose is not to manipulate rankings.
- The 10 rules below map to the dimensions in which the CitationOne audit scores a text, so you can check each of them on your own pages.

Writing content for AI search means creating and editing texts so that AI systems such as ChatGPT and Google AI Overviews can easily find an answer in them, verify it and cite it with a link to your page. Generative engine optimization (GEO) is the wider practice this belongs to, and it covers how content and sites are prepared so that AI systems can cite them. This guide is for copywriters, editors and SEO specialists who have a finished draft or a brief and want to know what to change in their sentences and sections. The before-and-after examples are about heat pumps, and the numbers in them are illustrative.

## How AI chooses a passage to cite

In generative engine optimization, the starting point is how AI search works. An AI system with access to a search engine sends queries, picks the passages from the pages it found that best answer the question, and writes an answer from them with links to the sources. Google describes how AI Overviews and AI Mode can split a question into many related searches on subtopics along the way.

For an author, this means one thing. The reader of your text often gets a single paragraph, cut out and pasted into someone else's answer. **That paragraph has to stand on its own.**

We cover the mechanism in more detail in [What is GEO](/blog/what-is-geo) and [How to rank in ChatGPT](/blog/how-to-rank-in-chatgpt).

## 10 rules for writing content that AI cites

Content that AI cites follows 10 rules in three groups. Rules 1-3 organize the structure of sections, rules 4-8 cover the facts in your sentences, and rules 9-10 cover vocabulary and syntax. The table pairs each rule with the audit dimension that checks it.

| Rule | Goal | Audit dimension |
|---|---|---|
| 1. Lead with the answer | The answer in the first 1-2 sentences of a section | BLUF |
| 2. Self-contained sections | A passage makes sense when cut out | Chunk optimization |
| 3. Descriptive headings | The answer is easy to find | Cost of retrieval |
| 4. One sentence, one fact | More verifiable information | Information density |
| 5. Full names and specific attributes | Entity, attribute and value in one sentence | Knowledge graph |
| 6. Numbers with a unit, date and source | Credible data | Information density |
| 7. Expert quotations | Outside evidence | E-E-A-T |
| 8. Follow-up questions | More passages to cite | Fan-out and AIO coverage |
| 9. The vocabulary of the topic | Full coverage of terminology | TF-IDF |
| 10. Who does what | A clear actor for every action | Semantic roles |

### 1. Lead with the answer

Put the complete answer, with its key number or fact, in the first 1-2 sentences of the page and of every section. Context, background and caveats come after, because a system that lifts a passage often takes only its opening. This is the BLUF principle (bottom line up front), described in the [BLUF dimension](/dimensions/bluf).

**Before**

> Home heating is a topic that comes back every fall. Many people are thinking about switching their heat source, and the market offers more and more options. One of them is the heat pump.

**After**

> An air-source heat pump pays off in a well-insulated home with radiant floor heating, because it runs at a low flow temperature and uses the least electricity there.

### 2. Write sections that make sense without the rest of the text

A section names its topic directly and does not refer back to what came before. Phrases such as "as mentioned above" or "this solution" **lose their meaning once the passage is cut out**. The [chunk optimization](/dimensions/chunk-optimization) dimension checks this.

**Before**

> As mentioned, this solution works best in new homes.

**After**

> An air-source heat pump works best in new homes with radiant floor heating.

### 3. Write headings that say what the section contains

Descriptive headings tell an AI system which section holds the answer before it reads the text. An H2 or H3 heading describes the section specifically enough that both the reader and an AI system know whether the answer is there. Real questions from Google results and factual statements work well. Generic labels such as "Financial considerations" force a full read of the section, which raises the [cost of retrieval](/dimensions/cost-of-retrieval). Keep the hierarchy simple, with one H1 for the topic of the page, H2s for the main questions or stages and H3s for the details within them, and do not skip levels.

**Before**

> Financial considerations

**After**

> How much does a heat pump cost to install in a 1,600 sq ft home?

### 4. One sentence, one verifiable fact

Every sentence should carry a fact someone can check, such as a name, a number with a unit or a date. A sentence that can be verified carries more than three sentences of general assurances. Sentences without facts lower [information density](/dimensions/information-density) and reduce the chance that the system picks that passage. When you compare several things on the same attributes, use a table. Give steps in a numbered list and equal items in a bulleted list, because these formats are easy to lift as a ready answer.

**Before**

> Heat pumps are a modern, eco-friendly solution that is becoming increasingly popular with informed customers.

**After**

> A heat pump with a seasonal COP of 4.5 delivers on average 4.5 kWh of heat for every 1 kWh of electricity over the heating season.

### 5. Use full names and specific attributes

Write the name of the thing, its attribute and the value of that attribute in place of pronouns and adjectives. The system can easily carry such triples (entity, attribute, value) into an answer. The [knowledge graph](/dimensions/knowledge-graph-eav) dimension covers this.

**Before**

> This model is quiet and efficient.

**After**

> The outdoor unit of this heat pump has a noise level of 48 dB(A) at a distance of 1 m.

### 6. Give numbers with a unit, a date and a source

A number without a unit or date says little, and a number without a source raises doubts. In the Princeton study, **adding statistics** was one of the three most effective changes. For data that changes quickly (prices, incentives, regulations), state the date it is valid for.

**Before**

> Heat pump incentives are generous.

**After**

> Across 40 of our installations in 2026, an 8 kW air-source heat pump cost an average of $14,000 installed (our own data, as of October 2026, example figures).

### 7. Add expert quotations

A short quotation with the person's name and role gives your text evidence and an outside voice. In the Princeton study, **adding quotations** gave the highest score of all the changes tested, 27.8 points against 19.5 for the unchanged text.

<figure><img src="/blog/en/geo-study-results.svg" alt="Bar chart from the GEO study. Visibility score in the AI answer after adding quotations 27.8, statistics 25.9 and source citations 24.9, against 19.5 for unchanged text and 17.8 after keyword stuffing." width="640" height="380" loading="lazy" decoding="async"><figcaption>Quotations, statistics and sources raise visibility, while keyword stuffing lowers it. Source: Aggarwal et al., GEO - Generative Engine Optimization, KDD 2024.</figcaption></figure>

> [!REMEMBER]
> In the GEO study, quotations, statistics and sources raised visibility the most. Keyword stuffing lowered it.

**Before**

> Experts stress that installation matters a lot.

**After**

> "Choosing the wrong heat pump size raises your bills more than choosing the wrong brand," says John Smith, an installer with 15 years of experience (example quotation).

### 8. Answer follow-up questions

Around every topic, people ask several related questions about cost, time, requirements and alternatives. Collect them from Google's "People also ask" box and related searches, and answer each one in its own section. AI systems look for answers to these questions too, which the [fan-out and AIO coverage](/dimensions/query-fan-out) dimension measures.

For the query "heat pump for a home", the follow-up questions cover installation cost, electricity use in winter, compatibility with radiators, incentives and a comparison with a gas furnace.

### 9. Use the vocabulary the topic calls for

Every topic has its own terms, which appear on most of the good pages in the results. Missing them signals shallow coverage. In a text about heat pumps, they include COP, flow temperature, buffer tank, balance point and outdoor unit. The [TF-IDF](/dimensions/tf-idf) dimension shows vocabulary gaps compared with your competitors.

Work these terms in where they naturally describe what you are writing about. **Forcing them in works like keyword stuffing** and lowers visibility.

### 10. Write who does what

Write sentences in which a named actor performs the action on a named object. A sentence in the active voice with a clear actor and object is easier to understand for both the reader and the model, which extracts who did what from it. The passive voice and abstract nouns hide who is responsible for what. The [semantic roles](/dimensions/semantic-roles) dimension checks this.

**Before**

> A check of the installation is carried out before the unit is started.

**After**

> The installer checks the system for leaks before starting the heat pump for the first time.

## Chunks or full sections?

Some guides recommend splitting text into short blocks for AI. Google says in its guide to generative AI features that you do not need to break content into tiny chunks for AI to understand it.

"So should I split my text or not?"

Write full sections, each of which opens with the answer and names its topic directly. A self-contained section is a complete one, with context, an example and a source, and two sentences under a heading do not qualify. Text chopped into micro-paragraphs loses its argument and gains only the appearance of order.

In my view, most texts lose in AI because they lack content worth citing, and structure is a second-order problem. That is why the biggest gain comes from adding something your competitors do not have, such as your own data, an example from practice or a test result. Google's guidance on helpful content asks directly whether the content provides "original information, reporting, research, or analysis", and the [information gain](/dimensions/information-gain) dimension measures how much a text adds beyond the top 10.

> [!REMEMBER]
> The biggest gain comes from content your competitors do not have, such as your own data, an example from practice or a test result. Structure helps only once your text has something worth citing.

## What about structured data?

Structured data such as Article, FAQPage or Product markup in JSON-LD describes your page and its entities for search engines. Google states that structured data is not required to appear in its generative AI features, so treat it as support for clear writing. Markup helps a search engine understand who wrote the page, when it was updated and what it is about, and the text itself still has to answer the question.

## What to avoid

Some habits lower your chance of being cited or only seem to help:

- Keyword stuffing, which lowered visibility in the Princeton study and performed about 10% worse than unchanged text on Perplexity.ai.
- Artificial language written "for bots", with repeated phrases and unnatural questions.
- Vague claims without facts, such as "a modern solution" or "high quality".
- Long introductions before the first answer.
- Numbers without a source or date, especially on topics that change quickly.
- Writing to a target word count, because Google states plainly that it has no preferred length.

## Pre-publication checklist

Before you publish, go through these points in order:

- [ ] The first paragraph answers the question in the title in 1-2 sentences.
- [ ] Every H2 section opens with the answer to its own question.
- [ ] No section refers back to "the above".
- [ ] Headings say what the section contains.
- [ ] The text has several numbers with a unit, a date and a source.
- [ ] Names, attributes and values replace adjectives.
- [ ] The text has at least one quotation with the person's name and role.
- [ ] The text answers 3-5 follow-up questions from Google results.
- [ ] The text uses the terms the topic calls for.
- [ ] Sentences are in the active voice with a clear actor.
- [ ] The text contains something the top 10 pages do not.

## How to check your text

The simplest test is to cut out a random section and read it on its own. If it answers no question without the rest of the text, it needs work. For a longer text, this test takes a lot of time, though, and it does not show what is missing compared with your competitors.

The [CitationOne audit](/how-it-works) scores your text on [10 content quality dimensions plus E-E-A-T](/dimensions), which correspond to the rules in this guide, and compares it with the top 10 for a chosen keyword. You get a list of sections to improve with specific suggestions.

## Summary

Content that AI cites opens with the answer, rests on facts with sources and is made of sections that stand on their own. **The biggest gains come from adding quotations, statistics and sources, plus information your competitors do not have.** Start with one important text. Go through the checklist, fix the first paragraphs of its sections and add the missing follow-up questions.

[Check your text with the CitationOne audit](https://app.citationone.com/login) to see which sections follow these rules and which need work.

## Frequently asked questions

### How do I write AI-friendly content?

AI-friendly content opens every section with a direct answer, gives specific facts with a unit, date and source, and keeps each section understandable on its own. Add answers to follow-up questions from Google results, use the terminology of the topic and write in the active voice. Content with your own data or experience has the best chance of being cited.

### Can text written with AI be cited by AI?

Yes, because Google evaluates the quality of content and not how it was produced. In its 2023 guidance, Google says that appropriate use of AI does not break its rules, and the problem is automation used mainly to manipulate rankings. Text written with the help of AI has to meet the same conditions as any other, meaning facts, sources and value for the reader.

### What is the best content length for AI search?

The best length is whatever it takes to answer the main question and the follow-up questions. Google says in its helpful content guidance that it has no preferred word count, and in its guide to AI features that there is no ideal page length. Completeness of the answer counts, and the number of words does not.

### Do headings have to be questions?

Headings do not have to be questions, but they have to say clearly what the section contains. Questions work well where they match real queries from Google results or the "People also ask" box. Elsewhere, a factual statement or the name of the section's topic works better.

### How does writing for AI differ from writing for SEO?

Generative engine optimization builds on the same foundations as classic SEO, namely search intent, quality and a good match to the question. It puts more weight on self-contained sections, verifiable facts with sources and answers to follow-up questions, because AI systems cite individual passages in place of whole pages.

## Sources

- Aggarwal P., Murahari V., Rajpurohit T., Kalyan A., Narasimhan K., Deshpande A., [GEO - Generative Engine Optimization](https://arxiv.org/abs/2311.09735), arXiv 2311.09735, KDD 2024, accessed 2026-11-10.
- Google Search Central, [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), accessed 2026-11-10.
- Google Search Central, [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), accessed 2026-11-10.
- Google Search Central Blog, [Google Search's guidance about AI-generated content](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content), February 8, 2023, accessed 2026-11-10.
- Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), accessed 2026-11-10.
