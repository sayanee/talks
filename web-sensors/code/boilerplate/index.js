// code and wiring the breadboard
// http://johnny-five.io/examples/potentiometer/

var port = 8000
var five = require('johnny-five')
var board = new five.Board()
var potentiometer
var express = require('express')
var app = express().use(express.static('public'))
var server = app.listen(port, function () {
  console.log('App running on ' + port)
})
var io = require('socket.io').listen(server)

board.on('ready', function() {
  var sockets = []

  // setup to read / write to sensors

  io.on('connection', function (reply) {
    console.log('New client: ' + sockets.length)
    sockets.push(reply)
  })

  // sensor.on('data', function() {
    // var sensorValue = this.value

    // sockets.forEach(function(eachSocket, index) {
    //   console.log('Resistance: ' + resistance)
    //   eachSocket.emit('data', resistance)
    // })
  // })
})
