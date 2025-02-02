```ts



str.length

new String('test');


str.indexOf('or') // 두글자도 가능 return index or -1
str.inclueds('or',startIdx) // return false
str.search(/of/) // 정규식 검사도 가능



str.startsWith
str.endsWith
str.charAt(idx) // 해당 문자열 반환 넘을경우 빈문자열 ''

str.substring(startIdx,endIdx) // 음의 인덱스 사용 불가, 음의 인덱스는 slice사용


str.toUpperCase
str.toLowerCase
str.trim      // 파생으로 앞 or 뒤만 필요하면 trimStart, trimEnd


str.replace(/hello/, '')   // 제거용으로 많이 쓰임
'Hello world'.replace('world','<strong>$&</sctong>')  // $&은 찾은 내용 대타


str.repeat(2) // return str+str

str.split(//, _) // 
```