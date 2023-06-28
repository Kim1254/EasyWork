import React, { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
const VoiceRecord = () => {
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

  useEffect(() => {
    if (!recordingBlob) return;

    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob]);

  const handleSave = async () => {
    const audioFile = new File([recordingBlob], "voice.mp3", { type: "audio/mp3" });
    const formData = new FormData(); // preparing to send to the server

    formData.append("file", audioFile);
    formData.append("text", "text");
    await fetch("http://localhost:8080/api/voice", {
      method: "POST",
      body: formData,
    });
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
