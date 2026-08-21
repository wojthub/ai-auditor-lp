/**
 * Tresc podstron narzedzi (PL).
 *
 * Zrodlo faktow: ../ai-auditor/spec/tools.md (cel, pipeline, konfiguracja, limity, koszt).
 * SWIADOMIE NIE publikujemy limitow (capy URL-i i fraz) — decyzja z 2026-08-20. Sa w specyfikacji
 * oznaczone jako TYMCZASOWE, wiec kazda liczba tutaj szybko klamie, a przed zakupem i tak nie jest
 * argumentem. Kredyty ZOSTAJA: 1 za analize, zwrot przy bledzie (`failToolJobWithRefund`).
 */

import type { ToolData } from './tool-types';

export const TOOLS_PL: Record<string, ToolData> = {
  klasteryzacja: {
    slug: 'klasteryzacja',
    name: 'Klasteryzacja słów kluczowych',
    heading: 'Narzędzie do klasteryzacji słów kluczowych dla SEO',
    title: 'Narzędzie do klasteryzacji słów kluczowych dla SEO',
    description:
      'Grupuj frazy według nakładania się wyników SERP: klastry z intencją, wolumenem i propozycją strony filarowej. 1 kredyt za analizę, eksport CSV.',
    lead:
      'Wklejasz listę fraz, dostajesz gotowe grupy tematyczne - każda z intencją, sumarycznym wolumenem i propozycją strony filarowej. Zamiast zgadywać, ile tekstów napisać, widzisz to wprost z wyników wyszukiwania.',
    chips: ['1 kredyt za analizę', 'Wejście: lista fraz albo plik CSV', 'Wynik: klastry + CSV'],
    defHeading: 'Czym jest klasteryzacja słów kluczowych?',
    def: [
      'Klasteryzacja grupuje frazy kluczowe według tego, czy Google pokazuje na nie te same strony. Jeśli dwa zapytania mają wspólne wyniki w SERP, jedna strona może obsłużyć oba - i to jest jedyne wiarygodne kryterium, bo pochodzi od wyszukiwarki, a nie z podobieństwa słów.',
      'W praktyce klaster odpowiada na pytanie, ile tekstów w ogóle trzeba napisać. Kilkanaście zapytań potrafi zmieścić się w jednym temacie, a dwie pozornie bliskie frazy - wymagać osobnych stron.',
    ],
    whyHeading: 'Po co klasteryzować frazy?',
    why: [
      'Bez klasteryzacji powstaje najdroższy błąd w treści: kilka osobnych tekstów pod frazy, które dla wyszukiwarki znaczą to samo. Strony zaczynają konkurować ze sobą, żadna nie zbiera pełnej siły, a budżet redakcyjny idzie na powielanie tego samego materiału.',
      'Podobieństwo słów tego nie rozstrzyga - „ubezpieczenie samochodu” i „polisa OC” nie mają wspólnego wyrazu, a wyniki wyszukiwania mają w dużej mierze te same. Odwrotnie, dwie frazy różniące się jednym słowem potrafią mieć rozłączne SERP-y, bo stoi za nimi inna intencja.',
      'Dlatego grupujemy po nakładaniu się adresów w wynikach: klaster to zbiór fraz, które realnie da się obsłużyć jedną stroną.',
    ],
    stepsHeading: 'Jak działa klasteryzacja?',
    steps: [
      { title: 'Pobranie wyników wyszukiwania', desc: 'Dla każdej frazy z listy pobieramy wyniki wyszukiwania - to one są danymi wejściowymi, nie same frazy.' },
      { title: 'Macierz fraza × adres', desc: 'Budujemy macierz obecności adresów w wynikach i liczymy podobieństwo każdej pary fraz.' },
      { title: 'Łączenie w klastry', desc: 'Frazy powiązane podobieństwem powyżej progu trafiają do wspólnych grup.' },
      { title: 'Opis klastra', desc: 'Model nadaje klastrowi etykietę, rozpoznaje intencję i proponuje temat strony filarowej.' },
      { title: 'Wolumeny', desc: 'Do fraz dociągamy miesięczne liczby wyszukiwań, a klastry sortujemy po sumarycznym wolumenie.' },
    ],
    configTable: {
      caption: 'Co ustawiasz przed startem',
      head: ['Parametr', 'Zakres i domyślna wartość'],
      rows: [
        ['Próg podobieństwa', '0,5-1,0 (domyślnie 0,95) - im wyżej, tym ciaśniejsze klastry'],
        ['Minimalny rozmiar klastra', '1-20 - frazy poniżej progu trafiają do kubełka „bez klastra”'],
        ['Liczba wyników SERP', '1-10 - ile pozycji bierzemy pod uwagę przy porównaniu'],
      ],
    },
    outputHeading: 'Co dostajesz?',
    output: [
      'Karty klastrów z etykietą, intencją i sumarycznym wolumenem, a pod nimi tabela fraz - gotowa podstawa do planu treści.',
      'Propozycję strony filarowej dla każdego klastra: temat, który obsłuży całą grupę zapytań.',
      'Osobne kubełki na frazy, które nie utworzyły klastra, nie mają wyników wyszukiwania albo których pobranie się nie powiodło. Nic nie znika po cichu - wiesz, co zostało poza analizą i dlaczego.',
      'Rozwinięcie wybranego klastra: 10-15 powiązanych fraz z typem (long-tail, pytanie, wariant, podtemat) i gotowym tytułem artykułu. To osobne działanie za 1 kredyt.',
      'Eksport CSV z kolumnami: fraza, klaster, wolumen, intencja, strona filarowa.',
    ],
    limitsHeading: 'Ile to kosztuje?',
    limits: [
      '1 kredyt za jedną klasteryzację - tyle samo co audyt strony.',
      'Rozwinięcie klastra kosztuje osobny kredyt i można je wykonać raz dla danego klastra.',
      'Jeśli zadanie zakończy się błędem, kredyt wraca automatycznie.',
    ],
    faq: [
      {
        q: 'Czym to się różni od klasteryzacji po podobieństwie słów?',
        a: 'Kryterium jest inne: liczy się nakładanie wyników wyszukiwania, a nie podobieństwo tekstu. Dzięki temu „ubezpieczenie samochodu” i „polisa OC” mogą trafić do jednego klastra, mimo że nie mają wspólnego słowa - bo Google pokazuje na nie te same strony.',
      },
      {
        q: 'Jaki próg podobieństwa wybrać?',
        a: 'Domyślne 0,95 daje ciasne, pewne klastry - dobre, gdy planujesz osobne strony. Obniżenie progu skleja szersze grupy tematyczne, przydatne przy budowie sekcji serwisu. Jedną listę fraz można przepuścić dwa razy z różnym progiem i porównać wyniki.',
      },
      {
        q: 'Co z frazami, które nie trafiły do żadnego klastra?',
        a: 'Trafiają do osobnego kubełka i zostają w wyniku. Rozróżniamy trzy sytuacje: fraza miała wyniki, ale nie połączyła się z innymi; fraza nie ma wyników w ogóle; pobranie wyników się nie powiodło i warto je ponowić.',
      },
    ],
    related: [
      { slug: 'pruning', name: 'Content Pruning', desc: 'Które istniejące strony kanibalizują się nawzajem.' },
      { slug: 'linki-wewnetrzne', name: 'Linki wewnętrzne', desc: 'Jak połączyć strony w obrębie klastra.' },
      { slug: 'analiza-schema', name: 'Analiza schema.org', desc: 'Czego brakuje w danych strukturalnych serwisu.' },
    ],
    appPath: '/klasteryzacja',
  },

  pruning: {
    slug: 'pruning',
    name: 'Content Pruning',
    heading: 'Narzędzie do content pruningu i kanibalizacji treści dla SEO',
    title: 'Narzędzie do content pruningu i kanibalizacji treści dla SEO',
    description:
      'Wskaż sitemapę, a analiza pokaże strony odbiegające tematycznie i te konkurujące ze sobą - z propozycją działania dla każdej. 1 kredyt, eksport CSV.',
    lead:
      'Podajesz sitemapę, a wracasz z listą stron, które rozmywają temat serwisu, i grup stron walczących ze sobą o to samo zapytanie - każda z podpowiedzią, czy usunąć, przekierować, scalić czy zróżnicować.',
    chips: ['1 kredyt za analizę', 'Wejście: sitemapa', 'Wynik: 3 zakładki + CSV'],
    defHeading: 'Czym jest content pruning i kanibalizacja treści?',
    def: [
      'Pruning odpowiada na dwa pytania o istniejący serwis: które strony odstają od głównego tematu na tyle, że rozmywają jego profil, i które są tak podobne do siebie, że konkurują o to samo zapytanie.',
      'Kanibalizacja to ta druga sytuacja: dwa własne adresy celujące w tę samą intencję. Pruning jest reakcją na obie - nie polega na kasowaniu wszystkiego, co stare, tylko na decyzji, która strona ma zostać nośnikiem tematu.',
    ],
    whyHeading: 'Po co przycinać treść?',
    why: [
      'Serwisy rosną warstwami: stare wpisy blogowe, akcje sezonowe, teksty pod frazy, których już nikt nie szuka. Każda taka strona rozmywa obraz tego, o czym jest domena - a to obraz, na podstawie którego wyszukiwarki i modele decydują, w czym jesteś wiarygodnym źródłem.',
      'Drugi problem jest gorszy, bo niewidoczny: dwie własne strony celujące w to samo zapytanie. Zamiast jednej mocnej pozycji masz dwie słabsze, a przy odpowiedzi generatywnej model i tak wybierze jedno źródło - albo cudze.',
      'Obu rzeczy nie da się ocenić okiem przy kilkuset adresach. Trzeba porównać każdą stronę z każdą.',
    ],
    stepsHeading: 'Jak działa analiza?',
    steps: [
      { title: 'Wczytanie sitemapy', desc: 'Rozwijamy sitemapę wraz z zagnieżdżonymi, odsiewamy pliki mediów i sprawdzamy dostępność adresu jeszcze przed startem.' },
      { title: 'Pobranie stron', desc: 'Z każdego adresu pobieramy tytuł, nagłówek H1 i opis meta - to wystarcza do porównania tematycznego i jest szybkie.' },
      { title: 'Reprezentacja semantyczna', desc: 'Każda strona dostaje wektor opisujący jej treść, dzięki czemu porównujemy znaczenie, a nie zbieżność słów.' },
      { title: 'Główny temat serwisu', desc: 'Grupujemy strony i wyliczamy temat główny oraz tematy poboczne na podstawie charakterystycznych fraz dwuwyrazowych.' },
      { title: 'Kandydaci do przycięcia', desc: 'Mierzymy odległość każdej strony od centrum głównego tematu i odcinamy wskazany percentyl.' },
      { title: 'Grupy kanibalizacji', desc: 'Porównujemy strony parami i łączymy w grupy te, których podobieństwo przekracza próg.' },
      { title: 'Rekomendacje', desc: 'Model opisuje znalezione przypadki i proponuje działanie dla każdego z nich.' },
    ],
    configTable: {
      caption: 'Co ustawiasz przed startem',
      head: ['Parametr', 'Zakres i domyślna wartość'],
      rows: [
        ['Percentyl odchylenia', '50-99 (domyślnie 90) - powyżej niego strona trafia na listę kandydatów'],
        ['Próg kanibalizacji', '0,7-1,0 (domyślnie 0,9) - od jakiego podobieństwa uznajemy strony za konkurujące'],
      ],
    },
    outputHeading: 'Co dostajesz?',
    output: [
      'Tabelę kandydatów do przycięcia wraz z instrukcją, co z nimi zrobić: usunąć, przekierować czy przebudować.',
      'Grupy kanibalizacji z wynikiem podobieństwa i podpowiedzią: wybrać najmocniejszą stronę i ustawić przekierowania, scalić treści albo zróżnicować je tak, żeby celowały w różne zapytania.',
      'Podsumowanie tematyczne serwisu: temat główny i tematy poboczne wyliczone z realnej treści, nie z deklaracji.',
      'Eksport CSV oraz jasny komunikat, gdy analiza nie znalazła nic do poprawy.',
    ],
    limitsHeading: 'Ile to kosztuje?',
    limits: [
      '1 kredyt za jedną analizę, niezależnie od liczby stron w sitemapie.',
      'Strony, których nie udało się pobrać, są wykluczane z rankingu odchyleń - nie chcemy, żeby błąd sieci wyglądał jak treść nie na temat.',
      'Zadanie zakończone błędem zwraca kredyt automatycznie.',
    ],
    faq: [
      {
        q: 'Czy narzędzie skasuje mi strony?',
        a: 'Nie. Analiza jest wyłącznie doradcza - dostajesz listę kandydatów i propozycję działania, decyzję i wykonanie zostawiamy Tobie. Nie łączymy się z Twoim CMS-em.',
      },
      {
        q: 'Mam duży serwis - podać jedną sitemapę czy kilka?',
        a: 'Przy rozbudowanym serwisie lepiej podać sitemapy sekcji osobno: blog, kategorie, produkty. Wyniki są wtedy trafniejsze, bo temat główny liczony jest w obrębie jednej sekcji, a nie uśredniany po całej domenie - a to on decyduje, które strony uznamy za odbiegające.',
      },
      {
        q: 'Czym różni się kanibalizacja od zwykłego podobieństwa tematów?',
        a: 'Progiem i konsekwencją. Dwie strony o zbliżonym temacie to normalna sytuacja; kanibalizacja zaczyna się tam, gdzie są na tyle podobne, że wyszukiwarka nie ma powodu wybrać jednej z nich. Ten próg ustawiasz sam przed analizą.',
      },
    ],
    related: [
      { slug: 'klasteryzacja', name: 'Klasteryzacja słów kluczowych', desc: 'Które frazy w ogóle powinny mieć osobne strony.' },
      { slug: 'linki-wewnetrzne', name: 'Linki wewnętrzne', desc: 'Jak wzmocnić strony, które zostają.' },
      { slug: 'analiza-schema', name: 'Analiza schema.org', desc: 'Sitemap-wide audyt danych strukturalnych.' },
    ],
    appPath: '/pruning',
  },

  'analiza-schema': {
    slug: 'analiza-schema',
    name: 'Analiza schema.org',
    heading: 'Narzędzie do audytu danych strukturalnych schema.org dla SEO',
    title: 'Narzędzie do audytu danych strukturalnych schema.org dla SEO',
    description:
      'Sprawdź schema.org na całej sitemapie: co masz wdrożone, czego brakuje i jakich znaczników oczekuje każdy typ strony. Bez wywołań AI, 1 kredyt za analizę.',
    lead:
      'Wskazujesz sitemapę, a narzędzie przechodzi każdy adres i pokazuje, jakie znaczniki ma, a jakich brakuje względem tego, czym ta strona jest. Bez modeli AI - działa na kodzie Twoich stron, więc jest najszybsze z całego zestawu.',
    chips: ['1 kredyt za analizę', 'Wejście: sitemapa', 'Zero wywołań modelu AI'],
    defHeading: 'Czym są luki w danych strukturalnych (schema.org)?',
    def: [
      'Dane strukturalne to znaczniki w kodzie strony, którymi mówisz wyszukiwarce wprost, czym ona jest: artykułem z autorem i datą, produktem, przepisem, ofertą pracy. Luka to brak znacznika, którego dany typ strony powinien mieć.',
      'Nie każdy brak jest problemem - dopiero zestawienie strony z jej typem pokazuje, czego naprawdę brakuje. Dlatego analiza najpierw rozpoznaje profil strony, a dopiero potem porównuje go z katalogiem oczekiwanych typów schema.',
    ],
    whyHeading: 'Po co dane strukturalne przy AI Search?',
    why: [
      'Dane strukturalne to jedyne miejsce, w którym mówisz wyszukiwarce wprost, czym jest strona: produktem, przepisem, artykułem z datą i autorem, ofertą pracy. Reszta to domysły z treści.',
      'W GEO ma to dodatkową wagę przy sygnałach wiarygodności - autorstwo i powiązania profilu autora czytane są właśnie z danych strukturalnych. Strona bez nich zmusza model do zgadywania, kto za nią stoi.',
      'Problem polega na tym, że wdrożenia robi się zwykle raz, przy uruchomieniu serwisu, i nikt później nie sprawdza, czy nowe typy stron też je dostały. Ta analiza pokazuje to dla całego serwisu naraz.',
    ],
    stepsHeading: 'Jak działa analiza?',
    steps: [
      { title: 'Wczytanie sitemapy', desc: 'Ta sama ścieżka co w pruningu: zagnieżdżone sitemapy, odsiew mediów, walidacja adresu przed startem.' },
      { title: 'Pobranie kodu stron', desc: 'Pobieramy HTML każdego adresu - bez uproszczeń, bo dane strukturalne siedzą w znacznikach, które upraszczanie treści usuwa.' },
      { title: 'Ekstrakcja znaczników', desc: 'Wyciągamy zarówno JSON-LD (w tym postać zbiorczą, jakiej używają popularne wtyczki), jak i mikrodane osadzone w HTML. Przy każdym znalezisku widzisz źródło.' },
      { title: 'Rozpoznanie typu strony', desc: 'Punktowo klasyfikujemy stronę do jednego z 19 profili - od strony głównej i artykułu po ofertę pracy czy stronę kontaktową. Przy zbyt słabych sygnałach zostaje „nieznany”, zamiast zgadywać.' },
      { title: 'Porównanie z katalogiem', desc: 'Dla rozpoznanego profilu sprawdzamy, których z ponad 30 typów schema brakuje, a które są zbędne.' },
      { title: 'Odsiew fałszywych trafień', desc: 'Rekomendacja przepisu bez listy składników czy oferty pracy bez charakterystycznych zwrotów jest odrzucana - lepiej pominąć niż wysłać w kod błędny znacznik.' },
    ],
    outputHeading: 'Co dostajesz?',
    output: [
      'Podsumowanie dla całego serwisu: liczba stron, liczba problemów, najczęściej brakujące typy schema i rozkład typów stron.',
      'Tabelę wszystkich adresów z rozpoznanym profilem, wykrytymi i brakującymi znacznikami oraz filtrem, który pokazuje wyłącznie strony z problemami.',
      'Eksport CSV, a przy niskiej skuteczności pobierania wyraźne ostrzeżenie - żebyś nie wyciągał wniosków z połowy danych.',
    ],
    limitsHeading: 'Ile to kosztuje?',
    limits: [
      '1 kredyt za analizę całej sitemapy.',
      'Narzędzie nie korzysta z modeli AI ani z zewnętrznych danych SERP - działa na kodzie Twoich stron, dlatego jest najszybsze z całego zestawu.',
      'Zadanie zakończone błędem zwraca kredyt automatycznie.',
    ],
    faq: [
      {
        q: 'Czy narzędzie wdroży znaczniki za mnie?',
        a: 'Nie, generuje diagnozę: co jest, czego brakuje i przy jakim typie strony. Wdrożenie zostaje po Twojej stronie - w CMS-ie albo we wtyczce SEO.',
      },
      {
        q: 'Mam wtyczkę SEO, która dodaje schema. Analiza to zobaczy?',
        a: 'Tak. Czytamy również zbiorczą postać JSON-LD, w której popularne wtyczki pakują wszystkie znaczniki naraz, oraz mikrodane osadzone bezpośrednio w HTML.',
      },
      {
        q: 'Dlaczego część stron ma profil „nieznany”?',
        a: 'Bo sygnały były zbyt słabe, żeby przypisać typ z sensowną pewnością. To celowe: fałszywe rozpoznanie prowadziłoby do rekomendacji wdrożenia znacznika, który tej stronie zaszkodzi.',
      },
    ],
    related: [
      { slug: 'pruning', name: 'Content Pruning', desc: 'Które strony w tej sitemapie w ogóle warto utrzymywać.' },
      { slug: 'linki-wewnetrzne', name: 'Linki wewnętrzne', desc: 'Propozycje linkowania w obrębie serwisu.' },
      { slug: 'klasteryzacja', name: 'Klasteryzacja słów kluczowych', desc: 'Planowanie treści przed wdrożeniem.' },
    ],
    appPath: '/schema',
  },

  'linki-wewnetrzne': {
    slug: 'linki-wewnetrzne',
    name: 'Linki wewnętrzne',
    heading: 'Narzędzie do linkowania wewnętrznego dla SEO',
    title: 'Narzędzie do linkowania wewnętrznego dla SEO',
    description:
      'Propozycje linków wewnętrznych z całej sitemapy: konkretny akapit, gotowy anchor, adres docelowy i lista stron osieroconych. 1 kredyt, eksport CSV.',
    lead:
      'Narzędzie czyta treść wszystkich stron z sitemapy i wskazuje konkretne miejsca, w których warto wstawić link wewnętrzny - razem z gotowym tekstem odnośnika i adresem docelowym. Przy okazji wyłapuje strony, do których nie prowadzi żaden link.',
    chips: ['1 kredyt za analizę', 'Wejście: sitemapa', 'Wynik: propozycje + CSV'],
    defHeading: 'Jak automatycznie znaleźć linki wewnętrzne do dodania?',
    def: [
      'Ręcznie robi się to od strony docelowej: masz nowy tekst i szukasz miejsc, z których warto do niego podlinkować. Automat idzie odwrotnie - przegląda każdy akapit każdej strony i sprawdza, czy istnieje adres, do którego ten akapit merytorycznie pasuje.',
      'Dopasowanie jest semantyczne, a nie po dokładnym wystąpieniu frazy, więc łapie też akapity opisujące temat innymi słowami. Efektem nie jest lista „warto polinkować”, tylko para: konkretny fragment tekstu i konkretny adres docelowy z gotowym anchorem.',
    ],
    whyHeading: 'Po co linkowanie wewnętrzne w AI Search?',
    why: [
      'Linki wewnętrzne rozprowadzają po serwisie sygnał, że temat jest u Ciebie opisany szerzej niż jedną stroną. Dla wyszukiwarki to informacja o strukturze wiedzy, a nie tylko nawigacja.',
      'Praktyczny problem jest inny: ręczne linkowanie kończy się na kilku oczywistych miejscach, a strony dodane pół roku temu zostają bez ani jednego odnośnika przychodzącego. Takich sierot nie widać, dopóki ktoś ich nie policzy.',
      'Automat robi to odwrotnie niż człowiek: przegląda każdy akapit każdej strony i sprawdza, czy istnieje strona, do której ten akapit merytorycznie pasuje.',
    ],
    stepsHeading: 'Jak działa analiza?',
    steps: [
      { title: 'Pobranie treści', desc: 'Z sitemapy pobieramy pełną treść stron - nie same tytuły, bo dopasowanie działa na poziomie akapitu.' },
      { title: 'Podział na fragmenty', desc: 'Treść dzielimy na akapity odpowiedniej długości, pomijając nagłówki - link w nagłówku to zła praktyka, więc nie proponujemy takich miejsc.' },
      { title: 'Dopasowanie semantyczne', desc: 'Porównujemy każdy fragment z tematyką pozostałych stron i wybieramy te pary, które przekraczają próg podobieństwa.' },
      { title: 'Wybór tekstu odnośnika', desc: 'Z fragmentu wybieramy naturalną frazę na anchor, z uwzględnieniem polskiej odmiany i słów nieznaczących.' },
      { title: 'Odsiew', desc: 'Odrzucamy linki do samej siebie, przekroczone limity na stronę i na cel, adresy już podlinkowane oraz anchory już użyte na tej stronie.' },
      { title: 'Opcjonalna weryfikacja', desc: 'Na życzenie model dodatkowo sprawdza, czy odnośnik ma sens merytoryczny; odrzucone propozycje możesz obejrzeć osobno.' },
    ],
    configTable: {
      caption: 'Co ustawiasz przed startem',
      head: ['Parametr', 'Zakres i domyślna wartość'],
      rows: [
        ['Próg podobieństwa', '0,5-1,0 (domyślnie 0,75)'],
        ['Maks. linków na stronę', '1-30 (domyślnie 5)'],
        ['Maks. linków do jednego celu', '1-50 (domyślnie 10)'],
        ['Długość anchora', 'od 1-10 do 1-15 słów (domyślnie 2-6)'],
        ['Weryfikacja modelem', 'wyłączona domyślnie'],
      ],
    },
    outputHeading: 'Co dostajesz?',
    output: [
      'Tabelę propozycji: strona źródłowa, proponowany tekst odnośnika, strona docelowa i wynik dopasowania.',
      'Statystyki serwisu: strony zbierające najwięcej odnośników przychodzących oraz strony osierocone, czyli takie bez ani jednego linku z wnętrza serwisu.',
      'Eksport CSV do przekazania osobie, która wprowadzi zmiany w CMS-ie.',
    ],
    limitsHeading: 'Ile to kosztuje?',
    limits: [
      '1 kredyt za jedną analizę.',
      'Nie proponujemy linków, które już istnieją, ani anchorów już użytych na danej stronie.',
      'Zadanie zakończone błędem zwraca kredyt automatycznie.',
    ],
    faq: [
      {
        q: 'Czy narzędzie samo wstawi linki na stronie?',
        a: 'Nie. Dostajesz listę propozycji z gotowym anchorem i adresem docelowym; wdrożenie robisz w swoim CMS-ie. Nie łączymy się z Twoją stroną i niczego na niej nie zmieniamy.',
      },
      {
        q: 'Czy zaproponujecie link, który już mam?',
        a: 'Nie. Przed dopasowaniem wyciągamy istniejące linki wewnętrzne z treści i odrzucamy zarówno podlinkowane już adresy, jak i anchory, które na danej stronie są odnośnikiem.',
      },
      {
        q: 'Co to są strony osierocone i dlaczego są problemem?',
        a: 'To strony, do których nie prowadzi żaden link z wnętrza serwisu. Dla wyszukiwarki wyglądają na mniej istotne, a odwiedzający trafia na nie tylko z zewnątrz. To zwykle najszybsza do naprawienia rzecz w całym raporcie.',
      },
    ],
    related: [
      { slug: 'pruning', name: 'Content Pruning', desc: 'Zanim zaczniesz linkować - sprawdź, co warto zostawić.' },
      { slug: 'klasteryzacja', name: 'Klasteryzacja słów kluczowych', desc: 'Które strony należą do jednego tematu.' },
      { slug: 'analiza-schema', name: 'Analiza schema.org', desc: 'Dane strukturalne dla tych samych adresów.' },
    ],
    appPath: '/interlinking',
  },
};

export function toolSlugsPl(): string[] {
  return Object.keys(TOOLS_PL);
}
