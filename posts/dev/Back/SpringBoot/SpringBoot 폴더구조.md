
## 폴더구조
스프링부트에서 폴더구조는 크게 계층형/ 도메인형으로 나뉨

계층형으로 한게 아래와 같다
```
com
 ㄴ company
     ㄴ project
         ㄴ config
         ㄴ controller
         ㄴ domain
         ㄴ repository
         ㄴ service
         ㄴ security
         ㄴ exception
```

도메인형
```
com
 ㄴ company
     ㄴ project
         ㄴ domain
         |   ㄴ user
         |   |   ㄴ api(controller)
         |   |   ㄴ application(service)
         |   |   ㄴ dao
         |   |   ㄴ domain
         |   |   ㄴ dto
         |   |   ㄴ exception
         |   ㄴ video
         |   |   ㄴ api
         |   |   ㄴ application
         |   |   ㄴ dao
         |   |   ㄴ domain
         |   |   ㄴ dto
         |   |   ㄴ exception
         |   ...
         ㄴ global
             ㄴ auth
             ㄴ common
             ㄴ config
             ㄴ error
             ㄴ infra
             ㄴ util
```