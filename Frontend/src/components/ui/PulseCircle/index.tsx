import React from "react";
import styles from "./PulseCircle.module.css";

type Props = {
  pulse: boolean;
};

export default function PulseCircle({ pulse }: Props) {
  return (
    <div className={`${styles.blob} ${pulse ? styles.active : ""}`}>
      <div className={`${styles.small_blob} ${pulse ? styles.active : ""}`}></div>
    </div>
  );
}
