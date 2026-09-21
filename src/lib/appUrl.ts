/**
 * Adres aplikacji, do ktorej prowadza wszystkie CTA landinga (logowanie, rejestracja, audyt).
 *
 * Bylo zaszyte na sztywno w kilkunastu plikach, wiec na localhoscie kazdy przycisk wyrzucal na
 * produkcje - nie dalo sie przeklikac wlasnej zmiany. Teraz wartosc bierze sie z
 * `NEXT_PUBLIC_APP_URL`, a produkcyjna domena jest fallbackiem, zeby wdrozenie bez zmiennej
 * dzialalo jak dotad.
 *
 * Do pracy lokalnej: `NEXT_PUBLIC_APP_URL=http://localhost:3000` w `.env.local`.
 *
 * **Adresu NIE da sie zwinac do sciezki wzglednej** (`/login`): landing stoi na
 * `citationone.com`, aplikacja na `app.citationone.com`, wiec link bez domeny szukalby
 * `/login` na landingu i konczyl sie 404. LP jest eksportem statycznym, czyli wartosc
 * wchodzi w HTML na etapie builda.
 */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.citationone.com';
