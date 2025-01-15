import Aside from "@/components/Aside/Aside";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className={styles.layout}>
      <header className={styles.header}>개발자 구상모 블로그입니다</header>
      <div className={styles.body}>
        <div className={styles.asideWrapper}>
          <Aside />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <footer className={styles.footer}>FOOTER영역</footer>
    </div>
  );
}
