key요소는 아래와 같이 들어가는데 이때 list 의 요소가 변할 때 reRendering 시에 더 빠르게 대응할 수 있도록 만들어진 attribute이다. 그런데 이걸 index로 넣으면 list가 변경시 해당 렌더링의 기준이 다 밀리므로 성능이 저하된다.
따라서 item 에 있는 고유의 값으로 key를 설정하는 것이 좋다.
```jsx

<div>
  {list.map((item, index)=>(<div key={}></div>))}
</div>

```