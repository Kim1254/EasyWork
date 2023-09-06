import React from "react";
import styles from "./ResultModal.module.css";
import Image from "next/image";

type Props = {
  title: string;
  children: React.ReactNode;
  onRetry: () => void;
  onNext: () => void;
};

// 녹음 내용 확인 Modal
/* 
  title: 질문 제목
  onNext: 다음으로 넘어가기
  onRetry: 재녹음하기
  children: content 부분
*/
export default function ResultModal({ title, onNext, onRetry, children }: Props) {
  return (
    <article className={styles.article}>
      <div className={styles.title_container}>
        <Image src="/images/mic_green.png" alt="마이크 아이콘(초록색)" height={58} width={35} />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.border}></div>
      <div className={styles.content}>{children}</div>
      <div className={styles.button_container}>
        <button tabIndex={0} className={styles.retry_button} onClick={onRetry}>
          재녹음하기
        </button>
        <button tabIndex={1} className={styles.next_button} onClick={onNext}>
          완료하기
        </button>
      </div>
    </article>
  );
}
