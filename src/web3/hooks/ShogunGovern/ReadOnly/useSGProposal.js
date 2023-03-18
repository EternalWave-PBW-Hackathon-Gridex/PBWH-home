import React from "react";
import ShogunGovernContract from "../../../contracts/ShogunGovernContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import { ethers } from "@web3-onboard/common/node_modules/ethers";
import { BN, BN_FORMAT, isBNPositive } from "../../../utils/AKBN";
dayjs.extend(duration);

const PROPOSAL_RESULT = {
  0: "Succedeed", // Pass the quorum, and For > Against.
  1: "Defeated", // Passed the quorum, but For <= Against.
  2: "Expired" // Didn't meet the quorum.
};

export default function useSGProposal(fromAddress) {
  /** proposal */
  const [proposal, setProposal] = React.useState(null);
  const [proposalState, setProposalState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } = useConstantProperties(proposalState);

  const fetch = async (id) => {
    try {
      setProposalState(ContractCallState.FETCHING);
      let proposal = await ShogunGovernContract.proposals(id);
      setProposalState(ContractCallState.SUCCESS);
      setProposal(proposal);
    } catch (error) {
      console.error(error.message);
      setProposalState(ContractCallState.ERROR);
      setProposal(null);
    }
  };

  /** startBlock */
  const startBlock = React.useMemo(() => {
    return proposal?.startBlock ? proposal?.startBlock.toString() : undefined;
  }, [proposal]);

  const {
    bn: startBlockBN,
    isValid: isValidStartBlock,
    isPositive: isPositiveStartBlock,
    numbered: numberedStartBlock
  } = useNumericTokenConstants(startBlock, isCallSuccess);

  /** endBlock */
  const endBlock = React.useMemo(() => {
    return proposal?.endBlock ? proposal?.endBlock.toString() : undefined;
  }, [proposal]);

  const {
    bn: endBlockBN,
    isValid: isValidEndBlock,
    isPositive: isPositiveEndBlock,
    numbered: numberedEndBlock
  } = useNumericTokenConstants(endBlock, isCallSuccess);

  /** Result */
  const resultIndex = React.useMemo(() => {
    return proposal?.result?.result ? proposal?.result?.result : undefined;
  }, [proposal]);

  const { bn: resultIndexBN, isValid: isValidResultIndex } =
    useNumericTokenConstants(resultIndex, isCallSuccess);

  const result = React.useMemo(() => {
    if (!isValidResultIndex) return PROPOSAL_RESULT[2];
    return PROPOSAL_RESULT[resultIndex];
  }, [isValidResultIndex, resultIndex]);

  /** forVotes */
  const forVotes = React.useMemo(() => {
    return proposal?.forVotes ? proposal?.forVotes.toString() : undefined;
  }, [proposal]);

  const {
    bn: forVotesBN,
    isValid: isValidForVotes,
    isPositive: isPositiveForVotes,
    numbered: numberedForVotes,
    display: displayForVotes
  } = useNumericTokenConstants(forVotes, isCallSuccess);

  /** againstVotes */
  const againstVotes = React.useMemo(() => {
    return proposal?.againstVotes
      ? proposal?.againstVotes.toString()
      : undefined;
  }, [proposal]);

  const {
    bn: againstVotesBN,
    isValid: isValidAgainstVotes,
    isPositive: isPositiveAgainstVotes,
    numbered: numberedAgainstVotes,
    display: displayAgainstVotes
  } = useNumericTokenConstants(againstVotes, isCallSuccess);

  const isValidTotalVotes = React.useMemo(() => {
    return isValidForVotes && isValidAgainstVotes;
  }, [isValidForVotes, isValidAgainstVotes]);

  const totalVotesBN = React.useMemo(() => {
    if (!isValidTotalVotes) return BN(0);
    return forVotesBN.plus(againstVotesBN);
  }, [forVotesBN, againstVotesBN, isValidTotalVotes]);

  const displayTotalVotes = React.useMemo(() => {
    if (!isValidTotalVotes) return "-";
    return forVotesBN.plus(againstVotesBN).toFormat(BN_FORMAT);
  }, [isValidTotalVotes, againstVotesBN]);

  const displayForVotesPercent = React.useMemo(() => {
    if (!isBNPositive(totalVotesBN)) return "-";
    if (!isValidForVotes) return "-";
    return forVotesBN.times(100).div(totalVotesBN);
  }, [totalVotesBN, isValidForVotes, forVotesBN]);

  const displayAgainstVotesPercent = React.useMemo(() => {
    if (!isBNPositive(totalVotesBN)) return "-";
    if (!isValidAgainstVotes) return "-";
    return againstVotesBN.times(100).div(totalVotesBN);
  }, [totalVotesBN, isValidAgainstVotes, againstVotesBN]);

  return {
    proposal,
    isLoadingProposal: isLoading,
    isCallSuccessProposal: isCallSuccess,

    startBlockBN,
    numberedStartBlock,
    isValidStartBlock,
    isPositiveStartBlock,

    endBlockBN,
    numberedEndBlock,
    isValidEndBlock,
    isPositiveEndBlock,

    result,

    totalVotesBN,
    displayTotalVotes,
    displayForVotes,
    displayForVotesPercent,
    displayAgainstVotes,
    displayAgainstVotesPercent,

    fetchProposal: fetch
  };
}
