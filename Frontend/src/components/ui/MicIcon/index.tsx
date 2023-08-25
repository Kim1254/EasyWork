import React from "react";
import PulseCircle from "../PulseCircle";
import styles from "./MicIcon.module.css";
import Image from "next/image";
type Props = {
  pulse?: boolean;
};

export default function MicIcon({ pulse = false }: Props) {
  return (
    <div className={styles.mic_container}>
      <PulseCircle pulse={pulse} />
      <div className={styles.mic}>
        <Image src={`/images/mic_green.png`} alt="마이크 아이콘" height={170} width={100} />
      </div>
    </div>
  );
}
