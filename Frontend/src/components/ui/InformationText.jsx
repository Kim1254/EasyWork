import React from "react";

const BIG_FONT_STYLE = "text-[55px] tracking-[0px] text-[#4C4A4A] font-extrabold";
const HILIGHt_FONT_STYLE = "bg-[#7BC278] text-[#FDF8EF]";

export default function InformationText({ hightlightText, text, className, reverse }) {
  return (
    <div className={`${BIG_FONT_STYLE} ${className}`}>
      {reverse ? (
        <>
          {text}
          <span className={HILIGHt_FONT_STYLE}>{hightlightText}</span>
        </>
      ) : (
        <>
          <span className={HILIGHt_FONT_STYLE}>{hightlightText}</span>
          {text}
        </>
      )}
    </div>
  );
}
