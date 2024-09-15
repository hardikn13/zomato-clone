import React from "react";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="py-14 w-full">
      <div className="">
        <img src={Logo} className="mx-auto w-48 h-24" />
      </div>
    </div>
  );
};

export default Navbar;
