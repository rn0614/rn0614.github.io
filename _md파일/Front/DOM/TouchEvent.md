
### 구성요소
3개로 구성 Touch, TouchEvent, TouchList
- Touch : 하나의 터치 상태, x,y의 상태값을 갖고 page 혹은 screen 등의 어디에 위치했는지 표현
- TouchList : 터치하는 부분들의 모음( 보통 3 finger)
- TouchEvent : 터치 이벤트


### 터치 리스트 분기처리
```ts
const touchHandler= (e:TouchEvent)=> {
  switch(e.touches.length){
    case 1:
	    console.log('한손터치');
	    break;
	case 2:
		console.log('두손터치');
		break;
	default:
		console.log('동작없음');
		break;
  }
}

```


- touchstart  : 손가락을 붙이면
- touchmove : 터치한채로 움직이면 
- touchcancel : 손가락을 떼면
- touchend : 손가락을 떼면 



```tsx
export const touchEventPage =()=>{
  const touchHandler =(e:TouchEvent)=>{
	e.preventDefault();
	switch(e.touches.length){
	
	}
  }
  useEffect(()=>{
	document.addEventListener('touchstart',);
	return(mouseMoveHandler
	  document.removeEventListener('mousemove',mouseMoveHandler);
	)
  },[])
  return (<div>
    <div onMouseOver={}>target</div>
  </div>)
}



```