// code: http://johnny-five.io/examples/piezo/

// hardware wiring: http://johnny-five.io/examples/piezo/
// connection: longer pin to analog, shorter pin to ground
// tip: you will need to put the buzzer on the breadboard so that it is easy to connect

var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function() {
  var piezo = new five.Piezo(3) // Digital PWM pin 3

  board.repl.inject({
    piezo: piezo
  })

  piezo.play({
    tempo: 120,
    song: [
      [ 'c4', 1 ],
      [ null, 1 ],
      [ 'd4', 1 ],
      [ null, 1 ],
      [ 'e4', 1 ],
      [ null, 1 ],
      [ 'f4', 1 ],
      [ null, 1 ],
      [ 'g4', 1 ],
      [ null, 1 ],
      [ 'a5', 1 ],
      [ null, 1 ],
      [ 'b5', 1 ],
      [ null, 1 ],
      [ 'c5', 1 ],
    ]
  })
})
