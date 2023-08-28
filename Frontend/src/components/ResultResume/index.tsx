"use client";
import React, { useContext, useState } from "react";
import styles from "./ResultResume.module.css";
import { ResultContext } from "@/context/ResultContext";
import makePdf from "@/utils/makePdf";
import Webcam from "react-webcam";
import { imageUpload } from "@/cloudinary/imageUpload";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default async function ResultResume() {
  const [imageUrl, setImageUrl] = useState(null);
  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);
  const pdf = makePdf(styles.pdf);
  const handlePdf = async () => {
    await pdf.viewWithPdf();
  };
  const webcamRef = React.useRef<Webcam | null>(null);
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    const url = await imageUpload(imageSrc);
    setImageUrl(url);
  }, [webcamRef]);
  return (
    <section className={styles.section}>
      <div className={styles.pdf}></div>
      <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      <button onClick={handlePdf}>pdf 만들기</button>
    </section>
  );
}
