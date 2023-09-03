"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  if (isHome) {
    return null;
  }
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <img src="/images/ci.svg" width={107} height={53} alt="쉬운, 이력서" />
      </Link>
    </header>
  );
}
