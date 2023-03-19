import React from "react";
import AKTooltip from "../../../components/AKTooltip";
import { LoadingModal } from "../../../components/Loading";
import { UnitValueDisplay } from "../../../components/SigmaValueDisplay";
import { TOKENS } from "../../../web3/constants";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import Connector from "../../../context/WalletConnector/Connector";
import useLFYourEarnings from "../FarmList/hooks/useLFYourEarnings";
import useLFClaim from "../../../web3/hooks/LPFarm/useLFClaim";
import SigmaButton from "../../../components/Animation/SigmaButton";
import useLFMHConstants from "../../../web3/hooks/LPFarmMintingRateHelper/ReadOnly/useLFMHConstants";

const FarmClaimConfirmModal = ({
  farmItem,
  onSuccessTransactions,
  handleCancelPopup
}) => {
  let { address } = Connector.useContainer();
  const { poolId } = farmItem.lp;

  const {
    isValidYourEarnings,
    isLoadingYourEarnings,
    displayBasePending,
    displayBoostPending
  } = useLFYourEarnings({ farmItem });

  const {
    /** Tx Fee */
    isCallSuccessClaimTxFee,
    isLoadingClaimTxFee,
    fetchClaimTxFee,
    displayClaimTxFee,
    setClaimTxFeeLoading,

    /** Tx */
    isLoadingClaimTx,
    fetchClaimTx
  } = useLFClaim();

  useSigmaDidMount(() => {
    fetchClaimTxFee(poolId);
  });

  /** Fetching */

  /** Event */

  const onClickClaim = () => {
    if (!isValidTransaction) return;
    fetchClaimTx(poolId).then(() => {
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("claim");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return isValidYourEarnings && isCallSuccessClaimTxFee && !isLoadingClaimTx;
  }, [isValidYourEarnings, isCallSuccessClaimTxFee, isLoadingClaimTx]);

  /** Display */
  const displayClaimableAmount = React.useMemo(() => {
    if (!isValidYourEarnings) return "-";
    return `${displayBasePending} ${TOKENS.GRIN.name} + ${displayBoostPending} ${TOKENS.GRIN.name} (🔥 boosted)`;
  }, [isValidYourEarnings, displayBasePending, displayBoostPending]);

  return (
    <div className={` flex flex-col items-center relative w-full`}>
      {isLoadingClaimTx && (
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
        title={`Claimable ${TOKENS.GRIN.name}`}
        value={displayClaimableAmount}
        unit={""}
        className=" text-white mt-[5px] "
        loading={isLoadingYourEarnings}
        error={false}
      />

      <UnitValueDisplay
        title="Tx Fee"
        value={displayClaimTxFee}
        unit={TOKENS.ETH.name}
        className="mt-[5px] text-white"
        loading={isLoadingClaimTxFee}
        error={false}
      />
      <div className="flex justify-between w-full sm:h-[50px] h-[40px] mt-[15px] sm:text-[18px]  text-[16px] font-medium">
        <SigmaButton
          className="w-[46%] h-full flex justify-center items-center text-white border-[1px] border-[#ffffff50]  rounded-md AKBtnEffect"
          onClick={() => {
            handleCancelPopup("claim");
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

export default FarmClaimConfirmModal;
