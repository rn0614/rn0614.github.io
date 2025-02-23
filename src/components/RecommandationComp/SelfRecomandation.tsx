import { Box, Heading, Section, Text } from "@radix-ui/themes";

export default function SelfRecomandation() {
  return (
    <Section py="4" style={{ display: "flex", flexDirection: "column" }}>
      <Heading as="h3" size="6">
        자기소개글
      </Heading>
      <Box mt="10px">
        <Text as="p">안녕하세요, 3년차 엔지니어 구상모입니다</Text>
        <Text as="p">
          모든 코드는 문제를 해결하기 위한 수단이라고 생각하고 내가 작성하는
          코드가 어떤문제를 해결하는지에 관심을 갖습니다.
        </Text>
        <Text as="p">
          SM인력의 유지보수 용이성 및 고객의 사용편의성을 중점적으로 생각합니다.
        </Text>
        <Text as="p">
          문제상황을 발견하고 이에 맞는 좋은 방식으로 코드를 개선하는 걸
          좋아합니다.
        </Text>
        <Text as="p">
          현재는 팀 내에서 AI프로젝트, 공장 시스템 유지보수 업무를 담당하고
          있습니다.
        </Text>
      </Box>
    </Section>
  );
}
