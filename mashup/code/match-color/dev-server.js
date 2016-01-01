// used on localhost with https and self signed certs
// for always-allow camera access

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {
  key: privateKey,
  cert: certificate
};

var express = require('express')
var app = express();

app.use(express.static(__dirname));

var server = https.createServer(credentials, app);

server.listen(process.env.PORT || 3001, function () {
  console.log('Match color and proximity at https://localhost:3001');
})
