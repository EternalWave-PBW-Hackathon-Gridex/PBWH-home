import React from "react";
import { debounce } from "lodash";

import {
  UnitValueDisplay,
  LPTokenDisplay
} from "../../../../../components/SigmaValueDisplay";
import { LoadingModal } from "../../../../../components/Loading";
import useSigmaDidMount from "../../../../../hooks/useSigmaDidMount";
import Connector from "../../../../../context/WalletConnector/Connector";
import useSigmaCurrencyInput from "../../../../../hooks/TextField/useSigmaCurrencyInput";
import { TOKENS } from "../../../../../web3/constants";
import SigmaButton from "../../../../../components/Animation/SigmaButton";
import useSMFConstants from "../../../../../web3/hooks/SHOMESHFarm/ReadOnly/useSMFConstants";
import useSMFWithdraw from "../../../../../web3/hooks/SHOMESHFarm/useSMFWithdraw";
const SHOMESHWithdrawModal = ({ handleCancelPopup, onSuccessTransactions }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    isLoadingUserInfo,
    amount,
    displayAmount,
    isPositiveAmount,
    fetchUserInfo
  } = useSMFConstants(address);

  const {
    isCallSuccessWithdrawTxFee,
    isLoadingWithdrawTxFee,
    fetchWithdrawTxFee,
    displayWithdrawTxFee,
    setWithdrawTxFeeLoading,

    isLoadingWithdrawTx,
    fetchWithdrawTx,
    isValidWithdrawTx
  } = useSMFWithdraw();

  const {
    inputComponent,
    maxComponent,
    initInput,
    bn: inputBN,
    isValid: isValidInput,
    weiValue,
    isValidTxInInput
  } = useSigmaCurrencyInput({
    name: TOKENS.shoMESH.name,
    placeholder: `${TOKENS.shoMESH.name} to Withdraw`,
    balance: amount
  });

  /** LifeCycle */
  useSigmaDidMount(() => {
    fetchUserInfo();
  });

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && isValidTxInInput && isPositiveAmount) {
      if (!isLoadingWithdrawTxFee) setWithdrawTxFeeLoading();
      onDebounce(weiValue);
    }
  }, [isValidTxInInput, isPositiveAmount, weiValue, isWalletConnected]);

  const onDebounce = React.useCallback(
    debounce((weiValue) => {
      fetchWithdrawTxFee(weiValue);
    }, 1000),
    [address]
  );

  /** Event */

  const onClickWithdraw = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidTransaction) return;
    fetchWithdrawTx(weiValue).then(() => {
      handleCancelPopup("Withdraw");
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("Withdraw");
    });
  };

  /** Validations */
  const isValidTransaction = React.useMemo(() => {
    return isValidTxInInput && isPositiveAmount && isValidWithdrawTx;
  }, [isValidTxInInput, isPositiveAmount, isValidWithdrawTx]);

  /** UI */

  return (
    <div className={`mt-[35px] flex flex-col items-center relative w-full`}>
      <UnitValueDisplay
        title="Total Deposit"
        value={displayAmount}
        unit={TOKENS.shoMESH.name}
        className="mb-[10px]"
        loading={isLoadingUserInfo}
      />
      <div className={` flex w-full  transition-all hover:scale-105`}>
        {inputComponent}
        {maxComponent}

        <LPTokenDisplay
          tokenInfo={TOKENS.shoMESH}
          className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
        />
      </div>
      <UnitValueDisplay
        title="Tx Fee"
        value={displayWithdrawTxFee}
        unit={TOKENS.MATIC.name}
        className="mt-[5px]"
        loading={isLoadingWithdrawTxFee}
        error={false}
      />

      <div className="min-h-[10px]" />

      <div className="flex justify-between w-full sm:h-[60px] h-[50px]">
        <SigmaButton
          className="w-[46%] h-full flex justify-center items-center text-white border-[1px] border-[#ffffff50] sm:text-[18px] text-[14px] font-semibold  rounded-md AKBtnEffect"
          onClick={() => {
            handleCancelPopup("Withdraw");
          }}
        >
          Cancel
        </SigmaButton>
        <SigmaButton
          className={`relative overflow-hidden w-[46%] 
          ${isValidTransaction ? "" : "opacity-50 cursor-not-allowed"}
            h-full flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
          onClick={onClickWithdraw}
        >
          <p>Withdraw</p>
          {isLoadingWithdrawTx && (
            <LoadingModal
              className="absolute z-10 main_bg w-full h-full"
              loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
              message={null}
            />
          )}
        </SigmaButton>
      </div>
    </div>
  );
};

export default SHOMESHWithdrawModal;
