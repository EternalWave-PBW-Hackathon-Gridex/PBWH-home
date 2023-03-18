import React from "react";
import { ethers } from "ethers";
import XSHOFarmContract from "../../../contracts/XSHOFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useXSFClaimableVXSHO(fromAddress) {
  /** claimableVXSHO */
  const [claimableVXSHO, setClaimableVXSHO] = React.useState(null);
  const [claimableVXSHOState, setClaimableVXSHOState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setClaimableVXSHOState(ContractCallState.FETCHING);
      let claimableVXSHO = await XSHOFarmContract.claimable(fromAddress, {
        from: fromAddress
      });

      setClaimableVXSHOState(ContractCallState.SUCCESS);
      setClaimableVXSHO(ethers.utils.formatEther(claimableVXSHO));
    } catch (error) {
      console.error(error.message);
      setClaimableVXSHOState(ContractCallState.ERROR);
      setClaimableVXSHO(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(claimableVXSHOState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(claimableVXSHO, isCallSuccess);

  return {
    claimableVXSHO,
    claimableVXSHOBN: bn,
    isLoadingClaimableVXSHO: isLoading,
    isCallSuccessClaimableVXSHO: isCallSuccess,
    isValidClaimableVXSHO: isValid,
    isPositiveClaimableVXSHO: isPositive,
    numberedClaimableVXSHO: numbered,

    displayClaimableVXSHO: display,
    displayNumberFormatClaimableVXSHO: displayNumberFormat,
    fetchClaimableVXSHO: fetch
  };
}
