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

export type { DimensionData, DimTable, DimFaq, DimBeforeAfter } from './dimension-types';

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
        a: 'Może, ale ocena liczona jest wobec jednej głównej. Jeśli treść rozjeżdża się na dwie intencje naraz, zwykle żadnej nie realizuje w pełni - i to widać w wyniku. Skuteczniej jest rozdzielić ją na dwie strony niż domykać obie w jednym tekście.',
      },
    ],
    name: 'Zgodność z CSI',
    heading: 'Czym jest Central Search Intent (CSI)?',
    title: 'Czym jest Central Search Intent (CSI)?',
    description:
      'Czym jest Central Search Intent i jak CitationOne mierzy zgodność treści z intencją: predykat, poziom wiedzy odbiorcy, pokrycie atrybutów i luki względem Top 10 SERP.',
    lead:
      'Zgodność z CSI sprawdza, czy Twoja treść odpowiada na to pytanie, które użytkownik faktycznie zadał - a nie na sąsiednie. To wymiar nadrzędny: pozostałe mierzą jakość wykonania, ten mierzy, czy w ogóle piszesz o właściwej rzeczy.',
    chips: ['Skala 0-10', 'Ocena modelem językowym', 'Wejście: treść + CSI + benchmark Top 10 SERP'],
    whyHeading: 'Dlaczego zgodność z CSI jest ważna dla modeli AI?',
    howHeading: 'Jak liczymy zgodność z CSI?',
    why: [
      'Central Search Intent to rozłożone na części zapytanie: główna encja (o czym jest zapytanie), jej kontekst, konkretna rzecz, której użytkownik chce się dowiedzieć, oraz predykat - typ działania, jaki za tym stoi: informacyjny, komercyjny, transakcyjny, operacyjny, nawigacyjny lub lokalny.',
      'Modele AI nie cytują stron, które mijają się z intencją, nawet jeśli zawierają słowo kluczowe i są napisane bez zarzutu. Klasyczny rozjazd: zapytanie jest komercyjne („X czy Y - co wybrać”), a strona to recenzja samego X. Drugi typowy błąd to rozjazd poziomu: intencja należy do kogoś, kto dopiero zaczyna, a tekst od pierwszego akapitu zakłada wiedzę eksperta.',
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
            ['Realizacja predykatu', 'Czy treść robi to, czego oczekuje intencja: porównuje, instruuje, sprzedaje, definiuje. Wykrywa rozjazd typu „CSI komercyjne, treść informacyjna”.'],
            ['Założenie wiedzy', 'Czy poziom wywodu odpowiada odbiorcy intencji - tekst ekspercki pod zapytanie początkującego to realna strata.'],
            ['Pokrycie atrybutów', 'Ile cech tematu, których oczekuje intencja i pokazuje konkurencja, faktycznie omawiasz.'],
            ['Umiejscowienie atrybutów', 'Wyróżnik ma być w H1 lub leadzie, atrybut podstawowy w dedykowanej sekcji H2, atrybut niszowy w H3 lub FAQ.'],
          ],
        },
        {
          caption: 'W trybie z benchmarkiem każdy brakujący atrybut dostaje priorytet według tego, jak powszechny jest u konkurencji',
          head: ['Status', 'Co oznacza'],
          rows: [
            ['Pokryte', 'Atrybut jest u Ciebie i u konkurencji'],
            ['Luka krytyczna', 'Atrybut podstawowy u 7 z 10 konkurentów, u Ciebie go nie ma'],
            ['Luka wysoka', 'Atrybut podstawowy u 5-6 konkurentów, dodatkowo potwierdzony przez pytania z SERP'],
            ['Luka średnia i niska', 'Atrybut rzadki - obecny w pytaniach z SERP albo u pojedynczych konkurentów'],
            ['Nadmiarowe', 'Masz coś, czego nie ma nikt inny - kandydat na Twój wyróżnik'],
          ],
        },
      ],
    },
    raises: [
      'Treść realizuje predykat intencji, a nie sąsiedni („porównanie” to zestawienie, nie recenzja jednej opcji)',
      'Poziom wywodu dopasowany do odbiorcy zapytania',
      'Atrybuty podstawowe kategorii mają własne sekcje H2',
      'Twój wyróżnik widoczny w H1 lub leadzie, nie w ostatnim akapicie',
      'Pokryte atrybuty, które konkurencja z Top 10 uznaje za obowiązkowe',
    ],
    lowers: [
      'Rozjazd predykatu - intencja komercyjna, treść czysto informacyjna',
      'Zakładanie wiedzy eksperckiej przy zapytaniu dla początkujących',
      'Brak atrybutu, który ma 7 z 10 konkurentów',
      'Wyróżnik schowany na końcu strony',
      'Odpowiedź na pytanie sąsiednie zamiast na zadane',
    ],
    report: [
      'Dostajesz werdykt zgodności wraz z uzasadnieniem: który predykat wykryliśmy, czy treść go realizuje i gdzie rozjeżdża się poziom wiedzy.',
      'Do tego pełna mapa atrybutów - pokryte, brakujące z priorytetem według frekwencji u konkurencji, oraz nadmiarowe, czyli te, które masz tylko Ty. Problemy są ustawione według tego, ilu konkurentów dany element posiada, więc lista zaczyna się od rzeczy, których brak najbardziej kosztuje.',
      'Osobno pokazujemy luki formatowe: jeśli 8 konkurentów tłumaczy temat tabelą lub FAQ, a Ty prozą, zobaczysz to jako konkretną rekomendację.',
    ],
    related: [
      { slug: 'graf-wiedzy', name: 'Graf wiedzy', desc: 'Z czego zbudowane są atrybuty, których pokrycie tu mierzymy.' },
      { slug: 'pokrycie-fan-out', name: 'Pokrycie Fan-Out i AIO', desc: 'Na ile sub-pytań wokół intencji odpowiada strona.' },
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
      'Graf wiedzy rozkłada treść na trójki Encja - Atrybut - Wartość: o czym piszesz, jaką cechę tej rzeczy opisujesz i co konkretnie o niej mówisz. Wymiar sprawdza, ile Twoich zdań daje się rozłożyć na takie fakty, a ile zostaje samym opisem.',
    chips: ['Skala 0-10', 'Model językowy + sygnały algorytmiczne', 'Wejście: treść + benchmark Top 10 SERP'],
    whyHeading: 'Dlaczego graf wiedzy jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy graf wiedzy?',
    why: [
      'Wyszukiwarki od lat nie operują na słowach kluczowych, tylko na encjach i faktach o nich - trójka Encja-Atrybut-Wartość to podstawowa struktura każdego grafu wiedzy. „Kredyt hipoteczny” to encja, „oprocentowanie” to jej atrybut, „7,2%” to wartość. Dopiero komplet stanowi fakt, który da się zapamiętać, zestawić z innym źródłem i zacytować.',
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
      'Dostajesz matrycę faktów: każdy atrybut z Twoją wartością obok informacji, ilu konkurentów z Top 10 go opisuje. Luki są oznaczone i uszeregowane według tego, jak powszechne są u innych, a Twoje wyróżniki wyróżnione osobno.',
      'Do tego graf encji z typami i relacjami między nimi. Relacje są dodatkowo weryfikowane algorytmicznie - sprawdzamy, czy dwie encje faktycznie występują razem w zdaniach Twojej treści, czy pojawiają się razem w pytaniach z SERP i u ilu konkurentów ta sama para jest połączona. Sam graf relacji nie wpływa na ocenę wymiaru; służy do zobaczenia, gdzie wiedza jest spójna, a gdzie urywa się na pojedynczych wzmiankach.',
      'Osobno, jako ostrzeżenie bez wpływu na wynik, pokazujemy sprzeczności: tę samą encję i atrybut opisane różnymi wartościami. Dla modelu jedna sprzeczna liczba potrafi zdyskwalifikować całą stronę jako źródło.',
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
        q: 'Czy muszę odpowiedzieć na wszystkie?',
        a: 'Nie, priorytet mają te potwierdzone przez wyszukiwarkę. Pytanie, które Google sam pokazuje w „Podobnych pytaniach”, jest pewną luką; pytanie przewidziane przez model to hipoteza i waży mniej.',
      },
      {
        q: 'Czy sekcja FAQ załatwia sprawę?',
        a: 'Częściowo. FAQ dobrze domyka pytania krótkie i faktograficzne, ale wątek wymagający rozwinięcia lepiej działa jako pełna sekcja H2 z odpowiedzią, danymi i kontekstem.',
      },
    ],
    name: 'Pokrycie Fan-Out i AIO',
    heading: 'Czym jest Query Fan-Out w AI Search?',
    title: 'Czym jest Query Fan-Out w AI Search?',
    description:
      'Jak silniki AI rozbijają jedno pytanie na kilkanaście sub-zapytań i jak CitationOne mierzy, ile z nich pokrywa Twoja treść - z danymi z AI Overview i pytań z SERP.',
    lead:
      'Fan-Out to rozbicie jednego zapytania na kilkanaście pytań pobocznych, które silnik AI rozwiązuje w tle, zanim ułoży odpowiedź. Ten wymiar mierzy, na ile z nich odpowiada Twoja strona - bo cytowanie zdobywa się na pytaniach pobocznych, nie na głównym.',
    chips: ['Skala 0-10', 'Dwa przebiegi modelu + dane z SERP', 'Wejście: CSI + pytania z SERP + AI Overview'],
    whyHeading: 'Dlaczego pokrycie Fan-Out jest ważne dla modeli AI?',
    howHeading: 'Jak liczymy pokrycie Fan-Out i AIO?',
    why: [
      'Użytkownik pyta „jak wybrać pompę ciepła”, a model nie szuka tej frazy. Rozkłada ją na pytania składowe: jaka moc do jakiego metrażu, ile kosztuje montaż, jaka jest sprawność przy mrozie, czy potrzebne jest pozwolenie. Każde z nich pobiera osobno i dopiero z odpowiedzi składa jedną wypowiedź.',
      'Stąd bierze się różnica między SEO a GEO. W klasycznym wyszukiwaniu wystarczyło wygrać jedno zapytanie, żeby zdobyć kliknięcie. W AI Search wygrywasz tyle razy, na ile pytań pobocznych masz gotową odpowiedź - strona, która wyczerpuje temat tylko w głównym wątku, zostanie zacytowana raz albo wcale, mimo świetnej pozycji w SERP.',
      'To działa też w drugą stronę: pytania poboczne są tańsze do zdobycia niż główna fraza. Konkurencja walczy o nagłówek, a luka najczęściej siedzi w pytaniu, którego nikt nie opisał.',
    ],
    how: {
      intro: [
        'Na podstawie intencji strony model rozkłada zapytanie na kilkanaście sub-zapytań, a robi to w dwóch niezależnych przebiegach o różnej „śmiałości” i scala wyniki - jeden przebieg zbyt mocno zależy od losowości modelu. Do tego dokładamy prawdziwe pytania z SERP: sekcję „Podobne pytania” i powiązane wyszukiwania. Na koniec sprawdzamy, na które z tych pytań Twoja treść faktycznie odpowiada.',
        'Zestaw jest oczyszczany z homonimów - jeśli fraza ma drugie znaczenie (klasyczny przypadek: „schody” jako konstrukcja i jako tytuł serialu), pytania z tej drugiej dziedziny są odrzucane, zamiast produkować rekomendacje o niczym.',
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
            ['Potwierdzone przez SERP', 'Google sam pokazuje je w „Podobnych pytaniach” - to nie jest hipoteza, tylko realne zapytanie'],
            ['Obecne w AI Overview', 'Wątek pojawia się w syntezie AI dla tej frazy'],
            ['Przewidziane przez model', 'Wynika z intencji, ale nie ma potwierdzenia w danych SERP'],
            ['Potwierdzona luka', 'Pytanie jest w SERP, a Twoja treść go nie porusza - to obniża ocenę wymiaru'],
          ],
        },
      ],
    },
    raises: [
      'Sekcje H2 odpowiadające na konkretne pytania poboczne, nie na warianty głównej frazy',
      'Pokryte pytania z sekcji „Podobne pytania” w SERP',
      'Odpowiedzi na pytania weryfikacyjne - liczby, daty, warunki, które model musi potwierdzić',
      'FAQ zbudowane z realnych pytań, a nie z fraz pod wyszukiwarkę',
      'Wyczerpanie wątków pobocznych, których konkurencja nie tknęła',
    ],
    lowers: [
      'Cała treść krąży wokół głównego zapytania',
      'Niepokryte pytania, które Google sam pokazuje w SERP',
      'Wątki poruszone jednym zdaniem, bez odpowiedzi nadającej się do zacytowania',
      'Rozbudowany wstęp i podsumowanie zamiast sekcji odpowiadających na osobne pytania',
    ],
    report: [
      'Dostajesz listę pytań pobocznych z oznaczeniem, które z nich Twoja treść pokrywa, a które nie - wraz z informacją, skąd pytanie pochodzi: czy jest potwierdzone przez SERP, czy przewidziane przez model.',
      'Niepokryte pytania potwierdzone przez wyszukiwarkę trafiają na górę listy rekomendacji, bo to najtańsze do zamknięcia luki: wiadomo, że ktoś je zadaje, i wiadomo, że u Ciebie odpowiedzi nie ma.',
      'Do tego pokrycie AI Overview dla Twojej frazy - czy synteza Google w ogóle się pojawia i jakie wątki porusza.',
    ],
    related: [
      { slug: 'zgodnosc-z-csi', name: 'Zgodność z CSI', desc: 'Intencja, z której rozkładane są pytania poboczne.' },
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcja z odpowiedzią broni się w oderwaniu od reszty.' },
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
        a: 'Użyj zakresów, proporcji i porównań. „3-5 dni roboczych”, „1 na 4 zgłoszenia”, „dwa razy więcej niż średnia” liczą się jako konkret, bo są sprawdzalne. Bezwartościowe są dopiero określenia, których nie da się zweryfikować.',
      },
      {
        q: 'Czy wynik zależy od tego, co uzna model?',
        a: 'Nie. Udział zdań z faktem liczy algorytm na wzorcach - liczba, data, jednostka, kwota, nazwa własna. Model językowy dokłada tylko przykłady zdań z Twojego tekstu po obu stronach, żeby było widać, o które akapity chodzi.',
      },
    ],
    beforeAfter: {
      intro: 'Dwa zdania o tej samej treści - różni je wyłącznie to, ile z nich da się sprawdzić.',
      before: 'Nasze panele charakteryzują się wysoką sprawnością i nowoczesną technologią, a montaż przebiega szybko i sprawnie.',
      after: 'Panele mają sprawność 21,3% i 25-letnią gwarancję mocy. Montaż na dachu skośnym zajmuje jeden dzień.',
    },
    name: 'Gęstość informacji',
    heading: 'Czym jest gęstość informacji w treści?',
    title: 'Czym jest gęstość informacji w treści?',
    description:
      'Stosunek zdań z faktem do zdań wypełniających. Jak CitationOne liczy gęstość informacji, jakie sygnały ją podnoszą i obniżają oraz jak zamienić ogólniki na konkrety.',
    lead:
      'Gęstość informacji to udział zdań niosących weryfikowalny fakt w całości tekstu. Nie chodzi o długość ani o styl - chodzi o to, ile zdań zostałoby, gdyby usunąć wszystko, czego nie da się sprawdzić.',
    chips: ['Skala 0-10', 'Wyliczenie algorytmiczne + przykłady od modelu', 'Wejście: treść'],
    whyHeading: 'Dlaczego gęstość informacji jest ważna dla modeli AI?',
    howHeading: 'Jak liczymy gęstość informacji?',
    why: [
      'Model odpowiadający użytkownikowi ma ograniczone miejsce na cytat. Wybierze fragment, w którym na jedno zdanie przypada najwięcej sprawdzalnej treści - liczba, data, jednostka, nazwa własna. Akapit zbudowany z „wielu firm”, „nowoczesnych rozwiązań” i „szerokiego doświadczenia” nie daje się zacytować, bo nie ma w nim twierdzenia, które można potwierdzić lub obalić.',
      'To odwrócenie starego odruchu SEO. Kiedyś objętość pomagała - dłuższy tekst rankował lepiej, więc opłacało się rozciągać akapity. W GEO liczy się odwrotna proporcja: rozwodnienie faktów obniża szansę na cytowanie, nawet jeśli fakty w tekście są. Ten sam materiał zapisany o połowę krócej wypada lepiej.',
    ],
    how: {
      intro: [
        'Podstawa jest algorytmiczna, nie uznaniowa: dzielimy tekst na zdania i sprawdzamy wzorcami, które z nich zawierają fakt - liczbę, datę, jednostkę, kwotę, nazwę własną lub konkretne twierdzenie. Wynik to udział takich zdań w całości, przeskalowany do dziesięciostopniowej oceny.',
        'Wzór: zdania z faktem podzielone przez wszystkie zdania, razy 10. Model językowy nie liczy tego wyniku - dokłada do niego przykłady, czyli konkretne zdania z Twojego tekstu po jednej i po drugiej stronie.',
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
      'Akapity wprowadzające bez ani jednego sprawdzalnego twierdzenia',
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
      'Jeśli twardych danych nie masz, działają zakresy, proporcje i porównania - „3-5 dni”, „1 na 4 zgłoszenia”, „dwa razy więcej niż średnia”.',
    report: [
      'Dostajesz udział zdań faktycznych w treści wraz z oceną, a do tego dwie listy wyciągnięte z Twojego tekstu: zdania uznane za fakty i zdania uznane za wypełnienie. To nie są przykłady ogólne, tylko Twoje własne zdania - widzisz dokładnie, które akapity ciągną wynik w dół.',
      'Rekomendacje idą w formacie Przed / Po, z propozycją konkretnego przepisania zdania.',
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
        a: 'Tak, i to konkretnie. Sekcja trafia do modelu bez sąsiednich fragmentów, więc odwołanie wskazuje na coś, czego w danym momencie nie ma. Taki fragment przestaje nadawać się do zacytowania, nawet jeśli merytorycznie jest najlepszy na stronie.',
      },
      {
        q: 'Czy cytowalność sekcji wpływa na ocenę wymiaru?',
        a: 'Nie, to metryka uzupełniająca pokazywana obok wyniku. Mówi, które sekcje mają największą szansę zostać wybrane jako źródło, ale nie wchodzi do oceny końcowej.',
      },
    ],
    beforeAfter: {
      intro: 'Zdanie otwierające sekcję: pierwsze wymaga poprzedniego akapitu, drugie broni się samo.',
      before: 'Jak wspomniano wyżej, ten parametr jest kluczowy przy wyborze urządzenia.',
      after: 'Współczynnik COP decyduje o koszcie ogrzewania: pompa z COP 4,5 zużywa o 25% mniej prądu niż model z COP 3,6.',
    },
    name: 'Optymalizacja chunków',
    heading: 'Czym są chunki treści w systemach RAG?',
    title: 'Czym są chunki treści w systemach RAG?',
    description:
      'Silniki AI tną stronę na fragmenty i oceniają każdy osobno. Jak CitationOne mierzy autonomiczność sekcji, długość chunków per typ treści i cytowalność fragmentów.',
    lead:
      'Chunk to fragment strony, który silnik AI pobiera i ocenia w oderwaniu od reszty - najczęściej pojedyncza sekcja H2 lub H3. Ten wymiar sprawdza, czy Twoje sekcje bronią się samodzielnie, czy rozumie je dopiero ktoś, kto przeczytał całość.',
    chips: ['Skala 0-10', 'Model językowy + sygnały algorytmiczne', 'Wejście: treść + CSI + profil typu treści'],
    whyHeading: 'Dlaczego optymalizacja chunków jest ważna dla modeli AI?',
    howHeading: 'Jak liczymy optymalizację chunków?',
    why: [
      'Wyszukiwarka generatywna nie wczytuje całej strony do odpowiedzi. Indeksuje ją pociętą na fragmenty i przy pytaniu użytkownika pobiera te, które wyglądają na najtrafniejsze. Twój fragment trafia do modelu bez tytułu artykułu, bez poprzedniej sekcji i bez wprowadzenia.',
      'Dlatego zdanie „jak wspomniano wyżej, ten parametr jest kluczowy” jest w GEO stratą - poza kontekstem nie znaczy nic i nie da się go zacytować. To samo dotyczy sekcji, która nigdy nie powtarza tematu, o którym mówi, bo posługuje się zaimkiem odsyłającym do nagłówka sprzed dwóch ekranów.',
      'Odwrotnie: sekcja napisana jak samodzielna odpowiedź może zostać zacytowana nawet wtedy, gdy reszta strony jest przeciętna. Chunk jest jednostką konkurowania w AI Search - nie strona.',
    ],
    how: {
      intro: [
        'Model sprawdza każdą sekcję osobno pod kątem czterech rzeczy: czy zaczyna się od odpowiedzi, czy powtarza główny temat co najmniej dwa razy, czy nie odsyła do innych fragmentów („powyżej”, „jak już pisaliśmy”) i czy ma długość adekwatną do typu treści.',
        'Ostatnie kryterium nie jest jednym progiem dla wszystkiego - sekcja FAQ ma być krótka, hasło encyklopedyczne może być długie:',
      ],
      tables: [
        {
          caption: 'Optymalna długość sekcji zależy od typu strony',
          head: ['Typ treści', 'Długość sekcji'],
          rows: [
            ['Artykuł', '200-500 słów'],
            ['Hasło encyklopedyczne', '400-1500 słów'],
            ['Porównanie', '150-400 słów'],
            ['Landing, listing, produkt', '80-300 słów'],
            ['Narzędzie, kalkulator', '50-200 słów'],
            ['FAQ', '30-150 słów'],
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
      'Dostajesz ocenę autonomiczności sekcja po sekcji, wraz ze wskazaniem tych, które bez kontekstu całości przestają się bronić.',
      'Do tego dwie metryki uzupełniające, liczone algorytmicznie i pokazywane obok wyniku, ale nie wliczane do oceny: cytowalność poszczególnych sekcji - czyli szansa, że akurat ta zostanie wybrana jako źródło, na którą składa się dopasowanie nagłówka do intencji, samodzielność pierwszego zdania, udział zdań oznajmujących, pozycja na stronie i zagnieżdżenie nagłówka - oraz gęstość cytowalnych fragmentów w całym tekście, czyli jaki procent słów siedzi w kawałkach nadających się do zacytowania.',
      'Osobno pokazujemy nagłówki powtarzające się u konkurencji z Top 10, z zaznaczeniem, których nie masz - to gotowa lista sekcji do dopisania.',
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
      'Koszt pozyskania mierzy, ile pracy trzeba wykonać, żeby wyjąć ze strony konkretną odpowiedź. Im czytelniejsza struktura - hierarchia nagłówków, tabele, listy, wyróżnienia - tym koszt niższy, a ocena wyższa.',
    chips: ['Skala 0-10', 'Punktowana checklista struktury', 'Wejście: treść + struktura HTML'],
    whyHeading: 'Dlaczego koszt pozyskania jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy koszt pozyskania?',
    why: [
      'Model, który ma zbudować odpowiedź, przetwarza wiele źródeł naraz. Strona, z której odpowiedź trzeba wyłuskać z dziesięciu akapitów ciągłego tekstu, jest droższa w obsłudze niż konkurent, który tę samą informację podał w tabeli. Przy porównywalnej treści wygrywa ta tańsza.',
      'Ten sam mechanizm działa po stronie człowieka - struktura, która pomaga czytelnikowi zeskanować stronę, pomaga też modelowi znaleźć fragment do zacytowania. To jeden z niewielu wymiarów, w którym optymalizacja pod AI i pod użytkownika to dokładnie ta sama robota.',
    ],
    how: {
      intro: [
        'To checklista punktowa, a nie ocena uznaniowa. Sprawdzamy obecność elementów struktury i sumujemy punkty do maksymalnie dziesięciu:',
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
      'Dane rozsypane po zdaniach zamiast zebrane w tabeli',
      'Ogólnikowy wstęp przed pierwszą konkretną informacją',
      'Pogrubienia rozdane po całym tekście - przestają cokolwiek znaczyć',
    ],
    report: [
      'Dostajesz checklistę z zaznaczeniem, które elementy struktury masz, a których brakuje. Każdy niespełniony punkt to gotowa poprawka - najczęściej kilkuminutowa, bo nie wymaga pisania nowej treści, tylko przeorganizowania istniejącej.',
      'Do tego wykryte usterki hierarchii nagłówków: brak H1, kilka H1 albo sekcje H3 bez nadrzędnego H2.',
    ],
    related: [
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcje bronią się samodzielnie.' },
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
        a: 'Tyle, ile realnych luk pokazuje raport, zaczynając od góry listy. Terminy są uszeregowane według tego, ilu konkurentów ich używa i jak mocno wiążą się z tematem, więc pierwsze pozycje dają najwięcej.',
      },
      {
        q: 'Skąd bierze się lista brakujących terminów?',
        a: 'Z treści konkurencji z Top 10 dla Twojej frazy. Domena, która zajmuje w wynikach kilka pozycji, waży mniej, żeby jeden serwis nie narzucał całego słownika.',
      },
    ],
    name: 'TF-IDF',
    heading: 'Czym jest TF-IDF w audycie treści?',
    title: 'Czym jest TF-IDF w audycie treści?',
    description:
      'Porównanie terminologii Twojej strony z korpusem Top 10 SERP. Jak CitationOne znajduje brakujące terminy specjalistyczne i podpowiada kontekst, w jakim ich użyć.',
    lead:
      'TF-IDF porównuje słownictwo Twojej treści ze słownictwem konkurencji z Top 10. Interesują nas terminy rzadkie i specjalistyczne - to one świadczą o znajomości tematu, a nie słowa, które padają wszędzie.',
    chips: ['Skala 0-10', 'Analiza statystyczna + model językowy', 'Wejście: treść + korpus Top 10 SERP'],
    whyHeading: 'Dlaczego TF-IDF jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy TF-IDF?',
    why: [
      'Terminologia jest najtańszym dowodem kompetencji. Tekst o kredycie hipotecznym, w którym nie pada „wskaźnik LTV”, „zdolność kredytowa” ani „marża banku”, opisuje temat z zewnątrz - i tak właśnie wygląda dla modelu porównującego go z dziesięcioma stronami, które tych pojęć używają.',
      'W GEO ma to dodatkowe znaczenie, bo brakujący termin to zwykle brakujący wątek. Jeśli dziewięciu konkurentów pisze o czymś, czego u Ciebie nie ma, to nie jest kwestia stylu - to luka merytoryczna, którą model zobaczy przy składaniu odpowiedzi.',
    ],
    how: {
      intro: [
        'Z treści konkurencji budujemy korpus i wyznaczamy terminy o wysokiej wartości informacyjnej: specjalistyczne, branżowe, często wielowyrazowe. Słowa funkcyjne i ogólne rzeczowniki są odrzucane. Ocena to stosunek terminów obecnych u Ciebie do oczekiwanych, przeskalowany do dziesięciu.',
        'Wzór: terminy specjalistyczne obecne w treści podzielone przez terminy oczekiwane, razy 10.',
        'Brakujące terminy nie są szeregowane po samej częstotliwości. Liczy się też to, jak silnie termin wiąże się z głównym tematem strony - dzięki temu na górze listy nie ląduje słowo popularne u konkurencji, ale tematycznie odległe od Twojego. Dodatkowo domena, która w Top 10 zajmuje kilka pozycji, waży mniej, żeby jeden serwis nie narzucał całego słownika.',
      ],
      tables: [
        {
          caption: 'Które terminy się liczą',
          head: ['Rodzaj terminu', 'Znaczenie dla oceny'],
          rows: [
            ['Specjalistyczny, branżowy, wielowyrazowy', 'Wysoka wartość - to on świadczy o znajomości tematu'],
            ['Ogólny rzeczownik, przymiotnik generyczny', 'Bez znaczenia - występuje w każdym tekście'],
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
      'Przy terminach, które u konkurencji występują w stałym towarzystwie innego pojęcia, podpowiadamy ten kontekst - rekomendacja brzmi wtedy „dodaj termin X w kontekście Y, tak łączy je 6 z 10 konkurentów”, a nie samo „dodaj X”.',
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
    beforeAfter: {
      intro: 'Poprawka jest czysto składniowa - ten sam fakt, ale z jawnym wykonawcą.',
      before: 'Kredyt hipoteczny jest udzielany na okres do 30 lat, a decyzja jest podejmowana w ciągu 21 dni.',
      after: 'Bank udziela kredytu hipotecznego na maksymalnie 30 lat i podejmuje decyzję w ciągu 21 dni.',
    },
    name: 'Role semantyczne',
    heading: 'Czym są role semantyczne (SRL) w treści?',
    title: 'Czym są role semantyczne (SRL) w treści?',
    description:
      'Czy główny temat strony jest wykonawcą czynności, czy tylko jej przedmiotem. Jak CitationOne mierzy role semantyczne i dlaczego strona bierna szkodzi w AI Search.',
    lead:
      'Role semantyczne sprawdzają, kim jest główny temat w Twoich zdaniach: wykonawcą czynności czy jej przedmiotem. „Bank udziela kredytu” i „kredyt jest udzielany” niosą ten sam fakt, ale tylko pierwsze zdanie jednoznacznie wskazuje, kto go wykonuje.',
    chips: ['Skala 0-10', 'Ocena modelem językowym', 'Wejście: treść + główna encja z CSI'],
    whyHeading: 'Dlaczego role semantyczne są ważne dla modeli AI?',
    howHeading: 'Jak liczymy role semantyczne?',
    why: [
      'Model wyciąga z tekstu fakty w postaci „kto - co robi - z czym”. Zdanie w stronie biernej z pominiętym wykonawcą zostawia w tej strukturze dziurę, którą model musi zgadywać albo pominąć. Zdanie w stronie czynnej daje komplet i nadaje się do zacytowania bez przeróbek.',
      'Drugi efekt dotyczy widoczności. Jeśli główny temat strony konsekwentnie występuje jako wykonawca, model wiąże z nim atrybuty i działania - strona zaczyna być „o czymś” w sensie encji, a nie tylko zawierać słowa na ten temat. Rozmyta perspektywa daje rozmyte powiązania.',
    ],
    how: {
      intro: [
        'Sprawdzamy, w jakiej roli występuje główna encja strony w kolejnych zdaniach: jako wykonawca czynności, jako jej przedmiot, czy jest nieobecna. Rola wykonawcy liczy się w pełni, rola przedmiotu połowicznie, nieobecność wcale. Ocena to suma zebranych punktów podzielona przez maksymalną możliwą, przeskalowana do dziesięciu.',
        'Punkt odniesienia: dobrze napisana strona ma główny temat w roli wykonawcy w ponad 70% zdań, w których w ogóle występuje.',
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
      'Dostajesz udział zdań, w których główny temat jest wykonawcą, oraz listę zdań do przepisania - z gotową propozycją w stronie czynnej.',
      'To zwykle najszybszy do wdrożenia wymiar: poprawki są mechaniczne i nie wymagają dopisywania nowej treści.',
    ],
    related: [
      { slug: 'gestosc-informacji', name: 'Gęstość informacji', desc: 'Czy zdanie w ogóle niesie sprawdzalny fakt.' },
      { slug: 'graf-wiedzy', name: 'Graf wiedzy', desc: 'Jak fakty łączą się w encje, atrybuty i wartości.' },
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcja broni się bez kontekstu.' },
    ],
  },

  'effort-score': {
    slug: 'effort-score',
    faq: [
      {
        q: 'Czy dłuższy tekst zawsze podnosi wynik?',
        a: 'Nie, progiem jest średnia z Top 10 dla Twojej frazy, a nie sztywna liczba słów. Na frazach, gdzie konkurencja pisze zwięźle, rozdmuchany tekst nic nie daje - a traci na innych wymiarach.',
      },
      {
        q: 'Dlaczego audyt nie widzi moich obrazów i wideo?',
        a: 'Bo te sygnały odczytujemy z kodu strony. Przy audycie treści wklejonej z edytora zamiast z adresu URL nie ma skąd wziąć informacji o obrazach, wideo ani dacie publikacji.',
      },
      {
        q: 'Czy brak spisu treści zawsze obniża wynik?',
        a: 'Nie. Sprawdzamy go tylko przy artykułach i hasłach encyklopedycznych. Na listingu, karcie produktu czy landingu ten punkt jest pomijany i nie zmniejsza puli, z której liczy się ocena.',
      },
    ],
    name: 'Effort Score',
    heading: 'Czym jest Effort Score w audycie treści?',
    title: 'Czym jest Effort Score w audycie treści?',
    description:
      'Algorytmiczna checklista kompletności strony: długość względem konkurencji, obrazy, wideo, tabele, listy, hierarchia nagłówków, spis treści i widoczna data aktualizacji.',
    lead:
      'Effort Score mierzy wysiłek włożony w stronę: czy ma to, co ma porządnie zrobiona treść w tym temacie - odpowiednią długość, materiały wizualne, tabele, listy, czytelną hierarchię i widoczną datę. Liczy go wyłącznie algorytm, bez udziału modelu językowego.',
    chips: ['Skala 0-10', 'W 100% algorytmiczny - zero wywołań modelu', 'Wejście: treść + struktura HTML + średnia Top 10'],
    whyHeading: 'Dlaczego Effort Score jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy Effort Score?',
    why: [
      'Sygnały kompletności są dla wyszukiwarek najstarszym przybliżeniem jakości: strona z tabelą, materiałem wizualnym i aktualną datą częściej pochodzi od kogoś, kto temat faktycznie przerobił, niż strona złożona z pięciu akapitów. To nie dowód jakości, ale mocna poszlaka - i tak jest traktowana.',
      'Praktyczna wartość tego wymiaru jest inna niż pozostałych: to lista rzeczy, które da się naprawić dziś, bez przepisywania treści. Brakujący spis treści, brak daty aktualizacji, trzy obrazy zamiast czterech - każdy taki punkt to poprawka na kwadrans.',
    ],
    how: {
      intro: [
        'Checklista obejmuje do jedenastu kryteriów. Część jest bezwzględna, część odnosi się do konkurencji - próg długości to średnia z Top 10 dla Twojej frazy, a nie sztywna liczba słów.',
        'Zestaw kryteriów dopasowuje się do typu strony: spis treści sprawdzamy tylko dla artykułów i haseł encyklopedycznych, a widoczną datę pomijamy na landingach, gdzie stara data szkodzi konwersji. Pominięte kryterium nie obniża wyniku - maksymalna pula punktów zmniejsza się razem z nim.',
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
      'Popsuta hierarchia nagłówków',
    ],
    report: [
      'Dostajesz checklistę z odhaczonymi i brakującymi pozycjami, a przy każdej brakującej - wskazówkę, co dokładnie dodać. Obok stoi porównanie formatów z konkurencją: jeśli sześciu konkurentów ma tabelę, a Ty nie, zobaczysz to wprost.',
      'Osobno pokazujemy świeżość: datę publikacji, datę aktualizacji i wiek treści w miesiącach.',
      'Jedno ograniczenie warto znać: obrazy, wideo i data są odczytywane z kodu strony, więc przy audycie treści wklejonej z edytora zamiast z adresu URL te kryteria nie mają skąd się wziąć.',
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
        a: 'Nie w sensie pojedynczego parametru. To zestaw kryteriów jakości, którymi Google opisuje dobrą treść, a modele generatywne kierują się tym samym przy wyborze źródła. My mierzymy sygnały, które faktycznie są na stronie.',
      },
      {
        q: 'Czy wystarczy dopisać „autor: redakcja”?',
        a: 'Nie. Sygnał uznajemy tylko wtedy, gdy ma pokrycie w treści - podpis bez kwalifikacji, afiliacji ani śladu doświadczenia niczego nie zmienia. Zasada jest celowo twarda, żeby audyt nie przyznawał kompetencji, których strona nie deklaruje.',
      },
      {
        q: 'Jakie źródła liczą się najbardziej?',
        a: 'Rozpoznawalne instytucje i publikacje branżowe, a przy tym różnorodne. Pięć odnośników do pięciu wiarygodnych domen waży więcej niż pięć odesłań do jednego serwisu.',
      },
    ],
    name: 'E-E-A-T',
    heading: 'Czym jest E-E-A-T i jak się je mierzy?',
    title: 'Czym jest E-E-A-T i jak się je mierzy?',
    description:
      'Doświadczenie, ekspertyza, autorytet i wiarygodność w treści. Jakie sygnały CitationOne wykrywa, jak weryfikuje źródła i dlaczego każdy sygnał wymaga cytatu z tekstu.',
    lead:
      'E-E-A-T to cztery osobno oceniane składowe: doświadczenie, ekspertyza, autorytet i wiarygodność. Każda dostaje własną ocenę w skali dziesięciopunktowej na podstawie sygnałów faktycznie obecnych w treści i w kodzie strony.',
    chips: ['Cztery oceny 0-10', 'Wykrywanie algorytmiczne + weryfikacja modelem', 'Wejście: treść + kod strony + linki zewnętrzne'],
    whyHeading: 'Dlaczego E-E-A-T jest ważne dla modeli AI?',
    howHeading: 'Jak liczymy E-E-A-T?',
    why: [
      'Silnik generatywny bierze na siebie odpowiedzialność za odpowiedź, której nikt już nie zweryfikuje klikając w link. Dlatego przy wyborze źródła premiuje te, przy których widać, kto pisze, na czym opiera twierdzenia i kiedy ostatnio je sprawdzał. Anonimowy tekst bez źródeł jest ryzykiem, którego model unika.',
      'To jedyny wymiar, w którym poprawa nie polega na przepisaniu zdań. Bio autora z kwalifikacjami, przypis do badania, data aktualizacji, kontakt - to elementy, które albo są, albo ich nie ma.',
    ],
    how: {
      intro: [
        'Najpierw algorytmicznie wykrywamy sygnały w treści i w kodzie strony, a dopiero potem model je weryfikuje i ocenia siłę. Zasada jest twarda: każdy uznany sygnał musi mieć oparcie w konkretnym fragmencie tekstu - sygnał bez cytatu jest odrzucany, żeby model nie dopisał Ci kompetencji, których strona nie deklaruje.',
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
            ['Poparcie twierdzeń', 'Czy ryzykowne twierdzenia - statystyki, daty, wyniki badań - mają źródło w tym samym akapicie'],
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
      'Do tego lista twierdzeń wysokiego ryzyka bez źródła w akapicie. To najczęstsza i najtańsza poprawka: liczba, która już w tekście jest, potrzebuje wyłącznie przypisu.',
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
        a: 'Bo mierzy strategię, a nie jakość wykonania. Treść może być bez zarzutu i mieć niską wartość dodaną - to sygnał, żeby dołożyć coś własnego, a nie żeby poprawiać tekst.',
      },
      {
        q: 'Jak najszybciej ją podnieść?',
        a: 'Własnymi danymi. Wynik testu, statystyka z Twojej bazy, studium przypadku z liczbami albo zestawienie, którego nikt nie zrobił - każdy z tych elementów jest z definicji nieobecny u konkurencji.',
      },
      {
        q: 'Czy niska wartość dodana oznacza słabe pokrycie tematu?',
        a: 'Nie, to dwie różne rzeczy. Pokrycie tematu mierzą inne wymiary; tutaj chodzi wyłącznie o to, ile z Twojej treści nie powtarza się w pozostałych wynikach.',
      },
    ],
    name: 'Wartość dodana',
    heading: 'Czym jest Information Gain w treści?',
    title: 'Czym jest Information Gain w treści?',
    description:
      'Ile nowego wnosi Twoja treść względem Top 10 SERP. Cztery sygnały unikalności: własne twierdzenia, unikalne fakty, terminy nieobecne u konkurencji i rzadkie formaty.',
    lead:
      'Wartość dodana odpowiada na pytanie, którego nie zadaje żaden inny wymiar: co jest u Ciebie, czego nie ma u nikogo w Top 10. Wynik podajemy w skali od 0 do 100 i ma on charakter informacyjny - nie wchodzi do oceny końcowej.',
    chips: ['Skala 0-100', 'Nie wpływa na ocenę końcową', 'Wejście: treść + korpus Top 10 SERP'],
    whyHeading: 'Dlaczego wartość dodana jest ważna dla modeli AI?',
    howHeading: 'Jak liczymy wartość dodaną?',
    why: [
      'Silnik generatywny nie potrzebuje dziesięciu źródeł mówiących to samo. Buduje odpowiedź z kilku, a wybiera te, które dokładają coś, czego nie ma w pozostałych. Treść poprawna, ale w całości pokrywająca się z konkurencją, jest dla niego wymienna - każde inne źródło zrobi tę samą robotę.',
      'To odwrotność strategii „napiszmy to, co pierwsza dziesiątka, tylko lepiej”. Lepiej napisany duplikat nadal jest duplikatem. Przewagę daje własna liczba, własny przypadek, własne zestawienie.',
    ],
    how: {
      intro: [
        'Porównujemy Twoją treść z korpusem konkurencji z Top 10 i liczymy cztery niezależne sygnały, które składają się na wynik:',
      ],
      tables: [
        {
          caption: 'Cztery sygnały unikalności',
          head: ['Sygnał', 'Co oznacza'],
          rows: [
            ['Unikalne twierdzenia', 'Konkretne twierdzenia faktowe z Twojego tekstu, których nie ma u żadnego konkurenta'],
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
    beforeAfter: {
      intro: 'Ten sam akapit przed poprawką i po niej - bez dopisywania nowej wiedzy, wyłącznie przez zmianę kolejności i wymianę ogólników na dane.',
      before: 'W dzisiejszych czasach coraz więcej osób zastanawia się nad montażem pompy ciepła. Zanim przejdziemy do konkretów, warto zrozumieć, od czego zależy koszt takiej inwestycji.',
      after: 'Montaż pompy ciepła kosztuje od 35 000 do 60 000 zł, a z dofinansowaniem - od 20 000 zł. Na kwotę składa się urządzenie, robocizna i modernizacja instalacji.',
    },
    name: 'BLUF',
    heading: 'Czym jest BLUF w SEO i GEO?',
    title: 'Czym jest BLUF w SEO i GEO?',
    description:
      'Czym jest BLUF i jak CitationOne go mierzy: odpowiedź w pierwszych 50 słowach sekcji oraz osobne reguły dla FAQ, listingu i encyklopedii.',
    lead:
      'BLUF (Bottom Line Up Front) sprawdza jedną rzecz: czy odpowiedź na pytanie sekcji pada w jej pierwszych 50 słowach, czy dopiero po akapicie rozgrzewki. To wymiar o kolejności informacji, nie o ich ilości - ten sam tekst z przestawionymi zdaniami dostaje inną ocenę.',
    chips: ['Skala 0-10', 'Ocena modelem językowym', 'Wejście: treść + CSI + profil typu treści'],
    whyHeading: 'Dlaczego BLUF jest ważny dla modeli AI?',
    howHeading: 'Jak liczymy BLUF?',
    why: [
      'Systemy RAG, które stoją za ChatGPT, Perplexity i AI Overview, nie czytają strony w całości. Tną ją na chunki po ~200-500 słów i oceniają każdy osobno, bez kontekstu reszty artykułu. Jeśli sekcja zaczyna się od „W dzisiejszych czasach coraz więcej firm...”, model widzi fragment, który nie odpowiada na nic - i sięga po konkurenta, który odpowiedź postawił w pierwszym zdaniu.',
      'W klasycznym SEO ta sama reguła stała za featured snippetami - do ramki trafiał akapit, który odpowiadał od razu. W GEO stawka jest wyższa, bo silnik generatywny nie linkuje strony, tylko cytuje jej fragment: chunk bez odpowiedzi na początku wygląda dla modelu jak chunk bez odpowiedzi w ogóle.',
      'Wzorzec, który działa, to Odpowiedź → Dowód → Kontekst. Najpierw konkluzja z liczbą, potem uzasadnienie, na końcu tło. Odwrotna kolejność - tło, uzasadnienie, wniosek - jest naturalna w piśmie akademickim i zabójcza w AI Search.',
    ],
    how: {
      intro: [
        'Model dostaje treść pociętą na sekcje H2, Central Search Intent strony oraz profil typu treści z konsensusu SERP. Dla każdej sekcji izoluje pierwsze 50 słów i rozstrzyga, czy zawierają bezpośrednią odpowiedź na pytanie tej sekcji. Ocena całego wymiaru to udział sekcji z poprawnym BLUF-em, korygowany o obecność konkretów liczbowych.',
        'Reguła zależy od typu strony - to nie jest jeden szablon dla wszystkiego:',
      ],
      tables: [
        {
          head: ['Typ treści', 'Czym jest poprawny BLUF'],
          rows: [
            ['Artykuł', 'Odpowiedź z liczbą w pierwszych 50 słowach sekcji'],
            ['FAQ', 'Pierwsze zdanie po pytaniu to odpowiedź („Od 99 zł miesięcznie”), nie „To zależy od...”'],
            ['Listing / katalog', '1-2 zdania podsumowania nad listą, z konkretem typu „12 pozycji, najwyżej oceniana: X”'],
            ['Encyklopedia / definicja', 'Pierwsze zdanie definicyjne pod H2, jak otwarcie hasła w Wikipedii'],
            ['Narzędzie / kalkulator', 'Sekcja „co liczy” - wzór lub zakres wyniku w jednym zdaniu; formularze pomijane'],
          ],
        },
      ],
    },
    raises: [
      'Bezpośrednia odpowiedź w pierwszym zdaniu',
      'Minimum jedna liczba lub statystyka',
      'Konkretne terminy zamiast ogólników',
      'Dowód albo źródło zaraz po odpowiedzi',
      'Przy pytaniu złożonym 2-3 zdania z krokami zamiast jednego ogólnego',
    ],
    lowers: [
      'Wstępy budujące napięcie („W dzisiejszych czasach”, „Żyjemy w erze”)',
      'Zapowiedzi („W tym artykule przedstawimy”, „Zanim przejdziemy do”)',
      'Puste przymiotniki („najlepszy”, „kompleksowy”, „innowacyjny”)',
      'Wata słowna z ofert („wieloletnie doświadczenie”, „indywidualne podejście”)',
      'Kwalifikatory („zasadniczo”, „można powiedzieć, że”)',
      'Meta-komentarze („warto zauważyć”, „należy podkreślić”)',
    ],
    swapTable: {
      caption: 'Osobna, mierzalna strata to ogólniki tam, gdzie da się podać liczbę',
      head: ['Zamiast', 'Napisz'],
      rows: [
        ['„wiele”', 'konkretną liczbę lub zakres („5-10”)'],
        ['„często”', '„w 40% przypadków”, „średnio co 3 dni”'],
        ['„szybko”', '„w ciągu 24 godzin”'],
        ['„znacząco”', '„o 30%”, „dwukrotnie”'],
        ['„większość”', '„7 na 10”, „ponad 70%”'],
        ['„tanio”', 'konkretną kwotę lub widełki'],
      ],
    },
    swapNote:
      'Gdy twardych danych nie ma, zostają zakresy („3-5 dni”), proporcje („1 na 3”) i porównania („2x więcej niż średnia”).',
    report: [
      'Rozbicie sekcja po sekcji: dla każdego H2 pokazujemy jego pierwsze 50 słów i werdykt, czy odpowiedź tam jest.',
      'Do sekcji bez BLUF-u dostajesz gotową propozycję pierwszego zdania - a dla sekcji, których w ogóle brakuje względem konkurencji z Top 10, także krótkie rozwinięcie. Wszystko w formacie Przed / Po, więc widzisz dokładnie, co zamienić.',
    ],
    related: [
      { slug: 'optymalizacja-chunkow', name: 'Optymalizacja chunków', desc: 'Czy sekcja broni się bez kontekstu całości.' },
      { slug: 'gestosc-informacji', name: 'Gęstość informacji', desc: 'Ile faktów przypada na akapit.' },
      { slug: 'koszt-pozyskania', name: 'Koszt pozyskania', desc: 'Czy struktura strony ułatwia wycięcie odpowiedzi.' },
    ],
  },
};

export function dimensionSlugsPl(): string[] {
  return Object.keys(DIMENSIONS_PL);
}
