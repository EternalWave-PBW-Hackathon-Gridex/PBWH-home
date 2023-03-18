import useSVAvailableVotes from "./useSVAvailableVotes";
import useSVPoolInfo from "./useSVPoolInfo";
import useSVUserPoolVotes from "./useSVUserPoolVotes";

export default function useSVConstants(fromAddress) {
  return {
    ...useSVAvailableVotes(fromAddress),
    ...useSVPoolInfo(fromAddress),
    ...useSVUserPoolVotes(fromAddress)
  };
}
