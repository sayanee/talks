var async = require('async')
var SensorTag = require('sensortag')
var USE_READ = true;

var express = require('express')
var app = express()
var server = app.listen(8003)
console.log('Demo 3 running at localhost:8003')

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ server: server });
var browsers = []

wss.on('connection', function connection(ws) {
  console.log('New Browser connected!')
  browsers.push(ws)
})

app.use(express.static(__dirname))

SensorTag.discover(function(sensorTag) {
  sensorTag.on('disconnect', function() {
    console.log('disconnected!')
    process.exit(0)
  })

   async.series([
      function(callback) {
        console.log('Connected to Sensor Tag')
        browsers.forEach(function(eachBrowser) {
          if (eachBrowser.readyState === eachBrowser.OPEN)  {
            eachBrowser.send(JSON.stringify({
              type: 'connected'
            }))
          }
        })
        sensorTag.connectAndSetUp(callback)
      },

      // ambient temperature
      function(callback) {
        sensorTag.enableIrTemperature(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
        sensorTag.readIrTemperature(function(error, objectTemperature, ambientTemperature) {
          console.log('Temperature = %d °C', ambientTemperature.toFixed(1))

          browsers.forEach(function(eachBrowser) {
            if (eachBrowser.readyState === eachBrowser.OPEN)  {
              eachBrowser.send(JSON.stringify({
                type: 'temperature',
                temperature: ambientTemperature.toFixed(1)
              }))
            }
          })
          callback();
        });
      },
      function(callback) {
        sensorTag.disableIrTemperature(callback);
      },

      // accelerometer
      function(callback) {
        console.log('Enable Accelerometer');
        sensorTag.enableAccelerometer(callback);
      },
      function(callback) {
        browsers.forEach(function(eachBrowser) {
          if (eachBrowser.readyState === eachBrowser.OPEN)  {
            eachBrowser.send(JSON.stringify({
              type: 'start_accelerometer'
            }))
          }
        })

        sensorTag.on('accelerometerChange', function(x, y, z) {
          // console.log('\tx = %d G', x.toFixed(1))
          // console.log('\ty = %d G', y.toFixed(1))
          console.log('accelerometer',x.toFixed(1), y.toFixed(1))
          var data = JSON.stringify({
            type: 'accelerometer',
            x: x,
            y: y
          })

          browsers.forEach(function(eachBrowser) {
            if (eachBrowser.readyState === eachBrowser.OPEN)  {
              eachBrowser.send(data)
            }
          })
        })

        console.log('setAccelerometerPeriod')
        sensorTag.setAccelerometerPeriod(200, function(error) {
          console.log('notifyAccelerometer')
          sensorTag.notifyAccelerometer(callback)
        })
      },

      // gyroscope
      function(callback) {
        console.log('Enable Gryo');
        sensorTag.enableGyroscope(callback);
      },
      function(callback) {
        sensorTag.on('gyroscopeChange', function(x, y, z) {
          console.log('gyro',x.toFixed(1), y.toFixed(1))
          var data = JSON.stringify({
            type: 'gyro',
            x: x.toFixed(1),
            y: y.toFixed(1),
            z: z.toFixed(1)
          })

          browsers.forEach(function(eachBrowser) {
            if (eachBrowser.readyState === eachBrowser.OPEN)  {
              eachBrowser.send(data)
            }
          })
        });
        console.log('setGyroscopePeriod')
        sensorTag.setGyroscopePeriod(200, function(error) {
          console.log('notifyGyroscope')
          sensorTag.notifyGyroscope();
        });
      }
    ]
  )

  console.log('ohai')
})
