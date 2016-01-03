// code: http://johnny-five.io/examples/potentiometer/

var five = require('johnny-five')
var board = new five.Board()
var potentiometer

board.on('ready', function() {
  potentiometer = new five.Sensor({
    pin: 'A2',
    freq: 250
  })

  board.repl.inject({
    pot: potentiometer
  })

  potentiometer.on('data', function() {
    console.log(this.value, this.raw)
    // can you bring these values to the browser for some visualisation or audio controls? 
  })
})
