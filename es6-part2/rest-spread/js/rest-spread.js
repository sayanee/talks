var $__toObject = function(value) {
  if (value == null) throw TypeError();
  return Object(value);
}, $__spread = function() {
  var rv = [], k = 0;
  for (var i = 0; i < arguments.length; i++) {
    var value = $__toObject(arguments[i]);
    for (var j = 0; j < value.length; j++) {
      rv[k++] = value[j];
    }
  }
  return rv;
};
function push(separator) {
  var result = "";
  for (var i = 1; i < arguments.length; i++) {
    result += arguments[i] + separator;
  }
  return result;
}
console.log("ES5 syntax: " + push(" ", "Mercury", "Venus", "Earth", "Mars"));
function push(separator) {
  for (var items = [], $__0 = 1; $__0 < arguments.length; $__0++) items[$__0 - 1] = arguments[$__0];
  var result = "";
  items.forEach(function(item) {
    result += item + separator;
  });
  return result;
}
console.log("ES6 syntax: " + push(" ", "Mercury", "Venus", "Earth", "Mars"));
function createURL(comment, path, protocol, subdomain, domain, tld) {
  var shoutout = comment + ": " + protocol + "://" + subdomain + "." + domain + "." + tld + "/" + path;
  console.log(shoutout);
}
var weblink = ["hypertext/WWW/TheProject.html", "http", "info", "cern", "ch"], comment = "World's first Website";
createURL.apply(null, $__spread([comment], weblink));
