import React from "react";

import AKTooltip from "../../../../components/AKTooltip";
import FarmListRowValue from "../FarmListRowValue";

import { TripleButtonGroup } from "../../../../components/SigmaValueDisplay";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import { TOKENS } from "../../../../web3/constants";
import Connector from "../../../../context/WalletConnector/Connector";
import useSMSConstants from "../../../../web3/hooks/SHOMESHStaking/ReadOnly/useSMSConstants";
import useERC20TotalSupply from "../../../../web3/hooks/ERC20/useERC20TotalSupply";
import TokenPriceConnector from "../../../../context/TokenPriceConnector";
import { getAbbreviateNumberFormat } from "../../../../web3/utils/numberFormat";
import { BN } from "../../../../web3/utils/AKBN";
import SHOMESHStakingContract from "../../../../web3/contracts/SHOMESHStakingContract";
import SHOMESHStakeModal from "./Modal/SHOMESHStakeModal";
import { useSigmaAlert } from "../../../../components/SigmaAlert";
import SHOMESHWithdrawModal from "./Modal/SHOMESHWithdrawModal";
import SHOMESHClaimConfirmModal from "./Modal/SHOMESHClaimConfirmModal";
import useHarvest from "../../../../hooks/Strapi/useHarvest";

const farmItem = {
  token: TOKENS["shoMESH"]
};

const SHOMESHStakingListRow = () => {
  const { token } = farmItem;
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();
  const {
    isLoadingSHOMESHPrice,
    shoMESHPriceBN,
    isPositiveSHOMESHPrice,
    fetchSHOMESHPrice,

    isLoadingSHOPrice,
    shoPriceBN,
    isPositiveSHOPrice,
    fetchSHOPrice
  } = TokenPriceConnector.useContainer();

  const {
    isLoadingTotalSupply: isLoadingSHOMESHTotalSupply,
    totalSupplyBN: shoMESHTotalSupplyBN,
    isPositiveTotalSupply: isPositiveSHOMESHTotalSupply,

    fetchTotalSupply: fetchSHOMESHTotalSupply
  } = useERC20TotalSupply(SHOMESHStakingContract);

  const {
    isLoadingEarnedInfo,
    displayNumberFormatSHOEarned,
    displayNumberFormatSHOMESHEarned,
    fetchEarnedInfo,

    isLoadingSHOMESHBalance,
    displayNumberFormatSHOMESHBalance,
    fetchSHOMESHBalance
  } = useSMSConstants(address);

  const {
    isLoadingDailyStakingHarvest,
    isValidDailyStakingHarvest,
    dailyStakingHarvest,

    fetchDailyStakingHarvest,

    isLoadingDailyPoolVotingHarvest,
    isValidDailyPoolVotingHarvest,
    dailyPoolVotingHarvest,

    fetchDailyPoolVotingHarvest
  } = useHarvest();

  /** Life Cycle */

  useSigmaDidMount(
    () => {
      fetchSHOMESHTotalSupply();
      fetchSHOMESHPrice();
      fetchSHOPrice();
      fetchDailyStakingHarvest();
      fetchDailyPoolVotingHarvest();
    },
    [],
    false
  );

  useSigmaDidMount(() => {
    fetchSHOMESHBalance();
    fetchEarnedInfo();
  });

  const onClickStake = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    openStakePopup();
  };

  const onClickWithdraw = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    openWithdrawPopup();
  };

  const onClickClaim = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    openClaimPopup();
  };

  const handleCancelPopup = (type) => {
    switch (type) {
      case "Stake":
        closeStakePopup();
        break;

      case "Withdraw":
        closeWithdrawPopup();
        break;
      case "Claim":
        closeClaimPopup();

        break;
      default:
        break;
    }
  };

  const onSuccessTransactions = (type) => {
    switch (type) {
      case "Stake":
        closeStakePopup();
        fetchSHOMESHBalance();
        fetchEarnedInfo();
        break;

      case "Withdraw":
        closeWithdrawPopup();
        fetchSHOMESHBalance();
        fetchEarnedInfo();
        break;
      case "Claim":
        closeClaimPopup();
        fetchSHOMESHBalance();
        fetchEarnedInfo();
        break;

      default:
        break;
    }
  };

  /** TVL Item */

  const isValidTVL = React.useMemo(() => {
    return isPositiveSHOMESHPrice && isPositiveSHOMESHTotalSupply;
  }, [isPositiveSHOMESHPrice, isPositiveSHOMESHTotalSupply]);

  const isLoadingTVL = React.useMemo(() => {
    return isLoadingSHOMESHPrice || isLoadingSHOMESHTotalSupply;
  }, [isLoadingSHOMESHPrice, isLoadingSHOMESHTotalSupply]);

  const tvlBN = React.useMemo(() => {
    if (!isValidTVL) return BN(0);
    return shoMESHPriceBN.times(shoMESHTotalSupplyBN);
  }, [isValidTVL, shoMESHPriceBN, shoMESHTotalSupplyBN]);

  const displayTVL = React.useMemo(() => {
    if (!isValidTVL) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(tvlBN.toString());
  }, [isValidTVL, tvlBN]);

  /** APR Item */

  const isValidAPR = React.useMemo(() => {
    return (
      isValidTVL &&
      isPositiveSHOPrice &&
      isPositiveSHOMESHPrice &&
      isValidDailyStakingHarvest &&
      isValidDailyPoolVotingHarvest
    );
  }, [
    isValidTVL,
    isPositiveSHOPrice,
    isPositiveSHOMESHPrice,
    isValidDailyStakingHarvest,
    isValidDailyPoolVotingHarvest
  ]);

  const isLoadingAPR = React.useMemo(() => {
    return (
      isLoadingTVL ||
      isLoadingSHOPrice ||
      isLoadingSHOMESHPrice ||
      isLoadingDailyStakingHarvest ||
      isLoadingDailyPoolVotingHarvest
    );
  }, [
    isLoadingTVL,
    isLoadingSHOPrice,
    isLoadingSHOMESHPrice,
    isLoadingDailyStakingHarvest,
    isLoadingDailyPoolVotingHarvest
  ]);

  const displayARP = React.useMemo(() => {
    if (!isValidAPR) return { sum: "-", SHO: "-", shoMESH: "-" };

    const dailyStakingHarvestSHOMESHBN = BN(
      dailyStakingHarvest.shoMESH.distributedShoMESH
    );
    const dailyPoolVotingHarvestSHOMESHBN = BN(
      dailyPoolVotingHarvest.SHO.shoToShoMESHStakingPool
    );

    const isValidHarvest =
      !dailyStakingHarvestSHOMESHBN.isNaN() &&
      !dailyPoolVotingHarvestSHOMESHBN.isNaN();
    if (!isValidHarvest) return { sum: "-", SHO: "-", shoMESH: "-" };

    const SHORewardValueBN = shoPriceBN.times(dailyPoolVotingHarvestSHOMESHBN);
    const shoMESHRewardValueBN = shoMESHPriceBN.times(
      dailyStakingHarvestSHOMESHBN
    );
    const SHO = SHORewardValueBN.times(365 * 100)
      .div(tvlBN)
      .toString();
    const shoMESH = shoMESHRewardValueBN
      .times(365 * 100)
      .div(tvlBN)
      .toString();
    const sum = SHORewardValueBN.plus(shoMESHRewardValueBN)
      .times(365 * 100)
      .div(tvlBN)
      .toString();

    return {
      sum: getAbbreviateNumberFormat({
        maximumFractionDigits: 2
      }).format(sum),
      SHO: getAbbreviateNumberFormat({
        maximumFractionDigits: 2
      }).format(SHO),
      shoMESH: getAbbreviateNumberFormat({
        maximumFractionDigits: 2
      }).format(shoMESH)
    };
  }, [isValidAPR, shoPriceBN, shoMESHPriceBN]);

  /** Popups */
  const {
    popupComponent: StakePopup,
    openModal: openStakePopup,
    closeModal: closeStakePopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Stake",
      subTitle: `Supply ${farmItem.token.name} token to earn ${TOKENS.shoMESH.name} and ${TOKENS.SHO.name} rewards `
    },
    children: (
      <SHOMESHStakeModal
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessTransactions}
      />
    ),
    closeOnDocumentClick: false
  });

  const {
    popupComponent: WithdrawPopup,
    openModal: openWithdrawPopup,
    closeModal: closeWithdrawPopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Withdraw",
      subTitle: `Withdraw ${farmItem.token.name} from ${TOKENS.shoMESH.name} staking pool`
    },
    children: (
      <SHOMESHWithdrawModal
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessTransactions}
      />
    ),
    closeOnDocumentClick: false
  });

  const {
    popupComponent: ClaimPopup,
    openModal: openClaimPopup,
    closeModal: closeClaimPopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Claim"
    },
    children: (
      <SHOMESHClaimConfirmModal
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessTransactions}
      />
    ),
    closeOnDocumentClick: false
  });

  return (
    <div className="relative flex flex-col w-full  p-[30px] shogun_bg-secondary mb-[15px] rounded-md transition-all hover:scale-[102%]">
      {StakePopup}
      {WithdrawPopup}
      {ClaimPopup}
      <div className="w-full  flex sm:flex-row flex-col">
        <div className="flex sm:w-[22%] w-full  items-center sm:mt-0 mt-[10px]">
          <div className="xlg:min-w-[60px] xlg:w-[60px] xlg:h-[60px] lg:min-w-[50px] lg:w-[50px] lg:h-[50px] min-w-[40px] w-[40px] h-[40px] flex rounded-full mr-[10px]">
            <img src={token.logo} alt="logo" />
          </div>
          <p className="xlg:text-[20px] lg:text-[18px] text-[16px] xlg:font-semibold font-medium">
            {`${token.name} Stake`}
          </p>
        </div>
        <div className="sm:w-[9%] w-full flex sm:justify-center justify-between items-center xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[10px]">
          <div className="sm:hidden flex opacity-50 ">TVL</div>
          <FarmListRowValue
            isWalletConnected={true}
            loading={isLoadingTVL}
            error={false}
            valueNode={<p>{`${displayTVL} $`}</p>}
          />
        </div>
        <div className=" sm:w-[9%] w-full  flex sm:justify-center justify-between items-center xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[5px] ">
          <div className="sm:hidden flex opacity-50 ">APR</div>
          <div className="flex items-center ">
            <FarmListRowValue
              isWalletConnected={true}
              loading={isLoadingAPR}
              error={false}
              valueNode={<p> {`${displayARP.sum} %`}</p>}
            />
            <AKTooltip
              tooltipElement={
                <div className="flex flex-col">
                  <p>{`${TOKENS.MESH.name} Staking Reward APR : ${displayARP.shoMESH} %`}</p>
                  <p>{`${TOKENS.vMESH.name} Voting Reward APR : ${displayARP.SHO} %`}</p>
                </div>
                // <p>
                //   The APR will be displayed after reward got accumulated for few
                //   days.
                // </p>
              }
            />
          </div>
        </div>

        <div className="sm:w-[13%] w-full  flex sm:justify-center justify-between  items-center xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[5px]">
          <div className="sm:hidden flex opacity-50 ">Your Deposits</div>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingSHOMESHBalance}
            error={false}
            valueNode={
              <p className="">{`${displayNumberFormatSHOMESHBalance} ${token.name}`}</p>
            }
          />
        </div>
        {/* Your Earning */}
        <div className="sm:w-[16%] w-full flex  sm:justify-center justify-between items-center whitespace-pre-wrap xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[5px]">
          <div className="sm:hidden flex opacity-50 ">Your Earnings</div>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingEarnedInfo}
            error={false}
            valueNode={
              <div>
                {
                  <div className="flex flex-col">
                    <p className="">{`${displayNumberFormatSHOEarned} ${TOKENS.SHO.name}`}</p>
                    <p className="">{`${displayNumberFormatSHOMESHEarned} ${TOKENS.shoMESH.name}`}</p>
                  </div>
                }
              </div>
            }
          />
        </div>
        <div className="flex justify-center items-center  sm:w-[31%] sm:max-w-[31%] w-full max-w-full sm:mt-0 mt-[10px]">
          <TripleButtonGroup
            className="w-full lg:h-[100px] md:h-[90px] sm:h-[80px] h-[100px]"
            buttonClassName="md:text-[18px] sm:text-[16px] text-[14px] font-semibold"
            leftBtn={{
              title: "Stake",
              onClick: onClickStake
            }}
            rightBtn={{
              title: "Withdraw",
              onClick: onClickWithdraw
            }}
            bottomBtn={{
              title: "Claim",
              onClick: onClickClaim
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SHOMESHStakingListRow;
