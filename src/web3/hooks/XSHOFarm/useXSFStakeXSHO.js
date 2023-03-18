import React from "react";
import XSHOFarmContract from "../../contracts/XSHOFarmContract";
import Connector from "../../../context/WalletConnector/Connector";
import useTransaction from "../useTransaction";
import useTrxFeeConstants from "../useTrxFeeConstants";
import { ContractCallState } from "../../constants";
import useConstantProperties from "../useConstantProperties";

export default function useXSFStakeXSHO() {
  const methodName = "stake";
  const { address } = Connector.useContainer();

  /** TxFee */
  const [txFeeState, setTxFeeState] = React.useState(ContractCallState.NEW);
  const [gasUnit, setGasUnit] = React.useState(null);
  const [gasPrice, setGasPrice] = React.useState(null);

  const fetchTrxFee = async (...args) => {
    try {
      const gasUnit = XSHOFarmContract.estimateGas[methodName](...args, {
        from: address
      });
      const gasPrice = XSHOFarmContract.provider
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
  } = useTransaction(XSHOFarmContract, methodName);

  /** Helpers */
  const isValidTx = React.useMemo(() => {
    return isCallSuccess && !isLoadingTx;
  }, [isCallSuccess, isLoadingTx]);

  return {
    /** Tx Fee */
    isCallSuccessStakeXSHOTxFee: isCallSuccess,
    isLoadingStakeXSHOTxFee: isLoadingTxFee,
    fetchStakeXSHOTxFee: fetchTrxFee,
    displayStakeXSHOTxFee: display,
    setStakeXSHOTxFeeLoading: setLoading,

    /** Tx */
    isLoadingStakeXSHOTx: isLoadingTx,
    fetchStakeXSHOTx: fetchTransaction,

    /** Helpers */
    isValidStakeXSHOTx: isValidTx
  };
}
