import React from "react";

import { FlexDualButton } from "../../../components/SigmaValueDisplay";
import FarmListRowValue from "../../Fund/FundList/FarmListRowValue";
import AKTooltip from "../../../components/AKTooltip";
import { TOKENS } from "../../../web3/constants";
import Connector from "../../../context/WalletConnector/Connector";
import SHOStakeModal from "./Modal/SHOStakeModal";
import { useSigmaAlert } from "../../../components/SigmaAlert";
import SigmaButton from "../../../components/Animation/SigmaButton";
import SHOUnStakeModal from "./Modal/SHOUnStakeModal";
import SHOStakingDetails from "./SHOStakingDetails";
import useSHOStakingRowSHObalance from "./useSHOStakingRowSHObalance";
import SHOTokenContract from "../../../web3/contracts/SHOTokenContract";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import SHOFarm from "../../../web3/contracts/SHOFarmContract/SHOFarm";
import TokenPriceConnector from "../../../context/TokenPriceConnector";
import { BN, isBNPositive } from "../../../web3/utils/AKBN";
import { getAbbreviateNumberFormat } from "../../../web3/utils/numberFormat";
import useDailyPoolVotingHarvest from "../../../hooks/Strapi/useDailyPoolVotingHarvest";

const SHOStakingRow = () => {
  const [openDetails, setOpenDetails] = React.useState(true);
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    shoPrice,
    isLoadingSHOPrice,
    shoPriceBN,
    isValidSHOPrice,
    isPositiveSHOPrice,
    displaySHOPrice,
    convertedSHOPrice,

    fetchSHOPrice
  } = TokenPriceConnector.useContainer();

  const {
    isLoadingDailyPoolVotingHarvest,
    isValidDailyPoolVotingHarvest,
    dailyPoolVotingHarvest,

    fetchDailyPoolVotingHarvest
  } = useDailyPoolVotingHarvest();

  const {
    balanceBN: shoBalanceBN,
    isLoadingBalance: isLoadingSHOBalance,
    displayNumberFormatBalance: displayNumberFormatSHOBalance,
    isPositiveBalance: isPositiveSHOBalance,

    fetchBalance: fetchSHOBalance
  } = useSHOStakingRowSHObalance(SHOTokenContract);

  useSigmaDidMount(
    () => {
      fetchSHOBalance(SHOFarm.address);
      fetchSHOPrice();
      fetchDailyPoolVotingHarvest();
    },
    [],
    false
  );
  /** Events */
  const onSuccessTransactions = (type, trxHash) => {
    switch (type) {
      case "Stake":
      case "Unstake":
      case "redeem":
        setOpenDetails(false);
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
      case "Stake":
        openSHOStakePopup();
        break;
      case "Unstake":
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
      case "Stake":
        closeSHOStakePopup();
        break;

      case "Unstake":
        closeSHOUnstakePopup();
        break;
      default:
        break;
    }
  };

  /** Popups */
  const {
    popupComponent: SHOStakePopup,
    openModal: openSHOStakePopup,
    closeModal: closeSHOStakePopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Stake",
      subTitle: `Stake ${TOKENS.GRIN.name} to Grindex to earn rewards.\nThere is a 7 days unstaking period. `
    },
    children: (
      <SHOStakeModal
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
      title: "Unstake",
      subTitle: `Unstake ${TOKENS.xGRIN.name} to receive ${TOKENS.GRIN.name}.\nThere is a 7 days unstaking period. `
    },
    children: (
      <SHOUnStakeModal
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessTransactions}
      />
    ),
    closeOnDocumentClick: false
  });

  /** APR Item */

  const isLoadingTVL = React.useMemo(() => {
    return isLoadingSHOBalance || isLoadingSHOPrice;
  }, [isLoadingSHOBalance, isLoadingSHOPrice]);

  const isValidTVL = React.useMemo(() => {
    return isPositiveSHOPrice && isPositiveSHOBalance;
  }, [isPositiveSHOPrice, isPositiveSHOBalance]);

  const tvlBN = React.useMemo(() => {
    if (!isValidTVL) return BN(0);
    return shoPriceBN.times(shoBalanceBN);
  }, [isValidTVL, shoBalanceBN, shoPriceBN]);

  const isLoadingAPR = React.useMemo(() => {
    return isLoadingTVL || isLoadingDailyPoolVotingHarvest;
  }, [isLoadingTVL]);

  const displayARP = React.useMemo(() => {
    const isPositiveBN = isBNPositive(tvlBN);
    const isValid = isValidTVL && isPositiveBN && isValidDailyPoolVotingHarvest;
    if (!isValid) return "-";

    const dailyPoolVotingHarvestSHOFarmBN = BN(
      dailyPoolVotingHarvest.GRIN.shoToShoFarm
    );
    const isValidHarvest = !dailyPoolVotingHarvestSHOFarmBN.isNaN();
    if (!isValidHarvest) return "-";
    const apr = shoPriceBN
      .times(dailyPoolVotingHarvestSHOFarmBN)
      .times(365 * 100)
      .div(tvlBN)
      .toString();
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(apr);
  }, [isValidTVL, tvlBN, shoPriceBN]);

  return (
    <div className="flex flex-col w-full lg:p-[30px] p-[20px] shogun_bg-secondary mb-[15px] rounded-md transition-all hover:scale-[102%]">
      {SHOStakePopup}
      {SHOUnstakePopup}
      <div className="w-full  flex sm:flex-row flex-col ">
        <div className="flex sm:w-[22%] w-full min-w-[60px]  items-center ">
          <div className="xlg:min-w-[60px] xlg:w-[60px] xlg:h-[60px] lg:min-w-[50px] lg:w-[50px] lg:h-[50px] min-w-[40px] w-[40px] h-[40px] flex rounded-full mr-[10px]">
            <img src={TOKENS.GRIN.logo} alt="logo" />
          </div>
          <p className="xlg:text-[20px] lg:text-[18px] text-[16px] xlg:font-semibold font-medium">
            {`${TOKENS.GRIN.name} staking`}
          </p>
        </div>
        <div className=" sm:my-0 my-[10px] flex sm:flex-col flex-row sm:w-[47%] w-full  sm:justify-center justify-between  xlg:text-[16px] lg:text-[15px] text-[14px] relative">
          <p className="sm:absolute relative sm:top-[15px] top-0 text-[14px] opacity-50">
            APR
          </p>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingAPR}
            error={false}
            valueNode={
              <div className="flex items-center">
                <p> {`${displayARP} %`}</p>
                {/* <p> {`${"-"} %`}</p>
                <AKTooltip
                  tooltipElement={
                    <p>
                      The APR will be displayed after reward got accumulated for
                      few days.
                    </p>
                  }
                /> */}
              </div>
            }
          />
        </div>

        <div className="flex justify-center items-center  sm:w-[31%] sm:max-w-[31%]  w-full max-w-full">
          <GovernButtonGroup
            onClickDetail={onClickDetail}
            handleSIGStaking={handleSIGStaking}
          />
        </div>
      </div>
      {openDetails && <SHOStakingDetails />}
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
          title: "Stake",
          onClick: () => {
            handleSIGStaking("Stake");
          }
        }}
        rightBtn={{
          title: "Unstake",
          onClick: () => {
            handleSIGStaking("Unstake");
          }
        }}
        leftBtnLoading={false}
        rightBtnLoading={false}
      />
      {/* <SigmaButton
        className={`h-[45px] xlg:text-[18px] lg:text-[16px] text-[14px] font-semibold w-full rounded-md flex justify-center items-center  AKBtnEffect border-[1px] border-[#ffffff50] mt-[15px]`}
        onClick={onClickDetail}
      >
        Details
      </SigmaButton> */}
    </div>
  );
};

export default SHOStakingRow;
