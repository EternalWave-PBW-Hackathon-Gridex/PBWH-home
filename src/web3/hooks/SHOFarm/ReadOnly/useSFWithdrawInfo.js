import React from "react";
import SHOFarmContract from "../../../contracts/SHOFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { convertToETH, BN, BN_FORMAT } from "../../../utils/AKBN";
dayjs.extend(duration);

export default function useSFWithdrawInfos(fromAddress) {
  /** withdrawInfos */
  const [withdrawInfos, setWithdrawInfos] = React.useState(null);
  const [withdrawInfosState, setWithdrawInfosState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } =
    useConstantProperties(withdrawInfosState);

  const fetch = async () => {
    try {
      setWithdrawInfosState(ContractCallState.FETCHING);
      let withdrawInfos = await SHOFarmContract.getUserWithdrawInfos(
        fromAddress,
        {
          from: fromAddress
        }
      );
      setWithdrawInfosState(ContractCallState.SUCCESS);
      setWithdrawInfos(withdrawInfos);
    } catch (error) {
      console.error(error.message);
      setWithdrawInfosState(ContractCallState.ERROR);
      setWithdrawInfos(null);
    }
  };

  const isValid = React.useMemo(() => {
    return Array.isArray(withdrawInfos) && isCallSuccess;
  }, [withdrawInfos, isCallSuccess]);

  const isEmptyWithdrawInfos = React.useMemo(() => {
    if (!isValid) return true;
    return withdrawInfos.length === 0;
  }, [isValid, withdrawInfos]);

  const displayUnstakingDetailWithdrawInfos = React.useMemo(() => {
    if (!isValid) return [];
    const unstakingDetailWithdrawInfos = withdrawInfos
      .map((withdrawInfo) => {
        let { unlockTime, SHOAmount, xSHOAmount } = withdrawInfo;
        unlockTime = BN(unlockTime.toString()).toNumber();
        const formatedUnlockTime = dayjs
          .unix(unlockTime)
          .format("YY.MM.DD HH:mm:ss");
        SHOAmount = convertToETH(BN(SHOAmount.toString()))
          .decimalPlaces(4)
          .toFormat(BN_FORMAT);
        xSHOAmount = convertToETH(BN(xSHOAmount.toString()))
          .decimalPlaces(4)
          .toFormat(BN_FORMAT);
        return {
          unlockTime,
          formatedUnlockTime,
          SHOAmount,
          xSHOAmount
        };
      })
      .sort((a, b) => {
        return a.unlockTime - b.unlockTime;
      });
    return unstakingDetailWithdrawInfos;
  }, [isValid, withdrawInfos]);

  return {
    withdrawInfos,
    isLoadingWithdrawInfos: isLoading,
    isCallSuccessWithdrawInfos: isCallSuccess,

    isValidWithdrawInfos: isValid,
    isEmptyWithdrawInfos,
    displayUnstakingDetailWithdrawInfos,
    fetchWithdrawInfos: fetch
  };
}
