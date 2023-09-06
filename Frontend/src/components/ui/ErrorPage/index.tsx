import React from "react";
import styles from "./ErrorPage.module.css";
import BackgroundContainer from "../BackgroundContainer";
import MicIcon from "../MicIcon";

// 에러 페이지
export default function ErrorPage() {
  return (
    <BackgroundContainer color="red">
      <section className={styles.section}>
        <div>
          <h2 className={styles.title}>
            정보가 제대로
            <br />
            입력되지 않았아요.
          </h2>
          <h4 className={styles.subtitle}>
            더 많은 이야기와 정확한 발음으로
            <br />
            녹음하면 입력이 돼요.
          </h4>
        </div>
        <MicIcon color="red" />
      </section>
    </BackgroundContainer>
  );
}
