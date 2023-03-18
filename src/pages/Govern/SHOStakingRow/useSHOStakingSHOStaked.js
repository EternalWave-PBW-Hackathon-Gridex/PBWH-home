import React from "react";
import dayjs from "dayjs";

import {
  BN,
  convertToETH,
  isBNPositive,
  BN_FORMAT
} from "../../../web3/utils/AKBN";
import useERC20Balance from "../../../web3/hooks/ERC20/useERC20Balance";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import SHOTokenContract from "../../../web3/contracts/SHOTokenContract";
import Lockdrop from "../../../web3/contracts/LockdropContract/Lockdrop";
import useSHOStakingRowSHObalance from "./useSHOStakingRowSHObalance";
import SHOFarm from "../../../web3/contracts/SHOFarmContract/SHOFarm";

export default function useSHOStakingSHOStaked() {
  const unixCurrent = dayjs().unix();
  const secondMonth = 2592000;

  const {
    isLoadingBalance: isLoadingLockdropSHOBalance,
    isPositiveBalance: isPositiveLockdropSHOBalance,
    numberedBalance: numberedLockdropSHOBalance,
    fetchBalance: fetchLockdropSHOBalance
  } = useERC20Balance(SHOTokenContract);

  const {
    isLoadingBalance: isLoadingSHOFarmSHOBalance,
    balanceBN: SHOFarmSHOBalanceBN,
    isPositiveBalance: isPositiveSHOFarmSHOBalance,
    fetchBalance: fetchSHOFarmSHOBalance
  } = useSHOStakingRowSHObalance(SHOTokenContract);

  useSigmaDidMount(() => {
    fetchLockdropSHOBalance(Lockdrop.address);
    fetchSHOFarmSHOBalance(SHOFarm.address);
  });

  const getContributorsSHO = () => {
    const vestingStartDateUnix = 1673017200; // 1/7
    const periodCurrentToVestingStart = unixCurrent - vestingStartDateUnix;

    const totalCoreContributorsVesting = 15000000;
    const totalStrategicPartnersVesting = 9000000;
    const vestingSHOBalance =
      totalCoreContributorsVesting *
        (periodCurrentToVestingStart / (secondMonth * 12)) +
      totalStrategicPartnersVesting *
        (periodCurrentToVestingStart / (secondMonth * 18));

    return vestingSHOBalance;
  };

  const getFarmSHO = () => {
    const lpFarmVestingStartDateUnix = 1673017200; // 1/19
    const periodCurrentToLPFarmVestingStart =
      unixCurrent - lpFarmVestingStartDateUnix;
    const lpFarmVesting = 17500000;

    const shoMESHFarmVestingStartDateUnix = 1674745200; // 1/27
    const periodCurrentToSHOMESHFarmVestingStart =
      unixCurrent > shoMESHFarmVestingStartDateUnix
        ? unixCurrent - shoMESHFarmVestingStartDateUnix
        : 0;
    const shoMESHFarmVesting = 10000000;

    const vestingSHOBalance =
      lpFarmVesting * (periodCurrentToLPFarmVestingStart / (secondMonth * 24)) +
      shoMESHFarmVesting *
        (periodCurrentToSHOMESHFarmVestingStart / (secondMonth * 24));

    return vestingSHOBalance;
  };

  /** Loading */
  const isLoading = React.useMemo(() => {
    return isLoadingLockdropSHOBalance || isLoadingSHOFarmSHOBalance;
  }, [isLoadingLockdropSHOBalance, isLoadingSHOFarmSHOBalance]);

  /** Validations */
  const isValid = React.useMemo(() => {
    return isPositiveLockdropSHOBalance && isPositiveSHOFarmSHOBalance;
  }, [isPositiveLockdropSHOBalance, isPositiveSHOFarmSHOBalance]);

  /** Display */
  const SHOTotalSupply = 100000000;
  const totalContributorsSHO = 24000000;
  const totalFarmSHO = 17500000 + 10000000;
  const treasurySHO = 30250000;

  const TotalSHOVestingAmount = React.useMemo(() => {
    if (!isValid) return 0;

    return (
      SHOTotalSupply -
      (totalContributorsSHO - getContributorsSHO()) -
      (totalFarmSHO - getFarmSHO()) -
      treasurySHO -
      numberedLockdropSHOBalance
    );
  });

  const display = React.useMemo(() => {
    if (!isValid) return "-";
    return `${SHOFarmSHOBalanceBN.div(BN(TotalSHOVestingAmount))
      .times(100)
      .decimalPlaces(6)}`;
  }, [SHOFarmSHOBalanceBN, TotalSHOVestingAmount, isValid]);

  return {
    isLoadingTotalSHOStaked: isLoading,
    isValidTotalSHOStaked: isValid,
    displayTotalSHOStaked: display
  };
}
