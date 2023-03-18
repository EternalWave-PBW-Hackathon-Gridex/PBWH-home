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

const farmItem = {
  token: TOKENS["shoMESH/MESH"],
  tokenContract: MSLPContract(MESHSWAP_LP_EXCHANGES["shoMESH/MESH"]),
  lp: {
    poolId: 1,
    tokenA: {
      token: TOKENS["shoMESH"],
      contract: MeshswapEscrowContract
    },
    tokenB: {
      token: TOKENS["MESH"],
      contract: MESHTokenContract
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

    lockdropAmountBN,
    isValidLockdropAmount,
    isPositiveLockdropAmount,
    numberedLockdropAmount,
    displayLockdropAmount,

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
      subTitle: `Supply ${farmItem.token.name} LP token to Shogun Protocol to earn rewards`
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
              valueNode={<p> {`${displayBasePoolAPR} % +`}</p>}
            />

            {isWalletConnected ? (
              <FarmListRowValue
                isWalletConnected={isWalletConnected}
                loading={isLoadingBoostPoolAPR}
                error={false}
                valueNode={
                  <AKTooltip
                    parent={
                      <div className="flex relative  items-center cursor-help ">
                        <p className={`main_c`}>{`${
                          displayBoostPoolAPR === "-"
                            ? `${displayExpectedBoostPoolAPRBN} % ~`
                            : `${displayBoostPoolAPR} %`
                        }`}</p>
                        <div className="absolute lg:right-[-20px] right-[-15px] flex">
                          <div className=" lg:w-[15px] lg:h-[15px] w-[12px] h-[12px]  flex ml-[5px]  animate-pulse">
                            <img src={BoostIcon} alt="boost" />
                          </div>
                        </div>
                      </div>
                    }
                    tooltipElement={
                      <p>
                        {displayBoostPoolAPR === "-"
                          ? `Expected Boost Yield assuming 100 LP tokens and vxSHO from xSHO of the equivalent value.`
                          : `Expected Boosted yield IAW your current vxSHO balance`}
                      </p>
                    }
                  />
                }
              />
            ) : (
              <AKTooltip
                parent={
                  <div className="flex items-center cursor-help">
                    <p className="main_c text-[14px] ">{`${displayExpectedBoostPoolAPRBN} % ~`}</p>
                    <div className=" w-[15px] h-[15px] flex ml-[5px] animate-pulse">
                      <img src={BoostIcon} alt="boost" />
                    </div>
                  </div>
                }
                tooltipElement={
                  <p>
                    {`Expected Boost Yield assuming 100 LP tokens and vxs from xSHO of the equivalent value.`}
                  </p>
                }
              />
            )}
            <AKTooltip
              parent={
                <div className="flex items-center cursor-help text-[#FF9632]">
                  <FarmListRowValue
                    isWalletConnected={true}
                    loading={isLoadingMiningHarvestAPR}
                    error={false}
                    valueNode={<p> {`${displayMiningHarvestAPR} %`}</p>}
                  />
                  <div
                    className={`flex justify-center items-center w-[15px] h-[15px]  ml-[3px]`}
                  >
                    <img src={QuestionIcon} alt="icon" />
                  </div>
                </div>
              }
              tooltipElement={`Additional ${TOKENS.MESH.name} reward from Meshswap is converted to ${TOKENS.shoMESH.name} and distributed to users proportionally`}
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
                  <p className="xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] ">{`${displayUserInfoAmount} ${farmItem.token.name}`}</p>
                </div>
                {isPositiveLockdropAmount && (
                  <AKTooltip
                    parent={
                      <div className="flex items-center justify-center cursor-help">
                        <p className="xlg:text-[14px] lg:text-[12px] md:text-[11px] text-[10px] opacity-50">{`${displayLockdropAmount} ${farmItem.token.name}`}</p>
                        <div className="w-[18px] h-[18px] ml-[3px]">
                          <img src={QuestionIcon} alt="icon" />
                        </div>
                      </div>
                    }
                    tooltipElement={
                      <p>
                        Your Deposited Lockdrop ${TOKENS["shoMESH/MESH"].name}{" "}
                        LP Amount
                      </p>
                    }
                  />
                )}
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
            valueNode={<p>{`${displayYourEarning} ${TOKENS.SHO.name}`}</p>}
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
