import React from "react";
import { ethers } from "ethers";
import LPFarmContract from "../../../contracts/LPFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import { STAGE_TWO_END_UNIX } from "../../../../pages/Lockdrop";
import { BN } from "../../../utils/AKBN";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useNumericTokenConstants from "../../useNumericTokenConstants";
dayjs.extend(duration);

export default function useLFUserInfo(fromAddress) {
  /** userInfo */
  const [userInfo, setUserInfo] = React.useState(null);
  const [userInfoState, setUserInfoState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } = useConstantProperties(userInfoState);

  const fetch = async (poolId) => {
    try {
      setUserInfoState(ContractCallState.FETCHING);
      let userInfo = await LPFarmContract.userInfo(poolId, fromAddress, {
        from: fromAddress
      });
      setUserInfoState(ContractCallState.SUCCESS);
      setUserInfo(userInfo);
    } catch (error) {
      console.error(error.message);
      setUserInfoState(ContractCallState.ERROR);
      setUserInfo(null);
    }
  };

  /** UserInfoAmount */
  const userInfoAmount = React.useMemo(() => {
    return userInfo?.amount
      ? ethers.utils.formatEther(userInfo?.amount)
      : undefined;
  }, [userInfo]);

  const {
    bn: userInfoAmountBN,
    isValid: isValidUserInfoAmount,
    isPositive: isPositiveUserInfoAmount,
    display: displayUserInfoAmount,
    displayNumberFormat
  } = useNumericTokenConstants(userInfoAmount, isCallSuccess);

  /** lockdropAmount */
  const lockdropAmount = React.useMemo(() => {
    return userInfo?.lockdropAmount
      ? ethers.utils.formatEther(userInfo?.lockdropAmount)
      : undefined;
  }, [userInfo]);

  const {
    bn: lockdropAmountBN,
    isValid: isValidLockdropAmount,
    isPositive: isPositiveLockdropAmount,
    numbered: numberedLockdropAmount,
    display: displayLockdropAmount
  } = useNumericTokenConstants(lockdropAmount, isCallSuccess);

  /** boostWeight */
  const boostWeight = React.useMemo(() => {
    return userInfo?.boostWeight
      ? ethers.utils.formatEther(userInfo?.boostWeight)
      : undefined;
  }, [userInfo]);

  /** lockingPeriod */
  const lockingPeriod = React.useMemo(() => {
    return userInfo?.lockingPeriod
      ? userInfo?.lockingPeriod.toString()
      : undefined;
  }, [userInfo]);

  const displayLockingPeriod = React.useMemo(() => {
    const isValid = !BN(lockingPeriod).isNaN();
    if (!isValid) return "-";
    return dayjs
      .unix(STAGE_TWO_END_UNIX + BN(lockingPeriod).toNumber())
      .format("YY.MM.DD");
  }, [isValidLockdropAmount, lockingPeriod]);

  const {
    bn: boostWeightBN,
    isValid: isValidBoostWeight,
    isPositive: isPositiveBoostWeight,
    numbered: numberedBoostWeight,
    display: displayBoostWeight
  } = useNumericTokenConstants(boostWeight, isCallSuccess);

  return {
    userInfo,
    isLoadingUserInfo: isLoading,
    isCallSuccessUserInfo: isCallSuccess,

    userInfoAmount,
    userInfoAmountBN,
    displayUserInfoAmount,
    isPositiveUserInfoAmount,

    lockdropAmountBN,
    isValidLockdropAmount,
    isPositiveLockdropAmount,
    numberedLockdropAmount,
    displayLockdropAmount,

    lockingPeriod,
    displayLockingPeriod,

    boostWeightBN,
    isValidBoostWeight,
    isPositiveBoostWeight,
    numberedBoostWeight,
    displayBoostWeight,
    fetchUserInfo: fetch
  };
}
