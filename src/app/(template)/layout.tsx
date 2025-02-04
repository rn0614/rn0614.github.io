import Aside from "@/components/Aside/Aside";
import styles from "./layout.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Box, Flex, ScrollArea } from "@radix-ui/themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex className={styles.layout}>
      <Header />
      <Flex className={styles.body}>
        <Box className={styles.asideWrapper}>
          <Aside />
        </Box>
        <ScrollArea asChild type="always" scrollbars="vertical" className={styles.main}>
        <Box content="main" >
          <Flex className={styles.content}>{children}</Flex>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </Box>
        </ScrollArea>
      </Flex>
    </Flex>
  );
}
