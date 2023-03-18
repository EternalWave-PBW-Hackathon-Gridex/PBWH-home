import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { abbreviateWalletAddress } from "../../utils/wallet";
import Connector from "../../context/WalletConnector/Connector";

/** Import images  */
import SigmaLogo from "../../assets/images/global_logo-rect-purplebg-withtext.png";
import WalletIcon from "../../assets/images/global_icon_wallet.png";

const Header = () => {
  let {
    wallet,
    connecting,
    connectWallet,
    disconnectWallet,
    isWalletConnected,
    ethersProvider
  } = Connector.useContainer();

  const onClickConnectWallet = () => {
    if (wallet) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <header className="fixed top-0 w-full min-h-[60px] flex items-center justify-center shogun_bg-secondary bg-transparent z-10">
      <div className="w-[90%] flex justify-between items-center relative">
        {/* <Link to="/">
          <div className="w-[40px] h-[40px] md:hidden flex rounded-full overflow-hidden mt-[30px]">
            <img src={SigmaLogo} alt="logo" />
          </div>
        </Link> */}
        {!isWalletConnected && (
          <div className="flex justify-evenly items-center absolute right-0">
            <div
              id="wallet_button"
              className="cursor-pointer flex items-center AKBtnEffect main_c border-[1px] main_bd rounded-md sm:py-[9px] sm:px-[15px] py-[5px] px-[10px]"
              onClick={onClickConnectWallet}
            >
              {wallet ? (
                <div className="flex items-center">
                  <div
                    className="h-[20px] w-[20px]"
                    dangerouslySetInnerHTML={{ __html: wallet.icon }}
                  />

                  <p className="text-[12px] ml-[10px] ">
                    {abbreviateWalletAddress(wallet.accounts[0].address)}
                  </p>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="sm:w-[14.6px] sm:h-[12px] w-[12.16px] h-[10px] flex">
                    <img src={WalletIcon} alt="icon" />
                  </div>
                  <p className="sm:text-[12px] sm:ml-[10px] text-[10px] ml-[8px]">
                    Connect Wallet
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
