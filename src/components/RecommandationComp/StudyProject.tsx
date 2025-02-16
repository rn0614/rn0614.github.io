import { Heading, Section, Text, TextArea } from "@radix-ui/themes";
export default function StudyProject() {
  return (
    <Section py="4" style={{ display: "flex", flexDirection: "column" }}>
      <Heading as="h3">Study Project</Heading>
      <Heading as="h4">LLM 구동 프로젝트</Heading>
      <Text as="p">배포주소 : (x)</Text>
      <Text as="p">
        repository :{" "}
        <a href={"https://github.com/rn0614/react-fastapi-project"}>
          https://github.com/rn0614/react-fastapi-project
        </a>
      </Text>
      <Text as="p">기술스택: Reactjs, FastAPI</Text>
      <Heading as="h4">NEXTJS : GITHUB블로그 프로젝트 / github블로그 </Heading>
      <Text as="p">
        배포주소 :{" "}
        <a href={"https://rn0614.github.io/"}>https://rn0614.github.io/</a>
      </Text>
      <Text as="p">
        repository :{" "}
        <a href={"https://github.com/rn0614/rn0614.github.io"}>
          https://rn0614.github.io/
        </a>
      </Text>
      <Text as="p">기술스택 : Nextjs</Text>
      <Text as="p" style={{ whiteSpace: "pre-wrap" }}>
        {`문제: \n  1. 지식정리로 obsidian을 이용하는데 이걸 공유해야하는 상황\n  2. 따로 폴더를 옮겨서 관리하지 않아야함 \n  3. obsidian 결재가 없이 처리`}
      </Text>
      <Text>
        해결방안 : obsidian, github 블로그 구조 일치화 및 image public 세팅
      </Text>
      <Heading as="h4">
        Nextjs + supabase + react-native( webview ) : 기술연습 프로젝트
      </Heading>
      <Text as="p">
        배포주소 :{" "}
        <a href={"https://koo-sang-threejs.vercel.app/"}>
          https://koo-sang-threejs.vercel.app/
        </a>
      </Text>
      <Text as="p">
        repository :
        <a href={"https://github.com/rn0614/koo-sang-threejs"}>
          https://github.com/rn0614/koo-sang-threejs
        </a>
      </Text>
      <Text as="p">기술스택: Nextjs, supabase, React-native, postgreSql</Text>
      <Heading as="h4">Nextjs + Springboot + MySql : 자소서 프로젝트</Heading>
      <Text as="p">
        배포주소 :{" "}
        <a href={"https://spring.koosang-project.com/"}>
          https://spring.koosang-project.com/(비용이슈 다운)
        </a>
      </Text>
      <Text as="p">
        repository :{" "}
        <a href={"https://github.com/rn0614/spring-next-mysql"}>
          https://github.com/rn0614/spring-next-mysql
        </a>
      </Text>
      <Text as="p">기술스택 : Nextjs(page-router), Spring boot, Mysql</Text>
    </Section>
  );
}
