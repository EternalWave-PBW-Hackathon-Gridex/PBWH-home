import React from "react";
import { ethers } from "ethers";
import ShogunGovernContract from "../../../contracts/ShogunGovernContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSGAvailableVotes(fromAddress) {
  /** availableVotes */
  const [availableVotes, setAvailableVotes] = React.useState(null);
  const [availableVotesState, setAvailableVotesState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (id) => {
    try {
      setAvailableVotesState(ContractCallState.FETCHING);
      let availableVotes = await ShogunGovernContract.userAvailableVote(
        id,
        fromAddress,
        {
          from: fromAddress
        }
      );

      setAvailableVotesState(ContractCallState.SUCCESS);
      setAvailableVotes(ethers.utils.formatEther(availableVotes));
    } catch (error) {
      console.error(error.message);
      setAvailableVotesState(ContractCallState.ERROR);
      setAvailableVotes(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(availableVotesState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(availableVotes, isCallSuccess);

  return {
    availableVotes,
    availableVotesBN: bn,
    isLoadingAvailableVotes: isLoading,
    isCallSuccessAvailableVotes: isCallSuccess,
    isValidAvailableVotes: isValid,
    isPositiveAvailableVotes: isPositive,
    numberedAvailableVotes: numbered,

    displayAvailableVotes: display,
    displayNumberFormatAvailableVotes: displayNumberFormat,
    fetchAvailableVotes: fetch
  };
}
