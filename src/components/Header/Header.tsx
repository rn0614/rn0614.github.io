"use client";
import React from "react";
import withMobileVisibility from "../hoc/withMobileVisibility";
import styles from "./style.module.scss";
import { FaAlignJustify } from "react-icons/fa";
import { Button, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const router = useRouter();
  return (
    <Container asChild className={styles.header}>
      <header>
        <Flex justify={"between"} align={"center"}>
          <Link href={"/"}>
            <img src="/logo_koo_sm.png" height={"60px"} />
          </Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button
                color="gray"
                variant="ghost"
                className={styles.dropdownMenu__button}
              >
                <FaAlignJustify size={30} />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                className={styles.dropdownMenu__item}
                onClick={() => router.push("/")}
              >
                Home
              </DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className={styles.dropdownMenu__item}>
                  Code
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item
                    className={styles.dropdownMenu__item}
                    onClick={() => router.push("/category/dev")}
                  >
                    개발사항
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className={styles.dropdownMenu__item}
                    onClick={() => router.push("/category/etc")}
                  >
                    기타
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
              <DropdownMenu.Item className={styles.dropdownMenu__item}>
                일과
              </DropdownMenu.Item>
              <DropdownMenu.Item className={styles.dropdownMenu__item}>
                일정
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </header>
    </Container>
  );
}

export default withMobileVisibility(Header, null);
