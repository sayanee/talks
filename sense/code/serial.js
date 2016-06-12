var SerialPort = require('serialport')
var port = new SerialPort.SerialPort('/dev/cu.usbmodem1411', {
  parser: SerialPort.parsers.readline('\n')
})

port.on('open', function() {
  port.on('data', function(data) {
    console.log(data);
  })
})
