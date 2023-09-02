"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./ResultResume.module.css";
import { ResultContext } from "@/context/ResultContext";
import makePdf from "@/utils/makePdf";
import Webcam from "react-webcam";
import { imageUpload } from "@/cloudinary/imageUpload";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function ResultResume() {
  const [imageUrl, setImageUrl] = useState(null);
  const printRef = useRef<HTMLDivElement | null>(null);

  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);
  const [isWebcam, setIsWebcam] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const pdf = makePdf(styles.pdf);
  const onPrint = useReactToPrint({
    content: () => {
      if (printRef.current) {
        const printContent = printRef.current;

        // 스케일 조정 스타일 적용
        // printContent.style.transform = "scale(0.7)"; // 원하는 스케일 값으로 변경

        return printContent;
      } else {
        return printRef.current;
      }
    },

    documentTitle: "파일명",
  });
  useEffect(() => {
    async function viewPdf() {
      return await pdf.viewWithPdf();
    }

    if (isResult) {
      if (isPdf) {
        viewPdf();
        setIsPdf(false);
        setIsResult(false);
      } else if (isPrint) {
        onPrint();
        setIsResult(false);
        setIsPrint(false);
      }
    }
  }, [isResult, isPdf]);
  const handlePdf = () => {
    setIsResult(true);
    setIsPdf(true);
  };
  const handlePrint = () => {
    setIsResult(true);
    setIsPrint(true);
  };
  const webcamRef = React.useRef<Webcam | null>(null);
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    const file = new File([imageSrc as string], "cam_picture.jpeg", { type: "image/jpeg" });
    console.log(file);
    const url = await imageUpload(file);
    setImageUrl(url);
    console.log(url);
    setImageUrl(url);
  }, [webcamRef]);
  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const url = await imageUpload(e.target.files[0]);
      console.log(url);
      setImageUrl(url);
    }
    // const url = await imageUpload(e.target.files);
    // console.log(url);
  };

  return (
    <section className={styles.section}>
      <style type="text/css" media="print">
        {"@pdf {size: portrait; margin: 0 0 0 0}"}
      </style>
      <style type="text/css" media="print">
        {"@media print {body {zoom: 60%; page-break-inside: avoid; page-break-after: auto;}}"}
      </style>
      <div className={styles.pdf} ref={printRef}>
        <div className={styles.top_container}>
          <div className={styles.top_content}>
            <h2 className={styles.name}>홍길동</h2>
          </div>
          {imageUrl ? (
            <img src={imageUrl} height={304} width={367} />
          ) : (
            <Image src={"/images/default_picture.svg"} alt="기본 프로필 사진입니다." height={367} width={304} />
          )}
          {!isResult && <button className="w-12 h-6 bg-white ">버튼</button>}
        </div>
      </div>
      {isWebcam && (
        <Webcam
          onUserMedia={(stream) => console.log(stream)}
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
      )}
      <button onClick={capture}>Capture photo</button>
      <button onClick={handlePdf}>pdf 만들기</button>
      <button onClick={handlePrint}>프린트하기</button>
      <input type="file" onChange={addImage} />
    </section>
  );
}
