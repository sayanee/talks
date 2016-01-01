// $ node --version

// $ node --v8-options | grep harmony

// $ node --harmony
// > Object.getOwnPropertyNames(Set.prototype)

// start the node repl
// $ node --harmony map.js

// create new Map
var es6 = new Map();

// set map
es6.set("edition", 6);        // key is string
es6.set(262, "standard");     // key is number
es6.set(undefined, "nah");    // key is undefined
es6.set(null, "noooooooooo");    // key is undefined


var hello = function() { console.log("hello"); };
es6.set(hello, "Hello ES6!"); // key is function

// has map
console.log( "Value of 'edition' exits? " + es6.has("edition") );     // true
console.log( "Value of 'year' exits? " + es6.has("years") );          // false
console.log( "Value of 'year' exits? " + es6.has(null) );          // false

console.log( "Value of undefined exits? " + es6.has(undefined) );     // true

// delete map
es6.delete(undefined);
console.log( "Value of undefined exits? " + es6.has(undefined) );      // false

// get map
console.log( es6.get(hello) ); // Hello ES6!
console.log( "Work is in progress for ES" + es6.get("edition") ); // Work is in progress for ES6
