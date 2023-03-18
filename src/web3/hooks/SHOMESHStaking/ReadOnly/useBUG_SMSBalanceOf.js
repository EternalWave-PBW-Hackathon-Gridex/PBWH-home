import React from "react";
import { ethers } from "ethers";
import { BUG_SHOMESHStakingContract } from "../../../contracts/SHOMESHStakingContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useSMSBalanceOf(fromAddress) {
  /** shoMESHBalance */
  const [shoMESHBalance, setSHOMESHBalance] = React.useState(null);
  const [shoMESHBalanceState, setSHOMESHBalanceState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setSHOMESHBalanceState(ContractCallState.FETCHING);
      let shoMESHBalance = await BUG_SHOMESHStakingContract.balanceOf(
        fromAddress,
        {
          from: fromAddress
        }
      );

      setSHOMESHBalanceState(ContractCallState.SUCCESS);
      setSHOMESHBalance(ethers.utils.formatEther(shoMESHBalance));
    } catch (error) {
      console.error(error.message);
      setSHOMESHBalanceState(ContractCallState.ERROR);
      setSHOMESHBalance(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(shoMESHBalanceState);
  const { bn, isValid, isPositive, display, displayNumberFormat } =
    useNumericTokenConstants(shoMESHBalance, isCallSuccess);

  return {
    shoMESHBalance,
    isLoadingSHOMESHBalance: isLoading,
    isCallSuccessSHOMESHBalance: isCallSuccess,
    isValidSHOMESHBalance: isValid,
    isPositiveSHOMESHBalance: isPositive,

    displaySHOMESHBalance: display,
    displayNumberFormatSHOMESHBalance: displayNumberFormat,
    fetchSHOMESHBalance: fetch
  };
}
