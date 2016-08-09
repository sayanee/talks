// code: http://johnny-five.io/examples/temperature-lm35/
// hardware wiring: http://johnny-five.io/examples/temperature-lm35/
// info: Search online "LM35 datasheet" - can you find more info about this sensor?

var five = require('johnny-five')

five.Board().on('ready', function() {
  var temperature = new five.Thermometer({
    controller: 'LM35',
    pin: 'A0' // Analog pin A0
  })

  temperature.on('data', function() {
    console.log(this.celsius)
    // tip: Too many decimal points? Try Math.round()
    // want to change the temperature? breathe on it!
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round

    // tip: Too jittery sensor value?
    // Try a low pass filter / smoothing algorithm / moving average
    // E.g. https://github.com/osuushi/Smooth.js/ or https://www.arduino.cc/en/Tutorial/Smoothing
  })
})
