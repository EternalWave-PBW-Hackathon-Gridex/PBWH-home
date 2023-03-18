import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import vxSHO from "./vxSHO";

const vxSHOTokenContract = new ethers.Contract(
  vxSHO.address,
  vxSHO.abi,
  AlchemyProvider
);

export default vxSHOTokenContract;
