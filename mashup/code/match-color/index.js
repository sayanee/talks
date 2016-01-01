var express = require('express')
var app = express();

app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 3001, function () {
  console.log('Match color and proximity at http://localhost:' + server.address().port);
});
