// $ node --version

// $ node --v8-options | grep harmony

// $ node --harmony
// > Object.getOwnPropertyNames(Set.prototype)

// start the node repl
// $ node --harmony set.js

var engines = new Set(); // create new Set

engines.add("Gecko"); // add to Set
engines.add("Hippo"); // note that Hippo is added twice

console.log("Browser engines include Gecko? " + engines.has("Gecko"));
console.log("Browser engines include Hippo? " + engines.has("Hippo"));
console.log("Browser engines include Indigo? " + engines.has("Indigo"));

engines.delete("Hippo"); // delete item
console.log("Hippo is deleted. Browser engines include Hippo? " + engines.has("Hippo"));
