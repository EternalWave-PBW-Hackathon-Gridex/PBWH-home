import React from "react";
import { motion } from "framer-motion";
import FundDeposit from "./FundDeposit";
import FundWithdraw from "./FundWithdraw";

const FundContentDisplay = ({ depositTabIndex, tokens }) => {
  let content = <></>;
  switch (depositTabIndex) {
    case 0:
      content = <FundDeposit tokens={tokens} />;
      break;
    case 1:
      content = <FundWithdraw tokens={tokens} />;
      break;

    default:
      break;
  }

  return <motion.div className="w-full">{content}</motion.div>;
};

export default FundContentDisplay;
