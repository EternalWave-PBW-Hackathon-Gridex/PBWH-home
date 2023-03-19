import React from "react";
import { ethers } from "ethers";
import LPFarmContract from "../../../contracts/LPFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLFBoostPending(fromAddress) {
  /** boostPending */
  const [boostPending, setBoostPending] = React.useState(null);
  const [boostPendingState, setBoostPendingState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (poolId) => {
    try {
      setBoostPendingState(ContractCallState.FETCHING);
      let boostPending = await LPFarmContract.getUserBoostPending(
        poolId,
        fromAddress,
        {
          from: fromAddress
        }
      );

      setBoostPendingState(ContractCallState.SUCCESS);
      setBoostPending(ethers.utils.formatEther(boostPending));
    } catch (error) {
      console.error(error.message);
      setBoostPendingState(ContractCallState.ERROR);
      setBoostPending(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(boostPendingState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(boostPending, isCallSuccess);

  return {
    boostPending,
    boostPendingBN: bn,
    isLoadingBoostPending: isLoading,
    isCallSuccessBoostPending: isCallSuccess,
    isValidBoostPending: isValid,
    isPositiveBoostPending: isPositive,
    numberedBoostPending: numbered,

    displayBoostPending: display,
    fetchBoostPending: fetch
  };
}
