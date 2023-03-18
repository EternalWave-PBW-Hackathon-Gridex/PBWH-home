import React, { useContext } from "react";
import { isProduction } from "../../utils/constants";

import { createContainer } from "unstated-next";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import { ethers } from "ethers";
import { CHAINS } from "../constants";
import { getSigmaLS, removeSigmaLS, setSigmaLS } from "../SigmaLS";

const useConnector = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();
  const [ethersProvider, setProvider] = React.useState(null);
  const connectedWallets = useWallets();

  React.useEffect(() => {
    const sigmaLS = getSigmaLS();
    if (sigmaLS) {
      async function setWalletFromLocalStorage() {
        await connectWallet({ autoSelect: sigmaLS.walletKey });
      }
      setWalletFromLocalStorage();
    }
  }, [connect]);

  React.useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
    } else {
      setProvider(null);
    }
  }, [wallet]);

  React.useEffect(() => {
    if (wallet?.label) {
      setSigmaLS({
        walletKey: wallet?.label
      });
    } else {
      removeSigmaLS();
    }
  }, [wallet?.label]);

  /** Wallet Handlers */
  const connectWallet = React.useCallback(
    async (connectInfo = null) => {
      try {
        const connectionInfo = await connect(connectInfo);
        setSigmaLS({
          walletKey: connectionInfo[0].label
        });
        await setChain({
          chainId: CHAINS[isProduction ? "ABITRUM" : "GOERLI"].id
        });
      } catch (e) {
        console.log(e);
      }
    },
    [wallet]
  );

  const disconnectWallet = React.useCallback(async () => {
    try {
      await disconnect({ label: wallet.label });
      removeSigmaLS();
    } catch (e) {
      console.log(e);
    }
  }, [wallet]);

  const readyToTransact = React.useCallback(async () => {
    if (!wallet) {
      const walletSelected = await connect();
      if (!walletSelected) return false;
    }

    if (!ethersProvider) return false;

    await setChain({
      chainId: CHAINS[isProduction ? "ABITRUM" : "GOERLI"].id
    });

    return true;
  }, [wallet, ethersProvider]);

  /** Wallet Values */
  const address = React.useMemo(() => {
    return wallet?.accounts[0]?.address;
  }, [wallet]);

  const balacne = React.useMemo(() => {
    return wallet?.accounts[0]?.balance;
  }, [wallet]);

  /** Transaction */
  const signer = React.useMemo(() => {
    return ethersProvider ? ethersProvider.getUncheckedSigner() : null;
  }, [ethersProvider]);

  /** Validations */
  const isWalletConnected = React.useMemo(() => {
    return wallet ? true : false;
  }, wallet);

  return {
    wallet,
    connecting,
    connectWallet,
    disconnectWallet,
    readyToTransact,

    address,
    balacne,

    connectedWallets,

    ethersProvider,
    signer,
    isWalletConnected
  };
};

let Connector = createContainer(useConnector);

export default Connector;
