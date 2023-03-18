import React from "react";
import { ethers } from "ethers";
import SHOFarmContract from "../../../contracts/SHOFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSFRedeemableSHO(fromAddress) {
  /** redeemableSHO */
  const [redeemableSHO, setRedeemableSHO] = React.useState(null);
  const [redeemableSHOState, setRedeemableSHOState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setRedeemableSHOState(ContractCallState.FETCHING);
      let redeemableSHO = await SHOFarmContract.getRedeemableSHO({
        from: fromAddress
      });

      setRedeemableSHOState(ContractCallState.SUCCESS);
      setRedeemableSHO(ethers.utils.formatEther(redeemableSHO));
    } catch (error) {
      console.error(error.message);
      setRedeemableSHOState(ContractCallState.ERROR);
      setRedeemableSHO(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(redeemableSHOState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(redeemableSHO, isCallSuccess);

  return {
    redeemableSHO,
    redeemableSHOBN: bn,
    isLoadingRedeemableSHO: isLoading,
    isCallSuccessRedeemableSHO: isCallSuccess,
    isValidRedeemableSHO: isValid,
    isPositiveRedeemableSHO: isPositive,
    numberedRedeemableSHO: numbered,

    displayRedeemableSHO: display,
    displayNumberFormatRedeemableSHO: displayNumberFormat,
    fetchRedeemableSHO: fetch
  };
}
