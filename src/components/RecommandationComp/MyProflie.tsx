import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import React from "react";
import Hr from "../Hr/Hr";

export default function MyProflie() {
  return (
    <Section py="3">
      <Flex
        direction={{ initial: "column", sm: "row" }}
        justify={{ initial: "between", sm: "start" }}
        gap={{ initial: "5", sm: "7" }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <img
              alt="구상모 증명사진"
              src={"/appImage/koosangmo_id_photo.jpg"}
              style={{ maxHeight: "400px" }}
            />
          </Box>
          <ul>
            <li>
              <Heading as="h3" size="6">
                프로필
              </Heading>
              <Text>Tel : 010-9502-8766</Text>
              <Text>Mail : 010-9502-8766</Text>
              <Hr />
            </li>
            <li>
              <Heading as="h3" size="6">
                학력
              </Heading>
              <Text>2014.02 ~ 2020.02</Text>
              <Text>인하대학교 기계공학과</Text>
              <Hr />
            </li>
            <li>
              <Heading as="h3" size="6">
                GITHUB
              </Heading>
              <Text>https://github.com/rn0614</Text>
              <Hr />
            </li>
            <li>
              <Heading as="h3" size="6">
                BLOG
              </Heading>
              <Text>https://rn0614.github.io</Text>
            </li>
          </ul>
        </Container>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ul>
            <li>
              <Heading as="h3" size="6">
                경력
              </Heading>
              <Text>
                현대오토에버 :SI /SM 개발자 2022.04 ~ 현재(2년 10개월)
              </Text>
              <Hr />
            </li>
            <li>
              <Heading as="h3" size="6">
                SKILL
              </Heading>
              <Heading as="h4" size="4">
                1. FrontEnd
              </Heading>
              <Flex direction={"column"} pb="4" pl="3">
                <Text>React, Nextjs</Text>
                <Text>Sass, styled-component</Text>
                <Text>js, jquery</Text>
              </Flex>
              <Heading as="h4" size="4">
                2. BackEnd
              </Heading>
              <Flex direction={"column"} pb="4" pl="3">
                <Text>Spring Boot</Text>
                <Text>FastApi</Text>
              </Flex>
              <Heading as="h4" size="4">
                3. 모바일
              </Heading>
              <Flex direction={"column"} pb="4" pl="3">
                <Text>react-native</Text>
                <Text>android</Text>
              </Flex>
              <Heading as="h4" size="4">
                4. CI/CD
              </Heading>
              <Flex direction={"column"} pb="4" pl="3">
                <Text>gitlab</Text>
                <Text>github action</Text>
              </Flex>
            </li>
          </ul>
        </Container>
      </Flex>
    </Section>
  );
}
