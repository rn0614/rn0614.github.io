### BEM이란
엄격한 의미론적 클래스 선택자 작명 규칙
낮은 선택자 특이성을 유지
html과 css의 연결을 느슨함
```css
-- 아래와 같은 형식만 허용함
.block {...}
.block__element {...}
.block--modifier{}
.block__element--modifier{}
```

Block : 재사용 가능 독립 불록
Element : 플록을 구성하는 종속적인 하위 요소 __
Modifier : 블록 또는 요소의 변형 --

어떤 목적인지에 따라서 명칭함. 
색상의 경우 .red가 아닌 .error 표기함.

block 부분에 접두어 사용 추천
- 다른 라이브러리를 쓸 때 충돌 방지