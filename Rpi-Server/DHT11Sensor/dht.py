#!/usr/bin/python
import sys
import time
import Adafruit_DHT
import MySQLdb

# Import DHT11 driver
sensor = Adafruit_DHT.DHT11

# PIN for read sensor signal. 
pin = 4

# Modify  (MySQL url, MySQL ID, MySQLpassword, DB_Name) 
db = MySQLdb.connect("localhost", "root", "thak12!@", "alarm_db")
cursor = db.cursor()

# Read DHT11 Data ( Temperature, Humidity  )
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin) 

# When receive correct data, print data in console and update mysql
if temperature is not None and humidity is not None:
	print 'Temperature = {0:0.1f}*C '.format(temperature)
	print 'Humidity = {0:0.1f}% ' .format(humidity)
	cursor.execute("UPDATE Setting SET temperature = {0:0.1f};".format(temperature))
	cursor.execute("UPDATE Setting Set humidity = {0:0.1f};".format(humidity))
	db.commit()


else: print 'Cant get sensor data!'


# close MySQL
db.close()

