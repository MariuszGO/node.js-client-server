/*
  ====== SERVER.JS ======

  To jest prosty serwer HTTP napisany w Node.js.

  Serwer to program, który:
  - uruchamia się
  - czeka na połączenia od klientów
  - gdy ktoś się połączy — wysyła odpowiedź
*/

// Wczytujemy wbudowany moduł Node.js o nazwie "http"
// Moduł to po prostu gotowy zestaw funkcji.
// "http" pozwala tworzyć serwery i klientów HTTP.
const http = require("http");

// Ustawiamy numer portu.
// Port to "drzwi", przez które ktoś łączy się z naszym programem.
// 3000 to popularny port testowy.
const PORT = 3000;

// HOST to adres IP.
// 127.0.0.1 oznacza: "ten komputer" (localhost).
// Czyli serwer będzie dostępny tylko na Twoim komputerze.
const HOST = "192.168.1.63";

/*
  Tworzymy serwer.

  http.createServer() przyjmuje funkcję.
  Ta funkcja wykona się ZA KAŻDYM RAZEM,
  gdy ktoś połączy się z serwerem.

  Funkcja ma dwa parametry:
  - req  (request)  → czyli żądanie od klienta
  - res  (response) → czyli odpowiedź, którą my odeślemy
*/
const server = http.createServer((req, res) => {

  // Wypisujemy w konsoli informację,
  // że ktoś się połączył
  console.log("Ktoś wysłał zapytanie!");
  console.log("Metoda:", req.method); // np. GET
  console.log("Adres:", req.url);     // np. /

  /*
    Sprawdzamy:
    - czy metoda to GET
    - czy ktoś wszedł na główną stronę "/"
  */
  if (req.method === "GET" && req.url === "/") {

    // Tworzymy zwykły obiekt JavaScript
    // To będzie nasza odpowiedź
    const data = {
      success: true,
      message: "Cześć z serwera!",
      time: new Date().toISOString()
    };

    /*
      Ustawiamy nagłówki odpowiedzi.

      200 = status OK (wszystko dobrze)
      Content-Type mówi przeglądarce/co klientowi,
      jaki typ danych wysyłamy.
      application/json = wysyłamy JSON
    */
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8"
    });

    /*
      res.end() kończy odpowiedź i wysyła dane.

      JSON.stringify() zamienia obiekt JavaScript
      na tekst w formacie JSON.
    */
    res.end(JSON.stringify(data));

    // Kończymy funkcję (żeby nie wykonało się 404 poniżej)
    return;
  }

  /*
    Jeśli ktoś wszedł na inny adres,
    np. /abc, to zwracamy 404.
  */
  res.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  res.end("404 - Nie znaleziono strony");
});

/*
  server.listen() uruchamia serwer.

  Od tego momentu:
  - Node "czeka"
  - program się nie kończy
  - nasłuchuje na porcie 3000
*/
server.listen(PORT, HOST, () => {
  console.log(`Serwer działa na http://${HOST}:${PORT}`);
});
