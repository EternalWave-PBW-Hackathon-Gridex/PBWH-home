import React from "react";
import { motion } from "framer-motion";

const LDStepProgress = ({ MOTION_VARIANTS, step }) => {
  return (
    <motion.div variants={MOTION_VARIANTS}>
      <div className="w-full mt-[13px] flex justify-between relative items-center">
        {[1, 2, 3, 4, 5].map((_step, index) => {
          return (
            <div
              className={`w-[50px] h-[50px] ${
                step === _step
                  ? `text-black ${
                      _step === 5 ? "main_bg border-none" : "sub_bg"
                    }`
                  : "sub_c outer_bg"
              }  sub_bd text-[18px] font-bold flex justify-center items-center border-[1px] rounded-full relative  z-10`}
              key={`stageitem-${index}`}
            >
              <p className="">{_step}</p>
            </div>
          );
        })}
        <div className="absolute h-[1px] sub_bg w-full opacity-30" />
      </div>
    </motion.div>
  );
};

export default LDStepProgress;
