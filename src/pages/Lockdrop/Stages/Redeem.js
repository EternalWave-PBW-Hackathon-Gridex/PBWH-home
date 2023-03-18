import React from "react";
import { motion } from "framer-motion";

import LDCurtain from "../LDCurtain";
import LDDescription from "../LDDescription";
import { STAGE_TYPES } from "..";
import LDRedeemRows from "../LDRedeemRows";
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

const Redeem = ({ stageType, description }) => {
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
        <LDDescription
          description={description}
          MOTION_VARIANTS={MOTION_VARIANTS}
        />
      </div>
      <div className=" min-h-[40px]" />
      <LDRedeemRows MOTION_VARIANTS={MOTION_VARIANTS} />
    </motion.section>
  );
};

export default Redeem;
