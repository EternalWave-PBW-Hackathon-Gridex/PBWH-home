import React from "react";
import { ethers } from "ethers";
import LockdropLPFarmProxyContract from "../../../contracts/LockdropLPFarmProxyContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLDPWithdrawableLP(fromAddress) {
  /** withdrawableLP */
  const [withdrawableLP, setWithdrawableLP] = React.useState(null);
  const [withdrawableLPState, setWithdrawableLPState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setWithdrawableLPState(ContractCallState.FETCHING);
      let withdrawableLP =
        await LockdropLPFarmProxyContract.getWithdrawableLPTokenAmount({
          from: fromAddress
        });

      setWithdrawableLPState(ContractCallState.SUCCESS);
      setWithdrawableLP(ethers.utils.formatEther(withdrawableLP));
    } catch (error) {
      console.error(error.message);
      setWithdrawableLPState(ContractCallState.ERROR);
      setWithdrawableLP(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(withdrawableLPState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(withdrawableLP, isCallSuccess);

  return {
    withdrawableLP,
    isLoadingWithdrawableLP: isLoading,
    isCallSuccessWithdrawableLP: isCallSuccess,
    isValidWithdrawableLP: isValid,
    isPositiveWithdrawableLP: isPositive,
    numberedWithdrawableLP: numbered,

    displayWithdrawableLP: display,
    fetchWithdrawableLP: fetch
  };
}
