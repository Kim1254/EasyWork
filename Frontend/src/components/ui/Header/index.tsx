import Link from "next/link";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <img src="/images/ci.svg" width={107} height={53} alt="쉬운, 이력서" />
      </Link>
    </header>
  );
}
