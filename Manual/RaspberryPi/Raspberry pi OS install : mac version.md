#Raspberry pi OS install : mac version

### SD card 에 이미지 write
- 윈도우에서는 win32DiskImager 로 쉽게 OS 를 SD 카드에 쓸 수 있지만 mac에서는 사용불가
- dd명령어, utility 두가지 방법이 있다
	- dd 명령어로 이미지를 writing하는 도중 다른 파일 입출력시 파일이 깨질 수 있다
	- dd 명령어는 진행상황을 볼 수 없으므로 utility 를 사용하는 것이 안정적이다


###1.  dd 명령어를 통한 image writing
 - linux 명령어로 바이너리 단위로 복사하는 명령어


<code> sudo dd bs=1m if=[ raspbian os img 경로 ]  of = [ SD card 경로 ]</code>


- SD card 의 경로는 다음과 같이 확인할 수 있다.

<code>df -h</code>

###2. Install utility 를 통한 install

> https://github.com/RayViljoen/Raspberry-PI-SD-Installer-OS-X

위의 주소에서 raspberry os image writer 를 다운받을 수 있다.
 
 - 사용법
 > <code>./install [ img 경로 ]  </code>
