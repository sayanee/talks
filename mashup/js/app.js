Reveal.initialize({
  controls: false,
  progress: false,
  history: true,
  center: false,
  margin: 0.1,
  transition: 'none',
  previewLinks: false,
  dependencies: [
    {
      src: 'lib/js/classList.js',
      condition: function() {
        return !document.body.classList;
      }
    },
    {
      src: 'lib/js/plugin/zoom-js/zoom.js',
      async: true
    },
    {
      src: 'lib/js/plugin/notes/notes.js',
      async: true
    },
    {
      src: 'lib/js/plugin/prism/prism.js',
      async: true
    },
  ]
});

// capture from laptop camera
var cameraDemo2A = document.getElementById('camera-demo2a');
var cameraDemo2B = document.getElementById('camera-demo2b');
var cameraDemo3A = document.getElementById('camera-demo3a');
var cameraDemo3B = document.getElementById('camera-demo3b');
var cameraDemo3C = document.getElementById('camera-demo3c');

var constraints = {
  audio: false,
  video: true
};

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function successCallback(stream) {
  window.stream = stream; // stream available to console
  if (window.URL) {
    cameraDemo2A.src = window.URL.createObjectURL(stream);
    cameraDemo2B.src = window.URL.createObjectURL(stream);
    cameraDemo3A.src = window.URL.createObjectURL(stream);
    cameraDemo3B.src = window.URL.createObjectURL(stream);
    cameraDemo3C.src = window.URL.createObjectURL(stream);
  } else {
    cameraDemo2A.src = stream;
    cameraDemo2B.src = stream;
    cameraDemo3A.src = stream;
    cameraDemo3B.src = stream;
    cameraDemo3C.src = stream;
  }
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);

Reveal.addEventListener('slidechanged', function(e) {
  if (Reveal.getCurrentSlide().id === 'camera') {
    video.play();
  } else if (Reveal.getCurrentSlide().id === 'demo2a') {
    cameraDemo2A.play();
  } else if (Reveal.getCurrentSlide().id === 'demo2b') {
    cameraDemo2B.play();
  } else if (Reveal.getCurrentSlide().id === 'demo3a') {
    cameraDemo3A.play();
  } else if (Reveal.getCurrentSlide().id === 'demo3b') {
    cameraDemo3B.play();
  } else if (Reveal.getCurrentSlide().id === 'demo3c') {
    cameraDemo3C.play();
  }
})
