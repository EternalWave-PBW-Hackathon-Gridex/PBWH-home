import { isProduction } from "../../../utils/constants";

export default {
  address: isProduction
    ? "0x117Dd1A29a6dB76a0e39CBd314918c0E4F693AC6"
    : "0x0000000000000000000000000000000000000000",
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_startBlock",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_proposer",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_vxSHOsnapshotId",
          type: "uint256"
        }
      ],
      name: "addProposal",
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
          name: "proposalId",
          type: "uint256"
        }
      ],
      name: "cancel",
      outputs: [],
      stateMutability: "nonpayable",
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
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256"
        }
      ],
      name: "finalizeProposal",
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
          name: "vxSHO",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "quorumVotes",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "votingPeriod",
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
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
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
        },
        {
          indexed: false,
          internalType: "address",
          name: "proposer",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "snapshotId",
          type: "uint256"
        }
      ],
      name: "ProposalAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256"
        }
      ],
      name: "ProposalCanceled",
      type: "event"
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
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_endBlock",
          type: "uint256"
        }
      ],
      name: "setEndBlockOfProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_vxSHO",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_quorumVotes",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_votingPeriod",
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
          internalType: "uint256",
          name: "_quorumVotes",
          type: "uint256"
        }
      ],
      name: "setQuorumVotes",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_vxSHOsnapshotId",
          type: "uint256"
        }
      ],
      name: "setSnapshotId",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_startBlock",
          type: "uint256"
        }
      ],
      name: "setStartBlockOfProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_votingPeriod",
          type: "uint256"
        }
      ],
      name: "setVotingPeriod",
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
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "voter",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "support",
          type: "bool"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "votes",
          type: "uint256"
        }
      ],
      name: "VoteCast",
      type: "event"
    },
    {
      inputs: [],
      name: "getBlockNumber",
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
          name: "_proposalId",
          type: "uint256"
        }
      ],
      name: "getProposalResult",
      outputs: [
        {
          internalType: "enum ShogunGovernV1.Result",
          name: "",
          type: "uint8"
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
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256"
        }
      ],
      name: "getProposalSnapshotId",
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
          internalType: "address",
          name: "voter",
          type: "address"
        }
      ],
      name: "getReceipt",
      outputs: [
        {
          components: [
            {
              internalType: "bool",
              name: "hasVoted",
              type: "bool"
            },
            {
              internalType: "bool",
              name: "support",
              type: "bool"
            },
            {
              internalType: "uint256",
              name: "votes",
              type: "uint256"
            },
            {
              internalType: "bool",
              name: "canceled",
              type: "bool"
            }
          ],
          internalType: "struct ShogunGovernV1.Receipt",
          name: "",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_voter",
          type: "address"
        }
      ],
      name: "getUserVoteList",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256"
        }
      ],
      name: "isProposalFinalized",
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
      name: "proposalCount",
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
      name: "proposalList",
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
      name: "proposals",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "proposer",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "startBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "endBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "forVotes",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "againstVotes",
          type: "uint256"
        },
        {
          internalType: "bool",
          name: "canceled",
          type: "bool"
        },
        {
          components: [
            {
              internalType: "enum ShogunGovernV1.Result",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "endBlockNubmer",
              type: "uint256"
            }
          ],
          internalType: "struct ShogunGovernV1.ProposalResult",
          name: "result",
          type: "tuple"
        },
        {
          internalType: "uint256",
          name: "snapshotId",
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
      name: "quorumVotes",
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
        }
      ],
      name: "state",
      outputs: [
        {
          internalType: "enum ShogunGovernV1.ProposalState",
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
          name: "_proposalId",
          type: "uint256"
        }
      ],
      name: "totalVxSHOSupplyOfProposal",
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
          name: "_proposalId",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "_user",
          type: "address"
        }
      ],
      name: "userAvailableVote",
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
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "userVoteList",
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
      name: "votingPeriod",
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
          internalType: "contract IvxSHO",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ]
};
