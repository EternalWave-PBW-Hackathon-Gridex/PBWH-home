import React from "react";
import { ethers } from "ethers";
import { MSViewContract } from "../../../contracts/MSExchangeContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";
import { MESHMainnetAddress } from "../../../contracts/MESHTokenContract";
import USDC from "../../../contracts/USDCTokenContract/USDC";

export default function useMSMESHPrice(fromAddress) {
  /** meshPrice */
  const [meshPrice, setMeshPrice] = React.useState(null);
  const [meshPriceState, setMeshPriceState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setMeshPriceState(ContractCallState.FETCHING);
      let meshPrice = await MSViewContract.estimateSwap(
        "1000000000000000000",
        [MESHMainnetAddress, USDC.address],
        {
          from: fromAddress
        }
      );

      setMeshPriceState(ContractCallState.SUCCESS);
      setMeshPrice(ethers.utils.formatUnits(meshPrice.toString(), 6));
    } catch (error) {
      console.error(error.message);
      setMeshPriceState(ContractCallState.ERROR);
      setMeshPrice(null);
    }
  };
  const { isCallSuccess, isLoading } = useConstantProperties(meshPriceState);
  const { bn, isValid, isPositive, numbered, display, displayNumberFormat } =
    useNumericTokenConstants(meshPrice, isCallSuccess);

  return {
    meshPrice,
    isLoadingMeshPrice: isLoading,
    isCallSuccessMeshPrice: isCallSuccess,
    meshPriceBN: bn,
    isValidMeshPrice: isValid,
    displayMeshPrice: display,
    convertedMeshPrice: numbered,

    fetchMeshPrice: fetch
  };
}
