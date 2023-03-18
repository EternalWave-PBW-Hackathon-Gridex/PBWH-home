import React from "react";
import { ethers } from "ethers";
import useSendTransaction from "../useSendTransaction";
import LockdropContract from "../../contracts/LockdropContract";
import useConstantProperties from "../useConstantProperties";
import { BN, isBNPositive, convertToETH } from "../../utils/AKBN";
import { ContractCallState } from "../../constants";
import Connector from "../../../context/WalletConnector/Connector";
import useTrxFeeConstants from "../useTrxFeeConstants";
import useTransaction from "../useTransaction";

export default function useLDWithdrawMESH(onSuccess = () => {}) {
  const methodName = "withdraw";
  const { address } = Connector.useContainer();

  /** Gas */
  const [txFeeState, setTxFeeState] = React.useState(ContractCallState.NEW);
  const [gasUnit, setGasUnit] = React.useState(null);
  const [gasPrice, setGasPrice] = React.useState(null);

  const fetchTxFee = async (amount) => {
    try {
      const gasUnit = LockdropContract.estimateGas[methodName](amount, {
        from: address
      });
      const gasPrice = LockdropContract.provider
        .getGasPrice()
        .then((res) => res.toNumber());

      setTxFeeState(ContractCallState.FETCHING);
      const gasInfo = await Promise.all([gasUnit, gasPrice]);
      setGasUnit(gasInfo[0].toNumber());
      setGasPrice(gasInfo[1]);
      setTxFeeState(ContractCallState.SUCCESS);
    } catch (error) {
      console.error(error);
      setTxFeeState(ContractCallState.ERROR);
      setGasUnit(null);
      setGasPrice(null);
    }
  };

  const { isCallSuccess, isLoading: isLoadingTxFee } =
    useConstantProperties(txFeeState);

  const { txFeeBN, isValid, isPositive, display } = useTrxFeeConstants(
    gasUnit,
    gasPrice,
    txFeeState
  );

  const setTxFeeLoading = () => {
    setTxFeeState(ContractCallState.FETCHING);
  };

  /** Transaction */
  const { state, txHash, txReceipt, isLoading, fetchTransaction } =
    useTransaction(LockdropContract, methodName, onSuccess);

  return {
    /** Tx Fee */
    withdrawMESHTxFeeState: txFeeState,
    withdrawGasUnit: gasUnit,
    withdrawGasPrice: gasPrice,
    isCallSuccessWithdrawMESHTxFee: isCallSuccess,
    isLoadingWithdrawMESHTxFee: isLoadingTxFee,
    fetchWithdrawMESHTxFee: fetchTxFee,
    displayWithdrawMESHTxFee: display,
    setWithdrawMESHTxFeeLoading: setTxFeeLoading,

    /** Tx */
    withdrawMESHTxState: state,
    withdrawMESHTxHash: txHash,
    withdrawMESHTxReceipt: txReceipt,
    isLoadingWithdrawMESHTx: isLoading,
    fetchWithdrawMESHTx: fetchTransaction
  };
}
