import React from "react";
import { ethers } from "ethers";
import LockdropContract from "../../../contracts/LockdropContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLDAllocatedSHO(fromAddress) {
  /** allocatedSHO */
  const [allocatedSHO, setAllocatedSHO] = React.useState(null);
  const [allocatedSHOState, setAllocatedSHOState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (address) => {
    try {
      setAllocatedSHOState(ContractCallState.FETCHING);
      let allocatedSHO = await LockdropContract.userTotalAllocatedSHOToken(
        address,
        {
          from: fromAddress
        }
      );
      setAllocatedSHOState(ContractCallState.SUCCESS);
      setAllocatedSHO(ethers.utils.formatEther(allocatedSHO));
    } catch (error) {
      console.error(error.message);
      setAllocatedSHOState(ContractCallState.ERROR);
      setAllocatedSHO(null);
    }
  };

  const { isCallSuccess, isLoading } = useConstantProperties(allocatedSHOState);
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(allocatedSHO, isCallSuccess);

  return {
    allocatedSHO,
    isLoadingAllocatedSHO: isLoading,
    isCallSuccessAllocatedSHO: isCallSuccess,

    displayExpectedSHOReward: display,
    fetchAllocatedSHO: fetch
  };
}
