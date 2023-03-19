import React from "react";
import { Stepper, Step, StepLabel, StepContent } from "@mui/material";
import SigmaButton from "../../../components/Animation/SigmaButton";

import FarmLPWithdraw from "./FarmLPWithdraw";
import { MESHSWAP_LP_EXCHANGES } from "../../../web3/contracts/MSExchangeContract";
import { URL } from "../../../utils/constants";
// import FarmRemoveLiquidity from "./FarmRemoveLiquidity";
import OutLink from "../../../assets/images/global_icon_outlink.png";
import { Link } from "react-router-dom";

const LPFarmWithdrawModal = ({
  onSuccessTransactions: onSuccessFarmTransactions,
  farmItem,
  handleCancelPopup
}) => {
  const { tokenA, tokenB } = farmItem.lp;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep < 1) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  /** Stepper */
  const steps = [
    {
      label: `Unstake LP tokens from Grindex LP Farm`,
      contentNode: (
        <FarmLPWithdraw
          onSuccessTransactions={onSuccessFarmTransactions}
          farmItem={farmItem}
          handleNext={handleNext}
        />
      )
    },
    {
      label: `Withdraw ${tokenA.token.name} & ${tokenB.token.name} from LP pool`,
      contentNode: (
        <Link to="/">
          <SigmaButton
            className={`mt-[10px] main_bg text-black w-full sm:h-[50px] h-[40px] flex justify-center items-center  border-[1px] border-[#ffffff50]  rounded-md sm:text-[18px]  text-[16px] font-normal`}
          >
            <p>Withdraw LP on Fund</p>
            <div className="sm:ml-[10px] ml-[3px] sm:w-[24px] sm:h-[24px] w-[20px] h-[20px]">
              <img src={OutLink} alt="outlink" />
            </div>
          </SigmaButton>
        </Link>
        // <FarmRemoveLiquidity
        //   enqueueSnackbar={enqueueSnackbar}
        //   sigmaST={sigmaST}
        //   onSuccessTransactions={onSuccessFarmTransactions}
        //   farmItem={farmItem}
        // />
      )
    }
  ];

  return (
    <div className={` flex flex-col items-center relative w-full`}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className="w-full"
      >
        {steps.map((step, index) => {
          const isActiveStep = activeStep === index;
          return (
            <Step key={step.label}>
              <StepLabel
                icon={
                  <div
                    className={`${
                      isActiveStep
                        ? "main_bg text-black"
                        : "border-[1px] border-white opacity-50 text-white"
                    } md:w-[32px] md:h-[32px] sm:w-[28px] sm:h-[28px] w-[24px] h-[24px] flex justify-center items-center rounded-full md:text-[16px] sm:text-[14px] text-[12px]`}
                  >
                    {index + 1}
                  </div>
                }
              >
                <div className="flex items-center ">
                  <div className="flex sm:flex-row flex-col sm:items-end items-start">
                    <p
                      className={`${
                        !isActiveStep && "opacity-50"
                      } md:text-[20px] sm:text-[18px] text-[16px] text-white `}
                    >
                      {step.label}
                    </p>
                    {step.subLabel && (
                      <p className="ml-[5px] text-[14px] text-white opacity-50">
                        {step.subLabel}
                      </p>
                    )}
                  </div>
                </div>
              </StepLabel>
              <StepContent className="flex flex-col">
                {step.contentNode}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      <div className="min-h-[20px]" />
      <div className="flex justify-between w-full sm:h-[50px] h-[40px] mt-[15px] sm:text-[18px]  text-[16px] font-medium">
        <SigmaButton
          className={`${
            activeStep === 1 ? "main_bg text-black" : "text-white"
          } w-[49%] h-full flex justify-center items-center border-[1px] border-[#ffffff50]  rounded-md AKBtnEffect`}
          onClick={handleBack}
        >
          Prev
        </SigmaButton>
        <SigmaButton
          className={`${
            activeStep === 0 ? "main_bg text-black" : "text-white"
          } w-[49%] h-full flex justify-center items-center  border-[1px] border-[#ffffff50]  rounded-md AKBtnEffect`}
          onClick={handleNext}
        >
          Next
        </SigmaButton>
      </div>
      <SigmaButton
        className="w-full  flex justify-center items-center text-white border-[1px] border-[#ffffff50]  rounded-md AKBtnEffect sm:h-[50px] h-[40px] mt-[10px]"
        onClick={() => {
          handleCancelPopup("withdraw");
        }}
      >
        Cancel
      </SigmaButton>
    </div>
  );
};

export default LPFarmWithdrawModal;
