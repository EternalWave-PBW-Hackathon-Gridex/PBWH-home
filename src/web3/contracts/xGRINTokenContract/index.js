import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import xGRIN from "./xGRIN";

const xGRINTokenContract = new ethers.Contract(
  xGRIN.address,
  xGRIN.abi,
  AlchemyProvider
);

export default xGRINTokenContract;
