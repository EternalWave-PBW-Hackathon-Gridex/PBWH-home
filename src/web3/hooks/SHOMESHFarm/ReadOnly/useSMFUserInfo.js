import React from "react";
import { ethers } from "ethers";
import SHOMESHFarmContract from "../../../contracts/SHOMESHFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useNumericTokenConstants from "../../useNumericTokenConstants";
dayjs.extend(duration);

export default function useSMFUserInfo(fromAddress) {
  /** userInfo */
  const [userInfo, setUserInfo] = React.useState(null);
  const [userInfoState, setUserInfoState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } = useConstantProperties(userInfoState);

  const fetch = async () => {
    try {
      setUserInfoState(ContractCallState.FETCHING);
      let userInfo = await SHOMESHFarmContract.userInfo(fromAddress, {
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

  /** Amount */
  const amount = React.useMemo(() => {
    return userInfo?.amount
      ? ethers.utils.formatEther(userInfo?.amount)
      : undefined;
  }, [userInfo]);

  const {
    bn: amountBN,
    isValid: isValidAmount,
    isPositive: isPositiveAmount,
    display: displayAmount,
    displayNumberFormat: displayNumberFormatAmount
  } = useNumericTokenConstants(amount, isCallSuccess);

  /** boostWeight */
  const boostWeight = React.useMemo(() => {
    return userInfo?.boostWeight
      ? ethers.utils.formatEther(userInfo?.boostWeight)
      : undefined;
  }, [userInfo]);

  const {
    bn: boostWeightBN,
    isValid: isValidBoostWeight,
    isPositive: isPositiveBoostWeight,
    numbered: numberedBoostWeight,
    display: displayBoostWeight,
    displayNumberFormat: displayNumberFormatBoostWeight
  } = useNumericTokenConstants(boostWeight, isCallSuccess);

  return {
    userInfo,
    isLoadingUserInfo: isLoading,
    isCallSuccessUserInfo: isCallSuccess,

    amount,
    amountBN,
    displayAmount,
    isValidAmount,
    isPositiveAmount,
    displayNumberFormatAmount,

    boostWeightBN,
    isValidBoostWeight,
    isPositiveBoostWeight,
    numberedBoostWeight,
    displayBoostWeight,
    displayNumberFormatBoostWeight,
    fetchUserInfo: fetch
  };
}
