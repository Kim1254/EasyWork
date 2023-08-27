"use client";
import AnswerRecord from "@/components/AnswerRecord";
import OtherRecord from "@/components/OtherRecord";

import { field_list } from "@/utils/FieldList/FiledList";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ResumePage() {
  const searchParams = useSearchParams();
  const initailField = searchParams.get("initial") ?? field_list[0];
  const page = searchParams.get("page") ?? "answer";
  return (
    <>
      {page === "answer" && <AnswerRecord />}
      {page === "other" && <OtherRecord />}

      {/* <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio src={mediaBlobUrl} controls autoPlay loop /> */}
    </>
  );
}
