// code: http://johnny-five.io/examples/photoresistor/

// hardware wiring: http://johnny-five.io/examples/photoresistor/

// info: LDR / Photoresistor / Photocell / Light dependant resistor
// https://en.wikipedia.org/wiki/Photoresistor

var five = require('johnny-five')
var board = new five.Board()
var photoresistor

board.on('ready', function() {
  photoresistor = new five.Sensor({
    pin: 'A2', // connect to analog pin A2
    freq: 250 // the value will be read every 250 milli seconds
  })

  board.repl.inject({
    pot: photoresistor
  })

  photoresistor.on('data', function() {
    console.log(this.value)
    // hover your finger above the LDR - do you see the values changing?
    // can you bring this value to the browser with Web Socket?
  })
})
