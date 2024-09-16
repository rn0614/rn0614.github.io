터미널 종료 후에도 실행되도록 pm2 라이브러리로 계속 실행하도록 설정하였다
```
sudo npm install pm2 -g

pm2 start npm --name "front" -- start

```


### pm2 리부팅시 내부에 앱들도 재실행설정
```
pm2 startup 
pm2 save
```


### 현재 pm2 로 저장된 리스트 보기/종료/재실행
```
pm2 list 
pm2 stop 앱이름
pm2 restart 앱이름
pm2 status 앱이름   #상태확인
pm2 delete 앱이름
```

## pm2 로그 보기 명령어
```
pm2 logs 앱이름

```




[[오류 해결]]
[[AWS/pm2]]