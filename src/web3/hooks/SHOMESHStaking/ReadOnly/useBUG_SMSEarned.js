import React from "react";
import { ethers } from "ethers";
import { BUG_SHOMESHStakingContract } from "../../../contracts/SHOMESHStakingContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import { BN_FORMAT } from "../../../utils/AKBN";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import SHO from "../../../contracts/SHOTokenContract/SHO";
import MeshswapEscrow from "../../../contracts/MeshswapEscrowContract/MeshswapEscrow";

export default function useSMSEarned(fromAddress) {
  /** earnedInfo */
  const [earnedInfo, setEarnedInfo] = React.useState(null);
  const [earnedInfoState, setEarnedInfoState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } = useConstantProperties(earnedInfoState);

  const fetch = async () => {
    try {
      setEarnedInfoState(ContractCallState.FETCHING);
      let shoEarned = await BUG_SHOMESHStakingContract.earned(
        fromAddress,
        SHO.address,
        {
          from: fromAddress
        }
      );

      let shoMESHEarned = await BUG_SHOMESHStakingContract.earned(
        fromAddress,
        MeshswapEscrow.address,
        {
          from: fromAddress
        }
      );
      setEarnedInfoState(ContractCallState.SUCCESS);
      setEarnedInfo({
        shoEarned,
        shoMESHEarned
      });
    } catch (error) {
      console.error(error.message);
      setEarnedInfoState(ContractCallState.ERROR);
      setEarnedInfo(null);
    }
  };

  /** shoEarned */

  const shoEarned = React.useMemo(() => {
    return earnedInfo?.shoEarned
      ? ethers.utils.formatEther(earnedInfo?.shoEarned)
      : undefined;
  }, [earnedInfo]);

  const {
    bn: shoEarnedBN,
    isValid: isValidSHOEarned,
    isPositive: isPositiveSHOEarned,
    display: displaySHOEarned,
    displayNumberFormat: displayNumberFormatSHOEarned
  } = useNumericTokenConstants(shoEarned, isCallSuccess);

  const displayLongSHOEarned = React.useMemo(() => {
    if (!isValidSHOEarned) return "-";
    return shoEarnedBN.decimalPlaces(8).toFormat(BN_FORMAT);
  }, [shoEarnedBN, isValidSHOEarned]);

  /** shoMESHEarned */

  const shoMESHEarned = React.useMemo(() => {
    return earnedInfo?.shoMESHEarned
      ? ethers.utils.formatEther(earnedInfo?.shoMESHEarned)
      : undefined;
  }, [earnedInfo]);

  const {
    bn: shoMESHEarnedBN,
    isValid: isValidSHOMESHEarned,
    isPositive: isPositiveSHOMESHEarned,
    display: displaySHOMESHEarned,
    displayNumberFormat: displayNumberFormatSHOMESHEarned
  } = useNumericTokenConstants(shoMESHEarned, isCallSuccess);

  const displayLongSHOMESHEarned = React.useMemo(() => {
    if (!isValidSHOMESHEarned) return "-";
    return shoMESHEarnedBN.decimalPlaces(8).toFormat(BN_FORMAT);
  }, [shoMESHEarnedBN, isValidSHOMESHEarned]);
  return {
    earnedInfo,
    isLoadingEarnedInfo: isLoading,
    isCallSuccessEarnedInfo: isCallSuccess,

    shoEarnedBN,
    isValidSHOEarned,
    isPositiveSHOEarned,
    displaySHOEarned,
    displayNumberFormatSHOEarned,
    displayLongSHOEarned,

    shoMESHEarnedBN,
    isValidSHOMESHEarned,
    isPositiveSHOMESHEarned,
    displaySHOMESHEarned,
    displayNumberFormatSHOMESHEarned,
    displayLongSHOMESHEarned,

    fetchEarnedInfo: fetch
  };
}
