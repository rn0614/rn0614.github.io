"use client";
import styles from "./style.module.scss";
import classNames from "classnames";
import { useAside } from "@/hook/useAside";
import { FaHome } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";
import AsideIcon from "../AsideIcon/AsideIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import withMobileVisibility from "../MobileDisplay/MobileDisplay";

function Aside() {
  const { isOpen, open, close, toggle } = useAside();
  const router = useRouter();
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
          <AsideIcon Icon={FaNoteSticky} title={"일과"} />
          <AsideIcon Icon={FaRegCalendarDays} title={"일정"} />
        </div>
      </div>

      <div
        className={classNames(styles.asideIconDetail, {
          [styles.open]: isOpen,
        })}
      >
        <Link
          className={classNames(styles.detailMenu, {
            [styles.open]: isOpen,
          })}
          href={'/category/dev'}
        >
          개발사항
        </Link>
        <Link
          className={classNames(styles.detailMenu, {
            [styles.open]: isOpen,
          })}
          href={'/category/etc'}
        >
          기타
        </Link>
      </div>
    </div>
  );
}

export default withMobileVisibility(Aside);