- UIEvent 를 상속 받아서 생성
- WheelEvent , DragEvent, PointerEvent 가 MouseEvent를 상속받아서 생성됨



### MouseEvent.button
- 0 : 마우스 왼쪽 버튼
- 1 : 마우스 휠
- 2 : 마우스 오른쪽 버튼
- 3 : 브라우저 뒤로가기 버튼
- 4 : 브라우저 앞으로가기 버튼

### MouseEvent.Type
- click : 마우스 왼쪽 버튼을 눌렀을 때
- contextmenu : 마우스 오른쪽 버튼을 눌렀을 때
- dblclick : 동일한 위치에서 빠르게 두번 click할 때
- mousedown : 마우스 버튼을 누른 순간
- mouseup : 마우스 버튼을 눌렀다 뗀 순간
- mousemove : 마우스를 움직이는 순간
- mouseover : 마우스 포인터가 요소 위로 올라온 순간
- mouseout : 마우스 포인터가 요소에서 벗어나는 순간
- mouseenter : 마우스 포인터가 요소 위로 올라온 순간 (버블링 일어나지 않음)
- mouseleave : 마우스 포인터가 요소에서 벗어나는 순간 (버블링 일어나지 않음)
출처: [https://anerim.tistory.com/29]


```tsx
export const mouseEventPage =()=>{
  const mouseMoveHandler =(e:MouseEvent)=>{
	e.preventDefault();
  }
  useEffect(()=>{
	document.addEventListener('mousemove',mouseMoveHandler);
	return(
	  document.removeEventListener('mousemove',mouseMoveHandler);
	)
  },[])
  return (<div>
    <div onMouseOver={}>target</div>
  </div>)
}



```




마우스 이벤트 관련 document
https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent