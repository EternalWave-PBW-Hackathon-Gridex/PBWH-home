import React from "react";
import { isProduction } from "../../utils/constants";
import Connector from "../WalletConnector/Connector";
import { createContainer } from "unstated-next";
import useMSMESHPrice from "../../web3/hooks/MSExchange/ReadOnly/useMSMESHPrice";
import useMSSHOPrice from "../../web3/hooks/MSExchange/ReadOnly/useMSSHOPrice";
import useMSSHOMESHPrice from "../../web3/hooks/MSExchange/ReadOnly/useMSSHOMESHPrice";

const useTokenPriceConnector = () => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  return {
    ...useMSSHOPrice(address),
    ...useMSMESHPrice(address),
    ...useMSSHOMESHPrice(address)
  };
};

let TokenPriceConnector = createContainer(useTokenPriceConnector);

export default TokenPriceConnector;
