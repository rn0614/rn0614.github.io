"use client";
import styles from "./style.module.scss";
import classNames from "classnames";
import { useAside } from "@/hooks/useAside";
import { FaHome } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import AsideIcon from "../AsideIcon/AsideIcon";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { FaRegStickyNote } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

function Aside() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { isOpen, close, toggle } = useAside();
  const router = useRouter();

  // 클라이언트에서 화면 크기를 감지하여 모바일 여부 설정
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    // 최초 한 번 체크
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return null;
  return (
    <div
      className={classNames(styles.aside, {
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.asideContent}>
        <div className={styles.asideIconWrapper}>
          <AsideIcon
            Icon={FaHome}
            title={"홈"}
            onClick={() => {
              close();
              router.push("/");
            }}
          />
          <AsideIcon
            Icon={FaCode}
            title={"코드"}
            onClick={toggle}
            isOpen={isOpen}
          />
          <AsideIcon
            Icon={FaRegStickyNote}
            title={"GPT히스토리"}
            onClick={() => {
              close();
              router.push("/chagptHistory");
            }}
            isOpen={isOpen}
          />
        </div>
      </div>

      <ul
        className={classNames(styles.asideIconDetail, {
          [styles.open]: isOpen,
        })}
      >
        <Link
          href="/category/100 Resources"
          className={styles.detailMenuItem}
        >
          개발사항
        </Link>
        <Link
          href="/category/100 Resources"
          className={styles.detailMenuItem}
        >
          기타
        </Link>
      </ul>
    </div>
  );
}

export default Aside;
