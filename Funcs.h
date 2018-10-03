/**
 * Copyright 2018, Gaurav Mishra <gmishx@gmail.com>
 */
class noteTime {
    //Class to keep track of code execution time with rollover protection
  private:
    static unsigned long timeellapsed, timestart;
  public:
    noteTime(void) {
      //Constructor to reset the timers
      timeellapsed = timestart = 0UL;
    }
    void startIt(void) {
      //Start the timer
      timestart = millis();
    }
    void stopIt(void) {
      //Stop the timer and update time ellapsed
      unsigned long curr = millis();
      timeellapsed = timeellapsed + ((curr > timestart) ? (curr - timestart) : ((0xFFFFFFFF - timestart) + curr));
    }
    void resetIt(void) {
      //Reset the timers
      startIt();
      timeellapsed = 0UL;
    }
    void addToIt(unsigned long a) {
      //Add arbitrary delay from sleep
      timeellapsed = timeellapsed + a;
    }
    unsigned long getEllapsed(void) {
      //Get the time ellapsed
      return timeellapsed;
    }
};
unsigned long noteTime::timeellapsed = 0UL;
unsigned long noteTime::timestart = 0UL;
double x = 0;
double ppmMG(float volts)
{ //Convert the voltage readings to PPM for MG811
  volts = volts * 1000;                                       //Volts to milliVolts
#define dcGain 5.67                                           //Gain of the amplifier
  x = volts / dcGain;                                         //Converting amplified output to original output
  if (x < 264.0) return 10000.0;                              //If original emf < minimum emf, give maximum output in PPM
  if (x > 325.0) return 400.0;                                //If original emf > greater than emf, give minimum output in PPM
  return pow(10.0, (-16.439 * log10(x)) + 43.84);             //Return PPM from emf
}
double ppmTGS(float volts)
{ //Convert the voltage readings to PPM for TGS2600
#define Vc 5.0                                                //VCC across sensor
#define Rl 10000.0                                            //Load between sensor and GND (10*10^3)
  //#define ro 20771.12438                                        //Resistance in fresh air
#define ro 19400.0
  double rs = ((Vc * Rl) / volts) - Rl;                       //Resistance of sensor
  x = rs / ro;                                                //RS/RO ratio
  if (x > 1)    return 0.0;                                   //If ratio greater than fresh air, return minimum PPB
  if (x < 0.69) return 100.0;                                 //If ratio less than datasheet, return maximum PPB
  return pow(10.0, -10.012 * log10(x) + 0.5391);              //Return PPB from ratio
}
double getVolts(byte pin)
{ //Reading analog input and converting to voltage for 'Samples' size of samples
  //Code from http://www.elcojacobs.com/eleminating-noise-from-sensor-readings-on-arduino-with-digital-filtering/
  // read multiple values and sort them to take the mode
  unsigned int sortedValues[200];
  for (int i = 0; i < 200; i++) {
    unsigned int value = analogRead(pin);
    byte j;
    if (value < sortedValues[0] || i == 0) {
      j = 0; //insert at first position
    }
    else {
      for (j = 1; j < i; j++) {
        if (sortedValues[j - 1] <= value && sortedValues[j] >= value) {
          // j is insert position
          break;
        }
      }
    }
    for (byte k = i; k > j; k--) {
      // move all values higher than current reading up one position
      sortedValues[k] = sortedValues[k - 1];
    }
    sortedValues[j] = value; //insert current reading
    delay(50);
  }
  //return scaled mode of 10 values
  double retval = 0;
  for (byte i = 95; i < 105; i++) {
    retval += sortedValues[i];
  }
  return ((retval / 10.0) * 5.0 / 1024.0);
}
void flushSerial() {
  //Empty the serial
  while (Serial.available())
    Serial.read();
}
void toggleGSM(byte pin) {
  //Turning ON/OFF the GSM/GPRS
  digitalWrite(pin, LOW);
  delay(3000);                        //Holding the pin low for 3 seconds
  digitalWrite(pin, HIGH);
}
const char specials[] = "{\":,}";     ///* String containing chars to be encoded */
static char hex_digit(char c)
{
  return "0123456789ABCDEF"[c & 0x0F];
}
char* urlencode(char* dst, char* src)
{ //Encode strings for HTTP GET
  char *d = dst;
  char c;
  while (c = *src++)
  { if (strchr(specials, c))
    { *d++ = '%';
      *d++ = hex_digit(c >> 4);
      *d++ = hex_digit(c);
    }
    else *d++ = c;
  }
  *d = '\0';
  return dst;
}
