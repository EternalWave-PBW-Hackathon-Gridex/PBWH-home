import React from "react";
import { ethers } from "ethers";
import { MSLPContract } from "../../../contracts/MSExchangeContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useMSETotalSupply(fromAddress) {
  /** totalSupply */
  const [totalSupply, setTotalSupply] = React.useState(null);
  const [totalSupplyState, setTotalSupplyState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (exchangeContractAddress) => {
    try {
      setTotalSupplyState(ContractCallState.FETCHING);
      let totalSupply = await MSLPContract(exchangeContractAddress).totalSupply(
        {
          from: fromAddress
        }
      );

      setTotalSupplyState(ContractCallState.SUCCESS);
      setTotalSupply(ethers.utils.formatEther(totalSupply));
    } catch (error) {
      console.error(error.message);
      setTotalSupplyState(ContractCallState.ERROR);
      setTotalSupply(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(totalSupplyState);

  const { bn, isValid, isPositive, numbered, display } =
    useNumericTokenConstants(totalSupply, isCallSuccess);

  return {
    totalSupply,
    totalSupplyBN: bn,
    isLoadingTotalSupply: isLoading,
    isCallSuccessTotalSupply: isCallSuccess,
    isValidTotalSupply: isValid,
    isPositiveTotalSupply: isPositive,
    numberedTotalSupply: numbered,

    displayTotalSupply: display,
    fetchTotalSupply: fetch
  };
}
