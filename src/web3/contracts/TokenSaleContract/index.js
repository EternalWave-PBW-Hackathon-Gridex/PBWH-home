import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import TokenSale from "./TokenSale";

const TokenSaleContract = new ethers.Contract(
  TokenSale.address,
  TokenSale.abi,
  AlchemyProvider
);

export default TokenSaleContract;
