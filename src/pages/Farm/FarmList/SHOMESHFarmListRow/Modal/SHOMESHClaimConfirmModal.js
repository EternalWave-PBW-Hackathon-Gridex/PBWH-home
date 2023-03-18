import React from "react";
import { UnitValueDisplay } from "../../../../../components/SigmaValueDisplay";
import { TOKENS } from "../../../../../web3/constants";
import useSigmaDidMount from "../../../../../hooks/useSigmaDidMount";
import Connector from "../../../../../context/WalletConnector/Connector";
import SigmaButton from "../../../../../components/Animation/SigmaButton";
import { LoadingModal } from "../../../../../components/Loading";
import useSMSConstants from "../../../../../web3/hooks/SHOMESHStaking/ReadOnly/useSMSConstants";
import useSMFClaimReward from "../../../../../web3/hooks/SHOMESHFarm/useSMFClaimReward";
import useSMFConstants from "../../../../../web3/hooks/SHOMESHFarm/ReadOnly/useSMFConstants";
import { BN_FORMAT } from "../../../../../web3/utils/AKBN";
const SHOMESHClaimConfirmModal = ({
  onSuccessTransactions,
  handleCancelPopup
}) => {
  let { address, isWalletConnected } = Connector.useContainer();

  const {
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
    fetchBoostPending
  } = useSMFConstants(address);

  const {
    /** Tx Fee */
    isCallSuccessClaimRewardTxFee,
    isLoadingClaimRewardTxFee,
    fetchClaimRewardTxFee,
    displayClaimRewardTxFee,
    setClaimRewardTxFeeLoading,

    /** Tx */
    isLoadingClaimRewardTx,
    fetchClaimRewardTx,

    /** Helpers */
    isValidClaimRewardTx
  } = useSMFClaimReward();

  useSigmaDidMount(() => {
    fetchBasePending();
    fetchBoostPending();
    fetchClaimRewardTxFee();
  });

  /** Event */

  const onClickClaim = () => {
    if (!isValidTransaction) return;
    fetchClaimRewardTx().then(() => {
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("Claim");
    });
  };

  /** Validations */
  const isValidClaimableAmount = React.useMemo(() => {
    return isPositiveBasePending && isValidBoostPending;
  }, [isPositiveBasePending, isValidBoostPending]);

  const isValidTransaction = React.useMemo(() => {
    return isValidClaimableAmount && isValidClaimRewardTx && isWalletConnected;
  }, [isValidClaimableAmount, isValidClaimRewardTx, isWalletConnected]);

  /** UI */

  const displayClaimableAmount = React.useMemo(() => {
    if (!isValidClaimableAmount) return "-";
    return `${basePendingBN.decimalPlaces(8).toFormat(BN_FORMAT)} ${
      TOKENS.SHO.name
    } + ${boostPendingBN.decimalPlaces(8).toFormat(BN_FORMAT)} ${
      TOKENS.SHO.name
    } (🔥 boosted)`;
  }, [basePendingBN, isValidBoostPending, boostPendingBN]);

  return (
    <div className={` flex flex-col items-center relative w-full`}>
      {isLoadingClaimRewardTx && (
        <LoadingModal
          className="absolute w-full h-full z-10 outer_bg "
          loadingClassName={
            "sm:w-[80px] w-[50px] sm:h-[80px] h-[50px] mt-[20px]"
          }
          messageClassName={
            "sm:text-[20px] text-[16px] md:mt-[20px] mt-[10px] text-white"
          }
        />
      )}

      <UnitValueDisplay
        title={`Claimable ${TOKENS.SHO.name}`}
        value={displayClaimableAmount}
        unit={""}
        className=" text-white mt-[5px] "
        loading={isLoadingBasePending || isLoadingBoostPending}
        error={false}
      />

      <UnitValueDisplay
        title="Tx Fee"
        value={displayClaimRewardTxFee}
        unit={TOKENS.MATIC.name}
        className="mt-[5px] text-white"
        loading={isLoadingClaimRewardTxFee}
        error={false}
      />
      <div className="flex justify-between w-full sm:h-[50px] h-[40px] mt-[15px] sm:text-[18px]  text-[16px] font-medium">
        <SigmaButton
          className="w-[46%] h-full flex justify-center items-center text-white border-[1px] border-[#ffffff50]  rounded-md AKBtnEffect"
          onClick={() => {
            handleCancelPopup("Claim");
          }}
        >
          Cancel
        </SigmaButton>
        <SigmaButton
          className={`${
            !isValidTransaction ? "cursor-not-allowed opacity-50" : ""
          } w-[46%] overflow-hidden  h-full    flex justify-center items-center rounded-md main_bg text-black `}
          onClick={onClickClaim}
        >
          <p>Claim</p>
        </SigmaButton>
      </div>
    </div>
  );
};

export default SHOMESHClaimConfirmModal;
