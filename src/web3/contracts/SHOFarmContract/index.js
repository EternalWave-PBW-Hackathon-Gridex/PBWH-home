import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import SHOFarm from "./SHOFarm";

const SHOFarmContract = new ethers.Contract(
  SHOFarm.address,
  SHOFarm.abi,
  AlchemyProvider
);

export default SHOFarmContract;
