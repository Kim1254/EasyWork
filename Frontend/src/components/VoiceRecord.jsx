import axios from "axios";
import React, { useCallback, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { field_list } from "../pages/HomePage";
const VoiceRecord = React.memo(({ field, setField }) => {
  // 녹화 시작, 일시 정지, 종료시 이벤트 핸들러 함수
  // 상태와 녹화시간 또한 확인 가능
  // 해당 라이브러리 react-audio-voice-recorder(https://www.npmjs.com/package/react-audio-voice-recorder) MIT LICENCE
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();
  const [audio, setAudio] = useState([]);
  console.log(123);
  // 녹음 submit 핸들러
  const handleSave = async (e) => {
    e.preventDefault();
    stopRecording();
    console.log(213);
    const audioFile = new File([recordingBlob], `${field}.mp3`, { type: "audio/mp3" });

    // 해당 formData를 백엔드로 전송 /api/voice (임시)
    // formdata 처리 audioFile 데이터의 이름은 일단 voice.mp3 type은 audio/mp3
    // 성공시 "녹음이 성공하였습니다." alert, 실패시 error ?? "녹음에 실패야였습니다." alert{
    if (field_list[field_list.length - 1] === field && audio.length === 4) {
      try {
        const formData = new FormData();
        formData.append(field, audioFile);
        const result = await axios.post(`http://localhost:8000/api/voice`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(result || result.message);
      } catch (err) {
        alert(err ?? "녹음에 실패했습니다.");
      }
    } else {
      console.log("123");
      setAudio((prev) => [...prev, { field, audioFile }]);
      setField(field_list[field_list.findIndex((item) => item === field) + 1]);
      return;
    }
  };

  return (
    <>
      <form
        onSubmit={handleSave}
        className="h-[68px] mt-[34.64px] w-[323px] rounded-full bg-[#EEE8DA] border-none flex items-center justify-center"
      >
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

            <button type="submit">
              <img width={44} height={44} src={"/svg/audio-submit.svg"} alt="audio submit" />
            </button>
          </>
        )}
      </form>
    </>
  );
});

export default VoiceRecord;
