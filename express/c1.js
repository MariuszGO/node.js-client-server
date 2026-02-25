// Tworzymy funkcję asynchroniczną (bo będziemy czekać na odpowiedź z internetu)
async function main() {

  try {
    // Zmienna z naszym imieniem
    // const = stała (nie można jej później zmienić)
    const myName = "Adam";
    const nazwisko = "Kowalski"; 

    // fetch() wysyła zapytanie HTTP do serwera
    // Czekamy (await) aż serwer odpowie
    const response = await fetch("http://192.168.99.107:3000/imie", {

      // Określamy metodę HTTP
      // POST = wysyłamy dane do serwera
      method: "POST",

      // Nagłówki mówią serwerowi w jakim formacie wysyłamy dane
      headers: {
        "Content-Type": "application/json", // wysyłamy dane jako JSON
      },

      // body = dane które wysyłamy do serwera
      // JSON.stringify zamienia obiekt JS na tekst w formacie JSON
      body: JSON.stringify({
        name: myName,
        naz: nazwisko, // wysyłamy pole "name" z wartością "Adam"
      }),
    });

    // Wypisujemy w konsoli status odpowiedzi (np. 200, 404, 500)
    console.log("Status:", response.status);

    // response.json() odczytuje odpowiedź z serwera
    // i zamienia JSON na obiekt JavaScript
    const data = await response.json();

    // Wypisujemy odpowiedź serwera w konsoli
    console.log("Odpowiedź serwera:", data);

  } catch (err) {
    // Jeśli wystąpi błąd (np. serwer nie działa)
    // program trafi tutaj
    console.error("Błąd klienta:", err.message);
  }
}

// Wywołujemy funkcję, żeby program się wykonał
main();
