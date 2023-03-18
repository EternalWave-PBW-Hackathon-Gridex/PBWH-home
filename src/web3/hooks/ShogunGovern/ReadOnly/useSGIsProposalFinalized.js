import React from "react";
import { ethers } from "ethers";
import ShogunGovernContract from "../../../contracts/ShogunGovernContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useBooleanValueConstants from "../../useBooleanValueConstants";

export default function useSGIsProposalFinalized(fromAddress) {
  /** isProposalFinalized */
  const [isProposalFinalized, setIsProposalFinalized] = React.useState(null);
  const [isProposalFinalizedState, setIsProposalFinalizedState] =
    React.useState(ContractCallState.NEW);

  const fetch = async (id) => {
    try {
      setIsProposalFinalizedState(ContractCallState.FETCHING);
      let isProposalFinalized = await ShogunGovernContract.isProposalFinalized(
        id
      );

      setIsProposalFinalizedState(ContractCallState.SUCCESS);
      setIsProposalFinalized(isProposalFinalized);
    } catch (error) {
      console.error(error.message);
      setIsProposalFinalizedState(ContractCallState.ERROR);
      setIsProposalFinalized(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    isProposalFinalizedState
  );
  const { value, isValid } = useBooleanValueConstants(
    isProposalFinalized,
    isCallSuccess
  );

  return {
    isProposalFinalized: value,
    isLoadingIsProposalFinalized: isLoading,
    isCallSuccessIsProposalFinalized: isCallSuccess,
    isValidIsProposalFinalized: isValid,

    fetchIsProposalFinalized: fetch
  };
}
