"use client";
import React, { useContext, useEffect, useState } from "react";
import BackgroundContainer from "../ui/BackgroundContainer";
import PortalModal from "../ui/PortalModal";
import BigModalContainer from "../ui/BigModalContainer";
import ResultModal from "../ResultModal";
import Recorder from "../ui/Recorder";
import { useRouter } from "next/navigation";
import { ResultContext } from "@/context/ResultContext";
import { useReactMediaRecorder } from "react-media-recorder-2";
import axios from "axios";
import styles from "./OtherRecord.module.css";
import { field_list } from "@/utils/FieldList/FiledList";
import LoadingPage from "../ui/LoadingPage";
import ErrorPage from "../ui/ErrorPage";
import MicIcon from "../ui/MicIcon";

// 추가 질문 코드 (추후 추가 예정)
export default function OtherRecord() {
  const {
    status: questionStatus,
    startRecording: startRecordingQuestion,
    stopRecording: stopRecordingQuestion,
    resumeRecording: resumeRecordingQuestion,
    pauseRecording: pauseRecordingQuestion,
    mediaBlobUrl: questionMediaBlobUrl,
    clearBlobUrl: clearQuestionBlobUrl,
  } = useReactMediaRecorder({ video: false });

  const {
    status: answerStatus,
    startRecording: startRecordingAnswer,
    stopRecording: stopRecordingAnswer,
    resumeRecording: resumeRecordingAnswer,
    pauseRecording: pauseRecordingAnswer,
    mediaBlobUrl: answerMediaBlobUrl,
    clearBlobUrl: clearAnswerBlobUrl,
  } = useReactMediaRecorder({ video: false });

  const [isQuestionRetry, setIsQuestionRetry] = useState(false);
  const [isAnswerRetry, setIsAnswerRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultModal, setIsResultModal] = useState(false);

  const [isError, setIsError] = useState(false);
  console.log("status", questionStatus, answerStatus);
  const router = useRouter();
  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);
  const handleQuestionRecording = () => {
    if (questionStatus === "recording") {
      pauseRecordingQuestion();
    } else if (questionStatus === "paused") {
      resumeRecordingQuestion();
    } else {
      if (answerStatus !== "idle") {
        stopRecordingAnswer();
      }
      startRecordingQuestion();
    }
  };

  const handleAnswerRecording = () => {
    if (answerStatus === "recording") {
      pauseRecordingAnswer();
    } else if (answerStatus === "paused") {
      resumeRecordingAnswer();
    } else {
      if (questionStatus !== "idle") {
        stopRecordingQuestion();
      }
      startRecordingAnswer();
    }
  };

  const handleQuestionRetry = () => {
    stopRecordingQuestion();

    setIsQuestionRetry(true);
  };

  const handleAnswerRetry = () => {
    stopRecordingAnswer();

    setIsAnswerRetry(true);
  };

  useEffect(() => {
    if (isQuestionRetry && questionMediaBlobUrl) {
      clearQuestionBlobUrl();
      setIsQuestionRetry(false);
    }
  }, [isQuestionRetry, questionMediaBlobUrl]);

  useEffect(() => {
    if (isAnswerRetry && answerMediaBlobUrl) {
      clearAnswerBlobUrl();
      setIsAnswerRetry(false);
    }
  }, [isAnswerRetry, answerMediaBlobUrl]);

  useEffect(() => {
    if (isLoading && questionStatus === "stopped" && answerStatus === "stopped") {
      if (questionMediaBlobUrl && answerMediaBlobUrl) {
        console.log("blob", questionMediaBlobUrl, answerMediaBlobUrl);
        const questionFile = new File([questionMediaBlobUrl], `${"question"}.mp3`, { type: "audio/mp3" });
        const answerFile = new File([answerMediaBlobUrl], `${"answer"}.mp3`, { type: "audio/mp3" });
        const formData = new FormData();
        formData.append("question", questionFile);
        formData.append("answer", answerFile);

        axios
          .post(`http://localhost:3000/api/voice`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("텟카이");
            setIsLoading(false);
            setIsResultModal(true);
            clearAnswerBlobUrl();
            clearQuestionBlobUrl();
            dispatch({ type: "ADD_DATA", payload: { field: "아무질문", data: res.data.data as string } });
          })
          .catch((err) => {
            setIsResultModal(false);
            setIsError(true);
            setIsLoading(false);
            clearAnswerBlobUrl();
            clearQuestionBlobUrl();
          });
      } else {
        console.log("check");
        setIsResultModal(false);
        setIsError(true);
        setIsLoading(false);
      }
    }
  }, [isLoading, questionMediaBlobUrl, answerMediaBlobUrl, questionStatus, answerStatus]);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);

        clearQuestionBlobUrl();
        clearAnswerBlobUrl();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleClose = () => {
    setIsResultModal(false);
    router.replace("/resume?page=result");
  };

  const handleSave = () => {
    if (questionStatus === "idle" && answerStatus === "idle") {
      setIsResultModal(true);
    } else {
      stopRecordingQuestion();
      stopRecordingAnswer();

      setIsLoading(true);
    }
  };

  const hanldeCloseResultModal = () => {
    setIsResultModal(false);
    const payload = result[result.length - 1];

    dispatch({ type: "DELETE_DATA", payload: payload });

    // setIsQuestionRetry(true);

    // setIsAnswerRetry(true);
  };

  if (isError) {
    return <ErrorPage />;
  } else {
    return isLoading ? (
      <LoadingPage />
    ) : (
      <BackgroundContainer>
        {isResultModal && !isLoading && result && (
          <PortalModal>
            <BigModalContainer>
              <ResultModal onRetry={hanldeCloseResultModal} onNext={handleClose} title={"전체 내용 확인하기"}>
                {result.map((data) => (
                  <div className={styles.field_container}>
                    <div className={styles.field_title}>
                      {field_list.find((field) => field.value === data.field)?.title_text ?? data.field}
                    </div>
                    <div className={styles.field_bar}></div>
                    <div className={styles.field_content}>{data.data}</div>
                  </div>
                ))}
              </ResultModal>
            </BigModalContainer>
          </PortalModal>
        )}

        <section className={styles.section}>
          <article className={styles.article}>
            <div className={styles.content_container}>
              <div>
                <Recorder
                  paddingTop="0px"
                  onRecording={handleQuestionRecording}
                  onRetry={handleQuestionRetry}
                  status={questionStatus}
                >
                  <div className={styles.title}>추가로 질문을 녹음해보세요.</div>
                </Recorder>
                <Recorder
                  paddingTop="36px"
                  onRecording={handleAnswerRecording}
                  onRetry={handleAnswerRetry}
                  status={answerStatus}
                >
                  <div className={styles.title}>질문에 대한 답을 녹음하세요.</div>
                </Recorder>
              </div>
              <div className={styles.right_container}>
                <MicIcon pulse={status === "recording"} />
                <button onClick={handleSave} className={styles.end_button}>
                  <span>녹음 끝내기</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11.142" height="20.281" viewBox="0 0 11.142 20.281">
                    <path
                      id="패스_113"
                      d="M-10182.84,19059.5l8.727,8.727-8.727,8.727"
                      transform="translate(10184.254 -19058.09)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </section>
      </BackgroundContainer>
    );
  }
}
