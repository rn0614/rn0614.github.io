웹에서 서로 정보를 주고받기 위해 정한 하나의 규약

GET, POST, PUT, DELETE


Headers
- General
	- Request Url
	- Request Method
	- Status Code
	- Remote Address
	- Referrer Policy


Http 1.1 버전부터는 keep alive 기능 지원
- 여러 리소스를 받을 때 자원들을 다 받을 때까지 연결 상태를 유지하는 것



REST API (Representational State Transfer)
- REST 아키텍처를 따르는 API

resource : URI 를 이용
verb : HTTP 메서드를 이용



OAuth
구글이나 Facebook 같은 대규모 Aplication 에서 사용자 서비스를 받기 위해 도욉된 개념
인가된 accessToken을 통해서 서비스에 접근하지 id, pw로 접근하지 않음.