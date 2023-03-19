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
import useXSFUnstakeXSHO from "../../../../web3/hooks/XSHOFarm/useXSFUnstakeXSHO";
import useSigmaCurrencyInput from "../../../../hooks/TextField/useSigmaCurrencyInput";
import { TOKENS } from "../../../../web3/constants";
import SigmaButton from "../../../../components/Animation/SigmaButton";
import useXSFConstants from "../../../../web3/hooks/XSHOFarm/ReadOnly/useXSFConstants";

const XSHOUnpledgeModal = ({ handleCancelPopup, onSuccessTransactions }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    stakedXSHO,
    isLoadingStakedXSHO,
    isPositiveStakedXSHO,
    displayStakedXSHO,
    fetchStakedXSHO
  } = useXSFConstants(address);

  const {
    isLoadingUnstakeXSHOTxFee,
    fetchUnstakeXSHOTxFee,
    displayUnstakeXSHOTxFee,
    setUnstakeXSHOTxFeeLoading,

    isLoadingUnstakeXSHOTx,
    fetchUnstakeXSHOTx,
    isValidUnstakeXSHOTx
  } = useXSFUnstakeXSHO();

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
    placeholder: `${TOKENS.xSHO.name} to Unpledge`,
    balance: stakedXSHO
  });

  const { isRadioSelected, radioComponent } = AKRadioAgreement({
    message: `I read and accept disclaimer.`,
    initialSelectedValue: false
  });

  /** LifeCycle */
  useSigmaDidMount(() => {
    fetchStakedXSHO();
  });

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && isValidTxInInput && isPositiveStakedXSHO) {
      if (!isLoadingUnstakeXSHOTxFee) setUnstakeXSHOTxFeeLoading();
      onDebounce(weiValue);
    }
  }, [isValidTxInInput, isPositiveStakedXSHO, weiValue, isWalletConnected]);

  const onDebounce = React.useCallback(
    debounce((weiValue) => {
      fetchUnstakeXSHOTxFee(weiValue);
    }, 1000),
    [address]
  );

  /** Event */

  const onClickStake = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidTransaction) return;
    fetchUnstakeXSHOTx(weiValue).then(() => {
      handleCancelPopup("Unpledge");
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("Unpledge");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return (
      isValidTxInInput &&
      isPositiveStakedXSHO &&
      isValidUnstakeXSHOTx &&
      isRadioSelected
    );
  }, [
    isValidTxInInput,
    isPositiveStakedXSHO,
    isValidUnstakeXSHOTx,
    isRadioSelected
  ]);

  /** UI */

  return (
    <div className={`mt-[35px] flex flex-col items-center relative w-full`}>
      <div className="w-full flex flex-col items-start text-white">
        <p className="text-[20px] font-semibold w-full text-center sub_c ">
          ⚠️ Disclaimer ⚠️
        </p>
        <p className="text-[14px] mt-[5px]">
          {`Unpledging any amount of ${TOKENS.xSHO.name} will`}
          <strong className="">{`reset your ${TOKENS.vxSHO.name} balance to zero.`}</strong>
        </p>
        <p className="text-[14px] underline font-semibold mt-[5px]">
          {`You must claim reward from LP Farm or ${TOKENS.shoMESH.name} Farm before unpledge.`}
        </p>
      </div>
      <UnitValueDisplay
        title="Balance"
        value={displayStakedXSHO}
        unit={TOKENS.xSHO.name}
        className="mb-[10px]"
        loading={isLoadingStakedXSHO}
      />
      <div className={` flex w-full  transition-all hover:scale-105`}>
        {inputComponent}
        {maxComponent}

        <LPTokenDisplay
          tokenInfo={TOKENS.xSHO}
          className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
        />
      </div>
      <UnitValueDisplay
        title="Tx Fee"
        value={displayUnstakeXSHOTxFee}
        unit={TOKENS.ETH.name}
        className="mt-[5px]"
        loading={isLoadingUnstakeXSHOTxFee}
        error={false}
      />

      {radioComponent}

      <div className="flex justify-between w-full sm:h-[60px] h-[50px]">
        <SigmaButton
          className="w-[46%] h-full flex justify-center items-center text-white border-[1px] border-[#ffffff50] sm:text-[18px] text-[14px] font-semibold  rounded-md AKBtnEffect"
          onClick={() => {
            handleCancelPopup("Unpledge");
          }}
        >
          Cancel
        </SigmaButton>
        <SigmaButton
          className={`relative overflow-hidden w-[46%] 
          ${isValidTransaction ? "" : "opacity-50 cursor-not-allowed"}
            h-full flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
          onClick={onClickStake}
        >
          <p>Unpledge</p>
          {isLoadingUnstakeXSHOTx && (
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

export default XSHOUnpledgeModal;
