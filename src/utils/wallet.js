// import { SigmaFormatAlert, ALERT_TYPE } from "../components/SigmaAlert";
// import { activeChain } from "../web3/klaytn";
// import { getSigmaDataFormat } from "./SigmaLS";
// import { isMobile } from "react-device-detect";
// import { URL } from "./constants";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// import KaiKasLogo from "../../public/assets/global_logo_kaikas.png";
// import MetamaskLogo from "../../public/assets/global_logo_metamask.png";
// const MySwal = withReactContent(Swal);

/** Types */
// export const SUPPORT_WALLETS = {
//   KAIKAS: {
//     name: "Kaikas",
//     key: "KAIKAS",
//     instanceKey: "klaytn",
//     install: {
//       link: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
//     },
//     logo: KaiKasLogo
//   },
//   METAMASK: {
//     name: "Metamask",
//     key: "METAMASK",
//     instanceKey: "ethereum",
//     install: {
//       link: `https://metamask.app.link/dapp/${URL.APP}`
//     },
//     logo: MetamaskLogo
//   }
// };

// /** Gerneral */
// export const getWalletProvider = (walletKey) => {
//   const walletInfo = SUPPORT_WALLETS[walletKey];
//   return window[walletInfo.instanceKey];
// };

// /** Wallet Behaviors */
// export const connectWallet = async (walletKey) => {
//   try {
//     checkWalletInstalled(walletKey);
//   } catch (error) {
//     throw error;
//   }

//   const walletProvider = getWalletProvider(walletKey);
//   // Connection
//   let accounts;
//   try {
//     switch (walletKey) {
//       case SUPPORT_WALLETS.KAIKAS.key:
//         // const isUnlocked = await walletProvider._kaikas.isUnlocked()
//         // if (!isUnlocked) {
//         //   throw new KaikasError("Kaikas is locked")
//         // }
//         accounts = await walletProvider.enable();
//         break;
//       case SUPPORT_WALLETS.METAMASK.key:
//         accounts = await walletProvider.request({
//           method: "eth_requestAccounts"
//         });

//         break;

//       default:
//         throw new WalletError("Unknown wallet key");
//     }

//     const isValidAccount = Array.isArray(accounts) && accounts.length > 0;
//     if (!isValidAccount) throw WalletError("invalid accounts");
//   } catch (error) {
//     throw new WalletError(error.message);
//   }

//   const sigmaData = getSigmaDataFormat();
//   sigmaData.walletKey = walletKey;

//   // Check Chain
//   let networkVersion = `${walletProvider.networkVersion}`;
//   if (networkVersion !== activeChain.id) {
//     if (walletKey === SUPPORT_WALLETS.METAMASK.key) {
//       try {
//         await switchMetamaskWalletChain();
//       } catch (error) {
//         throw new WalletNetworkChangeError(error.message);
//       }
//     } else {
//       throw new UnsupportedNetworkError("Unsupported network");
//     }
//   }
//   sigmaData.chainId = `${walletProvider.networkVersion}`;

//   // Set SigmaLS
//   sigmaData.address = accounts[0];
//   return sigmaData;
// };

// const switchMetamaskWalletChain = async () => {
//   try {
//     await ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: activeChain.hex }]
//     });
//   } catch (switchError) {
//     // This error code indicates that the chain has not been added to MetaMask.

//     if (isMobile) {
//       const errorCode = switchError.data?.originalError?.code;
//       if (errorCode && errorCode === 4902) {
//         await addChain().catch((error) => {
//           throw error;
//         });
//       } else {
//         throw switchError;
//       }
//     } else {
//       if (switchError.code === 4902) {
//         await addChain().catch((error) => {
//           throw error;
//         });
//       } else {
//         throw switchError;
//       }
//     }
//   }
// };

// const addChain = async () => {
//   try {
//     await ethereum.request({
//       method: "wallet_addEthereumChain",
//       params: [
//         {
//           chainId: activeChain.hex,
//           chainName: activeChain.name,
//           rpcUrls: [activeChain.rpcUrl],
//           nativeCurrency: {
//             name: "Klaytn",
//             symbol: "MATIC", // 2-6 characters long
//             decimals: 18
//           }
//         }
//       ]
//     });
//   } catch (addError) {
//     console.error(addError.message);
//     throw addError;
//   }
// };

// export const getBalance = async () => {
//   const sigmaLS = await isValidSigmaLS();
//   if (!sigmaLS) return -1;
//   const { address } = sigmaLS;
//   try {
//     let balance = await kasCaver.klay.getBalance(address);
//     balance = kasCaver.utils.fromPeb(balance, "MATIC");
//     return balance ? balance : -1;
//   } catch (error) {
//     console.error(error.message);
//     return -1;
//   }
// };

/** Validation Check */
// export const checkWalletInstalled = (walletKey) => {
//   const isInstalled = typeof getWalletProvider(walletKey) !== "undefined";
//   if (!isInstalled)
//     throw new WalletNotInstallError("wallet is not installed", walletKey);
// };

/** Wallet Listener */
// export const addAccountChangeListener = ({ walletKey, handler }) => {
//   const walletProvider = getWalletProvider(walletKey);
//   if (!walletProvider) return;
//   walletProvider.on("accountsChanged", handler);
// };

// export const removeAccountChangeListener = ({ walletKey, handler }) => {
//   const walletProvider = getWalletProvider(walletKey);
//   if (!walletProvider) return;
//   walletProvider.removeListener("accountsChanged", handler);
// };

// export const addChainChangeListener = ({ walletKey, handler }) => {
//   const walletProvider = getWalletProvider(walletKey);
//   if (!walletProvider) return;
//   walletProvider.on("networkChanged", handler);
// };

// export const removeChainChangeListener = ({ walletKey, handler }) => {
//   const walletProvider = getWalletProvider(walletKey);
//   if (!walletProvider) return;
//   walletProvider.removeListener("networkChanged", handler);
// };

/** Helper */
// const alertWalletInstall = (walletKey) => {
//   const walletInfo = SUPPORT_WALLETS[walletKey];
//   MySwal.fire({
//     title: "Wallet Install",
//     html: (
//       <div className="text-black">
//         <p>{`You must install ${walletInfo.name} in your browser`}</p>
//         <a
//           className="text-red-600"
//           href={walletInfo.install.link}
//           target="_blank"
//           rel="noreferrer"
//         >
//           {`Install ${walletInfo.name}`}
//         </a>
//       </div>
//     ),
//     showConfirmButton: false,
//     icon: "warning"
//   });
// };

export const abbreviateWalletAddress = (address) => {
  if (typeof address !== "string") return;
  return `${address.substring(0, 6)}...${address.substring(40)}`;
};

// export const openWalletNavigator = () => {
//   const walletBtn = document.getElementById("wallet_button");
//   if (!walletBtn) return;
//   walletBtn.click();
// };

/** new WalletError */
// export class WalletError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "WalletError";
//   }

//   alert = () => {
//     SigmaFormatAlert({
//       alertType: ALERT_TYPE.WALLET_CONNECTION
//     });
//   };
// }

// export class WalletNotInstallError extends Error {
//   constructor(message, walletKey) {
//     super(message);
//     this.name = "WalletNotInstallError";
//     this.walletKey = walletKey;
//   }

//   alert = () => {
//     alertWalletInstall(this.walletKey);
//   };
// }

// export class WalletNetworkChangeError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "WalletNetworkChangeError";
//   }

//   alert = () => {
//     SigmaFormatAlert({
//       alertType: ALERT_TYPE.WALLET_NETWORK_CHANGE
//     });
//   };
// }

// export class UnsupportedNetworkError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "UnsupportedNetworkError";
//   }

//   alert = () => {
//     SigmaFormatAlert({
//       alertType: ALERT_TYPE.UNSUPPORTED_NETOWRK
//     });
//   };
// }

// export class KaikasError extends WalletError {
//   constructor(message) {
//     super(message);
//     this.name = "KaikasError";
//   }

//   alert = () => {
//     SigmaFormatAlert({
//       alertType: ALERT_TYPE.WALLET_CONNECTION
//     });
//   };
// }
