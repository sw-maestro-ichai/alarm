#
# Raspberry pi 를 이용한 WS2801 Moudule control
# @Author JinjyuJung : Software Maestro 6th ICHAI
# @Version : 1.0.0
# @Date : 2015.8.5
#

import RPi.GPIO as GPIO, time, os, sys


# Inital GPIO Raspberry pi 2
GPIO.setmode(GPIO.BCM)
SPICLK = 23
SPIDO = 19

# Information Of WS2091 RGB LED Wire
# WS2081 Red    Wire = VCC ( Input 12 DC )
# WS2081 Yellow Wire = GND
# WS2081 Green  Wire = DI ( Data Input )
# WS2081 Blue   Wire = CI ( Clock Input)

# Setting LED Num ( Default = 20 )
NumOfLed = 40
LED = [0] * NumOfLed

# Setting SPI Device
# Can check "ls /dev " Command
SPI = "/dev/spidev0.0"

# Define LED function
def MakingColorBit(r, g, b):
    return ((r & 0xFF) << 16 | (g & 0xFF) << 8 | (b & 0xFF))

# On Led
# @Param LedPos Led 수, rgb 8비트 컬러코드
def OnLed(LedPos, r, g, b):
    openSPI = file(SPI, "w")
    LED[LedPos] = MakingColorBit(r, g, b);
    for i in range(NumOfLed):
        openSPI.write(chr((LED[LedPos]>>16) & 0xFF));
        openSPI.write(chr((LED[LedPos]>>8) & 0xFF));
        openSPI.write(chr(LED[LedPos] & 0xFF));
    openSPI.close()
    time.sleep(0.002)

def OffLed():
    OnLed(2,0,0,0);

#
# 숨쉬기 모드로 LED 를 동작시키는 함수
# @ Param LedPos Led 수 rgb 8비트 컬러코드
# ^C 시그널 입력시 LED 종료
#
def BreathMode(LedPos, r, g, b):
    try:
        while(True):
            for i in range(255):
                OnLed(LedPos, i, i, i);
            for i in range(255):
                OnLed(LedPos, 255-i, 255-i, 255-i);

    except KeyboardInterrupt:
        OffLed()
        sys.exit(0)

# g = 255 ( 백색 ) 숨쉬기 모드
BreathMode(2, 255, 255, 255)
