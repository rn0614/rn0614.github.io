

```tsx
// functional Component로 넘어오면서 Mount와 update가 명확히 구분 안됨
useEffect(()=>{
  mount,update시 발생
  return (
    unmount시 발생
  )
},[])

// 이를 위해 Mount 이후(update 시)에만 적용되도록 customHook을 짤 수 있음
function useEffectAfterMount(cb, dependencies){
  const justMount = useRef(true);
  useEffect(()=>{
    if(!justMounted.current){
      return cb()
    }
    justMount.current= false
  },dependencies)  
}

```

