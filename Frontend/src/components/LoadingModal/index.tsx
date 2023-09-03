import React from "react";
import styles from "./LoadingModal.module.css";
import Image from "next/image";

export default function LoadingModal() {
  return (
    <article className={styles.article}>
      <Image src={"/images/mic_yellow.png"} alt="마이크 아이콘(노란색)" width={77} height={129} />
      <h3 className={styles.title}>잠시만 기다려 주세요</h3>
      <p className={styles.content}>녹음한 내용을 불러오고 있어요!</p>
    </article>
  );
}
