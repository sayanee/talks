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

var express = require('express');
var app = express().use(express.static(__dirname));
var server = https.createServer(credentials, app);

var colors = require('colors');
var slidesURLString = 'Open slides at ' + colors.black('https://localhost:3000');
var setCameraURLString = 'Set camera at ' + colors.black('chrome://settings/content#media-stream-settings');

server.listen(process.env.PORT || 3000, function () {
  console.log(slidesURLString);
  console.log(setCameraURLString);
})
