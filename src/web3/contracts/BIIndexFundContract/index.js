import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import BIIndexFund from "./BIIndexFund";

const BIIndexFundContract = new ethers.Contract(
  BIIndexFund.address,
  BIIndexFund.abi,
  AlchemyProvider
);

export default BIIndexFundContract;
