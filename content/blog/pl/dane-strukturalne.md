**Dane strukturalne to znaczniki w kodzie strony, którymi mówisz wyszukiwarce wprost, czym jest strona - artykułem z autorem i datą, produktem z ceną albo firmą z adresem. Dane strukturalne warto wdrożyć tam, gdzie Google pokazuje za nie wynik rozszerzony albo gdzie opisują autora i organizację, a pod AI Overviews i AI Mode Google nie wymaga żadnych specjalnych znaczników.**

Najważniejsze informacje w skrócie:

- Google pisze wprost, że **do AI Overviews i AI Mode nie trzeba dodawać żadnych specjalnych danych schema.org**, a dane strukturalne mają odpowiadać widocznej treści strony,
- od sierpnia 2023 roku **wyniki rozszerzone FAQ pokazują się tylko dla znanych serwisów rządowych i medycznych**, a wyniki HowTo Google wycofał we wrześniu 2023 roku,
- w czerwcu 2025 roku Google ogłosił wycofanie **7 kolejnych typów wyników rozszerzonych**, między innymi Course Info, Claim Review i Estimated Salary,
- Google zaleca format **JSON-LD** jako najłatwiejszy we wdrożeniu i utrzymaniu, choć wszystkie trzy formaty traktuje tak samo,
- ręczne działanie za błędne dane strukturalne **odbiera stronie wynik rozszerzony, ale nie wpływa na jej pozycję** w wyszukiwarce.

Poradnik jest dla specjalistów SEO i właścicieli serwisów, którzy chcą zdecydować, które znaczniki schema.org wdrożyć, a których nie ruszać. Opisujemy, co dane strukturalne dają dziś w Google, co dają w odpowiedziach AI, i jak sprawdzić braki na całym serwisie.

## Czym są dane strukturalne?

Dane strukturalne (structured data, w dokumentacji Google także „uporządkowane dane”) to **ustandaryzowany opis strony zapisany w kodzie według słownika schema.org**. Mówią wyszukiwarce, jakie obiekty są na stronie i jakie mają cechy - tytuł i autora artykułu, cenę i dostępność produktu, adres i godziny otwarcia firmy. Google opisuje je jako sposób na dostarczenie „wyraźnych wskazówek co do znaczenia strony”.

Słownik schema.org rozwijają wspólnie Google, Microsoft, Yahoo i Yandex. Typów jest kilkaset, ale **Google obsługuje w wynikach rozszerzonych tylko część z nich**, a pozostałe pomagają najwyżej w rozumieniu strony.

Dane strukturalne występują w trzech formatach:

| Format | Jak wygląda | Kiedy go używać |
|---|---|---|
| JSON-LD | osobny skrypt `<script type="application/ld+json">` w kodzie strony | domyślnie, bo nie miesza się z HTML-em i łatwo go generować |
| mikrodane (Microdata) | atrybuty `itemscope`, `itemprop` w znacznikach HTML | gdy szablon już ich używa i nie opłaca się go przepisywać |
| RDFa | atrybuty `vocab`, `property` w znacznikach HTML | rzadko, głównie w starszych systemach |

Google pisze, że **wszystkie trzy formaty są dla niego równie dobre**, ale zaleca ten, który najłatwiej wdrożyć i utrzymać, czyli w większości przypadków JSON-LD - znaczniki w formacie JSON umieszczone w osobnym skrypcie.

## Co dają dane strukturalne w SEO?

Dane strukturalne dają w SEO dwie rzeczy - **szansę na wynik rozszerzony (rich result) i jednoznaczny opis strony dla Google**. Wynik rozszerzony, w branży nazywany też rich snippet, to wynik z dodatkowymi elementami, takimi jak gwiazdki ocen, cena, dostępność produktu, data wydarzenia czy ścieżka okruszków. Taki wynik zajmuje więcej miejsca i zwykle lepiej przyciąga uwagę niż zwykły link.

Dane strukturalne nie dają gwarancji. Google pisze, że **nie gwarantuje pokazania danych strukturalnych w wynikach, nawet jeśli strona jest oznaczona poprawnie**. O wyświetleniu decydują też jakość strony, zapytanie i urządzenie.

Warto też wiedzieć, czego dane strukturalne nie robią. Ręczne działanie za błędne dane strukturalne, według Google, **odbiera stronie możliwość pokazania wyniku rozszerzonego, ale nie wpływa na jej pozycję w zwykłych wynikach**. Dane strukturalne nie są więc czynnikiem, który sam podnosi stronę w rankingu - działają przez wygląd wyniku i przez lepsze zrozumienie treści.

> [!ZAPAMIETAJ]
> Dane strukturalne zmieniają wygląd wyniku i pomagają Google zrozumieć stronę, ale same nie podnoszą jej pozycji, a poprawny znacznik nie gwarantuje wyniku rozszerzonego.

## Czy dane strukturalne pomagają w AI?

Dane strukturalne nie są warunkiem obecności w odpowiedziach AI Google. Google w dokumentacji o funkcjach AI pisze, że **nie ma specjalnych danych schema.org, które trzeba dodać, żeby pojawić się w AI Overviews lub AI Mode**, i że nie są do tego potrzebne żadne dodatkowe optymalizacje. Jedyne zalecenie dotyczące danych strukturalnych w tym kontekście brzmi - dane mają odpowiadać tekstowi widocznemu na stronie.

„Skoro Google mówi, że nie trzeba, czy schema ma w ogóle sens pod AI?” Ma, ale z innego powodu niż obiecują poradniki. Dane strukturalne opisują jednoznacznie **autora, organizację, daty publikacji i aktualizacji**, czyli sygnały, po których ocenia się wiarygodność treści. Jak je pokazać na stronie, opisujemy przy wymiarze [E-E-A-T](/pl/wymiary/e-e-a-t).

Inne systemy AI, takie jak ChatGPT czy Perplexity, nie publikują zaleceń dotyczących schema.org. Odpowiedzi AI cytują fragmenty tekstu, a nie znaczniki, więc **strona z idealnymi danymi strukturalnymi i słabą treścią nie zostanie zacytowana**. Co decyduje o cytowaniu, opisujemy w artykule [jak pojawić się w AI Overviews](/pl/blog/jak-pojawic-sie-w-ai-overviews).

> [!ZAPAMIETAJ]
> Google nie wymaga specjalnych danych strukturalnych do AI Overviews i AI Mode. Schema pomaga opisać autora i organizację, ale o cytowaniu decyduje treść widoczna na stronie.

## Które dane strukturalne wdrożyć?

Dane strukturalne odpowiadają **typowi strony, a nie liście wszystkich dostępnych typów**. Strona produktu potrzebuje innych znaczników niż artykuł, a artykuł innych niż strona kontaktowa. Tabela pokazuje typowe zestawy:

| Typ strony | Typy schema.org | Co dają w Google |
|---|---|---|
| artykuł, wpis na blogu | Article lub BlogPosting, Person (autor), BreadcrumbList | lepsze rozumienie autora i dat, okruszki w wyniku |
| produkt | Product, Offer, AggregateRating lub Review | cena, dostępność i oceny w wyniku |
| firma lokalna | LocalBusiness z adresem i godzinami | dane firmy w wynikach lokalnych |
| strona główna | Organization, WebSite | logo i nazwa witryny w wynikach |
| oferta pracy | JobPosting | wynik w wyszukiwarce ofert pracy Google |
| wydarzenie | Event | data i miejsce wydarzenia w wyniku |
| przepis | Recipe | zdjęcie, czas i oceny przepisu |

**Najpierw wdrażaj typy, za które Google pokazuje wynik rozszerzony na Twoich stronach** - u sklepu to Product z ofertą, u firmy usługowej LocalBusiness, u wydawcy Article z autorem. Typy, które nie mają wyniku rozszerzonego, dodawaj tylko wtedy, gdy opisują coś ważnego dla wiarygodności, na przykład autora albo organizację.

## Typy, które straciły wyniki rozszerzone

Google w 2023 roku **ograniczył wyniki rozszerzone FAQ i wycofał HowTo, a w 2025 roku ogłosił wycofanie 7 kolejnych typów**, między innymi Course Info i Claim Review. Znaczniki tych typów nie szkodzą, ale nie dają już efektu, dla którego wiele serwisów je wdrażało.

| Typ | Zmiana | Data |
|---|---|---|
| FAQPage | wynik rozszerzony tylko dla znanych serwisów rządowych i medycznych | sierpień 2023 |
| HowTo | wynik rozszerzony wycofany całkowicie | wrzesień 2023 |
| Book Actions, Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing | ogłoszone wycofanie z wyników wyszukiwania | czerwiec 2025 |
| Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing | usunięte z raportów Search Console i testu wyników rozszerzonych | wrzesień 2025 |

<figure><img src="/blog/pl/dane-strukturalne-zmiany.svg" alt="Oś czasu zmian w wynikach rozszerzonych Google. Sierpień 2023 - wyniki FAQ tylko dla serwisów rządowych i medycznych. Wrzesień 2023 - wycofanie wyników HowTo. Czerwiec 2025 - ogłoszenie wycofania 7 typów, w tym Course Info i Claim Review. Wrzesień 2025 - usunięcie 6 z nich z raportów Search Console i testu wyników rozszerzonych." width="640" height="420" loading="lazy" decoding="async"><figcaption>Wyniki rozszerzone FAQ i HowTo, za które wiele serwisów wdrażało schema, w praktyce zniknęły. Źródło: Google Search Central Blog, 2023 i 2025.</figcaption></figure>

Google zaznaczył przy zmianie z 2025 roku, że **wycofanie tych typów nie wpływa na pozycje stron**. FAQPage nadal ma sens na stronach z prawdziwą sekcją pytania i odpowiedzi, bo jednoznacznie opisuje jej strukturę, ale nie warto dopisywać sekcji FAQ tylko po to, żeby dostać wynik rozszerzony.

## Jak wdrożyć dane strukturalne w JSON-LD?

Dane strukturalne w JSON-LD wdrażasz jako **skrypt w kodzie strony, który opisuje te same informacje, które czytelnik widzi na ekranie**. W WordPressie robi to zwykle wtyczka SEO, w sklepach - szablon platformy, a w serwisach pisanych od podstaw - kod szablonu. Przykład dla wpisu na blogu znajdziesz niżej.

Wdrożenie przez Google Tag Manager albo własny skrypt też działa. Google pisze, że **odczytuje dane strukturalne dostępne w DOM po wyrenderowaniu strony**, a GTM wymienia jako jeden z najczęstszych sposobów. Dokumentacja dodaje dwa zastrzeżenia - przepisywanie danych strony do GTM zwiększa ryzyko rozjazdu między treścią a znacznikami, a przy produktach znaczniki generowane dynamicznie sprawiają, że Zakupy Google odczytują stronę rzadziej i mniej pewnie. Bezpieczniej umieścić JSON-LD bezpośrednio w HTML-u strony, a menedżera tagów używać tam, gdzie nie masz dostępu do szablonu.


```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Dane strukturalne - które wdrożyć i co dają w AI",
  "datePublished": "2026-10-30",
  "dateModified": "2026-10-30",
  "author": {
    "@type": "Person",
    "name": "Imię Nazwisko",
    "url": "https://example.com/autor"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nazwa firmy",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
  }
}
</script>
```

Najważniejsza zasada pochodzi z wytycznych Google - **nie oznaczaj treści, której czytelnik nie widzi na stronie**, a dane strukturalne muszą wiernie opisywać zawartość strony. Data w znaczniku ma być tą samą datą, którą pokazujesz pod tytułem, a autor - tym samym autorem, którego nazwisko stoi w treści.

> [!ZAPAMIETAJ]
> Dane strukturalne opisują to, co czytelnik widzi na stronie. Znacznik, który dopisuje niewidoczne informacje, grozi ręcznym działaniem i utratą wyników rozszerzonych.

## Jak sprawdzić dane strukturalne i znaleźć braki?

Dane strukturalne weryfikujesz na trzech poziomach - **pojedynczej strony, raportów Search Console i całego serwisu**. Każdy poziom odpowiada na inne pytanie.

1. **Pojedyncza strona.** Test wyników z elementami rozszerzonymi Google odpowiada na pytanie, czy strona kwalifikuje się do wyników rozszerzonych i jakie ma błędy. Schema Markup Validator na schema.org sprawdza poprawność składni wszystkich typów ze słownika, także tych, których Google nie obsługuje - używaj go, gdy wdrażasz typy bez wyniku rozszerzonego.
2. **Raporty Search Console.** Raporty wyników z elementami rozszerzonymi w Google Search Console pokazują strony z poprawnymi danymi i z błędami dla każdego obsługiwanego typu. Raport widzi jednak tylko typy, które już wdrożyłeś.
3. **Cały serwis.** Żadne z narzędzi Google nie powie, **których znaczników brakuje** na stronach danego typu. Do tego trzeba przejść cały serwis i porównać każdą stronę z zestawem typów pasujących do jej rodzaju.

Ostatni krok robi narzędzie [Analiza schema.org](/pl/narzedzia/analiza-schema). Czyta kod wszystkich stron z sitemapy, rozpoznaje typ każdej strony - jeden z 18 profili, od artykułu po ofertę pracy - i porównuje wykryte znaczniki z katalogiem ponad 30 typów schema. Rekomendacje, które nie pasują do treści, na przykład przepis bez listy składników, odrzuca, zamiast proponować błędny znacznik.

## Najczęstsze błędy w danych strukturalnych

Najczęstsze błędy w danych strukturalnych wynikają z **traktowania schema jako sztuczki zamiast opisu strony**. Cztery z nich spotyka się najczęściej:

- **oznaczanie treści niewidocznej na stronie** - na przykład ocen, których nie ma w treści, albo sekcji FAQ ukrytej w kodzie,
- **FAQPage dodawany tylko pod wynik rozszerzony** - od 2023 roku ten wynik dostają tylko serwisy rządowe i medyczne,
- **rozjazd danych ze stroną** - inna data w znaczniku niż pod tytułem albo cena w znaczniku niezgodna z ceną na stronie,
- **wdrożenie raz i zapomnienie** - nowe typy stron, dodane po uruchomieniu serwisu, zostają bez znaczników, bo nikt nie sprawdza całego serwisu.

Moim zdaniem najwięcej czasu marnuje się dziś na **znaczniki dopisywane „pod AI”** bez sprawdzenia, czy podstawowe typy są wdrożone poprawnie. Większy efekt daje uzupełnienie autora, dat i organizacji na wszystkich artykułach niż dodawanie egzotycznych typów, których żadna wyszukiwarka nie wykorzystuje.

## Podsumowanie

Dane strukturalne warto wdrażać tam, gdzie dają wynik rozszerzony albo jednoznacznie opisują autora i organizację. **Google nie wymaga specjalnych znaczników do AI Overviews i AI Mode, a wyniki FAQ i HowTo w praktyce zniknęły**, więc lista sensownych typów jest krótsza, niż sugerują poradniki. Zacznij od zestawu dla Twoich typów stron, wdróż go w JSON-LD zgodnie z widoczną treścią i sprawdź braki na całym serwisie. Szerzej o tym, jak dane strukturalne wpisują się w GEO, piszemy w artykule [co to jest GEO](/pl/blog/co-to-jest-geo), a o przeglądzie całej treści w poradniku [audyt treści](/pl/blog/audyt-tresci).

[Sprawdź dane strukturalne całego serwisu w narzędziu Analiza schema.org](/pl/narzedzia/analiza-schema) - wskażesz sitemapę i dostaniesz listę stron z brakującymi i niekompletnymi znacznikami dla każdego typu strony.

## Najczęstsze pytania

Poniżej odpowiedzi na pytania, które najczęściej padają przy wdrażaniu danych strukturalnych schema.org.

### Czy dane strukturalne wpływają na pozycję w Google?

Dane strukturalne nie podnoszą pozycji bezpośrednio. Google pisze, że ręczne działanie za błędne dane strukturalne odbiera tylko wynik rozszerzony i nie wpływa na ranking. Pośrednio mogą pomóc, bo wynik rozszerzony z ceną czy oceną zwykle lepiej przyciąga kliknięcia, a znaczniki ułatwiają Google zrozumienie strony.

### Czy FAQPage ma jeszcze sens?

FAQPage ma sens na stronach z prawdziwą sekcją pytań i odpowiedzi widoczną dla czytelnika, bo jednoznacznie opisuje jej strukturę. Wynik rozszerzony FAQ Google pokazuje jednak od sierpnia 2023 roku tylko znanym serwisom rządowym i medycznym, więc dla pozostałych stron ten znacznik nie zmieni wyglądu wyniku.

### JSON-LD czy mikrodane?

Dla Google wszystkie trzy formaty zapisu danych strukturalnych są równie dobre, ale zaleca JSON-LD jako najłatwiejszy we wdrożeniu i utrzymaniu. JSON-LD stoi w osobnym skrypcie, więc zmiana szablonu strony go nie psuje. Mikrodane zostaw tylko wtedy, gdy szablon już ich używa i działają poprawnie.

### Jak sprawdzić dane strukturalne na stronie?

Pojedynczą stronę sprawdzisz w teście wyników z elementami rozszerzonymi Google, a poprawność wszystkich typów w Schema Markup Validator. Błędy na całym serwisie pokazują raporty wyników z elementami rozszerzonymi w Search Console. Brakujące znaczniki znajdzie dopiero przegląd wszystkich stron z sitemapy porównany z typem każdej strony.

### Czy dane strukturalne pomagają w ChatGPT?

OpenAI nie publikuje zaleceń dotyczących schema.org dla wyszukiwania w ChatGPT. ChatGPT cytuje fragmenty tekstu, więc o cytowaniu decyduje treść strony i to, czy robot OAI-SearchBot może ją pobrać. Dane strukturalne mogą pomóc jednoznacznie opisać autora i firmę, ale nie zastąpią treści, która odpowiada na pytanie.

## Źródła

- Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), dostęp 2026-11-25,
- Google Search Central, [Introduction to structured data markup in Google Search](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), dostęp 2026-11-25,
- Google Search Central, [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), dostęp 2026-11-25,
- Google Search Central, [Generate structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript), dostęp 2026-11-25,
- Google Search Central Blog, [Changes to HowTo and FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes), 8 sierpnia 2023, dostęp 2026-11-25,
- Google Search Central Blog, [Simplifying the search results page](https://developers.google.com/search/blog/2025/06/simplifying-search-results), 12 czerwca 2025, dostęp 2026-11-25.
