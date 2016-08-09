// code: http://johnny-five.io/examples/led-rgb/
// hardware wiring: https://www.pjrc.com/teensy/rgb_led.gif
// 4 pins of RGB LED with longest pin to ground

// info: What does a digital pin with ~ mean?
// it is a PWM pin: https://www.arduino.cc/en/Tutorial/PWM

var five = require('johnny-five')

five.Board().on('ready', function() {
  var led = new five.Led.RGB({
    pins: {
      red: 6, // digital pin ~3
      green: 5, // digital pin ~5
      blue: 3 // digital pin ~6
    }
    // RGB pin layouts might not be the same as above (red: 3, green: 5, blue: 6)
    // try out and change the above pin numbers accordingly
  })

  this.repl.inject({
    led: led
  })

  led.on()
  led.color('#00ff00') // CSS Hex value
  // try the obvious ones first like #00ff00 green, #0000ff blue and #ff0000 red

  // tip: Always saturate the CSS color to the brightest possible if you want to display it on LED
  // Library: Use one-color https://github.com/One-com/one-color with .saturation()
  // color theory is not the same as light theory

  led.blink(2000) //  2000 milli seconds = 2 seconds
})
