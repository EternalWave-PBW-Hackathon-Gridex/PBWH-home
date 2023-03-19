import React from "react";
import Connector from "../../../../context/WalletConnector/Connector";
import { TOKENS } from "../../../../web3/constants";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import AKTooltip from "../../../../components/AKTooltip";
import FarmListRowValue from "../FarmListRowValue";
import {
  FlexDualButton,
  TripleButtonGroup
} from "../../../../components/SigmaValueDisplay";

import QuestionIcon from "../../../../assets/images/global_tooltip.png";
import BoostIcon from "../../../../assets/images/global_icon_boost.png";
import useLPFarmConstants from "../../../../web3/hooks/LPFarm/ReadOnly/useLPFarmConstants";
import useLFYourEarnings from "../hooks/useLFYourEarnings";
import useLFTVL from "../hooks/useLFTVL";
import useLFAPR from "../hooks/useLFAPR";
import { useSigmaAlert } from "../../../../components/SigmaAlert";
import LPFarmDepositModal from "../../Modal/LPFarmDepositModal";
import LPFarmWithdrawModal from "../../Modal/LPFarmWithdrawModal";
import FarmClaimConfirmModal from "../../Modal/FarmClaimConfirmModal";
import MeshswapEscrowContract from "../../../../web3/contracts/MeshswapEscrowContract";
import MESHTokenContract from "../../../../web3/contracts/MESHTokenContract";
import {
  MSLPContract,
  MESHSWAP_LP_EXCHANGES
} from "../../../../web3/contracts/MSExchangeContract";

import useLFShoMESHMESHTVL from "../hooks/useLFShoMESHMESHTVL";
import useLFSHOMESHMESHMiningHarvestAPR from "../hooks/useLFSHOMESHMESHMiningHarvestAPR";
import BIIndexFundContract from "../../../../web3/contracts/BIIndexFundContract";
import WETHTokenContract from "../../../../web3/contracts/WETHTokenContract";
import GDXTokenContract from "../../../../web3/contracts/GDXTokenContract";

const farmItem = {
  token: TOKENS["wETH/GDX"],
  tokenContract: BIIndexFundContract,
  lp: {
    poolId: 1,
    tokenA: {
      token: TOKENS["wETH"],
      contract: WETHTokenContract
    },
    tokenB: {
      token: TOKENS["GDX"],
      contract: GDXTokenContract
    },
    SHO_REWARD: 7000000
  }
};

const ShoMESHMESHLPFarmListRow = ({
  onSuccessFarmListTransactions,
  rewardInfo,
  rewardInfoLoading,
  isValidRewardInfo
}) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const { poolId } = farmItem.lp;

  const {
    isLoadingUserInfo,
    userInfoAmountBN,
    displayUserInfoAmount,
    isPositiveUserInfoAmount,

    boostWeightBN,
    isPositiveBoostWeight,
    fetchUserInfo
  } = useLPFarmConstants(address);

  const { isLoadingYourEarnings, displayYourEarning, fetchYourEarnings } =
    useLFYourEarnings({
      farmItem
    });

  const {
    isLoadingLPValue,
    isLoadingTVL,
    isValidLPValue,
    isValidTVL,
    lpValueBN,
    tvlBN,
    displayTVL,
    fetchTVL
  } = useLFShoMESHMESHTVL({
    farmItem,
    LPTokenContract: farmItem.tokenContract
  });

  const {
    isLoadingBasePoolAPR,
    isLoadingBoostPoolAPR,
    displayBasePoolAPR,
    displayExpectedBoostPoolAPRBN,
    displayBoostPoolAPR
  } = useLFAPR({
    farmItem,
    tvlInfo: {
      isLoadingTVL,
      isLoadingLPValue,

      isValidTVL,
      isValidLPValue,
      lpValueBN,
      tvlBN
    },
    userInfoInfo: {
      isLoadingUserInfo,
      userInfoAmountBN,
      isPositiveUserInfoAmount,

      boostWeightBN,
      isPositiveBoostWeight
    }
  });

  /** Life Cycle */

  useSigmaDidMount(
    () => {
      //     fetchKSPPrice({ isConnectionCheck: false });
    },
    [],
    false
  );

  useSigmaDidMount(() => {
    fetchUserInfo(poolId);
  });

  /** Events */
  const onSuccessLPFarmListRowTransactions = (type) => {
    switch (type) {
      case "depositLP":
        closeFarmPopup();
        fetchUserInfo(poolId);
        fetchYourEarnings();
        fetchTVL();
        break;
      case "withdrawLP":
        closeFarmPopup();
        fetchUserInfo(poolId);
        fetchYourEarnings();
        break;
      case "claim":
        closeClaimPopup();
        fetchYourEarnings();
        break;

      default:
        break;
    }
  };

  const onClickFarm = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    openFarmPopup();
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
      case "deposit":
        closeFarmPopup();
        break;
      case "withdraw":
        closeWithdrawPopup();
        break;
      case "claim":
        closeClaimPopup();
        break;

      default:
        break;
    }
  };

  /** MinintHarvest */
  const { isLoadingMiningHarvestAPR, displayMiningHarvestAPR } =
    useLFSHOMESHMESHMiningHarvestAPR({
      tvlInfo: {
        isLoadingTVL,
        isValidTVL,
        tvlBN
      }
    });

  /** Popups */
  const {
    popupComponent: FarmPopup,
    openModal: openFarmPopup,
    closeModal: closeFarmPopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Farm",
      subTitle: `Supply ${farmItem.token.name} LP token to Grindex to earn $GRIN`
    },
    children: (
      <LPFarmDepositModal
        farmItem={farmItem}
        handleCancelPopup={handleCancelPopup}
        LPTokenContract={farmItem.tokenContract}
        onSuccessTransactions={onSuccessLPFarmListRowTransactions}
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
      title: "Withdraw"
    },
    children: (
      <LPFarmWithdrawModal
        farmItem={farmItem}
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessLPFarmListRowTransactions}
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
      <FarmClaimConfirmModal
        farmItem={farmItem}
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessLPFarmListRowTransactions}
      />
    )
  });

  return (
    <div className="flex flex-col w-full  p-[30px] shogun_bg-secondary mb-[15px] rounded-md transition-all hover:scale-[102%]">
      {FarmPopup}
      {WithdrawPopup}
      {ClaimPopup}
      <div className="w-full  flex sm:flex-row flex-col">
        <div className="flex sm:w-[22%] w-full  items-center sm:mt-0 mt-[10px]">
          <div className="xlg:min-w-[60px] xlg:w-[60px] xlg:h-[60px] lg:min-w-[50px] lg:w-[50px] lg:h-[50px] min-w-[40px] w-[40px] h-[40px] flex rounded-full mr-[10px]">
            <img src={farmItem.token.logo} alt="logo" />
          </div>
          <p className="xlg:text-[20px] lg:text-[18px] text-[16px] xlg:font-semibold font-medium">
            {farmItem.token.name}
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
          <div className="flex flex-col items-center  ">
            <FarmListRowValue
              isWalletConnected={true}
              loading={isLoadingBasePoolAPR}
              error={false}
              valueNode={<p> {`${displayBasePoolAPR} %`}</p>}
            />
          </div>
        </div>
        <div className="sm:w-[13%] w-full  flex sm:justify-center justify-between  xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] items-center  sm:mt-0 mt-[5px]">
          <div className="sm:hidden flex opacity-50 ">Your Deposits</div>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingUserInfo}
            error={false}
            valueNode={
              <div className="flex flex-col  sm:items-start items-end">
                <div className="flex items-center justify-center">
                  <p className="xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] ">{`${displayUserInfoAmount} `}</p>
                </div>
              </div>
            }
          />
        </div>
        {/* Your Earning */}
        <div className="sm:w-[16%] w-full flex  sm:justify-center justify-between items-center whitespace-pre-wrap xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[5px]">
          <div className="sm:hidden flex opacity-50 ">Your Earnings</div>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingYourEarnings}
            error={false}
            valueNode={<p>{`${displayYourEarning} ${TOKENS.GRIN.name}`}</p>}
          />
        </div>
        <div className="flex justify-center items-center  sm:w-[31%] sm:max-w-[31%] w-full max-w-full sm:mt-0 mt-[10px]">
          <TripleButtonGroup
            className="w-full lg:h-[100px] md:h-[90px] sm:h-[80px] h-[100px]"
            buttonClassName="md:text-[18px] sm:text-[16px] text-[14px] font-semibold"
            leftBtn={{
              title: "Farm",
              onClick: onClickFarm
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

export default ShoMESHMESHLPFarmListRow;
