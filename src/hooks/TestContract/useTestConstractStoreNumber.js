import React from "react";
import {
  getNumber,
  storeNumber,
  storeNumberEstimateGas,
  TestContractInfo,
  TestContract
} from "../../web3/TestContract/TestContract";

import { ethers } from "ethers";

// import { castVote, getStoreNumberEstimateGas } from "../../web3/SigmaGovern";
// import { KLAYTN_GAS_PRICE } from "../../web3/klaytn";
import useSendTransaction from "../../web3/hooks/useSendTransaction";

export default function useTestConstractStoreNumber() {
  const { state, txHash, sendTransaction } = useSendTransaction();

  const fetchStoreNumber = async (num) => {
    try {
      const txData = {
        to: TestContractInfo.address,
        data: TestContract.interface.encodeFunctionData("store", [
          ethers.BigNumber.from(num)
        ])
      };
      await sendTransaction(txData);
    } catch (trxError) {}
  };

  return {
    state,
    txHash,
    fetchStoreNumber
  };
}
