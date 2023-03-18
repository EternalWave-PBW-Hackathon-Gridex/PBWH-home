import React from "react";
import { ethers } from "ethers";
import LockdropContract from "../../../contracts/LockdropContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLDTotalDeposit(fromAddress) {
  /** totalDeposit */
  const [totalDeposit, setTotalDeposit] = React.useState(null);
  const [totalDepositState, setTotalDepositState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setTotalDepositState(ContractCallState.FETCHING);
      let totalDeposit = await LockdropContract.totalDeposit({
        from: fromAddress
      });

      setTotalDepositState(ContractCallState.SUCCESS);
      setTotalDeposit(ethers.utils.formatEther(totalDeposit));
    } catch (error) {
      console.error(error.message);
      setTotalDepositState(ContractCallState.ERROR);
      setTotalDeposit(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(totalDepositState);
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(totalDeposit, isCallSuccess);

  return {
    totalDeposit,
    isLoadingTotalDeposit: isLoading,
    isCallSuccessTotalDeposit: isCallSuccess,
    isValidTotalDeposit: isValid,
    isPositiveTotalDeposit: isPositive,

    displayTotalDeposit: display,
    fetchTotalDeposit: fetch
  };
}
