import React from "react";
import useERC20Allowance from "./useERC20Allowance";
import useERC20Balance from "./useERC20Balance";
import useERC20Approve from "./useERC20Approve";

export default function useERC20(tokenContract) {
  const {
    balance,
    balanceState,
    isLoadingBalance,
    isCallSuccessBalance,

    balanceBN,
    isValidBalance,
    isPositiveBalance,
    displayBalance,
    displayNumberFormatBalance,

    fetchBalance
  } = useERC20Balance(tokenContract);
  const {
    allowance,
    allowanceState,
    isLoadingAllowance,
    isAllowanceCallSuccess,
    allowanceBN,
    isValidAllowance,
    isApproved,
    displayAllowance,
    displayNumberFormatAllowance,

    fetchAllowance
  } = useERC20Allowance(tokenContract);
  const { state, txHash, txReceipt, isLoadingApproveTrx, fetchApprove } =
    useERC20Approve(tokenContract);
  /** Helpers */
  const isValidApproveTransaction = React.useMemo(() => {
    return !isLoadingApproveTrx && isAllowanceCallSuccess && !isApproved;
  }, [isLoadingApproveTrx, isAllowanceCallSuccess, isApproved]);

  const isLoadingApproveButton = React.useMemo(() => {
    return isLoadingApproveTrx || isLoadingAllowance;
  }, [isLoadingApproveTrx, isLoadingAllowance]);

  const isValidTxInERC20 = React.useMemo(() => {
    return isPositiveBalance && isApproved;
  }, [isPositiveBalance, isApproved]);

  return {
    // Balance
    balance,
    balanceState,
    isLoadingBalance,
    isCallSuccessBalance,

    balanceBN,
    isValidBalance,
    isPositiveBalance,
    displayBalance,
    displayNumberFormatBalance,

    fetchBalance,

    // Allowance
    allowance,
    allowanceState,
    isLoadingAllowance,
    isAllowanceCallSuccess,
    allowanceBN,
    isValidAllowance,
    isApproved,
    displayAllowance,
    displayNumberFormatAllowance,
    fetchAllowance,

    // Approve
    state,
    txHash,
    txReceipt,
    isLoadingApproveTrx,
    fetchApprove,

    // Helpers
    isValidApproveTransaction,
    isLoadingApproveButton,
    isValidTxInERC20
  };
}
