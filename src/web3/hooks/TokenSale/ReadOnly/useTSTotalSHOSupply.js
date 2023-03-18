import React from "react";
import { ethers } from "ethers";
import TokenSaleContract from "../../../contracts/TokenSaleContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useTSTotalSHOSupply(fromAddress) {
  /** totalSHOSupply */
  const [totalSHOSupply, setTotalSHOSupply] = React.useState(null);
  const [totalSHOSupplyState, setTotalSHOSupplyState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setTotalSHOSupplyState(ContractCallState.FETCHING);
      let totalSHOSupply = await TokenSaleContract.TOTAL_SHO_SUPPLY({
        from: fromAddress
      });

      setTotalSHOSupplyState(ContractCallState.SUCCESS);
      setTotalSHOSupply(ethers.utils.formatEther(totalSHOSupply));
    } catch (error) {
      console.error(error.message);
      setTotalSHOSupplyState(ContractCallState.ERROR);
      setTotalSHOSupply(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(totalSHOSupplyState);
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(totalSHOSupply, isCallSuccess);

  return {
    totalSHOSupply,
    totalSHOSupplyBN: bn,
    isLoadingTotalSHOSupply: isLoading,
    isCallSuccessTotalSHOSupply: isCallSuccess,
    isValidTotalSHOSupply: isValid,
    isPositiveTotalSHOSupply: isPositive,

    displayTotalSHOSupply: display,
    fetchTotalSHOSupply: fetch
  };
}
