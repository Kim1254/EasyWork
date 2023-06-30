import React from "react";

export default function BackgroundContainer({ children, wave = true }) {
  return (
    <section className="fixed -z-20    w-screen h-screen  overflow-hidden bg-[#FDF8EF]">
      {/* https://s.muz.li/ODM2MGYyMzQz */}
      {wave && (
        <div className="absolute -bottom-48 w-screen overflow-hidden -z-10">
          <svg
            width="100%"
            height="100%"
            id="svg"
            viewBox="0 0 1440 490"
            xmlns="http://www.w3.org/2000/svg"
            filter="44"
            className="transition duration-300 ease-in-out delay-150"
          >
            <path
              d="M 0,500 C 0,500 0,250 0,250 C 120.85714285714283,196.89285714285714 241.71428571428567,143.78571428571428 377,165 C 512.2857142857143,186.21428571428572 661.9999999999999,281.75 779,323 C 896.0000000000001,364.25 980.2857142857142,351.2142857142857 1085,330 C 1189.7142857142858,308.7857142857143 1314.857142857143,279.3928571428571 1440,250 C 1440,250 1440,500 1440,500 Z"
              stroke="none"
              strokeWidth="0"
              fill="#7bc278"
              fillOpacity="1"
              className="transition-all duration-300 ease-in-out delay-150 wave blur-md"
            ></path>
          </svg>
        </div>
      )}
      {children}
    </section>
  );
}
