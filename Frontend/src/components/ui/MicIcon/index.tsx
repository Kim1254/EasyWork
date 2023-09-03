import React from "react";
import PulseCircle from "../PulseCircle";
import styles from "./MicIcon.module.css";
import Image from "next/image";
type Props = {
  pulse?: boolean;
  color?: "green" | "red";
};

export default function MicIcon({ pulse = false, color = "green" }: Props) {
  return (
    <div className={styles.mic_container}>
      <PulseCircle pulse={pulse} color={color} />
      <div className={styles.mic}>
        <Image
          src={`/images/${color === "green" ? "mic_green.png" : "mic_red.png"}`}
          alt="마이크 아이콘"
          height={170}
          width={100}
        />
      </div>
    </div>
  );
}
