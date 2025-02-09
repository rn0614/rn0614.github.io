import React from "react";
import Heading from "@/components/Heading/Heading";
import { Box, Flex, Text } from "@radix-ui/themes";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main>
      <Heading level={1}>About me</Heading>
      <Flex justify={"between"}>
        <Box>개발자 구상모</Box>
        <Box>사진자리</Box>
      </Flex>
      <Flex>
        <Box className={styles.aboutMe}>
          <Heading level={3}>1.AboutMe</Heading>
          <Flex direction={"column"}>
            <Text>안녕하세요, 3년차 엔지니어 구상모입니다</Text>
            <Text>
              기계공학을 전공했으며 파이썬을 통해 업무자동화를 배우면서 코딩을
              전문적으로 학습하기 시작했습니다.
            </Text>
            <Text>
              저는 아직도 제가 엔지니어라고 생각하고 있고 문제를 풀기위한 수단이
              역학이 아니라 다양한 문제로 바뀌었을 뿐이라고 생각하고 있습니다.
            </Text>
            <Text>
              코딩은 단순히 코딩일 뿐이고 문제를 해결하는데 엔지니어링의 본질이
              있다고 생각합니다.
            </Text>
          </Flex>
        </Box>
        <Box className={styles.skill}></Box>
      </Flex>
    </main>
  );
}
