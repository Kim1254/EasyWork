import React from "react";

export default function ErrorPage() {
  return (
    <section className="w-full h-full flex flex-col items-center ">
      <div className={`text-[55px] tracking-[0px] text-[#4C4A4A] mt-[310px] font-extrabold `}>
        정보가 제대로 <span className={`bg-[#7BC278] text-[#FDF8EF] py-[12px] px-[4px]`}>입력되지 않았어요.</span>
      </div>

      <div className="text-center tracking-[-1.23px] text-[35px] mt-[15px]">
        더 많은 이야기와 정확한 발음으로 말해주세요.
      </div>
      <img className="object-cover mt-[49.03px]" src={"/svg/mic.svg"} width={121.01} height={202.88} />
      <div className="h-[68px] mt-[34.64px] w-[323px] rounded-full bg-[#EEE8DA] border-none flex items-center justify-center">
        <img width={39.98} height={44.26} src={"/svg/play.svg"} alt="play" className="object-cover mr-[49.52px] " />
        <img
          width={44}
          height={44}
          src={"/svg/record.svg"}
          alt="record"
          className="relative object-cover mr-[51.5px]"
        />
        <img width={44} height={44} src={"/svg/audio-submit.svg"} alt="audio submit" />
      </div>
    </section>
  );
}
