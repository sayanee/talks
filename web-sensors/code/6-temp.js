// code: http://johnny-five.io/examples/temperature-lm35/

var five = require('johnny-five')

five.Board().on('ready', function() {
  var temperature = new five.Thermometer({
    controller: 'LM35',
    pin: 'A0'
  })

  temperature.on('data', function() {
    console.log(this.celsius)
  })
})
