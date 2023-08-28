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
export default function OtherRecord() {
  const { status, startRecording, stopRecording, resumeRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ video: false });

  const [isRetry, setIsRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultModal, setIsResultModal] = useState(false);
  const [field, setField] = useState<"question" | "answer">("question");
  const [questionBlob, setQuestionBlob] = useState<string | undefined>(undefined);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isError, setIsError] = useState(false);
  console.log("questionblob", questionBlob, mediaBlobUrl);
  const router = useRouter();
  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);
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
    //setResult((prev) => prev.filter((item) => item.field !== field.value));

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
      if (field === "question") {
        setQuestionBlob(mediaBlobUrl);
        setIsRetry(true);
        setField("answer");
      } else {
        if (questionBlob) {
          const questionFile = new File([questionBlob], `${"question"}.mp3`, { type: "audio/mp3" });
          const answerFile = new File([mediaBlobUrl], `${field}.mp3`, { type: "audio/mp3" });
          const formData = new FormData();
          formData.append("question", questionFile);
          formData.append(field, answerFile);
          setIsLoadingPage(true);
          axios
            .post(`http://localhost:3000/api/voice1`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (isLoading) {
                setIsLoading(false);
                console.log(res.data.data);

                dispatch({ type: "ADD_DATA", payload: { field: "아무질문", data: res.data.data as string } });
                router.replace("/resume?page=result");
              } else {
                // setIsNotification(false);
              }
            })
            .catch((err) => {
              setIsResultModal(false);
              setIsError(true);
              setIsLoading(false);
            });
        } else {
          setField("question");
        }
      }
    }
  }, [isLoading, mediaBlobUrl]);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
        setField("question");
        setQuestionBlob(undefined);
        clearBlobUrl();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleClose = () => {
    setIsResultModal(false);
  };

  const handleResultModal = () => {
    setIsResultModal(true);
  };

  const handleSave = async () => {
    stopRecording();
    if (field === "question" && status === "idle") {
      router.replace("/resume?page=result");
    } else {
      setIsLoading(true);
    }
  };

  if (isError) {
    return <ErrorPage />;
  } else {
    return isError ? (
      <LoadingPage />
    ) : (
      <BackgroundContainer>
        {isResultModal && !isLoading && result && (
          <PortalModal>
            <BigModalContainer>
              <ResultModal
                onRetry={() => router.replace("/resume?page=answer")}
                onNext={handleClose}
                title={"전체 내용 확인하기"}
              >
                {result.map((data) => (
                  <div className={styles.field_container}>
                    <div className={styles.field_title}>
                      {field_list.find((field) => field.value === data.field)?.title_text ?? "error"}
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
            <Recorder onRecording={handleRecording} onRetry={handleRetry} status={status}>
              <div className={styles.title}>
                추가로 하시고 싶으신
                <br />
                이야기를 녹음해보세요.
              </div>
            </Recorder>
            <div className={styles.button_container}>
              <button onClick={handleResultModal} className={styles.result_button}>
                <span>전체 내용 확인하기</span>
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
          </article>
        </section>
      </BackgroundContainer>
    );
  }
}
