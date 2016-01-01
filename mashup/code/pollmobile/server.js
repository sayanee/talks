var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 8000;
var localip = require('local-ip');
var networkInterface = 'en0';

var server = app.listen(port, function() {
  localip(networkInterface, function(err, res) {
    if (err) {
      console.log('Server listening on http://localhost:' + port);
    } else {
      console.log('Open in mobile at http://' + res + ':' + port);
    }
  });
});

var io = require('socket.io').listen(server);

var options = {
  extensions: ['htm', 'html']
};
var questions = {
  q1: 'Have you played with Web Sockets?',
  q2: 'Do you know there are many sensors in your phones?',
  q3: 'Are you having fun with DeviceOrientation API?'
};

app.use(express.static(__dirname + '/public', options));

io.on('connection', function (socket) {

  socket.on('new', function (data) {
    console.log('Info: New client - ' + data + ' ' + socket.id);
    socket.broadcast.emit('connected', {
      id: socket.id,
      username: data
    });
  });

  socket.on('yes', function (data) {
    socket.broadcast.emit('yes', {
      id: socket.id,
      username: data
    });
  });

  socket.on('no', function (data) {
    socket.broadcast.emit('no', {
      id: socket.id,
      username: data
    });
  });

  socket.on('questions', function (data) {
    questions = data;
    socket.broadcast.emit('questions', questions);
  });

  socket.on('admin', function () {
    socket.emit('questions', questions);
  });

  socket.on('result', function () {
    socket.emit('questions', questions);
  });
});
