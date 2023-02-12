import React, { useState, useEffect } from "react";

const Slider = () => {
  const [width, setWidth] = useState(50);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  return (
    <div className="flex items-center mx-auto">
      <div
        className="h-12 w-full bg-red-500 mt-4"
        style={{
          //   width: `${Math.ceil(50)}%`,
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        {Math.ceil((useWindowDimensions().width * 50) / 1440)}% ratio for half
        or
        {(useWindowDimensions().width * 100) / 1440}% ratio of total or absolute
        width
        {useWindowDimensions().width}
      </div>
    </div>
  );
};

export default Slider;
