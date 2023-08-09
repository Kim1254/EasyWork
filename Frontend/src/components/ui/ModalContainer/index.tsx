"use client";
import React from "react";
import styles from "./ModalContainer.module.css";

type Props = {
  children: React.ReactNode;
  handleClose: () => void;
};

// Modal의 Container 부분
// children: React.ReactNode;
// handleClose: () => void;
export default function ModalContainer({ children, handleClose }: Props) {
  const handleModalClose = (e: React.MouseEvent<HTMLElement>) => {
    // onClick event가 발생한 부분의 target이 currenTarget과 일치할때만 실행
    //(ex: modal 창을 직접 누르는 부분을 눌렀을 때는 x Container 부분을 눌렀을 때 실행)
    if (e.target === e.currentTarget) {
      handleClose();
    } else {
      return;
    }
  };
  return (
    // Modal의 Container
    <section onClick={handleModalClose} className={styles.section}>
      {/* Modal */}
      <div className={styles.div}>{children}</div>
    </section>
  );
}
