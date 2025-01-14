---
title: 제목
excerpt: 설명란
categories:
  - Categories2
tags: 
permalink: /categories2/202409291406throttle/
toc: true
toc_sticky: true
date: 2024-09-29
last_modified_at: 2024-09-29
---
# Debounce
> 연속적인 이벤트 시 제일 마지막 이벤트 이후 일정시간 이후 함수실행하는 로직
## Debounce 커스텀 훅

### callbackValue로 적용
```ts
import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

```

### callbackFunction으로 적용
```ts
import { useCallback, useEffect, useRef } from "react";

function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

export default useDebouncedCallback;

```

# Throttle
> 연속적인 이벤트 시 제일 처음 이벤트 이후 일정시간 이후 함수를 실행하는 로직
> (게임에서의 쿨타임과 비슷한 기능)

```ts
import { useCallback, useRef } from "react";

function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttling = useRef<boolean>(false);

  const throttledCallback = useCallback((...args: any[]) => {
    if (!throttling.current) {
      callback(...args);
      throttling.current = true;
      setTimeout(() => {
        throttling.current = false;
      }, delay);
    }
  }, [callback, delay]);

  return throttledCallback;
}

```



# 한계
> debounce , throttle은 과도한 호출을 막는 것일뿐 중복호출 자체를 막지 못함

debounce가 1초로 설정되어 있고 api 응답이 3초가 걸린다면 1~3초 사이에 발생하는 호출에 대해서는 중복으로 발생할거임.

# 개선
```js

const useSingleRequestMutation = ( options ) => {
  const { sendRequest } = useSingleRequest();
  const requestId = options?.requestId || "defaultRequest";

  return useMutation({
    ...options,
    mutationFn: options?.mutationFn
    onMutate: async ()=>{
      const isCallableRequest = sendRequest(requestId);

      if (!isCallableRequest){
        throw new Error("duplicated request")
      }
      if(options?.onMutate){
        return await options.onMutate(variables);
      }
    }
    //...
  });
}





```