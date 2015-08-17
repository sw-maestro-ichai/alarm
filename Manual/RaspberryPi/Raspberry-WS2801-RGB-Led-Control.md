# RGB Led WS2801 Control

- 이 문서는 Raspberry pi 2, Raspbian 기준으로 작성되었습니다.


### SPI Device 설정
 WS2801 RGB LED 는 SPI 통신을 이용하여 제어한다. 라즈베리파이로 WS2801 을 제어하기 위해 SPI 모드를 활성화 해야 한다.



 ```
 sudo raspi-config
 ```

 명령어를 통해 설정옵션에 들어간다.



 ```
 "8.  Advanced option" -> " A6. SPI " -> " <Yes> "

 ```
 다음과 같이 SPI 를 enable로 설정하며 설정이 완료되면 reboot 이 진행된다.


 리부팅이 완료 된 후
 ```
 ls /dev

 ```
 명령어로 현재 device 장치들을 확인한다. 정상적으로 SPI 모듈이 적재되었다면 다음과 같은 장치파일을 확인할 수 있다.

 > spidev0.0

 >spidev0.1


### Python 실행 환경 설정


  - Raspbian 에서는 기본적으로 python 이 설치되어 있으며 다른 OS 의 경우 해당 OS python 을 설치한다.

> sudo apt-get install python-dev

> sudo apt-get install python-pip

> sudo pip install spidev


## Python 으로 LED 모듈 동작시키기

> git : https://github.com/sw-maestro-ichai/alarm.git

> /alarm/Rpi-server/Control-RGB-LED/

실행방법

  1. RGB 모듈의 12v 를 외부 전원 + 극에 연결한다
  2. RGB 모듈의 GND 를 라즈베리파이의 GND ( 3 ) 번 핀에 연결한다.
  3. RGB 모듈의 DI ( Data Input ) 을 19번 핀에 연결한다.
  4. RGB 모듈의 CI ( Clock Input ) 을 23번 핀에 연결한다.
  5. 다음과 같은 명령어를 이용하여 LED를 동작시킬 수 있다.


>  python WS2801Control.py [ 모드 ] [ 색상 ] [ 천둥 ]

 - 모드
- "Normal" : Brath Mode LED 가 점멸한다
- "Alert" : 번개치는 듯한 LED 효과가 동작한다

- 색상
 - "Red" "Green" "Blue" "White" "None"


 > Example

 > python WS2801Control.py Alert White ON 을 입력할 경우
 
 천둥소리를 동반한 흰 번개효과 LED 가 발생한다.


 -  천둥
  - "ON" : LED 효과와 함께 천둥소리를 스피커를 통해 출력한다
  - "OFF" : 사운드 효과를 사용하지 않는다.



### Reference
 - Raspberry GPIO : http://raspberrypi.org
 - WS2801 Data Sheet : https://www.adafruit.com/datasheets/WS2801.pdf


## GPIO in Raspberry pi 2

![](http://raspberrypi.ssu.ac.kr/files/attach/images/134/387/311a169b7b18ffb16a8d912c7870c2ff.png)
![](http://raspberrypi.ssu.ac.kr/files/attach/images/134/387/9139466714267f511a61e8eb51a06ded.jpg)
