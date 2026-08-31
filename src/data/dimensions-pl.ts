/**
 * Tresc podstron wymiarow (PL).
 *
 * Zrodlo faktow: ../ai-auditor/spec/dimensions.md (kryteria, progi, wzory) + `lib/glossary.ts`
 * i `lib/i18n/translations.ts` w aplikacji (nazwy wymiarow — MUSZA sie zgadzac z tym, co user
 * widzi w raporcie po zakupie). Wag CQS swiadomie NIE publikujemy: profil typu tresci je
 * nadpisuje, wiec kazda liczba tutaj bylaby nieprawdziwa dla czesci audytow.
 *
 * Slugi PL sa POLSKIE (bez znakow diakrytycznych) — wersja EN dostanie wlasne, angielskie
 * w dimensions-en.ts (do dodania). Slug jest tez kluczem rekordu; `related[].slug` musi
 * wskazywac slug z TEJ mapy, inaczej link krzyzowy nie zapali sie po dodaniu strony.
 */

import type { DimensionData } from './dimension-types';

export type { DimensionData, DimTable, DimFaq, DimRecommendation } from './dimension-types';

export const DIMENSIONS_PL: Record<string, DimensionData> = {
  'zgodnosc-z-csi': {
    slug: 'zgodnosc-z-csi',
    faq: [
      {
        q: 'Czym różni się CSI od słowa kluczowego?',
        a: 'Słowo kluczowe to fraza, CSI to rozłożone zapytanie. Poza samą frazą zawiera główną encję, kontekst, konkretną potrzebę użytkownika i predykat, czyli typ działania: informacyjny, komercyjny, transakcyjny, operacyjny, nawigacyjny albo lokalny. Dwie strony na to samo słowo kluczowe mogą realizować zupełnie różne intencje.',
      },
      {
        q: 'Skąd wiadomo, jaka jest intencja mojej frazy?',
        a: 'Z konsensusu wyników wyszukiwania. Analizujemy Top 10 dla Twojej frazy razem z elementami SERP - między innymi obecnością pakietu lokalnego - i na tej podstawie proponujemy intencję. Możesz ją poprawić przed uruchomieniem audytu, bo od niej zależy ocena wszystkich pozostałych wymiarów.',
      },
      {
        q: 'Czy jedna strona może odpowiadać na kilka intencji?',
        a: 'Może, ale ocena liczona jest wobec jednej głównej. Jeśli treść rozkłada się na dwie intencje naraz, zwykle żadnej nie realizuje w pełni - i to widać w wyniku. Skuteczniej jest rozdzielić ją na dwie strony niż domykać obie w jednym tekście.',
      },
    ],
    name: 'Zgodność z CSI',
    heading: 'Czym jest Central Search Intent (CSI)?',
    title: 'Czym jest Central Search Intent (CSI)?',
    description:
      'Czym jest Central Search Intent i jak CitationOne mierzy zgodność treści z intencją: predykat, poziom wiedzy odbiorcy, pokrycie atrybutów i luki względem Top 10 SERP.',
    lead:
      'Czy treść odpowiada na to, czego naprawdę szuka użytkownik? AI nie cytuje stron, które mijają się z intencją zapytania - nawet jeśli zawierają słowo kluczowe. Zgodność z Central Search Intent (CSI) mierzy, jak dokładnie Twój artykuł dopasowuje się do oczekiwanego typu odpowiedzi: definicji, porównania, instrukcji lub rekomendacji.',
    chips: ['Skala 0–10', 'Ocena modelem językowym', 'Wejście: treść + CSI + benchmark Top 10 SERP'],
    whyHeading: 'Dlaczego zgodność z CSI jest ważna dla modeli AI?',
    howHeading: 'Jak liczymy zgodność z CSI?',
    why: [
      'Central Search Intent to rozłożone na części zapytanie: główna encja (o czym jest zapytanie), jej kontekst, konkretna rzecz, której użytkownik chce się dowiedzieć, oraz predykat - typ działania, jaki za tym stoi: informacyjny, komercyjny, transakcyjny, operacyjny, nawigacyjny lub lokalny.',
      'Modele AI nie cytują stron, które mijają się z intencją, nawet jeśli zawierają słowo kluczowe i są napisane bez zarzutu. Klasyczna rozbieżność: zapytanie jest komercyjne („X czy Y - co wybrać”), a strona to recenzja samego X. Drugi typowy błąd to rozbieżność poziomu: intencja należy do kogoś, kto dopiero zaczyna, a tekst od pierwszego akapitu zakłada wiedzę eksperta.',
      'Ten wymiar jest fundamentem audytu również technicznie - CSI trafia do wszystkich pozostałych wymiarów jako punkt odniesienia. Źle rozpoznana intencja przesuwa cały wynik.',
    ],
    how: {
      intro: [
        'Model dostaje treść, wyznaczone CSI oraz - w trybie z benchmarkiem - dane o konkurencji z Top 10 SERP. Sprawdza cztery obszary:',
      ],
      tables: [
        {
          head: ['Obszar', 'Co jest sprawdzane'],
          rows: [
            ['Realizacja predykatu', 'Czy treść robi to, czego oczekuje intencja: porównuje, instruuje, sprzedaje, definiuje. Wykrywa rozbieżność typu „CSI komercyjne, treść informacyjna”.'],
            ['Założenie wiedzy', 'Czy poziom merytoryczny tekstu odpowiada odbiorcy intencji - tekst ekspercki pod zapytanie początkującego to realna strata.'],
            ['Pokrycie atrybutów', 'Ile cech tematu, których oczekuje intencja i pokazuje konkurencja, faktycznie omawiasz.'],
            ['Umiejscowienie atrybutów', 'Wyróżnik ma być w H1 lub leadzie, atrybut podstawowy w osobnej sekcji H2, atrybut niszowy w H3 lub FAQ.'],
          ],
        },
        {
          caption: 'W trybie z benchmarkiem każdy brakujący atrybut dostaje priorytet według tego, jak powszechny jest u konkurencji',
          head: ['Status', 'Co oznacza'],
          rows: [
            ['Pokryte', 'Atrybut jest u Ciebie i u konkurencji'],
            ['Luka krytyczna', 'Atrybut podstawowy u 7 z 10 stron konkurencji, u Ciebie go nie ma'],
            ['Luka wysoka', 'Atrybut podstawowy u 5–6 stron konkurencji, dodatkowo potwierdzony przez pytania z SERP'],
            ['Luka średnia i niska', 'Atrybut rzadki - obecny w pytaniach z SERP albo u pojedynczych stron konkurencji'],
            ['Tylko u Ciebie', 'Masz coś, czego nie ma nikt inny - kandydat na Twój wyróżnik'],
          ],
        },
      ],
    },
    raises: [
      'Treść realizuje predykat intencji, a nie sąsiedni („porównanie” to zestawienie, nie recenzja jednej opcji)',
      'Poziom merytoryczny dopasowany do odbiorcy zapytania',
      'Atrybuty podstawowe kategorii mają własne sekcje H2',
      'Twój wyróżnik widoczny w H1 lub leadzie, nie w ostatnim akapicie',
      'Pokryte atrybuty, które konkurencja z Top 10 uznaje za obowiązkowe',
    ],
    lowers: [
      'Rozbieżność predykatu - intencja komercyjna, treść czysto informacyjna',
      'Zakładanie wiedzy eksperckiej przy zapytaniu dla początkujących',
      'Brak atrybutu, który ma 7 z 10 konkurentów',
      'Wyróżnik schowany na końcu strony',
      'Odpowiedź na pytanie sąsiednie zamiast na zadane',
    ],
    report: [
      'Dostajesz werdykt zgodności wraz z uzasadnieniem: który predykat wykryliśmy, czy treść go realizuje i gdzie rozmija się poziom wiedzy.',
      'Do tego dostajesz pełną mapę atrybutów w trzech grupach: pokryte, brakujące oraz nadmiarowe, czyli obecne tylko u Ciebie. Brakujące atrybuty są uszeregowane według tego, ilu konkurentów je opisuje, więc lista zaczyna się od tych, których brak kosztuje najwięcej.',
      'Osobno pokazujemy luki formatowe: jeśli 8 konkurentów tłumaczy temat tabelą lub FAQ, a Ty jednolitym tekstem, zobaczysz to jako konkretną rekomendację.',
    ],
    recommendations: [
      {
        problem: 'Atrybut „częstotliwość odświeżania (polling rate)” ma 4 z 10 konkurentów, a przy intencji transakcyjnej to parametr rozstrzygający o wyborze modelu.',
        before: 'Najważniejsze parametry techniczne: rozdzielczość od 800 do 26 000 DPI, akceleracja do 50G, czas reakcji 1 ms.',
        after: 'Dopisz częstotliwość odświeżania (1000 Hz lub 8000 Hz) jako parametr wpływający na płynność ruchu kursora.',
      },
      {
        problem: 'Warunki zakupu (raty 0%, wysyłka w 24 h, odbiór w sklepie) są opisane dopiero na kartach produktów, a intencja transakcyjna oczekuje ich już w leadzie.',
        before: 'Myszki gamingowe to precyzyjne urządzenia wskazujące, zaprojektowane z myślą o dynamicznej obsłudze gier komputerowych.',
        after: 'Uzupełnij lead o warunki zakupu: „211 modeli w cenach od 89,99 zł, raty 0%, wysyłka w 24 h lub odbiór w sklepie”.',
      },
    ],
    related: [
      { slug: 'graf-wiedzy', name: 'Graf wiedzy', desc: 'Z czego zbudowane są atrybuty, których pokrycie tu mierzymy.' },
      { slug: 'pokrycie-fan-out', name: 'Pokrycie Fan-Out i AIO', desc: 'Na ile pytań pobocznych wokół intencji odpowiada strona.' },
      { slug: 'bluf', name: 'BLUF', desc: 'Czy odpowiedź na intencję pada od razu, czy po rozgrzewce.' },
    ],
  },

  'graf-wiedzy': {
    slug: 'graf-wiedzy',
    faq: [
      {
        q: 'Czy muszę mieć dane strukturalne, żeby graf był gęsty?',
        a: 'Nie. Graf budujemy z samej treści, nie ze znaczników schema. Dane strukturalne są przydatne z innych powodów i sprawdza je osobne narzędzie, ale na ten wymiar nie wpływają.',
      },
      {
        q: 'Co zrobić z atrybutem, którego moja oferta nie ma?',
        a: 'Napisz o tym wprost, zamiast pomijać. Brak funkcji opisany jednym zdaniem to nadal fakt, który da się zacytować, a milczenie zostawia lukę względem konkurencji. Jeśli atrybut w ogóle nie dotyczy Twojego produktu, jego brak nie kosztuje tyle, co pominięcie atrybutu standardowego dla kategorii.',
      },
      {
        q: 'Czy sprzeczne dane obniżają ocenę?',
        a: 'Nie, pokazujemy je jako ostrzeżenie bez wpływu na wynik. Warto je jednak naprawić: systemy generatywne liczą dla dokumentu ryzyko sprzeczności i przy jego przekroczeniu pomijają stronę jako źródło.',
      },
    ],
    name: 'Graf wiedzy',
    heading: 'Czym jest graf wiedzy (EAV) w treści?',
    title: 'Czym jest graf wiedzy (EAV) w treści?',
    description:
      'Trójki Encja-Atrybut-Wartość, czyli jak modele AI czytają fakty ze strony. Jak CitationOne buduje graf wiedzy, klasyfikuje atrybuty i porównuje pokrycie z Top 10 SERP.',
    lead:
      'Treść buduje sieć powiązanych pojęć: encji, ich atrybutów i wartości. Im gęstszy i spójniejszy graf, tym łatwiej AI rozpoznaje treść jako wiarygodne źródło w danej dziedzinie. Graf wiedzy sprawdza, czy teksty budują wiedzę, czy tylko wspominają o pojęciach.',
    chips: ['Skala 0–10', 'Model językowy + sygnały algorytmiczne', 'Wejście: treść + benchmark Top 10 SERP'],
    whyHeading: 'Dlaczego graf wiedzy jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy graf wiedzy?',
    why: [
      'Wyszukiwarki od lat operują na encjach i faktach o nich - trójka Encja-Atrybut-Wartość to podstawowa struktura każdego grafu wiedzy. „Kredyt hipoteczny” to encja, „oprocentowanie” to jej atrybut, „7,2%” to wartość. Dopiero komplet stanowi fakt, który da się zapamiętać, zestawić z innym źródłem i zacytować.',
      'W GEO ma to bezpośrednie przełożenie: model buduje odpowiedź z faktów, nie z akapitów. Strona, która wymienia encje, ale nie podaje ich atrybutów i wartości, jest dla niego tekstem bez treści - można ją streścić, ale nie ma z niej czego zacytować. Odwrotnie: gęsty, spójny graf sprawia, że model rozpoznaje stronę jako źródło wiedzy w danej dziedzinie.',
    ],
    how: {
      intro: [
        'Model wyciąga z treści trójki EAV, a przed liczeniem czyścimy je z szumu szablonu - encje typu Menu, Newsletter, Cookies czy stopka nie są wiedzą o temacie i nie mogą podbijać wyniku. Każda encja dostaje też typ (temat, problem, marka, produkt lub usługa, narzędzie, pojęcie, osoba, organizacja, miejsce), dzięki czemu graf pokazuje, o czym strona faktycznie jest.',
      ],
      tables: [
        {
          caption: 'Z czego składa się jeden fakt',
          head: ['Element', 'Pytanie, na które odpowiada'],
          rows: [
            ['Encja', 'O czym mówisz? - „kredyt hipoteczny”, „panel fotowoltaiczny”'],
            ['Atrybut', 'Jaką cechę opisujesz? - „oprocentowanie”, „sprawność”'],
            ['Wartość', 'Co konkretnie o niej mówisz? - „7,2%”, „21,3%”'],
          ],
        },
        {
          caption: 'W trybie z benchmarkiem każdy atrybut jest klasyfikowany według tego, jak często występuje u konkurencji',
          head: ['Klasa atrybutu', 'Co oznacza i gdzie powinien być'],
          rows: [
            ['Podstawa', 'Ma go większość konkurentów - to obowiązkowy element tematu, zasługuje na własną sekcję H2'],
            ['Rzadki', 'Występuje u pojedynczych konkurentów - materiał na H3 albo FAQ'],
            ['Wyróżnik', 'Masz go tylko Ty - powinien być widoczny w H1 lub leadzie, nie na końcu strony'],
          ],
        },
      ],
    },
    raises: [
      'Każdy atrybut ma podaną wartość, nie samą nazwę',
      'Wartości są konkretne: liczba, jednostka, zakres, data',
      'Pokryte atrybuty, które konkurencja z Top 10 traktuje jako obowiązkowe',
      'Wyróżnik - atrybut, którego nie ma nikt inny - wyeksponowany na górze strony',
      'Fakty rozłożone po sekcjach tematycznych, a nie stłoczone w jednej tabeli',
    ],
    lowers: [
      'Encje wymienione bez atrybutów („oferujemy kredyty hipoteczne” i nic więcej)',
      'Atrybuty bez wartości („korzystne oprocentowanie” zamiast „7,2%”)',
      'Brak atrybutu, który u konkurencji jest standardem',
      'Fakty sprzeczne wewnętrznie - dwie różne ceny tej samej rzeczy',
      'Graf zbudowany z elementów szablonu zamiast z treści merytorycznej',
    ],
    report: [
      'Dostajesz matrycę faktów: każdy atrybut z Twoją wartością obok informacji, ilu konkurentów z Top 10 go opisuje. Luki są oznaczone i uszeregowane według tego, jak powszechne są u konkurencji, a Twoje wyróżniki oznaczone osobno.',
      'Do tego dostajesz graf encji z ich typami i relacjami między nimi. Relacje są dodatkowo weryfikowane algorytmicznie - sprawdzamy, czy dwie encje faktycznie występują razem w zdaniach Twojej treści, czy pojawiają się razem w pytaniach z SERP i u ilu konkurentów ta sama para jest połączona. Sam graf relacji nie wpływa na ocenę wymiaru; służy do zobaczenia, gdzie wiedza jest spójna, a gdzie urywa się na pojedynczych wzmiankach.',
      'Osobno, jako ostrzeżenie bez wpływu na wynik, pokazujemy sprzeczności: tę samą encję i atrybut opisane różnymi wartościami. Dla modelu jedna sprzeczna liczba potrafi zdyskwalifikować całą stronę jako źródło.',
    ],
    recommendations: [
      {
        problem: 'Atrybut „waga” zostaje podany bez wartości, a dla graczy e-sportowych to jeden z parametrów rozstrzygających o zakupie.',
        before: 'Niektóre myszki oferują także regulację wagi za pomocą wymiennych ciężarków.',
        after: 'Podaj przedziały: „od 58 g w modelach ultralekkich do 120 g z kompletem ciężarków”.',
      },
      {
        problem: 'Karta produktu opisuje zawartość opakowania zamiast encji - bez pełnej nazwy modelu fakty nie mają punktu odniesienia.',
        before: 'Typ produktu: mysz. Transmisja sygnału: przewodowa. W opakowaniu: mysz, skrócona instrukcja obsługi.',
        after: 'Zacznij kartę od pełnej nazwy handlowej modelu i podpinaj parametry pod nią jako atrybuty z wartościami.',
      },
    ],
    related: [
      { slug: 'zgodnosc-z-csi', name: 'Zgodność z CSI', desc: 'Czy pokryte atrybuty odpowiadają intencji zapytania.' },
      { slug: 'gestosc-informacji', name: 'Gęstość informacji', desc: 'Ile z Twoich zdań w ogóle niesie fakt.' },
      { slug: 'tf-idf', name: 'TF-IDF', desc: 'Której terminologii brakuje względem konkurencji.' },
    ],
  },

  'pokrycie-fan-out': {
    slug: 'pokrycie-fan-out',
    faq: [
      {
        q: 'Czym pytania poboczne różnią się od fraz z długiego ogona?',
        a: 'Długi ogon to warianty tego samego zapytania, a pytania poboczne to osobne wątki, które model musi rozstrzygnąć, żeby zbudować odpowiedź. „Tania pompa ciepła” to długi ogon; „czy pompa ciepła działa przy minus 20 stopniach” to pytanie poboczne.',
      },
      {
        q: 'Czy muszę odpowiedzieć na wszystkie pytania poboczne?',
        a: 'Nie, priorytet mają te potwierdzone przez wyszukiwarkę. Pytanie, które Google sam pokazuje w „Podobnych pytaniach”, jest pewną luką; pytanie przewidziane przez model to hipoteza i waży mniej.',
      },
      {
        q: 'Czy sekcja FAQ wystarczy?',
        a: 'Częściowo. FAQ dobrze domyka pytania krótkie i faktograficzne, ale wątek wymagający rozwinięcia lepiej działa jako pełna sekcja H2 z odpowiedzią, danymi i kontekstem.',
      },
    ],
    name: 'Pokrycie Fan-Out i AIO',
    heading: 'Czym jest Query Fan-Out w AI Search?',
    title: 'Czym jest Query Fan-Out w AI Search?',
    description:
      'Jak silniki AI rozbijają jedno pytanie na kilkanaście podzapytań i jak CitationOne mierzy, ile z nich pokrywa Twoja treść - z danymi z AI Overview i pytań z SERP.',
    lead:
      'Jedno zapytanie użytkownika rozkłada się na kilkanaście pytań pobocznych, które AI rozwiązuje w tle. Pokrycie Fan-Out i AIO analizuje, na ile z tych pytań odpowiada Twoja treść, ponieważ to właśnie na pytaniach pobocznych zdobywa się cytowanie.',
    chips: ['Skala 0–10', 'Dwa przebiegi modelu + dane z SERP', 'Wejście: CSI + pytania z SERP + AI Overview'],
    whyHeading: 'Dlaczego pokrycie Fan-Out jest ważne dla modeli AI?',
    howHeading: 'Jak liczymy pokrycie Fan-Out i AIO?',
    why: [
      'Użytkownik pyta „jak wybrać pompę ciepła”, a model nie szuka tej frazy. Rozkłada ją na pytania składowe: jaka moc do jakiego metrażu, ile kosztuje montaż, jaka jest sprawność przy mrozie, czy potrzebne jest pozwolenie. Każde z nich pobiera osobno i wszystkie te odpowiedzi składa w jedną wypowiedź.',
      'Stąd bierze się różnica między SEO a GEO. W klasycznym wyszukiwaniu wystarczyło wygrać jedno zapytanie, żeby zdobyć kliknięcie. W AI Search wygrywasz tyle razy, na ile pytań pobocznych masz gotową odpowiedź - strona, która wyczerpuje temat tylko w głównym wątku, zostanie zacytowana raz albo wcale, mimo świetnej pozycji w SERP.',
      'To działa też w drugą stronę: pytania poboczne są tańsze do zdobycia niż główna fraza. Konkurencja walczy o nagłówek, a luka najczęściej jest w pytaniu, którego nikt nie opisał.',
    ],
    how: {
      intro: [
        'Na podstawie intencji strony model rozkłada zapytanie na kilkanaście podzapytań. Robi to w dwóch niezależnych przebiegach o różnym stopniu swobody, a wyniki scalamy, ponieważ pojedynczy przebieg jest zbyt wrażliwy na losowość modelu. Do zestawu dokładamy rzeczywiste pytania z SERP: sekcję „Podobne pytania” i powiązane wyszukiwania. Na koniec weryfikujemy, na które z nich Twoja treść faktycznie odpowiada.',
        'Zestaw jest oczyszczany z homonimów. Jeśli fraza ma drugie znaczenie (typowy przypadek: „schody” jako element budynku i jako tytuł serialu), pytania z tej drugiej dziedziny są odrzucane, żeby rekomendacje dotyczyły wyłącznie Twojego tematu.',
        'Ocena idzie w górę za komplet odpowiedzi na pytania weryfikacyjne, a w dół za każde niepokryte pytanie, którego istnienie potwierdza SERP.',
      ],
      tables: [
        {
          caption: 'Trzy typy pytań pobocznych, na które rozkładamy intencję',
          head: ['Typ', 'Czego dotyczy'],
          rows: [
            ['Semantyczne', 'Cechy i powiązania tematu - z czego się składa, czym się różni, do czego się odnosi'],
            ['Intencyjne', 'Realna potrzeba za zapytaniem - co użytkownik chce zrobić, na co się zdecydować'],
            ['Weryfikacyjne', 'Fakty, które model musi potwierdzić, zanim poda je w odpowiedzi'],
          ],
        },
        {
          caption: 'Nie każde pytanie waży tyle samo - liczy się to, czy dane wyszukiwarki potwierdzają jego istnienie',
          head: ['Status pytania', 'Co oznacza'],
          rows: [
            ['Potwierdzone przez SERP', 'Google umieszcza je w sekcji „Podobne pytania”, co potwierdza, że użytkownicy je zadają'],
            ['Obecne w AI Overview', 'Wątek pojawia się w syntezie AI dla tej frazy'],
            ['Przewidziane przez model', 'Wynika z intencji, ale nie ma potwierdzenia w danych SERP'],
            ['Potwierdzona luka', 'Pytanie jest w SERP, a Twoja treść go nie porusza - to obniża ocenę wymiaru'],
          ],
        },
      ],
    },
    raises: [
      'Sekcje H2 odpowiadające na konkretne pytania poboczne, nie na warianty głównej frazy',
      'Odpowiedzi na pytania z sekcji „Podobne pytania” w SERP',
      'Odpowiedzi na pytania weryfikacyjne - liczby, daty, warunki, które model musi potwierdzić',
      'FAQ zbudowane z realnych pytań, a nie z fraz pod wyszukiwarkę',
      'Wyczerpanie wątków pobocznych pominiętych przez konkurencję',
    ],
    lowers: [
      'Cała treść krąży wokół głównego zapytania',
      'Niepokryte pytania, które Google sam pokazuje w SERP',
      'Wątki poruszone jednym zdaniem, bez odpowiedzi nadającej się do zacytowania',
      'Rozbudowany wstęp i podsumowanie zamiast sekcji odpowiadających na osobne pytania',
    ],
    report: [
      'Dostajesz listę pytań pobocznych z oznaczeniem, które z nich Twoja treść pokrywa, a które nie - wraz z informacją, skąd pytanie pochodzi: czy jest potwierdzone przez SERP, czy przewidziane przez model.',
      'Niepokryte pytania potwierdzone przez wyszukiwarkę trafiają na górę listy rekomendacji, ponieważ zamknięcie takiej luki kosztuje najmniej: jej istnienie potwierdzają dane SERP, a brak odpowiedzi w treści jest jednoznaczny.',
    ],
    recommendations: [
      {
        problem: 'Google pokazuje pytanie „Jakie są najlepsze myszki gamingowe?” w sekcji Podobne pytania, a żadna sekcja treści na nie nie odpowiada.',
        before: 'Brak zestawienia albo rankingu polecanych modeli w całej treści.',
        after: 'Dodaj sekcję H2 „Ranking myszek gamingowych - polecane modele” z pięcioma pozycjami i uzasadnieniem wyboru.',
      },
      {
        problem: 'Wątek doboru sprzętu do budżetu jest potwierdzony w SERP, a strona go nie porusza.',
        before: 'Brak sekcji o segmentacji cenowej: modele budżetowe kontra turniejowe.',
        after: 'Opisz, na jakie parametry zwracać uwagę w przedziałach do 150 zł, 150–350 zł i powyżej 350 zł.',
      },
    ],
    related: [
      { slug: 'zgodnosc-z-csi', name: 'Zgodność z CSI', desc: 'Intencja, z której rozkładane są pytania poboczne.' },
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcja z odpowiedzią pozostaje zrozumiała w oderwaniu od reszty.' },
      { slug: 'bluf', name: 'BLUF', desc: 'Czy odpowiedź na pytanie poboczne pada od razu.' },
    ],
  },

  'gestosc-informacji': {
    slug: 'gestosc-informacji',
    faq: [
      {
        q: 'Czy krótszy tekst zawsze wypada lepiej?',
        a: 'Nie, liczy się proporcja, a nie długość. Długi tekst z wysokim udziałem faktów wypada lepiej niż krótki zbudowany z ogólników. Skracanie pomaga tylko wtedy, gdy usuwasz zdania bez treści, a nie same fakty.',
      },
      {
        q: 'Co zrobić, jeśli nie mam twardych danych?',
        a: 'Użyj zakresów, proporcji i porównań. „3–5 dni roboczych”, „1 na 4 zgłoszenia”, „dwa razy więcej niż średnia” liczą się jako konkret, bo są sprawdzalne. Bezwartościowe są dopiero określenia, których nie da się zweryfikować.',
      },
      {
        q: 'Czy wynik zależy od tego, co uzna model?',
        a: 'Nie. Udział zdań z faktem liczy algorytm na wzorcach - liczba, data, jednostka, kwota, nazwa własna. Model językowy dokłada tylko przykłady zdań z Twojego tekstu po obu stronach, żeby było widać, o które akapity chodzi.',
      },
    ],
    name: 'Gęstość informacji',
    heading: 'Czym jest gęstość informacji w treści?',
    title: 'Czym jest gęstość informacji w treści?',
    description:
      'Stosunek zdań z faktem do zdań wypełniających. Jak CitationOne liczy gęstość informacji, jakie sygnały ją podnoszą i obniżają oraz jak zamienić ogólniki na konkrety.',
    lead:
      'Gęstość informacji mówi, ile faktów, danych i konkretnych stwierdzeń zawiera jeden akapit. Treść o niskiej gęstości jest wypełniaczem - AI ją pomija. Wymiar nagradza każde zdanie, które wnosi coś nowego, i obniża ocenę tekstu, który powtarza to samo innymi słowami.',
    chips: ['Skala 0–10', 'Wyliczenie algorytmiczne + przykłady od modelu', 'Wejście: treść'],
    whyHeading: 'Dlaczego gęstość informacji jest ważna dla modeli AI?',
    howHeading: 'Jak liczymy gęstość informacji?',
    why: [
      'Model odpowiadający użytkownikowi ma ograniczone miejsce na cytat. Wybierze fragment, w którym na jedno zdanie przypada najwięcej sprawdzalnej treści - liczba, data, jednostka, nazwa własna. Akapit zbudowany z „wielu firm”, „nowoczesnych rozwiązań” i „szerokiego doświadczenia” nie daje się zacytować, bo nie ma w nim twierdzenia, które można potwierdzić lub obalić.',
      'To odwrócenie starego odruchu SEO. Kiedyś objętość pomagała - dłuższy tekst rankował lepiej, więc opłacało się rozciągać akapity. W GEO liczy się odwrotna proporcja: rozwodnienie faktów obniża szansę na cytowanie, nawet jeśli fakty w tekście są. Ten sam materiał zapisany o połowę krócej wypada lepiej.',
    ],
    how: {
      intro: [
        'Podstawa jest algorytmiczna: dzielimy tekst na zdania i sprawdzamy wzorcami, które z nich zawierają fakt - liczbę, datę, jednostkę, kwotę, nazwę własną lub konkretne twierdzenie. Wynik to udział takich zdań w całości, przeskalowany do dziesięciostopniowej oceny.',
      ],
      tables: [
        {
          caption: 'Sygnały korygujące wynik',
          head: ['Sygnał w zdaniu', 'Wpływ'],
          rows: [
            ['Konkretna liczba, kwota, data', 'w górę'],
            ['Wartość przypisana cesze („sprawność 21,3%”)', 'w górę'],
            ['Pojedyncze, sprawdzalne twierdzenie', 'w górę'],
            ['Nazwa własna, marka, norma, instytucja', 'lekko w górę'],
            ['Pusta fraza („warto wiedzieć”, „w dzisiejszych czasach”)', 'mocno w dół'],
            ['Słowo modalne („może”, „zwykle”, „raczej”)', 'w dół'],
            ['Przymiotnik oceniający bez pokrycia („najlepszy”, „skuteczny”)', 'w dół'],
            ['Pytanie retoryczne', 'w dół'],
          ],
        },
      ],
    },
    raises: [
      'Liczby, kwoty, daty i jednostki zamiast określeń przybliżonych',
      'Jedno twierdzenie na zdanie, zamiast zdania złożonego z trzech zastrzeżeń',
      'Nazwy własne: marki, normy, instytucje, modele',
      'Wartości przypisane konkretnym cechom, a nie ogólna pochwała produktu',
      'Skrócenie tekstu bez usuwania faktów - sama zmiana proporcji podnosi wynik',
    ],
    lowers: [
      'Akapity wprowadzające, w których nie pada ani jedno sprawdzalne twierdzenie',
      'Frazy wypełniające: „warto wiedzieć”, „w dzisiejszych czasach”, „jak wiadomo”',
      'Asekuracja: „może”, „zwykle”, „raczej”, „w pewnym sensie”',
      'Przymiotniki oceniające bez danych za nimi',
      'Pytania retoryczne zamiast odpowiedzi',
    ],
    swapTable: {
      caption: 'Najszybsza poprawa to wymiana ogólników na dane - to samo zdanie, inna gęstość',
      head: ['Zamiast', 'Napisz'],
      rows: [
        ['„wiele osób”', '„67% badanych”'],
        ['„drogi w utrzymaniu”', '„od 1200 zł miesięcznie”'],
        ['„nowoczesna technologia”', 'nazwa technologii i rok wdrożenia'],
        ['„znacznie wydajniejszy”', '„o 18% wydajniejszy od modelu X”'],
      ],
    },
    swapNote:
      'Jeśli twardych danych nie masz, działają zakresy, proporcje i porównania - „3–5 dni”, „1 na 4 zgłoszenia”, „dwa razy więcej niż średnia”.',
    report: [
      'Dostajesz udział zdań z faktem w treści wraz z oceną, a do tego dwie listy wyciągnięte z Twojego tekstu: zdania uznane za fakty i zdania uznane za wypełnienie. Obie listy zbudowane są z Twojej treści, więc widzisz dokładnie, które akapity ciągną wynik w dół.',
      'Rekomendacje idą w formacie Przed / Po, z propozycją konkretnej redakcji zdania.',
    ],
    recommendations: [
      {
        problem: 'Akapit otwiera pytanie retoryczne - nie ma w nim twierdzenia, które dałoby się potwierdzić albo obalić.',
        before: 'Chcesz dowiedzieć się więcej? Skorzystaj z rekomendacji i sprawdź produkty w konkretnych kategoriach.',
        after: 'Zastąp pytanie konkretem: „W tej kategorii znajdziesz 12 przewodników zakupowych i kategorii powiązanych”.',
      },
      {
        problem: 'Zdanie zbudowane z samych ogólników: „zróżnicowane”, „idealnie”, „maksymalna precyzja” - zero sprawdzalnych danych.',
        before: 'Dzięki zróżnicowanym sensorom, kształtom i funkcjom dopasujesz mysz idealnie do swoich potrzeb, osiągając maksymalną precyzję w rozgrywce.',
        after: 'Podaj kryterium: „Sensor optyczny 26 000 DPI i profil claw ograniczają błędy śledzenia kursora w grach FPS”.',
      },
    ],
    related: [
      { slug: 'graf-wiedzy', name: 'Graf wiedzy', desc: 'Czy fakty układają się w kompletne trójki Encja-Atrybut-Wartość.' },
      { slug: 'bluf', name: 'BLUF', desc: 'Czy fakt pada na początku sekcji, czy dopiero po wstępie.' },
      { slug: 'tf-idf', name: 'TF-IDF', desc: 'Czy używasz terminologii, której oczekuje temat.' },
    ],
  },

  'optymalizacja-chunkow': {
    slug: 'optymalizacja-chunkow',
    faq: [
      {
        q: 'Czy muszę dzielić tekst na krótkie sekcje?',
        a: 'Nie, długość ma być dopasowana do typu treści. Hasło encyklopedyczne może mieć sekcje po 1500 słów, odpowiedź w FAQ - 50. Sztuczne cięcie artykułu na kawałki po 100 słów obniża wynik tak samo jak ściana tekstu.',
      },
      {
        q: 'Czy odwołania w rodzaju „jak wspomniano wyżej” naprawdę szkodzą?',
        a: 'Tak, i to poważnie. Sekcja trafia do modelu bez sąsiednich fragmentów, więc odwołanie wskazuje na coś, czego w danym momencie nie ma. Taki fragment przestaje nadawać się do zacytowania, nawet jeśli merytorycznie jest najlepszy na stronie.',
      },
      {
        q: 'Czy cytowalność sekcji wpływa na ocenę wymiaru?',
        a: 'Nie, to metryka uzupełniająca pokazywana obok wyniku. Mówi, które sekcje mają największą szansę zostać wybrane jako źródło, ale nie wchodzi do oceny końcowej.',
      },
    ],
    name: 'Optymalizacja chunków',
    heading: 'Czym są chunki treści w systemach RAG?',
    title: 'Czym są chunki treści w systemach RAG?',
    description:
      'Silniki AI tną stronę na fragmenty i oceniają każdy osobno. Jak CitationOne mierzy autonomiczność sekcji, długość chunków dla każdego typu treści i cytowalność fragmentów.',
    lead:
      'AI wycina z treści samodzielne fragmenty - sekcje, które da się zrozumieć bez kontekstu całego artykułu. Optymalizacja chunków mierzy, ile takich gotowych do cytowania jednostek zawiera Twoja strona i czy mają one długość właściwą dla tego typu treści.',
    chips: ['Skala 0–10', 'Model językowy + sygnały algorytmiczne', 'Wejście: treść + CSI + profil typu treści'],
    whyHeading: 'Dlaczego optymalizacja chunków jest ważna dla modeli AI?',
    howHeading: 'Jak liczymy optymalizację chunków?',
    why: [
      'Wyszukiwarka generatywna nie wczytuje całej strony do odpowiedzi. Indeksuje ją pociętą na fragmenty - najczęściej pojedyncze sekcje H2 lub H3 - i przy pytaniu użytkownika pobiera te, które wyglądają na najtrafniejsze. Twój fragment trafia do modelu bez tytułu artykułu, bez poprzedniej sekcji i bez wprowadzenia.',
      'Dlatego zdanie „jak wspomniano wyżej, ten parametr jest kluczowy” jest w GEO stratą - poza kontekstem nie znaczy nic i nie da się go zacytować. To samo dotyczy sekcji, która nigdy nie powtarza tematu, o którym mówi, bo posługuje się zaimkiem odsyłającym do nagłówka sprzed dwóch ekranów.',
      'Odwrotnie: sekcja napisana jak samodzielna odpowiedź może zostać zacytowana nawet wtedy, gdy reszta strony jest przeciętna. Chunk jest jednostką konkurowania w AI Search - nie strona.',
    ],
    how: {
      intro: [
        'Model sprawdza każdą sekcję osobno pod kątem czterech kryteriów: czy zaczyna się od odpowiedzi, czy powtarza główny temat co najmniej dwa razy, czy nie odsyła do innych fragmentów („powyżej”, „jak już pisaliśmy”) i czy ma długość adekwatną do typu treści.',
        'Ostatnie kryterium zależy od typu treści: sekcja FAQ ma być krótka, hasło encyklopedyczne może być długie:',
      ],
      tables: [
        {
          caption: 'Optymalna długość sekcji zależy od typu strony',
          head: ['Typ treści', 'Długość sekcji'],
          rows: [
            ['Artykuł', '200–500 słów'],
            ['Hasło encyklopedyczne', '400–1500 słów'],
            ['Porównanie', '150–400 słów'],
            ['Landing, listing, produkt', '80–300 słów'],
            ['Narzędzie, kalkulator', '50–200 słów'],
            ['FAQ', '30–150 słów'],
          ],
        },
      ],
    },
    raises: [
      'Sekcja otwierana zdaniem oznajmującym, które samo w sobie jest odpowiedzią',
      'Główny temat nazwany wprost w sekcji, a nie zastąpiony zaimkiem',
      'Długość dopasowana do typu strony, nie do normy na artykuł',
      'Nagłówek, który brzmi jak pytanie użytkownika, a nie jak hasło reklamowe',
      'Fakty i liczby wewnątrz sekcji, nie w osobnym podsumowaniu na końcu strony',
    ],
    lowers: [
      'Odwołania w rodzaju „powyżej”, „jak już wspominaliśmy”, „w poprzedniej części”',
      'Sekcja otwarta pytaniem retorycznym albo spójnikiem („Jednak”, „Natomiast”)',
      'Otwarcie zaimkiem bez wskazania, do czego się odnosi („To oznacza, że...”)',
      'Ściana tekstu bez podziału na sekcje',
      'Sekcje po 30 słów w artykule albo po 900 w FAQ',
    ],
    report: [
      'Dostajesz ocenę autonomiczności sekcja po sekcji, wraz ze wskazaniem tych, które bez kontekstu całości przestają być zrozumiałe.',
      'Do tego dwie metryki uzupełniające, liczone algorytmicznie i pokazywane obok wyniku, ale nie wliczane do oceny. Pierwsza to cytowalność poszczególnych sekcji, czyli szansa, że akurat ta zostanie wybrana jako źródło - składają się na nią dopasowanie nagłówka do intencji, samodzielność pierwszego zdania, udział zdań oznajmujących, pozycja na stronie i zagnieżdżenie nagłówka. Druga to gęstość cytowalnych fragmentów w całym tekście, czyli jaki procent słów mieści się we fragmentach nadających się do zacytowania.',
      'Osobno pokazujemy nagłówki powtarzające się u konkurencji z Top 10, z zaznaczeniem, których nie masz - to gotowa lista sekcji do dopisania.',
    ],
    recommendations: [
      {
        problem: 'Sekcja i jej nagłówki H3 mają zerową gęstość cytowalną - do indeksu trafiają puste fragmenty.',
        before: '### Sprawdź powiązane kategorie ### Szukasz konkretnego producenta? ### Chcesz wiedzieć więcej?',
        after: 'Pod każdym nagłówkiem dopisz 30–50 słów z nazwami kategorii, marek i tytułami poradników.',
      },
      {
        problem: 'Karta produktu nie zawiera nazwy modelu, więc wycięta z listingu przestaje cokolwiek znaczyć.',
        before: 'Typ produktu: mysz. Rolka przewijania: tak. Transmisja: przewodowa. 149,00 zł.',
        after: 'Umieść pełną nazwę handlową na początku karty - fragment ma pozostać zrozumiały bez reszty strony.',
      },
    ],
    related: [
      { slug: 'bluf', name: 'BLUF', desc: 'Czy sekcja zaczyna się od odpowiedzi.' },
      { slug: 'pokrycie-fan-out', name: 'Pokrycie Fan-Out i AIO', desc: 'Na które pytania poboczne odpowiadają Twoje sekcje.' },
      { slug: 'koszt-pozyskania', name: 'Koszt pozyskania', desc: 'Czy struktura strony ułatwia znalezienie sekcji.' },
    ],
  },

  'koszt-pozyskania': {
    slug: 'koszt-pozyskania',
    faq: [
      {
        q: 'Czym ten wymiar różni się od Effort Score?',
        a: 'Koszt pozyskania mierzy, czy strukturę da się szybko przeszukać, a Effort Score - czy strona jest kompletna. Pierwszy patrzy na hierarchię, tabele i wyróżnienia; drugi na długość względem konkurencji, materiały wizualne i datę aktualizacji.',
      },
      {
        q: 'Czy pogrubienia pomagają?',
        a: 'Tak, ale tylko na faktach. Pogrubiony kluczowy parametr albo liczba działa jak drogowskaz; pogrubione całe zdania w każdym akapicie przestają cokolwiek wyróżniać.',
      },
      {
        q: 'Czy każda strona potrzebuje tabeli?',
        a: 'Nie, tabela liczy się wtedy, gdy masz dane do zestawienia. Jeśli porównujesz parametry, ceny albo warianty, tabela obniża koszt dotarcia do odpowiedzi bardziej niż jakikolwiek inny zabieg. Tekst bez danych porównawczych nic na niej nie zyska.',
      },
    ],
    name: 'Koszt pozyskania',
    heading: 'Czym jest Cost of Retrieval w treści?',
    title: 'Czym jest Cost of Retrieval w treści?',
    description:
      'Ile wysiłku kosztuje wyciągnięcie odpowiedzi z Twojej strony. Punktowana checklista struktury: hierarchia nagłówków, tabele, listy, wyróżnienia, podsumowanie.',
    lead:
      'Koszt pozyskania mówi, ile wysiłku kosztuje wyciągnięcie ze strony konkretnej odpowiedzi. Hierarchia nagłówków, tabele, listy i wyróżnienia obniżają ten koszt; ściana tekstu go podnosi. Przy porównywalnej treści model wybierze źródło tańsze w obsłudze.',
    chips: ['Skala 0–10', 'Punktowana checklista struktury', 'Wejście: treść + struktura HTML'],
    whyHeading: 'Dlaczego koszt pozyskania jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy koszt pozyskania?',
    why: [
      'Model, który ma zbudować odpowiedź, przetwarza wiele źródeł naraz. Strona, z której odpowiedź trzeba wyłuskać z dziesięciu akapitów ciągłego tekstu, jest droższa w obsłudze niż konkurent, który tę samą informację podał w tabeli. Przy porównywalnej treści wygrywa ta tańsza.',
      'Ten sam mechanizm działa po stronie człowieka - struktura, która pomaga czytelnikowi zeskanować stronę, pomaga też modelowi znaleźć fragment do zacytowania. To jeden z niewielu wymiarów, w którym optymalizacja pod AI i pod użytkownika to dokładnie to samo zadanie.',
    ],
    how: {
      intro: [
        'To checklista punktowa: sprawdzamy obecność elementów struktury i sumujemy punkty do maksymalnie dziesięciu:',
      ],
      tables: [
        {
          caption: 'Z czego składa się ocena',
          head: ['Element struktury', 'Punkty'],
          rows: [
            ['Poprawna hierarchia H1 → H2 → H3', '2'],
            ['Tabele z danymi', '2'],
            ['Listy punktowane lub numerowane', '1'],
            ['Pogrubienia kluczowych faktów', '1'],
            ['Podsumowanie albo sekcja typu TL;DR', '1'],
            ['Brak ścian tekstu powyżej 300 słów bez formatowania', '1'],
            ['Linki wewnętrzne osadzone w kontekście', '1'],
            ['Brak ogólnikowych wstępów', '1'],
          ],
        },
      ],
    },
    raises: [
      'Jedno H1, pod nim logiczne H2, dopiero pod nimi H3',
      'Dane liczbowe podane tabelą zamiast wyliczone w zdaniu',
      'Listy tam, gdzie treść jest wyliczeniem: kroki, warunki, wymagania',
      'Pogrubione kluczowe fakty - ale tylko fakty, nie całe zdania',
      'Krótkie podsumowanie na początku lub końcu strony',
    ],
    lowers: [
      'H3 bez nadrzędnego H2 albo kilka H1 na stronie',
      'Akapity powyżej 300 słów bez śródtytułu, listy czy wyróżnienia',
      'Dane rozproszone po zdaniach zamiast zebrane w tabeli',
      'Ogólnikowy wstęp przed pierwszą konkretną informacją',
      'Pogrubienia stosowane w całym tekście bez wyboru - przestają cokolwiek znaczyć',
    ],
    report: [
      'Dostajesz checklistę wskazującą, które elementy struktury są obecne, a których brakuje. Każdy niespełniony punkt to gotowa poprawka - najczęściej kilkuminutowa, bo nie wymaga pisania nowej treści, tylko przeorganizowania istniejącej. Do tego lista wykrytych usterek hierarchii nagłówków: brak H1, kilka H1 albo sekcje H3 bez nadrzędnego H2.',
    ],
    recommendations: [
      {
        problem: 'Parametry są rozproszone po liście zamiast zestawione w tabeli, więc model składa odpowiedź z czterech osobnych punktów.',
        before: 'Najważniejsze parametry techniczne: rozdzielczość 800–26 000 DPI, akceleracja do 50G, czas reakcji 1 ms, sensory optyczne nowej generacji.',
        after: 'Dodaj tabelę: Gatunek gry | Zalecany sensor / DPI | Typ łączności | Waga.',
      },
      {
        problem: 'Puste nagłówki H3 w stopce podbijają koszt przetwarzania - parser schodzi po strukturze, która nie ma treści.',
        before: '### Obsługa klienta ### Zakupy ### Aktualne promocje ### Bestsellery ### Na czasie',
        after: 'Usuń nagłówki z nawigacji stopki albo uzupełnij je zdaniem treści; same linki zostaw jako zwykłą listę.',
      },
    ],
    related: [
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcje pozostają zrozumiałe samodzielnie.' },
      { slug: 'effort-score', name: 'Effort Score', desc: 'Szersza checklista formatów i kompletności strony.' },
      { slug: 'bluf', name: 'BLUF', desc: 'Czy odpowiedź stoi na początku sekcji.' },
    ],
  },

  'tf-idf': {
    slug: 'tf-idf',
    faq: [
      {
        q: 'Czy to nie jest upychanie słów kluczowych?',
        a: 'Nie, mierzymy pokrycie pojęć, a nie częstotliwość frazy. Termin liczy się wtedy, gdy pada w wyjaśnieniu - wrzucony listą na końcu tekstu nie buduje ani zrozumienia, ani wyniku.',
      },
      {
        q: 'Ile terminów trzeba dodać?',
        a: 'Tyle, ile realnych luk wskazuje raport, zaczynając od góry listy. Terminy są uszeregowane według liczby konkurentów, którzy ich używają, oraz siły powiązania z tematem strony, więc pierwsze pozycje dają największy przyrost wyniku.',
      },
      {
        q: 'Skąd bierze się lista brakujących terminów?',
        a: 'Z treści konkurencji z Top 10 dla Twojej frazy.',
      },
    ],
    name: 'TF-IDF',
    heading: 'Czym jest TF-IDF w audycie treści?',
    title: 'Czym jest TF-IDF w audycie treści?',
    description:
      'Porównanie terminologii Twojej strony ze słownictwem Top 10 SERP. Jak CitationOne znajduje brakujące terminy specjalistyczne i podpowiada kontekst, w jakim ich użyć.',
    lead:
      'TF-IDF porównuje terminologię Twojej strony ze słownictwem konkurencji z Top 10. Brakujący termin specjalistyczny oznacza zwykle brakujący wątek, dlatego CitationOne wskazuje, których pojęć nie używasz i w jakim kontekście stosuje je konkurencja.',
    chips: ['Skala 0–10', 'Analiza statystyczna + model językowy', 'Wejście: treść + słownictwo Top 10 SERP'],
    whyHeading: 'Dlaczego TF-IDF jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy TF-IDF?',
    why: [
      'Terminologia jest najtańszym do zweryfikowania sygnałem kompetencji. Tekst o kredycie hipotecznym, w którym nie pada „wskaźnik LTV”, „zdolność kredytowa” ani „marża banku”, pokrywa temat powierzchownie, a model porównuje go z dziesięcioma stronami, które tych pojęć używają.',
      'W GEO ma to dodatkowe znaczenie, bo brakujący termin to zwykle brakujący wątek. Jeśli dziewięciu konkurentów pisze o czymś, czego u Ciebie nie ma, masz lukę merytoryczną, którą model zobaczy przy składaniu odpowiedzi.',
    ],
    how: {
      intro: [
        'Z treści konkurencji budujemy zbiór odniesienia i wyznaczamy terminy o wysokiej wartości informacyjnej: specjalistyczne, branżowe, często wielowyrazowe. Słowa funkcyjne i ogólne rzeczowniki są odrzucane. Ocena to stosunek terminów obecnych u Ciebie do oczekiwanych, przeskalowany do dziesięciostopniowej oceny.',
        'Wzór: terminy specjalistyczne obecne w treści podzielone przez terminy oczekiwane, razy 10.',
      ],
      tables: [
        {
          caption: 'Które terminy się liczą',
          head: ['Rodzaj terminu', 'Znaczenie dla oceny'],
          rows: [
            ['Specjalistyczny, branżowy, wielowyrazowy', 'Wysoka wartość - to on świadczy o znajomości tematu'],
            ['Ogólny rzeczownik, ogólny przymiotnik', 'Bez znaczenia - występuje w każdym tekście'],
            ['Słowo funkcyjne', 'Pomijane'],
          ],
        },
      ],
    },
    raises: [
      'Pojęcia branżowe użyte w wyjaśnieniu, a nie tylko wymienione',
      'Frazy wielowyrazowe, którymi posługuje się branża, a nie ich potoczne odpowiedniki',
      'Terminy obecne u większości konkurentów z Top 10',
      'Termin użyty w kontekście, w którym łączy go konkurencja - „kortyzol” obok „podwyższony”, nie w oderwaniu',
    ],
    lowers: [
      'Opis tematu językiem ogólnym, z pominięciem nazw własnych zjawisk',
      'Brak pojęć, które są standardem u konkurencji',
      'Terminy wrzucone listą na końcu tekstu, bez wyjaśnienia',
      'Zastępowanie terminu opisem („taki wskaźnik, który pokazuje...”) zamiast nazwania go',
    ],
    report: [
      'Dostajesz listę brakujących terminów uszeregowaną według tego, ilu konkurentów ich używa i jak mocno wiążą się z tematem strony.',
      'Przy terminach, które u konkurencji występują w stałym towarzystwie innego pojęcia, podpowiadamy ten kontekst - rekomendacja brzmi wtedy „dodaj termin X w kontekście Y, tak łączy je 6 z 10 konkurentów”.',
    ],
    recommendations: [
      {
        problem: 'Fraza „dpi optyczna” pada u 5 z 8 konkurentów przy opisie sensora, a w Twojej treści nie występuje ani razu.',
        before: 'Sensor optyczny wpływa na dokładność śledzenia ruchu i szybkość reakcji.',
        after: 'Użyj terminu w wyjaśnieniu: „rozdzielczość dpi optyczna 26 000 przekłada się na dokładność śledzenia bez interpolacji”.',
      },
      {
        problem: 'Fraza doradcza „najlepsza myszka” występuje u 4 z 8 konkurentów, zwykle przy kryteriach doboru - u Ciebie jej nie ma.',
        before: 'Dzięki zróżnicowanym sensorom i kształtom dopasujesz mysz do swoich potrzeb.',
        after: 'Dodaj sekcję doradczą: „Najlepsza myszka do FPS - jakie parametry mają znaczenie”.',
      },
    ],
    related: [
      { slug: 'graf-wiedzy', name: 'Graf wiedzy', desc: 'Czy pojęcia układają się w kompletne fakty.' },
      { slug: 'wartosc-dodana', name: 'Wartość dodana', desc: 'Które z Twoich terminów są unikalne w całym Top 10.' },
      { slug: 'zgodnosc-z-csi', name: 'Zgodność z CSI', desc: 'Czy pokryte pojęcia odpowiadają intencji.' },
    ],
  },

  'role-semantyczne': {
    slug: 'role-semantyczne',
    faq: [
      {
        q: 'Czy strona bierna jest zawsze błędem?',
        a: 'Nie, problemem jest dopiero pominięcie wykonawcy. „Decyzję podejmuje bank” jest w porządku; „decyzja jest podejmowana” zostawia model bez informacji, kto ją podejmuje.',
      },
      {
        q: 'Co, jeśli tematem strony jest usługa, a nie firma?',
        a: 'Wtedy wykonawcą bywa sama usługa albo produkt: „ubezpieczenie pokrywa koszty leczenia”, „pompa ciepła obniża rachunek o 40%”. Chodzi o jednoznaczną rolę głównego tematu, nie o to, żeby wszędzie wpisać nazwę firmy.',
      },
      {
        q: 'Jak szybko da się to poprawić?',
        a: 'To zwykle najtańszy wymiar do naprawy. Poprawki są mechaniczne - przestawienie szyku zdania - i nie wymagają dopisywania nowej treści ani nowych danych.',
      },
    ],
    name: 'Role semantyczne',
    heading: 'Czym są role semantyczne (SRL) w treści?',
    title: 'Czym są role semantyczne (SRL) w treści?',
    description:
      'Czy główny temat strony jest wykonawcą czynności, czy tylko jej przedmiotem. Jak CitationOne mierzy role semantyczne i dlaczego strona bierna szkodzi w AI Search.',
    lead:
      'Role semantyczne sprawdzają, czy główny temat strony występuje w zdaniach jako wykonawca czynności, czy tylko jako jej przedmiot. Strona czynna daje modelowi komplet informacji „kto - co robi - z czym”; strona bierna zostawia w tej strukturze lukę.',
    chips: ['Skala 0–10', 'Ocena modelem językowym', 'Wejście: treść + główna encja z CSI'],
    whyHeading: 'Dlaczego role semantyczne są ważne dla modeli AI?',
    howHeading: 'Jak liczymy role semantyczne?',
    why: [
      'Model wyciąga z tekstu fakty w postaci „kto - co robi - z czym”. Zdanie w stronie biernej z pominiętym wykonawcą zostawia w tej strukturze lukę, którą model musi uzupełnić domysłem albo pominąć cały fakt. Zdanie w stronie czynnej dostarcza komplet informacji i nadaje się do zacytowania bez modyfikacji.',
    ],
    how: {
      intro: [
        'Punktem odniesienia jest udział zdań, w których główny temat pełni rolę wykonawcy. Dobrze napisana strona osiąga tu ponad 70% spośród zdań, w których temat w ogóle występuje. Poniżej tego progu treść opisuje temat z zewnątrz, zamiast przypisywać mu działania, a model traci powiązania między encją a faktami.',
      ],
      tables: [
        {
          caption: 'Jak liczy się rola w zdaniu',
          head: ['Rola głównej encji', 'Wartość'],
          rows: [
            ['Wykonawca czynności („Bank udziela kredytu”)', 'pełna'],
            ['Przedmiot czynności („Kredyt jest udzielany przez bank”)', 'połowiczna'],
            ['Nieobecna w zdaniu', 'zerowa'],
          ],
        },
      ],
    },
    raises: [
      'Strona czynna z jawnym wykonawcą',
      'Główny temat nazwany wprost zamiast zastąpiony zaimkiem',
      'Czasowniki konkretne („obniża”, „skraca”) zamiast konstrukcji z „jest”',
      'Spójna perspektywa w całym tekście - ten sam bohater zdań',
    ],
    lowers: [
      'Strona bierna z pominiętym wykonawcą („zostało wdrożone”, „jest stosowany”)',
      'Zdania bezpodmiotowe („należy pamiętać”, „warto rozważyć”)',
      'Zastępowanie tematu zaimkiem przez całe akapity',
      'Zmienny bohater - raz produkt, raz klient, raz firma, bez uzasadnienia',
    ],
    swapTable: {
      caption: 'Najczęstsza poprawka to zamiana strony biernej na czynną',
      head: ['Zamiast', 'Napisz'],
      rows: [
        ['„Kredyt jest udzielany na 30 lat”', '„Bank udziela kredytu na 30 lat”'],
        ['„Panel został zamontowany”', '„Ekipa montuje panel w jeden dzień”'],
        ['„Należy pamiętać o przeglądzie”', '„Pompa ciepła wymaga przeglądu raz w roku”'],
      ],
    },
    report: [
      'Dostajesz udział zdań, w których główny temat jest wykonawcą, oraz listę zdań wymagających przeredagowania - z gotową propozycją w stronie czynnej.',
      'To zwykle najszybszy do wdrożenia wymiar: poprawki są mechaniczne i nie wymagają dopisywania nowej treści.',
    ],
    recommendations: [
      {
        problem: 'Główny temat jest dopełnieniem czynności czytelnika: wykonawcą zdania jesteś „ty”, a nie opisywany produkt.',
        before: 'W sklepie znajdziesz szeroki wybór modeli przewodowych i bezprzewodowych, zoptymalizowanych pod różne gatunki gier.',
        after: 'Myszki gamingowe przewodowe i bezprzewodowe obsługują wszystkie gatunki gier - od FPS, przez strategie, po MMO.',
      },
      {
        problem: 'Zdanie mówi, co „możesz zrobić”, zamiast tego, co robi produkt.',
        before: 'Dzięki zróżnicowanym sensorom możesz dopasować mysz do swoich potrzeb.',
        after: 'Sensory o rozdzielczości do 26 000 DPI dopasowują czułość myszy do stylu gry.',
      },
    ],
    related: [
      { slug: 'gestosc-informacji', name: 'Gęstość informacji', desc: 'Czy zdanie w ogóle niesie sprawdzalny fakt.' },
      { slug: 'graf-wiedzy', name: 'Graf wiedzy', desc: 'Jak fakty łączą się w encje, atrybuty i wartości.' },
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcja pozostaje zrozumiała bez kontekstu.' },
    ],
  },

  'effort-score': {
    slug: 'effort-score',
    faq: [
      {
        q: 'Czy dłuższy tekst zawsze podnosi wynik?',
        a: 'Nie, progiem jest średnia z Top 10 dla Twojej frazy, a nie konkretna liczba słów. Na frazach, przy których konkurencja pisze zwięźle, rozbudowywanie tekstu nie podnosi wyniku, a obniża go na pozostałych wymiarach.',
      },
      {
        q: 'Dlaczego audyt nie widzi moich obrazów i wideo?',
        a: 'Bo te sygnały odczytujemy z kodu strony. Audyt treści wklejonej z edytora zamiast z adresu URL nie ma dostępu do informacji o obrazach, wideo ani dacie publikacji.',
      },
      {
        q: 'Czy brak spisu treści zawsze obniża wynik?',
        a: 'Nie. Sprawdzamy go tylko przy artykułach i hasłach encyklopedycznych. Na listingu, karcie produktu czy landingu ten punkt jest pomijany.',
      },
    ],
    name: 'Effort Score',
    heading: 'Czym jest Effort Score w audycie treści?',
    title: 'Czym jest Effort Score w audycie treści?',
    description:
      'Algorytmiczna checklista kompletności strony: długość względem konkurencji, obrazy, wideo, tabele, listy, hierarchia nagłówków, spis treści i widoczna data aktualizacji.',
    lead:
      'Effort Score to algorytmiczna checklista kompletności strony: długość względem konkurencji, materiały wizualne, tabele, listy, hierarchia nagłówków, spis treści i widoczna data aktualizacji.',
    chips: ['Skala 0–10', 'W 100% algorytmiczny - zero wywołań modelu', 'Wejście: treść + struktura HTML + średnia Top 10'],
    whyHeading: 'Dlaczego Effort Score jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy Effort Score?',
    why: [
      'Sygnały kompletności to najstarsze przybliżenie jakości, jakim posługują się wyszukiwarki: strona z tabelą, materiałem wizualnym i aktualną datą częściej powstaje w wyniku rzetelnego opracowania tematu niż strona złożona z pięciu akapitów. Wyszukiwarki traktują to jako mocną poszlakę jakości.',
    ],
    how: {
      intro: [
        'Checklista obejmuje do jedenastu kryteriów i liczy ją wyłącznie algorytm, bez udziału modelu językowego. Część jest bezwzględna, część odnosi się do konkurencji - próg długości to średnia z Top 10 dla Twojej frazy, a nie konkretna liczba słów.',
        'Zestaw kryteriów dopasowuje się do typu strony: spis treści sprawdzamy tylko dla artykułów i haseł encyklopedycznych, a widoczną datę pomijamy na landingach.',
      ],
      tables: [
        {
          caption: 'Co sprawdza checklista',
          head: ['Kryterium', 'Czego dotyczy'],
          rows: [
            ['Długość bezwzględna', 'Treść powyżej 700 słów'],
            ['Długość względem konkurencji', 'Treść powyżej średniej z Top 10 dla tej frazy'],
            ['Materiały wizualne', 'Co najmniej cztery obrazy'],
            ['Wideo', 'Osadzony materiał wideo'],
            ['Listy', 'Wyliczenia punktowane lub numerowane'],
            ['Tabele', 'Dane zestawione tabelą'],
            ['Hierarchia nagłówków', 'Poprawna struktura H1, H2, H3'],
            ['Wyróżnienia', 'Pogrubione kluczowe terminy'],
            ['Spis treści lub podsumowanie', 'Tylko dla artykułów i haseł encyklopedycznych'],
            ['Brak ścian tekstu', 'Akapity podzielone i sformatowane'],
            ['Świeżość', 'Widoczna data publikacji lub aktualizacji'],
          ],
        },
      ],
    },
    raises: [
      'Treść dłuższa niż średnia Top 10 dla tej frazy',
      'Cztery lub więcej materiałów wizualnych',
      'Dane podane tabelą, a procesy listą',
      'Widoczna data publikacji i aktualizacji w kodzie strony',
      'Spis treści przy dłuższym artykule',
    ],
    lowers: [
      'Treść wyraźnie krótsza niż u konkurencji z Top 10',
      'Brak jakiegokolwiek materiału wizualnego',
      'Ciągły tekst bez list, tabel i wyróżnień',
      'Brak daty - albo data ukryta wyłącznie w warstwie wizualnej, bez znacznika w kodzie',
      'Niepoprawna hierarchia nagłówków',
    ],
    report: [
      'W raporcie znajdziesz checklistę z odhaczonymi i brakującymi pozycjami, a przy każdej brakującej - wskazówkę, co dokładnie dodać. Obok stoi porównanie formatów z konkurencją: jeśli sześciu konkurentów ma tabelę, a Ty nie, zobaczysz to wprost.',
      'Osobno raportujemy świeżość treści: datę publikacji, datę aktualizacji oraz wiek treści liczony w miesiącach.',
      'Obowiązuje przy tym jedno ograniczenie: obrazy, wideo i daty odczytujemy z kodu strony, więc audyt treści wklejonej z edytora zamiast z adresu URL nie obejmuje tych kryteriów.',
    ],
    recommendations: [
      {
        problem: 'Treść jest wyraźnie krótsza niż średnia Top 10 dla tej frazy (1460 słów) - konkurencja tłumaczy temat szerzej.',
        before: 'Cztery krótkie sekcje opisowe pod listą produktów.',
        after: 'Dopisz brakujące wątki - porównanie przewodowe/bezprzewodowe i ranking modeli - aż objętość treści osiągnie średnią konkurencji.',
      },
      {
        problem: 'Strona nie pokazuje daty publikacji ani aktualizacji, czyli najprostszego sygnału świeżości.',
        before: 'Copyright © 2025. W kodzie brak datePublished i dateModified.',
        after: 'Dodaj widoczną datę aktualizacji oraz datePublished i dateModified w JSON-LD; odświeżaj ją przy każdej zmianie oferty.',
      },
    ],
    related: [
      { slug: 'koszt-pozyskania', name: 'Koszt pozyskania', desc: 'Czy struktura ułatwia wyciągnięcie odpowiedzi.' },
      { slug: 'e-e-a-t', name: 'E-E-A-T', desc: 'Czy strona pokazuje autora, źródła i aktualizacje.' },
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcje mają właściwą długość.' },
    ],
  },

  'e-e-a-t': {
    slug: 'e-e-a-t',
    faq: [
      {
        q: 'Czy E-E-A-T to czynnik rankingowy?',
        a: 'Nie w sensie pojedynczego parametru. To zestaw kryteriów jakości, którymi Google opisuje dobrą treść, a modele generatywne kierują się tym samym przy wyborze źródła.',
      },
      {
        q: 'Czy wystarczy dopisać „autor: redakcja”?',
        a: 'Nie. Sygnał uznajemy tylko wtedy, gdy ma pokrycie w treści - podpis bez kwalifikacji, afiliacji ani śladu doświadczenia niczego nie zmienia.',
      },
      {
        q: 'Jakie źródła liczą się najbardziej?',
        a: 'Rozpoznawalne instytucje i publikacje branżowe, przy zachowaniu różnorodności. Pięć odnośników do pięciu wiarygodnych domen waży więcej niż pięć odesłań do tego samego serwisu.',
      },
    ],
    name: 'E-E-A-T',
    heading: 'Czym jest E-E-A-T i jak się je mierzy?',
    title: 'Czym jest E-E-A-T i jak się je mierzy?',
    description:
      'Doświadczenie, ekspertyza, autorytet i wiarygodność w treści. Jakie sygnały CitationOne wykrywa, jak weryfikuje źródła i dlaczego każdy sygnał wymaga cytatu z tekstu.',
    lead:
      'E-E-A-T obejmuje doświadczenie, ekspertyzę, autorytet i wiarygodność - cztery osobno oceniane składowe, liczone z sygnałów obecnych w treści i w kodzie strony.',
    chips: ['Cztery oceny 0–10', 'Wykrywanie algorytmiczne + weryfikacja modelem', 'Wejście: treść + kod strony + linki zewnętrzne'],
    whyHeading: 'Dlaczego E-E-A-T jest ważne dla modeli AI?',
    howHeading: 'Jak liczymy E-E-A-T?',
    why: [
      'Silnik generatywny odpowiada za treść, której użytkownik nie zweryfikuje już kliknięciem w link. Dlatego przy wyborze źródła premiuje strony wskazujące autora, podstawę twierdzeń i datę ostatniej weryfikacji. Tekst anonimowy i pozbawiony źródeł stanowi ryzyko, którego model unika.',
      'To jedyny wymiar, w którym poprawa nie wymaga przepisywania zdań. Biogram autora z kwalifikacjami, przypis do badania, data aktualizacji i dane kontaktowe to elementy obecne na stronie albo nieobecne - ocena zależy od ich uzupełnienia, nie od redakcji tekstu.',
    ],
    how: {
      intro: [
        'Najpierw algorytmicznie wykrywamy sygnały w treści i w kodzie strony, a dopiero potem model je weryfikuje i ocenia siłę. Zasada jest prosta: każdy uznany sygnał musi mieć oparcie w konkretnym fragmencie tekstu. Sygnał bez cytatu zostaje odrzucony, dzięki czemu audyt nie przypisuje stronie kompetencji, których ona nie deklaruje.',
      ],
      tables: [
        {
          caption: 'Cztery składowe i sygnały, które je budują',
          head: ['Składowa', 'Co ją podnosi'],
          rows: [
            ['Doświadczenie', 'Własna historia, studium przypadku, zdjęcia i zrzuty z użycia, opis testu wykonanego samodzielnie'],
            ['Ekspertyza', 'Cytaty z badań, dane ze wskazanym źródłem, terminologia branżowa, wyjaśnienie mechanizmu, bibliografia'],
            ['Autorytet', 'Bio autora z kwalifikacjami, afiliacja instytucjonalna, publikacje, cytowania z zewnątrz, nagrody'],
            ['Wiarygodność', 'Zastrzeżenia i noty prawne, data aktualizacji, kontakt do autora, polityka redakcyjna, bezpieczne połączenie'],
          ],
        },
        {
          caption: 'Dodatkowo weryfikujemy źródła - to sygnały liczone z kodu strony, nie z samego tekstu',
          head: ['Sygnał', 'Co jest sprawdzane'],
          rows: [
            ['Weryfikowalność źródeł', 'Linki zewnętrzne, przypisy, odwołania do znanych instytucji i publikacji'],
            ['Różnorodność źródeł', 'Liczba różnych domen - opieranie się na jednym źródle waży mniej'],
            ['Tożsamość autora', 'Powiązania profilu autora w danych strukturalnych: Wikipedia, ORCID, Google Scholar, LinkedIn'],
            ['Poparcie twierdzeń', 'Czy twierdzenia wysokiego ryzyka, takie jak statystyki, daty i wyniki badań, mają wskazane źródło w tym samym akapicie'],
          ],
        },
      ],
    },
    raises: [
      'Podpis autora z konkretnymi kwalifikacjami, nie „zespół redakcyjny”',
      'Przypisy do badań i danych z podaniem źródła',
      'Linki do różnych instytucji zamiast wielokrotnych odesłań do jednego serwisu',
      'Widoczna data aktualizacji i kontakt',
      'Opis własnego testu, wdrożenia albo przypadku klienta',
    ],
    lowers: [
      'Tekst bez autora i bez daty',
      'Statystyki podane bez źródła',
      'Deklaracje kompetencji bez pokrycia w treści („wieloletnie doświadczenie”)',
      'Brak jakichkolwiek linków zewnętrznych',
      'Powoływanie się wyłącznie na własne materiały',
    ],
    report: [
      'Dostajesz cztery osobne oceny wraz z listą wykrytych sygnałów - każdy z cytatem z Twojej treści, który go potwierdza.',
    ],
    recommendations: [
      {
        problem: 'Parametry i porównania są podane bez odwołania do źródła, więc żadnego z tych twierdzeń nie da się zweryfikować.',
        before: 'Sensory optyczne nowej generacji osiągają dokładność śledzenia na poziomie 99,8%.',
        after: 'Dodaj przypis do źródła pomiaru: „dokładność śledzenia 99,8% według dokumentacji technicznej producenta, 2026”.',
      },
      {
        problem: 'Strona transakcyjna nie podaje sygnałów wiarygodności, których wymaga ten typ treści: warunków zwrotu, gwarancji i zabezpieczenia płatności.',
        before: 'Wszystkie produkty pochodzą z oficjalnej dystrybucji i mają pełne wsparcie techniczne.',
        after: 'Wyeksponuj konkrety: „30 dni na darmowy zwrot, 24 miesiące gwarancji producenta, płatności szyfrowane SSL”.',
      },
    ],
    related: [
      { slug: 'effort-score', name: 'Effort Score', desc: 'Czy strona ma datę, materiały i kompletną strukturę.' },
      { slug: 'gestosc-informacji', name: 'Gęstość informacji', desc: 'Czy twierdzenia są sprawdzalne.' },
      { slug: 'wartosc-dodana', name: 'Wartość dodana', desc: 'Ile wnosisz ponad to, co już jest w SERP.' },
    ],
  },

  'wartosc-dodana': {
    slug: 'wartosc-dodana',
    faq: [
      {
        q: 'Dlaczego ta metryka nie wpływa na ocenę?',
        a: 'Bo mierzy strategię, a nie jakość wykonania. Treść może być bez zarzutu i mieć jednocześnie niską wartość dodaną - to sygnał, żeby uzupełnić ją o własny materiał, a nie żeby poprawiać redakcję tekstu.',
      },
      {
        q: 'Jak najszybciej ją podnieść?',
        a: 'Własnymi danymi. Wynik testu, statystyka z Twojej bazy, studium przypadku z liczbami albo zestawienie, którego nikt nie zrobił - każdy z tych elementów jest z definicji nieobecny u konkurencji.',
      },
      {
        q: 'Czy niska wartość dodana oznacza słabe pokrycie tematu?',
        a: 'Nie, to dwie odrębne miary. Pokrycie tematu oceniają wymiary TF-IDF oraz Pokrycie Fan-Out i AIO, natomiast wartość dodana mierzy wyłącznie udział treści, która nie powtarza się w pozostałych wynikach.',
      },
    ],
    name: 'Wartość dodana',
    heading: 'Czym jest Information Gain w treści?',
    title: 'Czym jest Information Gain w treści?',
    description:
      'Ile nowego wnosi Twoja treść względem Top 10 SERP. Cztery sygnały unikalności: własne twierdzenia, unikalne fakty, terminy nieobecne u konkurencji i rzadkie formaty.',
    lead:
      'Wartość dodana mierzy, ile Twoja treść wnosi ponad to, co już jest w Top 10. To metryka strategiczna: pokazuje, gdzie budować przewagę, i nie wpływa na ocenę końcową.',
    chips: ['Skala 0–100', 'Nie wpływa na ocenę końcową', 'Wejście: treść + słownictwo Top 10 SERP'],
    whyHeading: 'Dlaczego wartość dodana jest ważna dla modeli AI?',
    howHeading: 'Jak liczymy wartość dodaną?',
    why: [
      'Silnik generatywny nie potrzebuje dziesięciu źródeł mówiących to samo. Buduje odpowiedź z kilku, a wybiera te, które dokładają coś, czego nie ma w pozostałych. Treść poprawna, ale w całości pokrywająca się z konkurencją, jest dla niego wymienna - każde inne źródło spełni tę samą funkcję.',
    ],
    how: {
      intro: [
        'Porównujemy Twoją treść ze zbiorem tekstów konkurencji z Top 10 i liczymy cztery niezależne sygnały, które składają się na wynik w skali od 0 do 100:',
      ],
      tables: [
        {
          caption: 'Cztery sygnały unikalności',
          head: ['Sygnał', 'Co oznacza'],
          rows: [
            ['Unikalne twierdzenia', 'Konkretne twierdzenia o faktach z Twojego tekstu, których nie ma u żadnego konkurenta'],
            ['Unikalne fakty', 'Trójki Encja-Atrybut-Wartość obecne u mniej niż 30% konkurencji'],
            ['Unikalne terminy', 'Pojęcia, którymi posługujesz się Ty, a nie posługuje się konkurencja'],
            ['Rzadkie formaty', 'Sposoby prezentacji rzadko stosowane w tym SERP-ie - tabela, materiał wideo, bibliografia'],
          ],
        },
      ],
    },
    raises: [
      'Własne dane: wyniki testu, statystyki z Twojej bazy, obliczenia',
      'Studium przypadku z konkretnymi liczbami',
      'Zestawienie, którego nikt inny nie zrobił',
      'Wnioski eksperckie wykraczające poza opis stanu rzeczy',
      'Format, po który konkurencja nie sięgnęła',
    ],
    lowers: [
      'Treść będąca streszczeniem pierwszej dziesiątki',
      'Fakty przepisane z tych samych źródeł co u konkurencji',
      'Brak jakiejkolwiek własnej obserwacji lub danych',
    ],
    report: [
      'Dostajesz wynik z rozbiciem na cztery sygnały oraz listę Twoich unikalnych twierdzeń - tego, co faktycznie odróżnia stronę od reszty wyników.',
      'Do tego podpowiedzi, jakim typem materiału najłatwiej podnieść wynik przy tym konkretnym temacie: własnymi danymi, studium przypadku, porównaniem, komentarzem eksperta albo małym badaniem.',
      'Wartość dodana świadomie nie wpływa na ocenę końcową. Jest metryką strategiczną - pokazuje, gdzie budować przewagę, a nie co poprawić w tekście.',
    ],
    recommendations: [
      {
        problem: 'Treść powtarza to, co jest w Top 10 - nie ma w niej ani jednego twierdzenia, którego nie znajdziesz u konkurencji.',
        before: 'Opis parametrów przepisany z kart katalogowych producentów.',
        after: 'Dodaj własne dane: wyniki testu żywotności przełączników albo statystykę zwrotów według typu chwytu.',
      },
      {
        problem: 'Przewaga formatowa 17/100 - konkurencja sięga po formaty, których na stronie nie ma.',
        before: 'Tekst i lista punktowana w każdej sekcji.',
        after: 'Dodaj tabelę porównawczą modeli i krótkie wideo z testu - oba formaty są rzadkie w tym SERP-ie.',
      },
    ],
    related: [
      { slug: 'tf-idf', name: 'TF-IDF', desc: 'Terminologia, której brakuje względem konkurencji.' },
      { slug: 'graf-wiedzy', name: 'Graf wiedzy', desc: 'Które Twoje fakty są wyróżnikiem.' },
      { slug: 'e-e-a-t', name: 'E-E-A-T', desc: 'Czy własne dane są poparte autorstwem i źródłami.' },
    ],
  },

  bluf: {
    slug: 'bluf',
    faq: [
      {
        q: 'Czy BLUF pasuje do tekstów sprzedażowych?',
        a: 'Tak, ale w innej formie niż w artykule. Na landingu czy listingu BLUF to jedno-dwa zdania konkretu nad sekcją, a nie akademicka teza. Reguła dopasowuje się do typu strony, więc landing nie jest oceniany kryteriami bloga.',
      },
      {
        q: 'Czy BLUF dotyczy tylko początku strony?',
        a: 'Nie, każdej sekcji osobno. Silnik AI pobiera pojedyncze sekcje bez reszty artykułu, więc każda musi zaczynać się od odpowiedzi. Świetny lead nie pomoże sekcji z połowy strony.',
      },
      {
        q: 'Ile zdań powinien mieć BLUF?',
        a: 'Przy prostym pytaniu jedno, przy złożonym dwa lub trzy. Limit to pierwsze 50 słów sekcji - w tym miejscu ma paść odpowiedź, a nie zapowiedź tego, o czym będzie sekcja.',
      },
    ],
    name: 'BLUF',
    heading: 'Czym jest BLUF w SEO i GEO?',
    title: 'Czym jest BLUF w SEO i GEO?',
    description:
      'Czym jest BLUF i jak CitationOne go mierzy: odpowiedź w pierwszych 50 słowach sekcji oraz osobne reguły dla FAQ, listingu i encyklopedii.',
    lead:
      'Modele AI preferują treści, które podają główną odpowiedź na początku sekcji. BLUF mierzy, jak szybko Twoja treść dochodzi do sedna - i czy robi to w każdej sekcji, czy tylko w pierwszej.',
    chips: ['Skala 0–10', 'Ocena modelem językowym', 'Wejście: treść + CSI + profil typu treści'],
    whyHeading: 'Dlaczego BLUF jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy BLUF?',
    why: [
      'BLUF to skrót od Bottom Line Up Front: najważniejsza informacja idzie na sam początek. Systemy RAG, które stoją za ChatGPT, Perplexity i AI Overview, czytają stronę fragmentami. Tną ją na chunki po około 200–500 słów i oceniają każdy osobno, bez kontekstu reszty artykułu. Jeśli sekcja zaczyna się od „W dzisiejszych czasach coraz więcej firm...”, model widzi fragment, który nie odpowiada na nic - i sięga po konkurenta, który odpowiedź postawił w pierwszym zdaniu.',
      'W klasycznym SEO ta sama reguła stała za featured snippetami - do ramki trafiał akapit, który odpowiadał od razu. W GEO stawka jest wyższa, bo silnik generatywny cytuje fragment strony, zamiast do niej linkować: chunk bez odpowiedzi na początku wygląda dla modelu jak chunk bez odpowiedzi w ogóle.',
    ],
    how: {
      intro: [
        'Model dostaje treść pociętą na sekcje H2, Central Search Intent strony oraz profil typu treści z konsensusu SERP. Dla każdej sekcji izoluje pierwsze 50 słów i rozstrzyga, czy zawierają bezpośrednią odpowiedź na pytanie tej sekcji. Ocena całego wymiaru to udział sekcji z poprawnym BLUF-em, korygowany o obecność konkretów liczbowych.',
        'Reguła zależy od typu strony:',
      ],
      tables: [
        {
          head: ['Typ treści', 'Czym jest poprawny BLUF'],
          rows: [
            ['Artykuł', 'Odpowiedź z liczbą w pierwszych 50 słowach sekcji'],
            ['FAQ', 'Pierwsze zdanie po pytaniu to odpowiedź („Od 99 zł miesięcznie”), nie „To zależy od...”'],
            ['Listing / katalog', '1–2 zdania podsumowania nad listą, z konkretem typu „12 pozycji, najwyżej oceniana: X”'],
            ['Encyklopedia / definicja', 'Pierwsze zdanie definicyjne pod H2, jak otwarcie hasła w Wikipedii'],
            ['Narzędzie / kalkulator', 'Sekcja „co liczy” - wzór lub zakres wyniku w jednym zdaniu'],
          ],
        },
      ],
    },
    raises: [
      'Bezpośrednia odpowiedź w pierwszym zdaniu',
      'Minimum jedna liczba lub statystyka',
      'Konkretne terminy zamiast ogólników',
      'Dowód albo źródło zaraz po odpowiedzi',
      'Przy złożonym pytaniu odpowiedź rozpisana na 2–3 zdania z krokami, zamiast jednego zdania ogólnego',
    ],
    lowers: [
      'Wstępy budujące napięcie („W dzisiejszych czasach”, „Żyjemy w erze”)',
      'Zapowiedzi („W tym artykule przedstawimy”, „Zanim przejdziemy do”)',
      'Puste przymiotniki („najlepszy”, „kompleksowy”, „innowacyjny”)',
      'Ogólniki z ofert handlowych („wieloletnie doświadczenie”, „indywidualne podejście”)',
      'Asekuracja („zasadniczo”, „można powiedzieć, że”)',
      'Metakomentarze („warto zauważyć”, „należy podkreślić”)',
    ],
    swapTable: {
      caption: 'Ogólniki użyte tam, gdzie można podać liczbę, to osobna i mierzalna strata punktów',
      head: ['Zamiast', 'Napisz'],
      rows: [
        ['„wiele”', 'konkretną liczbę lub zakres („5–10”)'],
        ['„często”', '„w 40% przypadków”, „średnio co 3 dni”'],
        ['„szybko”', '„w ciągu 24 godzin”'],
        ['„znacząco”', '„o 30%”, „dwukrotnie”'],
        ['„większość”', '„7 na 10”, „ponad 70%”'],
        ['„tanio”', 'konkretną kwotę lub widełki'],
      ],
    },
    swapNote:
      'Gdy twardych danych nie ma, zostają zakresy („3–5 dni”), proporcje („1 na 3”) i porównania („dwa razy więcej niż średnia”).',
    report: [
      'Dla każdego nagłówka H2 pokazujemy jego pierwsze 50 słów wraz z werdyktem, czy odpowiedź faktycznie się w nich pojawia.',
      'Do sekcji bez BLUF-u dostajesz gotową propozycję pierwszego zdania - a dla sekcji, których w ogóle brakuje względem konkurencji z Top 10, także krótkie rozwinięcie. Wszystko w formacie Przed / Po, więc widzisz dokładnie, co zamienić.',
    ],
    recommendations: [
      {
        problem: 'Nad listą produktów nie ma podsumowania kategorii - pierwsze, co dostaje model, to nagłówek i licznik.',
        before: '# Myszki gamingowe (211)',
        after: 'Dodaj pod H1 dwa zdania: „W ofercie 211 myszek gamingowych w cenach od 89,99 zł do 769 zł, przewodowych i bezprzewodowych”.',
      },
      {
        problem: 'Sekcja otwiera się definicją ogólną - w pierwszych 50 słowach nie pojawia się żaden konkret.',
        before: 'Podstawowym elementem każdej myszki gamingowej jest sensor optyczny lub laserowy, który wpływa na dokładność śledzenia ruchu.',
        after: 'Zacznij od faktu: „Sensory optyczne dają 800–26 000 DPI, prędkość śledzenia 650 IPS i czas reakcji 1 ms”.',
      },
    ],
    related: [
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcja pozostaje zrozumiała bez kontekstu całości.' },
      { slug: 'gestosc-informacji', name: 'Gęstość informacji', desc: 'Ile faktów przypada na akapit.' },
      { slug: 'koszt-pozyskania', name: 'Koszt pozyskania', desc: 'Czy struktura strony ułatwia wycięcie odpowiedzi.' },
    ],
  },
};

export function dimensionSlugsPl(): string[] {
  return Object.keys(DIMENSIONS_PL);
}
