import React from "react";
import { PulseLoader } from "react-spinners";
import styles from "./WaitResume.module.css";

// 이력서 로딩 Modal UI
export default function WaitResume() {
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        이력서를 <span className={styles.title_highlight}>만들고</span> 있어요!
      </div>
      <div className={styles.wait_text}>잠시만 기다려주세요.</div>
      <PulseLoader className={styles.pulse_loader} size={30} margin={18} color="#FFCC42" />
    </section>
  );
}
