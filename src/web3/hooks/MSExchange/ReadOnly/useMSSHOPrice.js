import React from "react";
import { ethers } from "ethers";
import { MSViewContract } from "../../../contracts/MSExchangeContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import SHO from "../../../contracts/SHOTokenContract/SHO";
import USDC from "../../../contracts/USDCTokenContract/USDC";

export default function useMSSHOPrice(fromAddress) {
  /** shoPrice */
  const [shoPrice, setSHOPrice] = React.useState(null);
  const [shoPriceState, setSHOPriceState] = React.useState(
    ContractCallState.NEW
  );
  const fetch = async () => {
    try {
      setSHOPriceState(ContractCallState.FETCHING);
      let shoPrice = await MSViewContract.estimateSwap(
        "1000000000000000000",
        [SHO.address, USDC.address],
        {
          from: fromAddress
        }
      );

      setSHOPriceState(ContractCallState.SUCCESS);
      setSHOPrice(ethers.utils.formatUnits(shoPrice, "mwei"));
    } catch (error) {
      console.error(error.message);
      setSHOPriceState(ContractCallState.ERROR);
      setSHOPrice(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(shoPriceState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(shoPrice, isCallSuccess);

  return {
    shoPrice,
    isLoadingSHOPrice: isLoading,
    isCallSuccessSHOPrice: isCallSuccess,
    shoPriceBN: bn,
    isValidSHOPrice: isValid,
    isPositiveSHOPrice: isPositive,
    displaySHOPrice: display,
    convertedSHOPrice: numbered,

    fetchSHOPrice: fetch
  };
}
