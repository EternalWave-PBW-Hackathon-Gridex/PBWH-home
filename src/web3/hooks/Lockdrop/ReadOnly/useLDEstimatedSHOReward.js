import React from "react";
import { ethers } from "ethers";
import LockdropContract from "../../../contracts/LockdropContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import { abbreviateNumberFormat } from "../../../utils/numberFormat";
import { BN } from "../../../utils/AKBN";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLDEstimatedSHOReward(fromAddress) {
  /** estimatedSHOReward */
  const [estimatedSHOReward, setEstimatedSHOReward] = React.useState(null);
  const [estimatedSHORewardState, setEstimatedSHORewardState] = React.useState(
    ContractCallState.NEW
  );

  const fetchEstimatedSHOReward = async (amount, lockMonth) => {
    try {
      setEstimatedSHORewardState(ContractCallState.FETCHING);
      let estimatedSHOReward =
        await LockdropContract.estimateTotalAllocatedSHOToken(
          amount,
          lockMonth,
          {
            from: fromAddress
          }
        ); // param
      setEstimatedSHORewardState(ContractCallState.SUCCESS);
      setEstimatedSHOReward(ethers.utils.formatEther(estimatedSHOReward));
    } catch (error) {
      console.error(error.message);
      setEstimatedSHORewardState(ContractCallState.ERROR);
      setEstimatedSHOReward(null);
    }
  };

  const { isCallSuccess, isLoading } = useConstantProperties(
    estimatedSHORewardState
  );

  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(estimatedSHOReward, isCallSuccess);

  const setLoading = () => {
    setEstimatedSHORewardState(ContractCallState.FETCHING);
  };

  return {
    estimatedSHOReward,
    isEstimatedSHORewardCallSuccess: isCallSuccess,
    isLoadingEstimatedSHOReward: isLoading,
    estimatedSHORewardBN: bn,
    isValidEstimatedSHOReward: isValid,
    displayEstimatedSHOReward: display,
    displayNumberFormatEstimatedSHOReward: displayNumberFormat,
    setEstimatedSIGRewardLoading: setLoading,
    fetchEstimatedSHOReward
  };
}
