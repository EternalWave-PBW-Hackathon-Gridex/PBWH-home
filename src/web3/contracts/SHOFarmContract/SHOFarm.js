import { isProduction } from "../../../utils/constants";

export default {
  address: isProduction
    ? "0x3D262331Ae6ec88afd942936181dD4b6F3Ee9C14"
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
          internalType: "uint256",
          name: "withdrawnSHO",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "burnedxSHO",
          type: "uint256"
        }
      ],
      name: "ClaimUnlockedSHO",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "caller",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "FeesReceived",
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
          indexed: false,
          internalType: "uint256",
          name: "stakedSHO",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "mintedxSHO",
          type: "uint256"
        }
      ],
      name: "Stake",
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
          internalType: "uint256",
          name: "redeemedxSHO",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "shoQueued",
          type: "uint256"
        }
      ],
      name: "Unstake",
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
      inputs: [],
      name: "SHO",
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
      name: "claimUnlockedSHO",
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
      name: "depositFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "getRedeemableSHO",
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
      name: "getUserWithdrawInfos",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "unlockTime",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "xSHOAmount",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "SHOAmount",
              type: "uint256"
            }
          ],
          internalType: "struct ShoFarmV1.WithdrawInfo[]",
          name: "",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "getxSHOExchangeRate",
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
      inputs: [],
      name: "lockingPeriod",
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
      name: "pendingSHO",
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
      name: "pendingxSHO",
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
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_SHO",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_lockingPeriod",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_xSHO",
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
          internalType: "uint256",
          name: "_lockingPeriod",
          type: "uint256"
        }
      ],
      name: "setLockingPeriod",
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
      name: "stake",
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
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "unstake",
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
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "withdrawInfoOf",
      outputs: [
        {
          internalType: "uint256",
          name: "unlockTime",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "xSHOAmount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "SHOAmount",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "xSHO",
      outputs: [
        {
          internalType: "contract IxSHOToken",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ]
};
