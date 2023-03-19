import React from "react";
import { isMobile } from "react-device-detect";
import Popup from "reactjs-popup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TOKENS } from "../web3/constants";
const MySwal = withReactContent(Swal);

const activeChain = {
  name: "Polygon"
};

export const ALERT_TYPE = {
  UNKNOWN: {
    key: "UNKNOWN",
    title: "Unknown Error"
  },
  WALLET_UNKNOWN: {
    key: "WALLET_UNKNOWN",
    title: "Wallet Error",
    text: "Something went wrong in wallet."
  },
  /** Wallet */
  WALLET_CONNECTION: {
    key: "WALLET_CONNECTION",
    title: "Connection",
    text: "please try connecting your wallet again."
  },
  WALLET_LOCKED: {
    key: "WALLET_LOCKED",
    title: "Wallet Locked",
    text: "Your wallet is locked. Try connecting your wallet again after unlocking"
  },
  LOGIN: {
    key: "LOGIN",
    title: "Wallet Connection",
    text: "Please try connecting your wallet."
  },
  WALLET_NETWORK_CHANGE: {
    icon: "error",
    title: "Wallet Network",
    text: `Problems in the process of changing your wallet network to ${activeChain.name}. Please change to ${activeChain.name} network and try again.`
  },
  /** ACCOUNT */
  ADD_ACCOUNT: {
    key: "ADD_ACCOUNT",
    icon: "info",
    title: "Empty Account",
    text: "Please create your account and try connecting your wallet again."
  },
  /** CHAIN */
  UNSUPPORTED_NETOWRK: {
    title: "Unsupported Network",
    text: `Please change your wallet network to ${activeChain.name} network and try connecting your wallet again.`
  },

  /** KLAYTN */
  KAS_CONNECTION: {
    key: "KAS_CONNECTION",
    title: "Connection",
    text: `Problems with the Klaytn connection. please try again.`
  },
  TRANSACTION: {
    title: "Transaction",
    text: `Problems with the transaction sending. please try again.`
  },
  ESTIMATE_GAS: {
    title: "Estimate Gas",
    text: `Problems with the gas estimating. please try again.`
  },

  TOKENSALE_CONTRACT: {
    key: "TOKENSALE_CONTRACT",
    title: "Transaction",
    text: `Problems with the transaction sending. please try again.`
  },

  /** Mint */
  MINT_ALEADY_REDEEMED: {
    icon: "info",
    title: "Already redeemed",
    text: `You have already redeemed all the redeemable ${TOKENS.SHO.name} tokens.`
  },
  MINT_NOT_RELEASE_SIG: {
    icon: "info",
    title: `${TOKENS.SHO.name} tokens are not released yet`,
    text: `${TOKENS.SHO.name} tokens will be released at Token Generation Event (TGE)`
  },
  MINT_ALEADY_WITHDRAW_KLAY: {
    icon: "info",
    title: "Withdraw Only",
    text: `[Withdraw Only Stage] You can only withdraw once during this stage`
  },
  /** Lockdrop */
  LOCKDROP_ALEADY_WITHDRAW_LP: {
    icon: "info",
    title: "Withdraw",
    text: `You've already withdrawn the LP tokens.`
  },

  LOCKDROP_NOT_RELEASE_LP: {
    icon: "info",
    title: "Withdraw",
    text: `LP Tokens not released yet.`
  },
  LOCKDROP_NOT_RELEASE_SIG: {
    icon: "info",
    title: "Withdraw",
    text: `${TOKENS.SHO.name} rewards vesting starts at Token Generation Event (TGE)`
  },
  LOCKDROP_LOCKUNTIL: {
    icon: "info",
    title: "Withdraw",
    text: `LP tokens are not yet unlocked`
  },
  LOCKDROP_ALEADY_WITHDRAW_KSP: {
    icon: "info",
    title: "Withdraw",
    text: `[Withdraw Only Stage] You can only withdraw once during this stage`
  },
  LOCKDROP_FORWARD_ONLY: {
    icon: "info",
    title: "Withdraw",
    text: `You should press \"Farm\" button first before withdraw LP token from lockdrop. That will give you extra reward SHO token.`
  },
  LOCKDROP_ALREADY_FORWARD: {
    icon: "info",
    title: "Farm",
    text: `You have already farm your locked LP tokens`
  },

  /** Vote */
  VOTE_ALREADY_VOTE: {
    icon: "info",
    title: "Vote",
    text: "You have already voted this agenda"
  },

  VOTE_SIGMAGOV_MINIMUMSIG: {
    icon: "info",
    title: "Grindex Governance",
    text: `You must have at least 20000 ${TOKENS.SHO.name}.`
  }
};

export const SigmaAlert = async ({
  children,
  defaultInfo,
  inner = false,
  allowOutsideClick = true
}) => {
  console.log(children, defaultInfo);
  const isDefaultSA = typeof defaultInfo === "object";
  if (Swal.isVisible()) Swal.close();
  MySwal.fire({
    width: isMobile ? "95%" : "660",
    html: (
      <section className={`shogun_bg-primary ${inner ? inner : "SA_inner"}`}>
        {isDefaultSA ? (
          <SADefault defaultInfo={defaultInfo}>{children}</SADefault>
        ) : (
          children
        )}
      </section>
    ),
    showConfirmButton: false,
    customClass: "sigma SigmaAlert",
    padding: 0,
    allowOutsideClick,
    backdrop: true
  });
};

export const SigmaFormatAlert = ({ alertType, inner = true }) => {
  if (Swal.isVisible()) Swal.close();
  MySwal.fire({
    icon: alertType.icon ? alertType.icon : "error",
    width: isMobile ? "95%" : "660",
    html: (
      <section className={`shogun_bg-primary  ${inner && "SA_inner"} `}>
        <SADefault
          defaultInfo={{
            title: alertType.title,
            subTitle: alertType.text
          }}
        />
      </section>
    ),
    showConfirmButton: false,
    customClass: "sigma SigmaAlert",
    padding: 0
  });
};

export const SADefault = ({ defaultInfo, children }) => {
  /**
   * defaultInfo
   * - title
   * - subTitle
   *
   */
  return (
    <div className=" text-white w-full flex flex-col items-center">
      {defaultInfo.title && (
        <p className="sm:text-[32px] text-[24px]">{defaultInfo.title}</p>
      )}
      {defaultInfo.subTitle && (
        <p
          className="md:text-[18px] sm:text-[16px] text-[14px] opacity-50 mt-[6px] "
          style={{
            whiteSpace: "pre-line"
          }}
        >
          {defaultInfo.subTitle}
        </p>
      )}
      {children}
    </div>
  );
};

export const useSigmaAlert = ({
  defaultInfo,
  children,
  closeOnDocumentClick = true
}) => {
  const isDefaultSA = typeof defaultInfo === "object";
  const [open, setOpen] = React.useState(false);
  const closeModal = React.useCallback(() => setOpen(false), [open]);
  const openModal = React.useCallback(() => setOpen(true), [open]);

  const popupComponent = React.useMemo(
    () => (
      <Popup
        open={open}
        modal
        closeOnDocumentClick={closeOnDocumentClick}
        repositionOnResize
        nested
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        onClose={() => {
          closeModal();
        }}
      >
        <section className={`flex flex-col items-center`}>
          {isDefaultSA && <SADefault defaultInfo={defaultInfo} />}
          {children}
        </section>
      </Popup>
    ),
    [open]
  );

  return {
    openModal,
    closeModal,
    popupComponent
  };
};
