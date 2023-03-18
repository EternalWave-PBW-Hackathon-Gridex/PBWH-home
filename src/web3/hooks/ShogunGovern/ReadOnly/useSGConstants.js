import useSGAvailableVotes from "./useSGAvailableVotes";
import useSGIsProposalFinalized from "./useSGIsProposalFinalized";
import useSGProposal from "./useSGProposal";
import useSGReceipt from "./useSGReceipt";
import useSGState from "./useSGState";
import useSGTotalVXSHOSupply from "./useSGTotalVXSHOSupply";

export default function useSGConstants(fromAddress) {
  return {
    ...useSGIsProposalFinalized(),
    ...useSGState(),
    ...useSGProposal(),
    ...useSGTotalVXSHOSupply(),
    ...useSGAvailableVotes(fromAddress),
    ...useSGReceipt(fromAddress)
  };
}
