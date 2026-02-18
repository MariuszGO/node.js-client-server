/*
  ====== CLIENT.JS ======

  To jest klient, który:
  - robi request do serwera Express
  - odczytuje JSON
  - wypisuje wynik w konsoli
*/

// UWAGA: to działa w Node 18+ (tam fetch jest wbudowany).
// Jeśli masz starszy Node, napisz — dam wersję pod starszą.

async function main() {
  try {
    // 1) Request do "/"
    const res1 = await fetch("http://127.0.0.1:3000/");
    console.log("Status / :", res1.status);

    // .json() czyta odpowiedź i zamienia ją na obiekt JS
    const data1 = await res1.json();
    console.log("Odpowiedź / :", data1);

    // 2) Request do "/hello?name=..."
    const res2 = await fetch("http://127.0.0.1:3000/hello?name=ADAM");
    console.log("Status /hello :", res2.status);

    const data2 = await res2.json();
    console.log("Odpowiedź /hello :", data2);
  } catch (err) {
    console.error("Błąd klienta:", err.message);
  }
}

main();
