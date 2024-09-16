ROUTE53 으로 도메인 주소를 받아서 해당 도메인으로 올리는건 성공했는데 문제가 생겼다.

바로 도메인 주소 뒤에 PORT 번호를 명시해줘야 접근이 가능했다.


# 1. 첫번째 시도
-> 여전히 포트번호 없이(http: 80) 접근 시 nginx welcom 페이지만 호출되었다.

nginx 에서 설정을 바꿨다

```
/etc/nginx/sites-available/koosang-project 파일
server {
    listen 80;
    server_name spring.koosang-project.com;  # 여기에 도메인 이름을 입력(클라이언트 입력)

    location / {
        proxy_pass http://localhost:3000;  # 3000번 포트로 프록시(서버의 로컬에 연동)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```

 /etc/nginx/sites-available/koosang-project 부분에  위 내용을 넣었고 

/etc/nginx/nginx.conf 에서 바라보고 있는 /etc/nginx/sites-enable/ 과 available 을 심볼릭링크로 연결했다
```
	sudo ln -s /etc/nginx/sites-available/koosang-project /etc/nginx/sites-enabled/

	sudo nginx -t  #테스트 이상없음

	sudo systemctl restart nginx 재시작
```


# 2.  두번째 시도
-> 정상적으로 처리됐다. 문제는 default 로 설정한 nginx 파일이 가져간 것이다. 해당 default 파일을 삭제하여 내가 작성한 site-enable을 우선으로 만들었다.

/etc/nginx/sites-enable/default 에서 다른 nginx 로 proxy를 낚아 채는 부분이 있었다.

깔끔하게 날려버리고(백업을 하며....) 다시 실행했다.
```
sudo cp /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak #백업생성
sudo rm /etc/nginx/sites-enabled/default  # 삭제
sudo nginx -t # 구성 테스트 
sudo systemctl reload nginx # 변경사항 적용
```

잘 적용이 됐다. 2시간은 삽질을 하였다.

같은 서버를 proxy 하는 경우 sites-enable에 가장 먼저 있는 설정먼저 본다(따라서 우선순위를 정하고 싶으면 앞에 숫자식으로 저장하는게 도움이 된다고 한다. 


### 413 Request Entity Too Large
```
//요청한 파일이 너무 클 때 발생
// 서버 허용량 늘리는 설정
http{
  client_max_body_size 20rem;
}

```


[[오류 해결]]
[[NGINX설정]]
[[AWS]]