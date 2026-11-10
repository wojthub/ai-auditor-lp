# CitationOne - kontekst dla artykułów

## Produkt w jednym akapicie

CitationOne (`citationone.com`, aplikacja `app.citationone.com`) robi audyt GEO treści: sprawdza stronę pod kątem tego, czy silniki AI (ChatGPT, Perplexity, Google AI Overviews i AI Mode, Copilot) mogą ją zrozumieć, pobrać i zacytować, porównuje ją z TOP 10 dla frazy i podaje konkretne poprawki. Wynik zbiorczy to CQS (Content Quality Score) z 10 wymiarów jakości treści plus E-E-A-T. Obok audytu są 4 narzędzia dla całego serwisu.

Źródło prawdy o tym, co produkt robi: `src/data/dimensions-pl.ts`, `src/data/tools-pl.ts` i `../ai-auditor/spec/`. Jeśli artykuł opisuje funkcję produktu, sprawdź ją tam, zanim ją obiecasz.

## Autor

**Wojciech Władziński-Ulatowski** - twórca CitationOne, ekspert SEO z ponad 15-letnim doświadczeniem, wzrost organiczny w branży finansowej (YMYL), strategia SEO i konwersji w Lendi. Używaj w byline i jako sygnał doświadczenia (np. „w audytach, które robimy…”), bez dopisywania osiągnięć spoza tego opisu.

## Wymiary audytu (linki wewnętrzne i CTA)

| Wymiar | URL PL | URL EN | Co sprawdza | Pasuje do tematów |
|---|---|---|---|---|
| Zgodność z CSI | `/pl/wymiary/zgodnosc-z-csi` | `/dimensions/csi-alignment` | Czy treść odpowiada głównej intencji zapytania | intencja, „dlaczego nie rankuję / nie jestem cytowany” |
| Gęstość informacji | `/pl/wymiary/gestosc-informacji` | `/dimensions/information-density` | Ile zdań niesie sprawdzalny fakt | lanie wody, treści pod AI, konkret |
| Graf wiedzy (EAV) | `/pl/wymiary/graf-wiedzy` | `/dimensions/knowledge-graph-eav` | Czy fakty układają się w encja-atrybut-wartość | encje, semantyka, pokrycie tematu |
| BLUF | `/pl/wymiary/bluf` | `/dimensions/bluf` | Czy odpowiedź pada na początku sekcji | struktura tekstu, featured snippet, cytowanie |
| Samodzielność sekcji | `/pl/wymiary/optymalizacja-chunkow` | `/dimensions/chunk-optimization` | Czy sekcja jest zrozumiała w oderwaniu od reszty (chunki w RAG) | jak AI czyta strony, pisanie pod LLM |
| Koszt pozyskania | `/pl/wymiary/koszt-pozyskania` | `/dimensions/cost-of-retrieval` | Czy struktura strony ułatwia znalezienie odpowiedzi | struktura, nagłówki, technika |
| TF-IDF | `/pl/wymiary/tf-idf` | `/dimensions/tf-idf` | Której terminologii brakuje względem konkurencji | słownictwo tematu, luki |
| Role semantyczne | `/pl/wymiary/role-semantyczne` | `/dimensions/semantic-roles` | Kto, co, komu - czy zdania mają jasny sens | jasność zdań, pisanie pod AI |
| Pokrycie Fan-Out i AIO | `/pl/wymiary/pokrycie-fan-out` | `/dimensions/query-fan-out` | Na ile pytań pobocznych wokół intencji odpowiada strona | query fan-out, AI Overviews, AI Mode |
| Effort Score | `/pl/wymiary/effort-score` | `/dimensions/effort-score` | Kompletność strony: daty, formaty, materiały | jakość treści, helpful content |
| E-E-A-T | `/pl/wymiary/e-e-a-t` | `/dimensions/e-e-a-t` | Autor, źródła, aktualizacje | wiarygodność, YMYL |
| Wartość dodana | `/pl/wymiary/wartosc-dodana` | `/dimensions/information-gain` | Ile strona wnosi ponad to, co już jest w TOP 10 | information gain, unikalność |

Hub wymiarów: `/pl/wymiary` (`/dimensions`).

## Narzędzia

| Narzędzie | URL PL | URL EN | Co robi |
|---|---|---|---|
| Klasteryzacja słów kluczowych | `/pl/narzedzia/klasteryzacja` | `/tools/keyword-clustering` | Grupuje frazy w klastry z intencją i wolumenem - baza planu treści |
| Content pruning | `/pl/narzedzia/pruning` | `/tools/content-pruning` | Wskazuje strony, które kanibalizują się nawzajem |
| Analiza schema.org | `/pl/narzedzia/analiza-schema` | `/tools/schema-gaps` | Audyt danych strukturalnych z sitemapy |
| Linki wewnętrzne | `/pl/narzedzia/linki-wewnetrzne` | `/tools/internal-linking` | Propozycje linkowania w obrębie serwisu |


## Inne podstrony

`/pl/jak-to-dziala` (`/how-it-works`), `/pl/cennik` (`/pricing`), `/pl/api` (`/api`), blog `/pl/blog` (`/blog`).

Inne wpisy bloga linkuj jako `/pl/blog/<slug>` (`/blog/<slug>`) i tylko te, które już są w `BLOG_POSTS` w `src/data/blog.ts`.

## CTA

- Główne CTA prowadzi do aplikacji: `https://app.citationone.com/login` (rejestracja/logowanie i pierwszy audyt). Na LP adres bierze się z `APP_URL` w `src/lib/appUrl.ts` - przy wdrożeniu artykułu używaj tej stałej, w treści markdown pełnego adresu.
- Dobierz CTA do etapu lejka: informacyjny → podstrona wymiaru albo „sprawdź swój tekst audytem”, porównawczy → `/pl/jak-to-dziala`, decyzyjny → aplikacja lub `/pl/cennik`.
- Formułuj CTA przez korzyść i konkret („Sprawdź, które sekcje Twojego tekstu nie zaczynają się od odpowiedzi”), bez ogólników typu „Wypróbuj teraz”.

## Dane własne do wykorzystania

**Analiza „pozycja w TOP 10 a cytowanie w AI Overview”** (stan 2026-11-10, 996 SERP-ów PL z 1167 audytów, dopasowanie po dokładnym URL):
- strona z 1. pozycji jest cytowana w AI Overview w 59,9% przypadków, średnio w TOP 10 w 40,7%,
- spadek jest najmocniejszy na pozycjach 1-5 (do 35,3%), na 6-10 słabnie i trzyma się w paśmie ~28-33%,
- w 13,4% SERP-ów AI Overview nie cytuje żadnej domeny z TOP 10; najczęstsze źródła spoza dziesiątki to Facebook, YouTube i Reddit.

Liczby się starzeją wraz z przyrostem audytów. Przed użyciem w nowym tekście przelicz je skryptem `../ai-auditor/scripts/aio-position-stats.mjs` (tylko odczyt bazy, 0 kredytów; `set -a; . ./.env.local; set +a; LANG_FILTER=pl node scripts/aio-position-stats.mjs` z katalogu `ai-auditor`) i zaproponuj to userowi. Opisuj wnioski pasmami i kierunkiem, bez zbieżności pojedynczych pozycji. Zawsze podaj datę, wielkość próby i zastrzeżenia - korelacja, frazy z audytów w CitationOne. Już wykorzystane w `/pl/blog/jak-pojawic-sie-w-ai-overviews`.

## Terminologia

- GEO = sposób optymalizacji („audyt GEO”, „wytyczne GEO”). Odpowiedzi AI = miejsce („ruch z odpowiedzi AI”, „cytowanie w odpowiedziach AI”).
- Nazwy produktów pisz pełne i aktualne: Google AI Overviews, Google AI Mode, ChatGPT (wyszukiwanie w ChatGPT), Perplexity, Microsoft Copilot. Przed publikacją sprawdź, czy nazwa funkcji się nie zmieniła.
- Nazwy botów (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended) potwierdzaj w dokumentacji dostawcy.
