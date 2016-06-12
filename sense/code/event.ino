/* Send an HTTP POST request only when there's an event - Switch ON / OFF */
#include "HttpClient/HttpClient.h"

#define ON_PIN D0

bool state;
HttpClient http;
http_header_t headers[] = {
   { "Accept" , "*/*"},
   { NULL, NULL }
};

http_request_t request;
http_response_t response;

void setup()
{
    state = false;
    pinMode(ON_PIN, INPUT_PULLDOWN);

    Serial.begin(9600);
    Serial.println("Hello World!");
}

void loop()
{
    if (digitalRead(ON_PIN) != state) {
        if (digitalRead(ON_PIN) == HIGH) {
            Serial.println("ON");
            sendState(1);
            state = true;
        } else {
            Serial.println("OFF");
            sendState(0);
            state = false;
        }
    }
}

void sendState(int state) {
    char path[200];
    sprintf(path, "/update?key=GQL7FLZXTK35ATAO&field1=%d", state);

    Serial.println(path);

    request.hostname = "10.0.1.22";
    request.port = 3000;
    request.path = path;

   http.post(request, response, headers);
}
