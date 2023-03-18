import React from "react";
import { ethers } from "ethers";
import LPFarmMiningRateHelperContract from "../../../contracts/LPFarmMiningRateHelperContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLFMHEarned(fromAddress) {
  /** shoMESHEarned */
  const [shoMESHEarned, setSHOMESHEarned] = React.useState(null);
  const [shoMESHEarnedState, setSHOMESHEarnedState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (poolId) => {
    try {
      setSHOMESHEarnedState(ContractCallState.FETCHING);
      let shoMESHEarned = await LPFarmMiningRateHelperContract.earned(
        fromAddress,
        poolId,
        {
          from: fromAddress
        }
      );

      setSHOMESHEarnedState(ContractCallState.SUCCESS);
      setSHOMESHEarned(ethers.utils.formatEther(shoMESHEarned));
    } catch (error) {
      console.error(error.message);
      setSHOMESHEarnedState(ContractCallState.ERROR);
      setSHOMESHEarned(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(shoMESHEarnedState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(shoMESHEarned, isCallSuccess);

  return {
    shoMESHEarned,
    shoMESHEarnedBN: bn,
    isLoadingSHOMESHEarned: isLoading,
    isCallSuccessSHOMESHEarned: isCallSuccess,
    isValidSHOMESHEarned: isValid,
    isPositiveSHOMESHEarned: isPositive,
    numberedSHOMESHEarned: numbered,

    displaySHOMESHEarned: display,
    fetchSHOMESHEarned: fetch
  };
}
