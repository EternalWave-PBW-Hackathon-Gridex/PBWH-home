import React from "react";
import { ethers } from "ethers";

import { ContractCallState } from "../../constants";
import useConstantProperties from "../useConstantProperties";
import useNumericTokenConstants from "../useNumericTokenConstants";

export default function useERC20Allowance(tokenContract) {
  /** allowance */
  const [allowance, setAllowance] = React.useState(null);
  const [allowanceState, setAllowanceState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (address, contractAddress) => {
    try {
      setAllowanceState(ContractCallState.FETCHING);
      let allowance = await tokenContract.allowance(address, contractAddress, {
        from: address
      });

      setAllowanceState(ContractCallState.SUCCESS);
      setAllowance(ethers.utils.formatEther(allowance));
    } catch (error) {
      console.error(error.message);
      setAllowanceState(ContractCallState.ERROR);
      setAllowance(null);
    }
  };

  const { isCallSuccess, isLoading } = useConstantProperties(allowanceState);

  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(allowance, isCallSuccess);

  return {
    allowance,
    allowanceState,
    isLoadingAllowance: isLoading,
    isAllowanceCallSuccess: isCallSuccess,
    allowanceBN: bn,
    isValidAllowance: isValid,
    isApproved: isPositive,
    displayAllowance: display,
    displayNumberFormatAllowance: displayNumberFormat,

    fetchAllowance: fetch
  };
}
