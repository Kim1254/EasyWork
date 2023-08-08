import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    <section className="w-auto h-auto  bg-[#FDF8EF]  items-center text-[#4C4A4A] ">
      <header className="w-full pt-10 px-12 flex items-center justify-between ">
        <Link to="/">
          <img src="/svg/logo.svg" width={70} height={35} aly="쉬운, 이력서" />
        </Link>
        <Link to={"/"} className="font-extrabold text-xl">
          돌아가기
        </Link>
      </header>
      <div id="resume" className="mx-12 relative">
        <h1 className="pt-20 tracking-[50px] text-6xl font-extrabold text-center">이력서</h1>
        <div className=" border-y-2 border-black  p-12 flex flex-col gap-[72px] mt-20">
          <div className="flex items-center ">
            <div className="basis-1/5 text-[20px]">이름</div>
            <div className="text-[24px] basis-4/5 font-bold">
              {data.name.trim() === "" ? "" : JSON.parse(data.name.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
          <div className="flex items-center ">
            <div className="basis-1/5 text-[20px]">연락처</div>
            <div className="text-[24px] basis-4/5 font-bold">
              {data.phone_number.trim() === "" ? "" : JSON.parse(data.phone_number.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
          <div className="flex items-center ">
            <div className="basis-1/5 text-[20px]">주소</div>
            <div className="text-[24px] basis-4/5 font-bold">
              {data.place.trim() === "" ? "" : JSON.parse(data.place.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
          <div className="flex items-center ">
            <div className="basis-1/5 text-[20px]">생년월일</div>
            <div className="text-[24px] basis-4/5 font-bold">
              {data.birth.trim() === "" ? "" : JSON.parse(data.birth.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
        </div>
        <div className=" border-y-2 border-black px-12 py-12 flex flex-col gap-[72px] ">
          <div className="flex items-center ">
            <div className="basis-1/5 text-[20px]">학력·경력</div>
            <div className="text-[24px] basis-4/5 font-bold">
              {data.career.trim() === "" ? "" : JSON.parse(data.career.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
        </div>
        <div className=" border-y-2 border-black px-12 py-12 flex flex-col gap-[72px]">
          <div className="flex items-center ">
            <div className="basis-1/5 text-[20px]">자격증</div>
            <div className="text-[24px] basis-4/5 font-bold">
              {data.certificate.trim() === "" ? "" : JSON.parse(data.certificate.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
        </div>
        <div className=" border-y-2 border-black px-12 py-12 flex flex-col gap-[72px]">
          <div className="flex items-center ">
            <div className="basis-1/5 text-[20px]">자기소개</div>
            <div className="text-[24px] basis-4/5 font-bold">
              {data.self_intro.trim() === "" ? "" : JSON.parse(data.self_intro.replaceAll("'", '"')).result ?? ""}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-20 py-24 flex items-center justify-between">
        <button className="px-[38px] py-[29px] text-[35px] font-bold rounded-full bg-[#EEE8DA]">수정하기</button>
        <div className="flex items-center gap-[60px] ">
          <button
            className="px-[38px] py-[29px] text-[35px] font-bold rounded-full bg-[#EEE8DA]"
            onClick={() => {
              window.print();
            }}
          >
            인쇄하기
          </button>
          <button className="px-[38px] py-[29px] text-[35px] font-bold rounded-full bg-[#EEE8DA]">
            PDF로 저장하기
          </button>
        </div>
      </div>
    </section>
  );
}
