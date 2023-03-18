import React from "react";
import { motion } from "framer-motion";

import LDCurtain from "../LDCurtain";
import LDTimer from "../LDTimer";
import LDDescription from "../LDDescription";
import LDSwapHelpRow from "../LDSwapHelpRow";
import LDTotalDeposit from "../LDTotalDeposit";
import { STAGE_TYPES } from "..";
import LDStepProgress from "../LDStepProgress";
import LDDepositDashboard from "../LDDepositDashboard";
import CurtainImage from "../../../assets/images/lockdrop-curtain.png";

const CONTAINER_VARIANTS = {
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
};
const MOTION_VARIANTS = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Unlimited = ({
  stageType,
  description,
  leftDays,
  leftHours,
  leftMinutes,
  leftSeconds,
  step
}) => {
  return (
    <motion.section
      variants={CONTAINER_VARIANTS}
      className="w-full  flex flex-col items-center"
    >
      <div className="max-w-[540px] w-full ">
        <LDCurtain
          curtainImage={CurtainImage}
          stageName={STAGE_TYPES[stageType].name}
          MOTION_VARIANTS={MOTION_VARIANTS}
        />
        <LDTimer
          description={description}
          leftDays={leftDays}
          leftHours={leftHours}
          leftMinutes={leftMinutes}
          leftSeconds={leftSeconds}
          MOTION_VARIANTS={MOTION_VARIANTS}
        />
        <LDStepProgress step={step} MOTION_VARIANTS={MOTION_VARIANTS} />
        <LDDescription
          description={description}
          MOTION_VARIANTS={MOTION_VARIANTS}
        />
      </div>
      <div className=" min-h-[40px]" />
      <LDSwapHelpRow MOTION_VARIANTS={MOTION_VARIANTS} />
      <div className=" min-h-[20px]" />
      <LDTotalDeposit MOTION_VARIANTS={MOTION_VARIANTS} />
      <div className=" min-h-[20px]" />
      <LDDepositDashboard
        MOTION_VARIANTS={MOTION_VARIANTS}
        stageType={stageType}
      />
    </motion.section>
  );
};

export default Unlimited;
