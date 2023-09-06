import React from "react";
import styles from "./Recorder.module.css";
import MicIcon from "../MicIcon";

type Props = {
  children: React.ReactNode;
  onRecording: () => void;
  onRetry: () => void;
  status: string;
  paddingTop?: string;
};
export default function Recorder({ onRecording, onRetry, status, children, paddingTop = "120px" }: Props) {
  return (
    <div className={styles.content} style={{ paddingTop: paddingTop }}>
      {children}
      <div className={styles.recorder_container}>
        <div className={styles.button_container}>
          <button tabIndex={1} className={styles.recorder_button} onClick={onRecording}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
              <ellipse
                id="타원_56"
                cx="13"
                cy="13"
                rx="13"
                ry="13"
                transform="translate(0 26) rotate(-90)"
                fill="#7bc277"
              />
            </svg>
          </button>
          {status === "recording" ? <p>멈추기</p> : <p>녹음하기</p>}
        </div>

        <div className={styles.button_container}>
          <button tabIndex={2} className={styles.recorder_button} onClick={onRetry}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="26"
              height="29.713"
              viewBox="0 0 26 29.713"
            >
              <defs>
                <clipPath id="clip-path">
                  <rect
                    id="사각형_218"
                    width="26"
                    height="25.941"
                    fill="#7bc277"
                    stroke="rgba(0,0,0,0)"
                    strokeMiterlimit="10"
                    strokeWidth="1"
                  />
                </clipPath>
              </defs>
              <g id="그룹_340" transform="translate(-763.812 -562.28)">
                <g id="그룹_339" transform="translate(763.812 566.053)">
                  <g id="그룹_338" clipPath="url(#clip-path)">
                    <path
                      id="패스_102"
                      d="M24.171,6.336a1.434,1.434,0,0,0-.189-.248,1.409,1.409,0,0,0-2.228,1.7,10.128,10.128,0,0,1,1.421,5.348,10.175,10.175,0,1,1-20.338-.67A10.02,10.02,0,0,1,4.485,7.434,10.139,10.139,0,0,1,14.4,2.917V.077A13.165,13.165,0,0,0,12.429.012,12.981,12.981,0,1,0,24.171,6.336"
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
                  d="M5.168,1.248a1,1,0,0,1,1.664,0l4.131,6.2A1,1,0,0,1,10.131,9H1.869a1,1,0,0,1-.832-1.555Z"
                  transform="translate(783.942 561.929) rotate(90)"
                  fill="#7bc277"
                  stroke="rgba(0,0,0,0)"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </button>
          <p>다시하기</p>
        </div>
      </div>
    </div>
  );
}
