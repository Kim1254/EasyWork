import React from "react";
import styles from "./MainSection.module.css";

import Link from "next/link";
import BackgroundContainer from "../ui/BackgroundContainer";

// Home에서 첫번째 표시되는 메인 섹션
export default function MainSection() {
  return (
    <BackgroundContainer>
      <section className={styles.section}>
        {/* 홈화면에서만 표시되는 헤더 */}
        <header className={styles.header}>
          <Link tabIndex={0} href={"/"}>
            <img src="/images/ci.svg" width={107} height={53} alt="쉬운, 이력서" />
          </Link>
        </header>
        <article className={styles.article}>
          <div className={styles.flex_container}>
            <h1>
              <span className={styles.title}>쉬운, 이력서</span>
              <span className={styles.sub_title}>로 간단하게 작성해보세요!</span>
            </h1>
            <p className={styles.content}>
              불편한 키보드로 어렵게 작성했던 이력서를
              <br />
              쉬운, 이력서로 음성인식을 통해 쉽게 작성해보세요
            </p>
            {/* 이력서 작성 페이지로 이동 */}
            <Link tabIndex={1} prefetch={false} href="/resume" className={styles.resume_link}>
              <span>이력서 작성하기</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="11.142" height="20.281" viewBox="0 0 11.142 20.281">
                <path
                  id="패스_95"
                  d="M-10182.84,19059.5l8.727,8.727-8.727,8.727"
                  transform="translate(10184.254 -19058.09)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </div>
        </article>
      </section>
    </BackgroundContainer>
  );
}
