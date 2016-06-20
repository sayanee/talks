// RDRC Sense 2016: Photon + Proximity + HTTP

#include "SparkFunMAX17043/SparkFunMAX17043.h" // for lipo charger
#include "HttpClient/HttpClient.h" // for http
#include "lib.h" // for proximity sensor

int led = D7;
#define START_PIN D0

double cm = 0.0;
int trigPin = D4;
int echoPin = D5;
char distance[10];

double soc = 0;

HC_SR04 rangefinder = HC_SR04(trigPin, echoPin);

HttpClient http;
http_header_t headers[] = {
   { "Accept" , "*/*"},
   { NULL, NULL }
};

http_request_t request;
http_response_t response;


void setup()
{
    lipo.begin();
    lipo.quickStart();
    lipo.setThreshold(10);

    pinMode(START_PIN, INPUT_PULLDOWN);
    pinMode(led, OUTPUT);
}

void loop()
{
    cm = rangefinder.getDistanceCM();
    sprintf(distance, "%.f", cm);

    if (digitalRead(START_PIN) == HIGH) {
        Serial.println("START!");
        Spark.publish("distance", distance);
        sendDistance(distance);
        digitalWrite(led, HIGH);
        delay(1000);
        digitalWrite(led, LOW);
        delay(2000);
    } else {
        Serial.println("Stop.");
    }
}

void sendDistance(char* distance) {
    char path[200];
    sprintf(path, "/update?key=7JGL56FZ2CBZCHZE&field1=%s", distance);

    soc = lipo.getSOC();

    Serial.println(path);
    // Serial.println(soc);

    request.hostname = "192.168.2.1";
    request.port = 3000;
    request.path = path;

   http.post(request, response, headers);
}
