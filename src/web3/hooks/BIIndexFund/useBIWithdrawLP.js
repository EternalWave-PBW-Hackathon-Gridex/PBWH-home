import React from "react";
import BIIndexFundContract from "../../contracts/BIIndexFundContract";
import Connector from "../../../context/WalletConnector/Connector";
import useTransaction from "../useTransaction";
import useTrxFeeConstants from "../useTrxFeeConstants";
import { ContractCallState } from "../../constants";
import useConstantProperties from "../useConstantProperties";

export default function useBIWithdrawLP() {
  const methodName = "removeLiquidityWithLimit";
  const { address } = Connector.useContainer();

  /** TxFee */
  const [txFeeState, setTxFeeState] = React.useState(ContractCallState.NEW);
  const [gasUnit, setGasUnit] = React.useState(null);
  const [gasPrice, setGasPrice] = React.useState(null);

  const fetchTrxFee = async (...args) => {
    try {
      const gasUnit = BIIndexFundContract.estimateGas[methodName](...args, {
        from: address
      });
      const gasPrice = BIIndexFundContract.provider
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
    isLoading: isLoadingTx,
    fetchTransaction
  } = useTransaction(BIIndexFundContract, methodName);

  /** Helpers */
  const isValidTx = React.useMemo(() => {
    return isCallSuccess && !isLoadingTx;
  }, [isCallSuccess, isLoadingTx]);

  return {
    /** Tx Fee */
    isCallSuccessWithdrawLPTxFee: isCallSuccess,
    isLoadingWithdrawLPTxFee: isLoadingTxFee,
    fetchWithdrawLPTxFee: fetchTrxFee,
    displayWithdrawLPTxFee: display,
    setWithdrawLPTxFeeLoading: setLoading,

    /** Tx */
    isLoadingWithdrawLPTx: isLoadingTx,
    fetchWithdrawLPTx: fetchTransaction,

    /** Helpers */
    isValidWithdrawLPTx: isValidTx
  };
}
