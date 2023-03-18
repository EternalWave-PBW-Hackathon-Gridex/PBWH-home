import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import SHO from "./SHO";

const SHOTokenContract = new ethers.Contract(
  SHO.address,
  SHO.abi,
  AlchemyProvider
);

export default SHOTokenContract;
