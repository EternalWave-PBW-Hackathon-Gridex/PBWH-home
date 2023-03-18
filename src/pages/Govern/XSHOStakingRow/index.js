import React from "react";

import { FlexDualButton } from "../../../components/SigmaValueDisplay";
import FarmListRowValue from "../../Farm/FarmList/FarmListRowValue";
import AKTooltip from "../../../components/AKTooltip";
import { TOKENS } from "../../../web3/constants";
import Connector from "../../../context/WalletConnector/Connector";
import XSHOPledgeModal from "./Modal/XSHOPledgeModal";
import { useSigmaAlert } from "../../../components/SigmaAlert";
import SigmaButton from "../../../components/Animation/SigmaButton";
import XSHOUnpledgeModal from "./Modal/XSHOUnpledgeModal";
import useERC20Balance from "../../../web3/hooks/ERC20/useERC20Balance";
import xSHOTokenContract from "../../../web3/contracts/xSHOTokenContract";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import XSHOFarm from "../../../web3/contracts/XSHOFarmContract/XSHOFarm";
import XSHOStakingDetails from "./XSHOStakingDetails";

const XSHOStakingRow = () => {
  const [openDetails, setOpenDetails] = React.useState(false);
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const { isLoadingBalance, displayNumberFormatBalance, fetchBalance } =
    useERC20Balance(xSHOTokenContract);

  useSigmaDidMount(() => {
    fetchBalance(XSHOFarm.address);
  });
  /** Events */
  const onSuccessTransactions = (type, trxHash) => {
    switch (type) {
      case "Pledge":
      case "Unpledge":
        setOpenDetails(false);
        fetchBalance(XSHOFarm.address);
        break;

      default:
        break;
    }
  };

  const handleSIGStaking = (type) => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    switch (type) {
      case "Pledge":
        openXSHOStakePopup();
        break;
      case "Unpledge":
        openSHOUnstakePopup();
        break;

      default:
        break;
    }
  };
  const onClickDetail = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    setOpenDetails(openDetails ? false : true);
  };

  const handleCancelPopup = (type) => {
    switch (type) {
      case "Pledge":
        closeXSHOStakePopup();
        break;

      case "Unpledge":
        closeSHOUnstakePopup();
        break;
      default:
        break;
    }
  };

  /** Popups */
  const {
    popupComponent: XSHOStakePopup,
    openModal: openXSHOStakePopup,
    closeModal: closeXSHOStakePopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Pledge"
    },
    children: (
      <XSHOPledgeModal
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessTransactions}
      />
    ),
    closeOnDocumentClick: false
  });

  const {
    popupComponent: SHOUnstakePopup,
    openModal: openSHOUnstakePopup,
    closeModal: closeSHOUnstakePopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Unpledge"
    },
    children: (
      <XSHOUnpledgeModal
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessTransactions}
      />
    ),
    closeOnDocumentClick: false
  });

  return (
    <div className="flex flex-col w-full lg:p-[30px] p-[20px] shogun_bg-secondary mb-[15px] rounded-md transition-all hover:scale-[102%]">
      {XSHOStakePopup}
      {SHOUnstakePopup}
      <div className="w-full  flex sm:flex-row flex-col ">
        <div className="flex sm:w-[22%] w-full min-w-[60px]  items-center ">
          <div className="xlg:min-w-[60px] xlg:w-[60px] xlg:h-[60px] lg:min-w-[50px] lg:w-[50px] lg:h-[50px] min-w-[40px] w-[40px] h-[40px] flex rounded-full mr-[10px]">
            <img src={TOKENS.xSHO.logo} alt="logo" />
          </div>
          <p className="xlg:text-[20px] lg:text-[18px] text-[16px] xlg:font-semibold font-medium">
            {`${TOKENS.xSHO.name} staking`}
          </p>
        </div>
        <div className=" sm:my-0 my-[10px] flex sm:flex-col flex-row sm:w-[47%] w-full  sm:justify-center justify-between  xlg:text-[16px] lg:text-[15px] text-[14px] relative">
          <p className="sm:absolute relative sm:top-[15px] top-0 text-[14px] opacity-50">
            {`Total ${TOKENS.xSHO.name} Staked`}
          </p>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingBalance}
            error={false}
            valueNode={`${displayNumberFormatBalance} ${TOKENS.xSHO.name}`}
          />
        </div>

        <div className="flex justify-center items-center  sm:w-[31%] sm:max-w-[31%]  w-full max-w-full">
          <GovernButtonGroup
            onClickDetail={onClickDetail}
            handleSIGStaking={handleSIGStaking}
          />
        </div>
      </div>
      {openDetails && <XSHOStakingDetails />}
    </div>
  );
};

const GovernButtonGroup = ({ onClickDetail, handleSIGStaking }) => {
  return (
    <div className="flex flex-col justify-between w-full">
      <FlexDualButton
        className="w-full min-h-[45px]"
        leftButtonClassName={`AKBtnEffect`}
        rightButtonClassName={`AKBtnEffect`}
        leftBtn={{
          title: "Pledge",
          onClick: () => {
            handleSIGStaking("Pledge");
          }
        }}
        rightBtn={{
          title: "Unpledge",
          onClick: () => {
            handleSIGStaking("Unpledge");
          }
        }}
        leftBtnLoading={false}
        rightBtnLoading={false}
      />
      <SigmaButton
        className={`h-[45px] xlg:text-[18px] lg:text-[16px] text-[14px] font-semibold w-full rounded-md flex justify-center items-center  AKBtnEffect border-[1px] border-[#ffffff50] mt-[15px]`}
        onClick={onClickDetail}
      >
        Details
      </SigmaButton>
    </div>
  );
};

export default XSHOStakingRow;
