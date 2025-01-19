import React, { useEffect, useRef, useState } from "react";
import heroVideo1 from "../assets/heroVideo1.mp4";
import "../index.css";
import RotatedBtn from "./RotatedBtn";

const Hero = () => {
  const sectionArr = ["Write. Share.", "Inspire."];
  const [currentSection, setCurrentSection] = useState(0);
  const [highlightProgress, setHighlightProgress] = useState(0);
  const containerRef = useRef(null);
  // const sectionArr = section.split(" ");
  console.log(sectionArr);
  const handleScroll = (e) => {
    e.preventDefault();
    const scrollPosition = window.scrollY + window.innerHeight;
    const containerHeight = containerRef.current.offsetHeight;
    console.log(scrollPosition, containerHeight);
    const progress = (scrollPosition / containerHeight) * sectionArr.length;
    setHighlightProgress(() => Math.floor(progress));
    console.log("progress ....", progress);
  };

  return (
    <section>
      <div className="w-[100%] flex flex-wrap md:flex-nowrap  overflow-clip custom-height">
        <div className="h-full md:w-[60%] my-auto">
          <figure
            className=" p-2 md:p-0 my-auto 2xl:ms-20 relative h-[100vh] w-[100vw]"
            onWheel={handleScroll}
            ref={containerRef}
          >
            <video
              src={heroVideo1}
              muted
              autoPlay
              playsInline
              loop
              className="h-[100%] w-[100%] fixed top-0 left-0 overflow-hidden object-cover -z-40 transform translate-x-0 translate-y-0"
            ></video>
            <div className="text-center absolute top-16 left-0 bg-transparent text-7xl text-slate-500 justify-center font-extrabold h-full w-full flex flex-col p-8">
              <div
                className={`h-1/3 w-full ${
                  highlightProgress >= 1
                    ? "text-white  transition-all opacity-100 duration-500 ease-in-out"
                    : "text-slate-500 transition-all opacity-70 duration-500 ease-in-out"
                } `}
              >
                Write. Share.{" "}
              </div>
              {/* <div className="h-1/3 w-full">Share.</div> */}

              <div
                className={`h-1/3 w-full custom-hero-tag text-9xl ${
                  highlightProgress >= 1.5
                    ? "text-[#21decb] transition-all opacity-100 duration-500 ease-in-out"
                    : "text-slate-500 transition-all opacity-70 duration-500 ease-in-out"
                }`}
              >
                Inspire.
              </div>
              <div className="relative w-full mt-2 h-16 bg-transparent text-lg text-white flex items-center justify-center">
                <RotatedBtn text={"CREATE NEW BLOG"} />
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
