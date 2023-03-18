import React from "react";
import { ethers } from "ethers";
import TokenSaleContract from "../../../contracts/TokenSaleContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useTSWithdrawableUSDC(fromAddress) {
  /** withdrawableUSDC */
  const [withdrawableUSDC, setWithdrawableUSDC] = React.useState(null);
  const [withdrawableUSDCState, setWithdrawableUSDCState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setWithdrawableUSDCState(ContractCallState.FETCHING);
      let withdrawableUSDC = await TokenSaleContract.getWithdrawableAmount({
        from: fromAddress
      });

      setWithdrawableUSDCState(ContractCallState.SUCCESS);
      setWithdrawableUSDC(ethers.utils.formatUnits(withdrawableUSDC, "mwei"));
    } catch (error) {
      console.error(error.message);
      setWithdrawableUSDCState(ContractCallState.ERROR);
      setWithdrawableUSDC(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    withdrawableUSDCState
  );
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(withdrawableUSDC, isCallSuccess);

  return {
    withdrawableUSDC,
    isLoadingWithdrawableUSDC: isLoading,
    isCallSuccessWithdrawableUSDC: isCallSuccess,
    isValidWithdrawableUSDC: isValid,
    isPositiveWithdrawableUSDC: isPositive,

    displayWithdrawableUSDC: display,
    fetchWithdrawableUSDC: fetch
  };
}
