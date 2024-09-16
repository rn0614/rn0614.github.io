## REACT란 왜 등장했는가?
1. SPA( Single Page Application )으로 가상 dom을 만들어서 변화하는 상태에 대한 dom의 업데이트 비용을 최소화함.
2. 컴포넌트 기반으로 재사용 할 수 있는 코드를 생성함으로 조합 분해가 쉬운 환경


## 상태주기
![[react 상태주기.png]]

마운트, 업데이트, 언마운트가 리액트 생명주기임

이 셋은 useEffect와 아주 긴밀한 관계를 가지게 됨

```
	useEffect(()=>{
		// 이부분은 마운트, 업데이트 시 실행되는 부분
		return (
			// 이부분은 언마운트시 동작함
		)
	},[dependency])

```


## Hook
이제는 함수형 컴포넌트를 많이 사용하는 REACT에서 꼭 필요한 function 옵션
1. useState : 상태를 관리하는 기본 Hook
2. useEffect : 사이드 이펙트, 페이지 렌더링 이후작업(onBody) 때 사용하는 Hook
3. ~~useContext : 전역상태 관리하는 Hook / Recoil, Redux로 대체됨~~
4. useRender : useState의 확장판, 단순히 값을 set으로 지정하는 것이 아닌 Reducer라는 새로 정의한 함수로 값을 도출하여 저장
5. useCallback : 특정함수 재사용 / 보통 컴포넌트가 렌더링될 때 function을 재 호출하게되는데 이때 모든 변수가 초기화되면서 문제가 발생. 이때 useCallback을 통해 함수를 가져옴
```
	function page(){
		const callbackFnc = useCallback(()=>{
		},[dependency])

		return()
	}
```
6. useMemo : 함수값을 캐싱 (useCallback은 함수, useMemo는 특정값)
```
const memovalue = useMemo(()=>{
	return 캐싱할 값;
},[dependency])

```
7. useRef : 돔을 선택하는 용도로 쓰이는 Hook



[[Front]]