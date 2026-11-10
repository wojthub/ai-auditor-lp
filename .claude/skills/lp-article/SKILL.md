---
name: lp-article
description: Pisze po polsku artykuły SEO/GEO na landing CitationOne (ai-auditor-lp), które mają ściągać ruch organiczny i prowadzić do audytu - od briefu i researchu SERP, przez konspekt do akceptacji, po gotowy tekst z meta, FAQ, linkowaniem do podstron wymiarów i narzędzi oraz CTA. Używaj zawsze, gdy user chce napisać, zaplanować, odświeżyć albo poprawić artykuł, poradnik lub wpis blogowy na LP CitationOne, podaje temat typu „jak być widocznym w ChatGPT”, „AI Overviews”, „GEO”, „treści pod AI”, prosi o brief, konspekt, tytuły albo meta dla takiego tekstu - także gdy nie pada słowo „skill” ani „artykuł SEO”. Nie do postów na LinkedIn (to linkedin-post) ani do copy istniejących podstron produktowych.
---

# Artykuł na LP CitationOne

Artykuł ma zrobić dwie rzeczy: odpowiedzieć na pytanie czytelnika lepiej niż TOP 10 i odpowiedzi AI, a potem pokazać, że audyt CitationOne sprawdza to samo na jego stronie. Kolejność jest ważna. Tekst, który sprzedaje przed udzieleniem odpowiedzi, nie wygra ani w Google, ani w cytowaniach AI, a CitationOne sprzedaje dokładnie tę umiejętność - artykuł jest więc też dowodem, że autorzy wiedzą, o czym mówią.

Przed pisaniem przeczytaj [references/citationone.md](references/citationone.md) (wymiary, narzędzia, adresy, terminologia, CTA). Przy pracy nad tytułem i strukturą sięgnij do [references/tytuly-i-struktury.md](references/tytuly-i-struktury.md), przy autokontroli do [references/zasady-jakosci.md](references/zasady-jakosci.md).

## Przebieg

Pracuj etapami i zatrzymaj się na akceptację po konspekcie. Cały tekst od razu daje mniej kontroli: błąd w kącie widzenia wychodzi dopiero po 2000 słów i trzeba pisać od nowa.

### 1. Brief

Ustal (z rozmowy, a czego się nie da - zapytaj jednym zbiorczym pytaniem):

- **Fraza główna** i 2-5 pobocznych, w tym warianty pytające („jak…”, „czy…”, „dlaczego…”).
- **Sytuacja czytelnika** w jednym zdaniu: „Gdy [sytuacja], chcę [czego szuka], żeby [prawdziwy cel]”. Ostatni człon jest najważniejszy - mówi, jaki problem tekst ma rozwiązać, i z niego wynika CTA. Jeśli tego zdania nie da się napisać, temat jest za szeroki - zawęź go. Jeden artykuł = jedna sytuacja.
- **Intencja i etap lejka**: informacyjny (poznaje temat), porównawczy (wybiera sposób), decyzyjny (ma problem i szuka narzędzia).
- **Powiązanie z produktem**: który wymiar audytu lub narzędzie odpowiada tematowi (mapa w `citationone.md`) i jakie CTA z tego wynika.
- **Długość**: z researchu SERP, nie na oko.

### 2. Research

- Sprawdź TOP 10 dla frazy głównej (WebSearch, polski SERP): kąt, zakres, struktura, czego brakuje. Zanotuj, czy jest AI Overview i co cytuje.
- Zbierz fakty i liczby ze źródeł pierwotnych: dokumentacja Google Search Central, OpenAI, Perplexity, Microsoft, badania z metodologią. Temat AI zmienia się szybko - źródła starsze niż ~2 lata traktuj jako historyczne i opisuj z datą. Nie cytuj zestawień statystyk ani blogów konkurencji jako źródła liczby.
- Szukaj **przewagi, której inni nie mają**: własne dane CitationOne (np. raport „TOP 10 a AI Overviews” - liczby w `citationone.md`), przykład „przed i po”, doświadczenie z audytów. To jest wymiar „Wartość dodana” w praktyce i zwykle decyduje o tym, czy tekst zasługuje na cytowanie.
- Wybierz jeden kąt (poradnik krok po kroku, diagnoza problemu, dane, porównanie, obalanie mitu) i uzasadnij go jednym zdaniem.

### 3. Konspekt - do akceptacji

Pokaż userowi:

- 3 propozycje tytułu (z liczbą znaków) - na blogu tytuł jest jednocześnie H1 i `<title>`, a layout dokleja „ | CitationOne”, więc celuj w ~45-50 znaków,
- meta description (140-160 znaków, ten sam tekst jest leadem na liście wpisów),
- zdanie o sytuacji czytelnika i wybrany kąt,
- listę H2/H3, przy każdej sekcji 2-4 punkty treści i jaki dowód ją podpiera (liczba + źródło, przykład, dane własne),
- miejsca na linki wewnętrzne i CTA,
- 3-5 pytań do FAQ,
- slug w języku wpisu: wersja PL po polsku z frazą główną, bez polskich znaków (`jak-byc-widocznym-w-chatgpt`), wersja EN po angielsku z angielską frazą. Format `a-z0-9` z dywizami, unikalny w obrębie języka.

Pisz dalej dopiero po akceptacji albo poprawkach.

### 4. Tekst

- **Początek artykułu - zawsze ten sam układ (wymóg usera, bez wyjątków):**
  1. Pierwszy akapit to **bezpośrednia odpowiedź na pytanie z tytułu** w 1-3 zdaniach, z frazą główną. Żadnego haczyka, kontekstu ani zapowiedzi przed nią. **Cały akapit jest pogrubiony** (`**…**` wokół całości) - to jedyny akapit w tekście pogrubiony w całości.
  2. Zaraz pod nim **lista wypunktowana z najważniejszymi informacjami** (3-6 punktów) - fakty, liczby, wnioski, które czytelnik powinien wynieść, nawet jeśli dalej nie przeczyta. Każdy punkt to jedno zdanie zrozumiałe bez reszty tekstu, zapisane według typografii list (niżej).
  3. Dopiero potem wstęp z kontekstem (dla kogo jest tekst, co dalej) i sekcje H2.

  Ten układ odpowiada temu, jak AI wycina fragmenty do odpowiedzi, i jest pierwszą rzeczą, którą sprawdzi audyt CitationOne (BLUF).
- **Sekcje też od odpowiedzi**: każda sekcja H2 zaczyna się od odpowiedzi na swoje pytanie (zasada BLUF). AI pobiera pojedyncze sekcje, więc sekcja musi być zrozumiała bez reszty artykułu - bez „jak wspomnieliśmy wyżej”, z pełną nazwą tematu zamiast „to” na starcie.
- **Nagłówki H2 krótkie i samodzielne** - z nich szablon bloga buduje spis treści i kotwice, więc nie dopisuj spisu ręcznie.
- **Akapity** po 2-4 zdania, jedna myśl na sekcję. Listy dla 3+ elementów, tabele dla porównań, numerowane kroki dla procesów.
- **Konkret**: co najmniej 5 liczb z jednostką, gdy temat na to pozwala; każda liczba i mocne twierdzenie ze źródłem (nazwa + link + data). Czego nie da się potwierdzić, oznacz `[potrzebne źródło]` - nigdy nie wymyślaj danych, badań, dat ani cytatów.
- **Praktyczne narzędzie** w tekście: checklista, szablon, tabela decyzyjna albo gotowe prompty do sprawdzenia.
- **Definicje** w 40-60 słowach, odpowiedzi w FAQ też 40-60 słów: najpierw odpowiedź, potem zastrzeżenie.
- **Fraza główna** w title, H1, pierwszych 100 słowach, jednym H2, meta i zakończeniu - naturalnie, bez upychania (najwyżej 1-2 razy na 500 słów).
- **Linki**: 3-5 wewnętrznych (podstrony wymiarów/narzędzi, inne artykuły), 2-3 zewnętrzne do źródeł pierwotnych, każdy przy konkretnym twierdzeniu, z opisowym anchorem.
- **CTA**: jedno główne na końcu i najwyżej 1-2 kontekstowe w treści. Stawiaj je zaraz po dowodzie (liczbie, przykładzie), gdy czytelnik właśnie zobaczył problem - tam CTA wynika z tekstu zamiast przerywać lekturę.
- **Zakończenie**: wniosek wyżej niż streszczenie, jeden następny krok.
- **FAQ na końcu - zawsze (wymóg usera)**: sekcja `## Najczęstsze pytania` z **3-5 pytaniami** w `###` i odpowiedziami po 40-60 słów, po podsumowaniu z CTA, a przed `## Źródła`. Pytania bierz z PAA i wyszukiwań powiązanych, bez powtarzania pytań, na które odpowiadają nagłówki H2.

### 5. Redakcja

Przejdź tekst w tej kolejności, bo każda warstwa zmienia następną:

1. **Powtórzenia** między sekcjami - największa słabość tekstów pisanych z AI. Wytnij albo przeformułuj.
2. **Fakty**: każda liczba, data, nazwa produktu (nazwy funkcji ChatGPT/Google często się zmieniają), atrybucja.
3. **Logika**: czy każda sekcja wynika z poprzedniej.
4. **Styl** według zasad niżej.
5. **SEO**: fraza, linki, meta, długość title.

### 6. Autokontrola i wynik

Oceń tekst listą z [references/zasady-jakosci.md](references/zasady-jakosci.md) (spełnione / częściowo / nie). Drobiazgi popraw sam i wypisz w tabeli „Poprawki”. Zmianę H1, tonu, długości o więcej niż ~20% albo usunięcie mocnego twierdzenia - zaproponuj userowi.

### 7. Zapis w sekcji bloga

Blog LP ma dwa miejsca - przed zapisem przeczytaj komentarze w `src/data/blog.ts` i `src/lib/blog.ts`, bo to one są źródłem prawdy o formacie:

1. **Treść**: `content/blog/pl/<slug>.md` - sam Markdown (GFM), **bez frontmattera i bez H1**. Plik zaczyna się od wstępu. H1 robi szablon z rejestru, a każdy nagłówek `#` w treści i tak schodzi do H2, więc sekcje pisz jako `##`, podsekcje `###`. Tabele, listy, linki i obrazki działają; linki zewnętrzne same dostają `target="_blank"`. Źródła na końcu jako sekcja `## Źródła` (nazwa, link, data dostępu). FAQ jako `## Najczęstsze pytania` z pytaniami w `###`.
2. **Rejestr**: obiekt w `BLOG_POSTS` w `src/data/blog.ts`:

```ts
{
  id: '<krotki-id-pary>',
  date: 'RRRR-MM-DD',
  pl: { slug: '<slug>', title: '<tytuł = H1 i title>', description: '<140-160 znaków>' },
}
```

Byline autora, daty, JSON-LD (`BlogPosting`, breadcrumbs), spis treści, czas czytania, hreflangi i wpis w sitemapie generują się same z rejestru - nie dopisuj ich do treści. Wpis tylko w jednym języku jest w porządku (bez hreflanga). Em dash w treści albo metadanych **przerywa build**.

Wersja EN to osobne zadanie: po akceptacji PL napisz ją pod angielski SERP z angielskimi frazami (nie tłumacz zdanie w zdanie), zapisz w `content/blog/en/<slug>.md` i dodaj `en: {...}` do tego samego obiektu w rejestrze - wtedy para dostaje hreflangi i przełącznik języka.

Na koniec uruchom `npm run build`, jeśli user się zgodzi - to jedyna weryfikacja w tym repo (brak testów i lintu). Builda nie odpalaj sam przy braku sieci: pobiera changelog z aplikacji (szczegóły w `CLAUDE.md`).

W czacie oddaj krótko: ścieżki plików, tytuł, liczbę słów, tabelę autokontroli, listę `[potrzebne źródło]` i decyzje do podjęcia.

## Poprawki po audycie CitationOne

Gotowe artykuły przechodzą audyt w CitationOne. Gdy user wklei wyniki (raport, zrzut, listę rekomendacji):

1. Przypisz każdą rekomendację do konkretnej sekcji artykułu i wymiaru (BLUF, Gęstość informacji, Pokrycie Fan-Out itd. - opisy w `citationone.md`).
2. Uszereguj: najpierw braki w odpowiedzi na intencję i pytania poboczne, potem struktura sekcji, na końcu terminologia i drobiazgi.
3. Wprowadź poprawki w pliku `.md`, trzymając zasady stylu - rekomendacja audytu nie uchyla dywizu, zdań twierdzących ani zakazu wymyślania danych. Brakujący fakt oznacz `[potrzebne źródło]` zamiast go zgadywać.
4. Pokaż tabelę: rekomendacja → sekcja → co zmieniono (albo dlaczego pominięto). Rekomendację sprzeczną z intencją tekstu albo z faktami zgłoś userowi zamiast wdrażać.
5. Jeśli wpis był już opublikowany, ustaw `updated` w rejestrze według zasad z sekcji o odświeżaniu.

Audyt uruchamiaj tylko na prośbę usera. Jeśli wpis nie jest jeszcze opublikowany, użyj API v1 w wariancie z treścią (`POST https://app.citationone.com/api/v1/audits` z `content`, `title`, `keyword`, `language: "pl"`, `project: "Blog LP"`, potem polling `GET /api/v1/audits/{id}`). Klucz `co_live_…` daje user. Nie szukaj go w plikach innych projektów. Konto ma domyślnie limit 3 audytów naraz, więc kolejne zlecenia ponawiaj po zwolnieniu miejsca. Wynik zawiera `scores.cqs`, `summary.top10AvgCqs`, `dimensions[].problems` i `recommendations[]` (z `before`/`after`).

**Rekomendacje, które pomijamy świadomie** (powtarzają się w każdym audycie, a łamią zasady stylu albo wynikają z trybu `content`):
- usunięcie „Moim zdaniem” i zarzutu czytelnika w cudzysłowie - to elementy głosu, jeden akapit opinii zostaje,
- dopisanie n-gramów z TF-IDF, które nie brzmią po polsku („optimization geo”, „overviews google”) - wplataj tylko frazy naturalne („wynikach wyszukiwania”, „klasyczne SEO”),
- placeholdery typu „[X] słów”, „[wstaw liczbę]” i liczby bez źródła (długość chunków, czynniki rankingowe OpenAI) - Google wprost odradza dzielenie treści na kawałki,
- obrazki, wideo, brak meta description, daty i schematu - w trybie `content` audyt nie widzi layoutu, a byline, daty i JSON-LD dokłada szablon bloga,
- mediana długości TOP 10 - nie dopychaj słów pod liczbę.

**Najpierw sprawdź `csiAlignment` i encję SERP-u.** Gdy audyt mówi, że SERP dotyczy innej encji (np. „jak odświeżyć stary artykuł” dało wyniki o renowacji obrazów i antyków, bo „artykuł” znaczy też „przedmiot”), problemem jest fraza, a nie tekst. Zmień frazę główną, tytuł i slug na wariant, którego TOP 10 ma właściwą intencję, i powtórz audyt. Reszty rekomendacji z takiego audytu nie wdrażaj. Przy wyborze frazy w kroku researchu sprawdzaj więc zawsze, czy TOP 10 dla dokładnej frazy z tytułu dotyczy tego samego tematu.

**Rekomendacje, które zwykle warto wdrożyć:**
- zdanie-zapowiedź pod H2 („Kroki ułożyłem…”) zamień na BLUF streszczający całą sekcję,
- brakująca definicja głównego pojęcia w intro,
- anafory w krótkich sekcjach („To dwie pozostałe zmiany…”) zastąp nazwą i liczbą,
- tabela zamiast opisu porównania kilku bytów (np. robotów),
- brakujący podtemat z konsensusu SERP, jeśli da się go opisać faktami ze źródeł.

## Styl

Zasady wynikają z wcześniejszych poprawek usera do copy LP - łamanie ich oznacza ręczne poprawki, więc pilnuj ich od pierwszego zdania.

- **Dywiz „-”** wszędzie, gdzie mógłby stać myślnik. Żadnego „—” ani „–”: w tekście, tytułach, meta i alt.
- **Twierdząco.** Bez definiowania przez zaprzeczenie („to nie X, tylko Y”, „nie chodzi o X - chodzi o Y”). Zdanie od razu mówi, co jest. Krótkie uściślenie po pełnym twierdzeniu („…porównujemy znaczenie, a nie zbieżność słów”) jest w porządku.
- **Nagłówki rzeczownikowe lub pytania wyszukiwane przez ludzi.** „Zastosowanie”, „Zasada działania”, „Dlaczego warto…?” zamiast „Po co to?”, „Jak to działa?” w rejestrze mówionym. H2 w formie pytania są dobre, gdy to realne zapytanie z SERP lub PAA.
- **GEO = sposób optymalizacji, „odpowiedzi AI” = miejsce.** „Audyt GEO”, „w GEO liczy się…”, ale „ruch z odpowiedzi AI”, „cytowanie w odpowiedziach AI”. „Ruch z GEO” to błąd. Nie używaj „AI Search” jako nazwy kategorii.
- **Bez informacji z zaplecza produktu**: liczby wywołań AI, nazw dostawców modeli, kosztów, architektury. Nazywaj korzyść dla czytelnika („wynik powtarzalny przy kolejnym przebiegu”), mechanizm zostaw w spokoju.
- **Bez otwarć z szablonu**: przysłowia, „w dzisiejszych czasach”, „w erze AI”, „każdy marketer wie”, pytanie do czytelnika na start, cytat sławnej osoby. Zacznij od konkretu: liczby, sytuacji, wyniku.
- **Bez wypełniaczy**: „kluczowy”, „kompleksowy”, „warto zauważyć”, „nie da się ukryć”, „rewolucja”, „przełomowy”, „holistyczny”, „innowacyjny”, „podsumowując”, „w tym artykule dowiesz się”. Jeśli zdanie po skreśleniu takiego słowa nic nie traci - skreśl.
- **Oszczędnie z wzorem „Pogrubienie: opis”** w listach - w nadmiarze wygląda maszynowo. Mieszaj z prozą i zwykłymi punktami.
- **Strona czynna, różna długość zdań, jeden czytelnik** (pisz do „Ciebie”, nie do „wszystkich firm”).
- **Uczciwie o produkcie.** CitationOne pokazuj tam, gdzie realnie robi opisany krok. Ograniczenia i ręczne alternatywy opisz rzetelnie - to buduje zaufanie i E-E-A-T.

### Zasady pisania Wojciecha

Przeniesione ze skilla `linkedin-post` - to te same reguły, którymi Wojciech poprawia własne teksty, więc tekst ma je spełniać od pierwszej wersji. Elementy typowe dla LinkedIna (hook-pytanie, #SEOProTips, emoji, formuła CTA) tu nie obowiązują.

**Typografia**
- listy wypunktowane zaczynaj małą literą, każdy punkt kończ przecinkiem, a ostatni kropką (nazwy własne i skróty zostają wielką literą),
- w punkcie listy jedno zdanie - jeśli potrzebujesz dwóch, rozbij punkt albo przenieś treść do akapitu,
- **dwukropek tylko na końcu zdania, które bezpośrednio wprowadza listę**; w pozostałym tekście, w punktach list i w komórkach tabel zakończ zdanie kropką albo użyj dywizu,
- po dwukropku i w nawiasach mała litera, chyba że to nazwa własna,
- listy numerowane z krokami mogą mieć pełne zdania od wielkiej litery,
- **pogrubiaj** najważniejsze liczby i wnioski, kilka razy na sekcję, bez pogrubiania całych akapitów (wyjątek to pogrubiony w całości akapit otwierający z odpowiedzią),
- przeplataj krótkie, mocne zdania z dłuższymi, żeby tekst miał rytm.

**Słowa i konstrukcje zakazane**
- schemat „To nie X, to Y” w każdej postaci (precyzujące „…, a nie Y” w środku zdania jest w porządku),
- wystrzelić w górę, zmieniający zasady gry, kamień węgielny, wypełniony wartością, skarbnica wiedzy, rewolucjonizować, zagłębiać się, za kulisami, przystępny (jako ozdobnik), podnosić poziom,
- puste hasła bez uzasadnienia („GEO to przyszłość”), technobełkot, ton mentorski, akademicki albo korporacyjny, clickbait, wykrzykniki.

**Terminologia bez kalek**
- termin angielski zostaw, jeśli tak mówi polska branża (fan-out, grounding, crawler, retrieval, chunking),
- w innym przypadku oddaj sens po polsku tak, jak praktyk powiedziałby to na konferencji („treść o małej wartości”, a nie „cienka treść”),
- przy pierwszym użyciu podaj termin z wyjaśnieniem w nawiasie („query fan-out (rozbicie pytania na podtematy)”), dalej używaj skrótu lub krótszej formy,
- test - czy polski specjalista SEO powiedziałby tak na głos.

**Głos**
- ekspert-praktyk, który myśli na głos i prowadzi czytelnika przez rozumowanie,
- uczciwie wobec niepewności - odróżniaj badanie od potwierdzonego działania, stanowisko Google od hipotezy, korelację od przyczyny,
- doprecyzuj, co dokładnie mierzą liczby (jaki wskaźnik, jaka próba, typowo czy średnio), a hedging („typowo”, „~”, „bywa”, „potrafi”) stosuj tam, gdzie zjawisko jest zmienne,
- opinie oznaczaj („Moim zdaniem…”, „Z mojego doświadczenia…”) i nie przypisuj autorowi doświadczeń, których nie podał,
- jeden akapit własnej opinii w tekście, najlepiej przy najważniejszym wniosku,
- krótkie zdania-zawiasy między blokami, żeby tekst czytał się jak rozmowa („Mało tego, …”, „Tyle że ciekawsze są skrajne przypadki.”, „Warto też dodać, że…”),
- potencjalny zarzut czytelnika w cudzysłowie i krótka odpowiedź („Skoro Google mówi, że to nadal SEO, po co osobna nazwa?” → odpowiedź w 2-3 zdaniach),
- do czytelnika na „Ty”, do grupy na „Wy”.

**Co wycinać przy redakcji**
- niszowe przypadki brzegowe, które wymagają dodatkowego tłumaczenia,
- zdania powtarzające fakt, który już padł, i „autorytetowe” wstawki typu „eksperci są zgodni”,
- osobne akapity z zastrzeżeniami, które da się wpleść w istniejący punkt,
- nadmiar przykładów - zostaw jeden, najlepszy,
- luźne akapity na końcu sekcji - połącz je z akapitem opinii.

## Odświeżanie istniejącego artykułu

Gdy user prosi o aktualizację: najpierw sprawdź, co dziś pokazuje SERP i odpowiedzi AI dla frazy, potem zaktualizuj liczby, nazwy funkcji i źródła, dopisz brakujące podtematy i pytania, przebuduj sekcje, które nie zaczynają się od odpowiedzi. Daty w rejestrze `src/data/blog.ts`: przy ponad 50% nowej treści zmień `date`, przy 20-50% ustaw `updated`, poniżej 20% (poprawki drobne) dat nie ruszaj. Same zmiany daty bez treści nic nie dają - nie rób ich. Jeśli założenie tekstu się zdezaktualizowało albo intencja SERP się zmieniła, zaproponuj nowy tekst zamiast łatania.

---

Źródła metody: `seo-content-writer` v9.9.12 autorstwa aaron-he-zhu (Apache-2.0, szczegóły w [NOTICE.md](NOTICE.md)), przetłumaczone i dostosowane do CitationOne.
