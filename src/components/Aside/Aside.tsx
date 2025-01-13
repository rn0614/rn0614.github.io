"use client";
import styles from "./style.module.scss";
import classNames from "classnames";
import { useAside } from "@/hook/useAside";

export default function Aside() {
  const { isOpen, open, close, toggle } = useAside();
  return (
    <div
      className={classNames(styles.aside, {
        [styles.open]: isOpen,
      })}
    >
      <button onClick={open}>열기</button>
      <button onClick={close}>닫기</button>
      <button onClick={toggle}>토글</button>
    </div>
  );
}
