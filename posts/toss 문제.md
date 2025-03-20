
1번 :  전체 false or 빈 문자열 구분방안
> 비어있는 값 기준 : "", null, undefined 
> Array나 Object의 경우 내부가 빈 요소로 구성되어 있으면 false

내가 본 중점사안
-  falsy 한 값을 잘 구분할 수 있는가?
-  Array객체와 object 객체를 기본객체와 분리하여 내부 요소를 재귀형식으로 조회 가능한가? 

```ts
function solution(value){
	return isEmpty(value)
}

const isEmpty = (value)=>{
	if(value ==="" || value=== undefined || value === null){
		return true
	}

	if(Array.isArray(value)){
		value.every((item)=>isEmpty(item));
	}

	if(typeof value==='object'){
		Object.values(value).every((item)=> isEmpty(item))
	}

	return false;
}
```













21번 :  input 태그의 type="number" 와 inputmode="numeric" 의 차이. / 사용자 고려
  => type은 입력값 제한, inputmode는 모바일 사용자 편의성 제공


22번 : 
22-1. 호이스팅 문제,function 선언이 먼저 되더라도 변수가 선언될 뿐이지 실제로 함수가 실행되기 전까지는 안에 어떤 변수를 쓰기 전까지는 문제가 없다.
22-2. nodejs 환경 문제 nodejs는 window라는 global 객체를 가지지 않는다. / window를 사용하려고 하면 ReferenceError window is not defined 가 발생
=> 이런 문제를 해결하기 위해서는 무조건 아래와같이 특정 / typeof를 사용했으니 string 반환값 주의할것 
 typeof window === 'undefined'
=> reactNativeWebview package를 이용하면 window.ReactNativeWebview를 통해서 웹 데이터와 reactNative 사이에 브릿지로 데이터를 전달할 수 있다.
postMessage() : 이를 통해 WebView => reactNative


```tsx
const MyView = ()=>{
  const webviewRef = useRef<Webview>(null)

  const responseMessage = (event) => {
    console.log('webview로 받은 이벤트', event.nativeEvent.data)
  }
  const requestMessage = ()=>{
    const httpEvent ={
      type: 'CUSTOM_EVENT', 
      payload: { message: 'Hello from React Native!', timestamp: Date.now(), },
    }
    webViewRef.current.postMessage(JSON.stringify())
  }

  return (
  <View>
    <Webview
      ref ={webViewRef}
      source = {{uri: 'https://rn0614.github.io'}}
      onMessage = {responseMessage}
    />
    <View>
      <Button onClick={requestMessage}>
    </View>
  </View>
  )
}
```


```tsx
// react/ website 코드
useEffect(()=>{
  const eventHandler = ()=>{}
  window.addEventListener('message', eventHandler)
  return ()=>{
    window.removeEventListener('message',eventHandler )
  }
},[])
```



23번 : js에서 Map 객체의 사용 숙달도 / 알고리즘 성능 확인
    get, set 모두 O(1),  clear, keys, values, entries 등이 O(n)
```ts
const testMap = new Map([
  ['key1','val1'],
  ['key2','val2']
])

```


24번 : HTTPS , 데이터의 무결성을 보장/ 서버 신원 인증/ 중간자 공격 방지/ 암호화
      HTTP/2 : 데이터 압축관련
  보안관련 HTTPS와 통신관련 HTTP를 구분할 수 있는가?

25번 : 시간복잡도 문제. 내부 함수가 빈배열부터 시작해서  N 까지 가더라도 O(N)으로 계산함.


26번 : CORS 는 브라우저에서 적용되는 정책임. / 서버끼리 api 주고 받는데는 문제없음.
      브라우저가 해당 정보를 받을 수 있게 하려면 서버단에서 response의 header 중 Access-Control-Allow-Origin 에 CORS관련 설정을 해야함.
> 설정할 헤더는 다음과 같음.

- Access-Control-Allow-Origin : https://example.com
- Access-Control-Allow-Method : 'GET, POST, PUT, DELETE'
- Access-Control-Allow-Headers : 'Content-Type, Authorization'
- Access-Control-Allow-Credentials : 'true' // 쿠키허용


27번 : useEffect 관련
  => useEffect를 쓰는 이유.
  => 커스텀 훅 관련

```tsx
function fetchPosts = async (category) =>{
  const response = await fetch(`/posts?keyword=${categoty}`,{})
  return response.data;
}


function usePosts(category:string){
  return useQuery(['posts',category], ()=> fetchPosts(category),{
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry:2,
  })
}

function BlogPosts({category}:{category:string}){
  const {data:posts, isLoading, isError, error} = usePosts(category);

  if(isLoading){
    return <p>Loading...</p>
  }
  if(isError){
    return <p>Error.....</p>
  }

  return (
    <div>
      <h1>Posts in {category}</h1>
      <ul>
        {posts.map((post)=>{
          return <li key={post.id}>{post.title}<li>
        })}
      </ul>
    </div>
  )
}
```

28번: 타입관련/ 타입을 저장하는 방식
- Omit<T, K> : T에서 K 속성을 빼는 방식
- Record<K, V> : 키-값 쌍 객체 타입 생성
- Pick<T, K> : 타입에서 특정 속성만 선택
- Partial\<T\> : 모든 속성을 선택적으로 변경, 모든 속성에 대해 ? 적용 일부만 있어도 된다는 의미
- Exclude<T, U> : 유니언 타입에서 특정 타입 제외
- Required\<T\> : 모든 속성을 필수로 변경

```ts
type Person ={
  name: string;
  age?:number;
}


function removeAge(person:Person){
  const result = {...person}
  if(result.age != null){
    delete result.age;
  }
  return result;
}

```

29번 : react에서 Array의 리렌더링을 막는 key의 역할과 조건
=> key는 해당객체가 속한 list 내부에서만 unique하면 됨.

브라우저 렌더링 순서
1. 네트워크 요청을 받은 서버가 리소스를 응답합 (HTML, JS, CSS)
2. HTML 파싱 및 DOM 생성 (DOM 트리 구성)
3. CSS 파싱 및 CSSOM 생성
4. DOM + CSSOM 병합
5. LAYOUT 단계 : 각 요소의 크기와 위치를 계산함. VIEW PORT 기준 요소 레이아웃 결정
6. 페인트 단계 : 각 요소의 색상, 글꼴, 그림자 등을 스타일 처리하여 레이어로 나눔
7. 컴포지팅 단계 : 여러 레이어 합성 
8. 화면 출력

리렌더링 : 요소의 시각적 속성(색상, 배경)이 변하면 다시 그리는 과정
	     레이아웃은 변경없음
리플로우 : DOM, CSSOM 변경으로 다시 계산됨. 




30번 :  CSS명시도에 대한 설명 / 우선순위
	inline> id > class > tag
	!important는 무조건 적용 
	class 가 여러개일 때는 css에서 가장 나중에 쓰인 selector가 우선


31번 : 쿠키 관련
- 서버는 set-Cookie를 통해 쿠키 변경 가능
-  Https, Secure, SameSite, Expires/max-age

32번 : 자료구조 : queue


33번 : this관련 문제
- method 로 지정된 객체는 그 객체를 실행하는 주체가 this
- 
```js
const obj = {
    logThis(){
        console.log(this)
    },
    foo(){
        this.logThis();
    },
    bar(){
        const logThis = this.logThis; // 변수에 담은 메서드의 this는 window
        logThis();
    }
}

obj.logThis();
obj.foo();
obj.bar();
```


34번 : 타입지정
```ts
type GetProperty = <T,K extends keyof T>(obj:T, key:K)=> T[K];
const getProperty:GetProperty = (obj, key) => obj[key];

const person = {name:'구상모', age:30};

const personName :string = getProperty(person, 'name');
const personAge :number = getProperty(person, 'age');
```


38번 : 배열복사/ array는 referrer 값인것을 기억


39번 : Hydration Error

40번 : 리플로우(dom구조, css 크기가 변할때 동작)

41번 : infer 조건부 타입
```ts
T extends infer U ? X : Y

type ReturnType<T extends (...args:any)=>any> = T extends (...args: any)=> infer R ? R: any

```

42번 : Union/ Intersection



