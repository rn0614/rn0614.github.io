 Drag and Drop 기능의 React libarary

```
	npm i react-dnd react-dnd-multi-backend
```

### 중요 요소
1. Drag and Drop 을 구현하는데 필요한 Component 
	1. Drag할 수 있는 Component
	2. Drop받을 수 있는 Component
2. Drag하면서 발생하는 이벤트
	1. 드래그 시작하자마자
	2. 드래그 하는 중에
	3. 드래그를 놓으면



### Drag대상 컴포넌트
useDrag를 통해서 drag 대상의 상태를 부여한다.
type: 드래그되는 아이템 유형을 파악하는 용도 / drop에서 수학하는 drag Type지정가능
item : 드래그 중인 데이터를 나타내는 객체(드래그 시작시점의 값)
collect: 드래그 상태관련된 데이터

```tsx
import {useDrag} from 'react-dnd';

export default function DragTarget({isDragging, text}){
  const ref = useRef();
  const [{ isDragging}, drag] = useDrag({
    type: "TYPE설정위치",   // type을 통한 드래그 아이템 유형 식별
    item: { id: id ... },   // 드래그 중인 데이터를 나타내는 객체
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      clientOffset : !!monitor.getInitialClientOffset(),
      sourceClientOffset :!!monitor.getInitialSourceClientOffset(),
    })
  },[]);
  drag(ref);   // drag 기능 주입
  return (
	 <div ref={ref}> // drag
	 </div>
  )
}

```


### Drop대상 컴포넌트
```tsx
import {useDrop} from 'react-dnd';

function DropArea(){
  const ref= useRef(null);
  const [{canDrop,isOver}, drop] = useDrop({
    accept:'받을 수 있는 Type',
    drop: (item, monitor)=>{
	  console.log('drop되는 대상의 정보',item);
	  console.log('drop되는 대상의 monitor',monitor);
    },
    collect: (monitor)=> ({
	  isOver: monitor.isOver(),
	  canDrop: monitor.canDrop(),
	  isDragging: monitor.isDragging()
    })
  })
  drop(ref)
  return (
    <div ref={ref} >
      {isOver?'dropHere':'false'}
    </div>
  )
}


```


react-dnd 공식문서
[https://react-dnd.github.io/react-dnd/about]


[[library]]