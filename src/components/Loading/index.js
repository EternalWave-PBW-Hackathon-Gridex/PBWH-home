import React from "react";
import LoadingIcon from "../../assets/images/global_loading.png";

export const Loading = ({
  className = "sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
}) => {
  return (
    <div className={`${className} animate-spin`}>
      <img src={LoadingIcon} alt="loading" />
    </div>
  );
};

export const LoadingModal = ({
  message = "Sending Transaction...",
  className,
  loadingClassName = "w-[120px] h-[120px]",
  messageClassName = "md:text-[24px] sm:text-[20px] text-[16px] sm:mt-[20px] mt-[10px]"
}) => {
  return (
    <div className={`${className} flex flex-col items-center justify-center`}>
      <Loading className={loadingClassName} />
      {message && <p className={messageClassName}>{message}</p>}
    </div>
  );
};
