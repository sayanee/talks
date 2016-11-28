var five = require('johnny-five')
var pixel = require('node-pixel')
var fs = require('fs')
var board = new five.Board({
  port: findPort()
})
var ring = null
var express = require('express')
var app = express()
var blinker

app.use(express.static(__dirname))

var server = app.listen(8002, function () {
  console.log(`Demo 2 running at http://localhost:${server.address().port}`)
})

function findPort () {
  var port

  if (fs.existsSync('/dev/cu.usbmodem1421')) {
    port = '/dev/cu.usbmodem1421'
  } else if (fs.existsSync('/dev/cu.usbmodem1411')) {
    port = '/dev/cu.usbmodem1411'
  } else {
    port = ''
  }

  return port
}
board.on('ready', function() {
  console.log('Board ready, lets add light')

  var temperature = new five.Thermometer({
    controller: 'LM35',
    pin: 'A0',
    freq: 250
  })

  ring = new pixel.Strip({
    data: 6,
    length: 60,
    color_order: pixel.COLOR_ORDER.GRB,
    board: this,
    controller: 'FIRMATA',
  })

  ring.on('ready', function() {
    console.log('Strip ready, let\'s go');

    ring.off()

    app.get('/red', function(req, res) {
      console.log('GET /red')
      clearTimeout(blinker)
      ring.color('#400')
      ring.show()
      res.redirect('/')
    })

    app.get('/green', function(req, res) {
      console.log('GET /green')
      clearTimeout(blinker)
      ring.color('#040')
      ring.show()
      res.redirect('/')
    })

    app.get('/blue', function(req, res) {
      console.log('GET /blue')
      clearTimeout(blinker)
      ring.color('#004')
      ring.show()
      res.redirect('/')
    })

    app.get('/yellow', function(req, res) {
      console.log('GET /yellow')
      clearTimeout(blinker)
      ring.color('#609000')
      ring.show()
      res.redirect('/')
    })

    app.get('/color', function(req, res) {
      console.log('GET /color')
      clearTimeout(blinker)
      ring.color('#' + req.query.css)
      ring.show()
      res.redirect('/')
    })

    app.get('/temperature', function(req, res) {
      console.log('GET /temperature')
      clearTimeout(blinker)

      temperature.on('data', function() {
        var minTemp = 22.0
        var maxTemp = 30.0
        var css = ((this.celsius - minTemp) / (maxTemp - minTemp) * 255).toFixed(0)
        var cssString = 'rgba(' + css + ',' + css + ',0)'

        console.log(this.celsius + '°C')
        console.log(cssString)

        ring.color(cssString)
        ring.show();
      })

      res.redirect('/')
    })

    app.get('/clear', function(req, res) {
      console.log('GET /clear')
      clearTimeout(blinker)
      temperature.removeAllListeners()
      ring.off()
      res.redirect('/')
    })

    app.get('/breathe', function(req, res) {
      var color = 0
      var rising = true
      var max = 50
      var min = 0

      blinker = setInterval(function() {
        if (rising) {
          color++
          if (color >= max) {
            rising = false
            color = max
          }
        } else {
          color--
          if (color <= min) {
            rising = true
            color = min
          }
        }

        ring.color('rgba(' + color + ',' + color + ',' + color + ')')
        ring.show();
      }, 20)

      res.redirect('/')
    })
  })
})
