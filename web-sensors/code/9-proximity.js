// dependancy: Ping Firmata
// paste this in Arduino IDE and upload: https://gist.githubusercontent.com/rwaldron/0519fcd5c48bfe43b827/raw/f17fb09b92ed04722953823d9416649ff380c35b/PingFirmata.ino

// code: http://johnny-five.io/examples/proximity-hcsr04/

// hardware wiring: http://johnny-five.io/examples/proximity-hcsr04/

var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function() {
  var proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 7 // Digital pin 7
  })

  proximity.on('data', function() {
    console.log(this.cm + ' cm')
    // noisy data? You can use a smoothing algorithm:
    // http://stackoverflow.com/a/3761318/496797
  })
})
