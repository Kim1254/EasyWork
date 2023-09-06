import React from "react";
import styles from "./ResumeExample.module.css";
import Image from "next/image";
import Link from "next/link";
export default function ResumeExample() {
  return (
    <section className={styles.section}>
      <h3 className={styles.sub_title}>취업에 필요한 이력서</h3>
      <h1 className={styles.title}>
        <span className={styles.highlight}>쉬운, 이력서</span>에서 작성하세요
      </h1>
      <Image src={"/images/resume_example.png"} alt="이력서 예시" width={1665} height={2039} />
      <div className={styles.bottom_container}></div>{" "}
      <Link tabIndex={2} href="/resume" className={styles.resume_link}>
        <span>이력서 작성하기</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="11.142" height="20.281" viewBox="0 0 11.142 20.281">
          <path
            id="패스_95"
            data-name="패스 95"
            d="M-10182.84,19059.5l8.727,8.727-8.727,8.727"
            transform="translate(10184.254 -19058.09)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </Link>
    </section>
  );
}
