import { ethers } from "ethers";
import { AlchemyProvider } from "../../constants";
import SHOMESHStaking from "./SHOMESHStaking";

export const BUG_SHOMESHStaking = {
  address: "0xFBB0732Ec0bD4D8EcfF06f22245460216945Dd41"
};

const SHOMESHStakingContract = new ethers.Contract(
  SHOMESHStaking.address,
  SHOMESHStaking.abi,
  AlchemyProvider
);

export const BUG_SHOMESHStakingContract = new ethers.Contract(
  BUG_SHOMESHStaking.address,
  [
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
          name: "rewardsToken",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "reward",
          type: "uint256"
        }
      ],
      name: "RewardAdded",
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
          name: "rewardsToken",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "reward",
          type: "uint256"
        }
      ],
      name: "RewardPaid",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newDuration",
          type: "uint256"
        }
      ],
      name: "RewardsDurationUpdated",
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
      name: "Staked",
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
          indexed: false,
          internalType: "address",
          name: "rewardToken",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "rewardPerTokenStored",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "earned",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "userRewardPerTokenPaid",
          type: "uint256"
        }
      ],
      name: "UpdateReward",
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
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Withdrawn",
      type: "event"
    },
    {
      inputs: [],
      name: "REWARDS_DURATION",
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
          name: "account",
          type: "address"
        },
        {
          internalType: "address",
          name: "_rewardsToken",
          type: "address"
        }
      ],
      name: "earned",
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
          name: "_rewardsToken",
          type: "address"
        }
      ],
      name: "getRewardForDuration",
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
          name: "_rewardsToken",
          type: "address"
        }
      ],
      name: "lastTimeRewardApplicable",
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
          name: "",
          type: "address"
        }
      ],
      name: "rewardData",
      outputs: [
        {
          internalType: "uint256",
          name: "periodFinish",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "rewardRate",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "lastUpdateTime",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "rewardPerTokenStored",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "balance",
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
          name: "_rewardsToken",
          type: "address"
        }
      ],
      name: "rewardPerToken",
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
      name: "rewardTokens",
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
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "rewards",
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
      name: "rewardsDistribution",
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
          name: "_stakingToken",
          type: "address"
        },
        {
          internalType: "address[2]",
          name: "_rewardTokens",
          type: "address[2]"
        },
        {
          internalType: "uint256",
          name: "_rewardDuration",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_rewardsDistribution",
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
          internalType: "address",
          name: "_rewardsDistribution",
          type: "address"
        }
      ],
      name: "setRewardsDistribution",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_rewardsDuration",
          type: "uint256"
        }
      ],
      name: "setRewardsDuration",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "stakingToken",
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
      inputs: [],
      name: "updateRewardAmount",
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
      name: "userRewardPerTokenPaid",
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
        }
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "withdrawAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  AlchemyProvider
);

export default SHOMESHStakingContract;
