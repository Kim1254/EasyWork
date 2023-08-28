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

export default function ResultResume() {
  const [imageUrl, setImageUrl] = useState(null);
  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);
  const [isWebcam, setIsWebcam] = useState(false);
  const pdf = makePdf(styles.pdf);
  const handlePdf = async () => {
    await pdf.viewWithPdf();
  };
  const webcamRef = React.useRef<Webcam | null>(null);
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    const file = new File([imageSrc as string], "cam_picture.jpeg", { type: "image/jpeg" });
    console.log(file);

    const url = await imageUpload(file);
    setImageUrl(url);
    console.log(url);
  }, [webcamRef]);
  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
    }
    // const url = await imageUpload(e.target.files);
    // console.log(url);
  };
  return (
    <section className={styles.section}>
      <div className={styles.pdf}></div>
      {isWebcam && (
        <Webcam
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
      <input type="file" onChange={addImage} />
    </section>
  );
}
