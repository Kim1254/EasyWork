import React from "react";
import { PulseLoader } from "react-spinners";
export default function WaitResume() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className={`text-[55px] tracking-[0px] text-[#4C4A4A] font-extrabold mt-[14.78]`}>
        이력서를 <span className={`bg-[#7BC278] text-[#FDF8EF] px-[12px] py-[4px]`}>만들고</span> 있어요!
      </div>
      <div className="text-center tracking-[-1.23px] text-[35px]">잠시만 기다려주세요.</div>
      <PulseLoader className="mt-[63px] " size={30} margin={18} color="#FFCC42" />
    </section>
  );
}
