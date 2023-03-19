import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import LoadingLayout from "../../components/Loading/LoadingLayout";
import Unlimited from "./Stages/Unlimited";

dayjs.extend(utc);

const Lockdrop = () => {
  /** Life Cycle */
  React.useEffect(() => {}, []);

  /** UI */

  return (
    <section className="w-full  flex flex-col items-center relative sigma_inner h-full ">
      {/* <LoadingLayout /> */}
      <div className="min-h-[60px]" />

      <Unlimited
        description={{
          stage: "Time left in this stage",
          day: "Day 1 - 4",
          des: `During this period, there are no limit on deposits or withdrawals of MESH.
          Once this period ends, you will no longer be able to deposit MESH.
    
          50% of the MESH committed will be used to mint shoMESH to generate liquidity for the shoMESH-MESH pair on Meshswap. After Lock period, you will be able to claim shoMESH-MESH LP tokens. 
          
          You receive SHO Incentives for the Lockdrop participation`
        }}
      />

      <div className="w-full min-h-[75px]" />
    </section>
  );
};

export default Lockdrop;
