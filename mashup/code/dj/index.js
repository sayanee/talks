// used on localhost with https and self signed certs
// for always-allow camera access

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {
  key: privateKey,
  cert: certificate
};

var util = require('util');
var async = require('async');
var SensorTag = require('sensortag');
var SensorTagShake = require('sensortag-shake');
var USE_READ = false;

var express = require('express')
var app = express();
var colors = require('colors');
var sockets = [];

app.use(express.static(__dirname));

var server = https.createServer(credentials, app);

server.listen(process.env.PORT || 3002);

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  sockets.push(socket);
})

function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = ' ' + s;
  return s;
}

SensorTag.discover(function(sensorTag) {
  sensorTag.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });

  async.series([
      function(callback) {
        console.log('connected!');
        sensorTag.connectAndSetUp(callback);
      },
      function(callback){
        var shake = new SensorTagShake('+x', {sensorTag : sensorTag});
        shake.on('shake', function(data){
          sockets.forEach(function(eachSocket) {
            eachSocket.emit('shake', data);
          });
        });
        callback();
      },

      function(callback) {
        sensorTag.enableAccelerometer(callback);
      },
      function(callback) {
        setTimeout(callback, 100);
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
          console.log('Temperature = %d °C', ambientTemperature.toFixed(1));
          callback();
        });
      },
      function(callback) {
        sensorTag.disableIrTemperature(callback);
      },

      // Humidity
      function(callback) {
        sensorTag.enableHumidity(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
        sensorTag.readHumidity(function(error, temperature, humidity) {
          console.log('Humidity = %d %', humidity.toFixed(1));
          callback();
        });
      },
      function(callback) {
        sensorTag.disableHumidity(callback);
      },

      // pressure
      function(callback) {
        sensorTag.enableBarometricPressure(callback);
      },
      function(callback) {
        setTimeout(callback, 2000);
      },
      function(callback) {
        sensorTag.readBarometricPressure(function(error, pressure) {
          console.log('Pressure = %d mBar', pressure.toFixed(1));
          callback();
        });
      },
      function(callback) {
        sensorTag.disableBarometricPressure(callback);
      },
      // gyroscope
      function(callback) {
        sensorTag.enableGyroscope(callback);
      },
      function(callback) {
        sensorTag.on('gyroscopeChange', function(x, y, z) {
          sockets.forEach(function(eachSocket) {
            eachSocket.emit('gyroscopeChange', {
              x: x.toFixed(1),
              y: y.toFixed(1),
              z: z.toFixed(1)
            });
          })

          process.stdout.clearLine();
          process.stdout.write(
            'X: ' + colors.red.bgCyan(pad(x.toFixed(1),7)) +
            '\tY: ' + pad(y.toFixed(1),7) +
            '\tZ: ' + pad(z.toFixed(1),7) + '   \r');
        });
        sensorTag.setGyroscopePeriod(200, function(error) {
          sensorTag.notifyGyroscope();
        });
      }
    ]
  );
});
