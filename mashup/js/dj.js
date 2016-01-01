function GetAudioFromURL(URL, onLoadCallback, onProgressCallback, audioContext){
  if (!audioContext){
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    audioContext = new AudioContext();
  }
  var request = new XMLHttpRequest();
  request.open('GET', URL, true);
  request.responseType = 'arraybuffer';
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function(buffer){
      if (typeof onLoadCallback === 'function')
        onLoadCallback(null, buffer);
    },function (){
      if (typeof onLoadCallback === 'function')
        onLoadCallback(new Error("Decoding Error"), null);
    });
  };
  request.onerror = function(){
    if (typeof onLoadCallback === 'function')
      onLoadCallback(new Error("Loading Error"), null);
  }
  request.onprogress = function(event){
    if (typeof onProgressCallback === 'function'){
      onProgressCallback(event);
    }
  }
  request.send();
}

Reveal.addEventListener('slidechanged', function(e) {
  if (Reveal.getCurrentSlide().id === 'demo3c' && !window.context) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.context = new AudioContext();

    var socket = io('https://localhost:3002');
    var muteEl = document.getElementById('mute');
    var playEl = document.getElementById('play');
    var djEl = document.getElementById('play-dj');
    var pentatonic = [130.81,146.83,164.81,196.00,220.00,261.63,293.66,329.63,392.00,440.00,523.25,587.33,659.25, 783.99, 880.00];

    var prevTime = new Date().getTime();
    var prevSpeed = 0;
    var alpha = 0.7;
    var bufferObj = null;
    var bufferSource = context.createBufferSource();
    bufferSource.connect(context.destination);

    GetAudioFromURL('music/George_Ellinas_-_Mine_Yours_Ours.mp3', function(error, buffer) {
      bufferObj = buffer;
      bufferSource.buffer = buffer;
      bufferSource.loop = true;
    }, null, context)

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

    muteEl.addEventListener('click', function() {
      gain.gain.value = 0;
      bufferSource.stop(0);
      bufferSource = context.createBufferSource();
      bufferSource.connect(context.destination);
      bufferSource.buffer = bufferObj;
      bufferSource.loop = true;
    })

    playEl.addEventListener('click', function() {
      gain.gain.value = 1;
    });

    djEl.addEventListener('click', function() {
      bufferSource.start(0);
    })

    socket.on('gyroscopeChange', function (data) {
      var temp = (parseFloat(data.x) + 250) / 500 * (pentatonic.length - 1);
      // console.log('Data: ' + data.x + '     Temp: ' + temp);
      oscillator1.frequency.value = pentatonic[Math.round(temp)];
      oscillator2.frequency.value = 2 * oscillator1.frequency.value;
      oscillator3.frequency.value = 6 * oscillator1.frequency.value;
    })

    socket.on('shake', function (data) {
      var currTime = data.time;
      var tDiff = currTime - prevTime;
      if (tDiff < 190){
        tDiff = 190;
      }
      var speed = 300/tDiff;
      var smoothenedSpeed = ((1-alpha)*speed)+(alpha*prevSpeed);
      prevSpeed = smoothenedSpeed;
      console.log(smoothenedSpeed.toFixed(2));
      bufferSource.playbackRate.value = smoothenedSpeed + 0.4;
      prevTime = currTime;
    })
  }
})
