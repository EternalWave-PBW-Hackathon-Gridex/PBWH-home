import React from "react";
import { ethers } from "ethers";
import LockdropLPFarmProxyContract from "../../../contracts/LockdropLPFarmProxyContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useBooleanValueConstants from "../../useBooleanValueConstants";

export default function useLDPIsLPTokenReleased(fromAddress) {
  /** isLPTokensReleased */
  const [isLPTokensReleased, setIsLPTokensReleased] = React.useState(null);
  const [isLPTokensReleasedState, setIsLPTokensReleasedState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setIsLPTokensReleasedState(ContractCallState.FETCHING);
      let isLPTokensReleased =
        await LockdropLPFarmProxyContract.isLPTokensReleased({
          from: fromAddress
        });

      setIsLPTokensReleasedState(ContractCallState.SUCCESS);
      setIsLPTokensReleased(isLPTokensReleased);
    } catch (error) {
      console.error(error.message);
      setIsLPTokensReleasedState(ContractCallState.ERROR);
      setIsLPTokensReleased(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    isLPTokensReleasedState
  );
  const { value, isValid } = useBooleanValueConstants(
    isLPTokensReleased,
    isCallSuccess
  );

  return {
    isLPTokensReleased: value,
    isLoadingIsLPTokensReleased: isLoading,
    isCallSuccessIsLPTokensReleased: isCallSuccess,
    isValidIsLPTokensReleased: isValid,

    fetchIsLPTokensReleased: fetch
  };
}
