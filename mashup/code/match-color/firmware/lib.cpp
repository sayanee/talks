#include "lib1.h"

HC_SR04::HC_SR04(int trigPin, int echoPin){
  _minCM = 10.0;
  _maxCM = 250.0;
  _trigPin = trigPin;
  _echoPin = echoPin;
  pinMode(_trigPin, OUTPUT);
  pinMode(_echoPin, INPUT);
}

HC_SR04::HC_SR04(int trigPin, int echoPin, double minCM, double maxCM){
  _minCM = minCM;
  _maxCM = maxCM;
  _trigPin = trigPin;
  _echoPin = echoPin;
  pinMode(_trigPin, OUTPUT);
  pinMode(_echoPin, INPUT);
}

double HC_SR04::getDistanceCM(){
  sendTriggerPulse(_trigPin);
  waitForEcho(_echoPin, HIGH, 100);
  long startTime = micros();
  waitForEcho(_echoPin, LOW, 100);
  long endTime = micros();
  long duration = endTime - startTime;
  double distance = duration / 29.0 / 2.0;
  if (distance < _minCM || distance > _maxCM){
   return -1;
  }
  return distance;
}

double HC_SR04::getDistanceInch(){
  double distCM = getDistanceCM();
  if (distCM == -1){
     return -1;
  }
  return (distCM / 2.5);
}

void HC_SR04::sendTriggerPulse(int pin){
  digitalWrite(pin, HIGH);
  delayMicroseconds(10);
  digitalWrite(pin, LOW);
}

void HC_SR04::waitForEcho(int pin, int value, long timeout){
  long giveupTime = millis() + timeout;
  while (digitalRead(pin) != value && millis() < giveupTime) {}
}
