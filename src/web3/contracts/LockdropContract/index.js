import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import Lockdrop from "./Lockdrop";

const LockdropContract = new ethers.Contract(
  Lockdrop.address,
  Lockdrop.abi,
  AlchemyProvider
);

export default LockdropContract;
