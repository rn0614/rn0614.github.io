[pm2](_md파일/AWS/pm2.md)

> 어떤 문제를 해결했나?
> 1. 하나의clode computer에 복수개의 어플리케이션을 실행하는 환경. 연결된 환경에서 같은 포트
>로 URL 주소만 다르게 해서 프로그램을 실행해야함
>   ex) 일반적인 / url 은 front인 nextjs 를 실행하도록
>      /api/ ~ 은 backend인 springboot를 실행하도록
 2. 비동기적으로 콘솔을 실행하여 실제 운영이 가능하도록 적용


```
//Nginx 설치
sudo apt install nginx

//Nginx 재기동
sudo service nginx restart
or
sudo nginx -s reload
```


## Nginx 설정 변경 위치
```
/etc/nginx/site-available 에서 nginx 설정이 있음.


sudo vim /etc/nginx/sites-available/default
```


## Nginx 내부 설정 관련
```
// listen : 모든 http 트래픽 수신 여부 ok
// server_name : 받는 도메인 명
// location / : 모든 주소에 대해서 localhost:3000으로 수신받음
server {
    listen 80;  # 모든 HTTP 트래픽을 수신
    server_name spring.koosang-project.com;  # 사용 중인 도메인

    location / {
        # Next.js 애플리케이션 포워딩 (Frontend)
        proxy_pass http://localhost:3000;  # Next.js가 실행 중인 포트
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        # Spring Boot 애플리케이션 포워딩 (Backend)
        proxy_pass http://localhost:4000;  # Spring Boot가 실행 중인 포트
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $server_name;
    }
}

```


```
//HTTPS 설정
sudo apt install cerbot python3-cerbot-nginx
sudo cerbot --nginx -d spring.koosang-project.com
```


```shell
# nginx 재시작
sudo systemctl reload nginx

# nginx 시작
sudo systemctl start nginx

# nginx service 확인
sudo systemctl status nginx.service
```