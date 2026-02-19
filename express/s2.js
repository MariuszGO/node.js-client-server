/*
  ====== SERVER.JS (EXPRESS + FORMULARZ) ======
*/

// Wczytujemy bibliotekę Express
// require() = załaduj moduł do naszego pliku
const express = require("express");

// Tworzymy aplikację serwera
// app będzie naszym serwerem
const app = express();

// Ustawiamy numer portu
// Port to "drzwi", przez które łączy się przeglądarka
const PORT = 3000;


/*
  Middleware do obsługi JSON
  Przyda się jeśli kiedyś wyślemy dane jako JSON
*/
app.use(express.json());


/*
  🔥 WAŻNE DLA FORMULARZA

  Formularz HTML NIE wysyła JSON.
  Wysyła dane jako:
  name=Adam&naz=Kowalski

  express.urlencoded pozwala nam to odczytać
  i wrzucić do req.body
*/
app.use(express.urlencoded({ extended: true }));


/*
  ROUTE: GET /

  Gdy ktoś wejdzie w przeglądarce na:
  http://192.168.1.63:3000

  to wykona się ta funkcja
*/
app.get("/", (req, res) => {

  // res.send wysyła do przeglądarki kod HTML
  res.send(`

    <h1>Podaj swoje dane</h1>

    <!-- Formularz HTML -->
    <!-- method="POST" oznacza że dane będą wysłane metodą POST -->
    <!-- action="/imie" oznacza że dane trafią do endpointu /imie -->

    <form method="POST" action="/imie">

      <!-- Pole tekstowe na imię -->
      <!-- name="name" to nazwa pola -->
      <!-- To stanie się: req.body.name -->
      <input type="text" name="name" placeholder="Imię" required />

      <br><br>

      <!-- Pole tekstowe na nazwisko -->
      <!-- To stanie się: req.body.naz -->
      <input type="text" name="naz" placeholder="Nazwisko" required />

      <br><br>

      <!-- Przycisk wysyłający formularz -->
      <button type="submit">Wyślij</button>

    </form>

  `);
});


/*
  ROUTE: POST /imie

  Tutaj trafią dane z formularza
*/
app.post("/imie", (req, res) => {

  // Odczytujemy dane z formularza
  // req.body zawiera dane wysłane z formularza
  const name = req.body.name;
  const naz = req.body.naz;

  // Sprawdzamy czy dane istnieją
  if (!name || !naz) {
    return res.status(400).send("Brak danych");
  }

  // To wyświetli się w TERMINALU serwera
  console.log(`Był tu ${name} ${naz}`);

  // Wysyłamy odpowiedź do przeglądarki
  res.send(`
    <h2>Witaj ${name} ${naz}. Jak się masz?</h2>
    <a href="/">Wróć do formularza</a>
  `);
});


/*
  404 – jeśli ktoś wejdzie na nieistniejący adres
*/
app.use((req, res) => {
  res.status(404).send("404 - Nie znaleziono");
});


/*
  Uruchamiamy serwer

  app.listen:
  - otwiera port
  - zaczyna nasłuchiwać połączeń
*/
app.listen(PORT, "192.168.1.63", () => {

  // Ten komunikat pojawi się po uruchomieniu serwera
  console.log(`Serwer działa pod adresem: http://192.168.1.63:${PORT}`);

});
