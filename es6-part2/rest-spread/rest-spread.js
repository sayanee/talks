// ES5: arguments[]
function push(separator) {
  var result = "";
  for (var i = 1; i < arguments.length; i++) {
      result += arguments[i] + separator;
    }
  return result;
}

console.log( "ES5 syntax: " + push(" ", "Mercury", "Venus", "Earth", "Mars") );

// Rest parameters "...items"
function push(separator, ...items) {
  var result = "";
  items.forEach(function(item) {
    result += item + separator;
  });
  return result;
}

// 1 fixed + 4 variable parameters
console.log( "ES6 syntax: " + push(" ", "Mercury", "Venus", "Earth", "Mars")); // rest parameters


// Spread operator "...weblink"
function createURL (comment, path, protocol, subdomain, domain, tld) {
      var shoutout = comment
        + ": "
        + protocol
        + "://"
        + subdomain
        + "."
        + domain
        + "."
        + tld
        + "/"
        + path;

  console.log( shoutout );
}

var weblink = ["hypertext/WWW/TheProject.html", "http", "info", "cern", "ch"],
  comment = "World's first Website";

createURL(comment, ...weblink ); // spread operator
