import { ethers } from "ethers";
import { AlchemyMainnetProvider } from "../../constants";
import MSLP from "./MSLP";
import MSView from "./MSView";

export const MESHSWAP_LP_EXCHANGES = {
  "MESH/USDC": "0xaC48153F3604318F9559224931b541755aE8Ae6e",
  "SHO/USDC": "0xa718ae6d3962271b8095251b8bc4153ba84d0b37",
  "shoMESH/MESH": "0x179E9CE02CFCDd437ee97F3AD58d53731CE71682"
};

export const MSLPContract = (exchangeAddress) => {
  return new ethers.Contract(exchangeAddress, MSLP.abi, AlchemyMainnetProvider);
};

export const MSViewContract = new ethers.Contract(
  MSView.address,
  MSView.abi,
  AlchemyMainnetProvider
);
