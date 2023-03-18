import React from "react";
import { ethers } from "ethers";
import ShogunGovernContract from "../../../contracts/ShogunGovernContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

const GOV_STATUS = {
  0: "Pending", // Not started yet.
  1: "Active", //  The proposal has been activated.
  2: "Canceled", // The proposal has been canceled.
  3: "Ended" // The Proposal voting perioud has been ended.
};

export default function useSGState(fromAddress) {
  /** proposalState */
  const [proposalState, setProposalState] = React.useState(null);
  const [proposalStateState, setProposalStateState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (id) => {
    try {
      setProposalStateState(ContractCallState.FETCHING);
      let proposalState = await ShogunGovernContract.state(id);

      setProposalStateState(ContractCallState.SUCCESS);
      setProposalState(proposalState.toString());
    } catch (error) {
      console.error(error.message);
      setProposalStateState(ContractCallState.ERROR);
      setProposalState(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(proposalStateState);
  const { bn, isValid } = useNumericTokenConstants(
    proposalState,
    isCallSuccess
  );

  const displayProposalState = React.useMemo(() => {
    if (!isValid) return GOV_STATUS[0];
    return GOV_STATUS[proposalState];
  }, [proposalState, isValid]);

  const isProposalStateActive = React.useMemo(() => {
    if (!isValid) return false;
    return proposalState === "1";
  }, [proposalState, isValid]);

  return {
    proposalState,
    proposalStateBN: bn,
    isLoadingProposalState: isLoading,
    isCallSuccessProposalState: isCallSuccess,
    isValidProposalState: isValid,
    displayProposalState,
    isProposalStateActive,
    fetchProposalState: fetch
  };
}
