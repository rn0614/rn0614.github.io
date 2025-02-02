import Aside from "@/components/Aside/Aside";
import styles from "./layout.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className={styles.layout}>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <div className={styles.body}>
        <div className={styles.asideWrapper}>
          <Aside />
        </div>
        <div className={styles.main}>
          <div className={styles.content}>{children}</div>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}
