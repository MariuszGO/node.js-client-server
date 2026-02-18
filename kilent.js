/*
  ====== CLIENT.JS ======

  Klient to program, który:
  - łączy się z serwerem
  - wysyła zapytanie
  - odbiera odpowiedź
*/

const http = require("http");

// Opcje połączenia
// Tu mówimy:
// - gdzie się łączymy
// - jaki port
// - jaka ścieżka
// - jaką metodą (GET)
const options = {
  hostname: "127.0.0.1", // adres serwera
  port: 3000,            // port serwera
  path: "/",             // adres strony
  method: "GET"          // metoda HTTP
};

/*
  Tworzymy request (żądanie).

  http.request() wysyła zapytanie do serwera.
  Drugi parametr to funkcja,
  która wykona się gdy serwer odpowie.
*/
const req = http.request(options, (res) => {

  console.log("Połączono z serwerem!");
  console.log("Status odpowiedzi:", res.statusCode);

  // Tu będziemy zbierać dane z odpowiedzi
  let body = "";

  /*
    Dane przychodzą "kawałkami".
    Dlatego słuchamy zdarzenia "data".
  */
  res.on("data", (chunk) => {

    // Doklejamy kolejne części tekstu
    body += chunk.toString("utf8");
  });

  /*
    To zdarzenie wykona się,
    gdy wszystkie dane już dotrą.
  */
  res.on("end", () => {

    console.log("Odpowiedź serwera:");
    console.log(body);

    /*
      Spróbujmy zamienić tekst JSON
      z powrotem na obiekt JavaScript
    */
    try {
      const parsed = JSON.parse(body);
      console.log("Zparsowany JSON:", parsed);
    } catch (err) {
      console.log("To nie był poprawny JSON");
    }
  });
});

/*
  Obsługa błędu (np. gdy serwer nie działa)
*/
req.on("error", (err) => {
  console.error("Błąd połączenia:", err.message);
});

/*
  req.end() wysyła żądanie.
  Bez tego nic by się nie stało.
*/
req.end();
