var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.use(express.static(__dirname))

var server = app.listen(port, function() {
  console.log(`View RDRC Slides at localhost:${port}`)
})
