import React from "react";
import { motion } from "framer-motion";

const LDCurtain = ({ stageName, curtainImage, MOTION_VARIANTS }) => {
  return (
    <motion.div variants={MOTION_VARIANTS}>
      <div className="w-full h-[160px] relative flex justify-center items-center ">
        <div className="w-full h-full">
          <img src={curtainImage} alt="bg" />
        </div>

        <div className=" absolute bottom-[5px] flex justify-center items-center sm:px-[24px] px-[20px] sm:h-[36px] h-[28px] sm:rounded-[18px] rounded-[14px] shogun_bg-secondary">
          <p className="sm:text-[16px] text-[14px] font-semibold">
            {stageName}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LDCurtain;
