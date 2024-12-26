import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
const Footer = () => {
  return (
    <div className="w-[screen] h-[150px] bg-black">
      <div className="flex md:flex-row flex-col justify-evenly align-middle h-[70%] md:w-[80%] w-[95%] mx-auto text-stone-50 p-6">
        <FacebookIcon />
        <XIcon />
        <InstagramIcon />
      </div>
      <div className="text-slate-100 text-sm flex justify-center ">
        <p className="mx-auto">
          &copy; 2024 Your Company Name. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
