import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import LockdropLPFarmProxy from "./LockdropLPFarmProxy";

const LockdropLPFarmProxyContract = new ethers.Contract(
  LockdropLPFarmProxy.address,
  LockdropLPFarmProxy.abi,
  AlchemyProvider
);

export default LockdropLPFarmProxyContract;
