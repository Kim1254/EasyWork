import Link from "next/link";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <header className={styles.haeder}>
      <Link href={"/"}>
        <img src="/svg/logo.svg" width={175} height={87} alt="쉬운, 이력서" />
      </Link>
    </header>
  );
}
