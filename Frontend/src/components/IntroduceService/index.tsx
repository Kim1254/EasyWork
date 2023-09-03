import React from "react";
import styles from "./IntroduceService.module.css";

export default function IntroduceService() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>디지털 취약 계층도 사용할 수 있는 서비스</h2>
      <p className={styles.content}>4개의 기능으로 이력서를 완성할 수 있어요</p>
      <div className={styles.flex}>
        <div className={styles.item_container}>
          <div className={styles.icon_container}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50.216" height="55.586" viewBox="0 0 50.216 55.586">
              <path
                id="패스_86"
                d="M21.263,3.774a7.536,7.536,0,0,1,13.06,0L54.569,38.918a7.536,7.536,0,0,1-6.53,11.3H7.547a7.536,7.536,0,0,1-6.53-11.3Z"
                transform="translate(50.216) rotate(90)"
                fill="#7bc277"
              />
            </svg>
          </div>

          <div>
            <h5 className={styles.item_title}>녹음하기</h5>
            <p className={styles.item_content}>
              이력서에 필요한
              <br />
              내용을 녹음해요
            </p>
          </div>
        </div>
        <div className={styles.item_container}>
          <div className={styles.icon_container}>
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55">
              <rect
                id="사각형_191"
                width="55"
                height="55"
                rx="6"
                transform="translate(0 55) rotate(-90)"
                fill="#7bc277"
              />
            </svg>
          </div>
          <div>
            <h5 className={styles.item_title}>멈추기</h5>
            <p className={styles.item_content}>
              잠시 녹음을
              <br />쉴 수 있어요
            </p>
          </div>
        </div>
        <div className={styles.item_container}>
          <div className={styles.icon_container}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="55.586"
              height="63.925"
              viewBox="0 0 55.586 63.925"
            >
              <defs>
                <clipPath id="clip-path">
                  <rect
                    id="사각형_218"
                    width="55.586"
                    height="55.459"
                    fill="#7bc277"
                    stroke="rgba(0,0,0,0)"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                  />
                </clipPath>
              </defs>
              <g id="그룹_340" transform="translate(0 -0.351)">
                <g id="그룹_339" transform="translate(0 8.816)">
                  <g id="그룹_338" clip-path="url(#clip-path)">
                    <path
                      id="패스_102"
                      d="M51.675,13.546a3.065,3.065,0,0,0-.405-.531,3.013,3.013,0,0,0-4.764,3.64,21.654,21.654,0,0,1,3.039,11.434A21.754,21.754,0,1,1,6.064,26.656,21.422,21.422,0,0,1,9.59,15.893,21.677,21.677,0,0,1,30.795,6.237V.164A28.145,28.145,0,0,0,26.573.025a27.753,27.753,0,1,0,25.1,13.52"
                      transform="translate(0 0)"
                      fill="#7bc277"
                      stroke="rgba(0,0,0,0)"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                    />
                  </g>
                </g>
                <path
                  id="다각형_1"
                  d="M12,1.248a1,1,0,0,1,1.664,0L24.619,17.687a1,1,0,0,1-.832,1.555H1.869a1,1,0,0,1-.832-1.555Z"
                  transform="translate(43.037) rotate(90)"
                  fill="#7bc277"
                  stroke="rgba(0,0,0,0)"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </div>
          <div>
            <h5 className={styles.item_title}>다시하기</h5>
            <p className={styles.item_content}>
              처음부터 다시
              <br />
              녹음할 수 있어요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
