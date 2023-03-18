import React from "react";
import { motion } from "framer-motion";

import LDCurtain from "../LDCurtain";
import LDTimer from "../LDTimer";
import LDDescription from "../LDDescription";
import LDSwapHelpRow from "../LDSwapHelpRow";
import { STAGE_TYPES } from "..";
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

const ComingSoon = ({
  stageType,
  description,
  leftDays,
  leftHours,
  leftMinutes,
  leftSeconds
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
          MOTION_VARIANTS={MOTION_VARIANTS}
          description={description}
          leftDays={leftDays}
          leftHours={leftHours}
          leftMinutes={leftMinutes}
          leftSeconds={leftSeconds}
        />
        <LDDescription
          description={description}
          MOTION_VARIANTS={MOTION_VARIANTS}
        />
      </div>
      <div className=" min-h-[40px]" />
      <LDSwapHelpRow MOTION_VARIANTS={MOTION_VARIANTS} />
    </motion.section>
  );
};

export default ComingSoon;
