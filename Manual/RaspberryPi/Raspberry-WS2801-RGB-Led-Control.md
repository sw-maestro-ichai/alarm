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




### Reference
 - Raspberry GPIO : http://raspberrypi.org
 - WS2801 Data Sheet : https://www.adafruit.com/datasheets/WS2801.pdf
