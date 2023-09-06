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
  // 녹음 라이브러리
  const { status, startRecording, stopRecording, resumeRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ video: false });

  // 질문 field
  const [field, setField] = useState(field_list[0]);

  const [isRetry, setIsRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultModal, setIsResultModal] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  // 질문 결과 state
  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);

  // 녹음하기 클릭 함수 (녹음 중일때는 일시정지, 일시정지일 때는 녹음 재개, 그 외에는 녹음 시작)
  const handleRecording = () => {
    if (status === "recording") {
      pauseRecording();
    } else if (status === "paused") {
      resumeRecording();
    } else {
      startRecording();
    }
  };

  // 재녹음 함수(녹음 종료 뒤 isRetry true로 변경)
  const handleRetry = () => {
    stopRecording();
    setIsRetry(true);
  };

  // 녹음 결과 모달창에서 재녹음 하기 클릭 시 실행되는 함수(해당 질문의 결과를 지우고 isRetry true로 변경)
  const handleResultRetry = () => {
    setIsResultModal(false);
    const payload = result.find((item) => item.field === field.value);
    if (payload) {
      dispatch({ type: "DELETE_DATA", payload: payload });
    }
    setIsRetry(true);
  };

  // 재녹음 버튼을 누르고 난뒤 mediaBlobUrl 초기화 뒤 isRetry false로 변경
  useEffect(() => {
    if (isRetry && mediaBlobUrl) {
      clearBlobUrl();
      setIsRetry(false);
    }
  }, [isRetry, mediaBlobUrl]);
  // 컴포넌트가 처음 실행될 때 질문 결과를 초기화
  useEffect(() => {
    dispatch({ type: "RESET" });
  }, []);

  // 녹음 끝내기 클릭시 녹음 파일 전달
  useEffect(() => {
    // mediaBlobUrl -> blob으로 변환 뒤 백엔드에 전달하는 함수
    async function urlToBlob(blobUrl: string) {
      try {
        const response = await fetch(blobUrl);
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        const audioBlob = await response.blob();

        const audioFile = new File([audioBlob], `${field.value}.mp3`, { type: "audio/mp3" });

        const formData = new FormData();
        formData.append(field.value, audioFile);

        const res = await axios.post(`http://127.0.0.1:8000/api/voice/answer`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // 성공 시 isLoading false 후 결과 context에 추가
        setIsLoading(false);
        dispatch({ type: "ADD_DATA", payload: { field: res.data.question, data: res.data.answer as string } });
        // 마지막 질문이면 전체 결과 modal
        if (field.order === 7) {
          setIsResultModal(true);
        }
      } catch (err) {
        // 에러 발생시
        console.error("err", err);
        setIsLoading(false);
        setIsNotification(false);
        setIsError(true);
        clearBlobUrl();
      }
    }

    // isLoading이 true고 녹음 내용이 있을 시 해당 함수 실행
    if (isLoading && mediaBlobUrl) {
      urlToBlob(mediaBlobUrl);
    }
  }, [isLoading, mediaBlobUrl]);

  // 에러 발생시 5초동안 에러 페이지 표시
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  // notification 취소
  const handleCloseNotification = () => {
    setIsNotification(false);
    const payload = result.find((item) => item.field === field.value);
    if (payload) {
      dispatch({ type: "DELETE_DATA", payload: payload });
    }
    setIsRetry(true);
  };

  // 다음 질문으로 넘어가는 함수
  const handleNextField = () => {
    setIsNotification(false);
    setIsResultModal(false);
    clearBlobUrl();

    //마지막 질문의 ResultModal에서 해당 함수 버튼 클릭시 결과 페이지로 이동
    // 그 외에는 다음 질문으로 넘김
    if (field.order === 7) {
      router.replace(`/resume?page=result`);
    } else {
      setField((prev) => field_list[prev.order]);
    }
  };

  // result modal 출력 함수
  const handleResultModal = () => {
    setIsResultModal(true);
    setIsNotification(false);
  };

  // 녹음 끝내기 클릭 시 실행되는 함수
  const handleSave = async () => {
    stopRecording();
    setIsLoading(true);

    // 마지막 질문이 아니면 NotificationModal 출력
    if (field.order !== 7) {
      setIsNotification(true);
    }
  };

  if (isError) {
    // 에러 발생 시 에러페이지
    return <ErrorPage />;
  } else {
    // modal 없이 isLoading 상태일때는 로딩 페이지 표시
    return isLoading && !isNotification && !isResultModal ? (
      <LoadingPage />
    ) : (
      <BackgroundContainer>
        {/* 1~6번째 질문까지는 녹음 끝내기 클릭시 해당 modal 표시 */}
        {isNotification && (
          <PortalModal>
            <SmallModalContainer>
              <NotificationModal
                isLoading={isLoading}
                onViewResult={handleResultModal}
                onSkip={handleNextField}
                onClose={handleCloseNotification}
              />
            </SmallModalContainer>
          </PortalModal>
        )}
        {/* LoadingModal */}
        {!isNotification && isLoading && (
          <PortalModal>
            <SmallModalContainer>
              <LoadingModal />
            </SmallModalContainer>
          </PortalModal>
        )}
        {/* 1~6번째 질문 내용 확인하기 Modal */}
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

        {/* 마지막 질문까지 끝날 때 표시하는 전체 내용 확인 Modal */}
        {isResultModal &&
          !isLoading &&
          result.find((item) => item.field === field.value)?.data &&
          field.order === 7 && (
            <PortalModal>
              <BigModalContainer>
                <ResultModal onRetry={handleResultRetry} onNext={handleNextField} title={"전체 내용 확인하기"}>
                  {result.map((data) => (
                    <div key={data.field} className={styles.field_container}>
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
