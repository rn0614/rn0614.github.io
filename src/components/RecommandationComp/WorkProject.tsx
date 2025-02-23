import { Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import React from "react";

export default function WorkProject() {
  return (
    <Section py="3">
      <Flex direction={{ initial:"column", sm: "row" }} justify={"between"} gap="7">
        <Container
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <Heading as="h3" size="6">SI이력</Heading>
          <Heading as="h4" size="4">현대제철 PI프로젝트</Heading>
          <Text as="p">IE서비스 종료에 따른 activeX시스템 변경작업(jsp)</Text>
          <Heading as="h4" size="4">열연공장 롤샵 자동화 프로젝트</Heading>
          <Text as="p">
            Java 및 jsp를 이용한 I/F 수신부, 백엔드 처리 프로세스 개발
          </Text>
          <Heading as="h4" size="4">LCA 프로젝트</Heading>
          <Text as="p">
            전자정부를 이용한 레거시 프로젝트 gitlab, jenkins배포자동화도입
          </Text>
          <Heading as="h4" size="4">스마트 내화물 프로젝트</Heading>
          <Text as="p">android, jsp를 통한 웹뷰 개발</Text>
        </Container>
        <Container
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <Heading as="h3" size="6">SM이력</Heading>
          <Heading as="h4" size="4">열연공장/연주공장 시스템 SM담당</Heading>
          <Text as="p">개발 TEST로직 작성</Text>
          <Text as="p">쿼리튜닝/ 에러개선건</Text>
          <Text as="p">운영 프로세스 개선</Text>
          <Text as="p">유지보수 관리작업</Text>
        </Container>
      </Flex>
    </Section>
  );
}
