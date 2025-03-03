import React from "react";
import { Container, Heading } from "@radix-ui/themes";
import Hr from "@/components/Hr/Hr";
import SelfRecomandation from "@/components/RecommandationComp/SelfRecomandation";
import MyProflie from "@/components/RecommandationComp/MyProflie";
import WorkProject from "@/components/RecommandationComp/WorkProject";
import StudyProject from "@/components/RecommandationComp/StudyProject";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <main style={{ paddingInline: "20px" }}>
      <Container>
        <Heading as="h1" style={{ paddingTop: "20px" }}>
          {t('home.title')}
        </Heading>
        <MyProflie />
        <Hr />
        <SelfRecomandation />
        <Hr />
        <WorkProject />
        <Hr />
        <StudyProject />
        <Hr />
      </Container>
    </main>
  );
}
