import React from "react";
import waveImage from "/images/wave.png"; // Adjust the path

const Wave = ({ animationDuration, zIndex, opacity, delay, bottom, reverse }) => {
  return (
    <div
      className="absolute left-0 w-full h-[90px] bg-cover bg-repeat-x"
      style={{
        backgroundImage: `url(${waveImage})`,
        backgroundSize: "1000px 90px",
        bottom: bottom,
        zIndex: zIndex,
        opacity: opacity,
        animation: `waveAnimation ${animationDuration} linear infinite`,
        animationDelay: delay,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    ></div>
  );
};

export default Wave;
