// ES5
// Run in : Firefox Web Console directly
var jsFuture = "es6";
(function () {
  if (!jsFuture) {
    var jsFuture = "es5";
  }
  console.log(jsFuture);
}());

// ES6
// Run in : Firefox Web Console directly
var jsFuture = "es6";
(function () {
  if (!jsFuture) {
    let jsFuture = "es5";
  }
  console.log(jsFuture);
}());
