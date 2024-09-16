histoty api 로 화면 url 이동관련해서 제어하는 역할을 한다.

사용하다보면 나오는 중간에 다시 돌아가면 안되거나 돌아가는게 의미 없는 화면들이 있다.

예를들어 A화면에서 B화면으로 넘어가기 위해서는 login이 필요하다고 하자
이때 일반적으로 팝업 혹은 로그인 페이지 이동시 history Api 형태는 다음과 같다

A -> Login화면 -> B화면

그런데 B에서의 기능을 다 마치고 나서 다시 뒤로가기 혹은 router.back() 수행시 Login 화면이 나오면 유저경험에 좋지 않다. 따라서 Login 화면에서 B로 넘어갈 때는 Login URL을 대체하는 아래와 같이 쓰는 것이다. 

```tsx
  <Link href="B화면 url" replace> 
```

이는 next/navigation 을 쓸때는 다음과 같다.

```tsx
import useRouter from 'next/navitation';

//....

  const router = useRouter

  const eventHandler =()=>{
    router.replace()/
  }
  
//....
```