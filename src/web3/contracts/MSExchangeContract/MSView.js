import { isProduction } from "../../../utils/constants";
export default {
  address: isProduction
    ? "0xF61e4ede9128A9FA9a128cB7D161F4e73bd464Da"
    : "0xF61e4ede9128A9FA9a128cB7D161F4e73bd464Da",
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]"
        }
      ],
      name: "estimateSwap",
      outputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "lp",
          type: "address"
        },
        {
          internalType: "address",
          name: "user",
          type: "address"
        }
      ],
      name: "getPendingReward",
      outputs: [
        {
          internalType: "uint256",
          name: "meshReward",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "airdropCount",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "airdropTokens",
          type: "address[]"
        },
        {
          internalType: "uint256[]",
          name: "airdropRewards",
          type: "uint256[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "lp",
          type: "address"
        }
      ],
      name: "getPoolData",
      outputs: [
        {
          internalType: "uint256",
          name: "miningRate",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "rateDecimals",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "token0",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "reserveA",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "token1",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "reserveB",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "airdropCount",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "airdropTokens",
          type: "address[]"
        },
        {
          internalType: "uint256[]",
          name: "airdropSettings",
          type: "uint256[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ]
};
