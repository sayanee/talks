# Web and sensors

> a workshop on connecting various sensors and web technologies

## Quick start

1. Install dependancies `npm i`
- Start the presentation slides in browser `npm start`
- Go through the sample code in directory `code`

## Camera view

1. Plug the USB camera
- Change the camera source in [Chrome Settings > Content > Camera](http://stackoverflow.com/a/14617402/496797)
- Go to the [camera page](http://localhost:8000/camera.html)

## Pre-requisite

1. Download [Arduino IDE](https://www.arduino.cc/en/Main/Software)
- Get Arduino Uno + Basic Kit for Arduino Elecrow from [12 Geeks](https://12geeks.com/shop/)
- Install Node and NPM
- Working knowledge of Express, Web Socket / Socket.io
- Some of the following:
	1. Web Audio
	- Public API (E.g. Instagram, Twitter)
	- Graphing and charting (E.g. D3)
	- CSS3 Animations / SVG / Transitions
	- DOM manipulations

## Software list

1. [Arduino IDE](https://www.arduino.cc/en/Main/Software)
- Your text editor
- [Fritzing](http://fritzing.org/download/)

## Hardware list

### for everyone

1. Arduino Uno
- USB Cable A to B
- Breadboard
- Wire pack (pin to pin)
- Resistor pack
- (lesson 1) LED pack with single color
- (lesson 2) Light dependent resistor (LDR) or photocell
- (lesson 3) RGB LED
- (lesson 4) Buzzer (Piezo)
- (lesson 5) Push button
- (lesson 6) temperature [LM 35]
- (lesson 7) potentiometer / variable resistor
- (lesson 8) tilt sensor / switch
- (lesson 9) proximity sensor [HC SR04] *(Ask the trainer)*

![](img/lessons.jpg)

### for trainer

1. All above
- USB camera
- Multimeter
- 3 X proximity sensor

____

- Arduino pins + microcontroller - digital, analog and PWM
- (Upload the firmware code once)[https://github.com/rwaldron/johnny-five#setup-and-assemble-arduino]
- (Johnny Five API)[http://johnny-five.io/api/]
- `npm init`
- `npm i --save-dev johnny-five express`

### LED blink

- http://johnny-five.io/examples/
- `touch 1-blink.js`
- add [code](http://johnny-five.io/examples/#hello-world-see-more-) for blinking
- `node 1-blink`
- instead of on-board `LED 13`, try with another digital PIN

### RGB LED

- http://johnny-five.io/examples/led-rgb/
