"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import SwiperCore from "swiper";
import MainSection from "@/components/MainSection";
import IntroduceService from "@/components/IntroduceService";
import "swiper/css";
import ServicePoint from "@/components/ServicePoint";
import ResumeExample from "@/components/ResumeExample";
import { useRef } from "react";

export default function HomePage() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  // 마지막 페이지에서는 스크롤을 따로 할 수 있게 설정하는 함수
  const handleWheel = (event: React.WheelEvent) => {
    if (swiperRef.current) {
      if (divRef.current) {
        const scrollPosition = divRef.current.scrollTop;
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
  // 전체 section들을 하나의 페이지처럼 표현하기 위한 애니메이션
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
