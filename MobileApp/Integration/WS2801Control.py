#
# 
# 
#
#


# - Import list
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

# For playing sound using bash shell command
def playSound():
    os.system('omxplayer /home/pi/alarm/Rpi-Server/Sound/thunder.mp3')

# OnLedAll function that writing color code in spi device
# @param colorCode RGB Code
# @return void 
def OnLedAll(colorCode):
    openSPI = file(SPI, "w")
    for i in range(NumOfLed):
        openSPI.write(chr((colorCode>>16) & 0xFF))
        openSPI.write(chr((colorCode>>8) & 0xFF))
        openSPI.write(chr((colorCode) & 0xFF))
    openSPI.close()
    time.sleep(0.002)

# OffLed function that initalize all led module rgb 0,0,0 (OFF)
# @param void
# @return void
def OffLed():
	#Set All Red off using colorcode 0,0,0
    OnLedAll(0)

# OnLedRandom that write colorCode in sequential 10 led for lightning effect
# @param colorCode
# @return void
def OnLedRandom(colorCode):
	#open device "w"rite mode
	openSPI = file(SPI, "w")
	#init spi device -> Led off for removing noise
	color = MakingColorBit(0, 0, 0)
	OffLed()
	#Determine random position that light on 0 ~ 30
	for i in range(random.randint(0, NumOfLed-10)):                        
		openSPI.write(chr((color>>16) & 0xFF))
		openSPI.write(chr((color>>8) & 0xFF))
		openSPI.write(chr((color) & 0xFF))
	#Turn on 10 led
	for j in range(10):
		openSPI.write(chr((colorCode>>16) & 0xFF))
		openSPI.write(chr((colorCode>>8) & 0xFF))
		openSPI.write(chr((colorCode) & 0xFF))
	openSPI.close()
	#Waiting device
	time.sleep(0.002)

# 
#
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
	OffLed()

def BreathTest(text):
    if text == "None":
        OnLedAll(textToColor(text))
    elif text == "Red":
        for i in range(85):
            OnLedAll(MakingColorBit(i*3, 0, 0))
        for i in range(85):
            OnLedAll(MakingColorBit(255-i*3,0,0))
    elif text == "Green":
        for i in range(85):
            OnLedAll(MakingColorBit(0,i*3,0))
        for i in range(85):
            OnLedAll(MakingColorBit(0,255-i*3,0))
    elif text == "Blue":
        for i in range(85):
            OnLedAll( MakingColorBit(0,0,i*3))
        for i in range(85):
            OnLedAll(MakingColorBit(0,0,255-i*3))
    elif text == "White":
        for i in range(85):
            OnLedAll(MakingColorBit(i*3,i*3,i*3))
        for i in range(85):
            OnLedAll(MakingColorBit(255-i*3,255-i*3,255-i*3))
    OffLed()
  

def LightningMode(text):
	colorCode = textToColor(text)
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

	
def LightningTest(text):
	colorCode = textToColor(text)
	try:
		for i in range(10):
			OnLedRandom(colorCode)
			time.sleep(0.05)
		OffLed()
	except KeyboardInterrupt:
		OffLed()
		sys.exit(0)


def LedPreview():
	try:
		if sys.argv[1] == "Test":
			if sys.argv[2] == "Normal":
				led = threading.Thread(target = BreathTest, args = (sys.argv[3],))
				led.start()
			elif sys.argv[2] == "Alert":
				led = threading.Thread(target = LightningTest, args = (sys.argv[3],))
				led.start()
			elif sys.argv[2] == "Sound":
				sound = threading.Thread(target = playSound)
				sound.start()
	except KeyboardInterrupt:
		led.stop()
		sound.stop()
		OffLed()
		sys.exit(0)

LedPreview()

# Start source code. main flow
if len(sys.argv) != 4:
	print "python WS2801Control.py [ mode = \"Normal\" | \"Alert\" ]"
	print "       [ color = \"Red\" \"Green\" \"Blue\" \"White\" \"None\" ]"
	print "       [ alert sound = \"ON\" / \"OFF\" ]" 
	print "[test] python WS2801Control.py Test [mode] [color]"
	sys.exit(0)

if sys.argv[1] == "Normal":
    led = threading.Thread(target = BreathMode, args = (sys.argv[2],))
    led.start()
elif sys.argv[1] == "Alert":
    led = threading.Thread(target = LightningMode, args = (sys.argv[2],))
    led.start()
    if sys.argv[3] == "ON":
        sound = threading.Thread(target = playSound)
        sound.start()
