TCP에서만 연결 개념이 존재

Port 번호는 식별자. 

TCP는 client와 서버로 구성

client 측에서 port 를 열어 server 측 ip 로 연결

연결되지 않는 port 번호 접속시 kernel(tcp) 에서 차단



### TCP 연결과정(3-way Handshaking)
> 정책을 교환하는 과정



syn로 본인의 sequence Number를 보내고
ack로 상대방 sequence Number로 요청을 보냄

연결과정에서 mss(maximum segment size)를 보냄
그리고 둘중 작은 사이즈에 mtu를 맞춤

### TCP 연결 종료 과정 (4-way HandShaking)
연결, 연결종료의 시작주체는 client

