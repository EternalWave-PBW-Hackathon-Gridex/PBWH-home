import React from "react";
import { ethers } from "ethers";
import LockdropContract from "../../../contracts/LockdropContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLDWithdrawableMESH(fromAddress) {
  /** withdrawableMESH */
  const [withdrawableMESH, setWithdrawableMESH] = React.useState(null);
  const [withdrawableMESHState, setWithdrawableMESHState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setWithdrawableMESHState(ContractCallState.FETCHING);
      let withdrawableMESH = await LockdropContract.getWithdrawableMESHAmount({
        from: fromAddress
      });

      setWithdrawableMESHState(ContractCallState.SUCCESS);
      setWithdrawableMESH(ethers.utils.formatEther(withdrawableMESH));
    } catch (error) {
      console.error(error.message);
      setWithdrawableMESHState(ContractCallState.ERROR);
      setWithdrawableMESH(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    withdrawableMESHState
  );
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(withdrawableMESH, isCallSuccess);

  return {
    withdrawableMESH,
    isLoadingWithdrawableMESH: isLoading,
    isCallSuccessWithdrawableMESH: isCallSuccess,
    isValidWithdrawableMESH: isValid,
    isPositiveWithdrawableMESH: isPositive,

    displayWithdrawableMESH: display,
    fetchWithdrawableMESH: fetch
  };
}
