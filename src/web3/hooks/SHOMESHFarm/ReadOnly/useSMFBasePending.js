import React from "react";
import { ethers } from "ethers";
import SHOMESHFarmContract from "../../../contracts/SHOMESHFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSMFBasePending(fromAddress) {
  /** basePending */
  const [basePending, setBasePending] = React.useState(null);
  const [basePendingState, setBasePendingState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setBasePendingState(ContractCallState.FETCHING);
      let basePending = await SHOMESHFarmContract.basePending(fromAddress, {
        from: fromAddress
      });

      setBasePendingState(ContractCallState.SUCCESS);
      setBasePending(ethers.utils.formatEther(basePending));
    } catch (error) {
      console.error(error.message);
      setBasePendingState(ContractCallState.ERROR);
      setBasePending(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(basePendingState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(basePending, isCallSuccess);

  return {
    basePending,
    basePendingBN: bn,
    isLoadingBasePending: isLoading,
    isCallSuccessBasePending: isCallSuccess,
    isValidBasePending: isValid,
    isPositiveBasePending: isPositive,
    numberedBasePending: numbered,

    displayBasePending: display,
    fetchBasePending: fetch
  };
}
