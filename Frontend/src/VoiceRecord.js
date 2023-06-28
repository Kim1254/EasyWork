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
  const handleSave = async () => {
    const audioFile = new File([recordingBlob], "voice.mp3", { type: "audio/mp3" });
    const formData = new FormData();

    formData.append("audio", audioFile);
    // 해당 formData를 백엔드로 전송 /api/voice (임시)
    // formdata 처리 audioFile 데이터의 이름은 일단 voice.mp3 type은 audio/mp3
    // 성공시 "녹음이 성공하였습니다." alert, 실패시 error ?? "녹음에 실패야였습니다." alert
    await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/api/voice`, {
      method: "POST",
      body: formData,
    })
      .then((_) => alert("녹음이 성공하였습니다."))
      .catch((error) => alert(error ?? "녹음에 실패하였습니다."));
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={handleSave}>check</button>
    </div>
  );
};

export default VoiceRecord;
