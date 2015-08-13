#
#
#
#
#


# Import list
# GPIO
# time
# os
# sys
# random

import RPi.GPIO as GPIO, time, os, sys, random, threading


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

def playSound():
    os.system('omxplayer /home/pi/alarm/Rpi-Server/Sound/thunder.mp3')

def OnLedAll(colorCode):
    openSPI = file(SPI, "w")
    for i in range(NumOfLed):
        openSPI.write(chr((colorCode>>16) & 0xFF))
        openSPI.write(chr((colorCode>>8) & 0xFF))
        openSPI.write(chr((colorCode) & 0xFF))
    openSPI.close()
    time.sleep(0.002)

def OffLed():
    OnLedAll(0)

def OnLedRandom(colorCode):
    openSPI = file(SPI, "w")
    color = MakingColorBit(0, 0, 0)
    OffLed()
    for i in range(random.randint(0, NumOfLed-6)):                        
        openSPI.write(chr((color>>16) & 0xFF))
        openSPI.write(chr((color>>8) & 0xFF))
        openSPI.write(chr((color) & 0xFF))

    
    for j in range(5):
        openSPI.write(chr((colorCode>>16) & 0xFF))
        openSPI.write(chr((colorCode>>8) & 0xFF))
        openSPI.write(chr((colorCode) & 0xFF))
   
    openSPI.close()
    time.sleep(0.002)


def BreathMode(text):
    for loop in range(5):
        if text == "None":
            OnLedAll(textToColor(text))
        elif text == "Red":
            for i in range(255):
                OnLedAll(MakingColorBit(i, 0, 0))
            for i in range(255):
                OnLedAll(MakingColorBit(255-i,0,0))
        elif text == "Green":
            for i in range(255):
                OnLedAll(MakingColorBit(0,i,0))
            for i in range(255):
                OnLedAll(MakingColorBit(0,255-i,0))
        elif text == "Blue":
            for i in range(255):
                OnLedAll( MakingColorBit(0,0,i))
            for i in range(255):
                OnLedAll(MakingColorBit(0,0,255-i))
        elif text == "White":
            for i in range(255):
                OnLedAll(MakingColorBit(i,i,i))
            for i in range(255):
                OnLedAll(MakingColorBit(255-i,255-i,255-i))

  

def LightningMode(colorCode):
    try:
        for i in range(100):
            OnLedRandom(colorCode)
            time.sleep(0.05)
        OffLed()
    except KeyboardInterrupt:
        OffLed()
        sys.exit(0)

def textToColor(text):
    if text == "None":
        return MakingColorBit(0,0,0)
    elif text == "Red":
        return MakingColorBit(255,0,0)
    elif text == "Green":
        return MakingColorBit(0,255,0,)
    elif text == "Blue":
        return MakingColorBit(0,0,255)
    elif text == "White":
        return MakingColorBit(255,255,255)
    else:
        return MakingColorBit(0,0,0)

# Start source code. main flow
if len(sys.argv) != 4:
    print "WS2801 [ Normal | Alert ] [ colorCode ] [ Sound ON / OFF]"
    sys.exit(0)

if sys.argv[1] == "Normal":
    led = threading.Thread(target = BreathMode, args = (sys.argv[2],))
    led.start()
elif sys.argv[1] == "Alert":
    led = threading.Thread(target = LightningMode, args = (textToColor(sys.argv[2]),))
    led.start()
    if sys.argv[3] == "ON":
        sound = threading.Thread(target = playSound)
        sound.start()
