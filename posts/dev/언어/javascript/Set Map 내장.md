


```ts


const set = new Set([1,2,23,34]]);

set.size

set.add(25)   // return set   chainning 가능

set.has(25) // return true

set.delete(25) // 

set.clear()


set.intersection(anotherSet)  // 교집합

set.union(anotherSet) // 합집합

set.difference(anotherSet)  // 차집합
new Set([...set].filter((item)=>!anoterSet.has(item))) // anotherSet이 안가진 데이터만


set.isSuperset(anotherSet)
```



# Map
> key를 입력한 순서 보장. map.keys() 했을 때

```ts
new Map();

new Map([['key1','value1'],['key2','value2']])

map.size

map.set('key','value')

map.has("key")

map.get("key")

```