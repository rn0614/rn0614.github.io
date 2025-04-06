"use client";
import React from "react";
import styles from "./style.module.scss";
import { FaAlignJustify } from "react-icons/fa";
import { Button, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
//import { useTranslations } from "next-intl";

function Header() {
  const router = useRouter();
  //const t = useTranslations();
  return (
    <header className={styles.header}>
      <Flex justify={"between"} align={"center"} className={styles.headerContent}>
        <Link href={"/"}>
          <img
            src="/logo_koo_sm.png"
            height={"60px"}
            alt="구상모 홈페이지 logo"
            loading="lazy"
          />
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
                  onClick={() => router.push("/category/100%20Resources")}
                >
                  dev
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className={styles.dropdownMenu__item}
                  onClick={() => router.push("/category/etc")}
                >
                  etc
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
  );
}

export default Header;
