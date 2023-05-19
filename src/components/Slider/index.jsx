import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useRef } from "react";

function Slider({
  children,
  autoPlaySpeed = 1500,
  autoPlay = false,
  superLargeDesktop = 5,
  desktop = 4,
  tablet = 3,
  mobile = 1,
  dot = false,
}) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2500 },
      items: superLargeDesktop,
    },
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
      items: desktop,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: tablet,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: mobile,
    },
  };

  const CustomDot = ({
    onClick,
    index,
    active,
    carouselState: { currentSlide, deviceType },
  }) => {
    const carouselItems = [children];

    const handleClick = () => {
      onClick();
    };

    return (
      <div
        className={`cursor-pointer  ${
          active ? "active" : "inactive"
        } border-2 rounded-2xl relative shadow-xl m-2 `}
        style={{
          width: "10rem",
          backgroundColor: "#f5f5f5",
        }}
        onClick={handleClick}
      >
        {React.Children.toArray(carouselItems)[index]}
      </div>
    );
  };

  return (
    <>
      <div className="relative">
        <Carousel
          customDot={<CustomDot />}
          responsive={responsive}
          autoPlay={autoPlay}
          autoPlaySpeed={autoPlaySpeed}
          showDots={dot}
          renderDotsOutside={true}
        >
          {children}
        </Carousel>
      </div>
    </>
  );
}

export default Slider;
