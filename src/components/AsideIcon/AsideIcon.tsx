import React from "react";
import styles from "./style.module.scss";
import { IconType } from "react-icons/lib";
import classNames from "classnames";

type AsideIconType = {
  Icon: IconType;
  title?: string;
  onClick?: () => void;
  isOpen?: boolean;
};

export default function AsideIcon({
  Icon,
  title,
  onClick,
  isOpen,
}: AsideIconType) {
  return (
    <div
      className={classNames(
        styles.asideIconWrapper,
        isOpen ? styles.open : styles.default
      )}
      onClick={onClick}
    >
      <div className={styles.asideICon}>
        <Icon size={40} />
      </div>
      {title ? <div className={styles.asideIconTitle}>{title}</div> : null}
    </div>
  );
}
