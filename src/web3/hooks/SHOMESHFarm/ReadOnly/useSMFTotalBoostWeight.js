import React from "react";
import { ethers } from "ethers";
import SHOMESHFarmContract from "../../../contracts/SHOMESHFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSMFTotalBoostWeight(fromAddress) {
  /** totalBoostWeight */
  const [totalBoostWeight, setTotalBoostWeight] = React.useState(null);
  const [totalBoostWeightState, setTotalBoostWeightState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setTotalBoostWeightState(ContractCallState.FETCHING);
      let totalBoostWeight = await SHOMESHFarmContract.totalBoostWeight({
        from: fromAddress
      });

      setTotalBoostWeightState(ContractCallState.SUCCESS);
      setTotalBoostWeight(ethers.utils.formatEther(totalBoostWeight));
    } catch (error) {
      console.error(error.message);
      setTotalBoostWeightState(ContractCallState.ERROR);
      setTotalBoostWeight(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    totalBoostWeightState
  );
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(totalBoostWeight, isCallSuccess);

  return {
    totalBoostWeight,
    totalBoostWeightBN: bn,
    isLoadingTotalBoostWeight: isLoading,
    isCallSuccessTotalBoostWeight: isCallSuccess,
    isValidTotalBoostWeight: isValid,
    isPositiveTotalBoostWeight: isPositive,
    numberedTotalBoostWeight: numbered,

    displayTotalBoostWeight: display,
    fetchTotalBoostWeight: fetch
  };
}
