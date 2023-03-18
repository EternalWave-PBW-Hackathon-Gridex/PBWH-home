import React from "react";

import { LoadingModal } from "../../../components/Loading";
import { UnitValueDisplay } from "../../../components/SigmaValueDisplay";
import Connector from "../../../context/WalletConnector/Connector";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import { TOKENS } from "../../../web3/constants";
import useLockdropConstants from "../../../web3/hooks/Lockdrop/ReadOnly/useLockdropConstants";
import useLPFarmConstants from "../../../web3/hooks/LPFarm/ReadOnly/useLPFarmConstants";
import useLFWithdrawLockdropLP from "../../../web3/hooks/LPFarm/useLFWithdrawLockdropLP";

const LockdropWithdrawConfirmModal = ({ onSuccessTransactions }) => {
  let { address } = Connector.useContainer();

  const {
    isLoadingLockdropWithdrawableAmount,
    isPositiveLockdropWithdrawableAmount,
    displayLockdropWithdrawableAmount,
    fetchLockdropWithdrawableAmount
  } = useLPFarmConstants(address);

  const {
    /** Tx Fee */
    isCallSuccessWithdrawLPTxFee,
    isLoadingWithdrawLPTxFee,
    fetchWithdrawLPTxFee,
    displayWithdrawLPTxFee,

    /** Tx */
    withdrawLPTxState,
    isLoadingWithdrawLPTx,
    fetchWithdrawLPTx
  } = useLFWithdrawLockdropLP(address);

  /** Initializers */
  useSigmaDidMount(() => {
    fetchLockdropWithdrawableAmount(address);
    fetchWithdrawLPTxFee();
  });

  /** Event */
  const onClickWithdraw = () => {
    if (!isValidTransaction) return;
    fetchWithdrawLPTx().then(() => {
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("withdrawLP");
    });
  };

  /** Validations */
  const isValidTransaction = React.useMemo(() => {
    return (
      isPositiveLockdropWithdrawableAmount &&
      isCallSuccessWithdrawLPTxFee &&
      !isLoadingWithdrawLPTx
    );
  }, [
    isPositiveLockdropWithdrawableAmount,
    isCallSuccessWithdrawLPTxFee,
    isLoadingWithdrawLPTx
  ]);

  return (
    <div className={` flex flex-col items-center relative w-full`}>
      <div className="w-full">
        <UnitValueDisplay
          title="Withdrawable LP"
          value={displayLockdropWithdrawableAmount}
          unit={TOKENS["shoMESH/MESH"].name}
          className=" text-white mt-[5px]"
          loading={isLoadingLockdropWithdrawableAmount}
        />
      </div>

      <UnitValueDisplay
        title="Tx Fee"
        value={displayWithdrawLPTxFee}
        unit={TOKENS.MATIC.name}
        className="mt-[5px] text-white"
        loading={isLoadingWithdrawLPTxFee}
        error={false}
      />
      <div
        className={`${
          isValidTransaction ? "" : "cursor-not-allowed opacity-50"
        } relative overflow-hidden sm:h-[50px] h-[40px] mt-[15px]   w-full flex justify-center items-center rounded-md main_bg text-black sm:text-[18px]  text-[16px] font-medium`}
        onClick={onClickWithdraw}
      >
        <p>Withdraw</p>
        {false && (
          <LoadingModal
            className="absolute w-full h-full z-10 main_bg"
            loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
            message={null}
          />
        )}
      </div>
    </div>
  );
};

export default LockdropWithdrawConfirmModal;
