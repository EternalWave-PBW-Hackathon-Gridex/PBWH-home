import { isProduction } from "../../../utils/constants";
export default {
  address: isProduction
    ? "0x546310dBa9FC003684Ed9D808f0cAe9bc3728462"
    : "0xD20B656d9af112182386Ad0EBba3f143e9CfC61e",
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_baseAllocPoint",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_boostAllocPoint",
          type: "uint256"
        },
        {
          internalType: "contract IERC20Upgradeable",
          name: "_lpToken",
          type: "address"
        }
      ],
      name: "addPool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
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
          name: "beacon",
          type: "address"
        }
      ],
      name: "BeaconUpgraded",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        }
      ],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Claim",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        }
      ],
      name: "claimMiningRateReward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        }
      ],
      name: "claimMiningRewardAndForward",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "deposit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Deposit",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_lockingPeriod",
          type: "uint256"
        }
      ],
      name: "forwardLpTokensFromLockdrop",
      outputs: [],
      stateMutability: "nonpayable",
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
      name: "fund",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newEndBlock",
          type: "uint256"
        }
      ],
      name: "Funded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "rewardPerBlock",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "startBlock",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "endBlock",
          type: "uint256"
        }
      ],
      name: "InitialInfoSet",
      type: "event"
    },
    {
      inputs: [],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "LockdropDeposit",
      type: "event"
    },
    {
      inputs: [],
      name: "massUpdatePools",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
          name: "lpToken",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "pid",
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
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalAlloc",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "baseTotalAlloc",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "boostTotalAlloc",
          type: "uint256"
        }
      ],
      name: "PoolSet",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_lpAmount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_totalMESHAmount",
          type: "uint256"
        }
      ],
      name: "releaseLockdropLpToken",
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
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "rewardPerBlock",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "endBlock",
          type: "uint256"
        }
      ],
      name: "RewardPerBlockSet",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_feeDistributor",
          type: "address"
        }
      ],
      name: "setFeeDistributor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IERC20Upgradeable",
          name: "_sho",
          type: "address"
        },
        {
          internalType: "contract IERC20Upgradeable",
          name: "_mesh",
          type: "address"
        },
        {
          internalType: "contract IvxERC20",
          name: "_vxSHO",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_rewardPerBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_startBlock",
          type: "uint256"
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
          internalType: "address",
          name: "_lockdropProxy",
          type: "address"
        }
      ],
      name: "setLockdropProxy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_miningRateHelper",
          type: "address"
        }
      ],
      name: "setMiningRateHelper",
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
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_baseAllocPoint",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_boostAllocPoint",
          type: "uint256"
        }
      ],
      name: "setPool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_address",
          type: "address"
        }
      ],
      name: "setPoolLpAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_rewardPerBlock",
          type: "uint256"
        }
      ],
      name: "setRewardPerBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IvxERC20",
          name: "_vxSHO",
          type: "address"
        }
      ],
      name: "setVxSHOAddress",
      outputs: [],
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
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "updateBoostWeight",
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
        },
        {
          internalType: "uint256",
          name: "_userTotalAmount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_lockingPeriod",
          type: "uint256"
        }
      ],
      name: "updateLockdropAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        }
      ],
      name: "updatePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
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
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Withdraw",
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
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "WithdrawLockdropLP",
      type: "event"
    },
    {
      inputs: [],
      name: "withdrawLockdropLPTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "baseTotalAllocPoint",
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
      name: "boostTotalAllocPoint",
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
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "deposited",
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
      name: "endBlock",
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
      inputs: [
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "getUserBasePending",
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
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "getUserBoostPending",
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
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "getUserTotalPendingReward",
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
      name: "isLockdropLPTokensReleased",
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
      name: "lockdrop",
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
      name: "LOCKDROP_ENDTIME",
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
      name: "LOCKDROP_POOL_INDEX",
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
      name: "lockdropProxy",
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
          name: "_user",
          type: "address"
        }
      ],
      name: "lockdropWithdrawable",
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
      name: "mesh",
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
      name: "miningRateHelper",
      outputs: [
        {
          internalType: "contract ILpFarmMiningRateHelperV1",
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
          name: "",
          type: "uint256"
        }
      ],
      name: "miningRateReward",
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
      name: "paidOut",
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
      name: "poolInfo",
      outputs: [
        {
          internalType: "contract IERC20Upgradeable",
          name: "lpToken",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "allocPoint",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "lastRewardBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "accERC20PerShare",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "boostAllocPoint",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "boostLastRewardBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "boostAccERC20PerShare",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "totalBoostWeight",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "poolLength",
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
      name: "rewardPerBlock",
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
      name: "sho",
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
      name: "startBlock",
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
      name: "totalAllocPoint",
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
      name: "totalLockdropMeshAmount",
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
      name: "totalProtocolPending",
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
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "userInfo",
      outputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "rewardDebt",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "boostRewardDebt",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "boostWeight",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "lockdropAmount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "lockingPeriod",
          type: "uint256"
        },
        {
          internalType: "bool",
          name: "isLockdropLPTokenClaimed",
          type: "bool"
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
