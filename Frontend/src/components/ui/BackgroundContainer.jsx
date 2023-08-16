import React from "react";

export default function BackgroundContainer({ children, wave = true }) {
  return (
    <section className="fixed -z-20    w-screen h-screen  overflow-hidden bg-[#FDF8EF]">
      {/* https://s.muz.li/ODM2MGYyMzQz */}
      {wave && (
        <div className="absolute -bottom-48 w-screen overflow-hidden -z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="2279.734" height="575.97" viewBox="0 0 2279.734 575.97">
            <path
              id="패스_53"
              data-name="패스 53"
              d="M-5952,4394.925s437.173-65.9,739.026,0,406.819,90.347,707.356,109.1,569.352-152.755,569.352-152.755v311.97H-5952Z"
              transform="translate(6084 -4219.269)"
              fill="#7bc278"
              opacity="0.97"
            />
          </svg>
        </div>
      )}
      {children}
    </section>
  );
}
