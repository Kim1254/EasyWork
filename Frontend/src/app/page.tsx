"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper as SwiperType } from "swiper/types";
import MainSection from "@/components/MainSection";
import IntroduceService from "@/components/IntroduceService";
import "swiper/css";
import ServicePoint from "@/components/ServicePoint";
import ResumeExample from "@/components/ResumeExample";
import { SyntheticEvent, useState, useEffect, useRef } from "react";

export default function HomePage() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (event: React.WheelEvent) => {
    if (swiperRef.current) {
      if (divRef.current) {
        const scrollPosition = divRef.current.scrollTop;
        console.log("123", scrollPosition, event.deltaY);
        if (event.deltaY < 0) {
          if (scrollPosition === 0) {
            swiperRef.current.mousewheel.enable();
          }
          // swiperRef.current.mousewheel.enable();
        } else if (event.deltaY > 0) {
          // Additional handling if needed
        }
      }
    }
  };

  return (
    <Swiper
      onBeforeInit={(swiper) => (swiperRef.current = swiper)} // ref에 swiper 저장
      preventInteractionOnTransition={false}
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={0}
      modules={[Mousewheel]}
      pagination={{
        clickable: true,
      }}
      mousewheel={{
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true,
      }}
      speed={1000}
      className="mySwiper"
      onReachEnd={(swiper) => {
        swiper.mousewheel.disable();
      }}
    >
      <SwiperSlide className="relative">
        <MainSection />
      </SwiperSlide>
      <SwiperSlide>
        <IntroduceService />
      </SwiperSlide>
      <SwiperSlide>
        <ServicePoint />
      </SwiperSlide>
      <SwiperSlide>
        <div ref={divRef} className="last-slide" onWheel={handleWheel}>
          <ResumeExample />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
