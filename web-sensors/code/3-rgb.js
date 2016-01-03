// code: http://johnny-five.io/examples/led-rgb/

// connection: https://www.pjrc.com/teensy/rgb_led.gif
// longest pin to ground

var five = require('johnny-five')

five.Board().on('ready', function() {
  var led = new five.Led.RGB({
    pins: {
      red: 3,
      green: 5,
      blue: 6
    }
  })

  this.repl.inject({
    led: led
  })

  led.on()
  led.color('#ff0000')
  led.blink(2000)
})
