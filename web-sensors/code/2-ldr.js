// code: http://johnny-five.io/examples/photoresistor/

var five = require('johnny-five')
var board = new five.Board()
var photoresistor

board.on('ready', function() {
  photoresistor = new five.Sensor({
    pin: 'A2',
    freq: 250
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
