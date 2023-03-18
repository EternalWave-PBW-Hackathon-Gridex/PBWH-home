import React from "react";
import { ethers } from "ethers";
import useSendTransaction from "../useSendTransaction";

export default function useERC20Approve(tokenContract) {
  const trxName = "approve";
  const { state, txHash, txReceipt, isLoading, sendTransaction } =
    useSendTransaction(trxName);

  const fetchApprove = async (contractAddress) => {
    try {
      const txData = {
        to: tokenContract.address,
        data: tokenContract.interface.encodeFunctionData(trxName, [
          contractAddress,
          ethers.utils.parseUnits(`${Number.MAX_SAFE_INTEGER}`, "ether")
        ])
      };
      await sendTransaction(txData);
    } catch (trxError) {
      console.error(trxError);
    }
  };

  return {
    state,
    txHash,
    txReceipt,
    isLoadingApproveTrx: isLoading,
    fetchApprove
  };
}
