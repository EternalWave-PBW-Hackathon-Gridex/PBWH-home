import React from "react";
import { ethers } from "ethers";
import XSHOFarmContract from "../../../contracts/XSHOFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import { BN_FORMAT } from "../../../utils/AKBN";

export default function useXSFStakedXSHO(fromAddress) {
  /** stakedXSHO */
  const [stakedXSHO, setStakedXSHO] = React.useState(null);
  const [stakedXSHOState, setStakedXSHOState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setStakedXSHOState(ContractCallState.FETCHING);
      let stakedXSHO = await XSHOFarmContract.getStakedXSHO(fromAddress, {
        from: fromAddress
      });

      setStakedXSHOState(ContractCallState.SUCCESS);
      setStakedXSHO(ethers.utils.formatEther(stakedXSHO));
    } catch (error) {
      console.error(error.message);
      setStakedXSHOState(ContractCallState.ERROR);
      setStakedXSHO(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(stakedXSHOState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(stakedXSHO, isCallSuccess);

  const displayVXSHOPerDay = React.useMemo(() => {
    if (!isPositive) return "-";
    return bn.times(0.014).times(24).decimalPlaces(6).toFormat(BN_FORMAT);
  }, [isPositive, bn]);

  return {
    stakedXSHO,
    stakedXSHOBN: bn,
    isLoadingStakedXSHO: isLoading,
    isCallSuccessStakedXSHO: isCallSuccess,
    isValidStakedXSHO: isValid,
    isPositiveStakedXSHO: isPositive,
    numberedStakedXSHO: numbered,

    displayStakedXSHO: display,
    displayNumberFormatStakedXSHO: displayNumberFormat,
    displayVXSHOPerDay,
    fetchStakedXSHO: fetch
  };
}
