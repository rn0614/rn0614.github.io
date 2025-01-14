"use client";
import styles from "./style.module.scss";
import classNames from "classnames";
import { useAside } from "@/hook/useAside";
import { FaHome } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";
import AsideIcon from "../AsideIcon/AsideIcon";

export default function Aside() {
  const { isOpen, open, close, toggle } = useAside();
  return (
    <div
      className={classNames(styles.aside, {
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.asideContent}>
        <div className={styles.asideIconWrapper}>
          <AsideIcon Icon={FaHome} title={"홈"} />
          <AsideIcon
            Icon={FaCode}
            title={"코드"}
            onClick={toggle}
            isOpen={isOpen}
          />
          <AsideIcon Icon={FaNoteSticky} title={"일과"} />
          <AsideIcon Icon={FaRegCalendarDays} title={"일정"} />
        </div>
        {isOpen ? (
          <div className={styles.asideIconDetail}>hi</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
