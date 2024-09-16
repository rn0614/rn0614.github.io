> 어떤 문제를 해결했나?
> 1. network 연결간의 문제 확인


application: 사용자가 사용하는 process
socket : application 이 Buffer에 데이터를 송신/수신 하기 위한 I/F
TCP: Buffer 에 들어있는 데이터를 관리하는 프로토콜(규약).
Buffer : 데이터를 송수신 하기 위한 메모리 공간
Stream : 연속적인 데이터
Packet : 네트워크에서 전송되는 데이터 단위 TCP header와 Stream으로 구성(=TCP Segment)