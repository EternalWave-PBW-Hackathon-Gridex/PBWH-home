import React from "react";
import dayjs from "dayjs";
import {
  isBNPositive,
  BN,
  convertToETH,
  BN_FORMAT
} from "../../../web3/utils/AKBN";
import { getAbbreviateNumberFormat } from "../../../web3/utils/numberFormat";

import GovernStakingDetailItem from "../GovernStakingDetailItem";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import Connector from "../../../context/WalletConnector/Connector";
import useERC20TotalSupply from "../../../web3/hooks/ERC20/useERC20TotalSupply";
import xSHOTokenContract from "../../../web3/contracts/xSHOTokenContract";
import { TOKENS } from "../../../web3/constants";
import useSFConstants from "../../../web3/hooks/SHOFarm/ReadOnly/useSFConstants";
import TokenPriceConnector from "../../../context/TokenPriceConnector";
import useERC20Balance from "../../../web3/hooks/ERC20/useERC20Balance";
import useSHOStakingRowSHObalance from "./useSHOStakingRowSHObalance";
import SHOTokenContract from "../../../web3/contracts/SHOTokenContract";
import AKTooltip from "../../../components/AKTooltip";
import useSHOStakingSHOStaked from "./useSHOStakingSHOStaked";
import SigmaButton from "../../../components/Animation/SigmaButton";
import SHOFarmRedeemModal from "./Modal/SHOFarmRedeemModal";
import { useSigmaAlert } from "../../../components/SigmaAlert";
import xGRINTokenContract from "../../../web3/contracts/xGRINTokenContract";
import GRINTokenContract from "../../../web3/contracts/GRINTokenContract";

const SHOStakingDetails = ({ onSuccessTransactions }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const isLoadingSHOPrice = false;
  const displaySHOPrice = "1";
  const {
    isLoadingTotalSupply: isLoadingXSHOTotalSupply,
    displayTotalSupply: displayXSHOTotalSupply,
    fetchTotalSupply: fetchXSHOTotalSupply
  } = useERC20TotalSupply(xGRINTokenContract);

  const {
    isLoadingBalance: isLoadingXSHOBalance,
    balanceBN: xSHOBalanceBN,
    isPositiveBalance: isPositiveXSHOBalance,
    displayBalance: displayXSHOBalance,

    fetchBalance: fetchXSHOBalance
  } = useERC20Balance(xGRINTokenContract);

  const {
    isLoadingBalance: isLoadingSHOBalance,
    displayNumberFormatBalance: displayNumberFormatSHOBalance,

    fetchBalance: fetchSHOBalance
  } = useSHOStakingRowSHObalance(GRINTokenContract);

  const {
    xSHOExchangeRateBN,
    isPositiveXSHOExchangeRate,
    isLoadingXSHOExchangeRate,
    displayXSHOExchangeRate,
    fetchXSHOExchangeRate,

    withdrawInfos,
    isLoadingWithdrawInfos,
    isValidWithdrawInfos,
    isEmptyWithdrawInfos,
    displayUnstakingDetailWithdrawInfos,
    fetchWithdrawInfos,

    isLoadingRedeemableSHO,
    isPositiveRedeemableSHO,
    displayNumberFormatRedeemableSHO,
    fetchRedeemableSHO
  } = useSFConstants(address);

  /** Life Cycle */
  useSigmaDidMount(() => {
    fetchXSHOTotalSupply(address);
    fetchXSHOBalance(address);
    fetchXSHOExchangeRate();

    fetchSHOBalance(address);

    fetchWithdrawInfos();
    fetchRedeemableSHO();
  });
  /** Event */

  const onClickRedeem = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isPositiveRedeemableSHO) return;
    openRedeemPopup();
  };

  const handleCancelPopup = (type) => {
    switch (type) {
      case "redeem":
        closeRedeemPopup();
        break;

      default:
        break;
    }
  };

  /** SHOStaked Items */
  const { isLoadingTotalSHOStaked, displayTotalSHOStaked } =
    useSHOStakingSHOStaked();

  /** XSHO Balance Items */
  const isLoadingXSHOBalanceItem = React.useMemo(() => {
    return isLoadingXSHOBalance || isLoadingXSHOExchangeRate;
  }, [isLoadingXSHOBalance, isLoadingXSHOExchangeRate]);

  const stakedSHO = React.useMemo(() => {
    const isValid = isPositiveXSHOBalance && isPositiveXSHOExchangeRate;
    if (!isValid) return "-";

    return xSHOBalanceBN
      .times(xSHOExchangeRateBN)
      .decimalPlaces(4)
      .toFormat(BN_FORMAT);
  }, [
    isPositiveXSHOBalance,
    isPositiveXSHOExchangeRate,
    xSHOExchangeRateBN,
    xSHOBalanceBN
  ]);

  /** Unstaking */
  const displayTotalUnstakingAmount = React.useMemo(() => {
    if (!isValidWithdrawInfos) return "0";
    let totalSHOAmount = BN(0);
    for (const withdrawInfo of withdrawInfos) {
      totalSHOAmount = totalSHOAmount.plus(
        convertToETH(BN(withdrawInfo.SHOAmount.toString()))
      );
    }

    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(totalSHOAmount.toString());
  }, [isValidWithdrawInfos, withdrawInfos]);

  /** Popups */
  const {
    popupComponent: RedeemPopup,
    openModal: openRedeemPopup,
    closeModal: closeRedeemPopup
  } = useSigmaAlert({
    defaultInfo: {
      title: "Redeem"
    },
    children: (
      <SHOFarmRedeemModal
        handleCancelPopup={handleCancelPopup}
        onSuccessTransactions={onSuccessTransactions}
      />
    ),
    closeOnDocumentClick: false
  });

  return (
    <div className=" flex flex-col sm:mt-[30px] mt-[10px]">
      {RedeemPopup}
      <div className="w-full  flex sm:flex-row flex-col ">
        <div className="w-[4.84%] mr-[10px] sm:flex hidden" />
        <GovernStakingDetailItem
          className="sm:w-[17.16%] w-full"
          title={`${TOKENS.GRIN.name} Staked`}
          loading={isLoadingTotalSHOStaked}
          isWalletConnected={isWalletConnected}
          contentNode={<p className="">{`${displayTotalSHOStaked} %`}</p>}
        />
        <div className=" flex sm:w-[47%] w-full  justify-center sm:flex-row flex-col">
          <GovernStakingDetailItem
            className="sm:w-[33.33%] w-full"
            title={`${TOKENS.xGRIN.name} Supply`}
            loading={isLoadingXSHOTotalSupply}
            isWalletConnected={isWalletConnected}
            contentNode={
              <p className="">{`${displayXSHOTotalSupply} ${TOKENS.xGRIN.name}`}</p>
            }
          />
          <GovernStakingDetailItem
            className="sm:w-[33.33%] w-full"
            title="Exchange Rate"
            loading={isLoadingXSHOExchangeRate}
            isWalletConnected={isWalletConnected}
            contentNode={
              <p className="">{`${displayXSHOExchangeRate} ${TOKENS.GRIN.name}/${TOKENS.xGRIN.name}`}</p>
            }
          />
          <GovernStakingDetailItem
            className="sm:w-[33.33%] w-full"
            title={`${TOKENS.GRIN.name} Price`}
            loading={isLoadingSHOPrice}
            isWalletConnected={isWalletConnected}
            contentNode={
              <p className="">{`$ ${displaySHOPrice} ${TOKENS.USDC.name}`}</p>
            }
          />
        </div>

        <div className=" flex justify-center items-center  w-[31%] max-w-[31%] " />
      </div>
      <div className="w-full  flex sm:flex-row flex-col sm:mt-[30px] mt-[10px]">
        <div className="min-w-[4.84%]  sm:flex hidden" />
        <div className="w-full flex sm:flex-row flex-col shogun_bg-primary px-[10px] pt-[30px] pb-[10px] rounded-md ">
          <GovernStakingDetailItem
            className="sm:w-[18.03%] w-full opacity-50 "
            title={`${TOKENS.xGRIN.name} Balance`}
            loading={isLoadingXSHOBalanceItem}
            isWalletConnected={isWalletConnected}
            contentNode={
              <div className="flex flex-col">
                <p className="">{`${displayXSHOBalance} ${TOKENS.xGRIN.name}`}</p>
                <p className="">{`=${stakedSHO} ${TOKENS.GRIN.name}`}</p>
              </div>
            }
          />
          <div className=" flex sm:w-[49.38%]  w-full  justify-center sm:flex-row flex-col opacity-50">
            <GovernStakingDetailItem
              className="sm:w-[33.33%] w-full"
              title="Stakeable"
              loading={isLoadingSHOBalance}
              isWalletConnected={isWalletConnected}
              contentNode={
                <p>{`${displayNumberFormatSHOBalance} ${TOKENS.GRIN.name}`} </p>
              }
            />
            <GovernStakingDetailItem
              className="sm:w-[33.33%] w-full"
              title="Unstaking"
              loading={isLoadingWithdrawInfos}
              isWalletConnected={isWalletConnected}
              contentNode={
                <div className="flex flex-col">
                  <p className="">{`${displayTotalUnstakingAmount} ${TOKENS.GRIN.name}`}</p>
                  {!isEmptyWithdrawInfos && (
                    <AKTooltip
                      parent={
                        <p className="text-[12px] underline cursor-help">
                          details
                        </p>
                      }
                      tooltipElement={
                        <div className="flex flex-col text-[14px] p-[10px]">
                          {displayUnstakingDetailWithdrawInfos.map(
                            (withdrawInfo, index) => {
                              const {
                                SHOAmount,
                                xSHOAmount,
                                unlockTime,
                                formatedUnlockTime
                              } = withdrawInfo;

                              return (
                                <p
                                  key={`Unstaking-item-${index + 1}`}
                                  className="mb-[5px]"
                                >{`⏳ ${SHOAmount} ${TOKENS.GRIN.name} (${xSHOAmount} ${TOKENS.xGRIN.name}) - Unlocked on ${formatedUnlockTime}`}</p>
                              );
                            }
                          )}
                        </div>
                      }
                    />
                  )}
                </div>
              }
            />

            <GovernStakingDetailItem
              className="sm:w-[33.33%] w-full"
              title="Redeemable"
              loading={isLoadingRedeemableSHO}
              isWalletConnected={isWalletConnected}
              contentNode={
                <p className="">{`${displayNumberFormatRedeemableSHO} ${TOKENS.GRIN.name}`}</p>
              }
            />
          </div>

          <div className=" flex justify-center items-center  sm:w-[32.57%] sm:max-w-[32.57%] w-full max-w-full sm:mt-0 mt-[10px]">
            <SigmaButton
              className={`${
                isPositiveRedeemableSHO
                  ? " main_bg text-black"
                  : "cursor-not-allowed opacity-20 border-[1px] border-[#ffffff]"
              } flex justify-center items-center rounded-md w-full h-[48px] sm:mr-[10px] mr-0  `}
              onClick={onClickRedeem}
            >
              Redeem
            </SigmaButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SHOStakingDetails;
