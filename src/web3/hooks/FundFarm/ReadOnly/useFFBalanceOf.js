import React from "react";
import { ethers } from "ethers";
import FundFarmContract from "../../../contracts/FundFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useFFBalanceOf(fromAddress) {
  /** lpBalance */
  const [lpBalance, setLPBalance] = React.useState(null);
  const [lpBalanceState, setLPBalanceState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setLPBalanceState(ContractCallState.FETCHING);
      let lpBalance = await FundFarmContract.balanceOf(fromAddress, {
        from: fromAddress
      });

      setLPBalanceState(ContractCallState.SUCCESS);
      setLPBalance(ethers.utils.formatEther(lpBalance));
    } catch (error) {
      console.error(error.message);
      setLPBalanceState(ContractCallState.ERROR);
      setLPBalance(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(lpBalanceState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(lpBalance, isCallSuccess);

  return {
    lpBalance,
    lpBalanceBN: bn,
    isLoadingLPBalance: isLoading,
    isCallSuccessLPBalance: isCallSuccess,
    isValidLPBalance: isValid,
    isPositiveLPBalance: isPositive,
    numberedLPBalance: numbered,

    displayLPBalance: display,
    fetchLPBalance: fetch
  };
}
