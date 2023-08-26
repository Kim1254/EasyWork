"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState, useTransition } from "react";

import { useNavigate } from "react-router-dom";
import WaitResume from "../WaitResume";
import { useReactMediaRecorder } from "react-media-recorder";
import styles from "./VoiceRecord.module.css";
import PulseCircle from "../ui/PulseCircle";
import BackgroundContainer from "../ui/BackgroundContainer";
import ProgressBar from "../ui/ProgressBar";
import MicIcon from "../ui/MicIcon";
import PortalModal from "../ui/PortalModal";
import SmallModalContainer from "../ui/SmallModalContainer";
import NotificationModal from "../NotificationModal";
import LoadingModal from "../LoadingModal";
import BigModalContainer from "../ui/BigModalContainer";
import ResultModal from "../ResultModal";

export const field_list = [
  {
    order: 1,
    value: "name",
    title: (
      <div>
        <h4 className={styles.subtitle}>안녕하세요!</h4>
        <h2 className={styles.title}>이름을 알려주세요.</h2>
      </div>
    ),
    title_text: "이름을 알려주세요. ",
  },
  {
    order: 2,
    value: "birth_place", // 나이생년월일주소
    title: (
      <div>
        <h2 className={styles.title}>
          주소와 생년월일을
          <br />
          알려주세요.
        </h2>
      </div>
    ),
    title_text: "주소와 생년월일을 알려주세요.",
  },
  {
    order: 3,
    value: "phone_number", // 폰넘버
    title: (
      <div>
        <h2 className={styles.title}>연락처를 알려주세요.</h2>
      </div>
    ),
    title_text: "연락처를 알려주세요.",
  },
  {
    order: 4,
    value: "career", // 경력
    title: (
      <div>
        <h2 className={styles.title}>
          그동안 경험하신
          <br />
          일자리가 있을까요?
        </h2>
      </div>
    ),
    title_text: "그동안 경험하신 일자리가 있을까요?",
  },
  {
    order: 5,
    value: "certificate", // 자격증,
    title: (
      <div>
        <h2 className={styles.title}>
          가지고 계신 자격증이
          <br />
          있다면 말씀해주세요.
        </h2>
      </div>
    ),
    title_text: "가지고 계신 자격증이 있다면 말씀해주세요.",
  },
  {
    order: 6,
    value: "self_intro", // 어떤사람인지
    title: (
      <div>
        <h2 className={styles.title}>
          본인이 어떤 사람인지
          <br />
          자유롭게 말씀해주세요.
        </h2>
      </div>
    ),
    title_text: "본인이 어떤사람인지 자유롭게 말씀해주세요.",
  },
];

type Result = { field: string; data: string };

const VoiceRecord = () => {
  const { status, startRecording, stopRecording, resumeRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ video: false });
  const [field, setField] = useState(field_list[0]);
  const [isRetry, setIsRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultModal, setIsResultModal] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [result, setResult] = useState<Result[]>([]);

  console.log("result", result);
  const handleRecording = () => {
    if (status === "recording") {
      pauseRecording();
    } else if (status === "paused") {
      resumeRecording();
    } else {
      startRecording();
    }
  };

  const handleRetry = () => {
    stopRecording();
    setResult((prev) => prev.filter((item) => item.field !== field.value));
    setIsRetry(true);
  };

  useEffect(() => {
    console.log("ee", isRetry, mediaBlobUrl);
    if (isRetry && mediaBlobUrl) {
      clearBlobUrl();
      setIsRetry(false);
    }
  }, [isRetry, mediaBlobUrl]);

  useEffect(() => {
    console.log("check", isLoading, mediaBlobUrl);
    if (isLoading && mediaBlobUrl) {
      const audioFile = new File([mediaBlobUrl], `${field.value}.mp3`, { type: "audio/mp3" });

      const formData = new FormData();
      formData.append(field.value, audioFile);
      axios
        .post(`http://localhost:3000/api/voice`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (isLoading) {
            setIsLoading(false);
            console.log(res.data.data);

            setResult((prev) => [...prev, { field: field.value, data: res.data.data as string }]);
          } else {
            // setIsNotification(false);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
          setIsNotification(false);
        });
    }
  }, [isLoading, mediaBlobUrl]);

  const handleCloseNotification = () => {
    setIsNotification(false);
    setIsLoading(false);
  };

  const handleNextField = () => {
    console.log(field);
    setField((prev) => field_list[prev.order]);
    setIsNotification(false);
    setIsResultModal(false);
    setIsLoading(false);
    clearBlobUrl();
  };

  const handleResultModal = () => {
    setIsResultModal(true);
    setIsNotification(false);
  };

  const handleSave = async () => {
    stopRecording();

    setIsLoading(true);
    setIsNotification(true);

    // // 해당 formData를 백엔드로 전송 /api/voice (임시)
    // // formdata 처리 audioFile 데이터의 이름은 일단 voice.mp3 type은 audio/mp3
    // // 성공시 "녹음이 성공하였습니다." alert, 실패시 error ?? "녹음에 실패하였습니다." alert{
  };

  // useEffect(() => {
  //   if (recordingBlob) {
  //     console.log(recordingBlob);
  //     handleSave().then((res) => console.log(123));
  //   }
  // }, [recordingBlob]);

  return (
    <BackgroundContainer>
      {isNotification && (
        <PortalModal>
          <SmallModalContainer>
            <NotificationModal
              onViewResult={handleResultModal}
              onSkip={handleNextField}
              isLoading={isLoading}
              onClose={handleCloseNotification}
            />
          </SmallModalContainer>
        </PortalModal>
      )}
      {!isNotification && isLoading && (
        <PortalModal>
          <SmallModalContainer>
            <LoadingModal />
          </SmallModalContainer>
        </PortalModal>
      )}

      {isResultModal && !isLoading && result.find((item) => item.field === field.value)?.data && (
        <PortalModal>
          <BigModalContainer>
            <ResultModal
              onRetry={handleRetry}
              onNext={handleNextField}
              title={field.title_text}
              content={result.find((item) => item.field === field.value)?.data as string}
            />
          </BigModalContainer>
        </PortalModal>
      )}

      <section className={styles.section}>
        <article className={styles.article}>
          <div className={styles.content_container}>
            <div className={styles.content}>
              {field.title}
              <div className={styles.recorder_container}>
                <div className={styles.button_container}>
                  <button className={styles.recorder_button} onClick={handleRecording}>
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
                  <button className={styles.recorder_button} onClick={handleRetry}>
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
            <MicIcon pulse={status === "recording"} />
          </div>
          <div className={styles.bottom_container}>
            <ProgressBar order={field.order} length={field_list.length} />
            <button className={styles.end_record} onClick={handleSave}>
              녹음 끝내기
            </button>
          </div>
        </article>
      </section>
    </BackgroundContainer>
  );
};

export default VoiceRecord;
