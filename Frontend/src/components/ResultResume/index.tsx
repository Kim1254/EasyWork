"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./ResultResume.module.css";
import { ResultContext } from "@/context/ResultContext";
import makePdf from "@/utils/makePdf";
import Webcam from "react-webcam";
import { imageUpload } from "@/cloudinary/imageUpload";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function ResultResume() {
  const [imageUrl, setImageUrl] = useState(null);
  const printRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);
  if (result.length < 7) {
    router.replace("/resume");
  }
  const resultObject: { [key: string]: string } = {};

  result.forEach(function (item) {
    resultObject[item.field] = item.data;
  });
  console.log(resultObject);
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
            <h2 className={styles.name}>{resultObject.name}</h2>
            <div className={styles.contact_container}>
              <div className={styles.contact}>
                <div className={styles.contact_title}>주 소</div>: {resultObject.place}
              </div>
              <div className={styles.contact}>
                <div className={styles.contact_title}>생년월일</div>: {resultObject.birth}
              </div>
              <div className={styles.contact}>
                <div className={styles.contact_title}>연 락 처</div>: {resultObject.phone_number}
              </div>
            </div>
          </div>

          <div className={styles.image_container}>
            {imageUrl ? (
              <Image
                alt="이력서 사진입니다."
                className="object-cover w-full h-full"
                src={imageUrl}
                height={274}
                width={227}
              />
            ) : isWebcam ? (
              <Webcam
                audio={false}
                height={276}
                screenshotFormat="image/jpeg"
                width={224}
                ref={webcamRef}
                videoConstraints={videoConstraints}
              />
            ) : (
              <Image src={"/images/default_picture.svg"} alt="기본 프로필 사진입니다." height={274} width={227} />
            )}
            {(!imageUrl && !isWebcam) ||
              (!isResult && (
                <div className={styles.camera_container}>
                  <button className={styles.camera_button} onClick={() => fileRef.current?.click()}>
                    <input type="file" onChange={addImage} ref={fileRef} className="hidden" />
                    사진 첨부하기
                  </button>

                  <button onClick={capture} className={styles.camera_button}>
                    캠으로 촬영하기
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.introduce}>안녕하세요. {resultObject.name} 입니다.</div>
        <div className={styles.bar}></div>
        <div className={styles.content}>
          <div className={styles.content_title}>경력</div>
          <div>{resultObject.career}</div>
        </div>
        <div className={styles.bar}></div>
        <div className={styles.content}>
          <div className={styles.content_title}>자격증</div>
          <div>{resultObject.certificate}</div>
        </div>
        <div className={styles.bar}></div>
        <div className={styles.content}>
          <div className={styles.content_title}>기타</div>
          <div>{resultObject.self_intro}</div>
        </div>
        {result.length > 7 && (
          <>
            <div className={styles.bar}></div>
            <div className={styles.content}>
              <div className={styles.content_title}>{result[result.length - 1].field}</div>
              <div>{result[result.length - 1].data}</div>
            </div>
          </>
        )}
        <div className={styles.bar}></div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.print_container}>
          <button onClick={handlePrint} className={styles.print_button}>
            <span>인쇄하기</span>
            <Image src={"/images/arrow.svg"} alt="화살표" width={12} height={20} />
          </button>
          <button onClick={handlePdf} className={styles.print_button}>
            <span>PDF로 저장하기</span>
            <Image src={"/images/arrow.svg"} alt="화살표" width={12} height={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
