import React from "react";
import "./Loading.scss";

import { Loading } from ".";
import Logo from "../../assets/images/global_logo-text.png";

const LoadingLayout = () => {
  return (
    <div className=" z-[99] absolute w-full h-screen sigma_bg-primary pointer-events-auto flex flex-col justify-center items-center AKLoadingBack">
      <div className={`absolute w-[100px] flex z-10 AKLaodingLogo`}>
        <img src={Logo} alt="global_logo" />
      </div>
      <Loading className="sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] mt-[100px]" />
    </div>
  );
};

export default LoadingLayout;
