import React from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import {
  DashboardColumnItem,
  WalletConnection
} from "../../components/SigmaValueDisplay";
import Connector from "../../context/WalletConnector/Connector";
import { Loading, LoadingModal } from "../../components/Loading";
import AKToolTip from "../../components/AKTooltip";
import SigmaButton from "../../components/Animation/SigmaButton";
import { STAGE_TWO_END_UNIX } from ".";
import { TOKENS } from "../../web3/constants";
import { BN, isBNPositive, BN_FORMAT } from "../../web3/utils/AKBN";
import {
  SigmaFormatAlert,
  ALERT_TYPE,
  useSigmaAlert
} from "../../components/SigmaAlert";
import LockdropWithdrawConfirmModal from "./Modal/LockdropWithdrawConfirmModal";
import LockdropClaimRewardsConfirmModal from "./Modal/LockdropClaimRewardsConfirmModal";

import useSigmaDidMount from "../../hooks/useSigmaDidMount";
import useLockdropConstants from "../../web3/hooks/Lockdrop/ReadOnly/useLockdropConstants";
import useLockdropLPFarmProxyConstants from "../../web3/hooks/LockdropLPFarmProxy/ReadOnly/useLockdropLPFarmProxyConstants";
import useLPFarmConstants from "../../web3/hooks/LPFarm/ReadOnly/useLPFarmConstants";
import useMSExchangeConstants from "../../web3/hooks/MSExchange/ReadOnly/useMSExchangeConstants";
import useLDPForwardLpTokenToLpFarm from "../../web3/hooks/LockdropLPFarmProxy/useLDPForwardLpTokenToLpFarm";
import TokenPriceConnector from "../../context/TokenPriceConnector";

import { MESHSWAP_LP_EXCHANGES } from "../../web3/contracts/MSExchangeContract";

const LDRedeemRows = ({ MOTION_VARIANTS }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();
  const {
    isLoadingDepositInfo,
    isCallSuccessDepositInfo,
    depositBN,
    isValidDeposit,
    displayDeposit,
    isPositiveDeposit,
    displayLockedUntil,
    withdrewAtPhase2,

    claimedSHOBN,
    isValidClaimedSHO,
    displayClaimedSHO,

    isLPTokensClaimed,
    isValidIsLPTokensClaimed,

    fetchDepositInfo,

    vestingPeriod,
    numberedVestingPeriod,
    isLoadingVestingPeriod,
    isCallSuccessVestingPeriod,
    fetchVestingPeriod,

    allocatedSHO,
    isLoadingAllocatedSHO,
    isCallSuccessAllocatedSHO,
    displayExpectedSHOReward,
    fetchAllocatedSHO,

    isLoadingClaimableSHO,
    isCallSuccessClaimableSHO,
    isValidClaimableSHO,
    isPositiveClaimableSHO,
    displayClaimableSHO,
    fetchClaimableSHO,

    withdrawableLP,
    isLoadingWithdrawableLP,
    isCallSuccessWithdrawableLP,
    isValidWithdrawableLP,
    isPositiveWithdrawableLP,
    numberedWithdrawableLP,
    displayWithdrawableLP,
    fetchWithdrawableLP,

    isSHOTokensReleased,
    isLoadingIsSHOTokensReleased,
    isCallSuccessIsSHOTokensReleased,
    isValidIsSHOTokensReleased,

    fetchIsSHOTokensReleased
  } = useLockdropConstants(address);

  const {
    isForwarded,
    isLoadingIsForwarded,
    isCallSuccessIsForwarded,
    isValidIsForwarded,
    fetchIsForwarded,

    isLPTokensReleased,
    isLoadingIsLPTokensReleased,
    isCallSuccessIsLPTokensReleased,
    isValidIsLPTokensReleased,
    fetchIsLPTokensReleased,

    isLoadingWithdrawableLP: isLoadingLDPWithdrawLP,
    isPositiveWithdrawableLP: isPositiveLDPWithdrawableLP,
    numberedWithdrawableLP: numberedLDWithdrawableLP,
    fetchWithdrawableLP: fetchLDPWithdrawableLP
  } = useLockdropLPFarmProxyConstants(address);

  const {
    lockdropWithdrawableAmount,
    isLoadingLockdropWithdrawableAmount,
    isCallSuccessLockdropWithdrawableAmount,
    isValidLockdropWithdrawableAmount,
    isPositiveLockdropWithdrawableAmount,

    displayLockdropWithdrawableAmount,
    fetchLockdropWithdrawableAmount,

    numberedLockdropAmount,
    lockdropAmountBN,
    isLoadingUserInfo,
    fetchUserInfo
  } = useLPFarmConstants(address);

  const {
    isLoadingTotalSupply,
    isPositiveTotalSupply,
    numberedTotalSupply,
    fetchTotalSupply,

    isLoadingCurrentPool,
    isValidCurrentPool,
    symbolACurrentPoolBN,
    symbolBCurrentPoolBN,
    fetchCurrentPool
  } = useMSExchangeConstants(address);

  const {
    shoMESHPrice,
    isLoadingSHOMESHPrice,
    isCallSuccessSHOMESHPrice,
    shoMESHPriceBN,
    isValidSHOMESHPrice,
    displaySHOMESHPrice,
    convertedSHOMESHPrice,

    fetchSHOMESHPrice
  } = TokenPriceConnector.useContainer();

  const {
    /** Tx */
    isLoadingForwardLpTokenToLpFarmTx,
    fetchForwardLpTokenToLpFarmTx
  } = useLDPForwardLpTokenToLpFarm();

  /** Life Cycles */
  useSigmaDidMount(() => {
    // Lockdrop
    fetchDepositInfo(address);
    fetchVestingPeriod();
    fetchAllocatedSHO(address);
    fetchClaimableSHO(address);
    fetchWithdrawableLP();
    fetchIsSHOTokensReleased();

    // LockdropLPFarmProxy
    fetchIsForwarded(address);
    fetchIsLPTokensReleased();
    fetchLDPWithdrawableLP();

    // LPFarm
    fetchLockdropWithdrawableAmount(address);
    fetchUserInfo(1, address);

    // MSExchange
    fetchSHOMESHPrice();
    fetchTotalSupply(MESHSWAP_LP_EXCHANGES["shoMESH/MESH"]);
    fetchCurrentPool(MESHSWAP_LP_EXCHANGES["shoMESH/MESH"]);
  });

  const onSuccessTransactions = (type) => {
    fetchDepositInfo(address);
    switch (type) {
      case "claimSHO":
        closeLockdropClaimRewardsConfirmModal();
        fetchClaimableSHO(address);
        fetchIsSHOTokensReleased();

        break;
      case "withdrawLP":
        closeLockdropWithdrawConfirmModal();
        fetchUserInfo(1, address);
        break;

      default:
        break;
    }
  };

  /** Events */

  const onClickWithdraw = async () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidWithdraw) {
      if (!isPositiveDeposit) return;
      if (!isValidIsLPTokensClaimed) return;
      if (!isValidIsLPTokensReleased) return;
      if (!isValidIsForwarded) return;
      if (isLPTokensClaimed) {
        SigmaFormatAlert({
          alertType: ALERT_TYPE.LOCKDROP_ALEADY_WITHDRAW_LP
        });
      } else if (isLPTokensReleased !== true) {
        SigmaFormatAlert({
          alertType: ALERT_TYPE.LOCKDROP_NOT_RELEASE_LP
        });
      } else if (isForwarded !== true) {
        SigmaFormatAlert({
          alertType: ALERT_TYPE.LOCKDROP_FORWARD_ONLY
        });
      } else if (!isPositiveLockdropWithdrawableAmount) {
        SigmaFormatAlert({
          alertType: ALERT_TYPE.LOCKDROP_LOCKUNTIL
        });
      }

      return;
    }
    openLockdropWithdrawConfirmModal();
  };

  const onClickClaimRewards = async () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidClaimRewards) {
      if (!isValidDeposit) return;
      if (!isValidIsSHOTokensReleased) return;
      if (!isSHOTokensReleased) {
        SigmaFormatAlert({
          alertType: ALERT_TYPE.LOCKDROP_NOT_RELEASE_SIG
        });
      }
      return;
    }
    openLockdropClaimRewardsConfirmModal();
  };

  const onClickForwardLpTokenToLpFarm = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidForwardLP) {
      if (!isValidIsLPTokensReleased) return;
      if (isLPTokensReleased === false) {
        SigmaFormatAlert({
          alertType: ALERT_TYPE.LOCKDROP_NOT_RELEASE_LP
        });
        return;
      }

      if (!isValidIsForwarded) return;
      if (isForwarded === true) {
        SigmaFormatAlert({
          alertType: ALERT_TYPE.LOCKDROP_ALREADY_FORWARD
        });
        return;
      }
      return;
    }

    fetchForwardLpTokenToLpFarmTx().then(() => {
      fetchIsForwarded(address);
    });
  };

  /** lp token value */

  const isLoadingLPValue = React.useMemo(() => {
    return (
      isLoadingSHOMESHPrice || isLoadingCurrentPool || isLoadingTotalSupply
    );
  }, [isLoadingSHOMESHPrice, isLoadingCurrentPool, isLoadingTotalSupply]);

  const isValidLPValue = React.useMemo(() => {
    return isValidCurrentPool && isPositiveTotalSupply && isValidSHOMESHPrice;
  }, [isValidCurrentPool, isPositiveTotalSupply, isValidSHOMESHPrice]);

  const lpValueBN = React.useMemo(() => {
    if (!isValidLPValue) return BN(0);
    return symbolACurrentPoolBN
      .times(2)
      .times(shoMESHPriceBN)
      .div(numberedTotalSupply);
  }, [shoMESHPriceBN, symbolACurrentPoolBN, isValidLPValue]);

  /** LockedLPTokenAmount */
  const lockedLPTokenAmount = React.useMemo(() => {
    return !isForwarded && isValidIsForwarded
      ? numberedLDWithdrawableLP
      : numberedWithdrawableLP;
  }, [
    isForwarded,
    isValidIsForwarded,
    numberedLDWithdrawableLP,
    numberedWithdrawableLP
  ]);

  const lockedLPTokenAmountLoading = React.useMemo(() => {
    return isLoadingIsForwarded || isLoadingUserInfo || isLoadingWithdrawableLP;
  }, [isLoadingIsForwarded, isLoadingUserInfo, isLoadingWithdrawableLP]);

  const displayLockedLPTokenAmount = React.useMemo(() => {
    const lockedLPTokenAmountBN = BN(lockedLPTokenAmount);
    if (!isBNPositive(lockedLPTokenAmountBN)) return "-";
    return `${lockedLPTokenAmountBN.decimalPlaces(4).toFormat(BN_FORMAT)}`;
  }, [lockedLPTokenAmount]);

  const displayTotalLPTokenValue = React.useMemo(() => {
    const totalLPTokenValueBN = BN(lockedLPTokenAmount).times(lpValueBN);
    return `${totalLPTokenValueBN.decimalPlaces(4).toFormat(BN_FORMAT)}`;
  }, [lockedLPTokenAmount, lpValueBN]);

  /** Validation */

  const isValidWithdraw = React.useMemo(() => {
    return (
      isPositiveDeposit &&
      isLPTokensReleased === true &&
      isValidIsLPTokensReleased &&
      !isLPTokensClaimed &&
      isValidIsLPTokensClaimed &&
      isForwarded === true &&
      isValidIsForwarded &&
      isPositiveLockdropWithdrawableAmount
    );
  }, [
    isPositiveDeposit,
    isLPTokensReleased,
    isValidIsLPTokensReleased,
    isLPTokensClaimed,
    isValidIsLPTokensClaimed,
    isForwarded,
    isValidIsForwarded,
    isPositiveLockdropWithdrawableAmount
  ]);

  const isValidClaimRewards = React.useMemo(
    () =>
      isPositiveDeposit &&
      isPositiveClaimableSHO &&
      isValidIsSHOTokensReleased &&
      isSHOTokensReleased,
    [
      isPositiveDeposit,
      isPositiveClaimableSHO,
      isSHOTokensReleased,
      isValidIsSHOTokensReleased
    ]
  );

  const isValidForwardLP = React.useMemo(() => {
    return (
      isPositiveLDPWithdrawableLP &&
      isValidIsForwarded &&
      isForwarded === false &&
      !isLoadingForwardLpTokenToLpFarmTx &&
      isLPTokensReleased === true &&
      isValidIsLPTokensReleased
    );
  }, [
    isPositiveLDPWithdrawableLP,
    isLPTokensReleased,
    isValidIsLPTokensReleased,
    isValidIsForwarded,
    isForwarded,
    isLoadingForwardLpTokenToLpFarmTx
  ]);

  /** UI */

  const isLoadingForwardLP = React.useMemo(
    () => isLoadingLDPWithdrawLP || isLoadingIsForwarded,
    [isLoadingLDPWithdrawLP, isLoadingIsForwarded]
  );

  const displayUntilVesting = React.useMemo(() => {
    const currentUnixTime = dayjs().unix();
    const vestingEnds = STAGE_TWO_END_UNIX + numberedVestingPeriod;

    const isValidDuration = vestingEnds - currentUnixTime > 0;
    const durationUnixTime = vestingEnds - currentUnixTime;

    const durationDays = isValidDuration
      ? parseInt(dayjs.duration(durationUnixTime * 1000).asDays())
      : "-";

    return `Vesting until ${
      isValidDuration ? dayjs.unix(vestingEnds).format("MM/DD/YYYY") : "-"
    }\n(${durationDays} days)`;
  }, [numberedVestingPeriod]);

  const {
    popupComponent: LockdropWithdrawConfirmModalComponent,
    openModal: openLockdropWithdrawConfirmModal,
    closeModal: closeLockdropWithdrawConfirmModal
  } = useSigmaAlert({
    defaultInfo: {
      title: "Withdraw",
      subTitle: "Withdraw MESH-shoMESH LP tokens"
    },
    children: (
      <LockdropWithdrawConfirmModal
        onSuccessTransactions={onSuccessTransactions}
      />
    )
  });

  const {
    popupComponent: LockdropClaimRewardsConfirmModalComponent,
    openModal: openLockdropClaimRewardsConfirmModal,
    closeModal: closeLockdropClaimRewardsConfirmModal
  } = useSigmaAlert({
    defaultInfo: {
      title: "Claim Rewards",
      subTitle: "You can claim all SHOs that have been accumulated so far."
    },
    children: (
      <LockdropClaimRewardsConfirmModal
        onSuccessTransactions={onSuccessTransactions}
      />
    )
  });

  return (
    <div className="flex flex-col md:w-[780px] w-full">
      {LockdropWithdrawConfirmModalComponent}
      {LockdropClaimRewardsConfirmModalComponent}
      <motion.div
        variants={MOTION_VARIANTS}
        className="flex flex-col w-full shogun_bg-secondary sm:px-[30px] px-[20px] py-[20px] rounded-md"
      >
        <div className="w-full flex md:flex-row flex-col justify-between items-center ">
          <RedeemRowColumnItem
            className="md:w-[calc((100%-60px)/4)] w-full"
            titleNode={
              <div className="flex md:flex-col flex-row">
                <p className="text-[14px] opacity-50 md:mr-0 mr-[5px]">
                  Locked LP
                </p>
                <div className="flex">
                  <p className="text-[14px] opacity-50">token value</p>
                </div>
              </div>
            }
            contentNode={
              isForwarded && isValidIsForwarded ? (
                <p className="md:text-[16px] text-[14px]">Forwarded</p>
              ) : (
                <div className="flex flex-col md:text-[16px] text-[14px]">
                  <p className="">{`${displayLockedLPTokenAmount} ${TOKENS["shoMESH/MESH"].name}`}</p>
                  <p className="">{`~=${displayTotalLPTokenValue} $`}</p>
                </div>
              )
            }
            loading={lockedLPTokenAmountLoading || isLoadingLPValue}
            isWalletConnected={isWalletConnected}
          />
          <DashboardColumnItem
            className="md:w-[calc((100%-60px)/4)] w-full"
            title="Locked until"
            contentNode={
              <p className="md:whitespace-pre-wrap whitespace-normal md:text-[16px] text-[14px]">
                {displayLockedUntil}
              </p>
            }
            loading={isLoadingDepositInfo}
            isWalletConnected={isWalletConnected}
          />

          <RedeemRowColumnItem
            className="md:w-[calc((100%-60px)/4)] w-full"
            titleNode={
              <div className="flex flex-col">
                <div className="flex">
                  <p className="text-[14px] opacity-50">LP Token APY</p>
                  <AKToolTip
                    tooltipElement={
                      <p className="text-[12px]">
                        APY will show after 🎉 Token Generation Event 🎉
                      </p>
                    }
                  />
                </div>
              </div>
            }
            contentNode={
              <p className="whitespace-pre-wrap md:text-[16px] text-[14px]">
                -
              </p>
            }
            loading={false}
            isWalletConnected={isWalletConnected}
          />

          <SigmaButton
            className={`${
              isValidWithdraw ? "" : "opacity-50 cursor-not-allowed"
            } md:w-[calc((100%-60px)/4)] w-full relative overflow-hidden main_bg text-black  md:min-h-[60px] sm:min-h-[48px] min-h-[40px] flex justify-center items-center sm:text-[18px] text-[14px] font-semibold rounded-md md:mt-0 mt-[15px]`}
            onClick={onClickWithdraw}
          >
            <p>Withdraw</p>
            {isLoadingDepositInfo && (
              <LoadingModal
                className="absolute w-full h-full z-10 main_bg"
                loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                message={null}
              />
            )}
          </SigmaButton>
        </div>
        <div className="flex md:flex-row flex-col  justify-between items-center mt-[10px] border-[#ffffff50] border-[1px] p-[10px] rounded-md">
          <p className="md:w-[calc((100%-60px)*3/4)] sm:text-[14px] text-[12px] whitespace-pre-wrap">
            {`You must stake your locked LP tokens at shoMESH-MESH LP farm to participate in farming and receive ${TOKENS.SHO.name} incentive tokens as well.\n\nThere is no additional unstaking period or cost involved with farming. You may also apply yield boosting by activating vxSHO.\n\nPlease press 'Farm' button to participate. `}
          </p>
          <SigmaButton
            className={` ${
              isValidForwardLP ? "" : "opacity-50 cursor-not-allowed"
            } md:w-[calc((100%-60px)/4)] relative w-full main_bg px-[10px] text-black  md:min-h-[60px] sm:min-h-[48px] min-h-[40px] flex justify-center items-center sm:text-[18px] text-[14px] font-semibold rounded-md md:mt-0 mt-[10px]`}
            onClick={onClickForwardLpTokenToLpFarm}
          >
            Farm
            {(isLoadingForwardLpTokenToLpFarmTx || isLoadingForwardLP) && (
              <LoadingModal
                className="absolute w-full h-full z-10 main_bg"
                loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                message={null}
              />
            )}
          </SigmaButton>
        </div>
      </motion.div>

      <div className="h-[16px]" />
      <motion.div
        variants={MOTION_VARIANTS}
        className="w-full flex md:flex-row flex-col justify-between items-center shogun_bg-secondary sm:px-[30px] px-[20px] py-[20px] rounded-md"
      >
        <RedeemRowColumnItem
          className="md:w-[calc((100%-60px)/4)] w-full"
          titleNode={
            <div className="flex">
              <p className=" text-[14px] opacity-50">Total Rewards</p>
              <AKToolTip
                tooltipElement={
                  <p className="whitespace-pre-wrap text-[12px]">
                    {`${displayUntilVesting}`}
                  </p>
                }
              />
            </div>
          }
          contentNode={
            <p className="md:text-[16px] text-[14px]">{`${displayExpectedSHOReward} ${TOKENS.SHO.name}`}</p>
          }
          loading={isLoadingAllocatedSHO}
          isWalletConnected={isWalletConnected}
        />
        <DashboardColumnItem
          className="md:w-[calc((100%-60px)/4)] w-full"
          title={`Total Rewards
          Claimed`}
          contentNode={
            <p className="md:text-[16px] text-[14px]">{`${displayClaimedSHO} ${TOKENS.SHO.name}`}</p>
          }
          loading={isLoadingDepositInfo}
          isWalletConnected={isWalletConnected}
        />
        <DashboardColumnItem
          className="md:w-[calc((100%-60px)/4)] w-full"
          title="Claimable Rewards"
          contentNode={
            <p className="md:text-[16px] text-[14px]">{`${displayClaimableSHO} ${TOKENS.SHO.name}`}</p>
          }
          loading={isLoadingClaimableSHO}
          isWalletConnected={isWalletConnected}
        />

        <SigmaButton
          className={`${
            isValidClaimRewards ? "" : "opacity-50 cursor-not-allowed"
          } md:w-[calc((100%-60px)/4)] w-full relative overflow-hidden main_bg text-black  sm:min-h-[60px] min-h-[48px] flex justify-center items-center sm:text-[18px] text-[14px] font-semibold rounded-md  md:mt-0 mt-[15px]`}
          onClick={onClickClaimRewards}
        >
          <p>Claim Rewards</p>
          {isLoadingIsSHOTokensReleased && (
            <LoadingModal
              className="absolute w-full h-full z-10 main_bg"
              loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
              message={null}
            />
          )}
        </SigmaButton>
      </motion.div>
    </div>
  );
};

export const RedeemRowColumnItem = ({
  className,
  style,
  titleNode,
  contentNode,
  loading,
  isWalletConnected
}) => {
  return (
    <div
      className={`${className} h-full flex md:flex-col flex-row md:items-start items-center md:justify-start justify-between`}
      style={style}
    >
      {titleNode}
      <div className="h-[12px]" />
      {isWalletConnected ? (
        loading ? (
          <Loading />
        ) : (
          contentNode
        )
      ) : (
        <WalletConnection className="sm:w-[16px] w-[12px] sm:h-[16px] h-[12px]" />
      )}
    </div>
  );
};

export default LDRedeemRows;
