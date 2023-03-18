import React from "react";
import { ethers } from "ethers";
import TokenSaleContract from "../../../contracts/TokenSaleContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useTSWithdrawableToken(fromAddress) {
  /** withdrawableToken */
  const [withdrawableToken, setWithdrawableToken] = React.useState(null);
  const [withdrawableTokenState, setWithdrawableTokenState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setWithdrawableTokenState(ContractCallState.FETCHING);
      let withdrawableToken =
        await TokenSaleContract.getWithdrawableTokenAmount({
          from: fromAddress
        });

      setWithdrawableTokenState(ContractCallState.SUCCESS);
      setWithdrawableToken(ethers.utils.formatEther(withdrawableToken));
    } catch (error) {
      console.error(error.message);
      setWithdrawableTokenState(ContractCallState.ERROR);
      setWithdrawableToken(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    withdrawableTokenState
  );
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(withdrawableToken, isCallSuccess);

  return {
    withdrawableToken,
    isLoadingWithdrawableToken: isLoading,
    isCallSuccessWithdrawableToken: isCallSuccess,
    isValidWithdrawableToken: isValid,
    isPositiveWithdrawableToken: isPositive,

    displayWithdrawableToken: display,
    fetchWithdrawableToken: fetch
  };
}
