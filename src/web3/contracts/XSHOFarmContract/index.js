import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import XSHOFarm from "./XSHOFarm";

const XSHOFarmContract = new ethers.Contract(
  XSHOFarm.address,
  XSHOFarm.abi,
  AlchemyProvider
);

export default XSHOFarmContract;
