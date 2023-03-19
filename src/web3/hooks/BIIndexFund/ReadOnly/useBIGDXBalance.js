import React from "react";
import { ethers } from "ethers";
import GDXTokenContract from "../../../contracts/GDXTokenContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useBIGDXBalance(fromAddress) {
  /** gdxBalance */
  const [gdxBalance, setGDXBalance] = React.useState(null);
  const [gdxBalanceState, setGDXBalanceState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setGDXBalanceState(ContractCallState.FETCHING);
      let gdxBalance = await GDXTokenContract.balanceOf(fromAddress, {
        from: fromAddress
      });

      setGDXBalanceState(ContractCallState.SUCCESS);
      setGDXBalance(ethers.utils.formatEther(gdxBalance));
    } catch (error) {
      console.error(error.message);
      setGDXBalanceState(ContractCallState.ERROR);
      setGDXBalance(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(gdxBalanceState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(gdxBalance, isCallSuccess);

  return {
    gdxBalance,
    gdxBalanceBN: bn,
    isLoadingGDXBalance: isLoading,
    isCallSuccessGDXBalance: isCallSuccess,
    isValidGDXBalance: isValid,
    isPositiveGDXBalance: isPositive,
    numberedGDXBalance: numbered,

    displayGDXBalance: display,
    fetchGDXBalance: fetch
  };
}
