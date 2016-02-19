// code and wiring the breadboard
// http://johnny-five.io/examples/potentiometer/

var five = require('johnny-five')
var board = new five.Board()
var potentiometer

board.on('ready', function() {
  potentiometer = new five.Sensor({
    pin: 'A2',
    freq: 500 // get the sensor value per milliseconds
  })

  board.repl.inject({
    pot: potentiometer
  })

  potentiometer.on('data', function() {
    console.log(this.value)
  })
})
