import React from "react";
import Heading from "@/components/Heading/Heading";
import { Box, Flex, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <main>
      <Heading level={1}>About me</Heading>
      <Flex justify={"between"}>
        <Box>개발자 구상모</Box>
        <Box>사진자리</Box>
      </Flex>
      <Flex>
        <Box>
          <Heading level={3}>1.AboutMe</Heading>
          <Flex direction={"column"}>
            <Text>안녕하세요, 3년차 엔지니어 구상모입니다</Text>
          </Flex>
        </Box>
        <Box></Box>
      </Flex>
    </main>
  );
}
