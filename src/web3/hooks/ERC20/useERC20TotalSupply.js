import React from "react";
import { ethers } from "ethers";

import { ContractCallState } from "../../constants";
import useConstantProperties from "../useConstantProperties";
import useNumericTokenConstants from "../useNumericTokenConstants";

export default function useERC20TotalSupply(tokenContract) {
  /** totalSupply */
  const [totalSupply, setTotalSupply] = React.useState(null);
  const [totalSupplyState, setTotalSupplyState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (address) => {
    try {
      setTotalSupplyState(ContractCallState.FETCHING);
      let totalSupply = await tokenContract.totalSupply({
        from: address
      });

      setTotalSupplyState(ContractCallState.SUCCESS);
      setTotalSupply(ethers.utils.formatEther(totalSupply));
    } catch (error) {
      console.error(error.message);
      setTotalSupplyState(ContractCallState.ERROR);
      setTotalSupply(null);
    }
  };

  const { isCallSuccess, isLoading } = useConstantProperties(totalSupplyState);

  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(totalSupply, isCallSuccess);

  return {
    totalSupply,
    totalSupplyState,
    isLoadingTotalSupply: isLoading,
    isTotalSupplyCallSuccess: isCallSuccess,
    totalSupplyBN: bn,
    isValidTotalSupply: isValid,
    isPositiveTotalSupply: isPositive,
    displayTotalSupply: display,
    displayNumberFormatTotalSupply: displayNumberFormat,

    fetchTotalSupply: fetch
  };
}
