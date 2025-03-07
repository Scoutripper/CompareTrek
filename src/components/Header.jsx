import React from "react";
import Logo from "../assets/wordlogo.svg";
import Close from "../assets/close.svg";

const Header = ({ link }) => {
  return (
    <div className="top-2 left-0 right-0 h-16 flex items-center w-full justify-between px-6 z-50 pt-6">
      <img src={Logo} alt="Logo" className="h-13" />
      <a href={link} target="_self">
        <img src={Close} alt="Close" className="h-[14px] cursor-pointer" />
      </a>
    </div>
  );
};

export default Header;
