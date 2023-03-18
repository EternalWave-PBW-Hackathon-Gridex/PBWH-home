import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import MeshswapEscrow from "./MeshswapEscrow";

export const MeshswapEscrowMainnetAddress =
  "0x92D1c3dFa8e6c04d25D76fb08fEd2EC03cE7c923";

const MeshswapEscrowContract = new ethers.Contract(
  MeshswapEscrow.address,
  MeshswapEscrow.abi,
  AlchemyProvider
);

export default MeshswapEscrowContract;
