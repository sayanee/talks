// t2 run index.js
// choose ssid TesselRouter
// open 192.168.1.101:8080

var tessel = require('tessel')
var portA = tessel.port.A
var servoPin = portA.pwm[0]
var angle = 0

var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser');
var server = app.listen(80, function () {
  console.log('Example app listening at http://%s:%s', '192.168.1.101', '80')
})
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ server: server })
var browsers = []

app.use(express.static(__dirname))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

tessel.pwmFrequency(50)
servoPin.pwmDutyCycle(1/20)

wss.on('connection', function connection(ws) {
  console.log('New browser conected!')
  browsers.push(ws)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message)

    if (message === 'turn') {
      turn()
    } else if (message === 'reset') {
      reset()
    }
  })
})

app.post('/vote', function (req, res) {
  turn()

  browsers.forEach(function(eachBrowser) {
    if (eachBrowser.readyState === eachBrowser.OPEN)  {
      eachBrowser.send(req.body.name)
    }
  })

  res.redirect('/')
})

app.get('/o',function(req,res){
  res.sendFile(__dirname + '/overview.html')
})

function turn() {
  angle += 30

  if (angle < 240) {
    servoPin.pwmDutyCycle(((angle)/180 + 1)/20)
  }
}

function reset() {
  angle = 30
  servoPin.pwmDutyCycle(1/20)
}
