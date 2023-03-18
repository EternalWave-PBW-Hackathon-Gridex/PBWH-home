import React from "react";
import { ethers } from "ethers";
import LockdropContract from "../../../contracts/LockdropContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useBooleanValueConstants from "../../useBooleanValueConstants";

export default function useLDIsSHOTokenReleased(fromAddress) {
  /** isSHOTokensReleased */
  const [isSHOTokensReleased, setIsSHOTokensReleased] = React.useState(null);
  const [isSHOTokensReleasedState, setIsSHOTokensReleasedState] =
    React.useState(ContractCallState.NEW);

  const fetch = async () => {
    try {
      setIsSHOTokensReleasedState(ContractCallState.FETCHING);
      let isSHOTokensReleased = await LockdropContract.isSHOTokensReleased({
        from: fromAddress
      });

      setIsSHOTokensReleasedState(ContractCallState.SUCCESS);
      setIsSHOTokensReleased(isSHOTokensReleased);
    } catch (error) {
      console.error(error.message);
      setIsSHOTokensReleasedState(ContractCallState.ERROR);
      setIsSHOTokensReleased(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(
    isSHOTokensReleasedState
  );
  const { value, isValid } = useBooleanValueConstants(
    isSHOTokensReleased,
    isCallSuccess
  );

  return {
    isSHOTokensReleased: value,
    isLoadingIsSHOTokensReleased: isLoading,
    isCallSuccessIsSHOTokensReleased: isCallSuccess,
    isValidIsSHOTokensReleased: isValid,

    fetchIsSHOTokensReleased: fetch
  };
}
