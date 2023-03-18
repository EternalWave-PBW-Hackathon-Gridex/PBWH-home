import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import LPFarm from "./LPFarm";

const LPFarmContract = new ethers.Contract(
  LPFarm.address,
  LPFarm.abi,
  AlchemyProvider
);

export default LPFarmContract;
