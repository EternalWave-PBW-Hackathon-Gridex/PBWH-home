import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import ShogunVoter from "./ShogunVoter";

const ShogunVoterContract = new ethers.Contract(
  ShogunVoter.address,
  ShogunVoter.abi,
  AlchemyProvider
);

export default ShogunVoterContract;
