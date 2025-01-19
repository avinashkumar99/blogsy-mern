import { Button } from "@mui/material";
import React, { useEffect } from "react";

const tags = ["Javascript", "Ocean", "River", "Study", "Glacier"];
const RunningTags = () => {
  useEffect(() => {
    console.log("use effect working...");
  }, []);
  return (
    <div className="h-16 w-full bg-slate-100 items-center justify-evenly md:mt-10 mt-2 overflow-hidden">
      <div className="h-full w-full justify-between custom-running">
        {tags.map((tag, idx) => (
          <div
            className="w-auto h-16 flex justify-center items-center"
            key={idx}
          >
            <div
              className="h-6 w-auto bg-slate-100 font-semibold cursor-pointer border-black border text-black text-md rounded-lg px-6 py-4 flex items-center  hover:text-white hover:border-gray-400 transition-all duration-500 delay-75 ease-in-out custom-hover-effect"
              key={idx}
            >
              {tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningTags;
