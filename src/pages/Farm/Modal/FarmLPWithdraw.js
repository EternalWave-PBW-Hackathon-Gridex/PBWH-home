import React from "react";
import { debounce } from "lodash";

import { LoadingModal } from "../../../components/Loading";
import {
  UnitValueDisplay,
  LPTokenDisplay
} from "../../../components/SigmaValueDisplay";
import {
  BN,
  convertToETH,
  isBNPositive,
  BN_FORMAT,
  convertToWei
} from "../../../web3/utils/AKBN";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import useSigmaCurrencyInput from "../../../hooks/TextField/useSigmaCurrencyInput";
import useERC20 from "../../../web3/hooks/ERC20/useERC20";
import Connector from "../../../context/WalletConnector/Connector";
import LPFarm from "../../../web3/contracts/LPFarmContract/LPFarm";
import { TOKENS } from "../../../web3/constants";
import SigmaButton from "../../../components/Animation/SigmaButton";
import useLFWithdrawLP from "../../../web3/hooks/LPFarm/useLFWithdrawLP";
import useLPFarmConstants from "../../../web3/hooks/LPFarm/ReadOnly/useLPFarmConstants";
import FundFarmContract from "../../../web3/contracts/FundFarmContract";
import useFFConstants from "../../../web3/hooks/FundFarm/ReadOnly/useFFConstants";
import useFFWithdrawLP from "../../../web3/hooks/FundFarm/useFFWithdrawLP";

const FarmLPWithdraw = ({ onSuccessTransactions, farmItem, handleNext }) => {
  const isSHOMESHMESH = farmItem.token.name === "shoMESH/MESH";
  const { poolId, checkAllowanceRequest, approveRequest, getBalanceRequest } =
    farmItem.lp;
  const { token } = farmItem;

  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    lpBalance,
    lpBalanceBN,
    isLoadingLPBalance,
    isCallSuccessLPBalance,
    isValidLPBalance,
    isPositiveLPBalance,
    numberedLPBalance,

    displayLPBalance,
    fetchLPBalance
  } = useFFConstants(address);

  const {
    userInfoAmount,
    isLoadingUserInfo,
    userInfoAmountBN,
    displayUserInfoAmount,
    isPositiveUserInfoAmount,

    lockdropAmountBN,
    isValidLockdropAmount,
    isPositiveLockdropAmount,
    numberedLockdropAmount,
    displayLockdropAmount,

    displayLockingPeriod,
    boostWeightBN,
    isPositiveBoostWeight,
    fetchUserInfo
  } = useLPFarmConstants(address);

  // const withdrawableAmount = React.useMemo(() => {
  //   return userInfoAmountBN.minus(lockdropAmountBN);
  // }, [userInfoAmountBN, lockdropAmountBN]);

  // const displayWithdrawableAmount = React.useMemo(() => {
  //   if (!isPositiveUserInfoAmount) return "-";
  //   return userInfoAmountBN
  //     .minus(lockdropAmountBN)
  //     .decimalPlaces(4)
  //     .toFormat(BN_FORMAT);
  // }, [withdrawableAmount, isPositiveUserInfoAmount]);

  const {
    inputComponent,
    maxComponent,
    isPositive: isInputPositive,
    weiValue,
    mweiValue,
    isBiggerThanBalance
  } = useSigmaCurrencyInput({
    name: token.name,
    placeholder: `${token.name} to Withdraw`,
    balance: lpBalance
  });

  const {
    /** Tx Fee */
    isCallSuccessWithdrawLPTxFee,
    isLoadingWithdrawLPTxFee,
    fetchWithdrawLPTxFee,
    displayWithdrawLPTxFee,
    setWithdrawLPTxFeeLoading,

    /** Tx */
    isLoadingWithdrawLPTx,
    fetchWithdrawLPTx,

    /** Helpers */
    isValidWithdrawLPTx
  } = useFFWithdrawLP();

  const onSuccessLPWithdrawPopupTransactions = (type, _trxHash) => {
    switch (type) {
      case "LP":
        // fetchCheckAllowance();
        break;
      case "withdrawLP":
        // Swal.close();
        break;

      default:
        break;
    }
  };

  /** LifeCycle */

  useSigmaDidMount(() => {
    fetchLPBalance();
  });

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && isInputPositive && !isBiggerThanBalance) {
      if (!isLoadingWithdrawLPTxFee) setWithdrawLPTxFeeLoading(true);
      onDebounce(weiValue);
    }
  }, [weiValue, isWalletConnected, isInputPositive, isBiggerThanBalance]);

  const onDebounce = React.useCallback(
    debounce((weiValue) => {
      fetchWithdrawLPTxFee(weiValue);
    }, 1000),
    [address]
  );

  /** Initializers */

  /** Event */

  const onClickWithdraw = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidWithdrawTransaction) return;
    fetchWithdrawLPTx(weiValue).then(() => {
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("withdrawLP");
      handleNext();
    });
  };

  /** UI */

  /** Validations */

  const isValidWithdrawTransaction = React.useMemo(() => {
    return (
      isInputPositive &&
      !isBiggerThanBalance &&
      isPositiveLPBalance &&
      isWalletConnected &&
      isValidWithdrawLPTx
    );
  }, [
    isInputPositive,
    isBiggerThanBalance,
    isPositiveLPBalance,
    isWalletConnected,
    isValidWithdrawLPTx
  ]);

  return (
    <div className={` flex flex-col items-center relative`}>
      {isLoadingWithdrawLPTx && (
        <LoadingModal
          className="absolute w-full h-full z-10 outer_bg "
          loadingClassName={"sm:w-[80px] w-[50px] sm:h-[80px] h-[50px]"}
          messageClassName={
            "sm:text-[20px] text-[16px] md:mt-[20px] mt-[10px] text-white"
          }
        />
      )}

      <div className="w-full">
        <UnitValueDisplay
          title={`Your Deposit`}
          value={displayLPBalance}
          unit={farmItem.token.name}
          className=" text-white mt-[5px]"
          loading={isLoadingLPBalance}
        />
        <div className="min-h-[5px]" />

        <div className={` flex w-full  transition-all hover:scale-105`}>
          {inputComponent}
          {maxComponent}

          <LPTokenDisplay
            tokenInfo={farmItem.token}
            className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
          />
        </div>
      </div>

      {isWalletConnected && (
        <UnitValueDisplay
          title="Tx Fee"
          value={displayWithdrawLPTxFee}
          unit={TOKENS.ETH.name}
          className="mt-[5px] text-white"
          loading={isLoadingWithdrawLPTxFee}
          error={false}
        />
      )}
      <div className="flex justify-between w-full sm:h-[50px] h-[40px] mt-[15px] sm:text-[18px]  text-[16px] font-medium">
        <SigmaButton
          className={`${
            !isValidWithdrawTransaction ? "cursor-not-allowed opacity-50" : ""
          } w-full overflow-hidden  h-full    flex justify-center items-center rounded-md main_bg text-black `}
          onClick={onClickWithdraw}
        >
          <p>Withdraw</p>
        </SigmaButton>
      </div>
    </div>
  );
};

export default FarmLPWithdraw;
