import React from "react";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import { BN, isBNPositive } from "../../../../web3/utils/AKBN";
import { getAbbreviateNumberFormat } from "../../../../web3/utils/numberFormat";
import TokenPriceConnector from "../../../../context/TokenPriceConnector";
import useMiningHarvest from "../../../../hooks/Strapi/useMiningHarvest";

export default function useLFSHOMESHMESHMiningHarvestAPR({ tvlInfo }) {
  const {
    isLoadingSHOMESHPrice,
    shoMESHPriceBN,
    isPositiveSHOMESHPrice,

    fetchSHOMESHPrice
  } = TokenPriceConnector.useContainer();
  const { isLoadingTVL, isValidTVL, tvlBN } = tvlInfo;

  const {
    isLoadingMiningHarvest,
    isValidMiningHarvest,
    miningHarvest,

    fetchMiningHarvest
  } = useMiningHarvest();

  useSigmaDidMount(
    () => {
      fetchSHOMESHPrice();
      fetchMiningHarvest();
    },
    [],
    false
  );

  const isLoadingMiningHarvestAPR = React.useMemo(() => {
    return isLoadingSHOMESHPrice || isLoadingTVL || isLoadingMiningHarvest;
  }, [isLoadingSHOMESHPrice, isLoadingTVL, isLoadingMiningHarvest]);

  const isValidMiningHarvestAPR = React.useMemo(() => {
    return isValidTVL && isPositiveSHOMESHPrice && isValidMiningHarvest;
  }, [isValidTVL, isPositiveSHOMESHPrice, isValidMiningHarvest]);

  const miningHarvestAPRBN = React.useMemo(() => {
    if (!isValidMiningHarvestAPR) return BN(0);

    const miningHarvestSHOMESHMESHBN = BN(miningHarvest.to_shoMESH_MESH);
    const isValidMiningHArvest = !miningHarvestSHOMESHMESHBN.isNaN();
    if (!isValidMiningHArvest) return BN(0);
    return shoMESHPriceBN
      .times(miningHarvestSHOMESHMESHBN * 365)
      .times(100)
      .div(tvlBN);
  }, [isValidMiningHarvestAPR, shoMESHPriceBN, tvlBN]);

  const displayMiningHarvestAPR = React.useMemo(() => {
    if (!isValidMiningHarvestAPR) return "-";

    if (!isBNPositive(miningHarvestAPRBN)) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(miningHarvestAPRBN.toString());
  }, [isValidMiningHarvestAPR, miningHarvestAPRBN]);

  return {
    isLoadingMiningHarvestAPR,
    displayMiningHarvestAPR
  };
}
