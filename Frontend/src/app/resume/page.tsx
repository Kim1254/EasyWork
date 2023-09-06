"use client";
import AnswerRecord from "@/components/AnswerRecord";
import ResultResume from "@/components/ResultResume";
import { useSearchParams } from "next/navigation";
import React from "react";

// 이력서 작성과 결과 페이지
export default function ResumePage() {
  const searchParams = useSearchParams();
  // searchParams로 구분
  // 현재 db가 없기때문에 한 페이지로 사용
  const page = searchParams.get("page") ?? "answer";
  return (
    <>
      {page === "answer" && <AnswerRecord />}
      {page === "result" && <ResultResume />}
    </>
  );
}
