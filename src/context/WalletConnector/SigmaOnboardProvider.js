import React, { useContext } from "react";
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import portisModule from "@web3-onboard/portis";

import Connector from "./Connector";
import { CHAINS, RESOURCES, I18N } from "../constants";
import { isProduction } from "../../utils/constants";

const SigmaOnboardProvider = ({ children }) => {
  const injected = injectedModule();
  const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });
  const walletConnect = walletConnectModule({
    qrcodeModalOptions: {
      mobileLinks: ["coinbase", "metamask", "portis"]
    },
    connectFirstChainId: true
  });
  // const portis = portisModule({
  //   apiKey: `78b072fb-3b6d-46e2-978f-c65f5b130f86` // TODO
  // });
  const wallets = [injected, coinbaseWalletSdk, walletConnect];

  const chains = [CHAINS[isProduction ? "ABITRUM" : "GOERLI"]];

  const appMetadata = {
    name: "Grindex",
    icon: RESOURCES.ICON,
    logo: RESOURCES.BANNER,
    description: "Grindex is brandnew indexfund protocol",
    gettingStartedGuide:
      "https://docs.sigmaprotocol.app/product/convert-ksp-into-sigksp",
    explore: "https://arbiscan.io/",
    // agreement: {
    //   version: '1.0.0',
    //   termsUrl: 'https://www.blocknative.com/terms-conditions',
    //   privacyUrl: 'https://www.blocknative.com/privacy-policy'
    // },
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" }
    ]
  };

  const accountCenter = {
    desktop: {
      position: "topRight",
      enabled: true,
      minimal: false
    },
    mobile: {
      position: "topRight",
      enabled: true,
      minimal: true
    }
  };

  const notify = {
    desktop: {
      enabled: true,
      transactionHandler: (transaction) => {},
      position: "bottomLeft"
    },
    mobile: {
      enabled: true,
      transactionHandler: (transaction) => {},
      position: "topRight"
    }
  };
  const web3Onboard = init({
    wallets,
    chains,
    appMetadata,
    accountCenter,
    i18n: I18N,
    notify
  });

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Connector.Provider>{children}</Connector.Provider>
    </Web3OnboardProvider>
  );
};

export default SigmaOnboardProvider;
