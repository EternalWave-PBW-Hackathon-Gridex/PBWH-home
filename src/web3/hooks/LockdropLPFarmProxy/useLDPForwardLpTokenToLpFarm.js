import React from "react";
import { ethers } from "ethers";
import useSendTransaction from "../useSendTransaction";
import LockdropLPFarmProxyContract from "../../contracts/LockdropLPFarmProxyContract";
import useConstantProperties from "../useConstantProperties";
import { BN, isBNPositive, convertToETH } from "../../utils/AKBN";
import { ContractCallState } from "../../constants";
import Connector from "../../../context/WalletConnector/Connector";
import useTrxFeeConstants from "../useTrxFeeConstants";
import useTransaction from "../useTransaction";

export default function useLDPForwardLpTokenToLpFarm(onSuccess = () => {}) {
  const methodName = "forwardLpTokenToLpFarm";
  const { address } = Connector.useContainer();

  /** Gas */
  const [txFeeState, setTxFeeState] = React.useState(ContractCallState.NEW);
  const [gasUnit, setGasUnit] = React.useState(null);
  const [gasPrice, setGasPrice] = React.useState(null);

  const fetchTxFee = async () => {
    try {
      const gasUnit = LockdropLPFarmProxyContract.estimateGas[methodName]({
        from: address
      });
      const gasPrice = LockdropLPFarmProxyContract.provider
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
    useTransaction(LockdropLPFarmProxyContract, methodName, onSuccess);

  return {
    /** Tx Fee */
    forwardLpTokenToLpFarmTxFeeState: txFeeState,
    forwardLpTokenToLpFarmGasUnit: gasUnit,
    forwardLpTokenToLpFarmGasPrice: gasPrice,
    isCallSuccessForwardLpTokenToLpFarmTxFee: isCallSuccess,
    isLoadingForwardLpTokenToLpFarmTxFee: isLoadingTxFee,
    fetchForwardLpTokenToLpFarmTxFee: fetchTxFee,
    displayForwardLpTokenToLpFarmTxFee: display,
    setForwardLpTokenToLpFarmTxFeeLoading: setTxFeeLoading,

    /** Tx */
    forwardLpTokenToLpFarmTxState: state,
    forwardLpTokenToLpFarmTxHash: txHash,
    forwardLpTokenToLpFarmTxReceipt: txReceipt,
    isLoadingForwardLpTokenToLpFarmTx: isLoading,
    fetchForwardLpTokenToLpFarmTx: fetchTransaction
  };
}
