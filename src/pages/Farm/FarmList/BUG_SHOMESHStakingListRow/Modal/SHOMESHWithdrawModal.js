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

import useSMSWithdraw from "../../../../../web3/hooks/SHOMESHStaking/useBUG_SMSWithdraw";
import { BUG_SHOMESHStaking } from "../../../../../web3/contracts/SHOMESHStakingContract";
import useSMSConstants from "../../../../../web3/hooks/SHOMESHStaking/ReadOnly/useBUG_SMSConstants";

const SHOMESHWithdrawModal = ({ handleCancelPopup, onSuccessTransactions }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  // const {
  //   balance: SHOMESHBalance,
  //   isPositiveBalance: isPositiveSHOMESHBalance,
  //   fetchBalance: fetchSHOMESHBalance,
  //   displayBalance: displaySHOMESHBalance,
  //   isLoadingBalance: isLoadingSHOMESHBalance
  // } = useERC20Balance(MeshswapEscrowContract);

  const {
    shoMESHBalance,
    isPositiveSHOMESHBalance,
    isLoadingSHOMESHBalance,
    displaySHOMESHBalance,
    fetchSHOMESHBalance
  } = useSMSConstants(address);

  const {
    isCallSuccessWithdrawTxFee,
    isLoadingWithdrawTxFee,
    fetchWithdrawTxFee,
    displayWithdrawTxFee,
    setWithdrawTxFeeLoading,

    isLoadingWithdrawTx,
    fetchWithdrawTx,
    isValidWithdrawTx
  } = useSMSWithdraw();

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
    balance: shoMESHBalance
  });

  /** LifeCycle */
  useSigmaDidMount(() => {
    fetchSHOMESHBalance(BUG_SHOMESHStaking.address);
    fetchWithdrawTxFee();
  });

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && isValidTxInInput && isPositiveSHOMESHBalance) {
      if (!isCallSuccessWithdrawTxFee) setWithdrawTxFeeLoading();
      onDebounce(weiValue);
    }
  }, [isValidTxInInput, isPositiveSHOMESHBalance, weiValue, isWalletConnected]);

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
    fetchWithdrawTx().then(() => {
      handleCancelPopup("Withdraw");
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("Withdraw");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return isPositiveSHOMESHBalance && isValidWithdrawTx;
  }, [isPositiveSHOMESHBalance, isValidWithdrawTx]);

  /** UI */

  return (
    <div className={`mt-[35px] flex flex-col items-center relative w-full`}>
      <p className="xlg:text-[20px] lg:text-[18px] text-[16px] xlg:font-semibold font-medium sub_c">
        🛠 Please withdraw all your shoMESH and deposit to new shoMESH Staking
        contract below
      </p>
      <UnitValueDisplay
        title="Total Deposit"
        value={displaySHOMESHBalance}
        unit={TOKENS.shoMESH.name}
        className="mb-[10px]"
        loading={isLoadingSHOMESHBalance}
      />
      {/* <div className={` flex w-full  transition-all hover:scale-105`}>
        {inputComponent}
        {maxComponent}

        <LPTokenDisplay
          tokenInfo={TOKENS.shoMESH}
          className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
        />
      </div> */}
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
          <p>Withdraw All</p>
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
