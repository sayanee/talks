// code: http://johnny-five.io/examples/led-blink/
// hardware wiring: http://www.thirdeyevis.com/images/3v-led-diagram.png
// tip: LED's shorter pin to GND

var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function() {
  var led = new five.Led(13) // connect to digital pin 13 on arduino uno board
  led.blink(2000) // 2000 milli seconds = 2 seconds --> Try changing this number?
})
