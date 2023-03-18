import { isProduction } from "../../utils/constants";
import { ethers } from "ethers";
import { BN, isBNPositive } from "../utils/AKBN";
import { CHAINS } from "../../context/constants";

export const ContractCallState = {
  NEW: "NEW",
  FETCHING: "FETCHING",

  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

export const TestContractInfo = {
  address: isProduction
    ? "0xee47cB4AA93f1f5ee89B4688c4D01a51D501cfa9"
    : "0xee47cB4AA93f1f5ee89B4688c4D01a51D501cfa9",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "changeOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "num",
          type: "uint256"
        }
      ],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "oldOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnerSet",
      type: "event"
    },
    {
      inputs: [],
      name: "getOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "number",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "retrieve",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ]
};

const AlchemyProvider = new ethers.providers.JsonRpcProvider(
  CHAINS.GOERLI.rpcUrl
);

export const TestContract = new ethers.Contract(
  TestContractInfo.address,
  TestContractInfo.abi,
  AlchemyProvider
);
