import React from "react";
import { ethers } from "ethers";
import ShogunVoterContract from "../../../contracts/ShogunVoterContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSVUserPoolVotes(fromAddress) {
  /** userPoolVotes */
  const [userPoolVotes, setUserPoolVotes] = React.useState(null);
  const [userPoolVotesState, setUserPoolVotesState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setUserPoolVotesState(ContractCallState.FETCHING);
      let userPoolVotes = await ShogunVoterContract.getUserPoolVotes(
        fromAddress,
        {
          from: fromAddress
        }
      );

      setUserPoolVotesState(ContractCallState.SUCCESS);
      setUserPoolVotes(userPoolVotes);
    } catch (error) {
      console.error(error.message);
      setUserPoolVotesState(ContractCallState.ERROR);
      setUserPoolVotes(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(userPoolVotesState);

  const isValidUserPoolVotes = React.useMemo(() => {
    return isCallSuccess && Array.isArray(userPoolVotes);
  }, [isCallSuccess, userPoolVotes]);

  const displayUserPoolVotes = React.useMemo(() => {
    if (!isValidUserPoolVotes) return [];
    return userPoolVotes.map((userPoolVote) => {
      return {
        // ...userPoolVote,
        address: userPoolVote.pool,
        vxSHOAmount: userPoolVote.vxSHOAmount.toString()
      };
    });
  }, [isValidUserPoolVotes, userPoolVotes]);

  return {
    userPoolVotes,
    isLoadingUserPoolVotes: isLoading,
    isCallSuccessUserPoolVotes: isCallSuccess,
    isValidUserPoolVotes,
    displayUserPoolVotes,
    fetchUserPoolVotes: fetch
  };
}
