/*
  ====== SERVER.JS (EXPRESS) ======

  Express to biblioteka, która upraszcza robienie serwera.
  W "czystym" Node.js musieliśmy sami ogarniać dużo rzeczy (nagłówki, routing itd.).
  Express robi to prościej:
  - app.get("/...", ...) = obsługa konkretnego adresu
  - res.json(...) = automatycznie wysyła JSON
*/

const express = require("express"); // wczytujemy Express
const app = express();              // tworzymy "aplikację serwera"

const PORT = 3000;                  // na tym porcie będzie działał serwer

/*
  Middleware (czyt. "pośrednik") – kod, który wykonuje się przed routami.
  Ten middleware jest wbudowany w Express i potrafi czytać JSON w body requestu
  (przyda się np. dla POST).
  Na razie nie jest konieczny dla GET, ale dodajemy, bo to standard.
*/
app.use(express.json());

/*
  ROUTE / ENDPOINT: GET /
  Czyli: gdy ktoś wejdzie na adres "http://127.0.0.1:3000/"
  metodą GET, to wykona się ta funkcja.
*/
app.get("/", (req, res) => {
  // req = request (żądanie od klienta)
  // res = response (odpowiedź, którą my odeślemy)

  // Przygotowujemy dane do wysłania
  const data = {
    ok: true,
    message: "Cześć z serwera Express!",
    time: new Date().toISOString(),
    cos: "sdsd",
  };

  /*
    res.json() robi kilka rzeczy naraz:
    - ustawia status 200 (domyślnie)
    - ustawia nagłówek Content-Type na application/json
    - zamienia obiekt JS na JSON
    - wysyła i kończy odpowiedź
  */
  res.json(data);
});

/*
  Drugi endpoint: GET /hello?name=Mariusz
  W przeglądarce/kliencie możesz wywołać:
  http://127.0.0.1:3000/hello?name=Mariusz
*/
app.get("/hello", (req, res) => {
  /*
    req.query to parametry w URL po znaku "?"
    np. /hello?name=Mariusz
    wtedy req.query.name = "Mariusz"
  */
  const name = req.query.name || "Nieznajomy";

  res.json({
    ok: true,
    message: `Hej, ${name}!`,
  });
});

/*
  Handler 404 – uruchomi się, jeśli żaden route powyżej nie pasował.
  Express leci po routach od góry do dołu.
  Jeśli nie znajdzie dopasowania -> trafia tutaj.
*/
app.use((req, res) => {
  res.status(404).send("404 - Nie znaleziono");
});

/*
  Uruchomienie serwera:
  app.listen otwiera port i zaczyna nasłuchiwać.
*/
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Serwer Express działa: http://127.0.0.1:${PORT}`);
});
