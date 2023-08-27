"use client";
import AnswerRecord from "@/components/AnswerRecord";

import { field_list } from "@/utils/FieldList/FiledList";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ResumePage() {
  const searchParams = useSearchParams();
  const initailField = searchParams.get("initial") ?? field_list[0];
  return (
    <>
      <AnswerRecord />
      {/* <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio src={mediaBlobUrl} controls autoPlay loop /> */}
    </>
  );
}
