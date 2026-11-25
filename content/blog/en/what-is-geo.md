**GEO (Generative Engine Optimization) is the practice of preparing your content and website so that AI systems such as ChatGPT, Google AI Overviews and AI Mode, Perplexity and Microsoft Copilot choose it as a source and cite it in their answers. In SEO you compete for a position in search results. In GEO you compete for a place in the answer that AI writes for the user.**

Key takeaways:

- The term GEO was coined in 2023 by a team of researchers from Princeton University, in a paper accepted at the KDD 2024 conference.
- In that study, adding quotations, statistics and source citations raised a page's visibility in AI answers **by up to about 40%**.
- Keyword stuffing lowered visibility in AI answers instead of raising it.
- Lower-ranked pages gained the most, and a page in 5th place improved its visibility **by 115%** after adding sources.
- Google treats optimization for AI Overviews and AI Mode as part of SEO and requires no special files, structured data or schema markup for it.
- Only pages that allow the OAI-SearchBot crawler can appear in ChatGPT search answers.
- GEO is also used as shorthand for geotargeting and local marketing, and this article covers only Generative Engine Optimization.

The study also found that a page in 5th place gained **115.1%** in visibility after citing sources, while pages in 1st place lost 30.3% with the same changes.

This guide is for people responsible for search traffic, whether you run a business, work in marketing or do SEO for clients. Below you will find where the term came from, how AI systems pick their sources, how GEO differs from SEO and where to start.

## Where the term GEO comes from

The name Generative Engine Optimization comes from a research paper published in November 2023. Its authors are Pranjal Aggarwal, Vishvak Murahari, Tanmay Rajpurohit, Ashwin Kalyan, Karthik Narasimhan and Ameet Deshpande. They used the term "generative engines" for search engines that write an answer from the pages they find, in place of a list of links.

The researchers built a benchmark called GEO-bench with **10,000 queries** from many domains and tested 9 ways of rewriting content. They measured how much of a page's text made it into the AI answer and how prominently it appeared there. The table shows that visibility score for the most effective changes and for keyword stuffing (a higher score means more visibility).

| Change to the content | Score | Unchanged text |
|---|---|---|
| Adding quotations | **27.8** | 19.5 |
| Adding statistics | **25.9** | 19.5 |
| Citing sources | **24.9** | 19.5 |
| Keyword stuffing | 17.8 | 19.5 |

The last row is a technique from old-school SEO. In AI answers it reduced visibility, and on Perplexity.ai it performed **about 10% worse** than the unchanged text.

The results by ranking position are even more interesting. A page in 5th place in the search results increased its visibility in the answer **by 115.1%** after citing sources, while pages in 1st place **lost 30.3%** on average with the same changes.

In my view, this is the most overlooked finding of the whole study. GEO gives a real chance to pages that lose to the leader in classic rankings, as long as they bring facts and sources to the topic, because in this experiment the 5th-place page more than doubled its visibility. Keep in mind that this result comes from an experiment on a test set and does not describe how any specific search engine works.

> [!REMEMBER]
> In the GEO study, lower-ranked pages that added facts and sources gained the most. Keyword stuffing reduced visibility.

## How AI systems choose their sources

AI systems that write direct answers choose their sources in three stages. They search a search engine's index for pages, select the passages that match the question, and write an answer from those passages with links. An AI assistant with web access goes through these stages as follows:

1. **Retrieval.** The system sends one or more queries to a search engine's index. Google describes how AI Overviews and AI Mode can use query fan-out (splitting a question into many related searches on subtopics) to gather a wider set of sources than regular results.
2. **Passage selection.** From the pages it found, the system picks the passages that best answer the question or part of it, for example a paragraph with a definition, a table or a list of steps.
3. **Synthesis.** The model writes an answer from the selected passages and adds links to the pages it used.

<figure><img src="/blog/en/how-ai-chooses-sources.svg" alt="Diagram of the three stages AI uses to choose sources, which are retrieval from the index, including follow-up questions, selection of passages that answer the question, and synthesis of an answer with links. The conditions are a page that is indexed and open to the crawler and a section that makes sense when cut out of the text." width="640" height="560" loading="lazy" decoding="async"><figcaption>AI answers quote passages, so every stage sets a condition your page has to meet.</figcaption></figure>

This has two practical consequences. **Your page has to be indexed and open to the crawler of a given system**, because without that it never enters the first stage. Pages reach the index mostly through links, which is why a planned [internal linking strategy](/blog/internal-linking-strategy) is the foundation. The answer also quotes a passage, so the section with your answer should make sense when cut out of the article.

Google also states plainly that you do not need to break your content into tiny chunks. It is enough that each section opens with the answer and names its topic directly. We describe how to check these qualities in the [chunk optimization](/dimensions/chunk-optimization) and [fan-out and AIO coverage](/dimensions/query-fan-out) dimensions.

> [!REMEMBER]
> AI answers quote a passage, and the whole page is only the container. Every section should open with the answer and make sense when cut out of the text.

## GEO vs SEO - what stays and what is new

GEO extends SEO with a new goal, which is **being cited in an AI answer**. The foundation stays the same, because AI systems rely on search engine indexes. What GEO adds is work on individual passages, on how clearly your brand and its facts are described, and on mentions of your brand in sources that AI systems read.

| Area | SEO | GEO |
|---|---|---|
| Goal | A high ranking and a click on the result | A citation or mention in an AI answer |
| Where you see results | Google and Bing results | ChatGPT, AI Overviews, AI Mode, Perplexity, Copilot |
| What gets evaluated | The whole page and its URL | The passage that answers the question |
| What works | Search intent match, links, technical health, content quality | The same, plus facts, sources, quotations and answers to follow-up questions |
| Measurement | Rankings, traffic, CTR | Citations and mentions in AI answers, traffic from AI answers |
| Typical query | Short keyword searches | Longer, conversational questions with follow-ups |

Google is clear about this. In its guide to optimizing for generative AI features it says that, from the search engine's point of view, this kind of optimization **"is still SEO"**. Appearing in AI Overviews and AI Mode has no additional technical requirements. The page has to be indexed and eligible to be shown with a snippet, and files such as llms.txt or special schema.org markup are not needed for it. We cover what this means in practice in [how to appear in AI Overviews](/blog/how-to-appear-in-ai-overviews).

"If Google says it is still SEO, why use a separate name?"

Because Google is talking about its own features. ChatGPT, Perplexity and Copilot have their own crawlers and their own ways of choosing sources. OpenAI's documentation states that sites that block the OAI-SearchBot crawler **will not be shown in ChatGPT search answers**, while GPTBot collects data for training models and has no effect on search visibility. The remaining conditions are covered in [how to rank in ChatGPT](/blog/how-to-rank-in-chatgpt).

The same Google guide also encourages content that cannot be found everywhere else, based on your own knowledge, experience and data. The Princeton study reaches a similar conclusion from the other side, because texts with facts and sources performed best.

## Can GEO replace SEO?

**GEO will not replace SEO, because it is built on top of it.** AI systems look for sources in search engine indexes, so a page that is weak in SEO rarely makes it into AI answers. What changes is how you measure success. Next to rankings and organic traffic, you now track brand mentions in AI answers that users read without visiting your site.

Mentions of your brand on other sites, such as reviews, roundups and forums, matter here too, because AI systems read those sources alongside your own pages.

In practice, both approaches lead to the same work. Content that answers the question clearly, backs up facts with sources and covers follow-up questions does better both in Google results and in AI answers.

## What GEO optimization looks like in practice

GEO optimization is a set of changes to your content and website that raise the chance that an AI system picks your passage. Six of them have the biggest effect.

### 1. Put the answer first

The first sentences of the page and of every section answer the question directly. An AI system looking for an answer finds it without reading the introduction. This principle is called BLUF (bottom line up front), and you can read more in the [BLUF dimension guide](/dimensions/bluf).

### 2. Make every section self-contained

Each section names its topic directly and does not refer back to "the above". AI systems quote a passage, not the whole article, so a paragraph cut out of the text still has to make sense. In practice, this means repeating the name of the topic in the first sentence of a section in place of pronouns such as "this" or "that approach". You will find examples of such edits in [how to write content for AI search](/blog/how-to-write-content-for-ai-search).

### 3. Use specific facts

Numbers with units, dates, names and comparisons. In the GEO study, adding statistics was one of the three most effective changes, and sentences without facts lower the [information density](/dimensions/information-density) of a text.

### 4. Add sources and quotations

References to studies, documentation and experts, with names and dates. In the GEO study, adding quotations raised the visibility score from 19.5 to **27.8**, and citing sources raised it to **24.9**, which put these changes next to statistics at the top of all the methods tested.

### 5. Answer follow-up questions

Answer the questions people ask around the main topic, taken from Google's "People also ask" box and related searches. AI systems split a question into subtopics (query fan-out) and look for an answer to each of them separately, so a page that covers them has more passages to quote.

### 6. Show the author and your own expertise

A visible author with a short bio that states their experience in the topic, a visible publication or update date, and information your competitors do not have, such as your own data, case studies and lessons from practice. The [E-E-A-T](/dimensions/e-e-a-t) and [information gain](/dimensions/information-gain) dimensions cover this.

### Checklist to get started

Before you start rewriting content, check these points:

- [ ] The page is indexed in Google and Bing.
- [ ] robots.txt does not block OAI-SearchBot or Googlebot.
- [ ] The first paragraph answers the main question in 1-3 sentences.
- [ ] Every H2 section opens with the answer to its own question.
- [ ] The text contains several specific numbers with sources.
- [ ] The page answers 3-5 follow-up questions from Google results.
- [ ] The author and the update date are visible.
- [ ] The text contains your own data, a real-world example or a conclusion that the top 10 pages do not have.

## How to measure GEO results

GEO results are measured by how often AI answers cite your pages and mention your brand for the queries you care about. The simplest method is a manual check:

1. Pick 10-20 questions that your customers ask.
2. Ask them in ChatGPT, Google (AI Overviews and AI Mode) and Perplexity.
3. Note whether your page or brand appears in the answer and in its sources.
4. Repeat the check every few weeks.

This method has limits. AI answers vary from one attempt to the next, they depend on location and user history, and checking dozens of queries by hand takes hours. Google includes traffic from AI Overviews and AI Mode in the Search Console performance report, under the "Web" search type. We describe all tracking methods, from GA4 to server logs, in [how to track AI visibility](/blog/how-to-track-ai-visibility).

Also keep in mind Google's caveat that **no third-party tool has access to the search engine's internal ranking systems**. GEO tools show what can be measured from the outside, meaning what AI actually cites and how your content differs from the cited pages.

That is how the [CitationOne audit](/how-it-works) works. It compares your page with the top 10 results for a chosen keyword, checks AI answers and scores the text on [10 content quality dimensions plus E-E-A-T](/dimensions), from BLUF to information gain. You get a list of specific fixes for the sections that currently have a low chance of being cited.

## GEO, AEO, AIO, LLMO - how the names differ

All of these acronyms describe optimizing content for answers generated by AI. In practice they are used as near-synonyms, and each puts the emphasis somewhere else:

- **GEO** (Generative Engine Optimization) is the name from the 2023 study.
- **AEO** (Answer Engine Optimization) is an older name focused on "answer engines", also used for featured snippets and voice assistants.
- **AIO** (AI Optimization) is a general name that is easy to confuse with AI Overviews, which share the acronym.
- **LLMO** (Large Language Model Optimization) emphasizes language models and appears more often in technical writing.

Some marketers also say "AI SEO" or "search everywhere optimization". The choice of name does not change the scope of the work. When you talk to a client or your team, agree on one name and stick to it.

## Summary

GEO is SEO with a new goal, which is being cited in AI answers. The study that gave the term its name and Google's documentation lead to the same conclusion. **The content that wins answers directly, backs up facts with sources and brings something of its own.** The best first step is to check which sections of your most important pages meet these conditions.

[Check your page with the CitationOne GEO audit](https://app.citationone.com/login) to see which passages have a chance of being cited in AI answers and what to fix in the rest.

## Frequently asked questions

### What does GEO mean in marketing?

In marketing, GEO most often means Generative Engine Optimization, the practice of getting your content and brand cited in answers from ChatGPT, Google AI Overviews, AI Mode and Perplexity. The same acronym is also used for geotargeting, which means showing ads or content to people in a specific location. Check which meaning someone has in mind before you compare offers or reports.

### What is the difference between GEO and SEO?

SEO aims for a high ranking in search results and a click on your link. GEO aims for a citation or mention inside an AI-generated answer. GEO builds on SEO, because AI systems find their sources in search engine indexes, and adds goals such as facts with sources, self-contained sections and answers to follow-up questions.

### Can GEO replace SEO?

GEO will not replace SEO, because AI systems retrieve their sources from search engine indexes. Google itself describes optimizing for its AI features as part of SEO. What changes is how success is measured, because citations and mentions in AI answers now count next to rankings and clicks.

### Is GEO the same as AEO?

GEO and AEO cover nearly the same work, which is optimizing content so that AI systems use it in their answers. AEO (Answer Engine Optimization) is the older name and is also used for featured snippets and voice search. GEO comes from the 2023 Princeton study and focuses on generative AI answers.

### How do I start with GEO?

Start by checking that your most important pages are indexed in Google and Bing and that robots.txt does not block OAI-SearchBot or Googlebot. Then pick a few pages with the most traffic and rework them by putting the answer first, adding facts with sources and answering follow-up questions. Finally, check whether AI systems start citing them.

## Sources

- Aggarwal P., Murahari V., Rajpurohit T., Kalyan A., Narasimhan K., Deshpande A., [GEO - Generative Engine Optimization](https://arxiv.org/abs/2311.09735), arXiv 2311.09735, KDD 2024, accessed 2026-11-10.
- Google Search Central, [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), accessed 2026-11-10.
- Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), accessed 2026-11-10.
- OpenAI, [Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots), accessed 2026-11-10.
