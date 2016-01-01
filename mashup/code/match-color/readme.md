# match-color

> Take a photo from your laptop connected camera, get the dominant color and use that color to light up an RGB LED. 

# install

1. Run with any web server (e.g. apache, nginx, node.js, etc). Here is an example with [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html):

  ```sh
  $ python -m SimpleHTTPServer 8000
  ```

# wiring electronics

1. wire up the RGB LED 

	![](wiring/led.jpg)
-  wire up the proximity sensor 

# credits

1. [web rtc and capture photo](http://mdn-samples.mozilla.org/s/webrtc-capturestill/)
- [color thief](http://lokeshdhakar.com/projects/color-thief/) to find the dominant color from an image
- [one color](https://github.com/One-com/one-color) for saturation

