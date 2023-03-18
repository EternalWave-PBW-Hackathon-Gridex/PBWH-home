import React from "react";
import useSigmaDidMount from "../../hooks/useSigmaDidMount";
import BoostActivationRow from "./BoostActivationRow";
import SHOStakingRow from "./SHOStakingRow";
import XSHOStakingRow from "./XSHOStakingRow";

const Govern = (props) => {
  /** Life Cycle */
  useSigmaDidMount(() => {});

  /** Validations */

  /** UI */

  return (
    <section className="w-full flex justify-center">
      <div className="mt-[120px] w-[90%] ">
        <SHOStakingRow />
        <XSHOStakingRow />
        <BoostActivationRow />
      </div>
    </section>
  );
};

export default Govern;
