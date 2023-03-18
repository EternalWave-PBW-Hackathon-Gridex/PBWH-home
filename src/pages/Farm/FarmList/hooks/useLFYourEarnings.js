import React from "react";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import useLPFarmConstants from "../../../../web3/hooks/LPFarm/ReadOnly/useLPFarmConstants";
import Connector from "../../../../context/WalletConnector/Connector";
import { BN_FORMAT } from "../../../../web3/utils/AKBN";

export default function useLFYourEarnings({ farmItem }) {
  let { address } = Connector.useContainer();
  const { poolId } = farmItem.lp;
  const {
    basePendingBN,
    isLoadingBasePending,
    isValidBasePending,
    displayBasePending,
    fetchBasePending,

    boostPendingBN,
    isLoadingBoostPending,
    isValidBoostPending,
    displayBoostPending,
    fetchBoostPending
  } = useLPFarmConstants(address);

  useSigmaDidMount(() => {
    fetchYourEarnings();
  });

  const fetchYourEarnings = () => {
    fetchBasePending(poolId);
    fetchBoostPending(poolId);
  };

  const isValidYourEarnings = React.useMemo(() => {
    return isValidBasePending && isValidBoostPending;
  }, [isValidBasePending, isValidBoostPending]);

  const isLoadingYourEarnings = React.useMemo(() => {
    return isLoadingBasePending || isLoadingBoostPending;
  }, [isLoadingBasePending, isLoadingBoostPending]);

  const displayYourEarning = React.useMemo(() => {
    if (!isValidYourEarnings) return "-";

    return basePendingBN
      .plus(boostPendingBN)
      .decimalPlaces(4)
      .toFormat(BN_FORMAT);
  }, [isValidYourEarnings, basePendingBN, boostPendingBN]);

  return {
    isValidYourEarnings,
    isLoadingYourEarnings,
    displayYourEarning,
    displayBasePending,
    displayBoostPending,
    fetchYourEarnings
  };
}
