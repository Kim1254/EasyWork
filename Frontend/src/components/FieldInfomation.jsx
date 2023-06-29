import { useState } from "react";
import InfoModal from "./ui/InfoModal";
import PortalModal from "./ui/PortalModal";
import ModalContainer from "./ui/ModalContainer";
import InformationText from "./ui/InformationText";

const BIG_FONT_STYLE = "text-[55px] tracking-[0px] text-[#4C4A4A] font-extrabold";
const HILIGHt_FONT_STYLE = "bg-[#7BC278] text-[#FDF8EF]";
const field_list = [
  {
    field: "name",
    element: (
      <>
        <div className="mt-[301.22px] text-center tracking-[-1.23px] text-[35px]">안녕하세요!</div>
        <InformationText hightlightText="이름" text="을 알려주세요!" />
      </>
    ),
  },
  {
    field: "birth_place",
    element: <InformationText hightlightText="나이, 생년월일, 주소" text="를 알려주세요!" className="mt-[344px]" />,
  },
  {
    field: "career",
    element: (
      <InformationText hightlightText="그동안 경혐해 보신 일자리" text="가 있으실까요?" className="mt-[344px]" />
    ),
  },
  {
    field: "certificate",
    element: (
      <InformationText hightlightText="가지고 계신 자격증" text="이 있다면 말씀해주세요!" className="mt-[344px]" />
    ),
  },
  {
    field: "self_intro",
    element: (
      <InformationText
        hightlightText="어떤사람인지 자유롭게 말씀해주세요"
        text="마지막으로, 본인이 "
        reverse={true}
        className={"mt-[344px]"}
      />
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
