import React from "react";
import { Stepper, Step, StepLabel, StepContent } from "@mui/material";
import SigmaButton from "../../../components/Animation/SigmaButton";
import FarmLPDeposit from "./FarmLPDeposit";
import { URL } from "../../../utils/constants";
// import FarmLPDeposit from "./FarmLPDeposit";
import SHOUSDCLPFarmAddLiquidity from "./SHOUSDCLPFarmAddLiquidity";
import { MESHSWAP_LP_EXCHANGES } from "../../../web3/contracts/MSExchangeContract";
import { TOKENS } from "../../../web3/constants";
import OutLink from "../../../assets/images/global_icon_outlink.png";

const LPFarmDepositModal = ({
  onSuccessTransactions: onSuccessFarmListRowTransactions,
  farmItem,
  LPTokenContract,
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
      label: `Supply ${tokenA.token.name} & ${tokenB.token.name} to LP pool`,
      subLabel: "(If you don't have LP tokens)",
      contentNode: (
        <SigmaButton
          className={` mt-[30px] main_bg text-white w-full sm:h-[50px] h-[40px] flex justify-center items-center  border-[1px] border-[#ffffff50]  rounded-md sm:text-[18px]  text-[16px] font-normal`}
          onClick={() => {
            window.open(
              `${URL.DEX}/exchange/pool/detail/${
                MESHSWAP_LP_EXCHANGES[farmItem.token.name]
              }`
            );
          }}
        >
          <p>Provide LP on Meshswap</p>{" "}
          <div className="sm:ml-[10px] ml-[3px] sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]">
            <img src={OutLink} alt="outlink" />
          </div>
        </SigmaButton>
        // <SHOUSDCLPFarmAddLiquidity
        //   onSuccessTransactions={onSuccessFarmListRowTransactions}
        //   farmItem={farmItem}
        //   handleNext={handleNext}
        // />
      )
    },
    {
      label: "Stake LP tokens to Shogun LP Farm",
      contentNode: (
        <FarmLPDeposit
          onSuccessTransactions={onSuccessFarmListRowTransactions}
          farmItem={farmItem}
          LPTokenContract={LPTokenContract}
        />
      )
    }
  ];

  return (
    <div className={` flex flex-col items-center relative `}>
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
          } w-[49%] h-full flex justify-center items-center border-[1px] border-[#ffffff50]  rounded-md `}
          onClick={handleBack}
        >
          Prev
        </SigmaButton>
        <SigmaButton
          className={`${
            activeStep === 0 ? "main_bg text-black" : "text-white"
          } w-[49%] h-full flex justify-center items-center  border-[1px] border-[#ffffff50]  rounded-md `}
          onClick={handleNext}
        >
          Next
        </SigmaButton>
      </div>
      <SigmaButton
        className="w-full  flex justify-center items-center text-white border-[1px] border-[#ffffff50]  rounded-md  sm:h-[50px] h-[40px] mt-[10px]"
        onClick={() => {
          handleCancelPopup("deposit");
        }}
      >
        Cancel
      </SigmaButton>
    </div>
  );
};

export default LPFarmDepositModal;
