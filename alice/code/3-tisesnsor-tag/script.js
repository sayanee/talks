var pentatonic = [130.81,146.83,164.81,196.00,220.00,261.63,293.66,329.63,392.00,440.00,523.25,587.33,659.25, 783.99, 880.00];
var audioButton = document.getElementById('start-gyroscope')

// start the trigger for web audio
window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.context = new AudioContext();

var MAIN_VOLUME = 0.5;
var gain = context.createGain();
gain.gain.value = 0; // initially muted

var oscillator1 = context.createOscillator();
var gain1 = context.createGain();
oscillator1.connect(gain1);
gain1.connect(gain);

oscillator1.start(0);

var oscillator2 = context.createOscillator();
var gain2 = context.createGain();
oscillator2.connect(gain2);
gain2.gain.value = 0.5;
gain2.connect(gain);

oscillator2.start(0);

var oscillator3 = context.createOscillator();
var gain3 = context.createGain();
oscillator3.connect(gain3);
gain3.gain.value = 0.2;
gain3.connect(gain);

oscillator3.start(0);

gain.connect(context.destination);

var socket = new WebSocket("ws://localhost:8003")
var limit = 60
var duration = 50000
var now = new Date(Date.now() - duration)
var width = 800
var height = 200
var groups = {
  x: {
    value: 0,
    color: 'goldenrod',
    data: d3.range(limit).map(function() {
      return 0
    })
  },
  y: {
    value: 0,
    color: 'black',
    data: d3.range(limit).map(function() {
      return 0
    })
  }
}

var x = d3.time.scale()
  .domain([now - (limit - 2), now - duration])
  .range([0, width])

var y = d3.scale.linear()
  .domain([-8, 8])
  .range([height, 0])

var line = d3.svg.line()
  .interpolate('basis')
  .x(function(d, i) {
    return x(now - (limit - 1 - i) * duration)
  })
  .y(function(d) {
    return y(d)
  })

var svg = d3.select('.graph').append('svg')
  .attr('class', 'chart')
  .attr('width', width)
  .attr('height', height + 50)

var paths = svg.append('g')

for (var name in groups) {
  var group = groups[name]
  group.path = paths.append('path')
    .data([group.data])
    .attr('class', name + ' group')
    .style('stroke', group.color)
}

function tick(xyData) {
  var now = new Date()

  for (var name in groups) {
    var group = groups[name]
    // var randomData = Math.abs((Math.random() * 4).toFixed(1))
    group.data.push(xyData[name])
    group.path.attr('d', line)
  }

  x.domain([now - (limit - 2) * duration, now - duration])
  // console.log('x domain', now - duration , ' - ', now - (limit - 2) * duration)

  paths.attr('transform', null)
    .transition()
    .duration(duration)
    .ease('linear')
    .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
  // console.log('path::::', x(now - (limit - 1) * duration))

  for (var name in groups) {
    var group = groups[name]
    group.data.shift()
  }
}

socket.onmessage = function(event) {
  var data = JSON.parse(event.data)

  if (data.type === 'connected') {
    console.log('SensorTag connected!')
    document.getElementById('status').innerHTML = '✔️ SensorTag connected!'
  } else if (data.type === 'temperature'){
    console.log(data.temperature + '°C')
    document.getElementById('status').innerHTML = '✔️ SensorTag connected!'
    document.getElementById('temperature').innerHTML = '✔️ Current temperature is ' + data.temperature + '°C'
  } else if (data.type === 'start_accelerometer') {
    document.getElementById('start-accelerator').innerHTML = 'Getting accelerometer data...'
    audioButton.style.display = 'block'
  } else if (data.type === 'accelerometer'){
    tick(data) // accelerometer
  } else if (data.type === 'gyro'){
    var temp = (parseFloat(data.x) + 250) / 500 * (pentatonic.length - 1);
    // console.log('Data: ' + data.x + '     Temp: ' + temp);
    oscillator1.frequency.value = pentatonic[Math.round(temp)];
    oscillator2.frequency.value = 2 * oscillator1.frequency.value;
    oscillator3.frequency.value = 6 * oscillator1.frequency.value;

  }
}

audioButton.addEventListener('click', function() {
  gain.gain.value = gain.gain.value === 0 ? MAIN_VOLUME : 0;

  if (gain.gain.value) {
    audioButton.className = 'active'
  } else {
    audioButton.className = ''
  }
})
