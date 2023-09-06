"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

// Header 페이지
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // "/" 일때는 헤더 안뜨게 설정
  if (isHome) {
    return null;
  }
  return (
    <header className={styles.header}>
      <Link tabIndex={0} href={"/"}>
        <img src="/images/ci.svg" width={107} height={53} alt="쉬운, 이력서" />
      </Link>
    </header>
  );
}
