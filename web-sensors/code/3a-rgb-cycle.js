// Thanks to @caalberts https://github.com/sayanee/talks/issues/8
// Cycle through the red, green, blue colors

var five = 'johnny-five'
var board = new five.Board()

board.on('ready', function () {
  var led = new five.Led.RGB({
    pins: {
      red: 3,
      green: 5,
      blue: 6
    }
  })

  board.repl.inject({
    led: led
  })

  var colors = ['#FF0000', '#00FF00', '#0000FF']
  var i = 0
  led.on()

  setInterval(function () {
    led.color(colors[i % 3])
    i++
  }, 1000)
})
