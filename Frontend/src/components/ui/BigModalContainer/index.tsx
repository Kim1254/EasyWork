import React from "react";
import styles from "./BigModalContainer.module.css";

type Props = {
  children: React.ReactNode;
};

// Modal의 Container 부분
// children: React.ReactNode;
export default function BigModalContainer({ children }: Props) {
  return (
    <section className={styles.section}>
      {/* Modal */}
      <div className={styles.div}>{children}</div>
    </section>
  );
}
