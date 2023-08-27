"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
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

export default function AnswerRecord() {
  const { status, startRecording, stopRecording, resumeRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ video: false });
  const [field, setField] = useState(field_list[0]);
  const [isRetry, setIsRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultModal, setIsResultModal] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
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
    dispatch({ type: "RESET" });
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

            dispatch({ type: "ADD_DATA", payload: { field: field.value, data: res.data.data as string } });
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
    router.push(`/resumez?page=1`);
  };

  const handleResultModal = () => {
    setIsResultModal(true);
    setIsNotification(false);
  };

  const handleSave = async () => {
    stopRecording();
    setIsLoading(true);
    setIsNotification(true);
  };

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
          <Recorder onRecording={handleRecording} onRetry={handleRetry} status={status} field={field} />
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
}
