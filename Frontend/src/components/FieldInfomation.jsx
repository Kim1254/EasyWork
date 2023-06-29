import { useEffect, useState } from "react";
import InfoModal from "./ui/InfoModal";
import PortalModal from "./ui/PortalModal";
import ModalContainer from "./ui/ModalContainer";

const BIG_FONT_STYLE = "text-[55px] tracking-[0px] text-[#4C4A4A] font-extrabold";
const HILIGHt_FONT_STYLE = "bg-[#7BC278] text-[#FDF8EF] px-[12px] py-[4px]";
const field_list = [
  {
    field: "name",
    element: (
      <>
        <div className=" text-center tracking-[-1.23px] text-[35px]">안녕하세요!</div>
        <div className={`${BIG_FONT_STYLE} mt-[14.78px]`}>
          <span className={`${HILIGHt_FONT_STYLE}`}>이름</span>을 알려주세요!
        </div>
      </>
    ),
  },
  {
    field: "birth_place",
    element: (
      <>
        <div className={`${BIG_FONT_STYLE} `}>
          <span className={`${HILIGHt_FONT_STYLE}`}>주소</span>와
          <span className={`${HILIGHt_FONT_STYLE}`}>생년월일</span>을 알려주세요!
        </div>
      </>
    ),
  },
  {
    field: "phone_number",
    element: (
      <>
        <div className={`${BIG_FONT_STYLE} `}>
          <span className={`${HILIGHt_FONT_STYLE}`}>연락처</span>를 알려주세요!
        </div>
      </>
    ),
  },
  {
    field: "career",
    element: (
      <div className={`${BIG_FONT_STYLE} `}>
        그동안 경험해 보신 <span className={`${HILIGHt_FONT_STYLE}`}>일자리</span>가 있으실까요?
      </div>
    ),
  },
  {
    field: "certificate",
    element: (
      <div className={`${BIG_FONT_STYLE} `}>
        가지고 계신 <span className={`${HILIGHt_FONT_STYLE}`}>자격증</span>이 있다면 말씀해주세요!
      </div>
    ),
  },
  {
    field: "self_intro",
    element: (
      <div className={`${BIG_FONT_STYLE}`}>
        마지막으로, 본인이 <span className={`${HILIGHt_FONT_STYLE}`}>어떤 사람인지 자유롭게 말씀해주세요!</span>
      </div>
    ),
  },
];

export default function FieldInformation({ field }) {
  console.log(field);
  const [showModal, setShowModal] = useState(true);
  const currentField = field_list[field_list.findIndex((fieldObj) => fieldObj.field === field) ?? 0];

  return (
    <>
      {showModal && field === "name" && (
        <PortalModal>
          <ModalContainer handleClose={() => setShowModal(false)}>
            <InfoModal fieldElement={currentField.element} />
          </ModalContainer>
        </PortalModal>
      )}

      <div>{currentField.element}</div>
    </>
  );
}
