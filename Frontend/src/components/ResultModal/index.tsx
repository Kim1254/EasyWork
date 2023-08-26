import React from "react";
import styles from "./ResultModal.module.css";
import Image from "next/image";

type Props = {
  title: string;
  content: string;
  onRetry: () => void;
  onNext: () => void;
};

export default function ResultModal({ title, content, onNext, onRetry }: Props) {
  return (
    <article className={styles.article}>
      <div className={styles.title_container}>
        <Image src="/images/mic_green.png" alt="마이크 아이콘(초록색)" height={58} width={35} />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.border}></div>
      <div className={styles.content}>{content}</div>
      <div className={styles.button_container}>
        <button className={styles.retry_button} onClick={onRetry}>
          재녹음하기
        </button>
        <button className={styles.next_button} onClick={onNext}>
          완료하기
        </button>
      </div>
    </article>
  );
}
