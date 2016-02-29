// code: http://johnny-five.io/examples/button/
// same as 5-button.js

// hardware wiring: longer pin to the 5V and shorter pin to ground

var five = require('johnny-five')
var board = new five.Board()
var tilt

board.on('ready', function() {
  tilt = new five.Button(2) // digital pin 2

  board.repl.inject({
    button: tilt
  })

  // tilt the breadboard to the right
  tilt.on('down', function() {
    console.log('down')
  })

  // tilt and hold
  tilt.on('hold', function() {
    console.log('hold')
  })

  // tilt the breadboard to the left
  tilt.on('up', function() {
    console.log('up')
  })
})
