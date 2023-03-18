import React from "react";
// import Image from "next/image";
import WalletIcon from "../assets/images/global_icon_wallet.png";
import ErrorIcon from "../assets/images/global_toast_fail.png";
// import ErrorIcon from "../../public/assets/global_toast_fail.png";
import { Loading, LoadingModal } from "./Loading";
// import { Tooltip } from "@mui/material";
import { Tooltip } from "@mui/material";
import SigmaButton from "./Animation/SigmaButton";

export const UnitValueDisplay = ({
  className,
  title,
  value,
  unit,
  isWalletConnected = true,
  error = false,
  loading = false,
  symbol = ":"
}) => {
  let valueContent = <></>;
  if (!isWalletConnected) {
    valueContent = (
      <WalletConnection className="sm:w-[16px] w-[12px] sm:h-[16px] h-[12px]" />
    );
  } else if (error) {
    valueContent = (
      <ErrorValue
        className="sm:w-[16px] w-[12px] sm:h-[16px] h-[12px]"
        animate={false}
        message=""
      />
    );
  } else if (loading) {
    valueContent = (
      <Loading className="sm:w-[20px] w-[16px] sm:h-[20px] h-[16px]" />
    );
  } else {
    valueContent = <p>{`${value} ${unit}`}</p>;
  }
  return (
    <div
      className={`${className} text-white flex w-full lg:text-[16px] text-[14px] items-center`}
    >
      <p className="opacity-50 mr-[5px]">{`${title} ${symbol}`}</p>
      {valueContent}
    </div>
  );
};

export const ErrorValue = ({
  className = "sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]",
  animate = true,
  onClick = null,
  message = "Klaytn is unstable."
}) => {
  return (
    <Tooltip
      title={`${message}${
        onClick && typeof onClick === "function"
          ? " Please click to reload."
          : ""
      }`}
    >
      <div
        className={`${className} ${animate && "animate-pulse"}  ${
          onClick && typeof onClick === "function" && "cursor-pointer"
        }`}
        onClick={onClick}
      >
        <img src={ErrorIcon} alt="bg" />
      </div>
    </Tooltip>
  );
};

export const WalletConnection = ({
  className = "sm:w-[20px] w-[17px] sm:h-[20px] h-[17px]"
}) => {
  return (
    <div
      className={`${className} flex AKBtnEffect`}
      onClick={() => {
        const walletBtn = document.getElementById("wallet_button");
        if (!walletBtn) return;
        walletBtn.click();
      }}
    >
      <img src={WalletIcon} alt="icon" />
    </div>
  );
};

export const LPTokenDisplay = ({ tokenInfo, className }) => {
  const { name, logo } = tokenInfo;
  return (
    <div className={`${className} flex justify-center`}>
      <div className="flex items-center text-white">
        {logo && (
          <div className="w-[26px] h-[26px] sm:mr-[12px] mr-0">
            <img src={logo} alt="icon" />
          </div>
        )}
        <p className="md:text-[18px] sm:text-[16px] text-[12px] sm:flex hidden">
          {name}
        </p>
      </div>
    </div>
  );
};

export const DashboardColumnItem = ({
  className,
  style,
  title,
  contentNode,
  loading,
  isWalletConnected = true
}) => {
  return (
    <div
      className={`${className} h-full flex md:flex-col flex-row md:items-start items-center md:justify-start justify-between`}
      style={style}
    >
      <p className="text-[14px] opacity-50">{title}</p>
      <div className="h-[12px]" />
      {isWalletConnected ? (
        loading ? (
          <Loading />
        ) : (
          contentNode
        )
      ) : (
        <WalletConnection className="sm:w-[16px] w-[12px] sm:h-[16px] h-[12px]" />
      )}
    </div>
  );
};

export const FlexDualButton = ({
  className,
  leftButtonClassName = "",
  rightButtonClassName = "",
  leftBtn,
  rightBtn,
  leftBtnLoading = false,
  rightBtnLoading = false
}) => {
  return (
    <div className={`${className} flex h-full justify-between `}>
      <SigmaButton
        className={`${leftButtonClassName} relative overflow-hidden w-[48%] rounded-md flex justify-center items-center text-[#1A1C29] main_bg lg:text-[18px] md:text[16px] text-[14px] font-semibold `}
        onClick={leftBtn?.onClick}
      >
        {leftBtnLoading && (
          <LoadingModal
            className="absolute z-10 main_bg w-full h-full"
            loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
            message={null}
          />
        )}

        <p>{leftBtn?.title}</p>
      </SigmaButton>
      <SigmaButton
        className={`${rightButtonClassName} relative overflow-hidden w-[48%] rounded-md flex justify-center items-center  border-[1px] border-[#ffffff50] lg:text-[18px] md:text[16px] text-[14px] font-semibold`}
        onClick={rightBtn?.onClick}
      >
        {rightBtnLoading && (
          <LoadingModal
            className="absolute z-10 main_bg w-full h-full"
            loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
            message={null}
          />
        )}
        <p>{rightBtn?.title}</p>
      </SigmaButton>
    </div>
  );
};
export const TripleButtonGroup = ({
  className,
  leftButtonClassName = "",
  rightButtonClassName = "",
  bottomButtonClassName = "",
  leftBtn,
  rightBtn,
  bottomBtn
}) => {
  return (
    <div
      className={`${className} flex flex-col h-full justify-between  lg:text-[18px] md:text[16px] text-[14px] font-semibold`}
    >
      <div className="flex justify-between h-[46%]">
        <SigmaButton
          className={`${leftButtonClassName} w-[48%] rounded-md flex justify-center items-center text-[#1A1C29] main_bg `}
          onClick={leftBtn?.onClick}
        >
          {leftBtn?.title}
        </SigmaButton>
        <SigmaButton
          className={`${rightButtonClassName} w-[48%] rounded-md flex justify-center items-center  border-[1px] border-[#ffffff50]`}
          onClick={rightBtn?.onClick}
        >
          {rightBtn?.title}
        </SigmaButton>
      </div>
      <SigmaButton
        className={`${bottomButtonClassName} h-[46%] rounded-md w-full flex justify-center items-center border-[1px] border-[#ffffff50]`}
        onClick={bottomBtn?.onClick}
      >
        {bottomBtn?.title}
      </SigmaButton>
    </div>
  );
};

export const LoadingValueItem = ({
  valueNode,
  loading,
  isWalletConnected = false
}) => {
  return !isWalletConnected ? (
    <WalletConnection className="sm:w-[16px] w-[12px] sm:h-[16px] h-[12px]" />
  ) : loading ? (
    <Loading className="sm:w-[20px] w-[16px] sm:h-[20px] h-[16px]" />
  ) : (
    valueNode
  );
};
