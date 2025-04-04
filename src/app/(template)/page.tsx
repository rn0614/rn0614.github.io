import React from "react";
import { Container, Heading } from "@radix-ui/themes";
import Hr from "@/components/Hr/Hr";
import SelfRecomandation from "@/components/RecommandationComp/SelfRecomandation";
import MyProflie from "@/components/RecommandationComp/MyProflie";
import WorkProject from "@/components/RecommandationComp/WorkProject";
import StudyProject from "@/components/RecommandationComp/StudyProject";
import Link from "next/link";

export default function Home() {

  return (
    <main style={{ paddingInline: "20px" }}>
      <Container>
        <Heading as="h1" style={{ paddingTop: "20px" }}>
        구상모 개발블로그
        </Heading>
        <MyProflie />
        <Hr />
        <SelfRecomandation />
        <Hr />
        <WorkProject />
        <Hr />
        <StudyProject />
        <Hr />
        <Link href="/posts/100 Resources/103 Developments/Fetch와 axios 비교">테스트링크</Link>
      </Container>
    </main>
  );
}
