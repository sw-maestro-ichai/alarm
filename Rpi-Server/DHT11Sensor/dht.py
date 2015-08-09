#!/usr/bin/python
import sys
import time
import Adafruit_DHT
import MySQLdb

sensor = Adafruit_DHT.DHT11
pin = 4

db = MySQLdb.connect("localhost", "root", "thak12!@", "Setting")
cursor = db.cursor()




temperature, humidity = Adafruit_DHT.read_retry(sensor, pin) 

if temperature is not None and humidity is not None:
	print 'Humidity = {0:0.1f}% '.format(temperature)
	print 'Temperature = {0:0.1f}*C ' .format(humidity)
	cursor.excute("UPDATE Setting SET temperature = {0:0.1f}, humidity = {0:0.1f};".format(temperature, humidity))
	db.commit()




else: print 'Cant get sensor data!'



db.close()

