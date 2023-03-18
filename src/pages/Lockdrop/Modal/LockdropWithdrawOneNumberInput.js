import React from "react";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { TOKENS } from "../../../web3/constants";
import { LoadingModal } from "../../../components/Loading";
import SigmaButton from "../../../components/Animation/SigmaButton";

import { TOAST_TYPE } from "../../../components/Snackbar/SigmaSnackbar";
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
import AKRadioAgreement from "../../../components/AKRadioAgreement";
import useTimeout from "../../../hooks/useTimeout";
import useDidMount from "../../../hooks/useDidMount";
import useSigmaCurrencyInput from "../../../hooks/TextField/useSigmaCurrencyInput";
import useLockdropConstants from "../../../web3/hooks/Lockdrop/ReadOnly/useLockdropConstants";
import Connector from "../../../context/WalletConnector/Connector";
import useLDWithdrawMESH from "../../../web3/hooks/Lockdrop/useLDWithdrawMESH";

const LockdropWithdrawOneNumberInput = ({
  displayDeposit,
  onSuccessTransactions,
  isUnlimited = true
}) => {
  const didMount = useDidMount();

  const { address, isWalletConnected } = Connector.useContainer();
  const {
    withdrawableMESH,
    isLoadingWithdrawableMESH,
    isCallSuccessWithdrawableMESH,
    isPositiveWithdrawableMESH,
    displayWithdrawableMESH,
    fetchWithdrawableMESH
  } = useLockdropConstants(address);

  const {
    inputComponent: MeshWithdrawInput,
    maxComponent: MeshWithdrawInputMax,
    textValue,
    numberValue,
    isPositive: isInputPositive,
    weiValue,
    isBiggerThanBalance
  } = useSigmaCurrencyInput({
    name: "MESH",
    placeholder: "MESH to withdraw",
    balance: withdrawableMESH
  });

  const {
    /** Tx Fee */
    isCallSuccessWithdrawMESHTxFee,
    isLoadingWithdrawMESHTxFee,
    fetchWithdrawMESHTxFee,
    displayWithdrawMESHTxFee,
    setWithdrawMESHTxFeeLoading,

    /** Tx */
    isLoadingWithdrawMESHTx,
    fetchWithdrawMESHTx
  } = useLDWithdrawMESH();

  const { isRadioSelected, radioComponent } = AKRadioAgreement({
    className: "mt-[5px]",
    message: `I acknowledge that only 1 withdrawal is possible during this stage.`,
    initialSelectedValue: isUnlimited
  });

  /** LifeCycle */
  useTimeout(
    () => {
      if (!didMount) return;
      fetchWithdrawableMESH();
    },
    1000,
    [didMount]
  );

  /** Debounce */
  React.useEffect(() => {
    if (isInputPositive && isWalletConnected) {
      if (!isLoadingWithdrawMESHTxFee) setWithdrawMESHTxFeeLoading(true);
      onDebounce(weiValue);
    }
  }, [isInputPositive, isWalletConnected]);

  const onDebounce = React.useCallback(
    debounce(async (amount) => {
      fetchWithdrawMESHTxFee(amount);
    }, 1000),
    [address]
  );

  /** Initializers */

  /** Fetching */

  /** Event */

  const onClickWithdraw = () => {
    if (!isValidTransaction) return;
    fetchWithdrawMESHTx(weiValue).then(() => {
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("withdraw");
    });
  };

  /** UI */

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return (
      isInputPositive &&
      !isBiggerThanBalance &&
      isPositiveWithdrawableMESH &&
      isCallSuccessWithdrawMESHTxFee &&
      isRadioSelected &&
      !isLoadingWithdrawMESHTx
    );
  }, [
    isInputPositive,
    isBiggerThanBalance,
    isPositiveWithdrawableMESH,
    isCallSuccessWithdrawMESHTxFee,
    isRadioSelected,
    isLoadingWithdrawMESHTx
  ]);

  return (
    <div className={`w-full flex flex-col items-center relative`}>
      <div className="w-full">
        {!isUnlimited && (
          <UnitValueDisplay
            title="Your Deposits"
            value={displayDeposit}
            unit={TOKENS.MESH.name}
            className="mt-[5px] text-white"
            loading={false}
          />
        )}

        <UnitValueDisplay
          title="Withdrawable MESH"
          value={displayWithdrawableMESH}
          unit={TOKENS.MESH.name}
          className=" text-white mt-[5px]"
          loading={isLoadingWithdrawableMESH}
        />
        {!isUnlimited && (
          <p className="lg:text-[16px] text-[14px] opacity-50 text-white w-full  flex justify-start">
            (Withdrawable MESH will decrease every hour by 1/24th)
          </p>
        )}
        <div className="min-h-[5px]" />

        <div className="flex w-full transition-all hover:scale-105">
          {MeshWithdrawInput}
          {MeshWithdrawInputMax}

          <LPTokenDisplay
            tokenInfo={TOKENS.MESH}
            className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
          />
        </div>
      </div>
      {!isUnlimited && radioComponent}

      <UnitValueDisplay
        title="Tx Fee"
        value={displayWithdrawMESHTxFee}
        unit={"MATIC"}
        className="mt-[5px] text-white"
        loading={isLoadingWithdrawMESHTxFee}
        error={false}
      />
      <SigmaButton
        className={`${
          isValidTransaction ? "" : "cursor-not-allowed opacity-50"
        } relative overflow-hidden sm:h-[50px] h-[40px] mt-[15px]   w-full flex justify-center items-center rounded-md main_bg text-black sm:text-[18px]  text-[16px] font-medium`}
        onClick={onClickWithdraw}
      >
        <p>Withdraw</p>
        {isLoadingWithdrawMESHTx && (
          <LoadingModal
            className="absolute w-full h-full z-10 main_bg"
            loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
            message={null}
          />
        )}
      </SigmaButton>
    </div>
  );
};

export default LockdropWithdrawOneNumberInput;
