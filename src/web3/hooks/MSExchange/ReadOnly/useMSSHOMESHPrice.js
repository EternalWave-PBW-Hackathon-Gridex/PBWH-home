import React from "react";
import { ethers } from "ethers";
import { MSViewContract } from "../../../contracts/MSExchangeContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import USDC from "../../../contracts/USDCTokenContract/USDC";
import MESH from "../../../contracts/MESHTokenContract/MESH";
import { MeshswapEscrowMainnetAddress } from "../../../contracts/MeshswapEscrowContract";

export default function useMSSHOMESHPrice(fromAddress) {
  /** shoMESHPrice */
  const [shoMESHPrice, setSHOMESHPrice] = React.useState(null);
  const [shoMESHPriceState, setSHOMESHPriceState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setSHOMESHPriceState(ContractCallState.FETCHING);
      let shoMESHPrice = await MSViewContract.estimateSwap(
        "1000000000000000000",
        [MeshswapEscrowMainnetAddress, MESH.address, USDC.address],
        {
          from: fromAddress
        }
      );

      setSHOMESHPriceState(ContractCallState.SUCCESS);
      setSHOMESHPrice(ethers.utils.formatUnits(shoMESHPrice.toString(), 6));
    } catch (error) {
      console.error(error.message);
      setSHOMESHPriceState(ContractCallState.ERROR);
      setSHOMESHPrice(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(shoMESHPriceState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(shoMESHPrice, isCallSuccess);

  return {
    shoMESHPrice,
    isLoadingSHOMESHPrice: isLoading,
    isCallSuccessSHOMESHPrice: isCallSuccess,
    shoMESHPriceBN: bn,
    isValidSHOMESHPrice: isValid,
    isPositiveSHOMESHPrice: isPositive,
    displaySHOMESHPrice: display,
    convertedSHOMESHPrice: numbered,

    fetchSHOMESHPrice: fetch
  };
}
