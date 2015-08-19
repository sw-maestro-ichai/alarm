##How to install casperjs on the raspberry pi


###Install casperjs
GitHub에서 casperjs의 최신버전을 clone한다. (home directory)
> git clone git://github.com/n1k0/casperjs.git
> cd casperjs
> sudo ln -sf `pwd`/bin/casperjs /usr/local/bin/casperjs

###Install phantomjs

####Clone the latest version
GitHub에서 pantomjs의 최신버전을 clone한다. (casperjs directory)
>git clone https://github.com/piksel/phantomjs-raspberrypi.git
####Lets make it executable
directory의 위치를 다음과 같이 변경하고 phantomjs의 권한을 수정한다.
>cd phantomjs-raspberrypi/bin
>sudo chmod +x phantomjs
####Create a link for PhantomJs
>sudo ln -s /home/pi/casperjs/phantomjs-raspberrypi/bin/phantomjs /bin/phantomjs    


####Test your installation  
설치가 제대로 되었는지 확인하기 위해 다음 명령어를 친다.   
>phantomjs --version  
>casperjs  

정상 설치가 되었으면 아래와 같은 화면이 나온다.
![img](https://github.com/sw-maestro-ichai/alarm/blob/master/Manual/Pictures/caspertest.png)


###* 출처
><U>Quaintproject</U>. 26 April 2015. https://quaintproject.wordpress.com/2015/04/26/how-to-install-casperjs-on-the-raspberry-pi/