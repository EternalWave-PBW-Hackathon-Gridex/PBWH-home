import React from "react";
import { ethers } from "ethers";
import LockdropContract from "../../../contracts/LockdropContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import {
  abbreviateNumberFormat,
  getAbbreviateNumberFormat
} from "../../../utils/numberFormat";
import { BN, isBNPositive } from "../../../utils/AKBN";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import useBooleanValueConstants from "../../useBooleanValueConstants";
dayjs.extend(duration);

export default function useLDDepositInfo(fromAddress) {
  /** depositInfo */
  const [depositInfo, setDepositInfo] = React.useState(null);
  const [depositInfoState, setDepositInfoState] = React.useState(
    ContractCallState.NEW
  );
  const { isCallSuccess, isLoading } = useConstantProperties(depositInfoState);

  const fetch = async (address) => {
    try {
      setDepositInfoState(ContractCallState.FETCHING);
      let depositInfo = await LockdropContract.depositOf(address, {
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
      ? ethers.utils.formatEther(depositInfo?.amount)
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

  /** claimedSIG */

  const claimedSHO = React.useMemo(() => {
    return depositInfo?.claimedSHO
      ? ethers.utils.formatEther(depositInfo?.claimedSHO)
      : undefined;
  }, [depositInfo]);

  const {
    bn: claimedSHOBN,
    isValid: isValidClaimedSHO,
    display: displayClaimedSHO
  } = useNumericTokenConstants(claimedSHO, isCallSuccess);

  /** isLPTokensClaimed */

  const isLPTokensClaimedValue = React.useMemo(() => {
    return depositInfo?.isLPTokensClaimed;
  }, [depositInfo]);

  const { value: isLPTokensClaimed, isValid: isValidIsLPTokensClaimed } =
    useBooleanValueConstants(isLPTokensClaimedValue, isCallSuccess);

  /** LockedUntil */
  const displayLockedUntil = React.useMemo(() => {
    const bn = BN(depositInfo?.lockMonth?.toString());

    const lockUntilUnixTime =
      isBNPositive(bn) && isCallSuccess ? 0 + bn.toNumber() : 0;

    const currentUnixTime = dayjs().unix();

    const isValidDuration = lockUntilUnixTime - currentUnixTime > 0;
    const durationUnixTime =
      isValidDuration > 0 ? lockUntilUnixTime - currentUnixTime : 0;

    const durationDays = isValidDuration
      ? parseInt(dayjs.duration(durationUnixTime * 1000).asDays())
      : "-";

    return lockUntilUnixTime === 0
      ? "-"
      : `${dayjs.unix(lockUntilUnixTime).format("MM/DD/YYYY\nHH:mm")}\n${
          durationDays === "-" ? "" : `(${durationDays} days)`
        }`;
  }, [depositInfo, isCallSuccess]);

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

    depositBN,
    isValidDeposit,
    isPositiveDeposit,
    displayDeposit,

    displayLockedUntil,
    withdrewAtPhase2,
    isValidWithdrewAtPhase2,

    claimedSHOBN,
    isValidClaimedSHO,
    displayClaimedSHO,

    isLPTokensClaimed,
    isValidIsLPTokensClaimed,

    fetchDepositInfo: fetch
  };
}
