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
NumOfLed = 20
LED = [0] * NumOfLed

# Setting SPI Device
# Can check "ls /dev " Command
SPI = "/dev/spidev0.0"

# Define LED function
def MakingColorBit(r, g, b):
    return ((r & 0xFF) << 16 | (g & 0xFF) << 8 | (b & 0xFF))

#
def OnLed(LedPos, r, g, b):
    openSPI = file(SPI, "w")
    LED[LedPos] = MakingColorBit(r, g, b);
    for i in range(NumOfLed)
        openSPI.write(chr((LED[LedPos]>>16) & 0xFF));
        openSPI.write(chr((LED[LedPos]>>8) & 0xFF));
        openSPI.write(chr(LED[LedPos] & 0xFF));
    openSPI.close()
    time.sleep(0.002)


OnLed(2, 0, 255, 0);
