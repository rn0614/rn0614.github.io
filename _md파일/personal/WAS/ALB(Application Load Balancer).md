- Elastic Laod Balancer(ELB)의 한 종류
- Http/Https 의 트래픽 로드 밸런싱을 지원


### 대상그룹 설정
- 로드밸런싱 후 des uri 관리
- 인스턴스 설정 시 해당 인스턴스를 호출함


### 리스너 및 규칙
- HTTPS:443 으로 들어오는 작업에 대해서 내가 정한 그룹으로 보냄.
- 인증서는 ACM 으로 받은 인증서 따로 선택


- HTTP:80 리다이렉션으로 HTTPS://#{host}:443/#{path}?#{query} 로 보냄

