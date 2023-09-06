import React from "react";
import BackgroundContainer from "../BackgroundContainer";
import styles from "./LoadingPage.module.css";
import PulseCircle from "../PulseCircle";

// 로딩 페이지
export default function LoadingPage() {
  return (
    <BackgroundContainer color="yellow">
      <section className={styles.section}>
        <div>
          <h4 className={styles.subtitle}>잠시만 기다려주세요!</h4>
          <h2 className={styles.title}>이력서를 작성하고 있어요</h2>
        </div>
        <div className={styles.loading_pulse_container}>
          <PulseCircle pulse={true} color="yellow" />
          <div className={styles.loading_pulse}>
            <svg xmlns="http://www.w3.org/2000/svg" width="180" height="39" viewBox="0 0 180 39">
              <g id="그룹_274" transform="translate(0.168 -0.106)">
                <ellipse
                  id="타원_14"
                  cx="20"
                  cy="19.5"
                  rx="20"
                  ry="19.5"
                  transform="translate(-0.168 0.106)"
                  fill="#ffcc42"
                />
                <circle id="타원_15" cx="19.5" cy="19.5" r="19.5" transform="translate(70.832 0.106)" fill="#ffcc42" />
                <ellipse
                  id="타원_13"
                  cx="20"
                  cy="19.5"
                  rx="20"
                  ry="19.5"
                  transform="translate(139.832 0.106)"
                  fill="#ffcc42"
                />
              </g>
            </svg>
          </div>
        </div>
      </section>
    </BackgroundContainer>
  );
}
