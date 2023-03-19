import React from "react";
import { ethers } from "ethers";
import WETHTokenContract from "../../../contracts/WETHTokenContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useBIETHBalance(fromAddress) {
  /** ethBalance */
  const [ethBalance, setETHBalance] = React.useState(null);
  const [ethBalanceState, setETHBalanceState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setETHBalanceState(ContractCallState.FETCHING);
      let ethBalance = await WETHTokenContract.balanceOf(fromAddress, {
        from: fromAddress
      });

      setETHBalanceState(ContractCallState.SUCCESS);
      setETHBalance(ethers.utils.formatEther(ethBalance));
    } catch (error) {
      console.error(error.message);
      setETHBalanceState(ContractCallState.ERROR);
      setETHBalance(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(ethBalanceState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(ethBalance, isCallSuccess);

  return {
    ethBalance,
    ethBalanceBN: bn,
    isLoadingETHBalance: isLoading,
    isCallSuccessETHBalance: isCallSuccess,
    isValidETHBalance: isValid,
    isPositiveETHBalance: isPositive,
    numberedETHBalance: numbered,

    displayETHBalance: display,
    fetchETHBalance: fetch
  };
}
