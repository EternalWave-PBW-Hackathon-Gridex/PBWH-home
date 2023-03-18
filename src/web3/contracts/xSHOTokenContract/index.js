import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import xSHO from "./xSHO";

const xSHOTokenContract = new ethers.Contract(
  xSHO.address,
  xSHO.abi,
  AlchemyProvider
);

export default xSHOTokenContract;
