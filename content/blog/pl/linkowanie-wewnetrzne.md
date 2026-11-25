**Linkowanie wewnętrzne to sieć odnośników między podstronami jednego serwisu, po której Google odkrywa strony i rozpoznaje, które z nich są najważniejsze w danym temacie. Plan linkowania wewnętrznego opiera się na klastrach tematycznych - strona główna tematu linkuje do stron szczegółowych, one odsyłają do niej i do siebie nawzajem tam, gdzie treść się łączy, a każdy link ma opisowy anchor w zdaniu, które wyjaśnia, dokąd prowadzi.**

Najważniejsze informacje w skrócie:

- Google wprost zaleca, żeby **każda ważna strona miała link z co najmniej jednej innej strony serwisu**, bo większość nowych stron znajduje właśnie przez linki,
- **anchor ma być opisowy i zwięzły** - Google podaje „kliknij tutaj” i „czytaj więcej” jako złe przykłady, a znaczenie mają też słowa przed linkiem i po nim,
- **nie ma idealnej liczby linków na stronę** - Google pisze tylko, że jeśli wydaje Ci się, że jest ich za dużo, to prawdopodobnie tak jest,
- plan linkowania zaczyna się od klastrów i rozstrzygniętej kanibalizacji, bo **linkowanie dwóch konkurujących stron tym samym anchorem pogłębia problem**,
- Google uznaje za możliwe do pobrania tylko linki w elemencie `<a>` z atrybutem `href`, więc **linki budowane samym JavaScriptem bez tego znacznika mogą zostać pominięte**.

Skuteczny plan linkowania wewnętrznego łączy trzy elementy - klastry tematyczne, opisowe anchory i linki zapisane w zwykłym znaczniku `<a href>`, który roboty indeksujące odczytają bez problemu. Działa to też w odpowiedziach AI, bo Google AI Overviews i AI Mode korzystają z tego samego indeksu co zwykłe wyniki wyszukiwania. Ten poradnik domyka serię o porządkowaniu serwisu po klasteryzacji fraz, naprawie kanibalizacji i content pruningu. Jest dla specjalistów SEO i redaktorów, którzy mają serwis z kilkudziesięcioma albo kilkuset stronami i chcą linkować według planu, a nie przy okazji publikacji kolejnego wpisu.

## Czym jest linkowanie wewnętrzne?

Linkowanie wewnętrzne (internal linking) to **odnośniki prowadzące z jednej podstrony serwisu do innej podstrony w tej samej domenie**. Linki wewnętrzne różnią się od zewnętrznych tym, że prowadzą w obrębie Twojej domeny i w całości o nich decydujesz, a linki zewnętrzne prowadzą do innych domen albo z nich. Razem tworzą strukturę linków serwisu, w której każda strefa strony pełni inną rolę:

| Strefa | Rola dla użytkownika i robota |
|---|---|
| menu główne | pokazuje najważniejsze sekcje i kategorie całego serwisu |
| stopka i menu pomocnicze | prowadzą do stron stałych, takich jak kontakt, regulamin czy cennik |
| okruszki (breadcrumbs) | pokazują miejsce strony w hierarchii i linkują do kategorii nadrzędnej |
| listy kategorii i tagów | zbierają strony jednego tematu w jednym miejscu |
| linki w treści | łączą konkretny fragment tekstu ze stroną, która rozwija ten wątek |

W tym poradniku zajmujemy się głównie **linkami w treści**, bo to je planuje się przy każdym tekście i to one niosą najwięcej kontekstu. Nawigację projektuje się raz, przy budowie serwisu, a linki w treści trzeba dopisywać przy każdej publikacji i każdej zmianie struktury.

Google w przewodniku SEO dla początkujących pisze, że **zdecydowaną większość nowych stron znajduje każdego dnia przez linki**. Mapa witryny pomaga, ale strona, do której nie prowadzi żaden link z wnętrza serwisu, wygląda dla wyszukiwarki na mało istotną.

## Dlaczego linkowanie wewnętrzne ma znaczenie dla SEO i AI?

Linkowanie wewnętrzne wpływa na trzy rzeczy, które decydują o widoczności w wynikach wyszukiwania - **czy robot indeksujący znajdzie stronę, czy zrozumie jej temat i czy uzna ją za ważną**. Wszystkie trzy przekładają się też na odpowiedzi AI, bo Google AI Overviews i AI Mode korzystają z tego samego indeksu co zwykłe wyniki.

Odkrywanie stron jest najprostsze do zmierzenia. Google opisuje, że robot przechodzi po linkach ze stron, które już zna, więc nowy tekst podlinkowany z mocnego wpisu zostaje znaleziony szybciej niż tekst widoczny tylko w sitemapie.

Kontekst tematu niesie anchor text (tekst odnośnika, dalej anchor) i zdanie wokół niego. Google w wytycznych o linkach pisze, że **słowa przed linkiem i po nim też mają znaczenie**, dlatego warto patrzeć na całe zdanie, a nie tylko na sam tekst odnośnika. Link „audyt treści” w zdaniu o porównaniu strony z TOP 10 mówi więcej niż ten sam anchor w liście „zobacz także”.

Hierarchia ważności wynika z tego, ile linków prowadzi do strony i skąd. Google od początku ocenia strony między innymi algorytmem PageRank, który opiera się na linkach, a linki wewnętrzne rozprowadzają tę wartość, potocznie nazywaną mocą SEO, między poszczególnymi podstronami. Strona główna tematu, do której linkują wszystkie strony szczegółowe w klastrze, dostaje wyraźny sygnał, że to ona jest punktem wejścia w temat.

Warto też dodać, że w przypadku AI Overviews i AI Mode Google stawia ten sam warunek co w zwykłym wyszukiwaniu - **strona musi być zaindeksowana i kwalifikować się do wyświetlenia z fragmentem**. Linkowanie wewnętrzne nie jest osobnym czynnikiem cytowania, ale bez niego strona może do indeksu w ogóle nie trafić.

> [!ZAPAMIETAJ]
> Strona, do której nie prowadzi żaden link z wnętrza serwisu, ma mniejsze szanse na indeksację, a strona spoza indeksu nie trafi ani do wyników Google, ani do AI Overviews.

## Jak zaplanować linkowanie wewnętrzne krok po kroku

Plan linkowania wewnętrznego powstaje w sześciu krokach - **od mapy tematów, przez wybór stron głównych i kierunków linków, po kontrolę stron bez linków**. Kolejność ma znaczenie, bo każdy krok korzysta z decyzji poprzedniego.

1. **Pogrupuj strony w klastry tematyczne.** Klaster to strony odpowiadające na powiązane pytania jednego tematu. Jeśli frazy nie są jeszcze pogrupowane, zacznij od [klasteryzacji słów kluczowych](/pl/blog/klasteryzacja-slow-kluczowych) - grupy z tej analizy to gotowa mapa linkowania.
2. **Wyznacz w każdym klastrze stronę główną tematu.** Strona główna tematu (pillar page) odpowiada na pytanie najszersze, na przykład „pompa ciepła”, a strony szczegółowe na pytania węższe, na przykład koszt montażu czy opłacalność. Jedna strona może być główną tylko dla jednego tematu.
3. **Rozstrzygnij kanibalizację przed linkowaniem.** Jeśli dwie strony odpowiadają na to samo pytanie, nie wiadomo, do której linkować. Najpierw [napraw kanibalizację słów kluczowych](/pl/blog/kanibalizacja-slow-kluczowych), potem planuj linki do strony, która została.
4. **Ustal kierunki linków.** Strona główna linkuje do każdej strony szczegółowej, każda strona szczegółowa linkuje z powrotem do strony głównej, a między stronami szczegółowymi linki stawiasz tylko tam, gdzie jedna naprawdę rozwija wątek drugiej. Z klastra dodaj też link do strony oferty albo konwersji, jeśli temat się z nią łączy.
5. **Wybierz akapit i anchor.** Link stawiasz w zdaniu, które mówi o temacie strony docelowej, a anchor opisuje, co czytelnik tam znajdzie. Zasady doboru anchora są w następnej sekcji.
6. **Sprawdź strony bez linków przychodzących.** Po wdrożeniu planu policz strony, do których dalej nie prowadzi żaden link z treści. Każda z nich to albo brak w planie, albo kandydat do pruningu.

Cały plan zmieścisz w jednym arkuszu. Tak wygląda szablon planu linkowania wewnętrznego wypełniony dla małego klastra o pompach ciepła:

| Strona | Rola | Linkuje do | Dostaje linki z | Warianty anchora |
|---|---|---|---|---|
| Pompy ciepła - poradnik | strona główna tematu | 4 strony szczegółowe, strona oferty | 4 strony szczegółowe | pompa ciepła, jak działa pompa ciepła |
| Koszt montażu | strona szczegółowa | strona główna, dofinansowanie | strona główna, dofinansowanie | koszt montażu pompy ciepła, ile kosztuje montaż |
| Dofinansowanie | strona szczegółowa | strona główna, koszt montażu | strona główna, koszt montażu | dofinansowanie do pompy ciepła, dotacja na pompę |
| Opłacalność | strona szczegółowa | strona główna | strona główna, opinie | czy pompa ciepła się opłaca, zwrot z pompy ciepła |
| Opinie | strona szczegółowa | strona główna, opłacalność | strona główna | opinie o pompach ciepła, doświadczenia użytkowników |

Jeden wiersz na stronę wystarczy. Kolumna „Dostaje linki z” od razu pokazuje strony osierocone, bo pusta komórka oznacza, że nic tam nie prowadzi.

<figure><img src="/blog/pl/linkowanie-wewnetrzne-klaster.svg" alt="Schemat linkowania w klastrze tematycznym. Strona główna tematu w środku linkuje do czterech stron szczegółowych, każda strona szczegółowa linkuje z powrotem do strony głównej. Dwie strony szczegółowe, które rozwijają ten sam wątek, linkują też do siebie. Jeden link z klastra prowadzi do strony oferty." width="640" height="520" loading="lazy" decoding="async"><figcaption>Strona główna tematu i strony szczegółowe linkują do siebie w obie strony, a linki między stronami szczegółowymi pojawiają się tylko przy realnym powiązaniu treści.</figcaption></figure>

W poradnikach SEO często pada zasada, że **ważne strony powinny być najwyżej trzy kliknięcia od strony głównej**. Google nie podaje takiej liczby, więc traktuj ją jako kontrolę architektury serwisu, a nie wymóg. Im krótsza ścieżka, tym szybciej robot dociera do strony, a w dobrze zaplanowanym klastrze zasada spełnia się sama, bo każda strona szczegółowa jest jedno kliknięcie od strony głównej tematu.

> [!ZAPAMIETAJ]
> Strona główna tematu linkuje do każdej strony szczegółowej w klastrze, a każda strona szczegółowa odsyła do niej z powrotem.

## Jak dobrać anchor linku wewnętrznego?

Dobry anchor jest **opisowy, zwięzły i pasuje zarówno do strony, na której stoi, jak i do strony, do której prowadzi** - tak opisuje go Google w wytycznych o linkach. Google proponuje też prosty test - przeczytaj sam anchor bez otaczającego go tekstu i sprawdź, czy wiadomo, dokąd prowadzi. W praktyce dobry anchor linku wewnętrznego ma zwykle **od 2 do 6 słów** - takie są domyślne granice w narzędziu CitationOne.

W linkowaniu wewnętrznym spotkasz cztery rodzaje anchorów:

- **dokładna fraza (exact match)** - anchor powtarza frazę kluczową strony docelowej, na przykład „koszt montażu pompy ciepła”,
- **częściowe dopasowanie (partial match)** - fraza w szerszym sformułowaniu, na przykład „ile kosztuje montaż pompy w domu jednorodzinnym”,
- **anchor z nazwą** - nazwa marki, produktu albo narzędzia, na przykład „narzędzie Linki wewnętrzne”,
- **anchor ogólny** - „kliknij tutaj” albo „czytaj więcej”, którego Google radzi unikać.

W planie linkowania mieszaj trzy pierwsze rodzaje, a czwartego unikaj. Złe anchory linków wewnętrznych wyglądają podobnie w każdym serwisie:

| Anchor | Problem | Lepsza wersja |
|---|---|---|
| kliknij tutaj | nic nie mówi o stronie docelowej | cennik audytu treści |
| czytaj więcej | ten sam tekst prowadzi do wielu stron | jak zaktualizować stary artykuł |
| artykuł | słowo ogólne, bez tematu | poradnik o kanibalizacji słów kluczowych |
| pompa ciepła cena montaż koszt opłacalność | upychanie słów kluczowych | koszt montażu pompy ciepła |
| cały akapit jako link | za długi, rozmywa temat | jedna fraza z tematem strony |

Anchor z dokładną frazą kluczową nie jest błędem, ale **ten sam anchor wszędzie wygląda nienaturalnie** i nie daje Google nowych informacji. Lepiej używać kilku wariantów - pełnej nazwy tematu, formy pytającej i krótkiej nazwy - dopasowanych do zdania, w którym stoją. Google wymienia upychanie słów kluczowych w tekście linków jako naruszenie zasad dotyczących spamu.

Jeden błąd zdarza się częściej niż pozostałe. **Ten sam anchor prowadzi w różnych tekstach do dwóch różnych stron**, na przykład „audyt SEO” raz do oferty, raz do wpisu blogowego. Taki sygnał jest sprzeczny i często jest pierwszą oznaką kanibalizacji.

## Ile linków wewnętrznych na stronę?

Google pisze wprost, że **nie ma magicznej idealnej liczby linków na stronie**, i dodaje, że jeśli wydaje Ci się, że jest ich za dużo, to prawdopodobnie tak jest. Liczba linków zależy więc od długości tekstu i liczby wątków, które rzeczywiście łączą się z innymi stronami. Punktem wyjścia dla wpisu o długości 1500-2500 słów może być **do 5 nowych linków na stronę i do 10 linków do jednego celu w całym serwisie** - to domyślne limity narzędzia CitationOne.

W praktyce sprawdzają się trzy zasady:

- link stawiasz tam, gdzie tekst dochodzi do wątku rozwiniętego na innej stronie, a nie w jednym bloku na końcu,
- linki nie stoją obok siebie, bo Google zwraca uwagę, że czytelnikowi trudniej je wtedy rozróżnić,
- jeden cel podlinkowany raz w tekście wystarczy, a kolejne linki do tej samej strony nic nie dodają.

Te limity to punkt wyjścia, a nie reguła - w narzędziu do linków wewnętrznych można je zmienić przed każdą analizą.

## Strony osierocone - jak je znaleźć?

Strona osierocona (orphan page) to **podstrona, do której nie prowadzi żaden link z wnętrza serwisu**. Odwiedzający trafia na nią tylko z zewnątrz, a Google może ją znać wyłącznie z mapy witryny. Google zaleca, żeby każda strona, na której Ci zależy, miała link z co najmniej jednej innej strony serwisu.

Strony osierocone znajdziesz, porównując dwie listy adresów:

1. **Listę wszystkich adresów, które powinny być w indeksie** - z mapy witryny, z bazy CMS-a albo z raportu stron w Google Search Console.
2. **Listę adresów, do których crawler dotarł po linkach** - z narzędzia takiego jak Screaming Frog, uruchomionego od strony głównej bez wczytywania sitemapy.

Adresy z pierwszej listy, których nie ma na drugiej, to strony osierocone. Dla każdej z nich decyzja jest prosta. Jeśli strona ma wartość, dostaje link ze strony głównej swojego klastra i z jednej albo dwóch stron szczegółowych. Jeśli nie ma, trafia na listę do [content pruningu](/pl/blog/content-pruning).

Zanim napisałem ten tekst, policzyłem linki między wpisami na tym blogu. Wpis o tym, co to jest GEO - najszerszy temat na blogu - dostaje linki z 3 innych wpisów, ale sam nie linkował do żadnego z 8 tekstów szczegółowych. Do poradnika o klasteryzacji prowadził tylko 1 link. **Taka asymetria powstaje sama, gdy linki dopisuje się tylko w nowym tekście do starszych**, a do starych wpisów nikt nie wraca, żeby podlinkować w nich nowe. Po tej analizie dopisałem we wpisie o GEO linki do 4 tekstów szczegółowych, a w trzech wpisach z serii o porządkowaniu serwisu - link do tego poradnika.

[Narzędzie Linki wewnętrzne](/pl/narzedzia/linki-wewnetrzne) liczy to dla całej sitemapy - pokazuje strony, do których nie prowadzi żaden link z treści, i proponuje konkretne akapity, z których warto do nich podlinkować.

> [!ZAPAMIETAJ]
> Po każdej publikacji dopisz link do nowego tekstu w co najmniej jednym starszym wpisie z tego samego klastra, bo inaczej nowe strony zbierają linki najwolniej.

## Linkowanie po pruningu i przekierowaniach

Po content pruningu i scalaniu stron **linki wewnętrzne trzeba zaktualizować, żeby prowadziły prosto do adresu docelowego**, a nie przez przekierowanie 301. Przekierowanie działa, ale każdy link przez nie to dodatkowe żądanie dla robota i ryzyko łańcucha przekierowań, gdy adres docelowy też się kiedyś zmieni.

Po każdej zmianie struktury sprawdź trzy rzeczy:

- **linki do adresów z przekierowaniem 301** - zamień je na link do adresu docelowego,
- **linki do adresów z błędem 404** - usuń je albo przepnij na najbliższą tematycznie stronę,
- **anchory po scaleniu stron** - jeśli dwie strony stały się jedną, anchory prowadzące do obu powinny opisywać temat strony, która została.

Google w poradniku o przenoszeniu serwisu ze zmianą adresów zaleca, żeby **zastąpić w linkach wewnętrznych wszystkie stare adresy nowymi** według przygotowanej mapy przekierowań. Ta sama zasada działa przy mniejszych zmianach, takich jak scalenie kilku wpisów.

## Najczęstsze błędy w linkowaniu wewnętrznym

Pięć najczęstszych błędów w linkowaniu wewnętrznym to **linki tylko do strony głównej, linki tylko w nawigacji, linki w JavaScripcie bez znacznika `<a href>`, kilka linków obok siebie i ten sam anchor do różnych stron**. Biorą się z linkowania bez planu albo z implementacji, której robot nie odczyta:

- **wszystkie linki prowadzą do strony głównej i kontaktu** - te strony i tak mają najwięcej linków z nawigacji, a strony szczegółowe zostają bez wsparcia,
- **linki tylko w stopce i menu** - nawigacja pokazuje strukturę, ale nie łączy tematów na poziomie akapitu,
- **linki budowane JavaScriptem bez elementu `<a href>`** - Google wymienia `<span href>`, `<a onclick>` i `href="javascript:…"` jako formy, których może nie pobrać,
- **kilka linków obok siebie w jednym zdaniu** - czytelnik nie odróżnia, który prowadzi dokąd,
- **ten sam anchor do różnych stron** - sygnał sprzeczny, opisany w sekcji o anchorach.

„Skoro Google i tak ma sitemapę, po co tyle pracy z linkami?” Sitemapa mówi Google, że adres istnieje. Link w treści mówi, o czym jest strona i jak łączy się z resztą serwisu - tej informacji sitemapa nie zawiera.

Moim zdaniem najczęściej marnowanym zasobem w linkowaniu wewnętrznym są **stare, mocne wpisy, do których nikt nie wraca**. Mają linki zewnętrzne i ruch, ale linkują tylko do tekstów, które istniały w dniu ich publikacji. Jedna sesja z dopisaniem linków w 10 najmocniejszych wpisach daje zwykle więcej niż kolejny nowy tekst w klastrze.

## Podsumowanie

Linkowanie wewnętrzne działa najlepiej jako ostatni krok porządkowania serwisu - **po klasteryzacji, naprawie kanibalizacji i pruningu**. Wtedy wiadomo, która strona jest główna w każdym temacie, które strony szczegółowe ją uzupełniają i których adresów już nie ma. Następny krok to policzenie stron bez linków przychodzących i dopisanie linków w starszych wpisach.

[Sprawdź linkowanie swojego serwisu w narzędziu Linki wewnętrzne](/pl/narzedzia/linki-wewnetrzne) - wskażesz sitemapę i dostaniesz listę akapitów z gotowym anchorem, adresem docelowym i stronami osieroconymi.

## Najczęstsze pytania

### Czy linki w menu liczą się jako linkowanie wewnętrzne?

Tak, linki w menu, stopce i okruszkach to też linki wewnętrzne i Google po nich odkrywa strony. Pokazują jednak strukturę całego serwisu, a nie powiązania między konkretnymi tekstami. Dlatego strony szczegółowe w klastrze potrzebują też linków w treści, wstawionych w zdanie o ich temacie.

### Czy w linkach wewnętrznych używać dokładnej frazy kluczowej?

Tak, dokładna fraza w anchorze jest w porządku, jeśli pasuje do zdania i opisuje stronę docelową. Problemem jest ten sam anchor w każdym linku i upychanie kilku fraz w jednym odnośniku, które Google uznaje za spam. Bezpieczniej używać kilku wariantów - pełnej nazwy tematu, pytania i krótkiej nazwy.

### Czy dawać nofollow w linkach wewnętrznych?

Zwykle nie. Od 2019 roku Google traktuje nofollow jako wskazówkę, a nie polecenie, więc nie blokuje nim indeksacji. Jeśli strona nie powinna być w wynikach, na przykład koszyk albo logowanie, użyj noindex. Nofollow w linku wewnętrznym tylko osłabia sygnał dla strony, na której Ci zależy.

### Jak często aktualizować linkowanie wewnętrzne?

Linki do nowego tekstu dopisz w dniu publikacji - w stronie głównej klastra i w jednym albo dwóch starszych wpisach. Pełny przegląd linkowania rób po każdej zmianie struktury, na przykład po pruningu, migracji albo scaleniu stron, i co najmniej raz na pół roku w serwisie, który publikuje regularnie.

### Czy linki wewnętrzne pomagają w cytowaniach w odpowiedziach AI?

Pośrednio tak. AI Overviews i AI Mode korzystają z indeksu Google, a linki wewnętrzne pomagają stronom do niego trafić i pokazują, która strona jest główna w temacie. Żaden dostawca nie potwierdził linkowania wewnętrznego jako osobnego czynnika cytowania, więc traktuj je jako warunek widoczności, a nie gwarancję cytowania.

## Źródła

- Google Search Central, [Link best practices for Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), dostęp 2026-11-15,
- Google Search Central, [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), dostęp 2026-11-15,
- Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), dostęp 2026-11-15,
- Google Search Central, [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), dostęp 2026-11-15,
- Google Search Central Blog, [Evolving "nofollow" - new ways to identify the nature of links](https://developers.google.com/search/blog/2019/09/evolving-nofollow-new-ways-to-identify), dostęp 2026-11-15.
