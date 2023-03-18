import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import MESH from "./MESH";

export const MESHMainnetAddress = "0x82362Ec182Db3Cf7829014Bc61E9BE8a2E82868a";

const MESHTokenContract = new ethers.Contract(
  MESH.address,
  MESH.abi,
  AlchemyProvider
);

export default MESHTokenContract;
