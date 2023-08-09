import axios from "axios";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { field_list } from "../pages/HomePage";
import { useNavigate } from "react-router-dom";
import WaitResume from "./WaitResume";
const VoiceRecord = React.memo(({ field, setField, setIsLoading }) => {
  // 녹화 시작, 일시 정지, 종료시 이벤트 핸들러 함수
  // 상태와 녹화시간 또한 확인 가능
  // 해당 라이브러리 react-audio-voice-recorder(https://www.npmjs.com/package/react-audio-voice-recorder) MIT LICENCE
  const { startRecording, stopRecording, togglePauseResume, recordingBlob, isRecording, isPaused, recordingTime } =
    useAudioRecorder();
  const [audio, setAudio] = useState([]);
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let handler;
    if (notification) {
      handler = () =>
        setTimeout(() => {
          setNotification(false);
        }, 1500);
      handler();
    }
    return clearTimeout(handler);
  }, [notification]);
  const handleSave = async () => {
    stopRecording();

    const audioFile = new File([recordingBlob], `${field}.mp3`, { type: "audio/mp3" });

    // 해당 formData를 백엔드로 전송 /api/voice (임시)
    // formdata 처리 audioFile 데이터의 이름은 일단 voice.mp3 type은 audio/mp3
    // 성공시 "녹음이 성공하였습니다." alert, 실패시 error ?? "녹음에 실패하였습니다." alert{
    if (field_list[field_list.length - 1] === field && audio.length === 5) {
      setIsLoading(true);
      const formData = new FormData();
      for (const file of audio) {
        formData.append(file.field, file.audioFile);
      }

      formData.append(field, audioFile);

      axios
        .post(`http://localhost:8000/api/voice`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setIsLoading(false);
          setNotification(true);
          return navigate("/resume", { state: { ...res.data } });
        })
        .catch(() => {
          setIsLoading(false);

          return navigate("/error");
        });
    } else {
      setAudio((prev) => [...prev, { field, audioFile }]);
      setNotification(true);
      setField(field_list[field_list.findIndex((item) => item === field) + 1]);
      return;
    }
  };

  useEffect(() => {
    if (recordingBlob) {
      console.log(recordingBlob);
      handleSave().then((res) => console.log(123));
    }
  }, [recordingBlob]);

  return (
    <>
      <form className="h-[68px] mt-[34.64px] w-[323px] rounded-full bg-[#EEE8DA] border-none flex items-center justify-center">
        {recordingTime === 0 ? (
          <img
            width={44}
            height={44}
            src={"/svg/record.svg"}
            onClick={startRecording}
            alt="record"
            className={`object-cover`}
          />
        ) : (
          <>
            <button disabled={isPaused === true} onClick={togglePauseResume}>
              <img
                width={39.98}
                height={44.26}
                src={"/svg/play.svg"}
                alt="play"
                className="object-cover mr-[49.52px] "
              />
            </button>

            {isPaused && (
              <img
                width={44}
                height={44}
                src={"/svg/record.svg"}
                onClick={togglePauseResume}
                alt="record"
                className="relative object-cover mr-[51.5px]"
              />
            )}
            {isRecording && !isPaused && (
              <img
                width={44}
                height={44}
                alt="pause"
                src="/svg/pause.svg"
                onClick={togglePauseResume}
                className="object-cover mr-[51.5px]"
              />
            )}

            <button onClick={stopRecording}>
              <img width={44} height={44} src={"/svg/audio-submit.svg"} alt="audio submit" />
            </button>
          </>
        )}
      </form>
      {notification && (
        <div className="mt-[70px] bg-[#8F8E8E] rounded-[29px] text-white px-[26px] py-[12px] ">
          말한 내용이 저장되었어요!
        </div>
      )}
      {field !== "name" && !notification && (
        <div className="mt-[70px] text-[30px]">
          <span className="tracking-[-1.05px] text-[#4C4A4A] ">{field_list.findIndex((item) => item === field)} </span>
          <span className="tracking-[-1.05px] text-[#B4B4B4]">/ {field_list.length - 1}</span>
        </div>
      )}
    </>
  );
});

export default VoiceRecord;
