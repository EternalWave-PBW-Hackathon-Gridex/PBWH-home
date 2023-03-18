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

export default function useLDClaimSHO(fromAddress, onSuccess = () => {}) {
  const methodName = "claimSHOTokens";

  /** Gas */
  const [txFeeState, setTxFeeState] = React.useState(ContractCallState.NEW);
  const [gasUnit, setGasUnit] = React.useState(null);
  const [gasPrice, setGasPrice] = React.useState(null);

  const fetchTxFee = async () => {
    try {
      const gasUnit = LockdropContract.estimateGas[methodName]({
        from: fromAddress
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
    claimSHOTxFeeState: txFeeState,
    claimSHOGasUnit: gasUnit,
    claimSHOGasPrice: gasPrice,
    isCallSuccessClaimSHOTxFee: isCallSuccess,
    isLoadingClaimSHOTxFee: isLoadingTxFee,
    fetchClaimSHOTxFee: fetchTxFee,
    displayClaimSHOTxFee: display,
    setClaimSHOTxFeeLoading: setTxFeeLoading,

    /** Tx */
    claimSHOTxState: state,
    claimSHOTxHash: txHash,
    claimSHOTxReceipt: txReceipt,
    isLoadingClaimSHOTx: isLoading,
    fetchClaimSHOTx: fetchTransaction
  };
}
