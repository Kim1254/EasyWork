"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder-2";
import styles from "./AnswerRecord.module.css";
import BackgroundContainer from "../ui/BackgroundContainer";
import ProgressBar from "../ui/ProgressBar";

import PortalModal from "../ui/PortalModal";
import SmallModalContainer from "../ui/SmallModalContainer";
import NotificationModal from "../NotificationModal";
import LoadingModal from "../LoadingModal";
import BigModalContainer from "../ui/BigModalContainer";
import ResultModal from "../ResultModal";
import { field_list } from "@/utils/FieldList/FiledList";
import { ResultContext } from "@/context/ResultContext";
import { useRouter } from "next/navigation";
import Recorder from "../ui/Recorder";
import ErrorPage from "../ui/ErrorPage";
import LoadingPage from "../ui/LoadingPage";
import MicIcon from "../ui/MicIcon";

export default function AnswerRecord() {
  const { status, startRecording, stopRecording, resumeRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ video: false });
  const [field, setField] = useState(field_list[0]);
  const [isRetry, setIsRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultModal, setIsResultModal] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isError, setIsError] = useState(false);
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

  const handleResultRetry = () => {
    setIsResultModal(false);
    const payload = result.find((item) => item.field === field.value);
    if (payload) {
      dispatch({ type: "DELETE_DATA", payload: payload });
    }
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
    dispatch({ type: "RESET" });
  }, []);

  useEffect(() => {
    console.log("check", isLoading, mediaBlobUrl);
    if (isLoading && mediaBlobUrl) {
      const audioFile = new File([mediaBlobUrl], `${field.value}.mp3`, { type: "audio/mp3" });

      const formData = new FormData();
      formData.append(field.value, audioFile);
      axios
        .post(`http://localhost:8000/api/voice/answer`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setIsLoading(false);
          console.log(res.data.data);
          dispatch({ type: "ADD_DATA", payload: { field: res.data.question, data: res.data.answer as string } });
          if (field.order === 7) {
            setIsResultModal(true);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
          setIsNotification(false);
          setIsError(true);
          clearBlobUrl();
        });
    }
  }, [isLoading, mediaBlobUrl]);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleCloseNotification = () => {
    setIsNotification(false);
    setIsLoading(false);
  };

  const handleNextField = () => {
    console.log(field);
    setIsNotification(false);
    setIsResultModal(false);

    clearBlobUrl();
    if (field.order === 7) {
      router.replace(`/resume?page=result`);
    } else {
      setField((prev) => field_list[prev.order]);
    }
  };

  const handleResultModal = () => {
    setIsResultModal(true);
    setIsNotification(false);
  };

  const handleSave = async () => {
    stopRecording();
    setIsLoading(true);

    if (field.order === 7) {
    } else {
      setIsNotification(true);
    }
  };

  if (isError) {
    return <ErrorPage />;
  } else {
    return isLoading && !isNotification && !isResultModal ? (
      <LoadingPage />
    ) : (
      <BackgroundContainer>
        {isNotification && (
          <PortalModal>
            <SmallModalContainer>
              <NotificationModal
                onViewResult={handleResultModal}
                onSkip={handleNextField}
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

        {isResultModal &&
          !isLoading &&
          result.find((item) => item.field === field.value)?.data &&
          field.order !== 7 && (
            <PortalModal>
              <BigModalContainer>
                <ResultModal onRetry={handleResultRetry} onNext={handleNextField} title={field.title_text}>
                  {result.find((item) => item.field === field.value)?.data as string}
                </ResultModal>
              </BigModalContainer>
            </PortalModal>
          )}

        {isResultModal &&
          !isLoading &&
          result.find((item) => item.field === field.value)?.data &&
          field.order === 7 && (
            <PortalModal>
              <BigModalContainer>
                <ResultModal onRetry={handleResultModal} onNext={handleNextField} title={"전체 내용 확인하기"}>
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
              <Recorder onRecording={handleRecording} onRetry={handleRetry} status={status}>
                {field.title}
              </Recorder>
              <MicIcon pulse={status === "recording"} />
            </div>
            <div className={styles.bottom_container}>
              <ProgressBar order={field.order} length={field_list.length} />
              <button disabled={status === "idle"} className={styles.end_record} onClick={handleSave}>
                녹음 끝내기
              </button>
            </div>
          </article>
        </section>
      </BackgroundContainer>
    );
  }
}
