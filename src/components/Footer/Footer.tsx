import Link from "next/link";
import React from "react";
import styles from "./style.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.githubUrl}>
        github 주소:{" "}
        <Link href={"https://github.com/rn0614"}>
          https://github.com/rn0614
        </Link>
      </div>
    </div>
  );
}
