import React from "react";
import styles from "./PulseCircle.module.css";

type Props = {
  pulse: boolean;
  color?: "green" | "red" | "yellow";
};

const color_array = [
  { color: "green", blob: styles.green_blob, smallBlob: styles.green_small_blob },
  { color: "red", blob: styles.red_blob, smallBlob: styles.red_small_blob },
  { color: "yellow", blob: styles.yellow_blob, smallBlob: styles.yellow_small_blob },
];

export default function PulseCircle({ pulse, color = "green" }: Props) {
  const colorMatch = color_array.find((item) => item.color === color);
  return (
    <div className={`${styles.blob} ${pulse ? styles.active : ""} ${colorMatch?.blob || styles.green_blob}`}>
      <div
        className={`${styles.small_blob} ${pulse ? styles.active : ""} ${
          colorMatch?.smallBlob || styles.green_small_blob
        }`}
      ></div>
    </div>
  );
}
