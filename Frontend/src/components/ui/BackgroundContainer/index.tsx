import React from "react";
import styles from "./BackgroundContainer.module.css";
import { usePathname } from "next/navigation";
type Props = {
  children: React.ReactNode;
  wave?: boolean;
  color?: "yellow" | "green" | "red";
};

// 물결 애니메이션
const color_array = [
  { color: "grren", wave: "#7BC278", smallWave: "#E6EEDA" },
  { color: "yellow", wave: "#FFCC42", smallWave: "#FFE9AD" },
  { color: "red", wave: "#EF857D", smallWave: "#F3B9B4" },
];

/* 
배경 UI
children: 안에 담길 컴포넌트 
wave: 물결 애니메이션 표시 boolean (기본값: true)
color: 물결 애니메이션 색(기본값: green)
*/
export default function BackgroundContainer({ children, wave = true, color = "green" }: Props) {
  const colorMatch = color_array.find((item) => item.color === color);
  return (
    <>
      <section className={styles.section_container}>
        {/* https://s.muz.li/ODM2MGYyMzQz */}
        {wave && (
          <>
            <div className={styles.wave_container1}>
              <svg
                width="100%"
                height="100%"
                id="svg"
                viewBox="0 0 1440 490"
                xmlns="http://www.w3.org/2000/svg"
                filter="44"
              >
                <path
                  d="M 0,500 C 0,500 0,250 0,250 C 120.85714285714283,196.89285714285714 241.71428571428567,143.78571428571428 377,165 C 512.2857142857143,186.21428571428572 661.9999999999999,281.75 779,323 C 896.0000000000001,364.25 980.2857142857142,351.2142857142857 1085,330 C 1189.7142857142858,308.7857142857143 1314.857142857143,279.3928571428571 1440,250 C 1440,250 1440,500 1440,500 Z"
                  stroke="none"
                  strokeWidth="0"
                  fill={colorMatch?.wave || "#7BC278"}
                  fillOpacity="0.97"
                  className={styles.wave}
                ></path>
              </svg>
            </div>
            <div className={styles.wave_container2}>
              <svg
                width="100%"
                height="100%"
                id="svg"
                viewBox="0 0 1440 490"
                xmlns="http://www.w3.org/2000/svg"
                filter="44"
              >
                <path
                  d="M 0,500 C 0,500 0,250 0,250 C 120.85714285714283,196.89285714285714 241.71428571428567,143.78571428571428 377,165 C 512.2857142857143,186.21428571428572 661.9999999999999,281.75 779,323 C 896.0000000000001,364.25 980.2857142857142,351.2142857142857 1085,330 C 1189.7142857142858,308.7857142857143 1314.857142857143,279.3928571428571 1440,250 C 1440,250 1440,500 1440,500 Z"
                  stroke="none"
                  strokeWidth="0"
                  fill={colorMatch?.smallWave || "#E6EEDA"}
                  fillOpacity="1"
                  className={styles.wave}
                ></path>
              </svg>
            </div>
          </>
        )}
      </section>
      {children}
    </>
  );
}
