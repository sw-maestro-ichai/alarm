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

