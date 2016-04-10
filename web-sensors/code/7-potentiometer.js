// code: http://johnny-five.io/examples/potentiometer/

// hardware wiring: http://johnny-five.io/examples/potentiometer/

var five = require('johnny-five')
var board = new five.Board()
var potentiometer

board.on('ready', function() {
  potentiometer = new five.Sensor({
    pin: 'A3', // Analog pin A3
    freq: 250 // value is read every 250 milli seconds
  })

  board.repl.inject({
    pot: potentiometer
  })

  potentiometer.on('data', function() {
    console.log(this.value, this.raw)
    // tip: Why is the minimum value 0? And the maximum value 1023?
    // Atmega 328p is a 10-bit ADC microcontroller (10 bit = 2^10 = 1024)
    // http://www.atmel.com/images/atmel-8271-8-bit-avr-microcontroller-atmega48a-48pa-88a-88pa-168a-168pa-328-328p_datasheet_complete.pdf
  })
})
