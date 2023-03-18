import React from "react";
import { ethers } from "ethers";
import { MSViewContract } from "../../../contracts/MSExchangeContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useMSECurrentPool(fromAddress) {
  /** currentPool */
  const [currentPool, setCurrentPool] = React.useState(null);
  const [currentPoolState, setCurrentPoolState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (exchangeContractAddress) => {
    try {
      setCurrentPoolState(ContractCallState.FETCHING);
      let currentPool = await MSViewContract.getPoolData(
        exchangeContractAddress,
        {
          from: fromAddress
        }
      );

      setCurrentPoolState(ContractCallState.SUCCESS);
      setCurrentPool(currentPool);
    } catch (error) {
      console.error(error.message);
      setCurrentPoolState(ContractCallState.ERROR);
      setCurrentPool(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(currentPoolState);

  const symbolACurrentPool = React.useMemo(() => {
    return currentPool?.reserveA
      ? ethers.utils.formatEther(currentPool?.reserveA)
      : undefined;
  }, [currentPool]);

  const {
    bn: symbolACurrentPoolBN,
    isValid: isValidSymbolACurrentPool,
    isPositive: isPositiveSymbolACurrentPool,
    numbered: symbolATotalCount
  } = useNumericTokenConstants(symbolACurrentPool, isCallSuccess);

  const symbolBCurrentBool = React.useMemo(() => {
    return currentPool?.reserveB
      ? ethers.utils.formatEther(currentPool?.reserveB)
      : undefined;
  }, [currentPool]);

  const {
    bn: symbolBCurrentPoolBN,
    isValid: isValidSymbolBCurrentPool,
    isPositive: isPositiveSymbolBCurrentPool,
    numbered: symbolBTotalCount
  } = useNumericTokenConstants(symbolBCurrentBool, isCallSuccess);

  const isValidCurrentPool = React.useMemo(() => {
    return isPositiveSymbolACurrentPool && isPositiveSymbolBCurrentPool;
  }, [isPositiveSymbolACurrentPool, isPositiveSymbolBCurrentPool]);

  return {
    currentPool,
    isLoadingCurrentPool: isLoading,
    isCallSuccessCurrentPool: isCallSuccess,
    isValidCurrentPool,
    symbolATotalCount,
    symbolBTotalCount,
    symbolACurrentPoolBN,
    symbolBCurrentPoolBN,
    fetchCurrentPool: fetch
  };
}
