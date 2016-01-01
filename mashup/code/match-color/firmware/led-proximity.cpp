// credits (Spark Tinker firmware): https://github.com/spark/firmware/blob/master/src/application.cpp
// credits (HC SR04 Ultra sonic proximity sensor): https://github.com/simonmonk/Spark_HC_SR04

#include "lib.h"
#include "application.h"

int tinkerDigitalRead(String pin);
int tinkerDigitalWrite(String command);
int tinkerAnalogRead(String pin);
int tinkerAnalogWrite(String command);

double cm = 0.0;

int trigPin = D4;
int echoPin = D5;

char distance[10];

unsigned long old_time = millis();

HC_SR04 rangefinder = HC_SR04(trigPin, echoPin);

void setup() {
    Spark.function("digitalread", tinkerDigitalRead);
    Spark.function("digitalwrite", tinkerDigitalWrite);

    Spark.function("analogread", tinkerAnalogRead);
    Spark.function("analogwrite", tinkerAnalogWrite);
}

void loop()
{

    if(millis() - old_time >= 1000){
        cm = rangefinder.getDistanceCM();
        sprintf(distance, "%f", cm);
        Spark.publish("distance", distance);
        old_time = millis();
    }
}

int tinkerDigitalRead(String pin) {
  int pinNumber = pin.charAt(1) - '0';
  if (pinNumber< 0 || pinNumber >7) return -1;

  if(pin.startsWith("D"))
  {
    pinMode(pinNumber, INPUT_PULLDOWN);
    return digitalRead(pinNumber);
  }
  else if (pin.startsWith("A"))
  {
    pinMode(pinNumber+10, INPUT_PULLDOWN);
    return digitalRead(pinNumber+10);
  }
  return -2;
}

int tinkerDigitalWrite(String command) {
  bool value = 0;
  int pinNumber = command.charAt(1) - '0';
  if (pinNumber< 0 || pinNumber >7) return -1;

  if(command.substring(3,7) == "HIGH") value = 1;
  else if(command.substring(3,6) == "LOW") value = 0;
  else return -2;

  if(command.startsWith("D"))
  {
    pinMode(pinNumber, OUTPUT);
    digitalWrite(pinNumber, value);
    return 1;
  }
  else if(command.startsWith("A"))
  {
    pinMode(pinNumber+10, OUTPUT);
    digitalWrite(pinNumber+10, value);
    return 1;
  }
  else return -3;
}

int tinkerAnalogRead(String pin) {
  int pinNumber = pin.charAt(1) - '0';

  if (pinNumber< 0 || pinNumber >7) return -1;

  if(pin.startsWith("D"))
  {
    pinMode(pinNumber, INPUT);
    return analogRead(pinNumber);
  }
  else if (pin.startsWith("A"))
  {
    pinMode(pinNumber+10, INPUT);
    return analogRead(pinNumber+10);
  }
  return -2;
}

int tinkerAnalogWrite(String command) {
  int pinNumber = command.charAt(1) - '0';
  if (pinNumber< 0 || pinNumber >7) return -1;

  String value = command.substring(3);

  if(command.startsWith("D"))
  {
    pinMode(pinNumber, OUTPUT);
    analogWrite(pinNumber, value.toInt());
    return 1;
  }
  else if(command.startsWith("A"))
  {
    pinMode(pinNumber+10, OUTPUT);
    analogWrite(pinNumber+10, value.toInt());
    return 1;
  }
  else return -2;
}
