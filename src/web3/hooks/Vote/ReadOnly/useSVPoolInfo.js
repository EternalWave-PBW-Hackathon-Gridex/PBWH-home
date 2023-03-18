import React from "react";
import { ethers } from "ethers";
import ShogunVoterContract from "../../../contracts/ShogunVoterContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useNumericTokenConstants from "../../useNumericTokenConstants";
dayjs.extend(duration);

export default function useSVPoolInfo(fromAddress) {
  /** poolInfo */
  const [poolInfo, setPoolInfo] = React.useState(null);
  const [poolInfoState, setPoolInfoState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } = useConstantProperties(poolInfoState);

  const fetch = async (poolAddress) => {
    try {
      setPoolInfoState(ContractCallState.FETCHING);
      let poolInfo = await ShogunVoterContract.poolInfos(poolAddress, {
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

  /** vxSHOAmount */

  const vxSHOAmount = React.useMemo(() => {
    return poolInfo?.vxSHOAmount ? poolInfo?.vxSHOAmount.toString() : undefined;
  }, [poolInfo]);

  const {
    bn: vxSHOAmountBN,
    isValid: isValidVXSHOAmount,
    isPositive: isPositiveVXSHOAmount,
    display: displayVXSHOAmount
  } = useNumericTokenConstants(vxSHOAmount, isCallSuccess);

  return {
    poolInfo,
    isLoadingPoolInfo: isLoading,
    isCallSuccessPoolInfo: isCallSuccess,

    vxSHOAmountBN,
    isValidVXSHOAmount,
    isPositiveVXSHOAmount,
    displayVXSHOAmount,

    fetchPoolInfo: fetch
  };
}
