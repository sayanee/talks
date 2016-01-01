// Understanding function scoped and variable hoisting
// Run in : Firefox browser > Web Developer > Web Console

// using for-in loop
// array
var planets = ["Mercury", "Venus", "Earth", "Mars"];
for (p in planets) {
  console.log(p); // 0,1,2,3
}

// object
var es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};
for (e in es6) {
  console.log(e); // edition, committee, standard
}

// ES6 for of loop
// array
var planets = ["Mercury", "Venus", "Earth", "Mars"];
for (p of planets) {
  console.log(p); // 0,1,2,3
}

// set
var engines = Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
    console.log(e);
    // Set only has unique values, hence Webkit shows only once
}

// map with key-value pairs
var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
