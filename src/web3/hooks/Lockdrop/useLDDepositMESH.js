import React from "react";
import LockdropContract from "../../contracts/LockdropContract";
import Connector from "../../../context/WalletConnector/Connector";
import useTransaction from "../useTransaction";
import useTrxFeeConstants from "../useTrxFeeConstants";
import { ContractCallState } from "../../constants";
import useConstantProperties from "../useConstantProperties";

export default function useLDDepositMESH() {
  const methodName = "deposit";
  const { address } = Connector.useContainer();

  /** TxFee */
  const [txFeeState, setTxFeeState] = React.useState(ContractCallState.NEW);
  const [gasUnit, setGasUnit] = React.useState(null);
  const [gasPrice, setGasPrice] = React.useState(null);

  const fetchTrxFee = async (...args) => {
    try {
      const gasUnit = LockdropContract.estimateGas[methodName](...args, {
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

  const setLoading = () => {
    setTxFeeState(ContractCallState.FETCHING);
  };

  /** Transaction */
  const {
    state,
    txHash,
    txReceipt,
    isLoading: isLoadingDepositMESHTx,
    fetchTransaction: fetchDepositMESHTx
  } = useTransaction(LockdropContract, methodName);

  return {
    /** Tx Fee */
    isCallSuccessDepositMESHTxFee: isCallSuccess,
    isLoadingDepositMESHTxFee: isLoadingTxFee,
    fetchDepositMESHTxFee: fetchTrxFee,
    displayDepositMESHTxFee: display,
    setDepositMESHTxFeeLoading: setLoading,

    /** Tx */
    isLoadingDepositMESHTx,
    fetchDepositMESHTx
  };
}
