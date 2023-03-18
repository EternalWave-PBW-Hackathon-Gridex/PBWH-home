import React from "react";
import { ethers } from "ethers";
import ShogunGovernContract from "../../../contracts/ShogunGovernContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSGTotalVXSHOSupply(fromAddress) {
  /** totalVXSHOSupply */
  const [totalVXSHOSupply, setTotalVXSHOSupply] = React.useState(null);
  const [totalVXSHOSupplyState, setTotalVXSHOSupplyState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (id) => {
    try {
      setTotalVXSHOSupplyState(ContractCallState.FETCHING);
      let totalVXSHOSupply =
        await ShogunGovernContract.totalVxSHOSupplyOfProposal(id);

      setTotalVXSHOSupplyState(ContractCallState.SUCCESS);
      setTotalVXSHOSupply(ethers.utils.formatEther(totalVXSHOSupply));
    } catch (error) {
      console.error(error.message);
      setTotalVXSHOSupplyState(ContractCallState.ERROR);
      setTotalVXSHOSupply(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    totalVXSHOSupplyState
  );
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(totalVXSHOSupply, isCallSuccess);

  return {
    totalVXSHOSupply,
    totalVXSHOSupplyBN: bn,
    isLoadingTotalVXSHOSupply: isLoading,
    isCallSuccessTotalVXSHOSupply: isCallSuccess,
    isValidTotalVXSHOSupply: isValid,
    isPositiveTotalVXSHOSupply: isPositive,
    numberedTotalVXSHOSupply: numbered,

    displayTotalVXSHOSupply: display,
    displayNumberFormatTotalVXSHOSupply: displayNumberFormat,
    fetchTotalVXSHOSupply: fetch
  };
}
