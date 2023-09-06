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
  width: 224,
  height: 276,
  facingMode: "user",
};

export default function ResultResume() {
  const [isWebcam, setIsWebcam] = useState(false);

  // 해당 상태는 pdf로 저장하기 혹은 인쇄하기 클릭 시 이력서 영역 안에 있는 버튼을 일시적으로 없애기 위해 필요
  const [isResult, setIsResult] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const printRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const webcamRef = React.useRef<Webcam | null>(null);

  const router = useRouter();

  // 질문 결과 state
  const {
    state: { result },
    dispatch,
  } = useContext(ResultContext);

  //result가 7개 미만일 시 이력서 질문 페이지로 롤백
  if (result.length < 7) {
    router.replace("/resume");
  }

  // Array형태의 result를 Object형태로 변환
  const resultObject: { [key: string]: string } = {};

  result.forEach(function (item) {
    resultObject[item.field] = item.data;
  });

  // pdf 생성
  const pdf = makePdf(styles.pdf);

  // 선택한 부분을 프린트할 수 있게 하는 함수
  const onPrint = useReactToPrint({
    content: () => {
      if (printRef.current) {
        const printContent = printRef.current;
        return printContent;
      } else {
        return printRef.current;
      }
    },

    documentTitle: "파일명",
  });

  // 인쇄하기, PDF로 저장하기 클릭 후 해당 pdf 혹은 프린트할 수 있게 작업
  useEffect(() => {
    // 생성된 pdf를 볼 수 있게하는 함수
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
  }, [isResult, isPdf, isPrint]);

  // pdf로 저장하기 클릭 시 실행되는 함수
  const handlePdf = () => {
    setIsResult(true);
    setIsPdf(true);
  };

  // 인쇄하기 클릭 시 실행되는 함수
  const handlePrint = () => {
    setIsResult(true);
    setIsPrint(true);
  };

  // 캠으로 촬영하기 클릭시 실행되는 함수
  const handleWebcam = () => {
    // 웹캠이 있는지 확인
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // 성공적으로 스트림을 얻었으므로 웹캠이 있다고 간주
        setIsWebcam(true);
        // 스트림 사용이 끝나면 해제
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((error) => {
        // 사용자가 권한을 거부하거나 웹캠을 사용할 수 없음
        setIsWebcam(false);
      });
  };

  // 캡처하기 클릭 시 실행
  const handleCapture = React.useCallback(async () => {
    // imageSrc 추출
    const imageSrc = webcamRef.current?.getScreenshot();
    const file = new File([imageSrc as string], "cam_picture.jpg", { type: "image/jpg" });
    // 클라우드에 저장 후 해당 url 받아오기
    const url = await imageUpload(file);
    setImageUrl(url);

    setIsWebcam(false);
  }, [webcamRef]);

  // 사진 첨부하기 클릭 시 실행
  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // 이미지 파일을 클라우드에 저장 후 해당 url 받아오기
      const url = await imageUpload(e.target.files[0]);
      console.log(url);
      setImageUrl(url);
    }
  };

  return (
    <section className={styles.section}>
      {/* pdf 관련 css 조정 */}
      <style type="text/css" media="print">
        {"@pdf {size: portrait; margin: 0 0 0 0}"}
      </style>
      <style type="text/css" media="print">
        {"@media print {body {zoom: 60%; page-break-inside: avoid; page-break-after: auto;}}"}
      </style>
      {/* pdf 혹은 print할 때 표시되는 부분  */}
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
            {/* image Url이 있을 시 사진 표시 */}
            {imageUrl ? (
              <Image
                alt="이력서 사진입니다."
                className="object-cover w-full h-full"
                src={imageUrl}
                height={274}
                width={227}
              />
            ) : // imageUrl이 없을때 WebCam을 킨 상태면 웹캠 표시 없을시에는 기본 이미지 표시
            isWebcam ? (
              <Webcam
                audio={false}
                height={276}
                minScreenshotHeight={276}
                screenshotFormat="image/png"
                width={224}
                ref={webcamRef}
                videoConstraints={videoConstraints}
              />
            ) : (
              <Image src={"/images/default_picture.svg"} alt="기본 프로필 사진입니다." height={274} width={227} />
            )}

            {/* imageUrl이 없고 webcam이 켜지지 않았을 때 표시 */}
            {!imageUrl && !isWebcam && !isResult && (
              <div className={styles.camera_container}>
                <button className={styles.camera_button} onClick={() => fileRef.current?.click()}>
                  <input tabIndex={1} type="file" onChange={handleAddImage} ref={fileRef} className="hidden" />
                  사진 첨부하기
                </button>

                <button tabIndex={2} onClick={handleWebcam} className={styles.camera_button}>
                  캠으로 촬영하기
                </button>
              </div>
            )}

            {/* webcam이 켜진 상태에서 캡처할 것인지 취소할 것인지 묻는 UI */}
            {isWebcam && (
              <div className={styles.webcam_container}>
                <button tabIndex={1} className={styles.camera_button} onClick={handleCapture}>
                  캡처하기
                </button>
                <button tabIndex={2} onClick={() => setIsWebcam(false)} className={styles.camera_button}>
                  취소하기
                </button>
              </div>
            )}
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
          <div className={styles.content_title}>자기소개</div>
          <div>{resultObject.self_intro}</div>
        </div>

        <div className={styles.bar}></div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.print_container}>
          <button tabIndex={3} onClick={handlePrint} className={styles.print_button}>
            <span>인쇄하기</span>
            <Image src={"/images/arrow.svg"} alt="화살표" width={12} height={20} />
          </button>
          <button tabIndex={4} onClick={handlePdf} className={styles.print_button}>
            <span>PDF로 저장하기</span>
            <Image src={"/images/arrow.svg"} alt="화살표" width={12} height={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
