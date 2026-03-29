# Wymiary audytu

> Czesc specyfikacji CitationOne. Indeks: [CLAUDE.md](../CLAUDE.md)

## Wymiary audytu

Kazdy wymiar to osobne wywolanie Gemini API z dedykowanym promptem. Prompty w `lib/ai/prompts/`.

**DimensionProblem extended schema:** kazdy prompt wymiaru generuje `problems[]` z 4 opcjonalnymi polami per problem: `title` (tytul rekomendacji), `section` (nazwa H2 lub "Lead"/"Meta"), `actionType` ("zamień"/"dodaj"/"usuń"/"przenieś"/"rozszerz"), `clientWhy` (uzasadnienie w jezyku klienta). Te pola sa uzywane przez `recommendation-builder.ts` do algorytmicznego budowania rekomendacji (0 Gemini calls).

| # | Wymiar | DimensionId | Prompt plik | Co ocenia |
|---|--------|-------------|-------------|-----------|
| CSI-A | CSI Alignment | `csiAlignment` | `csi-alignment.ts` | Zgodnosc tresci z CSI, EAV coverage, BLUF check, placement atrybutow |
| 1 | Information Density | `density` | `information-density.ts` | Stosunek faktow do puchu. Score = (zdania faktyczne / wszystkie) x 10 |
| 2 | EAV Structure | `eav` | `eav-extraction.ts` | Kompletnosc trojek Entity-Attribute-Value |
| 3 | BLUF | `bluf` | `bluf-analysis.ts` | Odpowiedz w pierwszych 50 slowach H2. Struktura: Odpowiedz->Dowod->Kontekst |
| 4 | Chunk Optimization | `chunk` | `chunk-optimization.ts` | Autonomicznosc sekcji, dlugosc 200-500 slow, dystrybucja terminow |
| 5 | Cost of Retrieval | `cor` | `cost-of-retrieval.ts` | Struktura H1->H2->H3, listy, tabele, boldy, latwosc ekstrakcji |
| 6 | TF-IDF | `tfidf` | `tfidf-analysis.ts` | Terminologia branzowa. Score = (high_idf / oczekiwane) x 10 |
| 7 | Semantic Roles | `srl` | `semantic-roles.ts` | CE jako Agent vs Patient. Cel: CE Agent w >70% zdan |
| 8 | Fan-Out i AIO | `queryFanout` | `query-fanout.ts` | Pokrycie sub-zapytan AI Search + AI Overview. Dekompozycja CSI na 5-10 sub-queries, SERP grounding (tryb Full) |
| +  | E-E-A-T | `eeat` | `eeat-evaluation.ts` | Experience, Expertise, Authority, Trust (kazdy 0-10) |

## Kryteria scoringu per wymiar

### Skala uniwersalna

| Score | Interpretacja |
|-------|---------------|
| 9-10  | Doskonaly -- wzorcowy content |
| 7-8   | Dobry -- drobne poprawki |
| 5-6   | Sredni -- wymaga optymalizacji |
| 3-4   | Slaby -- znaczace braki |
| 1-2   | Krytyczny -- pilna przebudowa |

### Szczegolowe kryteria per wymiar

**CSI-A (CSI Alignment):** Zgodnosc tresci z Central Search Intent
- 9-10: Tresc w pelni odpowiada na CSI, BLUF w lead, EAV 100% pokrycie, placement atrybutow poprawny
- 7-8: Dobra zgodnosc, drobne braki w EAV lub placement atrybutow
- 5-6: Czesciowa zgodnosc, BLUF brak w lead, EAV <70%
- 3-4: Slaba zgodnosc, tresc odpowiada na inne pytanie niz CSI
- 1-2: Brak zgodnosci z CSI

**D1 (Information Density):** Stosunek faktow do puchu
- 9-10: >80% zdan to weryfikowalne fakty z liczbami/encjami
- 7-8: 60-80% faktow, minimalne opinie
- 5-6: 40-60% faktow, zauwalny puch
- 3-4: 20-40% faktow, dominuja ogolniki
- 1-2: <20% faktow, sama retoryka

**D2 (EAV Structure):** Kompletnosc trojek Entity-Attribute-Value
- 9-10: Wszystkie encje maja kompletne atrybuty z wartosciami
- 7-8: Wiekszosc atrybutow ma wartosci
- 5-6: Podstawowe atrybuty obecne, braki w wartosciach
- 3-4: Encje bez atrybutow lub atrybuty bez wartosci
- 1-2: Brak struktury EAV

**D3 (BLUF):** Bottom Line Up Front
- 9-10: Kazda sekcja zaczyna sie od odpowiedzi z liczbami
- 7-8: Wiekszosc sekcji ma BLUF, sporadyczne wstepy
- 5-6: ~50% sekcji ma odpowiedz na poczatku
- 3-4: Odpowiedzi ukryte w srodku/koncu sekcji
- 1-2: Ogolne wstepy, brak bezposrednich odpowiedzi

**D4 (Chunk Optimization):** Autonomicznosc sekcji dla RAG
- 9-10: Kazda sekcja autonomiczna, optymalna dlugosc 200-500 slow
- 7-8: Sekcje w wiekszosci autonomiczne
- 5-6: Niektore sekcje wymagaja kontekstu ("jak wspomniano")
- 3-4: Sekcje silnie zalezne od siebie
- 1-2: Brak logicznego podzialu na sekcje

**D5 (Cost of Retrieval):** Latwosc ekstrakcji informacji
- 9-10: Idealna struktura H1->H2->H3, tabele, listy, boldowanie
- 7-8: Dobra struktura, formatowanie pomocne
- 5-6: Podstawowa struktura, brak tabel/list
- 3-4: Chaotyczna struktura, sciana tekstu
- 1-2: Brak naglowkow, nieczytelne

**D6 (TF-IDF):** Terminologia branzowa
- 9-10: Bogata terminologia specjalistyczna, wszystkie kluczowe terminy
- 7-8: Dobra terminologia, drobne braki
- 5-6: Podstawowe terminy, brak specjalistycznych
- 3-4: Przewaga slow generycznych
- 1-2: Tylko slowa ogolne, brak zargonu

**D7 (Semantic Roles):** CE jako Agent
- 9-10: CE konsekwentnie jako Agent w >70% zdan, spojna perspektywa
- 7-8: CE dominuje jako Agent, sporadyczne przesuniecia
- 5-6: CE czasem jako Patient, niespojna perspektywa
- 3-4: CE rzadko jako Agent
- 1-2: CE nieobecna lub tylko jako Patient

**D8 (Fan-Out i AIO):** Pokrycie sub-zapytan AI Search + AI Overview
- 9-10: 90%+ sub-zapytan pokrytych, wszystkie verification queries pokryte, bonus +1
- 7-8: 75-89% pokrytych, brak krytycznych luk
- 5-6: 50-74% pokrytych, brakuje kilku waznych sub-queries
- 3-4: 30-49% pokrytych, znaczace luki w pokryciu
- 1-2: <30% pokrytych, tresc odpowiada tylko na glowne pytanie
- Malus -1 za niepokryte SERP-ONLY sub-queries (potwierdzone luki z SERP)
- Typy dekompozycji: semantic (atrybuty/relacje encji), intent (realne potrzeby uzytkownika), verification (weryfikacja faktow)
- Tryb Full: grounding wobec PAA/Related (CONFIRMED/PREDICTED/SERP-ONLY)
- Content-only: grounding = null (brak danych SERP)

## Formuly scoringu per wymiar

Uzywane w promptach do Gemini API i w `lib/scoring.ts`:

**D1 Density:** `Score = (zdania_faktyczne / wszystkie_zdania) x 10`
- Kary: slowa modalne (-0.5), puste frazy (-1.0), przymiotniki ocenne (-0.5), pytania retoryczne (-0.5)
- Bonusy: konkretne liczby (+1.0), nazwy wlasne/encje (+0.5), wartosci EAV (+1.0), atomic claims (+1.0)

**D5 CoR:** System punktowy (max 10):
- Hierarchia H1->H2->H3 (+2), tabele z danymi (+2), listy punktowane/numerowane (+1)
- Pogrubienia kluczowych faktow (+1), TL;DR / sekcja podsumowania (+1)
- Brak "scian tekstu" >300 slow bez formatowania (+1), internal links w kontekscie (+1), brak ogolnikowych wstepow (+1)

**D6 TF-IDF:** `Score = (high_idf_terms_present / oczekiwane_high_idf_terms) x 10`
- HIGH IDF = terminy specjalistyczne, branzowe, wielowyrazowe frazy
- LOW IDF = slowa funkcyjne, ogolne rzeczowniki, generyczne przymiotniki

**D7 SRL:** `Score = (suma_punktow / max_punktow) x 10`
- CE jako Agent: +1.0 per zdanie
- CE jako Patient: +0.5 per zdanie
- CE nieobecne: 0

## CSI Alignment -- co sprawdza (csi-alignment-checker)

CSI Alignment to meta-wymiar sprawdzajacy **zgodnosc tresci z Central Search Intent**:

1. **Walidacja CSI** -- czy tresc odpowiada na zdefiniowane CSI
2. **EAV Coverage** -- ile atrybutow z benchmarku (lub oczekiwanych) jest pokrytych
3. **BLUF Check** -- czy pierwsze 50 slow odpowiada na CSI, zawiera UNIQUE attribute i dane/liczby
4. **Chunk Validation** per H2: dlugosc 200-500, autonomia, BLUF sekcji (max 25 slow), CE repeat min 2x
5. **Attribute Placement** -- UNIQUE w H1/Lead, ROOT w dedykowanych H2, RARE w H3/FAQ (klasyfikacja algorytmiczna w EAV)
6. **Gap Analysis** (tryb Full) -- porownanie z benchmarkiem SERP:

| Status | Definicja | Priorytet |
|--------|-----------|-----------|
| **POKRYTE** | Atrybut w artykule i u konkurencji | OK |
| **GAP P1** | ROOT u 7+/10 konkurentow, brak u nas | CRITICAL |
| **GAP P2** | ROOT u 5-6/10 + PAA potwierdza | HIGH |
| **GAP P3** | RARE w PAA | MEDIUM |
| **GAP P4** | RARE u 1-2/10 | LOW |
| **NADMIAROWE** | U nas jest, u konkurencji nie | Potencjalny UNIQUE |

7. **Content Format Intelligence** (tryb Full) -- analiza formatow uzywanych przez konkurencje:

Podczas ekstrakcji EAV z konkurentow (etap 5 benchmark), Gemini API dodatkowo wykrywa jakie **formaty prezentacji** stosuja konkurenci:

| Format | Co wykrywac | Przyklad |
|--------|-------------|----------|
| `tables` | Tabele porownawcze, tabele z danymi | Tabela oprocentowania kredytow wg bankow |
| `lists` | Listy punktowane/numerowane (>3 elementy) | Lista objawow, kroki postepowania |
| `infographics` | Obrazy, grafiki, diagramy, schematy (UI label: "Obrazy") | "Jak pokazuje wykres ponizej...", imageCount >=4 z htmlMetrics |
| `bibliography` | Cytowania naukowe, lista zrodel, PubMed | "(Smith et al., 2024)", "[1]" |
| `videos` | Osadzone video, odwolania do YouTube | Embed YouTube, "obejrzyj film" |
| `faq` | Sekcja FAQ / pytania i odpowiedzi | "Najczesciej zadawane pytania" |

Wynik: tablica `ContentFormatIntelligence[]` w `BenchmarkData.contentFormats`. W raporcie porownanie z naszym artykulem -- formaty gdzie konkurencja uzywa a my nie = gap formatowy (rekomendacja dodania).

## BLUF -- szczegolowe reguly transformacji

Zrodlo: `docs/bluf-generator/references/transformations.md`

**Dlaczego BLUF dziala w AI Search:**
- Systemy RAG dziela tresci na chunki (~200-500 slow), kazdy osobno oceniany
- Chunk z odpowiedzia na poczatku ma wyzszy relevance score
- Tresci z BLUF cytowane w **~62%** jako glowne zrodlo
- Fakty i liczby zwiekszaja szanse cytowania **4.5x**

**Pelna lista eliminacji (puch do usuniecia):**

| Wzorzec | Przyklady |
|---------|-----------|
| Wstepy budujace napiecie | "W dzisiejszych czasach...", "Zyjemy w erze...", "Nie od dzis wiadomo..." |
| Zapowiedzi | "Zanim przejdziemy do...", "W tym artykule...", "Ponizej przedstawiamy..." |
| Ogolniki | "Jest wiele powodow...", "Istnieje szereg czynnikow..." |
| Puste przymiotniki | "najlepszy", "skuteczny", "innowacyjny", "kompleksowy", "profesjonalny" |
| SEO fluff | "kompleksowe rozwiazania", "wieloletnie doswiadczenie", "indywidualne podejscie" |
| Kwalifikatory | "zasadniczo", "w pewnym sensie", "mozna powiedziec, ze" |
| Meta-komentarze | "warto zauwazyc", "nalezy podkreslic", "co ciekawe" |

**Transformacje ogolnikow -> precyzja:**

| Ogolnik | Precyzja |
|---------|----------|
| "wiele" | konkretna liczba lub zakres (5-10, kilkanascie) |
| "czesto" | "w X% przypadkow", "srednio co Y dni" |
| "szybko" | "w ciagu X dni/godzin/minut" |
| "znaczaco" | "o X%", "X-krotnie" |
| "regularnie" | "co X dni/tygodni" |
| "wiekszosc" | "X na Y", "ponad X%" |
| "niedawno" | konkretna data lub okres |
| "tanio/drogo" | konkretna kwota lub zakres |
| "duzy/maly" | konkretny wymiar/wielkosc |
| "dlugo/krotko" | konkretny czas |

**Pytania proste vs zlozone:**
- Proste ("Ile kosztuje X?"): BLUF = 1 zdanie z odpowiedzia
- Zlozone ("Jak wdrozyc strategie?"): BLUF = 2-3 zdania z krokami i liczbami

**Brak danych liczbowych:** Uzyj zakresow ("3-5 dni"), proporcji ("1 na 3"), porownan ("2x wiecej niz srednia")

**Checklist jakosci BLUF:**
- [ ] Odpowiedz w pierwszych 50 slowach
- [ ] Bezposrednia odpowiedz (bez budowania napiecia)
- [ ] Minimum 1 liczba/statystyka
- [ ] Konkretne terminy zamiast ogolnikow
- [ ] Zrodlo/dowod jesli dostepne
- [ ] Brak SEO fluff i pustych przymiotnikow

## E-E-A-T -- sygnaly i wagi

**Experience (0-10):** Personal story (+3), Case study (+3), Zdjecia/screenshoty (+2), Firsthand testing (+2)

**Expertise (0-10):** Cytaty z badan (+3), Dane ze zrodlem (+2), Terminologia branzowa (+2), Wyjasnienia mechanizmow (+2), Bibliografia (+1)

**Authority (0-10):** Bio autora z kwalifikacjami (+3), Afiliacja instytucjonalna (+2), Publikacje autora (+2), Cytowania zewnetrzne (+2), Nagrody (+1)

**Trust (0-10):** Disclaimer (+2), Data aktualizacji (+2), Kontakt do autora (+2), Polityka redakcyjna (+2), Czysta strona / HTTPS (+2)
