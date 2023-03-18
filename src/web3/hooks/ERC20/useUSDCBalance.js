import React from "react";
import { ethers } from "ethers";

import { BN, convertToETH, isBNPositive, BN_FORMAT } from "../../utils/AKBN";
import { getAbbreviateNumberFormat } from "../../utils/numberFormat";
import useConstantProperties from "../useConstantProperties";
import { ContractCallState } from "../../constants";
import useNumericTokenConstants from "../useNumericTokenConstants";

export default function useUSDCBalance(tokenContract) {
  /** balance */
  const [balance, setBalance] = React.useState(null);
  const [balanceState, setBalanceState] = React.useState(ContractCallState.NEW);

  const fetch = async (address) => {
    try {
      setBalanceState(ContractCallState.FETCHING);
      let balance = await tokenContract.balanceOf(address, {
        from: address
      });
      setBalanceState(ContractCallState.SUCCESS);
      setBalance(ethers.utils.formatUnits(balance, "mwei"));
    } catch (error) {
      console.error(error.message);
      setBalanceState(ContractCallState.ERROR);
      setBalance(null);
    }
  };

  const { isCallSuccess, isLoading } = useConstantProperties(balanceState);
  let { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(balance, isCallSuccess);

  return {
    balance,
    balanceState,
    isLoadingBalance: isLoading,
    isCallSuccessBalance: isCallSuccess,

    balanceBN: bn,
    isValidBalance: isValid,
    isPositiveBalance: isPositive,
    displayBalance: display,
    displayNumberFormatBalance: displayNumberFormat,

    fetchBalance: fetch
  };
}
