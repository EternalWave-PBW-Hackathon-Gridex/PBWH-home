import React from "react";
import {
  TestContract,
  ContractCallState
} from "../../web3/TestContract/TestContract";

import { ethers } from "ethers";

import {
  BN,
  convertToETH,
  isBNPositive,
  BN_FORMAT
} from "../../web3/utils/AKBN";
import useConstantProperties from "../../web3/hooks/useConstantProperties";

export default function useTestContract() {
  const [storeGasState, setStoreGasState] = React.useState(
    ContractCallState.NEW
  );
  const [storeGas, setStoreGas] = React.useState(null);
  const [storeGasPrice, setStoreGasPrice] = React.useState(null);

  const fetchStoreNumberGas = async () => {
    try {
      const storeGas = TestContract.estimateGas.store("1000000000000000000");
      const storeGasPrice = TestContract.provider
        .getGasPrice()
        .then((res) => res.toNumber());
      setStoreGasState(ContractCallState.FETCHING);
      const storeGasInfo = await Promise.all([storeGas, storeGasPrice]);
      setStoreGas(storeGasInfo[0].toNumber());
      setStoreGasPrice(storeGasInfo[1]);

      setStoreGasState(ContractCallState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStoreGasState(ContractCallState.ERROR);
      setStoreGas(null);
      setStoreGasPrice(null);
    }
  };

  const { isValid: isValidTxFee, isLoading: isLoadingTxFee } =
    useConstantProperties(storeGasState);

  const txFee = React.useMemo(() => {
    if (!isValidTxFee) return null;

    return storeGasPrice * storeGas;
  }, [isValidTxFee, storeGas, storeGasPrice]);

  const displayTxFee = React.useMemo(() => {
    const bn = BN(txFee);
    return isBNPositive(bn) && !bn.isNaN()
      ? convertToETH(bn).decimalPlaces(4).toString()
      : "-";
  }, [txFee]);

  /** number */
  const [number, setNumber] = React.useState(null);
  const [numberState, setNumberState] = React.useState(ContractCallState.NEW);
  const { isValid: isValidNumber, isLoading: isLoadingNumber } =
    useConstantProperties(numberState);

  const fetchNumber = async () => {
    try {
      setNumberState(ContractCallState.FETCHING);
      let number = await TestContract.number();
      setNumberState(ContractCallState.SUCCESS);
      setNumber(ethers.utils.formatEther(number));
    } catch (error) {
      console.error(error.message);
      setNumberState(ContractCallState.ERROR);
      setNumber(null);
    }
  };

  const displayNumber = React.useMemo(() => {
    if (!isValidNumber) return "-";
    return BN(number).decimalPlaces(4).toFormat(BN_FORMAT);
  }, [isValidNumber, number]);

  return {
    storeGas,
    storeGasPrice,
    isLoadingTxFee,
    displayTxFee,
    fetchStoreNumberGas,

    /** Constants */
    fetchNumber,
    isValidNumber,
    isLoadingNumber,
    displayNumber
  };
}
