


Cache-Control

### Content-Type
Content-Type: text/html; charset=utf-8

Authorization



### Access-Control-Allow-Origin: 서버측에서 return 할 때 header 에 적음.


#### 요청 Http 메세지
GET https://www.zerocho.com HTTP/1.1  
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...  
Upgrade-Insecure-Requests: 1  
  
(본문 없음)

#### 응답 http메세지
```
HTTP/1.1 200 OK                  -- 시작줄
Connection: keep-alive        -- 헤더
Content-Encoding: gzip  
Content-Length: 35653  
Content-Type: text/html;  
  
<!DOCTYPE html><html lang="ko" data-reactroot=""><head><title...


```

REST api : 주소를 자원으로 보고 메서드를 동사로 보는 개발방식



### 캐시
cache-Control


### 쿠키
서버가 사용자의 웹브라우저에 전송하는 작은 데이터 조각
