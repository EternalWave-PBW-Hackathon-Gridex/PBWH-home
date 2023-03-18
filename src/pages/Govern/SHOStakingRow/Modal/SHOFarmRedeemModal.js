import React from "react";
import { UnitValueDisplay } from "../../../../components/SigmaValueDisplay";
import { TOKENS } from "../../../../web3/constants";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import Connector from "../../../../context/WalletConnector/Connector";
import SigmaButton from "../../../../components/Animation/SigmaButton";
import useSFConstants from "../../../../web3/hooks/SHOFarm/ReadOnly/useSFConstants";
import useSFClaimUnlockSHO from "../../../../web3/hooks/SHOFarm/useSFClaimUnlockSHO";
import { LoadingModal } from "../../../../components/Loading";

const SHOFarmRedeemModal = ({ onSuccessTransactions, handleCancelPopup }) => {
  let { address, isWalletConnected } = Connector.useContainer();

  const {
    isLoadingRedeemableSHO,
    isPositiveRedeemableSHO,
    displayRedeemableSHO,
    displayNumberFormatRedeemableSHO,
    fetchRedeemableSHO
  } = useSFConstants(address);

  const {
    /** Tx Fee */
    isCallSuccessClaimUnlockedSHOTxFee,
    isLoadingClaimUnlockedSHOTxFee,
    fetchClaimUnlockedSHOTxFee,
    displayClaimUnlockedSHOTxFee,
    setClaimUnlockedSHOTxFeeLoading,

    /** Tx */
    isLoadingClaimUnlockedSHOTx,
    fetchClaimUnlockedSHOTx,

    /** Helpers */
    isValidClaimUnlockedSHOTx
  } = useSFClaimUnlockSHO();

  useSigmaDidMount(() => {
    fetchRedeemableSHO();
    fetchClaimUnlockedSHOTxFee();
  });

  /** Fetching */

  /** Event */

  const onClickRedeem = () => {
    if (!isValidTransaction) return;
    fetchClaimUnlockedSHOTx().then(() => {
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("redeem");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return isValidClaimUnlockedSHOTx && isWalletConnected;
  }, [isValidClaimUnlockedSHOTx, isWalletConnected]);

  return (
    <div className={` flex flex-col items-center relative w-full`}>
      {isLoadingClaimUnlockedSHOTx && (
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
        title={`Redeemable ${TOKENS.SHO.name}`}
        value={displayRedeemableSHO}
        unit={""}
        className=" text-white mt-[5px] "
        loading={isLoadingRedeemableSHO}
        error={false}
      />

      {/* <div className="flex items-center w-full">
        <UnitValueDisplay
          title={`Redeemable ${TOKENS.shoMESH.name}`}
          value={`${"displaySigKSPEarned"} ${TOKENS.shoMESH.name}`}
          unit={""}
          className=" text-white mt-[5px] w-fit"
          loading={"earnedLoading"}
          error={false}
        />
        <AKTooltip
          tooltipElement={
            <p>{`Additional KSP reward from Klayswap is converted to SigKSP and distributed to users proportionally.`}</p>
          }
          iconClassName="w-[20px] h-[20px]"
        />
      </div> */}

      <UnitValueDisplay
        title="Tx Fee"
        value={displayClaimUnlockedSHOTxFee}
        unit={TOKENS.MATIC.name}
        className="mt-[5px] text-white"
        loading={isLoadingClaimUnlockedSHOTxFee}
        error={false}
      />
      <div className="flex justify-between w-full sm:h-[50px] h-[40px] mt-[15px] sm:text-[18px]  text-[16px] font-medium">
        <SigmaButton
          className="w-[46%] h-full flex justify-center items-center text-white border-[1px] border-[#ffffff50]  rounded-md AKBtnEffect"
          onClick={() => {
            handleCancelPopup("redeem");
          }}
        >
          Cancel
        </SigmaButton>
        <SigmaButton
          className={`${
            !isValidTransaction ? "cursor-not-allowed opacity-50" : ""
          } w-[46%] overflow-hidden  h-full    flex justify-center items-center rounded-md main_bg text-black `}
          onClick={onClickRedeem}
        >
          <p>Redeem</p>
        </SigmaButton>
      </div>
    </div>
  );
};

export default SHOFarmRedeemModal;
