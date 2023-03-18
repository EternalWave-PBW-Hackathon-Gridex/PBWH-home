import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import SHOMESHFarm from "./SHOMESHFarm";

const SHOMESHFarmContract = new ethers.Contract(
  SHOMESHFarm.address,
  SHOMESHFarm.abi,
  AlchemyProvider
);
export default SHOMESHFarmContract;
