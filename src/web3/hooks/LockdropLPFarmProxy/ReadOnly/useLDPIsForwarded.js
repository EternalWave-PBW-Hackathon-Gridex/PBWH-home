import React from "react";
import { ethers } from "ethers";
import LockdropLPFarmProxyContract from "../../../contracts/LockdropLPFarmProxyContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useBooleanValueConstants from "../../useBooleanValueConstants";

export default function useLDPIsForwarded(fromAddress) {
  /** isForwarded */
  const [isForwarded, setIsForwarded] = React.useState(null);
  const [isForwardedState, setIsForwardedState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (address) => {
    try {
      setIsForwardedState(ContractCallState.FETCHING);
      let isForwarded = await LockdropLPFarmProxyContract.isForwarded(address, {
        from: fromAddress
      });

      setIsForwardedState(ContractCallState.SUCCESS);
      setIsForwarded(isForwarded);
    } catch (error) {
      console.error(error.message);
      setIsForwardedState(ContractCallState.ERROR);
      setIsForwarded(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(isForwardedState);
  const { value, isValid } = useBooleanValueConstants(
    isForwarded,
    isCallSuccess
  );

  return {
    isForwarded: value,
    isLoadingIsForwarded: isLoading,
    isCallSuccessIsForwarded: isCallSuccess,
    isValidIsForwarded: isValid,

    fetchIsForwarded: fetch
  };
}
