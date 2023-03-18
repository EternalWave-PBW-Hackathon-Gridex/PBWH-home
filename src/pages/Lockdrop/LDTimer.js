import React from "react";
import { motion } from "framer-motion";
import AnimatedLeftTime from "./AnimatedLeftTime";

const LDTimer = ({
  description,
  leftDays,
  leftHours,
  leftMinutes,
  leftSeconds,
  MOTION_VARIANTS
}) => {
  return (
    <motion.div variants={MOTION_VARIANTS}>
      <div className="w-full  flex flex-col items-center mt-[9px]">
        <p className="opacity-50 sm:text-[14px] text-[12px]">
          {description.stage}
        </p>
        <div className="flex sm:text-[36px] text-[28px] sm:font-bold font-semibold">
          <p className="mr-[10px]">{`${leftDays}d`}</p>
          <AnimatedLeftTime
            className="mr-[10px]"
            unit="h"
            leftTime={leftHours}
          />
          <AnimatedLeftTime
            className="mr-[10px]"
            unit="m"
            leftTime={leftMinutes}
          />
          <AnimatedLeftTime unit="s" leftTime={leftSeconds} />
        </div>
      </div>
    </motion.div>
  );
};

export default LDTimer;
