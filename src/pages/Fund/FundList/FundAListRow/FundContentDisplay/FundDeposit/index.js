import React from "react";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import SigmaButton from "../../../../../../components/Animation/SigmaButton";
import { LoadingModal } from "../../../../../../components/Loading";
import {
  LPTokenDisplay,
  UnitValueDisplay
} from "../../../../../../components/SigmaValueDisplay";
import Connector from "../../../../../../context/WalletConnector/Connector";
import useSigmaCurrencyInput from "../../../../../../hooks/TextField/useSigmaCurrencyInput";
import useSigmaDidMount from "../../../../../../hooks/useSigmaDidMount";
import { GDXPrice, TOKENS, wETHPrice } from "../../../../../../web3/constants";
import useERC20 from "../../../../../../web3/hooks/ERC20/useERC20";
import useETHInput from "./useETHInput";
import useGDXInput from "./useGDXInput";

import SwapIcon from "../../../../../../assets/images/global_icon-swap.png";
import useBIDepositLP from "../../../../../../web3/hooks/BIIndexFund/useBIDepositLP";
import { BN, convertToWei } from "../../../../../../web3/utils/AKBN";

const FundDeposit = ({ tokens }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    component: ETHComponent,
    isApproved: ETHIsApproved,
    setInput: setETHInput,
    setIsEnable: setIsETHEnable,
    fetchBalance: fetchETHBalance,
    stringValue: ethStringValue,
    numberValue: ethNumberValue,
    isInputPositive: isETHInputPositive,
    isBiggerThanBalance: isETHBiggerThanBalance,
    weiValue: ethWeiValue
  } = useETHInput({
    token: tokens[0]
  });

  const {
    component: GDXComponent,
    isApproved: GDXIsApproved,
    setInput: setGDXInput,
    setIsEnable: setIsGDXEnable,
    fetchBalance: fetchGDXBalance,
    stringValue: gdxStringValue,
    numberValue: gdxNumberValue,
    isInputPositive: isGDXInputPositive,
    isBiggerThanBalance: isGDXBiggerThanBalance,
    weiValue: gdxWeiValue
  } = useGDXInput({
    token: tokens[1]
  });

  const {
    /** Tx Fee */
    isCallSuccessDepositLPTxFee,
    isLoadingDepositLPTxFee,
    fetchDepositLPTxFee,
    displayDepositLPTxFee,
    setDepositLPTxFeeLoading,

    /** Tx */
    isLoadingDepositLPTx,
    fetchDepositLPTx,

    /** Helpers */
    isValidDepositLPTx
  } = useBIDepositLP();

  useSigmaDidMount(() => {
    // setGDXInput(0);
    // setETHInput(0);
  }, []);

  useSigmaDidMount(() => {
    setGDXInput((ethNumberValue * (wETHPrice * 4)) / GDXPrice);
  }, [ethNumberValue]);

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && gdxWeiValue && ethWeiValue) {
      if (!isLoadingDepositLPTxFee) setDepositLPTxFeeLoading();
      onDebounce(ethWeiValue, gdxWeiValue);
    }
  }, [gdxWeiValue, ethWeiValue, isWalletConnected]);

  const onDebounce = React.useCallback(
    debounce((ethWeiValue, gdxWeiValue) => {
      fetchDepositLPTxFee(ethWeiValue, gdxWeiValue, 1, 1, address);
    }, 1000),
    [address]
  );

  const onClickDeposit = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    if (!isValidDepositTransaction) return;
    fetchDepositLPTx(ethWeiValue, gdxWeiValue, 1, 1, address).then(() => {
      fetchETHBalance(address);
      fetchGDXBalance(address);
    });
  };

  // useSigmaDidMount(() => {
  //   setIsETHEnable(true);
  //   setIsGDXEnable(false);
  //   setETHInput(gdxNumberValue * GDXPrice * (wETHPrice * 4));
  // }, [gdxNumberValue]);

  /** Validations */
  const isValidDepositTransaction = React.useMemo(() => {
    return (
      isETHInputPositive &&
      !isETHBiggerThanBalance &&
      isGDXInputPositive &&
      !isETHBiggerThanBalance &&
      ETHIsApproved &&
      GDXIsApproved &&
      isWalletConnected &&
      isCallSuccessDepositLPTxFee &&
      !isLoadingDepositLPTx
    );
  }, [
    isETHInputPositive,
    isETHBiggerThanBalance,
    isGDXInputPositive,
    isETHBiggerThanBalance,
    ETHIsApproved,
    GDXIsApproved,
    isWalletConnected,
    isCallSuccessDepositLPTxFee,
    isLoadingDepositLPTx
  ]);

  return (
    <motion.div
      // variants={MOTION_VARIANTS}
      className="w-full flex flex-col items-center "
    >
      {ETHComponent}
      <div className="flex justify-center items-center w-full min-h-[60px] my-[10px]">
        <img className="w-[60px]" src={SwapIcon} alt="swap" />
      </div>
      {GDXComponent}
      <div className="w-full flex flex-col items-center shogun_bg-secondary  rounded-md ">
        <div className=" flex flex-col w-full my-[24px] ">
          <UnitValueDisplay
            title="Tx Fee"
            value={displayDepositLPTxFee}
            unit={TOKENS.ETH.name}
            className="mt-[5px]"
            loading={isLoadingDepositLPTxFee}
            error={false}
          />
        </div>
        <SigmaButton
          className={`relative overflow-hidden 
          ${isValidDepositTransaction ? "" : "opacity-50 cursor-not-allowed"}
      w-full h-[40px] flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
          onClick={onClickDeposit}
        >
          <p>Deposit</p>
          {isLoadingDepositLPTx && (
            <LoadingModal
              className="absolute z-10 main_bg w-full h-full"
              loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
              message={null}
            />
          )}
        </SigmaButton>
      </div>
    </motion.div>
  );
};

export default FundDeposit;
