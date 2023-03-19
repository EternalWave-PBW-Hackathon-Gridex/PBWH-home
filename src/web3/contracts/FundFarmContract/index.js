import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import FundFarm from "./FundFarm";

const FundFarmContract = new ethers.Contract(
  FundFarm.address,
  FundFarm.abi,
  AlchemyProvider
);

export default FundFarmContract;
