"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import { DotProps } from "react-multi-carousel/lib/types";
import "react-multi-carousel/lib/styles.css";
import styles from "./CarouselContainer.module.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

type Props = {
  children: React.ReactNode;
};

export default function CarouselContainer({ children }: Props) {
  const CustomDot = ({ onClick, ...rest }: DotProps) => {
    const { index, active } = rest;

    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return <button className={active ? styles.dot_active : styles.dot} onClick={onClick}></button>;
  };

  return (
    <Carousel
      containerClass={styles.container}
      showDots
      dotListClass={styles.dot_list}
      itemClass={styles.item}
      customDot={<CustomDot />}
      arrows={false}
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
}
