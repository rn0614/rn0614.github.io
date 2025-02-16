import React from "react";
import { Box, Container, Flex, Section, Text, Heading } from "@radix-ui/themes";
import Hr from "@/components/Hr/Hr";
import SelfRecomandation from "@/components/RecommandationComp/SelfRecomandation";
import MyProflie from "@/components/RecommandationComp/MyProflie";
import WorkProject from "@/components/RecommandationComp/WorkProject";

export default function Home() {
  return (
    <main>
      <Container px="5">
        <Heading as="h1">구상모 개발블로그</Heading>
        <MyProflie />
        <Hr />
        <SelfRecomandation />
        <Hr />
        <WorkProject />
        <Hr />
      </Container>
    </main>
  );
}
