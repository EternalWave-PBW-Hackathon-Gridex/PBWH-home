import React from "react";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import useLPFarmConstants from "../../../../web3/hooks/LPFarm/ReadOnly/useLPFarmConstants";
import Connector from "../../../../context/WalletConnector/Connector";
import { BN, isBNPositive } from "../../../../web3/utils/AKBN";
import { getAbbreviateNumberFormat } from "../../../../web3/utils/numberFormat";
import TokenPriceConnector from "../../../../context/TokenPriceConnector";

export default function useLFAPR({ farmItem, tvlInfo, userInfoInfo }) {
  let { address } = Connector.useContainer();
  const {
    isLoadingSHOPrice,
    isValidSHOPrice,
    convertedSHOPrice,
    fetchSHOPrice
  } = TokenPriceConnector.useContainer();

  const { poolId, SHO_REWARD } = farmItem.lp;
  const {
    isLoadingTVL,
    isLoadingLPValue,
    isValidTVL,
    isValidLPValue,
    lpValueBN,
    tvlBN
  } = tvlInfo;

  const {
    isLoadingUserInfo,
    userInfoAmountBN,
    isPositiveUserInfoAmount,

    boostWeightBN,
    isPositiveBoostWeight
  } = userInfoInfo;

  const {
    isLoadingPoolInfo,
    totalBoostWeightBN,
    isPositiveTotalBoostWeight,
    fetchPoolInfo
  } = useLPFarmConstants(address);

  useSigmaDidMount(
    () => {
      fetchPoolInfo(poolId);
      fetchSHOPrice();
    },
    [],
    false
  );

  /** Loadings */
  const isLoadingBasePoolAPR = React.useMemo(() => {
    return isLoadingTVL || isLoadingSHOPrice;
  }, [isLoadingTVL, isLoadingSHOPrice]);

  const isLoadingBoostPoolAPR = React.useMemo(() => {
    return (
      isLoadingSHOPrice ||
      isLoadingUserInfo ||
      isLoadingLPValue ||
      isLoadingPoolInfo
    );
  }, [
    isLoadingSHOPrice,
    isLoadingUserInfo,
    isLoadingLPValue,
    isLoadingPoolInfo
  ]);

  /** Validations */
  const isValidBasePoolAPR = React.useMemo(() => {
    return isValidTVL && isValidSHOPrice;
  }, [isValidTVL, isValidSHOPrice]);

  const isValidExpectedBoostPoolAPR = React.useMemo(() => {
    return isValidSHOPrice && isValidLPValue && isPositiveTotalBoostWeight;
  }, [isValidSHOPrice, isValidLPValue, isPositiveTotalBoostWeight]);

  const isValidBoostPoolAPR = React.useMemo(() => {
    return (
      isValidSHOPrice &&
      isPositiveUserInfoAmount &&
      isValidLPValue &&
      isPositiveTotalBoostWeight &&
      isPositiveBoostWeight
    );
  }, [
    isValidSHOPrice,
    isPositiveUserInfoAmount,
    isValidLPValue,
    isPositiveTotalBoostWeight,
    isPositiveBoostWeight
  ]);

  /** Displays */

  const basePoolRate = 0.4;
  const boostPoolRate = 0.6;
  const yearDividedPeriod = 0.5;

  const basePoolAPRBN = React.useMemo(() => {
    if (!isValidBasePoolAPR) return BN(0);
    return BN(convertedSHOPrice)
      .times(SHO_REWARD * basePoolRate * yearDividedPeriod)
      .times(100)
      .div(tvlBN);
  }, [isValidBasePoolAPR, convertedSHOPrice, tvlBN]);

  const displayBasePoolAPR = React.useMemo(() => {
    if (!isValidBasePoolAPR) return "-";
    if (!isBNPositive(basePoolAPRBN)) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(basePoolAPRBN.toString());
  }, [isValidBasePoolAPR, basePoolAPRBN]);

  const expectedBoostPoolAPRBN = React.useMemo(() => {
    if (!isValidExpectedBoostPoolAPR) return BN(0);
    const userBoostWeight = BN(100)
      .times(lpValueBN)
      .div(BN(convertedSHOPrice))
      .times(100)
      .squareRoot();
    return BN(convertedSHOPrice)
      .times(SHO_REWARD * boostPoolRate * yearDividedPeriod)
      .div(BN(200).times(lpValueBN))
      .times(userBoostWeight.div(totalBoostWeightBN))
      .times(100);
  }, [
    isValidExpectedBoostPoolAPR,
    convertedSHOPrice,
    lpValueBN,
    totalBoostWeightBN
  ]);
  const displayExpectedBoostPoolAPRBN = React.useMemo(() => {
    if (!isValidExpectedBoostPoolAPR) return "-";
    if (!isBNPositive(expectedBoostPoolAPRBN)) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(expectedBoostPoolAPRBN.toString());
  }, [isValidExpectedBoostPoolAPR, expectedBoostPoolAPRBN]);

  const boostPoolAPRBN = React.useMemo(() => {
    if (!isValidBoostPoolAPR) return BN(0);
    return BN(convertedSHOPrice)
      .times(SHO_REWARD * boostPoolRate * yearDividedPeriod)
      .div(userInfoAmountBN.times(lpValueBN))
      .times(boostWeightBN.div(totalBoostWeightBN))
      .times(100);
  }, [
    isValidBoostPoolAPR,
    convertedSHOPrice,
    userInfoAmountBN,
    lpValueBN,
    boostWeightBN,
    totalBoostWeightBN
  ]);

  const displayBoostPoolAPR = React.useMemo(() => {
    if (!isValidBoostPoolAPR) return "-";
    if (!isBNPositive(boostPoolAPRBN)) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(boostPoolAPRBN.toString());
  }, [isValidBoostPoolAPR, boostPoolAPRBN]);

  return {
    isLoadingBasePoolAPR,
    isLoadingBoostPoolAPR,
    displayBasePoolAPR,
    displayExpectedBoostPoolAPRBN,
    displayBoostPoolAPR
  };
}
