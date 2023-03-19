import React from "react";
import FarmListHeaderRow from "./FarmListHeaderRow";
import FundAListRow from "./FundAListRow";
import FundBListRow from "./FundBListRow";

const FarmList = () => {
  return (
    <div className="w-full flex flex-col sm:mt-[50px] mt-0">
      <FarmListHeaderRow className={"mb-[15px]"} />
      <FundAListRow />
      <FundBListRow />
    </div>
  );
};

export default FarmList;
