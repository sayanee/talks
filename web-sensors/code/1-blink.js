// code: http://johnny-five.io/examples/led-blink/

// connection: http://www.thirdeyevis.com/images/3v-led-diagram.png
// shorter pin to GND

var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function() {
  var led = new five.Led(13)
  led.blink(2000)
})
