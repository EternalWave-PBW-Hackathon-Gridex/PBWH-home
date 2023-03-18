import React from "react";
import ShogunGovernContract from "../../../contracts/ShogunGovernContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import { ethers } from "@web3-onboard/common/node_modules/ethers";
import { BN, BN_FORMAT, isBNPositive } from "../../../utils/AKBN";
import useBooleanValueConstants from "../../useBooleanValueConstants";
dayjs.extend(duration);

const PROPOSAL_RESULT = {
  0: "Succedeed", // Pass the quorum, and For > Against.
  1: "Defeated", // Passed the quorum, but For <= Against.
  2: "Expired" // Didn't meet the quorum.
};

export default function useSGReceipt(fromAddress) {
  /** receipt */
  const [receipt, setReceipt] = React.useState(null);
  const [receiptState, setReceiptState] = React.useState(ContractCallState.NEW);
  const { isCallSuccess, isLoading } = useConstantProperties(receiptState);

  const fetch = async (id) => {
    try {
      setReceiptState(ContractCallState.FETCHING);
      let receipt = await ShogunGovernContract.getReceipt(id, fromAddress, {
        from: fromAddress
      });
      setReceiptState(ContractCallState.SUCCESS);
      setReceipt(receipt);
    } catch (error) {
      console.error(error.message);
      setReceiptState(ContractCallState.ERROR);
      setReceipt(null);
    }
  };

  /** hasVoted */
  const hasVotedValue = React.useMemo(() => {
    return receipt?.hasVoted;
  }, [receipt]);

  const { value: hasVoted, isValid: isValidHasVoted } =
    useBooleanValueConstants(hasVotedValue, isCallSuccess);

  return {
    receipt,
    isLoadingReceipt: isLoading,
    isCallSuccessReceipt: isCallSuccess,

    hasVoted,
    isValidHasVoted,
    fetchReceipt: fetch
  };
}
