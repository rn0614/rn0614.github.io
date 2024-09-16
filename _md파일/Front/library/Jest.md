test 라이브러리중에 하나 가장 기본적인 라이브러리

next 에 적용하기 위한 초기 세팅법

```shell
# 라이브러리 다운로드
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom

# 라이브러리 초기설정 명령어  # 여러설정은 기본설정으로 하고 테스트 환경만 jsdom으로 적용
npm init jest@latest
```


```ts
// jest.config.ts
// 기본적인 jest 설정파일이다. test 환경을 jsdom으로 지정, 시작전 공용 실행파일을 jest.setup.ts에 놓는다.
import type { Config } from 'jest'
import nextJest from 'next/jest.js'
const createJestConfig = nextJest({
  dir: './'
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // jest 초기 설정파일
}

export default createJestConfig(config)



// jest.setup.ts
// 공통적으로 mocking할 function 을 지정해 놓는다.
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

```





참고 사이트
https://jaypedia.tistory.com/382


[[library]]