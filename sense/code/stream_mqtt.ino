#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <PubSubClient.h>

char ssid[] = "secret";
char pass[] = "secret";
int status = WL_IDLE_STATUS;

#define mqtt_server "10.0.1.22"
#define topic "topic"

WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
int sensorValue;
float temperature;
uint8_t blink = LOW;

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);
  Serial.begin(9600);

  Serial.println("Hello world!");

  WiFi.begin(ssid, pass);
  Serial.print("Connecting");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("You're connected to the network: ");
  Serial.print(WiFi.localIP());
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  sensorValue = analogRead(A0);
  temperature = (sensorValue / 1024.0) * 3.3 * 100.0;

  long now = millis();
  if (now - lastMsg > 1000) {
    lastMsg = now;

    Serial.print("New temperature: ");
    Serial.println(String(temperature).c_str());
    client.publish(topic, String(temperature).c_str(), true);

    digitalWrite(BUILTIN_LED, blink);
    blink = !blink;
  }
}
