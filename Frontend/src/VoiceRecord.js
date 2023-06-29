import axios from "axios";
import React from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
const VoiceRecord = () => {
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

  // 녹음 submit 핸들러
  const handleSave = async (e) => {
    e.preventDefault();
    const audioFile = new File([recordingBlob], "voice.mp3", { type: "audio/mp3" });
    const formData = new FormData();

    formData.append("audio", audioFile);
    formData.append("text", "text");

    // 해당 formData를 백엔드로 전송 /api/voice (임시)
    // formdata 처리 audioFile 데이터의 이름은 일단 voice.mp3 type은 audio/mp3
    // 성공시 "녹음이 성공하였습니다." alert, 실패시 error ?? "녹음에 실패야였습니다." alert{
    try {
      const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/voice`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.message);
    } catch (err) {
      alert(err ?? "녹음에 실패했습니다.");
    }
  };

  return (
    <>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <form onSubmit={handleSave}>
        <button>check</button>
      </form>
    </>
  );
};

export default VoiceRecord;
