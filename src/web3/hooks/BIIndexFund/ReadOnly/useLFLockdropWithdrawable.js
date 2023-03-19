import React from "react";
import { ethers } from "ethers";
import LPFarmContract from "../../../contracts/LPFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLFLockdropWithdrawable(fromAddress) {
  /** lockdropWithdrawableAmount */
  const [lockdropWithdrawableAmount, setLockdropWithdrawableAmount] =
    React.useState(null);
  const [lockdropWithdrawableAmountState, setLockdropWithdrawableAmountState] =
    React.useState(ContractCallState.NEW);

  const fetch = async (address) => {
    try {
      setLockdropWithdrawableAmountState(ContractCallState.FETCHING);
      let lockdropWithdrawableAmount =
        await LPFarmContract.lockdropWithdrawable(address, {
          from: fromAddress
        });

      setLockdropWithdrawableAmountState(ContractCallState.SUCCESS);
      setLockdropWithdrawableAmount(
        ethers.utils.formatEther(lockdropWithdrawableAmount[1])
      );
    } catch (error) {
      console.error(error.message);
      setLockdropWithdrawableAmountState(ContractCallState.ERROR);
      setLockdropWithdrawableAmount(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    lockdropWithdrawableAmountState
  );
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(lockdropWithdrawableAmount, isCallSuccess);

  return {
    lockdropWithdrawableAmount,
    isLoadingLockdropWithdrawableAmount: isLoading,
    isCallSuccessLockdropWithdrawableAmount: isCallSuccess,
    isValidLockdropWithdrawableAmount: isValid,
    isPositiveLockdropWithdrawableAmount: isPositive,

    displayLockdropWithdrawableAmount: display,
    fetchLockdropWithdrawableAmount: fetch
  };
}
