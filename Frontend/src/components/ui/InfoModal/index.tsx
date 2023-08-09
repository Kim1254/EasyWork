"use client";
import React from "react";
import styles from "./InfoModal.module.css";

type Props = {
  handleClose: () => void;
};

export default function InfoModal({ handleClose }: Props) {
  return (
    <article className={styles.article}>
      <img
        width={800}
        height={800}
        className={styles.image}
        alt="사용법에 대한 이미지입니다."
        src={"/image/info_modal.png"}
      />
      <button className={styles.button} onClick={handleClose}></button>
    </article>
  );
}
