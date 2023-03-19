import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import GDX from "./GDX";

const GDXTokenContract = new ethers.Contract(
  GDX.address,
  GDX.abi,
  AlchemyProvider
);

export default GDXTokenContract;
