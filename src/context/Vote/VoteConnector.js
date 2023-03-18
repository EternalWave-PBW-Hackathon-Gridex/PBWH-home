import React from "react";
import { isProduction } from "../../utils/constants";
import Connector from "../WalletConnector/Connector";
import { createContainer } from "unstated-next";
import useSigmaDidMount from "../../hooks/useSigmaDidMount";
import useSVConstants from "../../web3/hooks/Vote/ReadOnly/useSVConstants";
import usePoolVotes from "../../pages/Vote/VoteContentDisplay/Pool/VoteList/usePoolVotes";
import useSVUserPoolVotes from "../../web3/hooks/Vote/ReadOnly/useSVUserPoolVotes";
import usePoolVotePagination from "../../hooks/usePoolVotePagination";
import useGovList from "../../pages/Vote/VoteContentDisplay/Gov/GovList/hooks/useGovList";
import useGovBlock from "../../pages/Vote/VoteContentDisplay/Gov/GovList/hooks/useGovBlockInfo";

const useVoteConnector = () => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    availableVotes,
    availableVotesBN,
    isLoadingAvailableVotes,
    isCallSuccessAvailableVotes,
    isValidAvailableVotes,
    isPositiveAvailableVotes,
    numberedAvailableVotes,

    displayAvailableVotes,
    fetchAvailableVotes
  } = useSVConstants(address);

  const {
    page,
    pageCount,
    pageSize,
    total,
    data,
    isValidData,
    poolVotes,
    isLoadingPoolVotes,
    isCallSuccessPoolVotes,
    fetchPoolVotes,
    setPoolVotesLoading
  } = usePoolVotes();

  const { currentPage, jump, maxPage } = usePoolVotePagination(pageCount);

  return {
    availableVotes,
    availableVotesBN,
    isLoadingAvailableVotes,
    isCallSuccessAvailableVotes,
    isValidAvailableVotes,
    isPositiveAvailableVotes,
    numberedAvailableVotes,

    displayAvailableVotes,
    fetchAvailableVotes,

    /** Pool Votes */
    page,
    pageCount,
    pageSize,
    total,
    data,
    isValidData,
    poolVotes,
    isLoadingPoolVotes,
    isCallSuccessPoolVotes,
    fetchPoolVotes,
    setPoolVotesLoading,

    /** Pool Vote Pagination */
    currentPage,
    jump,
    maxPage,

    ...useSVUserPoolVotes(address),

    ...useGovList(),

    ...useGovBlock()
  };
};

let VoteConnector = createContainer(useVoteConnector);

export default VoteConnector;
