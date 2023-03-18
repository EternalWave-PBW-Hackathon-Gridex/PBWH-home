import React from "react";
import LPFarmContract from "../../contracts/LPFarmContract";
import useConstantProperties from "../useConstantProperties";
import { ContractCallState } from "../../constants";
import useTrxFeeConstants from "../useTrxFeeConstants";
import useTransaction from "../useTransaction";

export default function useLFWithdrawLockdropLP(
  fromAddress,
  onSuccess = () => {}
) {
  const methodName = "withdrawLockdropLPTokens";

  /** Gas */
  const [txFeeState, setTxFeeState] = React.useState(ContractCallState.NEW);
  const [gasUnit, setGasUnit] = React.useState(null);
  const [gasPrice, setGasPrice] = React.useState(null);

  const fetchTxFee = async () => {
    try {
      const gasUnit = LPFarmContract.estimateGas[methodName]({
        from: fromAddress
      });
      const gasPrice = LPFarmContract.provider
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
    useTransaction(LPFarmContract, methodName, onSuccess);

  return {
    /** Tx Fee */
    withdrawLPTxFeeState: txFeeState,
    withdrawGasUnit: gasUnit,
    withdrawGasPrice: gasPrice,
    isCallSuccessWithdrawLPTxFee: isCallSuccess,
    isLoadingWithdrawLPTxFee: isLoadingTxFee,
    fetchWithdrawLPTxFee: fetchTxFee,
    displayWithdrawLPTxFee: display,
    setWithdrawLPTxFeeLoading: setTxFeeLoading,

    /** Tx */
    withdrawLPTxState: state,
    withdrawLPTxHash: txHash,
    withdrawLPTxReceipt: txReceipt,
    isLoadingWithdrawLPTx: isLoading,
    fetchWithdrawLPTx: fetchTransaction
  };
}
