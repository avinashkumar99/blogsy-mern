import React from "react";

const RotatedBtn = ({ text, handleEvent }) => {
  return (
    <div className="h-16 w-auto p-4 font-semibold custom-rotated relative">
      <span>{text}</span>
    </div>
  );
};

export default RotatedBtn;
