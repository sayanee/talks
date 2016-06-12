#include "HttpClient/HttpClient.h"
#include "lib.h"

int analogvalue = 0;
char analogStr[100];
double cm = 0.0;
int trigPin = D4;
int echoPin = D5;
char distance[10];
unsigned long old_time = millis();
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

}

void loop()
{
    cm = rangefinder.getDistanceCM();
    sprintf(distance, "%.f", cm);
    Spark.publish("distance", distance);
    sendDistance(distance);
    delay(1000);
}

void sendDistance(char* distance) {
    char path[200];
    sprintf(path, "/update?key=7JGL56FZ2CBZCHZE&field1=%s", distance);
    Serial.println(distance);
    Serial.println(path);
    request.hostname = "10.0.1.22";
    request.port = 3000;
    request.path = path;

   http.post(request, response, headers);
}
