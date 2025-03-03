"use client";
import styles from "./style.module.scss";
import classNames from "classnames";
import { useAside } from "@/hooks/useAside";
import { FaHome } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import AsideIcon from "../AsideIcon/AsideIcon";
import { useRouter } from "next/navigation";
import withMobileVisibility from "../hoc/withMobileVisibility";
import { Button } from "@radix-ui/themes";

function Aside() {
  const { isOpen, close, toggle } = useAside();
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
        </div>
      </div>

      <ul
        className={classNames(styles.asideIconDetail, {
          [styles.open]: isOpen,
        })}
      >
        <Button
          variant="soft"
          className={styles.detailMenuItem}
          onClick={() => {
            close();
            router.push("/category/dev");
          }}
        >
          개발사항
        </Button>
        <Button
          variant="soft"
          className={styles.detailMenuItem}
          onClick={() => {
            close();
            router.push("/category/etc");
          }}
        >
          기타
        </Button>
      </ul>
    </div>
  );
}

export default withMobileVisibility(null, Aside);
