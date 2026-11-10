# Zasady jakości i autokontrola

## 16 zasad jakości tekstu

Lista pochodzi z metody CORE-EEAT (seo-content-writer v9.9.12) i jest dostosowana do artykułów CitationOne. Oceniaj każdą: spełniona / częściowo / nie.

| # | Zasada | Jak sprawdzić |
|---|---|---|
| 1 | Zgodność z intencją | Tytuł obiecuje dokładnie to, co dostarcza tekst |
| 2 | Odpowiedź na początku | Pierwszy akapit pliku to bezpośrednia odpowiedź na pytanie z tytułu (1-3 zdania), bez wstępu przed nią, pogrubiona w całości - wymóg bezwzględny |
| 3 | Pokrycie pytań | Co najmniej 3 warianty zapytania lub pytania poboczne mają własną odpowiedź |
| 4 | Wskazany czytelnik | Wstęp mówi, dla kogo jest tekst i w jakiej sytuacji pomaga |
| 5 | Domknięcie | Zakończenie odpowiada na pytanie z początku i daje jeden następny krok |
| 6 | Hierarchia nagłówków | Czysty układ H1 → H2 → H3, bez H4; nagłówki czytane osobno tworzą sensowny konspekt |
| 7 | Najważniejsze informacje w punktach | Zaraz pod odpowiedzią lista 3-6 punktów z kluczowymi faktami i wnioskami - wymóg bezwzględny |
| 8 | Krótkie sekcje | Akapity po 2-4 zdania, jedna myśl na sekcję, każda H2 zaczyna się od odpowiedzi |
| 9 | Nagłówki do spisu treści | Szablon buduje spis z H2, więc H2 są krótkie, opisowe i zrozumiałe bez kontekstu |
| 10 | Gęstość informacji | Brak wypełniaczy i powtórzeń między sekcjami |
| 11 | Konkretne liczby | Co najmniej 5 liczb z jednostką, gdy temat na to pozwala |
| 12 | Źródła | Co najmniej 1 źródło zewnętrzne na 500 słów, pierwotne, z datą |
| 13 | Dowód przy twierdzeniu | Każde mocne twierdzenie ma liczbę, przykład albo źródło - albo `[potrzebne źródło]` |
| 14 | Pełne nazwy | Pełne nazwy firm, produktów i osób przy pierwszym użyciu |
| 15 | Materiały z opisem | Grafiki, tabele i zrzuty mają podpis i alt opisujący treść |
| 16 | Praktyczne narzędzie | Checklista, szablon, tabela decyzyjna albo gotowe prompty |

## Dodatkowo dla CitationOne

| Zasada | Jak sprawdzić |
|---|---|
| Wartość dodana | Tekst zawiera co najmniej jedną rzecz, której nie ma w TOP 10: dane własne, przykład „przed i po”, wniosek z audytów |
| Samodzielne sekcje | Każda sekcja H2 jest zrozumiała po wycięciu z artykułu (bez „jak wspomnieliśmy”, temat nazwany wprost) |
| Uczciwe CTA | CTA stoi po dowodzie, produkt opisany zgodnie z `src/data/*` i `spec/` |
| Styl | Dywiz zamiast myślnika, zero definicji przez zaprzeczenie, rzeczownikowe etykiety, GEO vs odpowiedzi AI, bez informacji z zaplecza |
| Zasady pisania Wojciecha | Listy małą literą z przecinkami i kropką na końcu, dwukropek tylko przed listą, pogrubione kluczowe liczby, zero słów zakazanych i kalek, jeden akapit opinii, zarzut czytelnika z odpowiedzią |

## Kontrola SEO

| Element | Wymaganie |
|---|---|
| Tytuł (H1 i title naraz) | ~45-50 znaków, bo layout dokleja „ \| CitationOne”; fraza główna blisko początku |
| Meta description | 140-160 znaków, fraza, konkretna korzyść, zachęta do działania; to też lead na liście wpisów |
| Fraza w treści | Pierwsze 100 słów, jedno H2, zakończenie; najwyżej 1-2 razy na 500 słów |
| Frazy poboczne | W H2/H3 i treści tam, gdzie brzmią naturalnie |
| Linki wewnętrzne | 3-5, opisowe anchory, do wymiarów/narzędzi/innych artykułów |
| Linki zewnętrzne | 2-3 do źródeł pierwotnych, przy konkretnym twierdzeniu |
| FAQ (obowiązkowe) | `## Najczęstsze pytania` na końcu, po podsumowaniu, przed `## Źródła`; 3-5 pytań w `###` z PAA lub wariantów frazy, odpowiedzi 40-60 słów |
| Slug | Krótki, `a-z0-9` z dywizami, w języku wpisu - PL po polsku z frazą główną bez polskich znaków, EN po angielsku |
| Długość | Zgodna z wynikami SERP dla frazy |

## Wzorce pod fragmenty wyróżnione i cytowania AI

| Typ | Wzorzec |
|---|---|
| Definicja | „[Pojęcie] to [jasna definicja]. Ma znaczenie, bo [skutek].” 40-60 słów |
| Lista | Wprowadzenie pod H2, potem punkty o równoległej budowie |
| Tabela | Proste nagłówki, jedna informacja na komórkę, wąska na telefonie |
| Kroki | „Krok 1”, „Krok 2”…, wymagania przed krokami |
| FAQ | Najpierw odpowiedź, w następnym zdaniu zastrzeżenie |

## Kiedy poprawiać samemu, a kiedy pytać

**Popraw sam i wypisz w tabeli „Poprawki”** (Element / Było / Jest): za długi title lub meta, brak alt, powtórzone H2, za częsta fraza, za długie akapity, myślnik zamiast dywizu, wypełniacze, zdanie z definicją przez zaprzeczenie.

**Zapytaj usera**: zmiana H1, zmiana tonu, zmiana długości o ponad ~20%, złagodzenie lub usunięcie mocnego twierdzenia, liczby i linki, których nie udało się potwierdzić, użycie danych własnych CitationOne.
