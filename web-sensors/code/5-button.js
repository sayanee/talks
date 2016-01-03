// code: http://johnny-five.io/examples/button/
var five = require('johnny-five')
var board = new five.Board()
var button

board.on('ready', function() {
  button = new five.Button(2)

  board.repl.inject({
    button: button
  })

  button.on('down', function() {
    console.log('down')
  })

  button.on('hold', function() {
    console.log('hold')
  })

  button.on('up', function() {
    console.log('up')
  })

  // can you build a bell indicator on the browser? or a visualiser?
})
