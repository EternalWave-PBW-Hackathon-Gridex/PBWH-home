import React from "react";
import AKTooltip from "../../../../components/AKTooltip";
import FarmListRowValue from "../FarmListRowValue";

import { TripleButtonGroup } from "../../../../components/SigmaValueDisplay";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import { TOKENS } from "../../../../web3/constants";
import Connector from "../../../../context/WalletConnector/Connector";
import TokenPriceConnector from "../../../../context/TokenPriceConnector";
import { getAbbreviateNumberFormat } from "../../../../web3/utils/numberFormat";
import { BN, BN_FORMAT, isBNPositive } from "../../../../web3/utils/AKBN";
import SHOMESHFarmModal from "./Modal/SHOMESHFarmModal";
import { useSigmaAlert } from "../../../../components/SigmaAlert";
import SHOMESHWithdrawModal from "./Modal/SHOMESHWithdrawModal";
import SHOMESHClaimConfirmModal from "./Modal/SHOMESHClaimConfirmModal";
import useSMFConstants from "../../../../web3/hooks/SHOMESHFarm/ReadOnly/useSMFConstants";
import useERC20Balance from "../../../../web3/hooks/ERC20/useERC20Balance";
import MeshswapEscrowContract from "../../../../web3/contracts/MeshswapEscrowContract";
import SHOMESHFarm from "../../../../web3/contracts/SHOMESHFarmContract/SHOMESHFarm";
import BoostIcon from "../../../../assets/images/global_icon_boost.png";

const farmItem = {
  token: TOKENS["shoMESH"]
};

const SHOMESHFarmListRow = () => {
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
    balance,
    isLoadingBalance: isLoadingSHOMESHBalance,

    balanceBN: shoMESHBalanceBN,
    isValidBalance,
    isPositiveBalance: isPositiveSHOMESHBalance,
    numberedBalance,
    displayBalance,
    displayNumberFormatBalance,
    fetchBalance: fetchSHOMESHBalance
  } = useERC20Balance(MeshswapEscrowContract);

  const {
    isLoadingUserInfo,

    amount,
    amountBN,
    displayAmount,
    isValidAmount,
    isPositiveAmount,
    displayNumberFormatAmount,

    boostWeightBN,
    isValidBoostWeight,
    isPositiveBoostWeight,
    numberedBoostWeight,
    displayBoostWeight,
    displayNumberFormatBoostWeight,
    fetchUserInfo,

    basePendingBN,
    isLoadingBasePending,
    isPositiveBasePending,
    numberedBasePending,
    displayBasePending,
    fetchBasePending,

    boostPendingBN,
    isLoadingBoostPending,
    isValidBoostPending,
    isPositiveBoostPending,
    numberedBoostPending,
    displayBoostPending,
    fetchBoostPending,

    totalBoostWeightBN,
    isLoadingTotalBoostWeight,

    isPositiveTotalBoostWeight,
    numberedTotalBoostWeight,

    displayTotalBoostWeight,
    fetchTotalBoostWeight
  } = useSMFConstants(address);

  /** Life Cycle */
  useSigmaDidMount(
    () => {
      fetchSHOMESHBalance(SHOMESHFarm.address);
      fetchSHOMESHPrice();
      fetchSHOPrice();
      fetchTotalBoostWeight();
    },
    [],
    false
  );

  useSigmaDidMount(() => {
    fetchUserInfo();
    fetchBasePending();
    fetchBoostPending();
  });

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
      case "Farm":
        closeFarmPopup();
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
    if (!isWalletConnected) return;
    fetchUserInfo();
    fetchBasePending();
    fetchBoostPending();
    switch (type) {
      case "Farm":
        closeFarmPopup();

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

  /** TVL Item */

  const isValidTVL = React.useMemo(() => {
    return isPositiveSHOMESHPrice && isPositiveSHOMESHBalance;
  }, [isPositiveSHOMESHPrice, isPositiveSHOMESHBalance]);

  const isLoadingTVL = React.useMemo(() => {
    return isLoadingSHOMESHPrice || isLoadingSHOMESHBalance;
  }, [isLoadingSHOMESHPrice, isLoadingSHOMESHBalance]);

  const tvlBN = React.useMemo(() => {
    if (!isValidTVL) return BN(0);
    return shoMESHPriceBN.times(shoMESHBalanceBN);
  }, [isValidTVL, shoMESHPriceBN, shoMESHBalanceBN]);

  const displayTVL = React.useMemo(() => {
    if (!isValidTVL) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(tvlBN.toString());
  }, [isValidTVL, tvlBN]);

  /** APR Items Constants */
  const basePoolRate = 0.4;
  const boostPoolRate = 0.6;
  const yearDividedPeriod = 0.6666666;
  const SHO_REWARD = 10000000;

  /** BasePool APR Item */
  const isLoadingBasePoolAPR = React.useMemo(() => {
    return isLoadingTVL || isLoadingSHOPrice;
  }, [isLoadingTVL, isLoadingSHOPrice]);

  const isValidBasePoolAPR = React.useMemo(() => {
    return isValidTVL && isPositiveSHOPrice;
  }, [isValidTVL, isPositiveSHOPrice]);

  const basePoolAPRBN = React.useMemo(() => {
    if (!isValidBasePoolAPR) return BN(0);
    return shoPriceBN
      .times(SHO_REWARD * basePoolRate * yearDividedPeriod)
      .times(100)
      .div(tvlBN);
  }, [isValidBasePoolAPR, shoPriceBN, tvlBN]);

  const displayBasePoolAPR = React.useMemo(() => {
    if (!isValidBasePoolAPR) return "-";
    if (!isBNPositive(basePoolAPRBN)) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(basePoolAPRBN.toString());
  }, [isValidBasePoolAPR, basePoolAPRBN]);

  /** Expected boost pool APR Item */

  const isLoadingBoostPoolAPR = React.useMemo(() => {
    return (
      isLoadingSHOPrice ||
      isLoadingUserInfo ||
      isLoadingSHOMESHPrice ||
      isLoadingTotalBoostWeight
    );
  }, [
    isLoadingSHOPrice,
    isLoadingUserInfo,
    isLoadingSHOMESHPrice,
    isLoadingTotalBoostWeight
  ]);

  const isValidExpectedBoostPoolAPR = React.useMemo(() => {
    return (
      isPositiveSHOPrice && isPositiveSHOMESHPrice && isPositiveTotalBoostWeight
    );
  }, [isPositiveSHOPrice, isPositiveSHOMESHPrice, isPositiveTotalBoostWeight]);

  const expectedBoostPoolAPRBN = React.useMemo(() => {
    if (!isValidExpectedBoostPoolAPR) return BN(0);
    const userBoostWeight = BN(100)
      .times(shoMESHPriceBN)
      .div(shoPriceBN)
      .times(100)
      .squareRoot();
    return shoPriceBN
      .times(SHO_REWARD * boostPoolRate * yearDividedPeriod)
      .div(BN(200).times(shoMESHPriceBN))
      .times(userBoostWeight.div(totalBoostWeightBN))
      .times(100);
  }, [
    isValidExpectedBoostPoolAPR,
    shoPriceBN,
    shoMESHPriceBN,
    totalBoostWeightBN
  ]);

  const displayExpectedBoostPoolAPRBN = React.useMemo(() => {
    if (!isValidExpectedBoostPoolAPR) return "-";
    if (!isBNPositive(expectedBoostPoolAPRBN)) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(expectedBoostPoolAPRBN.toString());
  }, [isValidExpectedBoostPoolAPR, expectedBoostPoolAPRBN]);

  /** Boost pool APR Item */

  const isValidBoostPoolAPR = React.useMemo(() => {
    return (
      isPositiveSHOPrice &&
      isPositiveAmount &&
      isPositiveSHOMESHPrice &&
      isPositiveTotalBoostWeight &&
      isPositiveBoostWeight
    );
  }, [
    isPositiveSHOPrice,
    isPositiveAmount,
    isPositiveSHOMESHPrice,
    isPositiveTotalBoostWeight,
    isPositiveBoostWeight
  ]);

  const boostPoolAPRBN = React.useMemo(() => {
    if (!isValidBoostPoolAPR) return BN(0);
    return shoPriceBN
      .times(SHO_REWARD * boostPoolRate * yearDividedPeriod)
      .div(amountBN.times(shoMESHPriceBN))
      .times(boostWeightBN.div(totalBoostWeightBN))
      .times(100);
  }, [
    isValidBoostPoolAPR,
    shoPriceBN,
    amountBN,
    shoMESHPriceBN,
    boostWeightBN,
    totalBoostWeightBN
  ]);

  const displayBoostPoolAPR = React.useMemo(() => {
    if (!isValidBoostPoolAPR) return "-";
    if (!isBNPositive(boostPoolAPRBN)) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(boostPoolAPRBN.toString());
  }, [isValidBoostPoolAPR, boostPoolAPRBN]);

  /** Your Earning Item */

  const isLoadingYourEarnings = React.useMemo(() => {
    return isLoadingBasePending || isLoadingBoostPending;
  }, [isLoadingBasePending, isLoadingBoostPending]);

  const isValidYourEarnings = React.useMemo(() => {
    return isPositiveBasePending && isValidBoostPending;
  }, [isPositiveBasePending, isValidBoostPending]);

  const displayYourEarning = React.useMemo(() => {
    if (!isValidYourEarnings) return "-";
    return `${basePendingBN
      .plus(boostPendingBN)
      .decimalPlaces(4)
      .toFormat(BN_FORMAT)}`;
  }, [isValidYourEarnings, basePendingBN, boostPendingBN]);

  /** Popups */
  const {
    popupComponent: FarmPopup,
    openModal: openFarmPopup,
    closeModal: closeFarmPopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Farm",
      subTitle: `Supply ${farmItem.token.name} token to earn ${TOKENS.SHO.name} rewards `
    },
    children: (
      <SHOMESHFarmModal
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
      subTitle: `Withdraw ${farmItem.token.name} from ${TOKENS.shoMESH.name} Farm`
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
      {FarmPopup}
      {WithdrawPopup}
      {ClaimPopup}
      <div className="w-full  flex sm:flex-row flex-col">
        <div className="flex sm:w-[22%] w-full  items-center sm:mt-0 mt-[10px]">
          <div className="xlg:min-w-[60px] xlg:w-[60px] xlg:h-[60px] lg:min-w-[50px] lg:w-[50px] lg:h-[50px] min-w-[40px] w-[40px] h-[40px] flex rounded-full mr-[10px]">
            <img src={token.logo} alt="logo" />
          </div>
          <p className="xlg:text-[20px] lg:text-[18px] text-[16px] xlg:font-semibold font-medium">
            {`${token.name} Farm`}
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
          </div>
        </div>

        <div className="sm:w-[13%] w-full  flex sm:justify-center justify-between  items-center xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[5px]">
          <div className="sm:hidden flex opacity-50 ">Your Deposits</div>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingUserInfo}
            error={false}
            valueNode={
              <p className="">{`${displayNumberFormatAmount} ${token.name}`}</p>
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
            valueNode={
              <p className="">{`${displayYourEarning} ${TOKENS.SHO.name}`}</p>
            }
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

export default SHOMESHFarmListRow;
