import Aside from "@/components/Aside/Aside";
import styles from "./layout.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ScrollArea } from "radix-ui";
import { Box, Flex } from "@radix-ui/themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex className={styles.layout}>
      <Header />
      <Flex className={styles.body}>
        <Box className={styles.asideWrapper}>
          {/* <Aside /> */}
        </Box>
        <ScrollArea.Root type="always" className={styles.main}>
          <ScrollArea.Viewport className={styles.viewport}>
            <Flex className={styles.content}>{children}</Flex>
            <footer className={styles.footer}>
              <Footer />
            </footer>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
          ></ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Flex>
    </Flex>
  );
}
