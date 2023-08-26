import React from "react";
import styles from "./ProgressBar.module.css";
type Props = {
  order: number;
  length: number;
};

const progress_array = [
  { order: 1, value: styles.one },
  { order: 2, value: styles.two },
  { order: 3, value: styles.three },
  { order: 4, value: styles.four },
  { order: 5, value: styles.five },
  { order: 6, value: styles.six },
];

export default function ProgressBar({ order, length }: Props) {
  const progress = progress_array.find((item) => item.order === order)?.value ?? "";
  return (
    <div className={styles.progressbar_container}>
      <span>{order}</span>
      <div className={styles.bar_container}>
        <div className={styles.progressbar}></div>
        <div className={`${styles.progress} ${progress}`}></div>
      </div>

      <span className={styles.gray}>{length}</span>
    </div>
  );
}
