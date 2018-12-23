


#define VREF 5.0      // analog reference voltage(Volt) of the ADC

#define SCOUNT  30           // sum of sample point

int analogBuffer[SCOUNT];    // store the analog value in the array, read from ADC

int analogBufferTemp[SCOUNT];

int analogBufferIndex = 0,copyIndex = 0;

float averageVoltage = 0,tdsValue = 0,temperature = 25;

#define SSID        "h" //改为你的Wi-Fi名称

#define PASSWORD    "sangebaba"//Wi-Fi密码

#define HOST_NAME   "api.heclouds.com"

#define DEVICEID    "504597015" //OneNet上的设备ID

#define PROJECTID   "183756" //OneNet上的产品ID

#define HOST_PORT   (80)

String apiKey="ES9Wqmq6eAEoA7F8tyga2rcKumE=";//与你的设备绑定的APIKey



#define INTERVAL_SENSOR   17             //定义传感器采样时间间隔  597000

#define INTERVAL_NET      200             //定义发送时间

//传感器部分================================   

#include <Wire.h>                                  //调用库  

#include <ESP8266.h>

#include <I2Cdev.h>                                //调用库  

/*******温湿度*******/

#include <Microduino_SHT2x.h>

/*******光照*******/

#define  sensorPin_1  A0
#define  sensorPin_2  A1

#define IDLE_TIMEOUT_MS  3000      // Amount of time to wait (in milliseconds) with no data 

                                   // received before closing the connection.  If you know the server

                                   // you're accessing is quick to respond, you can reduce this value.



//WEBSITE     

char buf[10];



#define INTERVAL_sensor 20

unsigned long sensorlastTime = millis();



float FSROLED;



#define INTERVAL_OLED 200



String mCottenData;

String jsonToSend;



//3,传感器值的设置 

float sensor_FSR,sensor_TDS;                    //传感器温度、湿度、光照   

char  sensor_FSR_c[7],sensor_TDS_c[7];    //换成char数组传输

#include <SoftwareSerial.h>

#define EspSerial mySerial

#define UARTSPEED  9600

SoftwareSerial mySerial(2, 3); /* RX:D3, TX:D2 */

ESP8266 wifi(&EspSerial);

//ESP8266 wifi(Serial1);                                      //定义一个ESP8266（wifi）的对象

unsigned long net_time1 = millis();                          //数据上传服务器时间

unsigned long sensor_time = millis();                        //传感器采样时间计时器



//int SensorData;                                   //用于存储传感器数据

String postString;                                //用于存储发送数据的字符串

//String jsonToSend;                                //用于存储发送的json格式参数







void setup(void)     //初始化函数  

{       

  //初始化串口波特率  

    Wire.begin();

    Serial.begin(115200);

    while (!Serial); // wait for Leonardo enumeration, others continue immediately

    Serial.print(F("setup begin\r\n"));

    delay(100);

    pinMode(sensorPin_1, INPUT);
    pinMode(sensorPin_2, INPUT);



  WifiInit(EspSerial, UARTSPEED);



  Serial.print(F("FW Version:"));

  Serial.println(wifi.getVersion().c_str());



  if (wifi.setOprToStationSoftAP()) {

    Serial.print(F("to station + softap ok\r\n"));

  } else {

    Serial.print(F("to station + softap err\r\n"));

  }



  if (wifi.joinAP(SSID, PASSWORD)) {

    Serial.print(F("Join AP success\r\n"));



    Serial.print(F("IP:"));

    Serial.println( wifi.getLocalIP().c_str());

  } else {

    Serial.print(F("Join AP failure\r\n"));

  }



  if (wifi.disableMUX()) {

    Serial.print(F("single ok\r\n"));

  } else {

    Serial.print(F("single err\r\n"));

  }



  Serial.print(F("setup end\r\n"));

    

  

}

void loop(void)     //循环函数  

{     static unsigned long analogSampleTimepoint = millis();
   if(millis()-analogSampleTimepoint > 40U)     //every 40 milliseconds,read the analog value from the ADC
   {
     analogSampleTimepoint = millis();
     
     analogBuffer[analogBufferIndex] = analogRead(A1);//read the analog value and store into the buffer
     
     analogBufferIndex++;
     
     if(analogBufferIndex == SCOUNT) 
     
         analogBufferIndex = 0;
   }   
   static unsigned long printTimepoint = millis();
   if(millis()-printTimepoint > 800U)
   {
      printTimepoint = millis();
      
      for(copyIndex=0;copyIndex<SCOUNT;copyIndex++)
      
        analogBufferTemp[copyIndex]= analogBuffer[copyIndex];
        
      averageVoltage = getMedianNum(analogBufferTemp,SCOUNT) * (float)VREF / 1024.0; // read the analog value more stable by the median filtering algorithm, and convert to voltage value
      
      float compensationCoefficient=1.0+0.02*(temperature-25.0);    //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
      
      float compensationVolatge=averageVoltage/compensationCoefficient;  //temperature compensation
      
      tdsValue=(133.42*compensationVolatge*compensationVolatge*compensationVolatge - 255.86*compensationVolatge*compensationVolatge + 857.39*compensationVolatge)*0.5; //convert voltage value to tds value
    
    
   }

  if (sensor_time > millis())  sensor_time = millis();  

    

  if(millis() - sensor_time > INTERVAL_SENSOR)              //传感器采样时间间隔  

  {  

    getSensorData();                                        //读串口中的传感器数据

    sensor_time = millis();

  }  



    

  if (net_time1 > millis())  net_time1 = millis();

  

  if (millis() - net_time1 > INTERVAL_NET)                  //发送数据时间间隔

  {                

    updateSensorData();                                     //将数据上传到服务器的函数

    net_time1 = millis();

  }

  

}



void getSensorData(){  

   

    //获取光照

    sensor_FSR = analogRead(A0);
    sensor_TDS = tdsValue;    

    delay(1000);

    dtostrf(sensor_FSR, 2, 1, sensor_FSR_c);
     dtostrf(sensor_TDS, 2, 1, sensor_TDS_c);

   

}

void updateSensorData() {

  if (wifi.createTCP(HOST_NAME, HOST_PORT)) { //建立TCP连接，如果失败，不能发送该数据

    Serial.print("create tcp ok\r\n");



jsonToSend="{\"FSR\":";

    dtostrf(sensor_FSR,1,2,buf);

    jsonToSend+="\""+String(buf)+"\"";

    jsonToSend+=",\"TDS\":";

    dtostrf(sensor_TDS,1,2,buf);

    jsonToSend+="\""+String(buf)+"\"";

    

    jsonToSend+="}";






    postString="POST /devices/";

    postString+=DEVICEID;

    postString+="/datapoints?type=3 HTTP/1.1";

    postString+="\r\n";

    postString+="api-key:";

    postString+=apiKey;

    postString+="\r\n";

    postString+="Host:api.heclouds.com\r\n";

    postString+="Connection:close\r\n";

    postString+="Content-Length:";

    postString+=jsonToSend.length();

    postString+="\r\n";

    postString+="\r\n";

    postString+=jsonToSend;

    postString+="\r\n";

    postString+="\r\n";

    postString+="\r\n";



  const char *postArray = postString.c_str();                 //将str转化为char数组

  Serial.println(postArray);

  wifi.send((const uint8_t*)postArray, strlen(postArray));    //send发送命令，参数必须是这两种格式，尤其是(const uint8_t*)

  Serial.println("send success");   

     if (wifi.releaseTCP()) {                                 //释放TCP连接

        Serial.print("release tcp ok\r\n");

        } 

     else {

        Serial.print("release tcp err\r\n");

        }

      postArray = NULL;                                       //清空数组，等待下次传输数据

  

  } else {

    Serial.print("create tcp err\r\n");

  }

}
int getMedianNum(int bArray[], int iFilterLen) 
{
      int bTab[iFilterLen];
      for (byte i = 0; i<iFilterLen; i++)
    bTab[i] = bArray[i];
      int i, j, bTemp;
      for (j = 0; j < iFilterLen - 1; j++) 
      {
    for (i = 0; i < iFilterLen - j - 1; i++) 
          {
      if (bTab[i] > bTab[i + 1]) 
            {
    bTemp = bTab[i];
          bTab[i] = bTab[i + 1];
    bTab[i + 1] = bTemp;
       }
    }
      }
      if ((iFilterLen & 1) > 0)
  bTemp = bTab[(iFilterLen - 1) / 2];
      else
  bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
      return bTemp;
}
