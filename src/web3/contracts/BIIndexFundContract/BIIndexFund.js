import { isProduction } from "../../../utils/constants";
export default {
  address: isProduction
    ? "0x924a772a0AFa8D85B21057485168d56F8f817453"
    : "0xD90fE3d7522f210A9e6d4B471B8c01CD9B3F8C61",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_rebalancingPeriod",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_rebalancingThreshold",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_token0",
          type: "address"
        },
        {
          internalType: "address",
          name: "_token1",
          type: "address"
        },
        {
          internalType: "address",
          name: "_operator",
          type: "address"
        },
        {
          internalType: "contract IMakerOrderManager",
          name: "_makerOrderManager",
          type: "address"
        },
        {
          internalType: "int24",
          name: "_RESOLUTION",
          type: "int24"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "token0",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address",
          name: "token1",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "liquidity",
          type: "uint256"
        }
      ],
      name: "AddLiquidity",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "holder",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "Paused",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "orderId",
          type: "uint256"
        }
      ],
      name: "PlaceOrder",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "token0",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount0",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address",
          name: "token1",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount1",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "liquidity",
          type: "uint256"
        }
      ],
      name: "RemoveLiquidity",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint112",
          name: "reserveA",
          type: "uint112"
        },
        {
          indexed: false,
          internalType: "uint112",
          name: "reserveB",
          type: "uint112"
        }
      ],
      name: "Sync",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "Unpaused",
      type: "event"
    },
    {
      inputs: [],
      name: "RESOLUTION",
      outputs: [
        {
          internalType: "int24",
          name: "",
          type: "int24"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "VERSION",
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
      inputs: [
        {
          internalType: "uint256",
          name: "amount0",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amount1",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "minAmount0",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "minAmount1",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "user",
          type: "address"
        }
      ],
      name: "addTokenLiquidityWithLimit",
      outputs: [
        {
          internalType: "uint256",
          name: "real0",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "real1",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountLP",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "allowance",
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
      inputs: [
        {
          internalType: "address",
          name: "_spender",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "balanceOf",
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
      name: "blockTimestampLast",
      outputs: [
        {
          internalType: "uint32",
          name: "",
          type: "uint32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "entered",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "getCurrentPool",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
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
      name: "getReserves",
      outputs: [
        {
          internalType: "uint112",
          name: "_reserve0",
          type: "uint112"
        },
        {
          internalType: "uint112",
          name: "_reserve1",
          type: "uint112"
        },
        {
          internalType: "uint32",
          name: "_blockTimestampLast",
          type: "uint32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "kLast",
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
      name: "lpToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "makerOrderManager",
      outputs: [
        {
          internalType: "contract IMakerOrderManager",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "operator",
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
      name: "owner",
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
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "price0CumulativeLast",
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
      name: "price1CumulativeLast",
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
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address"
        },
        {
          internalType: "uint128",
          name: "amount",
          type: "uint128"
        }
      ],
      name: "rebalance",
      outputs: [
        {
          internalType: "uint256",
          name: "orderId",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "rebalancingPeriod",
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
      name: "rebalancingThreshold",
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
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "minAmount0",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "minAmount1",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "user",
          type: "address"
        }
      ],
      name: "removeLiquidityWithLimit",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "reserve0",
      outputs: [
        {
          internalType: "uint112",
          name: "",
          type: "uint112"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "reserve1",
      outputs: [
        {
          internalType: "uint112",
          name: "",
          type: "uint112"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "orderId",
          type: "uint256"
        }
      ],
      name: "settleAndCollect",
      outputs: [
        {
          internalType: "uint128",
          name: "amount0",
          type: "uint128"
        },
        {
          internalType: "uint128",
          name: "amount1",
          type: "uint128"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "token0",
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
      name: "token1",
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
      name: "totalSupply",
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
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256"
        }
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address"
        },
        {
          internalType: "address",
          name: "_to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ]
};
