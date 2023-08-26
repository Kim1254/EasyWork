"use client";
import React from "react";
import styles from "./ModalContainer.module.css";

type Props = {
  children: React.ReactNode;
};

// Modal의 Container 부분
// children: React.ReactNode;
// handleClose: () => void;
export default function SmallModalContainer({ children }: Props) {
  return (
    // Modal의 Container
    <section className={styles.section}>
      {/* Modal */}
      <div className={styles.div}>{children}</div>
    </section>
  );
}
