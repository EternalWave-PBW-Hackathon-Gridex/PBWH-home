import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import WETH from "./WETH";

const WETHTokenContract = new ethers.Contract(
  WETH.address,
  WETH.abi,
  AlchemyProvider
);

export default WETHTokenContract;
