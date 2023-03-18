import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import LPFarmMiningRateHelper from "./LPFarmMiningRateHelper";

const LPFarmMiningRateHelperContract = new ethers.Contract(
  LPFarmMiningRateHelper.address,
  LPFarmMiningRateHelper.abi,
  AlchemyProvider
);

export default LPFarmMiningRateHelperContract;
