import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";

import CarouselContainer from "@/components/ui/CarouselContainer";
import Link from "next/link";

export default function Home() {
  return (
    <section className={styles.section}>
      <div className={styles.text_container}>
        <h1 className={styles.title}>쉬운, 이력서</h1>
        <p className={styles.content}>
          쉽고 간단하게 음성 인식을 통해
          <br /> 이력서를 작성해보세요.
        </p>
        <Link href="/resume" className={styles.resume_link}>
          <span>이력서 작성하기</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="11.142" height="20.281" viewBox="0 0 11.142 20.281">
            <path
              id="패스_95"
              data-name="패스 95"
              d="M-10182.84,19059.5l8.727,8.727-8.727,8.727"
              transform="translate(10184.254 -19058.09)"
              fill="none"
              stroke="#1e1e1e"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </Link>
      </div>

      <CarouselContainer>
        <Image src={"/images/trip1.jpg"} alt={"trip"} width={950} height={530} />
        <Image src={"/images/trip2.jpg"} alt={"trip"} width={950} height={530} />
        <Image src={"/images/trip3.jpg"} alt={"trip"} width={950} height={530} />
      </CarouselContainer>
    </section>
  );
}
