import React from "react";
import { ethers } from "ethers";
import ShogunVoterContract from "../../../contracts/ShogunVoterContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSVAvailableVotes(fromAddress) {
  /** availableVotes */
  const [availableVotes, setAvailableVotes] = React.useState(null);
  const [availableVotesState, setAvailableVotesState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setAvailableVotesState(ContractCallState.FETCHING);
      let availableVotes = await ShogunVoterContract.availableVotes(
        fromAddress,
        {
          from: fromAddress
        }
      );

      setAvailableVotesState(ContractCallState.SUCCESS);
      setAvailableVotes(availableVotes.toString());
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
    fetchAvailableVotes: fetch
  };
}
