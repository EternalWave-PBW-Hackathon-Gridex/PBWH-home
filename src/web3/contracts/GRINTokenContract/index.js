import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import GRIN from "./GRIN";

const GRINTokenContract = new ethers.Contract(
  GRIN.address,
  GRIN.abi,
  AlchemyProvider
);

export default GRINTokenContract;
