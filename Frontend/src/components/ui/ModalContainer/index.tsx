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
  return (
    // Modal의 Container
    <section className={styles.section}>
      {/* Modal */}
      <div className={styles.div}>{children}</div>
    </section>
  );
}
