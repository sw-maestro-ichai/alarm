# Raspberry pi 2 에서 온도, 습도 센서 사용하기
- 센서는 DHT11 을 사용합니다
- python 을 사용하여 센서 값을 읽어  MySql 에 저장합니다
- Raspian OS 를 기준으로 작성된 문서입니다


##  DHT11 드라이버 다운로드

```
git clone https://github.com/adafruit/Adafruit_Python_DHT.git

```

위의 주소에서 Python 에서 DHT11 모듈을 사용하기 위한 드라이버를 다운로드합니다.
클론받은 폴더로 들어가 다음의 명령어를 입력하여 설치를 진행합니다.

```
> sudo python setup.py install
```

## 온도 습도 측정 값 읽어오기

  - vi를 열어 dht11.py 라는 파일을 생성하고 다음과 같은 코드를 입력한다.

```
#!/usr/bin/python
import sys
import time
import Adafruit_DHT

sensor = Adafruit_DHT.DHT11
pin = 4


temperature, humidity = Adafruit_DHT.read_retry(sensor, pin)

if temperature is not None and humidity is not None:
        print 'Humidity = {0:0.1f}% '.format(temperature)
        print 'Temperature = {0:0.1f}*C ' .format(humidity)

else: print 'Cant get sensor data!'

```
 - 터미널에서 sudo python dht11.py 명령어를 입력하면 현재 측정된 온.습도값이 출력된다.

 - 센서모듈을 연결 한 뒤 5분 정도 후 부터 정상적인 값이 출력된다


## python-pip 설치
- python 에서 MySql 관련 라이브러리들을 받기 위한 리포지토리를 설치 후 최신버전으로 업데이트를 실시합니다

```
sudo apt-get install python-pip
sudo pip install -U pip

```




## MySql - Python 드라이버 설치
- Python 에서 MySql 에 접근하고 제어하기 위한 드라이버를 설치합니다

```
sudo apt-get install python-dev libmysqlclient-dev
sudo pip install MySQL-python

```

### 설치가 정상적으로 되었는지 확인하는 방법
- python 에서 MySQL 에 연결해봄으로써 정상설치 되었는지 확인한다
- python을 실행시켜 다음과 같이 코드를 입력한다


```
python > import MySQLdb
python > db = MySQLdb.connect("localhost", "id", "pw", "table")
python > cursor = db.cursor()
python > cursor.execute("SELECT VERSION()")
python > data = cursor.fetchone()
python > print "Database version : %s " % data
db.close()

```


위 코드에서 id, pw, table 은 사용자가 설정한 값을 입력해야한다.

python 과 mysql의 연동이 성공적으로 되었다면 위의 코드를 실행시켰을때 다음과 같은 화면이 출력된다.

```
Database version : 5.54....(해당 버전)

```

## 측정한 온도, 습도값을 MySQL에 저장하기

 > https://github.com/sw-maestro-ichai/alarm/tree/master/Rpi-Server/DHT11Sensor/dht.py

  - 해당 파일을 다운받아. 현재 설정된 MySQL id, pw, DB_name 을 입력한다.
 UPDATE query 를 사용하여 습도와 온도 값을 업데이트한다.

  - 해당 파일을 실행 할 때는 관리자 권한으로 실행해야한다.


  > sudo python dht.py
