"use client"
import React from "react";
import withMobileVisibility from "../hoc/withMobileVisibility/withMobileVisibility";
import styles from './style.module.scss';

function Header() {
  return <header className={styles.header}>개발자 구상모 블로그</header>;
}

export default withMobileVisibility(Header, null);
