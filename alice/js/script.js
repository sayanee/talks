// More info at github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: false,
  progress: false,
  history: true,
  center: false,
  transition: 'none', // none/fade/slide/convex/concave/zoom

  // More info at github.com/hakimel/reveal.js#dependencies
  dependencies: [
    { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
    { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: 'plugin/zoom-js/zoom.js', async: true },
    { src: 'plugin/notes/notes.js', async: true }
  ]
})

// camera
var camera1 = document.getElementById('camera1')
var camera2 = document.getElementById('camera2')
var camera3 = document.getElementById('camera3')
var camera4 = document.getElementById('camera4')
var camera5 = document.getElementById('camera5')
var constraints = {
  audio: false,
  video: true
}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
function successCallback(stream) {
  window.stream = stream // stream available to console
  if (window.URL) {
    camera1.src = window.URL.createObjectURL(stream)
    camera2.src = window.URL.createObjectURL(stream)
    camera3.src = window.URL.createObjectURL(stream)
    camera4.src = window.URL.createObjectURL(stream)
    camera5.src = window.URL.createObjectURL(stream)
  } else {
    camera1.src = stream
    camera2.src = stream
    camera3.src = stream
    camera4.src = stream
    camera5.src = stream
  }
}
function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error)
}

navigator.getUserMedia(constraints, successCallback, errorCallback)

Reveal.addEventListener('slidechanged', function( event ) {
  if (Reveal.getIndices().h === 7) {
    camera1.play()
  } else if (Reveal.getIndices().h === 8) {
    camera2.play()
  } else if (Reveal.getIndices().h === 15) {
    camera3.play()
  } else if (Reveal.getIndices().h === 16) {
    camera4.play()
  } else if (Reveal.getIndices().h === 24) {
    camera5.play()
  }
})
