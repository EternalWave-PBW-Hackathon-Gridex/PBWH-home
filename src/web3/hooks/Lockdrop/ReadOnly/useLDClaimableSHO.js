import React from "react";
import { ethers } from "ethers";
import LockdropContract from "../../../contracts/LockdropContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLDClaimableSHO(fromAddress) {
  /** claimableSHO */
  const [claimableSHO, setClaimableSHO] = React.useState(null);
  const [claimableSHOState, setClaimableSHOState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async (address) => {
    try {
      setClaimableSHOState(ContractCallState.FETCHING);
      let claimableSHO = await LockdropContract.userClaimableSHOAmount(
        address,
        {
          from: fromAddress
        }
      );

      setClaimableSHOState(ContractCallState.SUCCESS);
      setClaimableSHO(ethers.utils.formatEther(claimableSHO));
    } catch (error) {
      console.error(error.message);
      setClaimableSHOState(ContractCallState.ERROR);
      setClaimableSHO(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(claimableSHOState);
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(claimableSHO, isCallSuccess);

  return {
    claimableSHO,
    isLoadingClaimableSHO: isLoading,
    isCallSuccessClaimableSHO: isCallSuccess,
    isValidClaimableSHO: isValid,
    isPositiveClaimableSHO: isPositive,

    displayClaimableSHO: display,
    fetchClaimableSHO: fetch
  };
}
