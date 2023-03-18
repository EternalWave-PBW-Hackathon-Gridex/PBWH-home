import { isProduction } from "../../../utils/constants";

export default {
  address: isProduction
    ? "0x92D1c3dFa8e6c04d25D76fb08fEd2EC03cE7c923"
    : "0x234DA77F5c0FfD83d9BFf30025bE2709639FF2e0",
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "previousAdmin",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "newAdmin",
          type: "address"
        }
      ],
      name: "AdminChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
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
          name: "value",
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
          name: "beacon",
          type: "address"
        }
      ],
      name: "BeaconUpgraded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "depositer",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "DepositMESH",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "ecopot",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "EcopotVoted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "meshAmount",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "usdtAmount",
          type: "uint256"
        }
      ],
      name: "ForwardedFee",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint8",
          name: "version",
          type: "uint8"
        }
      ],
      name: "Initialized",
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
          name: "value",
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
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "implementation",
          type: "address"
        }
      ],
      name: "Upgraded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "pool",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Voted",
      type: "event"
    },
    {
      inputs: [],
      name: "MAX_LOCK_PERIOD",
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
      name: "addAllVotings",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "exchange",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "addVoting",
      outputs: [],
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
          name: "_token",
          type: "address"
        },
        {
          internalType: "address",
          name: "_to",
          type: "address"
        }
      ],
      name: "approveToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_token",
          type: "address[]"
        },
        {
          internalType: "address[]",
          name: "_to",
          type: "address[]"
        }
      ],
      name: "approveTokens",
      outputs: [],
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
      inputs: [
        {
          internalType: "uint256",
          name: "proposalId",
          type: "uint256"
        },
        {
          internalType: "bool",
          name: "support",
          type: "bool"
        }
      ],
      name: "castVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_dropboxAddr",
          type: "address"
        },
        {
          internalType: "contract IERC20Upgradeable",
          name: "_airdropToken",
          type: "address"
        },
        {
          internalType: "address",
          name: "_dropsEntryAddr",
          type: "address"
        },
        {
          internalType: "address",
          name: "_beneficiary",
          type: "address"
        }
      ],
      name: "claimDropsTokensTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "exchange",
          type: "address"
        }
      ],
      name: "claimPoolVotingReward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "claimPoolVotingRewardAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "claimVotingMESHReward",
      outputs: [],
      stateMutability: "nonpayable",
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
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "depositMESH",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_ecopotAddr",
          type: "address"
        }
      ],
      name: "ecopotAddVoting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "ecopotClaimRewardAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "ecopotRemoveAllVoting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "feeDistributor",
      outputs: [
        {
          internalType: "contract IFeeDistributor",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "forwardFeeToFeeDistributor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "meshToken",
      outputs: [
        {
          internalType: "contract IERC20Upgradeable",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "meshswapRouter",
      outputs: [
        {
          internalType: "contract IMESHswapRouter",
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
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "operators",
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
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
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
      name: "poolVoting",
      outputs: [
        {
          internalType: "contract IPoolVoting",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "proxiableUUID",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "lockPeriodRequested",
          type: "uint256"
        }
      ],
      name: "refixBoosting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "removeAllVoting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "exchange",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "removeVoting",
      outputs: [],
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
      inputs: [
        {
          internalType: "address",
          name: "_operator",
          type: "address"
        }
      ],
      name: "revokeOperator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IERC20Upgradeable",
          name: "_meshToken",
          type: "address"
        },
        {
          internalType: "contract IERC20Upgradeable",
          name: "_usdtToken",
          type: "address"
        },
        {
          internalType: "contract IVotingMESH",
          name: "_votingMESH",
          type: "address"
        },
        {
          internalType: "contract IPoolVoting",
          name: "_poolVoting",
          type: "address"
        },
        {
          internalType: "contract IShogunVoter",
          name: "_shogunVoter",
          type: "address"
        },
        {
          internalType: "contract IMESHswapRouter",
          name: "_meshswapRouter",
          type: "address"
        },
        {
          internalType: "contract IFeeDistributor",
          name: "_feeDistributor",
          type: "address"
        }
      ],
      name: "setInitialInfo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IMESHswapRouter",
          name: "_meshSwapRouter",
          type: "address"
        }
      ],
      name: "setMESHswapRouter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IEcoPotVoting",
          name: "_ecopotVoting",
          type: "address"
        }
      ],
      name: "setMeshswapEcopotVoting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IMeshswapGovernor",
          name: "_meshswapGovernor",
          type: "address"
        }
      ],
      name: "setMeshswapGovernor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_operators",
          type: "address[]"
        }
      ],
      name: "setOperator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_shogunMeshswapGovernAddr",
          type: "address"
        }
      ],
      name: "setShogunMeshswapGovern",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IShogunVoter",
          name: "_shogunVoter",
          type: "address"
        }
      ],
      name: "setShogunVoter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "shoMESHToken",
      outputs: [
        {
          internalType: "contract IERC20Upgradeable",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "shogunVoter",
      outputs: [
        {
          internalType: "contract IShogunVoter",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }
      ],
      name: "swapETHForExactTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountOutMin",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }
      ],
      name: "swapExactETHForTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountOutMin",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }
      ],
      name: "swapExactTokensForETH",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountOutMin",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }
      ],
      name: "swapExactTokensForTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountInMax",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }
      ],
      name: "swapTokensForExactETH",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "amountInMax",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "path",
          type: "address[]"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256"
        }
      ],
      name: "swapTokensForExactTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]"
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
    },
    {
      inputs: [],
      name: "unlockMESH",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address"
        }
      ],
      name: "upgradeTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address"
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes"
        }
      ],
      name: "upgradeToAndCall",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [],
      name: "usdtToken",
      outputs: [
        {
          internalType: "contract IERC20Upgradeable",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "votingMESH",
      outputs: [
        {
          internalType: "contract IVotingMESH",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      stateMutability: "payable",
      type: "receive"
    }
  ]
};
