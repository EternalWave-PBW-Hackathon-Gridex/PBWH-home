import { ethers } from "ethers";
import { CHAINS } from "../context/constants";
import { isProduction } from "../utils/constants";

import MESHlogo from "../assets/images/global_token_MESH.png";
import USDTlogo from "../assets/images/global_token_USDT.png";
import USDClogo from "../assets/images/global_token_USDC.png";
import SHOlogo from "../assets/images/global_token_SHO.png";
import xSHOlogo from "../assets/images/global_token_xSHO.png";
import SHOUSDCLogo from "../assets/images/global_token_SHO-USDC.png";
import shoMESHMESHLogo from "../assets/images/global_token_shoMESH-MESH.png";
import SHOMESHLogo from "../assets/images/global_token_shoMESH.png";

export const ContractCallState = {
  NEW: "NEW",
  FETCHING: "FETCHING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

export const TOKENS = {
  /** SHOGUN */

  SHO: {
    name: "SHO",
    logo: SHOlogo
  },
  xSHO: {
    name: "xSHO",
    logo: xSHOlogo
  },
  vxSHO: {
    name: "vxSHO",
    logo: xSHOlogo
  },
  shoMESH: {
    name: "shoMESH",
    logo: SHOMESHLogo
  },

  /** LP */
  "shoMESH/MESH": {
    name: "shoMESH/MESH",
    logo: shoMESHMESHLogo
  },
  "SHO/USDC": {
    name: "SHO/USDC",
    logo: SHOUSDCLogo
  },

  /** Generals */
  MESH: {
    name: "MESH",
    logo: MESHlogo
  },
  vMESH: {
    name: "vMESH",
    logo: MESHlogo
  },
  MATIC: {
    name: "MATIC"
  },
  USDT: {
    name: "USDT",
    logo: USDTlogo
  },
  USDC: {
    name: "USDC",
    logo: USDClogo
  },

  // GRINDEX
  ETH: {
    name: "ETH",
    logo: MESHlogo
  },
  wETH: {
    name: "wETH",
    logo: MESHlogo
  },
  GDX: {
    name: "GDX",
    logo: SHOlogo
  },
  BTC: {
    name: "BTC",
    logo: xSHOlogo
  },
  GRIN: {
    name: "GRIN",
    logo: SHOlogo
  },
  xGRIN: {
    name: "xGRIN",
    logo: xSHOlogo
  },
  "wETH/GDX": {
    name: "wETH/GDX",
    logo: shoMESHMESHLogo
  },
  "BTC/ETH/GDX": {
    name: "BTC/ETH/GDX",
    logo: shoMESHMESHLogo
  }
};

export const AlchemyProvider = new ethers.providers.JsonRpcProvider(
  CHAINS[isProduction ? "ABITRUM" : "GOERLI"].rpcUrl
);

export const AlchemyMainnetProvider = new ethers.providers.JsonRpcProvider(
  CHAINS.ABITRUM.rpcUrl
);

export const wETHPrice = 1780;
export const GDXPrice = 1.34;
