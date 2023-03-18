import { isProduction } from "../../../utils/constants";

export default {
  address: isProduction
    ? "0x47485a69ad48882cB99Ae664be60DeDFE4f99bce"
    : "0x0000000000000000000000000000000000000000",
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
          name: "user",
          type: "address"
        }
      ],
      name: "AllVoteWithdrawn",
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
          name: "poolAddress",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "Burn",
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
          indexed: false,
          internalType: "address",
          name: "poolAddress",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "beneficiary",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "Mint",
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
          name: "poolAddress",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalPoolLength",
          type: "uint256"
        }
      ],
      name: "PoolAdded",
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
          name: "id",
          type: "uint256"
        }
      ],
      name: "Snapshot",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "snapshotPoolCount",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256"
        }
      ],
      name: "SnapshotAll",
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
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "poolAddress",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "withdrawnAmount",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newPoolVxSHOAmount",
          type: "uint256"
        }
      ],
      name: "VoteWithdrawn",
      type: "event"
    },
    {
      inputs: [],
      name: "MAX_SUBMIT_POOL",
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
      name: "MAX_VOTES_WITH_BUFFER",
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
      name: "TOP_VOTES_POOL_COUNT",
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
      name: "TOP_YIELD_POOL_COUNT",
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
      name: "USER_MAX_VOTE_POOL",
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
          internalType: "address[]",
          name: "_pools",
          type: "address[]"
        },
        {
          internalType: "uint256[]",
          name: "_vxSHOAmounts",
          type: "uint256[]"
        }
      ],
      name: "addAllPoolVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_pool",
          type: "address"
        }
      ],
      name: "addPool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "availableVotes",
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
          name: "",
          type: "address"
        },
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
          internalType: "address",
          name: "_pool",
          type: "address"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "snapshotId",
          type: "uint256"
        }
      ],
      name: "balanceOfAt",
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
      name: "deleteAllPoolVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "deleteAllPoolVoteFromXSHOFarm",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_pool",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_vxSHOAmount",
          type: "uint256"
        }
      ],
      name: "deletePoolVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_pool",
          type: "address"
        }
      ],
      name: "getCurrentSnapshotId",
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
      name: "getCurrentTopVotes",
      outputs: [
        {
          internalType: "address[13]",
          name: "",
          type: "address[13]"
        },
        {
          internalType: "uint256[13]",
          name: "",
          type: "uint256[13]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "getCurrentVotes",
      outputs: [
        {
          internalType: "uint256",
          name: "_vxSHOTotalSupply",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "pools",
          type: "address[]"
        },
        {
          internalType: "uint256[]",
          name: "weights",
          type: "uint256[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "getPoolCount",
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
          name: "_user",
          type: "address"
        }
      ],
      name: "getUserPoolVotes",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "pool",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "vxSHOAmount",
              type: "uint256"
            }
          ],
          internalType: "struct ShogunVoterV1.PoolVote[]",
          name: "",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "getUserVotesCount",
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
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_pool",
          type: "address"
        }
      ],
      name: "isPool",
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
      name: "minTopVote",
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
      name: "minTopVoteIndex",
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
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "poolAddresses",
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
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "poolInfos",
      outputs: [
        {
          internalType: "uint256",
          name: "vxSHOAmount",
          type: "uint256"
        },
        {
          internalType: "bool",
          name: "isInitiated",
          type: "bool"
        },
        {
          internalType: "uint256",
          name: "listPointer",
          type: "uint256"
        },
        {
          internalType: "uint8",
          name: "topVotesIndex",
          type: "uint8"
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
          internalType: "address[]",
          name: "_lpPools",
          type: "address[]"
        },
        {
          internalType: "address[]",
          name: "_topYieldPools",
          type: "address[]"
        },
        {
          internalType: "contract IvxERC20",
          name: "_vxSHO",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_userMaxVote",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_xSHOFarm",
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
          internalType: "address[]",
          name: "_pools",
          type: "address[]"
        }
      ],
      name: "setTopYieldPools",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256"
        }
      ],
      name: "setUserMaxVotePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_pool",
          type: "address"
        }
      ],
      name: "snapshot",
      outputs: [
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
      name: "snapshotAll",
      outputs: [
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
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "topVotes",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "topVotesLength",
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
          name: "",
          type: "uint256"
        }
      ],
      name: "topYieldPools",
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
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
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
          name: "_pool",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "snapshotId",
          type: "uint256"
        }
      ],
      name: "totalSupplyAt",
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
      name: "totalUsedVxSHO",
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
      name: "userPoolInfos",
      outputs: [
        {
          internalType: "uint256",
          name: "poolVoteIndex",
          type: "uint256"
        },
        {
          internalType: "bool",
          name: "isVoted",
          type: "bool"
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
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "userPoolVotes",
      outputs: [
        {
          internalType: "address",
          name: "pool",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "vxSHOAmount",
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
          name: "",
          type: "address"
        }
      ],
      name: "userTotalUsedVxSHO",
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
      name: "vxSHO",
      outputs: [
        {
          internalType: "contract IvxERC20",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ]
};
