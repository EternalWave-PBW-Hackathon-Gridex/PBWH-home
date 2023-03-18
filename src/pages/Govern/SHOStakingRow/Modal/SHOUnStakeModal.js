import React from "react";
import { debounce } from "lodash";

import {
  UnitValueDisplay,
  LPTokenDisplay
} from "../../../../components/SigmaValueDisplay";
import { LoadingModal } from "../../../../components/Loading";
import AKRadioAgreement from "../../../../components/AKRadioAgreement";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import Connector from "../../../../context/WalletConnector/Connector";
import SHOTokenContract from "../../../../web3/contracts/SHOTokenContract";
import useSFUnstakeSHO from "../../../../web3/hooks/SHOFarm/useSFUnstakeSHO";
import useSigmaCurrencyInput from "../../../../hooks/TextField/useSigmaCurrencyInput";
import SHOFarm from "../../../../web3/contracts/SHOFarmContract/SHOFarm";
import { TOKENS } from "../../../../web3/constants";
import useERC20 from "../../../../web3/hooks/ERC20/useERC20";
import SigmaButton from "../../../../components/Animation/SigmaButton";
import xSHOTokenContract from "../../../../web3/contracts/xSHOTokenContract";

const SHOUnStakeModal = ({ handleCancelPopup, onSuccessTransactions }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    balance: XSHOBalance,
    fetchBalance: fetchXSHOBalance,
    displayBalance: displayXSHOBalance,
    isLoadingBalance: isLoadingXSHOBalance,

    /** isApproved */
    isApproved,
    fetchAllowance,

    /** Approve */
    fetchApprove,
    isValidApproveTransaction,
    isLoadingApproveButton,
    isValidTxInERC20
  } = useERC20(xSHOTokenContract);

  const {
    isLoadingUnstakeSHOTxFee,
    fetchUnstakeSHOTxFee,
    displayUnstakeSHOTxFee,
    setUnstakeSHOTxFeeLoading,

    isLoadingUnstakeSHOTx,
    fetchUnstakeSHOTx,
    isValidUnstakeSHOTx
  } = useSFUnstakeSHO();

  const {
    inputComponent,
    maxComponent,
    initInput,
    bn: inputBN,
    isValid: isValidInput,
    weiValue,
    isValidTxInInput
  } = useSigmaCurrencyInput({
    name: TOKENS.xSHO.name,
    placeholder: `${TOKENS.xSHO.name} to Unstake`,
    balance: XSHOBalance
  });

  const { isRadioSelected, radioComponent } = AKRadioAgreement({
    message: `I read and accept disclaimer.`,
    initialSelectedValue: false
  });

  /** LifeCycle */
  useSigmaDidMount(() => {
    fetchXSHOBalance(address);
    fetchAllowance(address, SHOFarm.address);
  });

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && isValidTxInInput && isValidTxInERC20) {
      if (!isLoadingUnstakeSHOTxFee) setUnstakeSHOTxFeeLoading();
      onDebounce(weiValue);
    }
  }, [isValidTxInInput, isValidTxInERC20, weiValue, isWalletConnected]);

  const onDebounce = React.useCallback(
    debounce((weiValue) => {
      fetchUnstakeSHOTxFee(weiValue);
    }, 1000),
    [address]
  );

  /** Event */
  const onClickApprove = async () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    if (!isValidApproveTransaction) return;
    fetchApprove(SHOFarm.address).then(() => {
      fetchAllowance(address, SHOFarm.address);
    });
  };

  const onClickStake = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidTransaction) return;
    fetchUnstakeSHOTx(weiValue).then(() => {
      handleCancelPopup("Unstake");
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("Unstake");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return (
      isValidTxInInput &&
      isValidTxInERC20 &&
      isValidUnstakeSHOTx &&
      isRadioSelected
    );
  }, [
    isValidTxInInput,
    isValidTxInERC20,
    isValidUnstakeSHOTx,
    isRadioSelected
  ]);

  /** UI */

  return (
    <div className={`mt-[35px] flex flex-col items-center relative w-full`}>
      <UnitValueDisplay
        title="Balance"
        value={displayXSHOBalance}
        unit={TOKENS.xSHO.name}
        className="mb-[10px]"
        loading={isLoadingXSHOBalance}
      />
      <div
        className={`${
          isApproved ? "pointer-events-auto" : "pointer-events-none opacity-50"
        } flex w-full  transition-all hover:scale-105`}
      >
        {inputComponent}
        {maxComponent}

        <LPTokenDisplay
          tokenInfo={TOKENS.xSHO}
          className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
        />
      </div>
      {isApproved && (
        <UnitValueDisplay
          title="Tx Fee"
          value={displayUnstakeSHOTxFee}
          unit={TOKENS.MATIC.name}
          className="mt-[5px]"
          loading={isLoadingUnstakeSHOTxFee}
          error={false}
        />
      )}

      {radioComponent}

      <div className="flex justify-between w-full sm:h-[60px] h-[50px]">
        <SigmaButton
          className="w-[46%] h-full flex justify-center items-center text-white border-[1px] border-[#ffffff50] sm:text-[18px] text-[14px] font-semibold  rounded-md AKBtnEffect"
          onClick={() => {
            handleCancelPopup("Unstake");
          }}
        >
          Cancel
        </SigmaButton>
        {isApproved ? (
          <SigmaButton
            className={`relative overflow-hidden w-[46%] 
          ${isValidTransaction ? "" : "opacity-50 cursor-not-allowed"}
            h-full flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
            onClick={onClickStake}
          >
            <p>Unstake</p>
            {isLoadingUnstakeSHOTx && (
              <LoadingModal
                className="absolute z-10 main_bg w-full h-full"
                loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                message={null}
              />
            )}
          </SigmaButton>
        ) : (
          <SigmaButton
            className={`relative overflow-hidden w-[46%] 
          ${isValidApproveTransaction ? "" : "opacity-50 cursor-not-allowed"}
            h-full flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
            onClick={onClickApprove}
          >
            <p>Approve</p>
            {isLoadingApproveButton && (
              <LoadingModal
                className="absolute z-10 main_bg w-full h-full"
                loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                message={null}
              />
            )}
          </SigmaButton>
        )}
      </div>
    </div>
  );
};

export default SHOUnStakeModal;
