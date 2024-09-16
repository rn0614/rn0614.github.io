
Architecture의 목표 : 제약조건과 용도에 맞게 설계
- Software 특성상 계속 변경되기 때문에 이런 특성에 맞게 설계가 중요


1. Server-Side Rendering
2. State Management
3. Data loading 
4. Code Splitting
5. Project Organization


### 1.Server-Side Rendering
Client-Side Rendering의 특징
client-side Rendering 시 Browser 동작방식
1. Loads index.html from server
2. loads js bundle from server
3. run bundle
4. display app
5. loads data

서버에는 부담이 적지만 유저 경험이 좋진 않음


Server-side Rendering 시 Browser 동작방식
1. run js bundle
2. loads data
3. create HTML document
4. send to client side

SEO 특화에 좋음, Server에 부담이 더 있음.


SSR은 Rendering 될 때 실행중인 코드가 브라우저에 없음.


[https://www.youtube.com/watch?v=xC_M0InXs4w&t=30s]



### State Management
