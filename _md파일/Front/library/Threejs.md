### Three.js란?
Canvas에서 3d 화면을 송출하는데 특화된 라이브러리 중에 하나


### html에서 그림을 렌더링하는 방식
1. dom 에서 직접적으로 태그로 화면송출
2. svg에서 벡터기반 화면송출
3. canvas에서 화면송출


### 화면 그리는 방식(SVG, CANVAS)
- svg에서 그리는 법
  html 에서 tree 구조로 배치
  css 혹은 event를 사용할 수 있음
  SEO 최적화 가능
  정확한 오브젝트 영역 탐지 및 스케일에 대한 무결성 유지
  주요라이브러리: D3.js(차트등을 그릴때 사용)
```html
<svg class="box">
 <rect x="40%" y="40%" width="100" height="100">
</svg>
```

- canvas에서 그리는법(2d, 3d(WebGL))
  html 에서 위치랑 크기만 선언하고 내부 요소는 js 로 생성
  다수의 요소를 렌더링할 때 성능이 좋음
  주요라이브러리: p5.js, pixi.js(2d)
                three.js, babylon.js(3d)
```html
<canvas id="canvasId" class="box" width="100" height="100"/>
```

```js
const canvas = document.getElemntById("canvasId");
const ctx = canvas.getContext("2d");

ctx.filStyle="green";
ctx.rect(400,400,200,200);
ctx.fill();

```


인터렉티브한 유저경험을 위해 뒤에 Canvas를 그리고 앞에 DOM요소로 정보를 송출하는 방식으로 자주 사용

[[library]]