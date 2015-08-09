#!/usr/bin/env python

from imapclient import IMAPClient
import time
import subprocess

import os

DEBUG = True

HOSTNAME = 'imap.gmail.com'
USERNAME = 'monibu1548'
PASSWORD = 'qhdks12!@'
MAILBOX = 'Inbox'

NEWMAIL_OFFSET = 1   # my unread messages never goes to zero, yours might
MAIL_CHECK_FREQ = 60 # check mail every 60 seconds

def loop():
    server = IMAPClient(HOSTNAME, use_uid=True, ssl=True)
    server.login(USERNAME, PASSWORD)

    if DEBUG:
        print('Logging in as ' + USERNAME)
        select_info = server.select_folder(MAILBOX)
        print('%d messages in INBOX' % select_info['EXISTS'])

    folder_status = server.folder_status(MAILBOX, 'UNSEEN')
    newmails = int(folder_status['UNSEEN'])

    if newmails >= 1:
        print "Exist new mail!!!!"
      	subprocess.call('bash /home/pi/alarm/ShellScript/checkEmail.sh', shell=True)

    if DEBUG:
        print "You have", newmails, "new emails!"

    if newmails > NEWMAIL_OFFSET:
        print "test1"

    else:
        print "test2"
    time.sleep(MAIL_CHECK_FREQ)

if __name__ == '__main__':
	print "Press Ctrl-C to quit."
	while True:
		loop()
