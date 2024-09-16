> 어떤 문제를 해결했나?
> 1. backend와 front 또는 다른 어플리케이션끼리의 데이터 송신 과정에서의 문제
> 2. 보안을 위한 SOP문제와 CORS 문제 발생
> 3. 이는 개발환경에서도 발생


### Sop : Same Origin Policy

 같은 Origin이 아니라면 접근을 금지하는 정책


### 2가지 해결책
1. 서버단 : Cors 설정(Cross Origin Resource Sharing)
2. 프론트단 : proxy를 통해 서버가 허용하는 origin으로 요청 송신

href : 전 url (protocol + hostname +port  +pathname + search(query) + hash)
origin : protocol + host + port


//Spring boot에서 Cors 설정
[[Spring Security]]