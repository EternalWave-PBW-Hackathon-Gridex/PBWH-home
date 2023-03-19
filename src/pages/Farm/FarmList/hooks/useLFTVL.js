import React from "react";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import Connector from "../../../../context/WalletConnector/Connector";
import { BN } from "../../../../web3/utils/AKBN";
import useERC20Balance from "../../../../web3/hooks/ERC20/useERC20Balance";
import useMSExchangeConstants from "../../../../web3/hooks/MSExchange/ReadOnly/useMSExchangeConstants";
import LPFarm from "../../../../web3/contracts/LPFarmContract/LPFarm";
import { MESHSWAP_LP_EXCHANGES } from "../../../../web3/contracts/MSExchangeContract";
import { getAbbreviateNumberFormat } from "../../../../web3/utils/numberFormat";
import TokenPriceConnector from "../../../../context/TokenPriceConnector";

export default function useLFTVL({ farmItem, LPTokenContract }) {
  let { address } = Connector.useContainer();
  const { isLoadingSHOPrice, shoPriceBN, isValidSHOPrice, fetchSHOPrice } =
    TokenPriceConnector.useContainer();

  const {
    isLoadingBalance: isLoadingSHOUSDCLPBalance,
    balanceBN: SHOUSDCLPBalanceBN,
    isPositiveBalance: isPositiveSHOUSDCLPBalance,
    fetchBalance
  } = useERC20Balance(LPTokenContract);

  const {
    isLoadingTotalSupply,
    isPositiveTotalSupply,
    numberedTotalSupply,
    fetchTotalSupply,

    isLoadingCurrentPool,
    isValidCurrentPool,
    symbolACurrentPoolBN,
    symbolBCurrentPoolBN,
    fetchCurrentPool
  } = useMSExchangeConstants(address);

  useSigmaDidMount(
    () => {
      fetchTVL();
    },
    [],
    false
  );

  const fetchTVL = () => {
    fetchSHOPrice();
    fetchTotalSupply(MESHSWAP_LP_EXCHANGES[farmItem.token.name]);
    fetchCurrentPool(MESHSWAP_LP_EXCHANGES[farmItem.token.name]);
    fetchBalance(LPFarm.address);
    //     fetchKSPPrice({ isConnectionCheck: false });
  };

  /** Loadings */
  const isLoadingLPValue = React.useMemo(() => {
    return isLoadingSHOPrice || isLoadingCurrentPool || isLoadingTotalSupply;
  }, [isLoadingSHOPrice, isLoadingCurrentPool, isLoadingTotalSupply]);

  const isLoadingTVL = React.useMemo(() => {
    return isLoadingLPValue || isLoadingSHOUSDCLPBalance;
  }, [isLoadingLPValue, isLoadingSHOUSDCLPBalance]);

  /** Validations */
  const isValidLPValue = React.useMemo(() => {
    return isValidCurrentPool && isPositiveTotalSupply && isValidSHOPrice;
  }, [isValidCurrentPool, isPositiveTotalSupply, isValidSHOPrice]);

  const isValidTVL = React.useMemo(() => {
    return isValidLPValue && isPositiveSHOUSDCLPBalance;
  }, [isValidLPValue, isPositiveSHOUSDCLPBalance]);

  /** Displays */

  const lpValueBN = React.useMemo(() => {
    if (!isValidLPValue) return BN(0);
    return symbolACurrentPoolBN
      .times(2)
      .times(shoPriceBN)
      .div(numberedTotalSupply);
  }, [shoPriceBN, symbolACurrentPoolBN, isValidLPValue]);

  const tvlBN = React.useMemo(() => {
    if (!isValidTVL) return BN(0);
    return lpValueBN.times(SHOUSDCLPBalanceBN);
  }, [isValidTVL, lpValueBN, SHOUSDCLPBalanceBN]);

  const displayTVL = React.useMemo(() => {
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(tvlBN.toString());
  }, [tvlBN]);

  return {
    isLoadingLPValue,
    isLoadingTVL,
    isValidLPValue,
    isValidTVL,
    lpValueBN,
    tvlBN,
    displayTVL,

    fetchTVL
  };
}
