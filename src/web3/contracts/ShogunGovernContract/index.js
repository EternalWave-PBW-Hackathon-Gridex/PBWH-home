import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import ShogunGovern from "./ShogunGovern";

const ShogunGovernContract = new ethers.Contract(
  ShogunGovern.address,
  ShogunGovern.abi,
  AlchemyProvider
);

export default ShogunGovernContract;
