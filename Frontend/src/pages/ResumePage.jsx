import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResumePage() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  if (!data || Object.keys(data).length === 0) {
    alert("먼저 여러분의 이야기를 들려주세요!");
    return navigate("/");
  }
  console.log(data);
  return (
    <section className="w-full h-full mx-20 overflow-auto items-center text-[#4C4A4A] ">
      <div id="resume">
        <h1 className="mt-[308px] tracking-[116px] text-[93px] font-extrabold text-center">이력서</h1>
        <div className=" border-y-2 border-black px-12 py-12 flex flex-col gap-[72px] mt-20">
          <div className="flex items-center ">
            <div className="basis-1/4 text-[30px]">이름</div>
            <div className="text-[34px] font-bold">
              {data.name.trim() === "" ? "" : JSON.parse(data.name.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
          <div className="flex items-center ">
            <div className="basis-1/4 text-[30px]">연락처</div>
            <div className="text-[34px] font-bold">
              {data.phone_number.trim() === "" ? "" : JSON.parse(data.phone_number.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
          <div className="flex items-center ">
            <div className="basis-1/4 text-[30px]">주소</div>
            <div className="text-[34px] font-bold">
              {data.place.trim() === "" ? "" : JSON.parse(data.place.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
          <div className="flex items-center ">
            <div className="basis-1/4 text-[30px]">생년월일</div>
            <div className="text-[34px] font-bold">
              {data.birth.trim() === "" ? "" : JSON.parse(data.birth.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
        </div>
        <div className=" border-y-2 border-black px-12 py-12 flex flex-col gap-[72px] ">
          <div className="flex items-center ">
            <div className="basis-1/4 text-[30px]">학력·경력</div>
            <div className="text-[34px] font-bold">
              {data.career.trim() === "" ? "" : JSON.parse(data.career.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
        </div>
        <div className=" border-y-2 border-black px-12 py-12 flex flex-col gap-[72px]">
          <div className="flex items-center ">
            <div className="basis-1/4 text-[30px]">자격증</div>
            <div className="text-[34px] font-bold">
              {data.certificate.trim() === "" ? "" : JSON.parse(data.certificate.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
        </div>
        <div className=" border-y-2 border-black px-12 py-12 flex flex-col gap-[72px]">
          <div className="flex items-center ">
            <div className="basis-1/4 text-[30px]">자기소개</div>
            <div className="text-[34px] font-bold">
              {data.self_intro.trim() === "" ? "" : JSON.parse(data.self_intro.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 flex items-center justify-between">
        <button className="px-[38px] py-[29px] text-[35px] font-bold rounded-full bg-[#EEE8DA]">수정하기</button>
        <div className="flex items-center gap-[60px] ">
          <button className="px-[38px] py-[29px] text-[35px] font-bold rounded-full bg-[#EEE8DA]">인쇄하기</button>
          <button className="px-[38px] py-[29px] text-[35px] font-bold rounded-full bg-[#EEE8DA]">
            PDF로 저장하기
          </button>
        </div>
      </div>
    </section>
  );
}
