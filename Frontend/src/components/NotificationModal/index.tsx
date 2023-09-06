import React from "react";
import styles from "./NotificationModal.module.css";
import Image from "next/image";

type Props = {
  onClose: () => void;
  onSkip: () => void;
  onViewResult: () => void;
  isLoading: boolean;
};

// 1~6번째 질문 페이지에서 녹음 끝내기 눌렀을 때 표시되는 modal 컴포넌트
/*
  onClose: 재녹음 하기 
  onSkip: 다음 질문으로 넘어가기
  onViewResult: 녹음 내용 확인하기
  isLoading: 녹음 저장이 됐는지 체크하는 boolean
*/
export default function NotificationModal({ onClose, onSkip, onViewResult, isLoading }: Props) {
  console.log("check noti");
  return (
    <article className={styles.article}>
      {/* isLoading이 false일때만 표시 */}
      {!isLoading && (
        <button className={styles.close} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="17.827" height="17.83" viewBox="0 0 17.827 17.83">
            <g id="그룹_464" transform="translate(-1576.18 -172.585)">
              <path
                id="패스_114"
                d="M-10182.841,19059.506l7.6,7.5-7.6,7.5"
                transform="translate(11760.435 -18885.506)"
                fill="none"
                stroke="#1e1e1e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                id="패스_115"
                d="M-10175.237,19059.506l-7.605,7.5,7.605,7.5"
                transform="translate(11767.83 -18885.506)"
                fill="none"
                stroke="#1e1e1e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </svg>
        </button>
      )}

      <div className={styles.content_container}>
        <Image src={"/images/mic_green.png"} alt="마이크 아이콘" width={76} height={128} />
        <p className={styles.content}>녹음이 끝나셨나요? 말씀하신 내용을 확인할 수 있어요.</p>
        <button tabIndex={0} onClick={onViewResult} className={styles.check_button}>
          녹음 내용 확인하기
        </button>
        <button tabIndex={1} onClick={onSkip} className={styles.skip_button}>
          넘어가기
        </button>
      </div>
    </article>
  );
}
