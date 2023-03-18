import React from "react";
import { calculateGasMargin } from "../utils/calculateGasMargin";
import Connector from "../../context/WalletConnector/Connector";
import { ethers } from "ethers";
import useSigmaSnackbar from "../../hooks/useSigmaSnackbar";

export const TransactionState = {
  NEW: "NEW",
  FEEING: "FEEING",
  SIGNING: "SIGNING",
  CONFIRMING: "CONFIRMING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  DENIED: "DENIED"
};

export default function useSendTransaction(trxName = null) {
  let { connectWallet, signer } = Connector.useContainer();

  const { showSnackbar } = useSigmaSnackbar();

  const [state, setState] = React.useState(TransactionState.NEW);
  const [txHash, setTxHash] = React.useState("");
  const [txReceipt, setTxReceipt] = React.useState(null);

  const sendTransaction = async (transactionData, callback) => {
    if (!signer) {
      connectWallet();
      return;
    }
    resetStates();
    try {
      const txNoGasLimit = {
        to: transactionData.to,
        value: transactionData.valueToSend
          ? ethers.BigNumber.from(transactionData.valueToSend)
          : null,
        data: transactionData.data
      };
      setState(TransactionState.FEEING);
      // showSnackbar.info(
      //   `Calculating ${trxName ? `${trxName} ` : ""}transaction fee`
      // );
      let estimateGas = await signer.estimateGas(txNoGasLimit);
      const gasLimit = calculateGasMargin(estimateGas);
      const tx = { ...txNoGasLimit, gasLimit }; // TODO test this works when firing off tx

      setState(TransactionState.SIGNING);
      showSnackbar.info(`Signing ${trxName ? `${trxName} ` : ""}transaction`);
      const res = await signer.sendTransaction(tx);
      setState(TransactionState.CONFIRMING);
      setTxHash(res.hash);
      showSnackbar.info(
        `Comfirming ${trxName ? `${trxName} ` : ""}transaction`,
        res.hash
      );
      const txReceipt = await res.wait();
      setTxReceipt(txReceipt);

      //tx was mined successfully
      if (txReceipt.status === 1) {
        setState(TransactionState.SUCCESS);
        showSnackbar.success(
          `Suceess ${trxName ? `${trxName} ` : ""}transaction`,
          res.hash
        );
        if (typeof callback === "function") callback();
      } else {
        resetStates();

        setState(TransactionState.FAILED);
        showSnackbar.fail(
          `Failed ${trxName ? `${trxName} ` : ""}transaction`,
          res.hash
        );
      }
    } catch (e) {
      console.log("Transaction Error", e);
      setState(TransactionState.DENIED);
      showSnackbar.fail(`Denied ${trxName ? `${trxName} ` : ""}transaction`);
      resetStates();
      throw e;
    }
  };

  const resetStates = () => {
    setState(TransactionState.NEW);
    setTxHash("");
    setTxReceipt(null);
  };

  const isLoading = React.useMemo(() => {
    return (
      state === TransactionState.FEEING ||
      state === TransactionState.SIGNING ||
      state === TransactionState.CONFIRMING
    );
  }, [state]);

  return {
    state,
    txHash,
    txReceipt,
    isLoading,
    sendTransaction
  };
}
