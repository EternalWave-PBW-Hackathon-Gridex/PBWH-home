import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import USDC from "./USDC";

const USDCTokenContract = new ethers.Contract(
  USDC.address,
  USDC.abi,
  AlchemyProvider
);

export default USDCTokenContract;
