import React from "react";
import { ethers } from "ethers";
import SHOFarmContract from "../../../contracts/SHOFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSFXSHOExchangeRate(fromAddress) {
  /** xSHOExchangeRate */
  const [xSHOExchangeRate, setXSHOExchangeRate] = React.useState(null);
  const [xSHOExchangeRateState, setXSHOExchangeRateState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setXSHOExchangeRateState(ContractCallState.FETCHING);
      let xSHOExchangeRate = await SHOFarmContract.getxSHOExchangeRate({
        from: fromAddress
      });

      setXSHOExchangeRateState(ContractCallState.SUCCESS);
      setXSHOExchangeRate(
        ethers.utils.formatUnits(xSHOExchangeRate.toString(), 7)
      );
    } catch (error) {
      console.error(error.message);
      setXSHOExchangeRateState(ContractCallState.ERROR);
      setXSHOExchangeRate(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    xSHOExchangeRateState
  );
  const { bn, isValid, isPositive, numbered, displayNumberFormat } =
    useNumericTokenConstants(xSHOExchangeRate, isCallSuccess);

  const displayXSHOExchangeRate = React.useMemo(() => {
    if (!isPositive) return "-";
    return xSHOExchangeRate;
  }, [isPositive, xSHOExchangeRate]);

  return {
    xSHOExchangeRate,
    xSHOExchangeRateBN: bn,
    isLoadingXSHOExchangeRate: isLoading,
    isCallSuccessXSHOExchangeRate: isCallSuccess,
    isValidXSHOExchangeRate: isValid,
    isPositiveXSHOExchangeRate: isPositive,
    numberedXSHOExchangeRate: numbered,

    displayXSHOExchangeRate,
    fetchXSHOExchangeRate: fetch
  };
}
