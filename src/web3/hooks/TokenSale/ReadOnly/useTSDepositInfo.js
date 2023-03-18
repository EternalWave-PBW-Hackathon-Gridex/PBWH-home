import React from "react";
import { ethers } from "ethers";
import TokenSale from "../../../contracts/TokenSaleContract";
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

export default function useTSDepositInfo(fromAddress) {
  /** depositInfo */
  const [depositInfo, setDepositInfo] = React.useState(null);
  const [depositInfoState, setDepositInfoState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } = useConstantProperties(depositInfoState);

  const fetch = async (address) => {
    try {
      setDepositInfoState(ContractCallState.FETCHING);
      let depositInfo = await TokenSale.depositOf(address, {
        from: fromAddress
      });
      setDepositInfoState(ContractCallState.SUCCESS);
      setDepositInfo(depositInfo);
    } catch (error) {
      console.error(error.message);
      setDepositInfoState(ContractCallState.ERROR);
      setDepositInfo(null);
    }
  };

  /** Deposit */
  const deposit = React.useMemo(() => {
    return depositInfo?.amount
      ? ethers.utils.formatUnits(depositInfo?.amount, "mwei")
      : undefined;
  }, [depositInfo]);

  const {
    bn: depositBN,
    isValid: isValidDeposit,
    isPositive: isPositiveDeposit,
    numbered: numberedDeposit,
    display: displayDeposit,
    displayNumberFormat
  } = useNumericTokenConstants(deposit, isCallSuccess);

  /** isTokensClaimed */

  const isTokensClaimedValue = React.useMemo(() => {
    return depositInfo?.tokensClaimed;
  }, [depositInfo]);

  const { value: isTokensClaimed, isValid: isValidIsTokensClaimed } =
    useBooleanValueConstants(isTokensClaimedValue, isCallSuccess);

  /** withdrewAtPhase2 */
  const withdrewAtPhase2Value = React.useMemo(() => {
    return depositInfo?.withdrewAtPhase2;
  }, [depositInfo]);

  const { value: withdrewAtPhase2, isValid: isValidWithdrewAtPhase2 } =
    useBooleanValueConstants(withdrewAtPhase2Value, isCallSuccess);

  return {
    depositInfo,
    isLoadingDepositInfo: isLoading,
    isCallSuccessDepositInfo: isCallSuccess,

    deposit,
    depositBN,
    isValidDeposit,
    isPositiveDeposit,
    displayDeposit,

    isTokensClaimed,
    isValidIsTokensClaimed,

    withdrewAtPhase2,
    isValidWithdrewAtPhase2,

    fetchDepositInfo: fetch
  };
}
