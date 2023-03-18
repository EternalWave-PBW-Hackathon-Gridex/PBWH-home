import React from "react";
import { ethers } from "ethers";
import LPFarmContract from "../../../contracts/LPFarmContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import {
  abbreviateNumberFormat,
  getAbbreviateNumberFormat
} from "../../../utils/numberFormat";
import { BN, isBNPositive } from "../../../utils/AKBN";
import { STAGE_TWO_END_UNIX } from "../../../../pages/Lockdrop";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import useBooleanValueConstants from "../../useBooleanValueConstants";
dayjs.extend(duration);

export default function useLFPoolInfo(fromAddress) {
  /** poolInfo */
  const [poolInfo, setPoolInfo] = React.useState(null);
  const [poolInfoState, setPoolInfoState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } = useConstantProperties(poolInfoState);

  const fetch = async (poolId) => {
    try {
      setPoolInfoState(ContractCallState.FETCHING);
      let poolInfo = await LPFarmContract.poolInfo(poolId, {
        from: fromAddress
      });
      setPoolInfoState(ContractCallState.SUCCESS);
      setPoolInfo(poolInfo);
    } catch (error) {
      console.error(error.message);
      setPoolInfoState(ContractCallState.ERROR);
      setPoolInfo(null);
    }
  };

  /** totalBoostWeight */

  const totalBoostWeight = React.useMemo(() => {
    return poolInfo?.totalBoostWeight
      ? ethers.utils.formatEther(poolInfo?.totalBoostWeight)
      : undefined;
  }, [poolInfo]);

  const {
    bn: totalBoostWeightBN,
    isValid: isValidTotalBoostWeight,
    isPositive: isPositiveTotalBoostWeight,
    display: displayTotalBoostWeight
  } = useNumericTokenConstants(totalBoostWeight, isCallSuccess);

  return {
    poolInfo,
    isLoadingPoolInfo: isLoading,
    isCallSuccessPoolInfo: isCallSuccess,

    totalBoostWeightBN,
    isValidTotalBoostWeight,
    isPositiveTotalBoostWeight,
    displayTotalBoostWeight,

    fetchPoolInfo: fetch
  };
}
