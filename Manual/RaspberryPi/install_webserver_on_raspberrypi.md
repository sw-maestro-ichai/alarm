#라즈베리파이 웹 서버 구축하기 (nginx + php + mysql)

[TOC]

##Nginx 설치
엔진엑스는 러시아 개발자 이고르 시셰프에 의해 개발된 오픈소스 서버 프로그램입니다. 구조적으로는 아파치에서 사용하는 스레드/프로세스 구조 대신 비동기 이벤트 기반 구조로 만들어졌기 때문에 더 적은 자원으로 더 빠르게 데이터를 서비스할 수 있다는 장점이 있습니다. 이러한 점들 덕분에 페이스북, 워드 프레스, 깃 허브, 네이버 첫 페이지 등 다양한 곳에서 사용되는 것으로 알려졌습니다. 라즈베리파이는 비교적 자원이 한정된 머신이므로 엔진엑스가 웹 서버에 제격이라고 할 수 있습니다. 그렇다면 본격적인 설치해봅시다.

<pre><code>sudo apt-get install nginx</pre></code>

이 것으로 엔진엑스의 설치는 끝났습니다. 잘 설치되있는지 확인하기 위해서 아래의 명령어를 입력해봅시다.

![image](http://cfile21.uf.tistory.com/image/2725D54555C05A1F1452B7)

이제 브라우저에서 라즈베리파이의 IP주소로 접속하면 다음과 같은 화면을 볼 수 있습니다.

![image](http://cfile22.uf.tistory.com/image/24212F4555C05A2016E974)

이제 여러분의 라즈베리파이는 웹 서버가 되었습니다.

##PHP 설치
php모듈을 포함한 상태로 실행되는 아파치와 달리, 엔진엑스는 php로 처리할 일이 생기면 독립적인  FastCGI 프로세스로 전달하게됩니다. 따라서 PHP-FPM(FastCGI Process Manager) 옵션이 켜진 상태로 컴파일된 php가 필요합니다.

<pre><code>sudo apt-get install php5-fpm</pre></code>

##Nginx와 PHP 설정 변경하기
nginx가 php를 사용한 컨텐트를 제공하도록 허가하기 위해 nginx의 설정을 변경할 것입니다. 아래의 명령어를 입력해봅시다.

<pre><code>sudo vi /etc/nginx/sites-available/default</pre></code>

아래와 같은 부분을 찾습니다.

![image](http://cfile21.uf.tistory.com/image/2240AC4555C05A2105ED24)

그리고 아래와 같이 되도록 윗 줄 앞의 '#'을 지웁니다.

![image](http://cfile9.uf.tistory.com/image/270B6F4555C05A22212436)

이를 통해 nginx는 80번 포트의 호출을 기다릴 수 있습니다. 다음으로 우리는 서버의 기본 index페이지인 index.html보다 index.php 가 먼저 불러오도록 하기 위해 index 라인을 고쳐야합니다.

![image](http://cfile30.uf.tistory.com/image/2516844555C05A231CF4F2)

위의 라인을 아래와 같이 고칩니다.

![image](http://cfile3.uf.tistory.com/image/27711D4555C05A252F9A86)

다음으로 php 설정 파일에 어떻게 php 파일을 다룰 것인지 알려줘야합니다. 아래와 같은 부분을 찾아봅시다.

![image](http://cfile27.uf.tistory.com/image/2235154555C05A270B649D)

찾으셨다면 아래와 같이 변경해봅시다.

![image](http://cfile6.uf.tistory.com/image/2128B53D55C05A28294963)

이제 우리의 서버는 소켓을 이용할 수 있습니다. 다음으로 보안상의 약점을 고치기 위해 PHP 설정을 고쳐야합니다. PHP 설정 파일을 고치기 위해 아래의 명령을 입력합니다.

<pre><code>sudo vi /etc/php5/fpm/php.ini</pre></code>

아래와 같은 부분을 찾아봅시다.

![image](http://cfile25.uf.tistory.com/image/242FE73D55C05A2A25E692)

이 부분을 아래와 같이 바꿔줍니다.

![image](http://cfile5.uf.tistory.com/image/2526BE3D55C05A2B2A0894)

이제 바뀐 설정들을 적용해봅시다. nginx와 php5-fpm을 재시작시킵니다.

<pre><code>sudo service php5-fpm restart
sudo service nginx restart</pre></code>

##PHP 설정 테스트
nginx와 php가 제대로 설정되었는지 테스트해봅시다. 아래의 명령어를 통해 기본 웹문서 홈으로 이동합니다.

<pre><code>cd /usr/share/nginx/www</pre></code>

아래의 명령을 통해 index.php 파일을 만들어봅시다.

<pre><code>sudo vi index.php</pre></code>

아래와 같은 내용을 입력하고 저장합니다.

<pre><code><?php phpinfo(); ?></pre></code>

웹 브라우저에서 라즈베리파이의 IP주소를 입력하신 후 아래와 같은 화면을 보신다면 설치가 제대로 완료된 것입니다.

![image](http://cfile4.uf.tistory.com/image/2118C63D55C05A2E31B0A0)

##MySQL 설치
서버에는 많은 양의 데이터가 발생되고 저장되는데 이러한 것들을 저장하고 처리하기 위해 많은 사람들이 서버에 데이터베이스를 연동합니다. 우리는 이 서버에 MySQL이란 데이터베이스를 설치하여 서버에 데이터를 저장하고 이를 처리하도록 할 것입니다. 그렇다면 설치를 시작해봅시다. 아래의 명령어를 입력합니다. (fix-missing 옵션은 몇몇 패키지가 누락되서 설치되는 것을 방지하기 위해서 입력합니다)

<pre><code>sudo apt-get install mysql-server --fix-missing</pre></code>

설치 중간에 root계정의 암호를 입력하고 재확인을 위한 화면이 아래와 같이 두 번 뜰 것입니다. 암호를 입력합시다.

![image](https://assets.digitalocean.com/articles/LEMP_Debian7/img1.png)

MySQL이 잘 설치되었는지 확인해보기 위해 다음 명령어를 통해 root계정으로 MySQL 서버에 접속해봅시다.

<pre><code>mysql -uroot -hlocalhost -p</pre></code>

![image](http://cfile27.uf.tistory.com/image/240F113355C0A85B19413F)

위와 같은 화면이 나온다면 MySQL이 설치된 것입니다.
