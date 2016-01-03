// code: http://johnny-five.io/examples/button/
// same as 5-button.js

// connection: longer pin to the 5V and shorter pin to ground
var five = require('johnny-five')
var board = new five.Board()
var button

board.on('ready', function() {
  button = new five.Button(2)

  board.repl.inject({
    button: button
  })

  // tilt the breadboard to the right
  button.on('down', function() {
    console.log('down')
  })

  // tilt and hold
  button.on('hold', function() {
    console.log('hold')
  })

  // tilt the breadboard to the left
  button.on('up', function() {
    console.log('up')
  })
})
