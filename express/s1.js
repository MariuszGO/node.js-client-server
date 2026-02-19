/*
  ====== SERVER.JS (EXPRESS) ======
*/

// Wczytujemy bibliotekę Express
// require() = załaduj moduł
const express = require("express");

// Tworzymy aplikację serwera
// app będzie naszym "serwerem"
const app = express();

// Ustawiamy numer portu, na którym będzie działał serwer
// Port to "drzwi", przez które klienci łączą się z serwerem
const PORT = 3000;

// Middleware do obsługi JSON
// Dzięki temu Express potrafi odczytać dane wysłane w body jako JSON
app.use(express.json());

/*
  Tworzymy endpoint (adres):
  POST /imie

  Czyli jeśli ktoś wyśle:
  POST http://192.168.1.63:3000/imie
  to wykona się ta funkcja poniżej
*/
app.post("/imie", (req, res) => {

  // Odczytujemy dane wysłane przez klienta
  // req.body to dane z body requestu
  // req.body.name to pole "name"
  const name = req.body.name;
  const naz = req.body.naz;

  // Sprawdzamy czy imię zostało podane
  if (!name) {

    // Jeśli nie ma imienia:
    // wysyłamy status 400 (błąd klienta)
    // oraz odpowiedź w formacie JSON
    return res.status(400).json({
      ok: false,
      message: "Nie podano imienia",
    });
  }

    if (!naz) {
    return res.status(400).json({
      ok: false,
      message: "Nie podano nazwiska",
    });
  }

  // Ten komunikat pojawi się w terminalu serwera
  // (nie u klienta!)
  console.log(`Osoba o imieniu: ${name}  ${naz} była na serwerze`);

  // Wysyłamy odpowiedź do klienta w formacie JSON
  // res.json:
  // - ustawia status 200
  // - ustawia nagłówek JSON
  // - wysyła dane
  res.json({
    ok: true,
    message: `Witaj ${name} ${naz} . Jak się masz?`,
  });
});


// 404 - obsługa błędnego adresu
// Jeśli żaden endpoint nie pasuje, kod trafi tutaj
app.use((req, res) => {
  res.status(404).send("404 - Nie znaleziono");
});


// Uruchamiamy serwer
// app.listen otwiera port i zaczyna nasłuchiwać
app.listen(PORT, "192.168.1.63", () => {

  // Ten komunikat pojawi się po uruchomieniu serwera
  console.log(`Serwer Express działa: http://192.168.1.63:${PORT}`);
});
