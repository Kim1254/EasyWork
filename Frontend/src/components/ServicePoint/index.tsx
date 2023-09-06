import React from "react";
import styles from "./ServicePoint.module.css";

// 서비스 특징 소개
export default function ServicePoint() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        쉬운, 이력서만의 <span className={styles.highlight}>3가지</span>
      </h2>

      <div className={styles.flex}>
        <div className={styles.flex_container}>
          <div className={`${styles.item_container} ${styles.yellow}`}></div>
          <div className={styles.item}>
            간단한 <span className={styles.highlight}>6가지</span>의<br /> 질문으로 완성해요
          </div>
        </div>
        <div className={styles.flex_container}>
          <div className={`${styles.item_container} ${styles.red}`}></div>
          <div className={styles.item}>
            녹음한 내용을
            <br />
            <span className={styles.highlight}>확인</span>할 수 있어요
          </div>
        </div>
        <div className={styles.flex_container}>
          <div className={`${styles.item_container} ${styles.green}`}></div>
          <div className={styles.item}>
            <span className={styles.highlight}>개인정보</span>가<br />
            저장되지 않아요
          </div>
        </div>
      </div>
    </section>
  );
}
