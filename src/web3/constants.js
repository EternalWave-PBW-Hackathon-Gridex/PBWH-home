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
  }
};

export const AlchemyProvider = new ethers.providers.JsonRpcProvider(
  CHAINS[isProduction ? "POLYGON" : "MUMBAI"].rpcUrl
);

export const AlchemyMainnetProvider = new ethers.providers.JsonRpcProvider(
  CHAINS.POLYGON.rpcUrl
);
