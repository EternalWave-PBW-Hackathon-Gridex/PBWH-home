import React from "react";
import { motion } from "framer-motion";
import { URL } from "../../utils/constants";
import SigmaButton from "../../components/Animation/SigmaButton";

const LDDescription = ({ description, MOTION_VARIANTS }) => {
  return (
    <motion.div variants={MOTION_VARIANTS}>
      <div className=" w-full flex flex-col mt-[24px]">
        <p className="sm:text-[16px] text-[14ox] sm:font-bold font-semibold sm:mb-[12px] mb-[10px]">
          {description.day}
        </p>
        <p className="sm:text-[14px] text-[13px] sm:mb-[12px] mb-[10px] whitespace-pre-line">
          {description.des}
        </p>
        <div className="flex">
          <p className="mr-[5px] sm:text-[14px] text-[12px]">{`For more informations see `}</p>
          <a
            href={`${URL.DOCS}/launch-sequence/launch-sequence-overview
                `}
            target="_blank"
            rel="noreferrer"
          >
            <SigmaButton className="font-bold sm:text-[14px] text-[13px]">{`Grindex Docs`}</SigmaButton>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default LDDescription;
