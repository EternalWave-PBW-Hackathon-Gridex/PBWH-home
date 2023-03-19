import React from "react";
import { motion } from "framer-motion";
import FundDeposit from "./FundDeposit";
import FundWithdraw from "./FundWithdraw";

const FundContentDisplay = ({ depositTabIndex, tokenTabInfo }) => {
  let content = <></>;
  switch (depositTabIndex) {
    case 0:
      content = <FundDeposit tokenTabInfo={tokenTabInfo} />;
      break;
    case 1:
      content = <FundWithdraw tokenTabInfo={tokenTabInfo} />;
      break;

    default:
      break;
  }

  return <motion.div className="w-full">{content}</motion.div>;
};

export default FundContentDisplay;
