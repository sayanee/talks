// Understanding function scoped and variable hoisting
// Run in : Firefox browser > Web Developer > Web Console

// ES5 using map()
var temperature = [0, 37, 100];

function degToKelvin(deg) {
  return deg + 273;
}

temperature.map(degToKelvin);

// ES6 syntax:

// from 1 loop: [273, 310, 373]
var temperature = [0, 37, 100];
[t + 273 for (t of temperature)]; // [273, 310, 373]

// from 3 nested loops for the game Cluedo
var suspects = ["Miss Scarlet", "Colonel Mustard"],
  weapons = ["Candlestick", "Dagger"],
  rooms = ["Kitchen", "Ballroom"];

[(console.log(s + " with a " + w + " in the " + r)) for (s of suspects) for (w of weapons) for (r of rooms)];

