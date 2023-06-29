import React, { useEffect, useState } from "react";
import BackgroundContainer from "../components/ui/BackgroundContainer";
import FieldInformation from "../components/FieldInfomation";
import ProtalModal from "../components/ui/PortalModal";
import ModalContainer from "../components/ui/ModalContainer";
import VoiceRecord from "../components/VoiceRecord";
import WaitResume from "../components/WaitResume";

export const field_list = [
  "name", //이름
  "birth_place", // 나이생년월일주소
  "phone_number", // 폰넘버
  "career", // 경력
  "certificate", // 자격증,

  "self_intro", // 어떤사람인지
];

const rec_fields = [
  "name", //이름
  "birth", //생년월임
  "place", //주소
  "career", //경력
  "phone_number", //폰넘버
  "certificate", // 자격증,
  "self_intro", // 어떤사람인지
];

export default function HomePage() {
  const [field, setField] = useState(field_list[0]);
  const [prevField, setPrevField] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const prevIndex = field_list.findIndex((item) => item === field) - 1;
    if (prevIndex >= 0) {
      setPrevField(field_list[prevIndex]);
    }
  }, [field]);

  return (
    <>
      {isLoading ? (
        <WaitResume />
      ) : (
        <section className="w-full h-full  flex flex-col items-center justify-center mt-6">
          <FieldInformation field={field} />
          <img className="object-cover mt-[49.03px]" src={"/svg/mic.svg"} width={121.01} height={202.88} />
          <VoiceRecord field={field} setField={setField} setIsLoading={setIsLoading} />
          <div className="mt-[30px] text-[30px]">
            <span className="tracking-[-1.05px] text-[#4C4A4A] ">
              {field_list.findIndex((item) => item === field)}{" "}
            </span>
            <span className="tracking-[-1.05px] text-[#B4B4B4]">/ {field_list.length}</span>
          </div>
        </section>
      )}
    </>
  );
}
