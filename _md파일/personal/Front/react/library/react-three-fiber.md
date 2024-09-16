
### 설치방법
```bash
npm install three @types/three @react-three/fiber # threejs 전용
npm i @react-three/drei # 유용한 다른 방식 지원
npm i leva --save-dev   # Controller를 위해 사용
```


### 기본 구성 요소
1. Scene
2. Camera     -> Canvas에 설정 / Element에서도 설정은 가능함.
3. Renderer

### Canvas 좌표계 설정
정면방향이 z축, 오른쪽이 x축, 위쪽이 y축


```tsx
import { Canvas } from "@react-three/fiber";
import {ThreeElement} from '작성'

export default function ThreePage(){
  return (
    <div>
      <Canvas
        shadows // 그림자 가능하도록 설정
        //orthographic  // 기본이 perspective
        camera={{ // 카메라 위치 설정
          //zoom : 150 => orthgraphic 사용시 카메라의 거리 설정
          near:1,
          far:20,
          fov:75,
          position:[5,5,5]
        }}
       >
        {/* 전체적인 배경 색 설정*/}
        <color attach="background" args={["black"]} />
        {/* 안개 적용 */}
        <fog attach={"fog"} args={["white", 3, 10]} />
        
        {/* scene 전체의 Helper로 위치 좌표 확인*/}
        <axesHelper args={[5]} />
        {/* 총길이, 나눈 총 격자수, 센터색상, 전체색상*/}
        <gridHelper args={[20, segment, 0xff0000, "teal"]} />
        
        {/* 중앙에서 그려지는 요소를 삽입 , mesh, group, camera등 다양하게 사용가능*/}
        <CameraElement/>
        <MeshElement/>
        <GroupElement/>
      </Canvas>
    </div>
  )
}


```



### useThree와 useFrame
> useThree : 전체적인 renderer, scene, camera를 관리하는 훅
> useFrame : 프레임 상황을 기록해 애니메이션을 담당하는 훅 


```tsx
// useThree, useFrame은 Threejs canvas안에서만 사용 가능
import {useThree, useFrame} from '@react-three/fiber' 

// useThree를 통해 renderer, scene, camera등을 액세스 가능 
const {gl, scene, camera} = useThree(); // gl : renderer 

// r3f의 꽃 상태를 감지해서 delta마다 한번씩 렌더링해주는 애니메이션 훅
useFrame((state, delta)=>{
  console.log("state : "+ state); // gl의 state , state.pointer, state.~ 로 다양한 동작을 감지할 수 있다.
  console.log("delta : "+ delta); // 이전 render 시간으로부터 시간 간격
})

```


### 기본적인 Mesh Object
mesh는 geometry와 material 로 구성되어 있다.
```tsx
<mesh>
  <boxGeometry/>
  <meshStandardMaterial color="red"/>
</mesh>
```


### mesh를 생성할 수 있는 3가지 방법
```tsx

  // 1, 일반적인 Three js 에서 모델을 삽입하는 방법
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshBasicMaterial({color:0x000000})
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);


  
  return (<>  
    // 2.@react-three/drei
    <Box position={[-2, 0, 0]}>
      <meshStandardMaterial color="green" />
    </Box>

    // 3.mesh 태그 이용
    <mesh
      ref={boxRef}
      position={[5, 0, 0]}
>     {/*  x,y,z 사이즈 , x,y,z segment 수 args의 값은 three.js의 document참조 */}
      <boxGeometry args={[2,2,2,1,1,1]}/>
      <meshStandardMaterial />
    </mesh>
   </>)
```


### Mesh와 Group
```html
// group 안에 mesh, group이 들어갈 수 있음
// 반복되는 Gemetry나 meshStandard는 하나의 속성을 위에서 지정한 다음에 해당 Geometry와 Material 을 공유하는 방식으로 생성해야 리소스 관리가 됨.

<mesh>
  <boxGeometry/>
  <meshStandardMaterial/>
</mesh>

<group>
  <mesh>
    <boxGeometry/>
    <meshStandardMaterial/>
  </mesh>
  <mesh>
    <boxGeometry/>
    <meshStandardMaterial/>
  </mesh>
  
  <group>
    <mesh>
      <boxGeometry/>
      <meshStandardMaterial/>
    </mesh>
  </group>
</group>




```


args순서는 생성자 파라미터 순서
https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry 참고


### Model의 구성요소
1. light
2. Mesh
  1. Geometry : 물체속성 구현
  2. Material : 표면[[recoil]]속성 구현

사용방법은 


### nextjs 에서 threejs

nextjs 에서 threejs 를 사용할 때  Color부분을 가져올 때 다음과 같은 에러가 발생하였다.
TypeError: getStaticPaths is not a function

해당 화면은 getStaticPaths를 안썼기 때문에 문제는 Three 부분에서 발생했는데 상당히 크기가 큰 Threejs 파일을 불러올 시점에서 모듈이 임포트가 안됐기 때문으로 보인다.
따라서 next.config.js 에 transfilePackages를 설정하므로 모듈을 트랜스파일링해서 번들링 사이즈를 줄이는 방식을 적용하고 해당 에러가 사라졌다.
```js
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["three"],
}

```





https://docs.pmnd.rs/react-three-fiber/getting-started/examples


[[library]]