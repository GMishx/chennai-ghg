/**
 * Copyright 2018, Gaurav Mishra <gmishx@gmail.com>
 */
#include <SimpleDHT.h>                                                      //DHT11 - Temperature and Humidity
#include "Adafruit_FONA.h"                                                  //GSM/GPRS module
#include <Sleep_n0m1.h>                                                     //To make Arduino sleep
#include <ArduinoJson.h>                                                    //To create JSON easily
#include "Funcs.h"                                                          //Custom functions
#include <SoftwareSerial.h>                                                 //Software serial for GSM/GPRS

#define FONA_RX 2                                                           //RX pin for GSM/GPRS
#define FONA_TX 3                                                           //TX pin for GSM/GPRS
#define FONA_RST 7                                                          //Reset pin for GSM/GPRS
#define pinDHT11 8                                                          //DHT input pin
#define pinMG A1                                                            //MG811 CO2 input
#define pinTGS A0                                                           //TGS2600 CH4 input

// for DHT11,
//      VCC: 5V or 3V
//      GND: GND
//      DATA: 2

Sleep sleep;                                                                //Sleep object
SimpleDHT11 dht11;                                                          //DHT11 object
noteTime tT;                                                                //Object to keep track of execution time
char json[100] = "";                                                        //Creating empty JSON strings
StaticJsonBuffer<100> jsonBuffer;                                           //jsonBuffer for JSON object
JsonObject& root = jsonBuffer.createObject();                               //Creating root object for JSON
char replybuffer[255];                                                      //Reponse from GSM/GPRS
const char id[] = "1";                                                      //Unique ID of the device
boolean b = false;                                                          //GPRS was enabled?

SoftwareSerial fonaSS = SoftwareSerial(FONA_TX, FONA_RX);                   //Setting up the connections for GSM/GPRS
SoftwareSerial *fonaSerial = &fonaSS;                                       //Serial object for communication
Adafruit_FONA fona = Adafruit_FONA(FONA_RST);                               //Object for GSM/GPRS

void setup() {
  digitalWrite(FONA_RST, HIGH);                                             //Making the ON/OFF pin of GSM/GPRS HIGH
  Serial.begin(115200);                                                     //Serial to monitor on 115200 baud
  pinMode(pinDHT11, INPUT);                                                 //Making the DHT pin as input
  pinMode(pinMG, INPUT);                                                    //Making the MG811 CO2 pin as input
  pinMode(pinTGS, INPUT);                                                   //Making the MQ-5 CH4 pin as input
  pinMode(FONA_RST, OUTPUT);                                                //Making the 13 pin OUTPUT for Reseting GSM/GPRS
  sleep.pwrDownMode();                                                      //set sleep mode
  sleep.sleepDelay(60000);                                                  //sleep for: 1 minute to let sensors pre-heat
  // Serial.println(F("Initializing...."));
  fonaSerial->begin(4800);
}

void loop() {
  tT.startIt();                                                             //Strating the timer
  toggleGSM(FONA_RST);                                                      //Turning on the GSM/GPRS
  //Acquiring data
  byte temperature = 0;                                                     //Setting temperature to 0
  byte humidity = 0;                                                        //Setting humidity to 0
  dht11.read(pinDHT11, &temperature, &humidity, NULL);                      //Reading temperature and humidity

  // Serial.print("Temperature: "); Serial.print((int)temperature); Serial.print(" *C, "); Serial.print((int)humidity); Serial.println(" %");

  /*double volts = getVolts(pinMG);
    double co2 = ppmMG(volts);
    volts = getVolts(pinMQ);
    double ch4 = ppmMQ(volts);*/

  // Serial.print("CO2: "); Serial.print(volts); Serial.print("V, "); Serial.print(co2); Serial.println("PPM");
  // Serial.print("CH4: "); Serial.print(volts); Serial.print("V, "); Serial.print(ch4); Serial.println("PPM");

  //Final data
  root["i"] = id;                                                           //id of the sensor (unique)
  double v = getVolts(pinMG);
  root.set<double>("cv", v * 1000);
  root.set<double>("c", ppmMG(v));
  v = getVolts(pinTGS);
  root.set<double>("mv", v * 1000);
  root.set<double>("m", ppmTGS(v));                                         //Methane, 25 samples
  //delay(30000);
  root["t"] = (int)temperature;                                             //Temperature
  root["h"] = (int)humidity;                                                //Humidity
  root.prettyPrintTo(Serial);                                               //Debug
  root.printTo(json, sizeof(json));                                         //Creating JSON
  urlencode(replybuffer, json);                                             //Encoding for HTTP transmittion
  Serial.println(replybuffer);
  byte x = 0;
  for (x = 0; !fona.begin(*fonaSerial) & x < 3; x++) {                      //If connection fails
    // Serial.println(F("Couldn't find FONA"));
    //Turning on the GSM
    toggleGSM(FONA_RST);                                                    //Toggle GSM/GPRS (ON/OFF)
    //Serial.println("fona.begin failed");
  }
  if (x == 3) {
    goto fail;
  }
  // Serial.println(F("FONA is OK"));
  //fona.setGPRSNetworkSettings(F("airtelgprs.com"));                         //Setting the APN for the SIM for Airtel
  fona.setGPRSNetworkSettings(F("www"));                                    //Setting the APN for the SIM for Vodafonet
  // start working...

  for (x = 0; !fona.enableGPRS(true) & x < 3; x++) {                        //If connection fails
    //Serial.println("enableGPRS failed");
    if (b)fona.enableGPRS(false);                                           //If GPRS was enabled, disable it
    b = false;                                                              //GPRS not enabled
  }
  if (x == 3) {
    goto fail;
  }
  b = true;                                                               //GPRS enabled successfully
  //Uploading data
  uint16_t statuscode;                                                    //HTTP status code from request
  int16_t length;                                                         //Length of HTTP response
  //char url[180];                                                          //URL of page to upload data
  //sprintf(url, "%s%s", "http://chennaighgemissions.in/i.php?d=", replybuffer); //attaching data to URL
  sprintf(json, "%s%s", "http://chennaighgemissions.in/i.php?d=", replybuffer); //attaching data to URL
  flushSerial();                                                          //Empting the serial
  /*if (!fona.HTTP_POST_start(url, F("application/json"), (uint8_t *)jsonen, strlen(jsonen), &statuscode, (uint16_t *)&length)) {
    // Serial.println("Failed!");
    }
    while (length > 0) {
    while (fona.available()) {
      char c = fona.read();

      // Serial.write is too slow, we'll write directly to Serial register!
    #if defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
      loop_until_bit_is_set(UCSR0A, UDRE0); // Wait until data register empty.
      UDR0 = c;
    #else
      // Serial.write(c);
    #endif
      length--;
      if (! length) break;
    }
    }
    // Serial.println(F("\n****"));
    fona.HTTP_POST_end();*/
  //Serial.println(url);
  //if (!fona.HTTP_GET_start(url, &statuscode, (uint16_t *)&length)) {      //Uploading the data using GET
  if (!fona.HTTP_GET_start(json, &statuscode, (uint16_t *)&length)) {      //Uploading the data using GET
    Serial.println("HTTP_GET_start failed");
    //goto againGPRS;
  }
  fona.HTTP_GET_end();                                                    //Data uploaded
  /*uint16_t ussdlen;                                                       //Getting ballance remainig
    if (fona.sendUSSD("*123#", replybuffer, 250, &ussdlen)) {               //Sending request
    char ball[7];                                                         //To store ballance
    for (byte i = 0; i < 6; i++) {                                        //Copying the ballance
      ball[i] = replybuffer[16 + i];
    }
    ball[7] = '\0';
    urlencode(json, ball);
    sprintf(url, "%s%s", "http://chennaighgemissions.in/b.php?b=", json); //Creating URL to upload ballance
    fona.HTTP_GET_start(url, &statuscode, (uint16_t *)&length);           //Upload ballance data
    fona.HTTP_GET_end();                                                  //Upload over
    // Serial.print("Ballance: ");
    // Serial.println(ball);
    }*/
fail: if (b)fona.enableGPRS(false);                                            //If GPRS was enabled, disable it
  delay(500);
  toggleGSM(FONA_RST);                                                      //Turning off the GSM/GPRS
  tT.stopIt();
  // Sleep for 1 hour
  sleep.pwrDownMode();                                                      //set sleep mode
  sleep.sleepDelay(3600000UL - tT.getEllapsed());                           //sleep for: 1 hour - time executed
  tT.resetIt();                                                             //Reseting the timer
}
