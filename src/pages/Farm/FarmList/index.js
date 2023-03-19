import React from "react";
import FarmListHeaderRow from "./FarmListHeaderRow";
import ShoMESHMESHLPFarmListRow from "./ShoMESHMESHLPFarmListRow";
import TEMPLPFarmListRow from "./TEMPLPFarmListRow";

const FarmList = () => {
  return (
    <div className="w-full flex flex-col sm:mt-[50px] mt-0">
      <FarmListHeaderRow className={"mb-[15px]"} />
      <ShoMESHMESHLPFarmListRow />
      <TEMPLPFarmListRow />
    </div>
  );
};

export default FarmList;
