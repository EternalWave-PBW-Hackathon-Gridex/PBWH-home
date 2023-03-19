import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import GRINFarm from "./GRINFarm";

const GRINFarmContract = new ethers.Contract(
  GRINFarm.address,
  GRINFarm.abi,
  AlchemyProvider
);

export default GRINFarmContract;
