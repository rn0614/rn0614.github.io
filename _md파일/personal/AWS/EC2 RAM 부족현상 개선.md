
```shell

#rem 용량 확인
free

# swap 파일 생성
# aws에서는 count=32로 예제가 써있는데 절반인 16을 적은 이유는 권장 크기가 2GB이기 때문이다 
sudo dd if=/dev/zero of=/swapfile bs=128M count=16

# 권한 설정
sudo chmod 600 /swapfile

# Linux 스왑 영역을 설정
sudo mkswap /swapfile

# 스왑 공간에 스왑 파일을 추가하여 스왑 파일을 즉시 사용 가능하게 설정
sudo swapon /swapfile

# 프로시저가 성공적인지 확인
sudo swapon -s

# **/etc/fstab** 파일을 편집하여 부팅 시 스왑 파일을 시작
sudo vim /etc/fstab

# 다음문구를 fstab 마지막에 추가
/swapfile swap swap defaults 0 0


```


https://jjong2.tistory.com/70
